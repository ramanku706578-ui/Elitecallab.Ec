import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, TrendingUp, Users, Briefcase, Target, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotGrid from '@/components/ui/DotGrid';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const satelliteIcons = [
  { Icon: Sparkles, position: 'left-6 top-[18vh]', delay: 0 },
  { Icon: TrendingUp, position: 'left-4 top-[54vh]', delay: 0.1 },
  { Icon: Users, position: 'left-[10vw] top-[78vh]', delay: 0.2 },
  { Icon: Briefcase, position: 'right-6 top-[20vh]', delay: 0.15 },
  { Icon: Target, position: 'right-5 top-[52vh]', delay: 0.25 },
  { Icon: Globe, position: 'right-[10vw] top-[76vh]', delay: 0.3 },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const satelliteRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Hero card entrance
      tl.fromTo(
        heroCardRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      );

      // Headline entrance
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      // Subheadline entrance
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      );

      // Image entrance
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.7 },
        '-=0.6'
      );

      // Satellite cards entrance
      satelliteRefs.current.forEach((ref, index) => {
        if (ref) {
          const isLeft = index < 3;
          tl.fromTo(
            ref,
            { opacity: 0, x: isLeft ? -60 : 60, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 0.5 },
            `-=${0.4 - index * 0.05}`
          );
        }
      });

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set(heroCardRef.current, { opacity: 1, x: 0 });
            gsap.set(satelliteRefs.current, { opacity: 1, x: 0 });
          },
        },
      });

      // Exit animations (70% - 100%)
      scrollTl.fromTo(
        heroCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      satelliteRefs.current.forEach((ref, index) => {
        if (ref) {
          const isLeft = index < 3;
          scrollTl.fromTo(
            ref,
            { x: 0, opacity: 1 },
            { x: isLeft ? '-12vw' : '12vw', opacity: 0, ease: 'power2.in' },
            0.7 + index * 0.02
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F6F8F7] overflow-hidden z-10"
    >
      <DotGrid className="opacity-10" />

      {/* Satellite Icon Cards */}
      {satelliteIcons.map(({ Icon, position }, index) => (
        <div
          key={index}
          ref={(el) => { satelliteRefs.current[index] = el; }}
          className={`absolute ${position} hidden lg:flex w-16 h-16 xl:w-20 xl:h-20 bg-white rounded-2xl shadow-card items-center justify-center z-20`}
        >
          <Icon className={`w-7 h-7 xl:w-8 xl:h-8 ${index % 2 === 0 ? 'text-primary' : 'text-foreground'}`} />
        </div>
      ))}

      {/* Hero Card */}
      <div
        ref={heroCardRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[1100px] h-[70vh] min-h-[480px] max-h-[560px] bg-white rounded-[32px] shadow-card z-10 overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Content Side */}
          <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12 lg:pr-4">
            <div ref={headlineRef}>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.08em] text-primary mb-4">
                Elitecallab Platform
              </span>
              <h1 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-[1.05] tracking-[-0.02em] text-foreground mb-4">
                Smart AI Tools for{' '}
                <span className="text-primary">Smarter Growth</span>
              </h1>
            </div>

            <p
              ref={subheadlineRef}
              className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md mb-6 lg:mb-8"
            >
              All-in-one AI solutions for creators, brands, and teams—fast, simple, and built to scale.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
                onClick={() => onNavigate('ai-tools')}
              >
                Explore AI Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 border-2"
                onClick={() => onNavigate('login')}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Image Side */}
          <div
            ref={imageRef}
            className="hidden lg:block w-[42%] h-full relative p-4"
          >
            <div className="w-full h-full rounded-[22px] overflow-hidden">
              <img
                src="/hero_team.jpg"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
