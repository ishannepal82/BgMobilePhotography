import { useState } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig";


interface GalleryItem {
  title: string;
  images: string[];
}


interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
}

export default function useGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploadResults, setUploadResults] = useState<CloudinaryUploadResponse[]>([]);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/do9ertejv/image/upload";
  const UPLOAD_PRESET = "BgMobile Photography";


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };


  const uploadImagesToCloudinary = async (filesToUpload: FileList) => {
    const uploaded: CloudinaryUploadResponse[] = [];

    for (let i = 0; i < filesToUpload.length; i++) {
      const formData = new FormData();
      formData.append("file", filesToUpload[i]);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Cloudinary upload failed");

        const data = await res.json();
        uploaded.push(data);
      } catch (err) {
        console.error("Upload failed:", err);
        setError(err instanceof Error ? err.message : String(err));
        throw err;
      }
    }

    setUploadResults(uploaded);
    return uploaded.map((u) => u.secure_url);
  };

  // Integrated function: Upload images and add to gallery
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      setError("Please select at least one image");
      return;
    }

    if (!title.trim()) {
      setError("Please provide a title");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const imageUrls = await uploadImagesToCloudinary(files);

      const docRef = await addDoc(collection(db, "gallery"), {
        title: title.trim(),
        images: imageUrls,
      });

      // Reset form state
      setFiles(null);
      setLoading(false);

      return { docRef, imageUrls };
    } catch (err) {
      console.error("Failed to create gallery:", err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setLoading(false);
      throw err;
    }
  };

  // Fetch all gallery documents
  const handleGetGallery = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const data = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as GalleryItem
      );
      setGallery(data);
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

  return {
    loading,
    error,
    gallery,
    handleFileChange,
    handleSubmit,
    handleGetGallery,
    uploadResults,
  };
}
