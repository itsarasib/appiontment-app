// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "frontend-proj-b20eb.firebaseapp.com",
  projectId: "frontend-proj-b20eb",
  storageBucket: "frontend-proj-b20eb.appspot.com",
  messagingSenderId: "568460376528",
  appId: "1:568460376528:web:bb2f55ad955501f39461d5",
  measurementId: "G-B3BE8MBV3Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
