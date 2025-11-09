import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Using lucide-react icons
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'Home', url:'/' },
    { name: 'Gallery', url: '/gallery' },
    { name: 'Feed', url: '/feed' },
    { name: 'Contact', url: '/contact' },
    { name: token ? 'Pannel' : 'Login', url: token ? '/admin/home' : '/user'},
  ];


  return (
    <header className="w-full sticky top-0 z-50 bg-background/50 backdrop-blur-xl border-b border-primary/20 shadow-lg text-text font-body">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 gap-0">
        {/* Logo */}
        <button className='cursor-pointer' onClick={() => navigate('/')}>
          <h1 className="text-primary font-heading text-2xl sm:text-4xl font-bold">
          BgMobile<span className="text-accent">Photography</span>
        </h1>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-8 items-center cursor-pointer">
          {menuItems.map((item) => (
            <a
              key={item.name}
              onClick={() => navigate(item.url)}
              className="hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-primary/20 transition">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-background/70 backdrop-blur-xl w-full px-4 pb-4 flex flex-col gap-4">
          {menuItems.map((item) => (
            <a
              key={item.name}
              className="hover:text-primary transition-colors duration-300"
              onClick={() => {
                setIsOpen(false);
                navigate(item.url);
              }} 
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
