import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="sticky w-full bg-accent/90 backdrop-blur-lg text-text py-3 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        
        {/* Logo / Brand */}
        <div className="text-xl md:text-2xl font-heading font-bold tracking-tight">
          <span className="text-primary">BgMobile</span>
          <span className="text-text">Photography</span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">
          <button className="hover:text-primary transition-colors">
            <Facebook size={20} />
          </button>
          <button className="hover:text-primary transition-colors">
            <Instagram size={20} />
          </button>
          <button className="hover:text-primary transition-colors">
            <Twitter size={20} />
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs md:text-sm text-text/70 text-center">
          © {new Date().getFullYear()} BgMobilePhotography. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
