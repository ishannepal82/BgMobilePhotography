

export default function GalleryCluster() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-6 gap-4">
        
        {/* Item 1 */}
        <div className="relative col-span-1 sm:col-span-1 row-span-1 bg-neutral-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition">
          <img src="/img-1.jpg" alt="Mountains" className="w-full h-full object-cover opacity-90" />
          <div className="absolute bottom-4 left-4 text-lg font-semibold">Mountains</div>
        </div>

        {/* Item 2 */}
        <div className="relative col-span-2 row-span-1 bg-neutral-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition">
          <img src="/img-5.jpg" alt="Forest" className="w-full h-full object-cover opacity-90" />
          <div className="absolute bottom-4 left-4 text-lg font-semibold">Forest</div>
        </div>

        {/* Item 3 */}
        <div className="relative col-span-1 row-span-1 bg-neutral-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition">
          <img src="/img-3.jpg" alt="Desert" className="w-full h-full object-cover opacity-90" />
          <div className="absolute bottom-4 left-4 text-lg font-semibold">Desert</div>
        </div>

        <div className="relative col-span-1 row-span-2 bg-neutral-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition">
          <img src="/img-3.jpg" alt="Desert" className="w-full h-full object-cover opacity-90" />
          <div className="absolute bottom-4 left-4 text-lg font-semibold">Desert</div>
        </div>

        {/* Item 4 */}
        <div className="relative col-span-1 sm:col-span-1 row-span-1 bg-neutral-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition">
          <img src="/img-4.jpg" alt="Ocean" className="w-full h-full object-cover opacity-90" />
          <div className="absolute bottom-4 left-4 text-lg font-semibold">Ocean</div>
        </div>

        <div className="relative col-span-1 sm:col-span-2 row-span-1 bg-neutral-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition">
          <img src="/img-8.jpg" alt="Ocean" className="w-full h-full object-cover opacity-90" />
          <div className="absolute bottom-4 left-4 text-lg font-semibold">Ocean</div>
        </div>
        
        <div className="relative col-span-1 sm:col-span-1 row-span-1 bg-neutral-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition">
          <img src="/img-6.jpg" alt="Ocean" className="w-full h-full object-cover opacity-90" />
          <div className="absolute bottom-4 left-4 text-lg font-semibold">Ocean</div>
        </div>

    </div>
  )
}
