import { collection, getDocs, QueryDocumentSnapshot, setDoc, type DocumentData } from "firebase/firestore/lite";
import { useState } from "react";
import { db } from "../firebaseconfig";
import { doc } from "firebase/firestore";

type Contact = {
  id: string;
  message: string;
  email: string;
}

export default function useContacts () {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleEmailChange = (value: string) => {
    setEmail(value);
  }
  
  const handleMessageChange = (value: string) => {
    setMessage(value);
  }
  
  const handleContactsFetch = async () => {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const data = querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Contact
    );
    console.log(data);
    return data;
  }
  
  const handleContactsPush = async () => {
    const docRef = doc(collection(db, "contacts"));
    const Contact = {
      id: docRef.id,
      email,
      message
    }
    await setDoc(docRef, Contact)
  }
  return {
    handleContactsFetch,
    handleContactsPush,
    handleEmailChange,
    handleMessageChange
  };
}
