import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Coffee, Dumbbell, Building2, Briefcase, Car } from 'lucide-react';
import terraceBreakfast from '@/assets/terrace-breakfast.jpg';

export const ServicesSection = () => {
  const services = [
    {
      icon: Clock,
      title: 'Recepción 24 horas',
      titleEn: '24-hour Reception',
      description: 'Atención personalizada las 24 horas del día, todos los días del año. Nuestro equipo está disponible para asistirte en cualquier momento.',
      features: ['Check-in/out flexible', 'Información turística', 'Reservas de tours', 'Servicio de taxi'],
      highlight: true
    },
    {
      icon: Coffee,
      title: 'Desayuno en Terraza',
      titleEn: 'Terrace Breakfast',
      description: 'Inicia tu día con un delicioso desayuno continental en nuestra hermosa terraza con vista al Centro Histórico.',
      features: ['Horario: 7:00 - 11:00 AM', 'Vista panorámica', 'Productos frescos', 'Café de especialidad'],
      highlight: true,
      image: terraceBreakfast
    },
    {
      icon: Dumbbell,
      title: 'Gimnasio',
      titleEn: 'Fitness Center',
      description: 'Mantente en forma durante tu estancia con nuestro gimnasio equipado con aparatos modernos.',
      features: ['Horario: 6:00 - 22:00', 'Equipos cardiovasculares', 'Pesas libres', 'Toallas incluidas']
    },
    {
      icon: Building2,
      title: 'Elevadores',
      titleEn: 'Elevators',
      description: 'Acceso cómodo a todas las plantas del hotel con elevadores modernos y seguros.',
      features: ['2 elevadores', 'Acceso a discapacitados', 'Mantenimiento diario', 'Iluminación LED']
    },
    {
      icon: Briefcase,
      title: 'Business Center',
      titleEn: 'Business Center',
      description: 'Espacio equipado para viajeros de negocios con todas las facilidades necesarias.',
      features: ['Computadoras e impresora', 'Wi-Fi alta velocidad', 'Área de reuniones', 'Servicio de fax']
    },
    {
      icon: Car,
      title: 'Servicios Adicionales',
      titleEn: 'Additional Services',
      description: 'Una amplia gama de servicios para hacer tu estancia más cómoda y placentera.',
      features: ['Servicio de lavandería', 'Guardaequipaje', 'Tours guiados', 'Transporte al aeropuerto']
    }
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Servicios Premium
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Todo lo que Necesitas
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Desde amenidades básicas hasta servicios premium, tenemos todo cubierto 
            para hacer de tu estancia una experiencia memorable.
          </p>
        </div>

        {/* Featured Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.filter(service => service.highlight).map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.title} className="overflow-hidden border-0 bg-gradient-card shadow-elegant">
                {service.image && (
                  <div className="relative h-48 lg:h-56">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center space-x-3 text-white">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h3 className="font-serif text-xl font-semibold">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
                
                <CardContent className="p-6">
                  {!service.image && (
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-button">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          {service.title}
                        </h3>
                      </div>
                    </CardHeader>
                  )}
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Other Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.filter(service => !service.highlight).map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.title} className="group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:shadow-button transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-1">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center justify-center space-x-2 text-xs">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Service Hours */}
        <div className="mt-16">
          <Card className="border-0 bg-gradient-card shadow-card">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Horarios de Servicio
                </h3>
                <p className="text-muted-foreground">
                  Conoce los horarios de nuestros principales servicios
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Recepción</h4>
                  <p className="text-primary font-medium">24/7</p>
                  <p className="text-sm text-muted-foreground">Siempre disponible</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Coffee className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Desayuno</h4>
                  <p className="text-primary font-medium">7:00 - 11:00 AM</p>
                  <p className="text-sm text-muted-foreground">Todos los días</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Dumbbell className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Gimnasio</h4>
                  <p className="text-primary font-medium">6:00 - 22:00</p>
                  <p className="text-sm text-muted-foreground">Acceso con tarjeta</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
