import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileText, 
  Image, 
  Video, 
  Megaphone, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Compass, 
  Shield, 
  Plug 
} from 'lucide-react';
import DotGrid from '@/components/ui/DotGrid';

gsap.registerPlugin(ScrollTrigger);

const aiTools = [
  { Icon: FileText, title: 'AI Content', description: 'Generate copy, captions, and scripts in seconds.', position: 'left-[8vw] top-[26vh]' },
  { Icon: Image, title: 'AI Images', description: 'Create visuals that match your brand, instantly.', position: 'left-[30vw] top-[22vh]' },
  { Icon: Video, title: 'AI Video', description: 'Edit, clip, and publish faster with smart automation.', position: 'left-[52vw] top-[24vh]' },
  { Icon: Megaphone, title: 'AI Marketing', description: 'Plans, emails, and campaigns—powered by data.', position: 'left-[74vw] top-[28vh]' },
  { Icon: Zap, title: 'AI Productivity', description: 'Summarize, schedule, and stay in flow.', position: 'left-[10vw] top-[54vh]' },
  { Icon: BarChart3, title: 'AI Analytics', description: 'Track what works and optimize faster.', position: 'left-[32vw] top-[58vh]' },
  { Icon: MessageSquare, title: 'AI Chatbots', description: 'Deploy support that never sleeps.', position: 'left-[54vw] top-[56vh]' },
  { Icon: Compass, title: 'AI Strategy', description: 'Roadmaps and priorities, clarified.', position: 'left-[76vw] top-[54vh]' },
  { Icon: Shield, title: 'AI Compliance', description: 'Stay safe with built-in checks.', position: 'left-[22vw] top-[76vh]' },
  { Icon: Plug, title: 'AI Integrations', description: 'Connect the tools you already use.', position: 'left-[66vw] top-[78vh]' },
];

export const AIConstellationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            cardRefs.current.forEach((ref) => {
              if (ref) gsap.set(ref, { opacity: 1, x: 0, y: 0, scale: 1 });
            });
          },
        },
      });

      // ENTRANCE (0% - 30%)
      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Cards entrance with stagger
      cardRefs.current.forEach((ref, index) => {
        if (ref) {
          const isLeft = index < 5;
          const isBottom = index >= 8;
          
          let fromX: number | string = 0;
          let fromY: number | string = 0;
          
          if (isBottom) {
            fromY = window.innerHeight * 0.35;
          } else if (isLeft) {
            fromX = '-40vw';
          } else {
            fromX = '40vw';
          }

          scrollTl.fromTo(
            ref,
            { x: fromX, y: fromY, opacity: 0, scale: 0.92 },
            { x: 0, y: 0, opacity: 1, scale: 1, ease: 'none' },
            index * 0.02
          );
        }
      });

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      cardRefs.current.forEach((ref, index) => {
        if (ref) {
          const isLeft = index < 5;
          const isBottom = index >= 8;
          
          let toX: number | string = 0;
          let toY: number | string = 0;
          
          if (isBottom) {
            toY = window.innerHeight * 0.2;
          } else if (isLeft) {
            toX = '-25vw';
          } else {
            toX = '25vw';
          }

          scrollTl.fromTo(
            ref,
            { x: 0, y: 0, opacity: 1 },
            { x: toX, y: toY, opacity: 0, ease: 'power2.in' },
            0.7 + index * 0.015
          );
        }
      });

      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: -20, opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F6F8F7] overflow-hidden z-20"
    >
      <DotGrid className="opacity-80" />

      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute left-1/2 top-[10vh] -translate-x-1/2 text-center max-w-[720px] px-4 z-10"
      >
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
          Explore Our AI Toolkit
        </h2>
        <p className="text-base lg:text-lg text-muted-foreground">
          From content to analytics—tools that work together.
        </p>
      </div>

      {/* AI Tool Cards */}
      {aiTools.map(({ Icon, title, description, position }, index) => (
        <div
          key={index}
          ref={(el) => { cardRefs.current[index] = el; }}
          className={`absolute ${position} hidden lg:block w-[260px] h-[200px] bg-white rounded-[28px] shadow-card p-6 z-10 hover:shadow-card-hover transition-shadow duration-300`}
        >
          <div className="flex flex-col h-full">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      ))}

      {/* Mobile Grid */}
      <div className="lg:hidden absolute inset-x-4 top-[20vh] bottom-8 grid grid-cols-2 gap-3 overflow-y-auto pb-20">
        {aiTools.slice(0, 6).map(({ Icon, title, description }, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-card p-4"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-1">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIConstellationSection;
