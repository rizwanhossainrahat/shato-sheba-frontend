"use client";

import { Search, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HeroProps } from "@/types/heroProps";
import { LargeSparkleIcon, SparkleIcon } from "@/assets/icons/SparkleIcon";
import { useState } from "react";
import AISearchDialog from "@/components/shared/AISSearchDialog";
import { useRouter } from "next/navigation";



export function Hero({
  badge = {
    text: "AI-Powered Healthcare",
  },
  heading = {
    line1: "Find Your Perfect",
    line2: "Doctor with AI",
  },
  description = [
    "Our advanced AI technology analyzes your symptoms, medical",
    "history, and preferences to match you with the best-fit doctors",
    "in seconds.",
  ],
  buttons = {
    primary: {
      text: "Find Your Doctor",
    },
    secondary: {
      text: "Book Appointment",
    },
  },
  stats = [
    { value: "50K+", label: "Patients Served" },
    { value: "1000+", label: "Expert Doctors" },
    {
      value: "4.9",
      label: "Patient Rating",
      icon: <Star className="size-6 fill-yellow-400 stroke-yellow-400" />,
    },
  ],
  formCard = {
    title: "AI Doctor Finder",
    symptomLabel: "What are your symptoms?",
    symptomPlaceholder: "e.g., headache, fever, cough",
    specialtyLabel: "Preferred specialty",
    specialtyOptions: [
      "General Physician",
      "Cardiologist",
      "Dermatologist",
      "Pediatrician",
      "Orthopedic",
    ],
    defaultSpecialty: "General Physician",
    submitText: "Get AI Recommendations",
    footerText:
      "✨ Powered by advanced AI algorithms for accurate doctor matching",
  },
}: HeroProps) {
  const [symptoms, setSymptoms] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (symptoms.trim()) {
      setIsDialogOpen(true);
    }
  };

  const handleBookAppointment = () => {
    router.push("/consultation");
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Enhanced gradient background with animated elements */}
      <div
        className="absolute inset-0 z-0 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        }}
      />
      
      {/* Multiple animated background elements with glass-morphism */}
      <div className="absolute top-20 left-20 w-64 h-64 glass-card rounded-full blur-3xl animate-float animate-morph" />
      <div className="absolute bottom-32 right-32 w-96 h-96 glass-card rounded-full blur-3xl animate-float animate-morph" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 glass-card rounded-full blur-2xl animate-float animate-bounce-gentle" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/4 right-1/4 w-48 h-48 glass-card rounded-full blur-2xl animate-float animate-scale-pulse" style={{ animationDelay: '3s' }} />
      
      {/* Floating sparkle elements */}
      <div className="absolute top-32 left-1/3 w-4 h-4 bg-white/30 rounded-full animate-bounce-gentle blur-sm" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-40 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-float blur-sm" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-2/3 right-1/3 w-5 h-5 bg-white/25 rounded-full animate-bounce-gentle blur-sm" style={{ animationDelay: '2.5s' }} />
      
      {/* Content Container */}
      <div className="w-full px-4 py-8 md:px-8 lg:px-16 relative z-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Hero Content */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Enhanced Badge with glass-morphism */}
              <div className="inline-flex items-center gap-3 self-start rounded-full glass-card-strong px-6 py-3 shadow-xl border border-white/30 hover-glow">
                <div className="relative">
                  <SparkleIcon />
                  <div className="absolute inset-0 animate-pulse-glow rounded-full" />
                </div>
                <span className="text-[11.9px] font-medium text-white/90 animate-shimmer">
                  {badge.text}
                </span>
              </div>

              {/* Clear, visible heading text */}
              <div className="space-y-2">
                <h1 className="text-[51px] leading-[60px] font-bold text-white animate-fade-in-up">
                  {heading.line1}
                </h1>
                <h1 className="text-[51px] leading-[60px] font-bold gradient-text-accent animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  {heading.line2}
                </h1>
              </div>

              {/* Enhanced Description with staggered animations */}
              <div className="space-y-1 text-[17px] leading-7 text-white/80">
                {description.map((line, index) => (
                  <p key={index} className="animate-fade-in-up" style={{ animationDelay: `${(index + 2) * 200}ms` }}>
                    {line}
                  </p>
                ))}
              </div>

              {/* Enhanced Buttons with advanced effects */}
              <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                {buttons.primary && (
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="h-[63.622px] gap-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 px-8 text-[15.3px] shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border-0 hover-glow animate-gradient text-white font-semibold"
                  >
                    <Search className="size-5" />
                    {buttons.primary.text}
                  </Button>
                )}
                {buttons.secondary && (
                  <Button
                    onClick={handleBookAppointment}
                    variant="outline"
                    className="h-[63.622px] gap-3 rounded-xl glass-card-strong border-2 border-white/30 px-8 text-[15.3px] text-white hover:bg-white/20 hover:border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 hover-glow font-semibold"
                  >
                    <Calendar className="size-5" />
                    {buttons.secondary.text}
                  </Button>
                )}
              </div>

              {/* Enhanced Stats with glass-morphism */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-2 animate-fade-in-up hover-lift glass-card rounded-lg p-3" style={{ animationDelay: `${(index + 5) * 200}ms` }}>
                    <div className="flex items-center gap-2">
                      <p className="text-[25.5px] leading-9 font-bold gradient-text-accent">
                        {stat.value}
                      </p>
                      {stat.icon}
                    </div>
                    <p className="text-[13.6px] leading-6 text-white/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Enhanced Form Card with advanced glass-morphism */}
            <div className="flex items-center justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
              <div className="w-full max-w-[559.929px] rounded-2xl glass-card-strong p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/30 relative overflow-hidden hover-lift animate-glow-pulse">
                {/* Enhanced decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-morph" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-bounce-gentle" />
                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-full blur-xl animate-scale-pulse" />
                
                {/* Card Header with enhanced styling */}
                <div className="mb-6 flex items-center justify-between relative z-10">
                  <h2 className="text-[20.4px] leading-6 font-bold gradient-text-primary">
                    {formCard.title}
                  </h2>
                  <div className="relative">
                    <LargeSparkleIcon />
                    <div className="absolute inset-0 animate-pulse-glow rounded-full" />
                  </div>
                </div>

                {/* Enhanced Form with glass-morphism */}
                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                  {/* Symptoms Input with enhanced styling */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="symptoms"
                      className="text-[11.9px] text-white/80 font-medium"
                    >
                      {formCard.symptomLabel}
                    </Label>
                    <Input
                      id="symptoms"
                      name="symptoms"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder={formCard.symptomPlaceholder}
                      className="h-[49.787px] rounded-xl glass-card border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 transition-all duration-300 hover-glow"
                      required
                    />
                  </div>

                  {/* Enhanced Submit Button */}
                  <Button
                    type="submit"
                    className="h-[59.986px] w-full rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-[15.3px] shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border-0 animate-gradient hover-glow font-semibold text-white"
                    disabled={!symptoms.trim()}
                  >
                    {formCard.submitText}
                  </Button>
                </form>

                {/* Enhanced Footer */}
                <div className="mt-6 border-t border-white/20 pt-4 relative z-10">
                  <p className="text-center text-[11.9px] leading-5 text-white/70 animate-shimmer">
                    {formCard.footerText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Search Dialog */}
      <AISearchDialog
        initialSymptoms={symptoms}
        externalOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSearchComplete={() => {
          setSymptoms("");
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
