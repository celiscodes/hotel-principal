import React, { useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/hero-section';
import { RoomsSection } from '@/components/rooms-section';
import { HistorySection } from '@/components/history-section';
import { ServicesSection } from '@/components/services-section';
import { BookingModal } from '@/components/booking-modal';

const Index = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation onBookingClick={() => setBookingModalOpen(true)} />
      <main>
        <HeroSection onBookingClick={() => setBookingModalOpen(true)} />
        <RoomsSection />
        <HistorySection />
        <ServicesSection />
      </main>
      
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
};

export default Index;
