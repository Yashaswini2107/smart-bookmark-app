"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const supabase = createClient();
  const router = useRouter();

    useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-gray-800">
      
      {/* ================= NAVBAR ================= */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-indigo-600">
          🔖 SmartBookmarks
        </h1>

        <button
          onClick={signInWithGoogle}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Login with Google
        </button>
      </nav>

      {/* ================= HERO ================= */}
      <section className="text-center px-6 py-24 max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold leading-tight mb-6">
          Save Your Links.
          <br />
          <span className="text-indigo-600">
            Organize Your Internet.
          </span>
        </h2>

        <p className="text-lg text-gray-600 mb-10">
          SmartBookmarks helps you store, organize, and access your favorite
          websites instantly — powered by cloud sync and Google login.
        </p>

        <button
          onClick={signInWithGoogle}
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition"
        >
          🚀 Get Started Free
        </button>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-10 py-20 bg-white">
        <h3 className="text-3xl font-bold text-center mb-14">
          Why SmartBookmarks?
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div className="p-8 rounded-2xl shadow-md hover:shadow-xl transition bg-indigo-50">
            <h4 className="text-xl font-semibold mb-3">⚡ Instant Save</h4>
            <p className="text-gray-600">
              Save bookmarks in seconds and access them anywhere.
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-md hover:shadow-xl transition bg-indigo-50">
            <h4 className="text-xl font-semibold mb-3">☁️ Cloud Sync</h4>
            <p className="text-gray-600">
              Your bookmarks are securely stored using Supabase cloud.
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-md hover:shadow-xl transition bg-indigo-50">
            <h4 className="text-xl font-semibold mb-3">🔐 Google Login</h4>
            <p className="text-gray-600">
              One-click authentication with your Google account.
            </p>
          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-10 py-20 bg-gray-50 text-center">
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

      {/* ================= CTA ================= */}
      <section className="text-center py-24">
        <h3 className="text-3xl font-bold mb-6">
          Start Organizing Today
        </h3>

        <button
          onClick={signInWithGoogle}
          className="bg-indigo-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-indigo-700 transition"
        >
          Sign in with Google
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-10 text-gray-500">
        Built with using Next.js + Supabase
      </footer>

    </div>
  );
}