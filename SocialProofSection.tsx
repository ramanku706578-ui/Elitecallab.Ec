import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Building2, ShoppingBag, Coffee, Plane, Laptop } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: '+', label: 'Creators in the network' },
  { value: 300, suffix: '+', label: 'Deals completed' },
  { value: 100, suffix: '+', label: 'International campaigns' },
];

const testimonials = [
  {
    quote: 'Elitecallab cut our campaign setup time by half.',
    name: 'Ava R.',
    role: 'Marketing Lead',
    avatar: '/avatar_01.jpg',
  },
  {
    quote: 'The AI tools actually sound like us. That\'s rare.',
    name: 'Marcus T.',
    role: 'Creator',
    avatar: '/avatar_02.jpg',
  },
  {
    quote: 'We found creators, briefed them, and launched—in one week.',
    name: 'Priya S.',
    role: 'Brand Manager',
    avatar: '/avatar_03.jpg',
  },
];

const clientLogos = [
  { name: 'TechCorp', Icon: Laptop },
  { name: 'ShopMax', Icon: ShoppingBag },
  { name: 'InnovateLab', Icon: Building2 },
  { name: 'CoffeeCo', Icon: Coffee },
  { name: 'AirGlobal', Icon: Plane },
];

const AnimatedCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: counterRef.current,
        start: 'top 80%',
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function() {
              setCount(Math.floor(obj.val));
            },
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={counterRef} className="font-heading font-bold text-4xl lg:text-5xl text-foreground">
      {count}{suffix}
    </span>
  );
};

export const SocialProofSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logos entrance
      gsap.fromTo(
        logosRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: logosRef.current,
            start: 'top 80%',
          },
        }
      );

      // Stats cards entrance
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          statCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Testimonials entrance
      const testimonialCards = testimonialsRef.current?.querySelectorAll('.testimonial-card');
      if (testimonialCards) {
        gsap.fromTo(
          testimonialCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F6F8F7] py-16 lg:py-24 z-40"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Client Logos */}
        <div ref={logosRef} className="mb-16">
          <p className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {clientLogos.map(({ name, Icon }, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                <Icon className="w-6 h-6" />
                <span className="font-medium text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map(({ value, suffix, label }, index) => (
            <div
              key={index}
              className="stat-card bg-white rounded-3xl shadow-card p-8 text-center"
            >
              <AnimatedCounter value={value} suffix={suffix} />
              <p className="text-muted-foreground mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-3">
              Trusted by teams that move fast
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
          </div>

          <div
            ref={testimonialsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map(({ quote, name, role, avatar }, index) => (
              <div
                key={index}
                className="testimonial-card bg-white rounded-3xl shadow-card p-6 lg:p-8"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-foreground text-lg leading-relaxed mb-6">
                  "{quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{name}</p>
                    <p className="text-sm text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
