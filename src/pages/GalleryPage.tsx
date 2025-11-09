import GalleryCluster from "../components/gallerypage/GalleryCluster";
import RadialButton from "../components/gallerypage/radial-button";
import { useState } from "react";
import AlbumView from "../components/gallerypage/AlbumView";
import useGallery from "../hooks/useGallery";
import { useQuery } from "@tanstack/react-query";
import Modal from "../components/modal";

type Albums = {
  title: string;
  images: string[]
}

type FilterData = {
  id: number;
  title: string;
}

export default function GalleryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);


  const {handleGetGallery, loading} = useGallery();
  const {data} = useQuery({
    queryKey:["gallery"], 
    queryFn: handleGetGallery
  }); 
  
  const albums: Albums[] = data?.map((item) => ({
    title: item.title,
    images: item.images
  })) || [];

  const FilterData: FilterData[] = albums.map((item, index) => ({
    id: index + 1,
    title: item.title,
  })) || [];
  
  return (
    <>
      {loading && <div className="text-text">Loading...</div>}
      {isOpen && (
        <Modal onClose={toggleModal}>
          <AlbumView albumTitle="Album Title" albumDescription="Album Description" albumImages={albums?.[0]?.images || []} onClose={toggleModal} />
        </Modal>
      )}
      {!loading && (
        <div className="h-[100%] w-full p-4 bg-background text-white relative ">
          <div className="flex justify-between items-center text-text font-accent w-full text-center">
            <h1 className="font-heading text-4xl text-text w-full">Gallery</h1>
          </div>
          <div>
            <div className="flex items-center gap-4 justify-center flex-wrap">
              {FilterData?.splice(0, 4).map((item) => (
                <RadialButton key={item.id} content={item.title} />
              ))}
            </div>
          </div>
          <div className="scale-[95%] z-10 h-[100%] sm:h-[100vh]">
            <GalleryCluster Albums={albums} />
          </div>
        </div>
      )}
    </>
  );
}
