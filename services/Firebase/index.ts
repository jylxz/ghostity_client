import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_PROD_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_PROD_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROD_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_PROD_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_PROD_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_PROD_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(clientCredentials);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
