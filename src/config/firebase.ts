import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBDEzNSp_wCEJAFoDiZi78yUJ4qnuHthwU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bayan-project-3142c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bayan-project-3142c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bayan-project-3142c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "244900464361",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:244900464361:web:422c1c7aad8aec01eb9278",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-L6MJD52HW2"
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

export default app;

