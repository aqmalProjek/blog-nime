import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ,
  authDomain: "blog-nime.firebaseapp.com",
  projectId: "blog-nime",
  storageBucket: "blog-nime.appspot.com",
  messagingSenderId: "385277296850",
  appId: "1:385277296850:web:a503e5fd0c9bbbf92f6d0b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) :getApp();
const db = getFirestore();
const storage = getStorage();
export {
    app, db, storage
};