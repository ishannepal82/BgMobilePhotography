import FeedCluster from "../feedpage/FeedCluster";
import useFeed from "../hooks/useFeed";
import { useQuery } from "@tanstack/react-query";

export default function FeedPage() {
  const {handleGetFeed} = useFeed();

  const {data, isLoading} = useQuery({
    queryKey: ["feed"],
    queryFn: handleGetFeed
  }); 
  
  const feedItems = Array.isArray(data) ? data.filter(item => item != null) : [];
  
  return (
    <div className="h-[100%] w-full p-4 bg-background text-white relative ">
        <div className="flex justify-between items-center text-text font-accent w-full text-center">
          <h1 className="font-heading text-4xl text-text w-full">Feed</h1>
        </div>
        <div className="feedcluster h-[100%] sm:h-full">
            {isLoading ? (
              <div className="text-center py-8 text-text/60">Loading feed...</div>
            ) : feedItems.length === 0 ? (
              <div className="text-center py-8 text-text/60">No feed items yet</div>
            ) : (
              feedItems.map((item, index) => (
                <FeedCluster 
                  key={item.id || index}
                  title={item.title}
                  description={item.description}
                  images={item.images}
                />
              ))
            )}
        </div>
    </div>
  )
}
