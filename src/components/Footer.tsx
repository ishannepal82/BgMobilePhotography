import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-accent text-text py-4 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-heading text-text font-bold">
          BgMobile<span className="text-primary">Photography</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 flex-wrap justify-center">
         <button>
            <Facebook />
         </button>
         <button>
            <Instagram />
         </button>
         <button>
            <Twitter />
         </button>
        </div>

        {/* Copyright */}
        <div className="text-sm text-text/70">
          © {new Date().getFullYear()} BgMobilePhotography. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
