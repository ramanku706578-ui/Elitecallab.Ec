import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'AI Tools', page: 'ai-tools' },
  { label: 'Creators', page: 'creators' },
  { label: 'Brands', page: 'brands' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                Elitecallab
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    currentPage === item.page ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleNavClick('login')}
              >
                Log In
              </Button>
              <Button 
                size="sm"
                onClick={() => handleNavClick('login')}
                className="bg-primary hover:bg-primary/90"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div 
          className={`absolute top-16 left-0 right-0 bg-white shadow-lg transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  currentPage === item.page 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleNavClick('login')}
              >
                Log In
              </Button>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => handleNavClick('login')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
