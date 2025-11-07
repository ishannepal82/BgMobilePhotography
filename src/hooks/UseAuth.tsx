import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig";

export function doLoginwithEmailandPassword(email: string, password: string) {
   return signInWithEmailAndPassword(auth, email, password); 
}

