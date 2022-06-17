import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_DEV_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_DEV_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_DEV_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DEV_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_DEV_APP_ID,
};

const firebaseApp = () => initializeApp(clientCredentials);
export const auth = () => getAuth(firebaseApp());
export const db = () => getFirestore(firebaseApp());
