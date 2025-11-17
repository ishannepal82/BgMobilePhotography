import { useState } from "react";

export function DotBackground() {
  const rows = 30;
  const cols = 50;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getRowCol = (index: number) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    return { row, col };
  };

  const getDistance = (idx1:number, idx2:number) => {
    const pos1 = getRowCol(idx1);
    const pos2 = getRowCol(idx2);
    return Math.sqrt(
      Math.pow(pos1.row - pos2.row, 2) + Math.pow(pos1.col - pos2.col, 2)
    );
  };

  const getEffectIntensity = (distance:number) => {
    const maxDistance = 6;
    if (distance > maxDistance) return 0;
    return 1 - distance / maxDistance;
  };

  return (
    <div className="absolute w-full h-full bg-transparent overflow-hidden pointer-events-none">
      {/* CSS background dots */}
      <div className="absolute inset-0 [background-size:10px_10px] [background-image:radial-gradient(#666_0.8px,transparent_0.8px)] [mask-image:radial-gradient(circle_at_center,black_20%,transparent_100%)] pointer-events-none" />

      {/* Interactive dot grid overlay */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          pointerEvents: "auto",
          padding: "10px",
          gap: "5px",
        }}
      >
        {Array.from({ length: rows * cols }, (_, idx) => {
          const distance = hoveredIndex !== null ? getDistance(idx, hoveredIndex) : Infinity;
          const intensity = getEffectIntensity(distance);
          const isAffected = intensity > 0;
          
          const scale = isAffected ? 1 + (intensity * 1.2) : 1;
          const opacity = isAffected ? 0.4 + (intensity * 0.6) : 0;
          
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              <div
                className="rounded-full bg-blue-500"
                style={{
                  width: "6px",
                  height: "6px",
                  transform: `scale(${scale})`,
                  opacity: opacity,
                  transition: isAffected 
                    ? "all 200ms ease-out" 
                    : "all 500ms ease-out",
                  boxShadow: isAffected
                    ? `0 0 ${15 * intensity}px ${3 * intensity}px rgba(59, 130, 246, ${0.7 * intensity}), 
                       0 0 ${30 * intensity}px ${6 * intensity}px rgba(59, 130, 246, ${0.3 * intensity})`
                    : "none",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}