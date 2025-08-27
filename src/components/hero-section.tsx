import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Star, Wifi, Clock, Coffee } from 'lucide-react';
import hotelExterior from '@/assets/hotel-exterior.jpg';
import { BookingModal } from './booking-modal';

interface HeroSectionProps {
  onBookingClick: () => void;
}

export const HeroSection = ({ onBookingClick }: HeroSectionProps) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${hotelExterior})`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <MapPin className="w-3 h-3 mr-2" />
              Centro Histórico
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Clock className="w-3 h-3 mr-2" />
              Recepción 24h
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Coffee className="w-3 h-3 mr-2" />
              Desayuno en terraza
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6">
            Tu lugar en el
            <span className="block text-primary">Centro Histórico</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
            Vive la historia de México desde 1906. Ubicación privilegiada, 
            elegancia colonial y la mejor tarifa garantizada.
          </p>

          {/* Quick Booking Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 sm:p-8 max-w-2xl mx-auto shadow-elegant mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Check-in</label>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Seleccionar fecha</span>
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Check-out</label>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Seleccionar fecha</span>
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Huéspedes</label>
                <Button variant="outline" className="w-full justify-start">
                  2 Adultos
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Habitaciones</label>
                <Button variant="outline" className="w-full justify-start">
                  1 Habitación
                </Button>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-button text-lg font-semibold"
              onClick={onBookingClick}
            >
              Buscar disponibilidad
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-primary" />
              <span>Mejor tarifa garantizada</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-primary" />
              <span>Wi-Fi gratuito</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Cancelación flexible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg"
          className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => {
            const message = "Hola, me interesa hacer una reserva en Hotel Principal. ¿Podrían ayudarme?";
            window.open(`https://wa.me/525512345678?text=${encodeURIComponent(message)}`, '_blank');
          }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
          </svg>
        </Button>
      </div>
    </section>
  );
};