import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseconfig";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

type CloudinaryUploadResponse = {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
};

type FeedItem = {
  id: string;
  title: string;
  description: string;
  images: string[];
};

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/do9ertejv/image/upload";
const UPLOAD_PRESET = "BgMobile Photography";

export default function useFeed() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  // Handlers
  const handleTitleChange = (value: string) => {
    setTitle(value);
  }
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  }
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  }

  // Functions
  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "feed"));
      const data = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as FeedItem
      );
      console.log(data);
      setFeed(data);
      setLoading(false);
      return data;
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setLoading(false);
      throw err;
    }
  };

  // Functions
  const handleAddFeed = async () => {
    try {
      setLoading(true);
      const docRef = doc(collection(db, "feed"));
      const uploadedImages = await uploadImagesToCloudinary(images!);
      const feedItem: FeedItem = {
        id: docRef.id,
        title,
        description,
        images: uploadedImages.map((image) => image.secure_url),
      }
      await setDoc(docRef, feedItem);
      setLoading(false);
      return docRef.id;
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setLoading(false);
      throw err;
    }
  };

  const uploadImagesToCloudinary = async (filesToUpload: FileList) => {
    const uploaded: CloudinaryUploadResponse[] = [];
    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      uploaded.push(result);
    }
    return uploaded;
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImages(null);
  };

  return {
    loading,
    error,
    feed,
    title,
    description,
    handleGetFeed,
    handleAddFeed,
    handleTitleChange,
    handleDescriptionChange,
    handleImagesChange,
    resetForm,
  };
}
