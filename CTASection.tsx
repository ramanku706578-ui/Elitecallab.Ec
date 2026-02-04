import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, TrendingUp, Users, Target, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotGrid from '@/components/ui/DotGrid';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  onNavigate: (page: string) => void;
}

const satelliteIcons = [
  { Icon: Sparkles, position: 'left-[8vw] top-[22vh]' },
  { Icon: TrendingUp, position: 'left-[10vw] top-[72vh]' },
  { Icon: Users, position: 'right-[8vw] top-[24vh]' },
  { Icon: Target, position: 'right-[10vw] top-[70vh]' },
];

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const satelliteRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(cardRef.current, { y: 0, opacity: 1, scale: 1 });
            gsap.set(headlineRef.current, { y: 0, opacity: 1 });
            satelliteRefs.current.forEach((ref) => {
              if (ref) gsap.set(ref, { opacity: 1, x: 0, y: 0 });
            });
          },
        },
      });

      // ENTRANCE (0% - 30%)
      // CTA card entrance
      scrollTl.fromTo(
        cardRef.current,
        { y: '60vh', opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Satellite cards entrance
      satelliteRefs.current.forEach((ref, index) => {
        if (ref) {
          const isLeft = index < 2;
          scrollTl.fromTo(
            ref,
            { x: isLeft ? '-30vw' : '30vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.05 + index * 0.03
          );
        }
      });

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      satelliteRefs.current.forEach((ref, index) => {
        if (ref) {
          const isLeft = index < 2;
          scrollTl.fromTo(
            ref,
            { x: 0, opacity: 1 },
            { x: isLeft ? '-15vw' : '15vw', opacity: 0, ease: 'power2.in' },
            0.72 + index * 0.02
          );
        }
      });

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: -12, opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#E8F5E9] overflow-hidden z-50"
    >
      <DotGrid className="opacity-10" />

      {/* Satellite Icon Cards */}
      {satelliteIcons.map(({ Icon, position }, index) => (
        <div
          key={index}
          ref={(el) => { satelliteRefs.current[index] = el; }}
          className={`absolute ${position} hidden lg:flex w-16 h-16 xl:w-20 xl:h-20 bg-white rounded-2xl shadow-card items-center justify-center z-10`}
        >
          <Icon className={`w-7 h-7 xl:w-8 xl:h-8 ${index % 2 === 0 ? 'text-primary' : 'text-foreground'}`} />
        </div>
      ))}

      {/* CTA Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[980px] h-auto min-h-[380px] bg-white rounded-[32px] shadow-card z-20 p-8 lg:p-12"
      >
        <div ref={headlineRef} className="flex flex-col items-center text-center h-full justify-center">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Ready to grow?
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground mb-8 max-w-md">
            Start free. Upgrade when you're ready.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
              onClick={() => onNavigate('login')}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-2"
              onClick={() => onNavigate('contact')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Talk to Sales
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
