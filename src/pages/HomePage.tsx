import ImageCluster from "../components/homepage/Imagecluster";
import { DotBackground } from "../components/DottedBg";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Dotted background behind all content */}
      <div className="inset-0 z-50">
        <DotBackground />
      </div>

      {/* Hero Section */}
      <section className="hero text-text text-lg font-body flex flex-col items-center m-8 relative mx-auto px-4">
        <div className="main text-center w-1/2 animate-fade_in">
          <h1 className="text-3xl md:text-4xl m-2 bg-gradient-to-tr bg-clip-text text-transparent from-primary  to-secondary font-semibold py-2">
            Capture the Moment
          </h1>
          <p className="mt-2 break-words text-base md:text-lg leading-relaxed">
            Explore stunning photo collections that beautifully capture moments and tell your unique story.
            Explore stunning photo collections that beautifully capture moments and tell your unique story.
          </p>
        </div>

        <div className="actions flex gap-4 mt-6 animate-appear">
          <button
            onClick={() => navigate("/gallery")}
            className="bg-secondary rounded-md px-4 py-2 hover:bg-text hover:text-secondary w-[160px] duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Go to Gallery"
          >
            Gallery
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="bg-text text-secondary rounded-md px-4 py-2 hover:bg-secondary hover:text-text duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-accent w-[160px]"
            aria-label="Go to Contact Me"
          >
            Contact Me
          </button>
        </div>
      </section>

      {/* Image cluster */}
      <section className="right-column w-full md:w-1/2 mx-auto mt-12 px-4">
        <ImageCluster />
      </section>
    </main>
  );
}
