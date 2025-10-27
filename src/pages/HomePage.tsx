import ImageCluster from "../components/homepage/Imagecluster";
import { DotBackground } from "../components/DottedBg";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dotted background behind all content */}
      <div className="inset-0 -z-10">
        <DotBackground />
      </div>

      {/* Hero Section */}
      <div className="w-full min-h-screen bg-background/80 p-4 grid lg:grid-cols-2 items-center">
        {/* Left Column */}
        <div className="flex sm:w-[80%] m-auto gap-6 items-center">
          <div className="flex flex-col gap-4 h-full text-center lg:text-left">
            <h1 className="text-primary font- text-3xl sm:text-4xl font-bold">
             Moments in Light, Shadows in Silence, Stories Untold
            </h1>
            <p className="text-text text-lg sm:text-xl font-body">
              At BgMobilePhotography, we specialize in capturing fleeting moments and
              transforming them into timeless memories through the lens of a mobile camera.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 py-4">
              <button className="text-xl text-text rounded-md bg-secondary w-fit py-2 px-8 font-poppins hover:scale-105 transition-all duration-300 hover:bg-text hover:text-secondary cursor-pointer" onClick={() => navigate('/contact')}>
                Contact Me
              </button>
              <button className="text-xl rounded-md bg-text text-secondary w-fit py-2 px-8 font-poppins hover:scale-105 transition-all duration-300 hover:bg-secondary hover:text-text cursor-pointer" onClick={() => navigate('/gallery')}>
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
