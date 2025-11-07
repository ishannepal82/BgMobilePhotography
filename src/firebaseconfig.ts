import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFTP8Ey3LI22z3bqeANONM3QgT7NrsetM",
  authDomain: "bgmobilephotography.firebaseapp.com",
  projectId: "bgmobilephotography",
  storageBucket: "bgmobilephotography.firebasestorage.app",
  messagingSenderId: "210410959859",
  appId: "1:210410959859:web:b5e2268ce04869174f1886",
  measurementId: "G-HSD9XY24E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };