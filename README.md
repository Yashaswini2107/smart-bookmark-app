# Smart Bookmark App

A simple bookmark manager built using **Next.js (App Router)**, **Supabase**, and **Tailwind CSS**.

Users can sign in using Google OAuth and manage personal bookmarks with real-time updates.

---

## Live Demo

Live URL: https://your-vercel-url.vercel.app

---

## Tech Stack

- **Next.js 14** (App Router)
- **Supabase**
  - Authentication (Google OAuth)
  - PostgreSQL Database
  - Realtime subscriptions
- **Tailwind CSS**
- **Vercel** (Deployment)

---

##  Features

- Google OAuth login (no email/password)
- Add bookmarks (title + URL)
- Bookmarks are private per user
- Real-time updates across tabs
- Delete bookmarks
- Dark mode support
- Deployed on Vercel

---

##  Database Schema

Table: `bookmarks`

| Column   | Type   |
|----------|--------|
| id       | uuid   |
| title    | text   |
| url      | text   |
| user_id  | uuid   |

---

##  Row Level Security (RLS)

RLS is enabled to ensure users can only access their own bookmarks.

Policies:

```sql
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own bookmarks"
ON bookmarks FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users insert own bookmarks"
ON bookmarks FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own bookmarks"
ON bookmarks FOR DELETE
USING (auth.uid() = user_id);