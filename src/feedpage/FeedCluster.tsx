type FeedClusterProps = {
  title: string;
  description: string;
  images: string[];
};

export default function FeedCluster({ title, description, images }: FeedClusterProps) {
  const imagesToDisplay = images.slice(0, 2);
  
  return (
    <div className="w-full md:w-1/2 mx-auto md:py-8 py-4 md:px-4 px-2">
      <div className="grid grid-cols-2 gap-4 auto-rows-[200px]">
        {imagesToDisplay.map((image, index) => (
          <div 
            key={index} 
            className="col-span-1 row-span-1 group relative overflow-hidden rounded-xl shadow-xl shadow-background/50 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 border border-text/10 hover:border-accent/30"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated corner accent */}
            <div className="absolute top-0 right-0 w-0 h-0.5 bg-gradient-to-r from-accent via-primary to-secondary group-hover:w-full transition-all duration-700 ease-out"></div>
          </div>
        ))}
      </div>
      
      {/* Enhanced divider with gradient */}
      <div className="relative mt-4 mb-3">
        <div className="border-b-2 border-text/10"></div>
        <div className="absolute inset-0 border-b-2 border-transparent bg-gradient-to-r from-transparent via-accent/30 to-transparent bg-clip-border opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="space-y-2 font-body">
        <h1 className="text-2xl text-accent font-semibold tracking-tight leading-tight hover:text-primary transition-colors duration-300 cursor-default">
          {title}
        </h1>
        <p className="text-text/60 font-body leading-relaxed text-[15px]">
          {description}
        </p>
      </div>
    </div>
  );
}