// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_CONFIG_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_CONFIG_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_CONFIG_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_CONFIG_appId,
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
