"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) router.push("/dashboard");
    };

    checkSession();
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-wide">
          🔖 SmartBookmarks
        </h1>

        <button
          onClick={signInWithGoogle}
          className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-lg hover:bg-white/30 transition"
        >
          Login with Google
        </button>
      </nav>

      {/* ================= HERO ================= */}
      <section className="text-center px-6 py-24 max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold leading-tight mb-6">
          Save Your Links.
          <br />
          <span className="text-yellow-200">
            Organize Your Internet.
          </span>
        </h2>

        <p className="text-lg text-white/90 mb-10">
          SmartBookmarks helps you store, organize, and instantly access your
          favorite websites — synced securely in the cloud.
        </p>

        <button
          onClick={signInWithGoogle}
          className="bg-white text-indigo-600 px-10 py-4 rounded-xl text-lg font-semibold shadow-xl hover:scale-105 transition"
        >
          🚀 Get Started Free
        </button>
      </section>

      {/* ================= WHITE CONTENT AREA ================= */}
      <div className="bg-white text-gray-800 rounded-t-3xl pt-20 pb-24">

        {/* FEATURES */}
        <section className="px-10 pb-20">
          <h3 className="text-3xl font-bold text-center mb-14">
            Why SmartBookmarks?
          </h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            <div className="p-8 rounded-2xl shadow-md hover:shadow-2xl transition border">
              <h4 className="text-xl font-semibold mb-3">⚡ Instant Save</h4>
              <p className="text-gray-600">
                Save bookmarks instantly and access them anytime.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-md hover:shadow-2xl transition border">
              <h4 className="text-xl font-semibold mb-3">☁️ Cloud Sync</h4>
              <p className="text-gray-600">
                Secure cloud storage powered by Supabase.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-md hover:shadow-2xl transition border">
              <h4 className="text-xl font-semibold mb-3">🔐 Google Login</h4>
              <p className="text-gray-600">
                One-click authentication using Google OAuth.
              </p>
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="px-10 py-10 text-center bg-gray-50">
          <h3 className="text-3xl font-bold mb-12">
            How It Works
          </h3>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">

            <div>
              <div className="text-4xl mb-3">1️⃣</div>
              <p className="font-semibold">Login with Google</p>
            </div>

            <div>
              <div className="text-4xl mb-3">2️⃣</div>
              <p className="font-semibold">Add Your Bookmarks</p>
            </div>

            <div>
              <div className="text-4xl mb-3">3️⃣</div>
              <p className="font-semibold">Access Anywhere</p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-20">
          <h3 className="text-3xl font-bold mb-6">
            Start Organizing Today
          </h3>

          <button
            onClick={signInWithGoogle}
            className="bg-indigo-600 text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-indigo-700 transition"
          >
            Sign in with Google
          </button>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-gray-500">
          Built with  using Next.js + Supabase
        </footer>

      </div>
    </div>
  );
}