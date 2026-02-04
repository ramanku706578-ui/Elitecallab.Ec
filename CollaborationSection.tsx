import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Handshake, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotGrid from '@/components/ui/DotGrid';

gsap.registerPlugin(ScrollTrigger);

interface CollaborationSectionProps {
  onNavigate: (page: string) => void;
}

const creatorFeatures = [
  'Build a profile',
  'Get discovered',
  'Manage deals',
  'Get paid faster',
];

const brandFeatures = [
  'Find the right voice',
  'Brief at scale',
  'Track performance',
  'Close deals',
];

export const CollaborationSection: React.FC<CollaborationSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);

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
            gsap.set(leftCardRef.current, { x: 0, opacity: 1, scale: 1 });
            gsap.set(rightCardRef.current, { x: 0, opacity: 1, scale: 1 });
            gsap.set(bridgeRef.current, { scale: 1, opacity: 1, rotation: 0 });
            gsap.set(headlineRef.current, { y: 0, opacity: 1 });
          },
        },
      });

      // ENTRANCE (0% - 30%)
      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Left card entrance
      scrollTl.fromTo(
        leftCardRef.current,
        { x: '-50vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.05
      );

      // Right card entrance
      scrollTl.fromTo(
        rightCardRef.current,
        { x: '50vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.05
      );

      // Bridge circle entrance
      scrollTl.fromTo(
        bridgeRef.current,
        { scale: 0.6, opacity: 0, rotation: -8 },
        { scale: 1, opacity: 1, rotation: 0, ease: 'none' },
        0.1
      );

      // SETTLE (30% - 70%) - hold position with gentle pulse on bridge

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bridgeRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.85, opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: -15, opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F6F8F7] overflow-hidden z-30"
    >
      <DotGrid className="opacity-8" />

      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute left-1/2 top-[10vh] -translate-x-1/2 text-center max-w-[600px] px-4 z-10"
      >
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
          Where Creators Meet Brands
        </h2>
        <p className="text-base lg:text-lg text-muted-foreground">
          Discover, connect, and collaborate—managed end to end.
        </p>
      </div>

      {/* Left Card - For Creators */}
      <div
        ref={leftCardRef}
        className="absolute left-[6vw] lg:left-[10vw] top-1/2 -translate-y-1/2 w-[42vw] lg:w-[34vw] max-w-[420px] min-h-[420px] lg:min-h-[480px] bg-white rounded-[32px] shadow-card overflow-hidden z-10"
      >
        <div className="h-40 lg:h-48 overflow-hidden">
          <img
            src="/creator_profile.jpg"
            alt="Creator"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 lg:p-6">
          <h3 className="font-heading font-semibold text-xl lg:text-2xl text-foreground mb-4">
            For Creators
          </h3>
          <ul className="space-y-2 mb-5">
            {creatorFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <Button
            className="w-full bg-primary hover:bg-primary/90 rounded-full"
            onClick={() => onNavigate('creators')}
          >
            Join as Creator
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Bridge Circle */}
      <div
        ref={bridgeRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-36 lg:h-36 bg-white rounded-full shadow-card flex items-center justify-center z-20 animate-pulse-gentle"
      >
        <Handshake className="w-10 h-10 lg:w-14 lg:h-14 text-foreground" />
        {/* Connection lines */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />
      </div>

      {/* Right Card - For Brands */}
      <div
        ref={rightCardRef}
        className="absolute right-[6vw] lg:right-[10vw] top-1/2 -translate-y-1/2 w-[42vw] lg:w-[34vw] max-w-[420px] min-h-[420px] lg:min-h-[480px] bg-white rounded-[32px] shadow-card overflow-hidden z-10"
      >
        <div className="h-40 lg:h-48 overflow-hidden">
          <img
            src="/brand_team.jpg"
            alt="Brand Team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 lg:p-6">
          <h3 className="font-heading font-semibold text-xl lg:text-2xl text-foreground mb-4">
            For Brands
          </h3>
          <ul className="space-y-2 mb-5">
            {brandFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <Button
            className="w-full bg-primary hover:bg-primary/90 rounded-full"
            onClick={() => onNavigate('brands')}
          >
            Join as Brand
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden absolute inset-x-4 top-[22vh] bottom-8 flex flex-col gap-4 overflow-y-auto pb-4">
        {/* Creator Card Mobile */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden flex-1">
          <div className="h-32 overflow-hidden">
            <img
              src="/creator_profile.jpg"
              alt="Creator"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              For Creators
            </h3>
            <ul className="space-y-1 mb-3">
              {creatorFeatures.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="w-3 h-3 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 rounded-full"
              onClick={() => onNavigate('creators')}
            >
              Join as Creator
            </Button>
          </div>
        </div>

        {/* Brand Card Mobile */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden flex-1">
          <div className="h-32 overflow-hidden">
            <img
              src="/brand_team.jpg"
              alt="Brand Team"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              For Brands
            </h3>
            <ul className="space-y-1 mb-3">
              {brandFeatures.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="w-3 h-3 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 rounded-full"
              onClick={() => onNavigate('brands')}
            >
              Join as Brand
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
