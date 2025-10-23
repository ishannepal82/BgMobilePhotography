// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjJEjb8b8C4deUrK-2DWLZkiO2W-lg2Yo",
  authDomain: "bg-mobile-photography.firebaseapp.com",
  projectId: "bg-mobile-photography",
  storageBucket: "bg-mobile-photography.firebasestorage.app",
  messagingSenderId: "221930080767",
  appId: "1:221930080767:web:087dd2c2b19384eb447fca",
  measurementId: "G-EW9WQGSDJ1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);