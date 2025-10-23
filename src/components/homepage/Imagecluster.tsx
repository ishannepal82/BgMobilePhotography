import img2 from '../../assets/img-2.jpg';
import img3 from '../../assets/img-3.jpg';
import img4 from '../../assets/img-4.jpg';

export default function ImageCluster() {
  return (
    <div className="Img-Cluster grid grid-cols-4 gap-4 p-4">

      {/* Big Hero Image */}
      <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={img4}
          alt="Img-4"
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Medium Tile */}
      <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={img2}
          alt="Img-2"
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Tall Tile */}
      <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={img3}
          alt="Img-3"
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  )
}
