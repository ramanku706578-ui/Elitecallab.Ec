import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Zap, Users, Globe, Award, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotGrid from '@/components/ui/DotGrid';

gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const values = [
  {
    Icon: Target,
    title: 'Mission-Driven',
    description: 'We exist to simplify work using AI, making powerful tools accessible to everyone.',
  },
  {
    Icon: Zap,
    title: 'Innovation First',
    description: 'We constantly push boundaries to deliver cutting-edge AI solutions.',
  },
  {
    Icon: Users,
    title: 'Community Centric',
    description: 'Our creators and brands are at the heart of everything we build.',
  },
  {
    Icon: Globe,
    title: 'Global Reach',
    description: 'Connecting talent and opportunities across borders and time zones.',
  },
  {
    Icon: Award,
    title: 'Excellence',
    description: 'We hold ourselves to the highest standards in every interaction.',
  },
  {
    Icon: Heart,
    title: 'Passion',
    description: 'We love what we do, and it shows in our products and service.',
  },
];

const milestones = [
  { year: '2021', event: 'Elitecallab founded with a vision to democratize AI' },
  { year: '2022', event: 'Launched first AI content generation tools' },
  { year: '2023', event: 'Expanded to 500+ creators and 100+ brand partnerships' },
  { year: '2024', event: 'Introduced full creator-brand collaboration platform' },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
          },
        }
      );

      // Values cards animation
      const valueCards = valuesRef.current?.querySelectorAll('.value-card');
      if (valueCards) {
        gsap.fromTo(
          valueCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Milestones animation
      const milestoneItems = milestonesRef.current?.querySelectorAll('.milestone-item');
      if (milestoneItems) {
        gsap.fromTo(
          milestoneItems,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            scrollTrigger: {
              trigger: milestonesRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#F6F8F7] pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 lg:py-24 overflow-hidden">
        <DotGrid className="opacity-8" />
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About Elitecallab</span>
            </div>
            <h1 className="font-heading font-semibold text-4xl lg:text-6xl text-foreground mb-6">
              Our Mission to{' '}
              <span className="text-primary">Simplify Work</span> Using AI
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              We believe AI should empower everyone—from solo creators to enterprise teams. 
              Our platform bridges the gap between cutting-edge technology and practical business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 rounded-full"
                onClick={() => onNavigate('ai-tools')}
              >
                Explore Our Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2"
                onClick={() => onNavigate('contact')}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide everything we do at Elitecallab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ Icon, title, description }, index) => (
              <div
                key={index}
                className="value-card bg-white rounded-3xl shadow-card p-8 hover:shadow-card-hover transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section ref={milestonesRef} className="py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-muted-foreground">
                Key milestones in our mission to transform work with AI.
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map(({ year, event }, index) => (
                <div
                  key={index}
                  className="milestone-item flex items-start gap-6"
                >
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="font-heading font-bold text-2xl text-primary">
                      {year}
                    </span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary mt-2 relative">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-primary/20" />
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="text-foreground text-lg">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto bg-primary rounded-[32px] p-8 lg:p-16 text-center text-white">
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl mb-4">
              Join Our Team
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              We're always looking for talented people who are passionate about AI and innovation.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full bg-white text-primary hover:bg-white/90"
              onClick={() => onNavigate('contact')}
            >
              View Open Positions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
