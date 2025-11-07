import Modal from "../modal";

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
   <Modal onClose={onClose}>
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
    </Modal>

  );
}
