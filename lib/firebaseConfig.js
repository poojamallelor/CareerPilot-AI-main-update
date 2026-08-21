// Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Check if Firebase environment variables are properly configured
const isFirebaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes('demo') &&
    !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID.includes('demo')
  );
};

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase only if properly configured
let firebaseApp = null;
let db = null;
const ENABLED = isFirebaseConfigured();

if (ENABLED) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
    console.log("✅ Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
    db = null;
  }
} else {
  console.warn("⚠️ Firebase not configured - Firestore disabled");
  console.log("💡 To enable Firebase: Set Firebase environment variables in .env.local");
}

export const isFirebaseEnabled = ENABLED;
export { db, firebaseApp };
