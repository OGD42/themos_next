import { initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

const firebaseServerAppSettings = {
  authIdToken: "", // We'll explain how to get the
  // idToken in the service worker
  // example below.
};

export const serverApp = initializeServerApp(
  firebaseConfig,
  firebaseServerAppSettings
);

export const serverAuth = getAuth(serverApp);
