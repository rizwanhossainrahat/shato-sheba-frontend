import { HeartPulse, Brain, Bone, Baby, Star, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { getPublicSpecialities } from '@/services/public/specialities.service';
import { ISpecialty } from '@/types/specialities.interface';
import Image from 'next/image';
import Link from 'next/link';

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
  { bgColor: 'bg-orange-100', iconColor: 'text-orange-500' },
  { bgColor: 'bg-cyan-100', iconColor: 'text-cyan-500' },
  { bgColor: 'bg-lime-100', iconColor: 'text-lime-500' },
  { bgColor: 'bg-rose-100', iconColor: 'text-rose-500' },
];

const SpecialitiesPage = async () => {
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
    },
    {
      id: '5',
      title: 'Dermatology',
      icon: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '6',
      title: 'Psychiatry',
      icon: '',
      createdAt: '',
      updatedAt: '',
    }
  ];

  const displaySpecialities = specialities.length > 0 ? specialities : fallbackSpecialists;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            All Medical Specialities
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of medical specialities and find the right healthcare professional for your needs.
          </p>
        </div>

        {/* Specialities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {displaySpecialities.map((specialty, index) => {
            // Get default icon component
            const IconComponent = defaultIcons[specialty.title as keyof typeof defaultIcons] || Stethoscope;
            
            // Get color scheme
            const colorScheme = defaultColors[index % defaultColors.length];
            
            return (
              <Link
                key={specialty.id}
                href={`/consultation?specialty=${encodeURIComponent(specialty.title)}`}
                className="block"
              >
                <Card
                  className={cn(
                    'text-center transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground group',
                  )}
                >
                  <CardContent className="p-6">
                    <div
                      className={cn(
                        'w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 transition-colors group-hover:bg-primary-foreground/20',
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
                          className={cn(
                            colorScheme.iconColor,
                            'group-hover:text-primary-foreground transition-colors'
                          )}
                          size={32}
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold">
                      {specialty.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {specialities.length === 0 && (
          <div className="text-center mt-8 p-8 bg-muted rounded-lg">
            <Stethoscope className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">
              No specialities available at the moment. Please check back later.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-primary/5 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Can't Find Your Specialty?
          </h2>
          <p className="text-muted-foreground mb-6">
            Use our AI-powered doctor finder to get personalized recommendations based on your symptoms.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Stethoscope className="w-5 h-5" />
            Find a Doctor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialitiesPage;