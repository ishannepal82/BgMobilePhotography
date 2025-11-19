import {
  collection,
  getDocs,
  setDoc,
  doc,
  type QueryDocumentSnapshot,
  type DocumentData
} from "firebase/firestore"
import { useState } from "react";
import { db } from "../firebaseconfig";

type Contact = {
  id: string;
  message: string;
  email: string;
}

export default function useContacts() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleEmailChange = (value: string) => {
    setEmail(value);
  }
  
  const handleMessageChange = (value: string) => {
    setMessage(value);
  }
  
  const handleContactsFetch = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const data = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Contact
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }
  
  const handleContactsPush = async () => {
    try {
      if (!email || !message) {
        throw new Error("Email and message are required");
      }

      const docRef = doc(collection(db, "contacts"));
      const contactData = {
        id: docRef.id,
        email,
        message,
        createdAt: new Date().toISOString() // Add timestamp
      }
      
      await setDoc(docRef, contactData);
      
      // Clear form after successful submission
      setEmail("");
      setMessage("");
      
      console.log("Contact saved successfully:", contactData);
      return contactData;
    } catch (error) {
      console.error("Error saving contact:", error);
      throw error;
    }
  }
  
  return {
    handleContactsFetch,
    handleContactsPush,
    handleEmailChange,
    handleMessageChange,
    email,
    message
  };
}