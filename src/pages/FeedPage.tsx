import { useState } from "react";
import FeedCluster from "../feedpage/FeedCluster";
import useFeed from "../hooks/useFeed";
import { useQuery } from "@tanstack/react-query";

// src/types/feed.ts
interface FeedItem {
  id: string;
  title: string;
  description: string;
  images: string[];
}


export default function FeedPage() {
  const {handleGetFeed} = useFeed();
  const {data, isLoading} = useQuery({
    queryKey: ["feed"],
    queryFn: handleGetFeed
  }); 
  
  const feedItems: FeedItem[] = Array.isArray(data) ? data.filter((item): item is FeedItem => item != null) : [];
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openModal = (item: FeedItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem && currentImageIndex < selectedItem.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Header with gradient accent */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-text/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-accent via-primary to-secondary rounded-full"></div>
            <div>
              <h1 className="font-heading text-4xl text-text tracking-tight">Feed</h1>
              <p className="text-text/60 text-sm font-accent mt-1">Discover latest updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="feedcluster">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-text/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-text font-accent text-lg mt-6">Loading your feed...</p>
              <p className="text-text/40 text-sm mt-2">Fetching the latest content</p>
            </div>
          ) : feedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 bg-text/5 rounded-2xl flex items-center justify-center mb-6 border border-text/10">
                <svg className="w-12 h-12 text-text/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-heading text-text mb-2">No feed items yet</h2>
              <p className="text-text/50 font-accent text-center max-w-md">
                Your feed is empty. New content will appear here as it becomes available.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {feedItems.map((item, index) => (
                <div 
                  key={item.id || index}
                  onClick={() => openModal(item)}
                  className="bg-background/50 backdrop-blur-sm rounded-2xl border border-text/10 overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 group cursor-pointer"
                >
                  <FeedCluster 
                    title={item.title}
                    description={item.description}
                    images={item.images}
                  />
                  <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-accent via-primary to-secondary"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-5xl bg-background/80 backdrop-blur-lg rounded-3xl border border-text/20 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full border border-text/20 flex items-center justify-center text-text/60 hover:text-accent hover:border-accent/50 transition-all duration-300 group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Carousel */}
            <div className="relative aspect-video bg-background/50">
              <img
                src={selectedItem.images[currentImageIndex]}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
              />

              {/* Navigation arrows */}
              {selectedItem.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    disabled={currentImageIndex === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full border border-text/20 flex items-center justify-center text-text/60 hover:text-accent hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={nextImage}
                    disabled={currentImageIndex === selectedItem.images.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full border border-text/20 flex items-center justify-center text-text/60 hover:text-accent hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image counter */}
              {selectedItem.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-text/20 text-text/80 text-sm font-accent">
                  {currentImageIndex + 1} / {selectedItem.images.length}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1 h-16 bg-gradient-to-b from-accent via-primary to-secondary rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <h2 className="text-3xl font-heading text-accent mb-2">{selectedItem.title}</h2>
                  <p className="text-text/70 font-body text-lg leading-relaxed">{selectedItem.description}</p>
                </div>
              </div>

              {/* Thumbnail dots */}
              {selectedItem.images.length > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                  {selectedItem.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentImageIndex
                          ? 'w-8 h-2 bg-gradient-to-r from-accent via-primary to-secondary'
                          : 'w-2 h-2 bg-text/20 hover:bg-text/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom spacing */}
      <div className="h-16"></div>
      
      {/* Decorative gradient elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}