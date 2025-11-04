
export default function AlbumView({
  albumTitle,
  albumDescription,
  albumImages,
  onClose,
}: {
  albumTitle: string;
  albumDescription: string;
  albumImages: string[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-background/30 rounded-2xl shadow-2xl p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Title Section */}
        <div className="mb-4 text-center text-primary">
          <h1 className="text-2xl font-bold">{albumTitle}</h1>
          <p className="text-text mt-1">{albumDescription}</p>
        </div>

        {/* Images Section */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {albumImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Album image ${index + 1}`}
              className="object-cover w-full h-64 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
