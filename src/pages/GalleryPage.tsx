import { Menu } from "lucide-react";
import GalleryCluster from "../components/gallerypage/GalleryCluster";
import SideBar from "../components/SideBar";
import { useState } from "react";

export default function GalleryPage() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className="h-full w-full p-4 bg-background text-white relative">
      <button className="absolute top-8 right-10 z-10 bg-primary/50 rounded-xl p-2" onClick={() => setIsOpen(true)}>
        <Menu/>
      </button>
      <div className="scale-90 z-10">
        <GalleryCluster />
      </div>
      {isOpen && (
        <div className="z-10 absolute inset-0 w-full h-full">
          <SideBar toggleMenu={toggleMenu} />
        </div>
      )}

    </div>
  );
}
