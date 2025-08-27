import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Users, Bed, Wifi, Coffee, Shield, Car } from 'lucide-react';
import roomInterior from '@/assets/room-interior.jpg';
import { BookingModal } from './booking-modal';
import { RoomDetailsModal } from './room-details-modal';

interface Room {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  occupancy: number;
  beds: string;
  size: string;
  price: number;
  amenities: string[];
  image: string;
}

const rooms: Room[] = [
  {
    id: 'sencilla',
    name: 'Habitación Sencilla',
    nameEn: 'Single Room',
    description: 'Perfecta para viajeros de negocios o turistas individuales. Cómoda y funcional.',
    descriptionEn: 'Perfect for business travelers or individual tourists. Comfortable and functional.',
    occupancy: 1,
    beds: '1 cama individual',
    size: '15 m²',
    price: 1200,
    amenities: ['Wi-Fi gratuito', 'Caja fuerte', 'TV por cable', 'Aire acondicionado'],
    image: roomInterior
  },
  {
    id: 'doble',
    name: 'Habitación Doble',
    nameEn: 'Double Room',
    description: 'Ideal para parejas o viajeros que buscan mayor comodidad y espacio.',
    descriptionEn: 'Ideal for couples or travelers seeking more comfort and space.',
    occupancy: 2,
    beds: '1 cama matrimonial',
    size: '18 m²',
    price: 1500,
    amenities: ['Wi-Fi gratuito', 'Caja fuerte', 'TV por cable', 'Aire acondicionado', 'Mini refrigerador'],
    image: roomInterior
  },
  {
    id: 'triple',
    name: 'Habitación Familiar Triple',
    nameEn: 'Triple Family Room',
    description: 'Espaciosa habitación familiar con capacidad para tres personas cómodamente.',
    descriptionEn: 'Spacious family room accommodating three people comfortably.',
    occupancy: 3,
    beds: '1 cama matrimonial + 1 individual',
    size: '22 m²',
    price: 1800,
    amenities: ['Wi-Fi gratuito', 'Caja fuerte', 'TV por cable', 'Aire acondicionado', 'Mini refrigerador', 'Mesa de trabajo'],
    image: roomInterior
  },
  {
    id: 'cuadruple',
    name: 'Habitación Familiar Cuádruple',
    nameEn: 'Quadruple Family Room',
    description: 'La opción perfecta para familias numerosas que buscan comodidad y privacidad.',
    descriptionEn: 'Perfect choice for large families seeking comfort and privacy.',
    occupancy: 4,
    beds: '2 camas matrimoniales',
    size: '26 m²',
    price: 2200,
    amenities: ['Wi-Fi gratuito', 'Caja fuerte', 'TV por cable', 'Aire acondicionado', 'Mini refrigerador', 'Mesa de trabajo', 'Sofá'],
    image: roomInterior
  },
  {
    id: 'king',
    name: 'Habitación King',
    nameEn: 'King Room',
    description: 'Nuestra habitación más elegante con cama king size y amenidades premium.',
    descriptionEn: 'Our most elegant room with king size bed and premium amenities.',
    occupancy: 2,
    beds: '1 cama king size',
    size: '24 m²',
    price: 2500,
    amenities: ['Wi-Fi gratuito', 'Caja fuerte', 'TV por cable', 'Aire acondicionado', 'Mini refrigerador', 'Mesa de trabajo', 'Bata de baño'],
    image: roomInterior
  }
];

const amenityIcons = {
  'Wi-Fi gratuito': Wifi,
  'Caja fuerte': Shield,
  'TV por cable': Car,
  'Aire acondicionado': Car,
  'Mini refrigerador': Coffee,
  'Mesa de trabajo': Car,
  'Sofá': Car,
  'Bata de baño': Car
};

export const RoomsSection = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setBookingModalOpen(true);
  };

  const handleRoomDetails = (room: Room) => {
    setSelectedRoom(room);
    setDetailsModalOpen(true);
  };
  return (
    <section id="rooms" className="py-16 lg:py-24 bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Nuestras Habitaciones
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada habitación combina la elegancia colonial con amenidades modernas, 
            ofreciendo el comfort perfecto para tu estancia en el Centro Histórico.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden group hover:shadow-elegant transition-all duration-300 border-0 bg-gradient-card">
              <CardHeader className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground font-semibold">
                      desde ${room.price.toLocaleString()}/noche
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {room.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{room.occupancy}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {room.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm">
                    <Bed className="w-4 h-4 text-primary" />
                    <span>{room.beds}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <span className="text-primary font-medium text-xs">m²</span>
                    </div>
                    <span>{room.size}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {room.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{room.amenities.length - 3} más
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 space-y-3">
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-button"
                  size="lg"
                  onClick={() => handleBookRoom(room)}
                >
                  Ver disponibilidad
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={() => handleRoomDetails(room)}
                >
                  Más detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            onClick={() => {
              const element = document.querySelector('#rooms');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Ver todas las habitaciones
          </Button>
        </div>

        {/* Modals */}
        {selectedRoom && (
          <>
            <BookingModal
              isOpen={bookingModalOpen}
              onClose={() => {
                setBookingModalOpen(false);
                setSelectedRoom(null);
              }}
              roomId={selectedRoom.id}
              roomName={selectedRoom.name}
              roomPrice={selectedRoom.price}
            />
            <RoomDetailsModal
              isOpen={detailsModalOpen}
              onClose={() => {
                setDetailsModalOpen(false);
                setSelectedRoom(null);
              }}
              onBookNow={() => {
                setDetailsModalOpen(false);
                setBookingModalOpen(true);
              }}
              room={selectedRoom}
            />
          </>
        )}
      </div>
    </section>
  );
};