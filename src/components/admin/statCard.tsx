import React from "react";

interface StatCardProps {
  title: string;
  count: number | string;
  icon: React.ElementType;
  color?: string;
  desc?: string;
}

export default function StatCard({
  title,
  count,
  icon: Icon,
  color = "bg-primary/20 text-primary",
  desc,
}: StatCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-2xl border border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-md min-w-full max-w-fit ${color}`}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-3">
        <Icon className="w-7 h-7" />
      </div>

      {/* Text Content */}
      <h2 className="text-xl font-semibold text-text">{title}</h2>
      <p className="text-3xl font-bold mt-1 text-text">{count}</p>
      {desc && (
        <p className="text-sm text-gray-400 text-center mt-2 max-w-[200px]">
          {desc}
        </p>
      )}
    </div>
  );
}
