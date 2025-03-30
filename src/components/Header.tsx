
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, BookOpen, Calculator, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-heading font-bold text-lg md:text-xl">SchuleBauerLernen</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/subject/math" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <Calculator className="mr-2 h-5 w-5" />
            <span>Mathematik</span>
          </Link>
          <Link to="/subject/german" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <BookOpen className="mr-2 h-5 w-5" />
            <span>Deutsch</span>
          </Link>
          <Link to="/subject/english" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <Globe className="mr-2 h-5 w-5" />
            <span>Englisch</span>
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button size="sm" variant="ghost">Anmelden</Button>
          <Button size="sm">Registrieren</Button>
        </div>
        
        <button 
          onClick={toggleMenu} 
          className="flex md:hidden items-center justify-center rounded-md p-2"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Menu</span>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-x-0 top-16 z-50 w-full overflow-hidden bg-white pb-12 md:hidden shadow-md transition-transform duration-300",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="space-y-4 px-6 pt-6">
          <Link 
            to="/subject/math" 
            onClick={closeMenu}
            className="flex items-center py-3 text-base font-medium text-muted-foreground hover:text-primary"
          >
            <Calculator className="mr-2 h-5 w-5" />
            <span>Mathematik</span>
          </Link>
          <Link 
            to="/subject/german" 
            onClick={closeMenu}
            className="flex items-center py-3 text-base font-medium text-muted-foreground hover:text-primary"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            <span>Deutsch</span>
          </Link>
          <Link 
            to="/subject/english" 
            onClick={closeMenu}
            className="flex items-center py-3 text-base font-medium text-muted-foreground hover:text-primary"
          >
            <Globe className="mr-2 h-5 w-5" />
            <span>Englisch</span>
          </Link>
          
          <div className="flex flex-col gap-3 pt-4">
            <Button variant="outline" className="w-full">Anmelden</Button>
            <Button className="w-full">Registrieren</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
