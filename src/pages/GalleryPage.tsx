import GalleryCluster from "../components/gallerypage/GalleryCluster";
import RadialButton from "../components/gallerypage/radial-button";
import { useState } from "react";
import AlbumView from "../components/gallerypage/AlbumView";
import { useDashboard } from "../hooks/admin/useDashboard";
import { useQuery } from "@tanstack/react-query";

type Albums = {
  title: string;
  images: string[]
}
const FilterData = [
  {id:1, title:"All"},
  {id:2, title:"Nature"},
  {id:3, title:"VAC/Work"},
  {id:4, title:"People"},
  {id:5, title:"Travel"},
]

const Albums: Albums[] = [
    {"title": "Nature", "images": ["/img-1.jpg", "/img-4.jpg", "/img-3.jpg", "/img-4.jpg"]},
    {"title": "VAC/Work", "images": ["/img-1.jpg", "/img-2.jpg", "/img-3.jpg", "/img-4.jpg"]},
    {"title": "People", "images": ["/img-1.jpg", "/img-2.jpg", "/img-3.jpg", "/img-4.jpg"]},
    {"title": "Travel", "images": ["/img-1.jpg", "/img-2.jpg", "/img-3.jpg", "/img-4.jpg"]},
  ]

export default function GalleryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const {handleGetDashboard} = useDashboard();
  const {data} = useQuery({
    queryKey:["gallery"], 
    queryFn: handleGetDashboard
  });
  console.log(data);
  
  return (
    <>
    {isOpen && (
        <AlbumView albumTitle={Albums[0].title} albumDescription={Albums[0].title} albumImages={Albums[0].images} onClose={toggleModal}/>
    )}
    <div className="h-[100%] sm:h-screen w-full p-4 bg-background text-white relative ">
      <div className="flex justify-between items-center text-text font-accent w-full text-center">
        <h1 className="font-heading text-4xl text-text w-full">Gallery</h1>
      </div>
      <div>
        <div className="flex items-center gap-4 justify-center flex-wrap">
          {FilterData.map((item) => (
            <RadialButton key={item.id} content={item.title} />
          ))}
        </div>
      </div>
      <div className="scale-[95%] z-10 h-[100%] sm:h-full">
        <GalleryCluster Albums={Albums}/>
      </div>
    </div>
    </>
  );
}
