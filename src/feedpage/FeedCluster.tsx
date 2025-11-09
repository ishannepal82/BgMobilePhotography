type FeedClusterProps = {
  title: string;
  description: string;
  images: string[];
};

export default function FeedCluster({ title, description, images }: FeedClusterProps) {
  const imagesToDisplay = images.slice(0, 2);

  return (
    <div className="w-full md:w-1/2 mx-auto md:py-8 py-4 md:px-4 px-2 ">
      <div className="grid grid-cols-2 gap-4 auto-rows-[200px]">
        {/* Tall image - spans 1x2 */}
        {imagesToDisplay.map((image, index) => (
          <div key={index} className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
      <div className="border-b-2 border-text/20 mt-2"></div>
      <div className="Text font-body">
        <h1 className="text-2xl text-accent font-heading font-bold">{title}</h1>
        <p className="text-text/50 font-body">{description}</p>
      </div>
    </div>
  );
}
