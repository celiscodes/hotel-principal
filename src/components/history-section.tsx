import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Camera, Users, Building } from 'lucide-react';

export const HistorySection = () => {
  const timelineEvents = [
    {
      year: '1906',
      title: 'Inauguración',
      description: 'Apertura del Hotel Principal con arquitectura de acero y cantera, símbolo de modernidad en el Centro Histórico.',
      icon: Building
    },
    {
      year: '1920s',
      title: 'Época Dorada',
      description: 'El hotel se convierte en punto de encuentro de intelectuales, artistas y personalidades de la época.',
      icon: Users
    },
    {
      year: '2000',
      title: 'Amores Perros',
      description: 'El hotel aparece en la aclamada película de Alejandro González Iñárritu, ganando reconocimiento internacional.',
      icon: Camera
    },
    {
      year: '2024',
      title: 'Renovación Moderna',
      description: 'Mantiene su esencia histórica mientras incorpora amenidades modernas para huéspedes contemporáneos.',
      icon: Calendar
    }
  ];

  return (
    <section id="history" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Desde 1906
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Más de un Siglo de Historia
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Hotel Principal ha sido testigo de la evolución del Centro Histórico de la Ciudad de México, 
            hospedando a personalidades ilustres y siendo escenario de momentos memorables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Timeline */}
          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={event.year} className="flex items-start space-x-6 group">
                  {/* Timeline dot and line */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-button">
                      <IconComponent className="w-5 h-5 text-primary-foreground" />
                    </div>
                    {index < timelineEvents.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-to-b from-primary to-transparent mt-4" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="secondary" className="font-semibold">
                        {event.year}
                      </Badge>
                      <h3 className="font-serif text-xl font-semibold text-foreground">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Historical Highlights */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <CardContent className="p-0">
                <h3 className="font-serif text-xl font-semibold mb-4 text-foreground">
                  Arquitectura Colonial
                </h3>
                <p className="text-muted-foreground mb-4">
                  Construido con estructura de acero y fachada de cantera, el Hotel Principal 
                  representa la arquitectura de principios del siglo XX en México, combinando 
                  técnicas modernas con materiales tradicionales.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Estructura de acero</Badge>
                  <Badge variant="secondary">Fachada de cantera</Badge>
                  <Badge variant="secondary">Balcones ornamentados</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <CardContent className="p-0">
                <h3 className="font-serif text-xl font-semibold mb-4 text-foreground">
                  Huéspedes Ilustres
                </h3>
                <p className="text-muted-foreground mb-4">
                  A lo largo de su historia, el hotel ha recibido a artistas, escritores, 
                  políticos y personalidades del mundo del cine y la cultura mexicana e internacional.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Artistas</Badge>
                  <Badge variant="secondary">Escritores</Badge>
                  <Badge variant="secondary">Cineastas</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <CardContent className="p-0">
                <h3 className="font-serif text-xl font-semibold mb-4 text-foreground">
                  Cine Mexicano
                </h3>
                <p className="text-muted-foreground mb-4">
                  El hotel aparece en "Amores Perros" (2000), la película de Alejandro González Iñárritu 
                  que puso al cine mexicano en el mapa internacional y ganó múltiples reconocimientos.
                </p>
                <Button variant="outline" size="sm" onClick={() => {
                  const message = "Hola, me interesa información sobre películas filmadas en Hotel Principal";
                  window.open(`https://wa.me/525512345678?text=${encodeURIComponent(message)}`, '_blank');
                }}>
                  Ver más películas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Forma parte de nuestra historia centenaria
          </p>
          <Button 
            size="lg"
            className="bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-button"
            onClick={() => {
              const element = document.querySelector('#rooms');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Reservar ahora
          </Button>
        </div>
      </div>
    </section>
  );
};