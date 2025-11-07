import { X } from "lucide-react";
import type { ReactNode } from "react";

export default function Modal({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-background/30 rounded-2xl shadow-2xl p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-10  text-red-500 hover:text-red-800 text-2xl font-bold"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  )
}
