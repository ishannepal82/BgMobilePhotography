export default function GalleryCluster({Albums} : {Albums: {title: string, images: string[]}[]}) {
  return (
    <>
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center place-items-center mt-6">
        {Albums.map((Album) => (
          <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden group">
          <img
            src={Album.images[0]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-1">{Album.title}</h3>
            <p className="text-sm font-light">{Album.images.length} Photos</p>
          </div>
      </div>
        ))}
     </div>
    </>

        
)}
