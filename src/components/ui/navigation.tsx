import React, { useState } from 'react';
import { Button } from './button';
import { Calendar, Phone, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
  onBookingClick: () => void;
}

export const Navigation = ({ className, onBookingClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleWhatsApp = () => {
    const message = "Hola, me interesa hacer una reserva en Hotel Principal. ¿Podrían ayudarme?";
    window.open(`https://wa.me/525512345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  const navItems = [
    { name: 'Inicio', href: '#home', nameEn: 'Home' },
    { name: 'Habitaciones', href: '#rooms', nameEn: 'Rooms' },
    { name: 'Historia', href: '#history', nameEn: 'History' },
    { name: 'Servicios', href: '#services', nameEn: 'Services' },
    { name: 'Ubicación', href: '#location', nameEn: 'Location' },
    { name: 'Contacto', href: '#contact', nameEn: 'Contact' },
  ];

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-secondary-dark rounded-full flex items-center justify-center shrink-0">
    <span className="text-primary font-serif font-semibold text-sm sm:text-base lg:text-xl">HP</span>
  </div>
  <div className="hidden sm:block leading-tight">
    <h1 className="font-serif font-semibold text-base sm:text-lg md:text-xl text-foreground whitespace-nowrap">
      Hotel Principal
    </h1>
    <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground">
      Centro Histórico • Ciudad de México
    </p>
  </div>
</div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
              onClick={handleWhatsApp}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">WhatsApp</span>
            </Button>
            
            <Button 
              variant="default"
              size="sm"
              className="bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-button"
              onClick={onBookingClick}
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span className="font-medium">Reservar</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent transition-colors duration-200 cursor-pointer text-left w-full"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};