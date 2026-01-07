import { HeartPulse, Brain, Bone, Baby, Star, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { getPublicSpecialities } from '@/services/public/specialities.service';
import { ISpecialty } from '@/types/specialities.interface';
import Image from 'next/image';

// Default icons mapping for fallback
const defaultIcons = {
  'Cardiology': HeartPulse,
  'Neurology': Brain,
  'Orthopedic': Bone,
  'Pediatric': Baby,
  'General': Stethoscope,
};

const defaultColors = [
  { bgColor: 'bg-red-100', iconColor: 'text-red-500' },
  { bgColor: 'bg-blue-100', iconColor: 'text-blue-500' },
  { bgColor: 'bg-pink-100', iconColor: 'text-pink-500' },
  { bgColor: 'bg-green-100', iconColor: 'text-green-500' },
  { bgColor: 'bg-purple-100', iconColor: 'text-purple-500' },
  { bgColor: 'bg-yellow-100', iconColor: 'text-yellow-500' },
  { bgColor: 'bg-indigo-100', iconColor: 'text-indigo-500' },
  { bgColor: 'bg-teal-100', iconColor: 'text-teal-500' },
];

const Specialities = async () => {
  const response = await getPublicSpecialities();
  const specialities: ISpecialty[] = response?.data || [];

  // Fallback data if no specialities from database
  const fallbackSpecialists = [
    {
      id: '1',
      title: 'Cardiology',
      icon: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '2', 
      title: 'Neurology',
      icon: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '3',
      title: 'Orthopedic', 
      icon: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '4',
      title: 'Pediatric',
      icon: '',
      createdAt: '',
      updatedAt: '',
    }
  ];

  const displaySpecialities = specialities.length > 0 ? specialities : fallbackSpecialists;

  return (
    <section className="py-24 mt-24 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Our Specialist</h2>
            <p className="text-muted-foreground max-w-md mt-2">
              Access to medical experts across all major specialities.
            </p>
          </div>
          <a href="/specialities" className="text-primary font-semibold hover:underline mt-4 sm:mt-0">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displaySpecialities.slice(0, 4).map((specialty, index) => {
            // Get default icon component
            const IconComponent = defaultIcons[specialty.title as keyof typeof defaultIcons] || Stethoscope;
            
            // Get color scheme
            const colorScheme = defaultColors[index % defaultColors.length];
            
            return (
              <Card
                key={specialty.id}
                className={cn(
                  'text-center transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground',
                )}
              >
                <CardContent className="p-6">
                  <div
                    className={cn(
                      'w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4',
                      colorScheme.bgColor
                    )}
                  >
                    {specialty.icon ? (
                      <div className="relative w-8 h-8">
                        <Image
                          src={specialty.icon}
                          alt={specialty.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <IconComponent
                        className={cn(colorScheme.iconColor)}
                        size={32}
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">
                    {specialty.title}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {specialities.length === 0 && (
          <div className="text-center mt-8 p-4 bg-muted rounded-lg">
            <p className="text-muted-foreground">
              No specialities available at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Specialities;
