# Deployment Guide

This guide covers pushing the code to GitHub and deploying the app live with Netlify.

## 1. Push to GitHub

### Create a repository

1. Go to [https://github.com/new](https://github.com/new).
2. Name the repository `journal-engine`.
3. Choose **Private** or **Public**.
4. Do **not** initialize with README, .gitignore, or license (we already have those files locally).
5. Click **Create repository**.

### Connect and push from this project

Open a terminal inside `/Users/nicoelvino/Documents/GitHub/journal-engine` and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/journal-engine.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

If you see an authentication prompt, use a GitHub personal access token or GitHub CLI.

## 2. Deploy to Netlify

### Option A: Connect Git repository (recommended)

1. Go to [https://app.netlify.com/](https://app.netlify.com/) and log in.
2. Click **Add new site** > **Import an existing project**.
3. Choose **GitHub** and authorize Netlify.
4. Select the `journal-engine` repository.
5. Use these build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Netlify will auto-install the Next.js plugin. If not, the `netlify.toml` already includes it.
7. Click **Deploy site**.

### Option B: Manual drag-and-drop

1. Run `npm run build` locally.
2. Drag the `.next` folder into Netlify's deploy drop zone.

This method works for a quick preview but will not auto-deploy on future pushes.

## 3. Set environment variables on Netlify

After the site is created, go to **Site settings > Environment variables** and add:

```
NEXT_PUBLIC_APP_TITLE=Journal Engine
NEXT_PUBLIC_USE_FIREBASE=false
```

When you are ready to enable Firebase, add the full Firebase config and set `NEXT_PUBLIC_USE_FIREBASE=true`.

## 4. Update Firebase authorized domains

When your live URL is ready (for example `https://journal-engine-xxx.netlify.app`), add it in the Firebase console:

**Authentication > Settings > Authorized domains**

## 5. Verify the live site

1. Visit the Netlify URL.
2. Confirm the app loads, the journal page shows Quick Start cards, and you can create an entry in localStorage mode.
3. Once Firebase is configured, sign in with Google and confirm data persists to Firestore.

## 6. Future deploys

With the Git repository connected, every `git push` to `main` will trigger a new Netlify deploy automatically.
