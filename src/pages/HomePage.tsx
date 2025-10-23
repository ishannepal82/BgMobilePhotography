import ImageCluster from "../components/homepage/Imagecluster";
import { DotBackground } from "../components/DottedBg";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dotted background behind all content */}
      <div className="inset-0 -z-10">
        <DotBackground />
      </div>

      {/* Hero Section */}
      <div className="w-full min-h-screen bg-background/80 p-4 grid lg:grid-cols-2 items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-4 h-full text-center lg:text-left">
            <h1 className="text-primary font-heading text-3xl sm:text-4xl font-bold">
              Welcome to <span className="text-accent">BgMobilePhotography</span>
            </h1>
            <p className="text-text text-lg sm:text-xl font-body">
              At BgMobilePhotography, we specialize in capturing fleeting moments and
              transforming them into timeless memories through the lens of a mobile camera.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 py-4">
              <button className="text-xl text-text rounded-md bg-secondary w-fit py-2 px-8 font-poppins hover:scale-105 transition-all duration-300 hover:bg-text hover:text-secondary cursor-pointer">
                Contact Me
              </button>
              <button className="text-xl rounded-md bg-text text-secondary w-fit py-2 px-8 font-poppins hover:scale-105 transition-all duration-300 hover:bg-secondary hover:text-text cursor-pointer">
                Gallery
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="RightColumn w-full">
          <ImageCluster />
        </div>
      </div>
    </div>
  );
}
