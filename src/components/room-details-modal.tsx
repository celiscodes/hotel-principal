import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Users, Bed, Wifi, Coffee, Shield, Car, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import roomInterior from '@/assets/room-interior.jpg';

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
  room: {
    id: string;
    name: string;
    description: string;
    occupancy: number;
    beds: string;
    size: string;
    price: number;
    amenities: string[];
  };
}

export const RoomDetailsModal = ({ isOpen, onClose, onBookNow, room }: RoomDetailsModalProps) => {
  const allAmenities = [
    { name: 'Wi-Fi gratuito de alta velocidad', included: true },
    { name: 'Aire acondicionado', included: true },
    { name: 'TV por cable HD', included: true },
    { name: 'Caja fuerte digital', included: true },
    { name: 'Baño privado con agua caliente 24h', included: true },
    { name: 'Servicio de limpieza diario', included: true },
    { name: 'Recepción 24 horas', included: true },
    { name: 'Mini refrigerador', included: room.amenities.includes('Mini refrigerador') },
    { name: 'Mesa de trabajo', included: room.amenities.includes('Mesa de trabajo') },
    { name: 'Sofá adicional', included: room.amenities.includes('Sofá') },
    { name: 'Bata de baño', included: room.amenities.includes('Bata de baño') },
    { name: 'Servicio a la habitación', included: false },
    { name: 'Balcón privado', included: false },
  ];

  const policies = [
    {
      title: 'Check-in / Check-out',
      details: ['Check-in: 15:00', 'Check-out: 12:00', 'Late check-out disponible (costo adicional)']
    },
    {
      title: 'Cancelación',
      details: ['Cancelación gratuita hasta 24h antes', 'Cancelaciones tardías: 1 noche de penalización', 'No-show: cargo total de la reserva']
    },
    {
      title: 'Política de huéspedes',
      details: ['Máximo ' + room.occupancy + ' huéspedes por habitación', 'Identificación oficial requerida', 'Depósito de garantía: $500 MXN']
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{room.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={roomInterior}
                alt={room.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Room Description */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-3">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {room.description} Esta habitación combina la elegancia colonial con amenidades modernas, 
                ofreciendo una experiencia única en el corazón del Centro Histórico de la Ciudad de México.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Hasta {room.occupancy} huéspedes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed className="w-4 h-4 text-primary" />
                  <span>{room.beds}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <span className="text-primary font-medium text-xs">m²</span>
                  </div>
                  <span>{room.size}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-primary" />
                  <span>Wi-Fi gratuito</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4">Amenidades incluidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {allAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {amenity.included ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className={cn(
                      "text-sm",
                      amenity.included ? "text-foreground" : "text-muted-foreground line-through"
                    )}>
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4">Políticas de la habitación</h3>
              <div className="space-y-4">
                {policies.map((policy, index) => (
                  <Card key={index} className="border-0 bg-accent">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{policy.title}</h4>
                      <ul className="space-y-1">
                        {policy.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="space-y-6">
            <Card className="sticky top-6 border-0 bg-gradient-card shadow-elegant">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-serif font-semibold text-foreground">
                    ${room.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">por noche</div>
                  <Badge className="mt-2 bg-success text-success-foreground">
                    Mejor tarifa garantizada
                  </Badge>
                </div>

                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-primary hover:opacity-90 shadow-button"
                    onClick={onBookNow}
                  >
                    Reservar ahora
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => {
                      const message = `Hola, me interesa la ${room.name} del Hotel Principal. ¿Podrían darme más información?`;
                      window.open(`https://wa.me/525512345678?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
                    </svg>
                    Consultar por WhatsApp
                  </Button>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  * Impuestos incluidos. Tarifa sujeta a disponibilidad.
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <h4 className="font-medium text-sm">¿Por qué reservar con nosotros?</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Check className="w-3 h-3 text-success" />
                      <span>Mejor tarifa garantizada</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3 h-3 text-success" />
                      <span>Cancelación gratuita</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3 h-3 text-success" />
                      <span>Confirmación inmediata</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3 h-3 text-success" />
                      <span>Sin cargos ocultos</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};