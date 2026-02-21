"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

/* ================= TYPES ================= */

type Bookmark = {
  id: string;
  title: string;
  url: string;
  user_id: string;
  favorite?: boolean;
};

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();

  /* ================= STATE ================= */

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ================= AUTH ================= */

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/");
      return;
    }

    setUserId(session.user.id);
    setUser(session.user);

    await fetchBookmarks(session.user.id);
    setLoading(false);
  };

  /* ================= FETCH ================= */

  const fetchBookmarks = async (uid: string) => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", uid)
      .order("id", { ascending: false });

    setBookmarks(data || []);
  };

  /* ================= ADD ================= */

  const addBookmark = async () => {
    if (!title || !url) return alert("Enter title & URL");
    if (!userId) return;

    const { error } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: userId,
      },
    ]);

    if (!error) {
      setTitle("");
      setUrl("");
      fetchBookmarks(userId);
    }
  };

  /* ================= DELETE ================= */

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    if (userId) fetchBookmarks(userId);
  };

  /* ================= FAVICON ================= */

  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading bookmarks...
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      {/* ===== HEADER ===== */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-white">
        <h1 className="text-3xl font-bold tracking-wide">
          🔖 SmartBookmarks
        </h1>

        <div className="flex items-center gap-4">
          {user?.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          )}

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/");
            }}
            className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ===== MAIN CARD CONTAINER ===== */}
      <div className="bg-white rounded-t-3xl min-h-screen pt-10 pb-20">

        {/* SEARCH */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <input
            placeholder="🔎 Search bookmarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* ADD FORM */}
        <div className="flex gap-3 max-w-4xl mx-auto px-6 mb-10">
          <input
            className="flex-1 p-3 rounded-lg border"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="flex-1 p-3 rounded-lg border"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={addBookmark}
            className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>

        {/* BOOKMARK GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">

          {bookmarks
            .filter((b) =>
              b.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((b) => (
              <div
                key={b.id}
                className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition border"
              >
                <div className="flex items-center gap-3">
                  {getFavicon(b.url) && (
                    <img
                      src={getFavicon(b.url)!}
                      className="w-6 h-6"
                    />
                  )}

                  <a
                    href={b.url}
                    target="_blank"
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    {b.title}
                  </a>
                </div>

                <p className="text-sm text-gray-500 truncate mt-2">
                  {b.url}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      setBookmarks((prev) =>
                        prev.map((item) =>
                          item.id === b.id
                            ? { ...item, favorite: !item.favorite }
                            : item
                        )
                      )
                    }
                    className="text-xl"
                  >
                    {b.favorite ? "⭐" : "☆"}
                  </button>

                  <button
                    onClick={() => deleteBookmark(b.id)}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}