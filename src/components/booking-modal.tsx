import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { CalendarIcon, Users, Bed, Wifi, Coffee, Plus, Minus, Clock, Car, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
  roomName?: string;
  roomPrice?: number;
}

export const BookingModal = ({ isOpen, onClose, roomId, roomName, roomPrice }: BookingModalProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [step, setStep] = useState(1);
  const [extras, setExtras] = useState({
    breakfast: false,
    lateCheckout: false,
    airport: false,
    tours: false
  });
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: ''
  });

  const { toast } = useToast();

  const extrasOptions = [
    { id: 'breakfast', name: 'Desayuno en terraza', price: 250, icon: Coffee },
    { id: 'lateCheckout', name: 'Late checkout (2 PM)', price: 200, icon: Clock },
    { id: 'airport', name: 'Transporte aeropuerto', price: 450, icon: Car },
    { id: 'tours', name: 'Tour Centro Histórico', price: 350, icon: MapPin }
  ];

  const calculateTotal = () => {
    const basePrice = roomPrice || 1500;
    const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 1;
    let total = basePrice * nights * rooms;
    
    Object.entries(extras).forEach(([key, value]) => {
      if (value) {
        const extra = extrasOptions.find(e => e.id === key);
        if (extra) total += extra.price;
      }
    });

    return { basePrice: basePrice * nights * rooms, total, nights };
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut || !guestInfo.firstName || !guestInfo.email) {
      toast({
        title: "Información faltante",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: "¡Reserva enviada!",
      description: "Te contactaremos pronto para confirmar tu reserva.",
    });

    // Reset form and close
    setTimeout(() => {
      onClose();
      setStep(1);
    }, 2000);
  };

  const { total, nights } = calculateTotal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {step === 1 ? 'Selecciona tus fechas' : 
             step === 2 ? 'Extras y servicios' : 
             'Información del huésped'}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            {roomName && (
              <Card className="bg-accent">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{roomName}</h3>
                      <p className="text-sm text-muted-foreground">Precio por noche</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">
                      ${roomPrice?.toLocaleString()}/noche
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Check-in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP") : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                      className="pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Check-out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP") : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                      className="pointer-events-auto"
                      disabled={(date) => date <= (checkIn || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Adultos</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="flex-1 text-center">{adults}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAdults(adults + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Niños</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="flex-1 text-center">{children}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChildren(children + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Habitaciones</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="flex-1 text-center">{rooms}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRooms(rooms + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {checkIn && checkOut && (
              <Card className="bg-accent">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{nights} noches</p>
                      <p className="text-sm text-muted-foreground">{adults} adultos, {children} niños, {rooms} habitación(es)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${total.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              className="w-full" 
              onClick={() => setStep(2)}
              disabled={!checkIn || !checkOut}
            >
              Continuar
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <p className="text-muted-foreground">Mejora tu experiencia con nuestros servicios adicionales</p>
            
            <div className="space-y-4">
              {extrasOptions.map((extra) => {
                const IconComponent = extra.icon;
                return (
                  <Card key={extra.id} className={cn(
                    "cursor-pointer transition-all duration-200",
                    extras[extra.id as keyof typeof extras] ? "ring-2 ring-primary bg-accent" : "hover:bg-accent"
                  )} onClick={() => setExtras(prev => ({ ...prev, [extra.id]: !prev[extra.id as keyof typeof prev] }))}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            extras[extra.id as keyof typeof extras] ? "bg-primary text-primary-foreground" : "bg-muted"
                          )}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{extra.name}</p>
                            <p className="text-sm text-muted-foreground">${extra.price}</p>
                          </div>
                        </div>
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                          extras[extra.id as keyof typeof extras] ? "bg-primary border-primary" : "border-muted"
                        )}>
                          {extras[extra.id as keyof typeof extras] && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-accent">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Total actualizado</p>
                  <p className="font-semibold text-lg">${total.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Atrás
              </Button>
              <Button className="flex-1" onClick={() => setStep(3)}>
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre *</Label>
                <Input 
                  value={guestInfo.firstName}
                  onChange={(e) => setGuestInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <Label>Apellido *</Label>
                <Input 
                  value={guestInfo.lastName}
                  onChange={(e) => setGuestInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Tu apellido"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email *</Label>
              <Input 
                type="email"
                value={guestInfo.email}
                onChange={(e) => setGuestInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="tu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Teléfono *</Label>
              <Input 
                value={guestInfo.phone}
                onChange={(e) => setGuestInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+52 55 1234 5678"
              />
            </div>

            <div className="space-y-2">
              <Label>País</Label>
              <Select value={guestInfo.country} onValueChange={(value) => setGuestInfo(prev => ({ ...prev, country: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mx">México</SelectItem>
                  <SelectItem value="us">Estados Unidos</SelectItem>
                  <SelectItem value="ca">Canadá</SelectItem>
                  <SelectItem value="es">España</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="bg-accent">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Resumen de reserva</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>{roomName || 'Habitación seleccionada'}</span>
                    <span>${((roomPrice || 1500) * nights * rooms).toLocaleString()}</span>
                  </div>
                  {Object.entries(extras).map(([key, value]) => {
                    if (value) {
                      const extra = extrasOptions.find(e => e.id === key);
                      return (
                        <div key={key} className="flex justify-between">
                          <span>{extra?.name}</span>
                          <span>${extra?.price.toLocaleString()}</span>
                        </div>
                      );
                    }
                  })}
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                Atrás
              </Button>
              <Button className="flex-1 bg-gradient-primary" onClick={handleBooking}>
                Confirmar reserva
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};