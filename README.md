# Smart Bookmark App

A modern **full-stack bookmark manager** built with **Next.js 14**, **Supabase**, and **Tailwind CSS**.

Users can securely sign in using Google OAuth and manage private bookmarks with real-time synchronization across tabs.


##  Live Demo
https://smart-bookmark-app-chi-one.vercel.app/

## Project Overview

Smart Bookmark App allows users to:
- Save important links
- Organize bookmarks privately
- Access them from anywhere
- Sync updates instantly in real time

The application focuses on **authentication security**, **user privacy**, and **real-time data consistency**.


## Tech Stack

### Frontend
- **Next.js 14 (App Router)**
- **React Server + Client Components**
- **Tailwind CSS**
- Responsive UI with modern gradient design

### Backend (BaaS)
- **Supabase**
  - Google OAuth Authentication
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Realtime subscriptions

### Deployment
- **Vercel**

## Features

-Google OAuth login  
-Private bookmarks per user  
-Add & delete bookmarks  
-Realtime updates across tabs  
-Secure database with RLS policies  
-Responsive modern UI  
-Cloud deployment via Vercel  

## Authentication & User Privacy

Authentication is handled using **Supabase Google OAuth**.

After login:
- Supabase issues a secure session.
- User ID (`auth.uid()`) is attached to every bookmark.
- Database policies ensure users **only access their own data**.

No passwords are stored in the application.

## Real-Time Updates

Supabase Realtime listens for database changes.

When a bookmark is:
- Added
- Deleted
- Updated

All open tabs automatically sync without refreshing.

This creates a collaborative and reactive user experience.

## 🗄 Database Schema

### Table: `bookmarks`

| Column   | Type |
|----------|------|
| id       | uuid |
| title    | text |
| url      | text |
| user_id  | uuid |


##  Row Level Security (RLS)

RLS ensures strict data isolation between users.

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

```

## Local Setup
1. Clone repository
      git clone https://github.com/Yashaswini2107/smart-bookmark-app.git
      cd smart-bookmark-app

2. Install Dependencies
      npm install

3. Create environmental Variables
      NEXT_PUBLIC_SUPABASE_URL=your_url
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key 

4. Run development server
      npm run dev

5. Open
      http://localhost:3000