import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyChrIzaKKwjy-RpMn16G8i4bIFVpWrnNuA",
  authDomain: "appcelu-7d9f4.firebaseapp.com",
  projectId: "appcelu-7d9f4",
  storageBucket: "appcelu-7d9f4.appspot.com",
  messagingSenderId: "767550165846",
  appId: "1:767550165846:web:efc44b54986f8540a47cf7",
  measurementId: "G-S884XCHCQM"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
const app = initializeApp(firebaseConfig);
