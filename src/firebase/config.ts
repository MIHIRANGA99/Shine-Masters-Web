// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsgxKm18cnTxLn0FqRQ01FwrZySjDjOGE",
  authDomain: "shine-masters-auth.firebaseapp.com",
  projectId: "shine-masters-auth",
  storageBucket: "shine-masters-auth.appspot.com",
  messagingSenderId: "320266569875",
  appId: "1:320266569875:web:07be529080be1feb302566",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const database = getFirestore(app);
