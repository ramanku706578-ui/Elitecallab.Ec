import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  UserPlus, 
  Search, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  ArrowRight, 
  Star,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotGrid from '@/components/ui/DotGrid';

gsap.registerPlugin(ScrollTrigger);

interface CreatorsPageProps {
  onNavigate: (page: string) => void;
}

const benefits = [
  {
    Icon: UserPlus,
    title: 'Build Your Profile',
    description: 'Create a stunning portfolio that showcases your unique skills and style.',
  },
  {
    Icon: Search,
    title: 'Get Discovered',
    description: 'Our AI matches you with brands looking for creators like you.',
  },
  {
    Icon: Briefcase,
    title: 'Manage Deals',
    description: 'Track proposals, contracts, and deliverables in one place.',
  },
  {
    Icon: DollarSign,
    title: 'Get Paid Faster',
    description: 'Secure payments and transparent pricing for every collaboration.',
  },
];

const useCases = [
  {
    title: 'Influencers',
    description: 'Monetize your following with brand partnerships that align with your values.',
    stats: 'Avg. 3x more deals',
  },
  {
    title: 'Content Creators',
    description: 'From YouTube to TikTok, find sponsors who appreciate your craft.',
    stats: '50+ niche categories',
  },
  {
    title: 'Photographers',
    description: 'Connect with brands needing high-quality visual content.',
    stats: '$500-5000 per shoot',
  },
  {
    title: 'Designers',
    description: 'Offer your creative services to businesses worldwide.',
    stats: 'Global client base',
  },
];

const testimonials = [
  {
    quote: 'Elitecallab helped me land my first 5-figure brand deal. The AI matching is incredible.',
    name: 'Sarah K.',
    role: 'Lifestyle Creator',
    followers: '250K followers',
  },
  {
    quote: 'I went from struggling to find clients to having a waitlist. This platform changed everything.',
    name: 'Marcus T.',
    role: 'Tech Reviewer',
    followers: '180K subscribers',
  },
];

export const CreatorsPage: React.FC<CreatorsPageProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);

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

      // Benefits animation
      const benefitCards = benefitsRef.current?.querySelectorAll('.benefit-card');
      if (benefitCards) {
        gsap.fromTo(
          benefitCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Use cases animation
      const useCaseCards = useCasesRef.current?.querySelectorAll('.use-case-card');
      if (useCaseCards) {
        gsap.fromTo(
          useCaseCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: useCasesRef.current,
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
        <DotGrid className="opacity-80" />
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">For Creators</span>
            </div>
            <h1 className="font-heading font-semibold text-4xl lg:text-6xl text-foreground mb-6">
              Turn Your Passion Into{' '}
              <span className="text-primary">Profit</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              Join 500+ creators who are monetizing their content, growing their audience, 
              and building lasting brand partnerships with Elitecallab.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 rounded-full"
                onClick={() => onNavigate('login')}
              >
                Join as Creator
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2"
                onClick={() => onNavigate('contact')}
              >
                Talk to Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4">
              Why Creators Choose Elitecallab
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to grow your brand and monetize your content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ Icon, title, description }, index) => (
              <div
                key={index}
                className="benefit-card bg-white rounded-3xl shadow-card p-8 hover:shadow-card-hover transition-shadow"
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

      {/* Use Cases Section */}
      <section ref={useCasesRef} className="py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4">
              Who Can Join
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Elitecallab is built for all types of creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map(({ title, description, stats }, index) => (
              <div
                key={index}
                className="use-case-card bg-[#F6F8F7] rounded-3xl p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-heading font-semibold text-xl text-foreground">
                    {title}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                    <TrendingUp className="w-4 h-4" />
                    {stats}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4">
              Creator Success Stories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hear from creators who have transformed their careers with Elitecallab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map(({ quote, name, role, followers }, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-card p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground text-lg leading-relaxed mb-6">
                  "{quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">{name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{name}</p>
                    <p className="text-sm text-muted-foreground">{role} • {followers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto bg-primary rounded-[32px] p-8 lg:p-16 text-center text-white">
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join our community of 500+ creators and start landing brand deals today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full bg-white text-primary hover:bg-white/90"
                onClick={() => onNavigate('login')}
              >
                <Zap className="w-4 h-4 mr-2" />
                Create Free Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-white text-white hover:bg-white/10"
                onClick={() => onNavigate('contact')}
              >
                Contact Creator Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatorsPage;
