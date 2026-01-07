import { Search, ClipboardList, CalendarCheck, ShieldCheck, FileText, Video, CreditCard, HeartPulse, Sparkles } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  { icon: Search, title: 'Search Doctor', description: 'Find your doctor easily with a minimum of effort.' },
  { icon: ClipboardList, title: 'Check Doctor Profile', description: 'Get to know your doctor better.' },
  { icon: CalendarCheck, title: 'Schedule Appointment', description: 'Choose the time and date that suits you.' },
  { icon: ShieldCheck, title: 'Get Your Solution', description: 'Our doctors are here to help you.' },
  { icon: FileText, title: 'Electronic prescription', description: 'Get your prescription instantly.' },
  { icon: Video, title: 'Instant video consultation', description: 'Consult with your doctor from anywhere.' },
  { icon: CreditCard, title: 'Easy payment options', description: 'Pay with ease using various methods.' },
  { icon: HeartPulse, title: 'Health recovery', description: 'Start your journey to better health.' },
];

const StepCard = ({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) => {
    const gradients = [
        'from-purple-500/20 via-pink-500/10 to-transparent',
        'from-blue-500/20 via-indigo-500/10 to-transparent',
        'from-cyan-500/20 via-teal-500/10 to-transparent',
        'from-emerald-500/20 via-green-500/10 to-transparent',
        'from-amber-500/20 via-orange-500/10 to-transparent',
        'from-rose-500/20 via-pink-500/10 to-transparent',
        'from-violet-500/20 via-purple-500/10 to-transparent',
        'from-sky-500/20 via-blue-500/10 to-transparent'
    ];

    const iconBgGradients = [
        'from-purple-500 via-pink-500 to-rose-500',
        'from-blue-500 via-indigo-500 to-purple-500',
        'from-cyan-500 via-teal-500 to-emerald-500',
        'from-emerald-500 via-green-500 to-teal-500',
        'from-amber-500 via-orange-500 to-red-500',
        'from-rose-500 via-pink-500 to-purple-500',
        'from-violet-500 via-purple-500 to-indigo-500',
        'from-sky-500 via-blue-500 to-cyan-500'
    ];

    const glowColors = [
        'rgba(168, 85, 247, 0.4)',
        'rgba(59, 130, 246, 0.4)',
        'rgba(6, 182, 212, 0.4)',
        'rgba(16, 185, 129, 0.4)',
        'rgba(245, 158, 11, 0.4)',
        'rgba(244, 63, 94, 0.4)',
        'rgba(139, 92, 246, 0.4)',
        'rgba(14, 165, 233, 0.4)'
    ];

    return (
        <Card className={`group relative overflow-hidden glass-card-strong hover-lift hover-glow transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm border-white/20`}>
            {/* Enhanced animated background elements */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % 8]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 animate-morph" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-lg group-hover:scale-125 transition-transform duration-500 animate-bounce-gentle" />
            
            <CardContent className="relative p-6 z-10">
                <div className="flex flex-col items-center text-center space-y-4">
                    {/* Enhanced icon with advanced gradient background and multiple glow effects */}
                    <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${iconBgGradients[index % 8]} shadow-2xl group-hover:shadow-3xl group-hover:scale-110 transition-all duration-300 animate-gradient`}>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                        <Icon size={28} className="text-white relative z-10 drop-shadow-lg" />
                        
                        {/* Multiple glow effects */}
                        <div 
                            className="absolute inset-0 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10 animate-pulse-glow"
                            style={{ 
                                background: `linear-gradient(135deg, ${glowColors[index % 8]}, transparent)`,
                                boxShadow: `0 0 30px ${glowColors[index % 8]}`
                            }}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-shimmer" />
                    </div>
                    
                    {/* Enhanced step number badge with glass-morphism */}
                    <div className="absolute top-3 right-3 w-8 h-8 glass-card rounded-full flex items-center justify-center text-xs font-bold text-white/90 shadow-lg border border-white/20 animate-bounce-gentle">
                        {index + 1}
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg gradient-text-primary group-hover:scale-105 transition-transform duration-300">
                            {title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                            {description}
                        </p>
                    </div>
                </div>
            </CardContent>
            
            {/* Enhanced border glow with multiple layers */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none blur-sm"
                style={{ boxShadow: `inset 0 0 20px ${glowColors[index % 8]}` }}
            />
        </Card>
    );
};

const Steps = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced background with animated gradient and floating elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient" />
      <div className="absolute top-20 left-10 w-72 h-72 glass-card rounded-full blur-3xl animate-float animate-morph" />
      <div className="absolute bottom-20 right-10 w-96 h-96 glass-card rounded-full blur-3xl animate-float animate-scale-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 glass-card rounded-full blur-2xl animate-bounce-gentle" style={{ animationDelay: '1s' }} />
      
      {/* Floating sparkle elements */}
      <div className="absolute top-32 left-1/4 w-4 h-4 bg-white/30 rounded-full animate-bounce-gentle blur-sm" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-40 right-1/4 w-3 h-3 bg-white/40 rounded-full animate-float blur-sm" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-2/3 left-2/3 w-5 h-5 bg-white/25 rounded-full animate-bounce-gentle blur-sm" style={{ animationDelay: '2.5s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header section with glass-morphism */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass-card-strong rounded-full px-6 py-3 mb-6 border border-white/30 hover-glow">
            <Sparkles className="w-4 h-4 text-white animate-pulse-glow" />
            <span className="text-sm font-medium text-white/90 animate-shimmer">How It Works</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Easy Steps to Get Your
            <span className="block gradient-text-secondary animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Perfect Solution
            </span>
          </h2>
          
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            We provide advanced technologies and high-quality medical facilities with a seamless, 
            user-friendly experience designed just for you.
          </p>
        </div>

        {/* Enhanced grid with staggered animation effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
                <div 
                    key={index} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${800 + (index * 150)}ms` }}
                >
                    <StepCard {...step} index={index} />
                </div>
            ))}
        </div>
        
        {/* Enhanced call to action section */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '1400ms' }}>
          <div className="inline-flex items-center gap-2 text-sm text-white/60 glass-card rounded-full px-6 py-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="animate-shimmer">Start your healthcare journey today</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent via-white/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
