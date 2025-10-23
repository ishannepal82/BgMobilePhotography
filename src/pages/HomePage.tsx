import ImageCluster from "../components/homepage/Imagecluster";

export default function HomePage() {
  return (
    <div className="Hero w-full min-h-screen bg-background p-4 grid lg:grid-cols-2 items-center">
      
      {/* Left Column */}
      <div className="flex flex-col gap-6 items-center">
        {/* Hero Content */} 
        <div className="Content flex flex-col gap-4 h-full ">
          <h1 className="text-primary font-heading text-3xl sm:text-4xl font-bold font-bold">
            Welcome to <span className="text-accent">BgMobilePhotography</span>
          </h1>
          <p className="text-text text-lg sm:text-xl font-body">
            At BgMobilePhotography, we specialize in capturing fleeting moments and transforming them into timeless memories through the lens of a mobile camera.
          </p>
          <div className="cta flex gap-4 py-4">
            <button className=" text-xl text-text rounded-md bg-secondary w-fit py-2 px-8 font-poppins hover:scale-105 transition-all duration-300 hover:bg-text hover:text-secondary cursor-pointer">
            <span>
                Contact
            </span>
          </button>
          <button className=" text-xl hover:text-text rounded-md hover:bg-secondary w-fit py-2 px-8 font-poppins hover:scale-105 transition-all duration-300 bg-text text-secondary cursor-pointer">
            <span>
                Gallery
            </span>
          </button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="RightColumn w-full">
        <ImageCluster />
      </div>

    </div>
  );
}
