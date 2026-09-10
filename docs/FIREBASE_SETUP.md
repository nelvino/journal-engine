# Firebase Setup Guide

This app supports localStorage mode out of the box. To enable cloud sync, Google authentication, and Firestore persistence, follow these steps.

## 1. Create a Firebase project

1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/).
2. Click **Add project** and follow the prompts.
3. You do not need to enable Google Analytics, but you can if you want the `measurementId`.

## 2. Register a web app

1. In your Firebase project, click the **Web** icon (</>) to add a web app.
2. Give it a nickname, for example `journal-engine-web`.
3. Optionally enable Firebase Hosting if you want to deploy there.
4. Copy the firebaseConfig object. It looks like this:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-XXXXXXXXXX"
};
```

## 3. Configure environment variables

1. Copy `.env.example` to `.env.local` if you have not already.
2. Fill in the values from the firebaseConfig object:

```bash
NEXT_PUBLIC_USE_FIREBASE=true
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 4. Enable Authentication

1. Go to **Build > Authentication** in the Firebase console.
2. Click **Get started**.
3. Under the **Sign-in method** tab, enable **Google**.
4. Add a support email and click **Save**.
5. Under **Settings > Authorized domains**, add your production domain when you deploy.

## 5. Set up Firestore

1. Go to **Build > Firestore Database**.
2. Click **Create database**.
3. Choose **Start in test mode** for local development, or **Start in production mode** if you understand the security rules.

### Firestore structure

The app stores each user's data under:

```
users/{uid}/data/{key}
```

Documents contain a `value` field with the stored JSON data and an `updatedAt` timestamp. Known keys:

- `journal_entries`
- `goals`
- `user_progress`
- `onboarding_completed`
- `recommendation_dismissed_date`

## 6. Set security rules

In **Firestore Database > Rules**, paste these rules to protect user data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click **Publish**.

## 7. Enable Google sign in button domains

For local development, `localhost:3000` should work with the Google provider by default. If you deploy to Vercel or another host, add the domain in:

**Authentication > Settings > Authorized domains**

## 8. Test locally

1. Start the dev server with `npm run dev`.
2. Click the **Sign in** button in the header.
3. Complete Google sign in.
4. Create a journal entry. It should now persist under your Firestore user document.
5. Open an incognito window, sign in again, and verify your data appears.

## 9. Deploy

When deploying, make sure your hosting provider has the same environment variables. If you use Vercel, add them in the project dashboard under **Settings > Environment Variables**.

## Troubleshooting

- If sign in fails with `auth/invalid-api-key`, the Firebase config values are missing or incorrect.
- If Firestore writes fail, check the **Console > Rules** tab for timestamp errors.
- If data does not sync across devices, make sure `NEXT_PUBLIC_USE_FIREBASE=true` is set in production.
