import React from "react";

export function DotBackground() {
  return (
   <div className="absolute w-full h-full bg-transparent overflow-hidden pointer-events-none">
    <div
        className="
        absolute inset-0
        [background-size:20px_20px]
        [background-image:radial-gradient(#666_1px,transparent_1px)]
        [mask-image:radial-gradient(circle_at_center,black_20%,transparent_100%)]
        "
    />
    </div>
  );
}
