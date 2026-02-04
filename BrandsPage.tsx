import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Search, 
  FileText, 
  BarChart3, 
  Handshake, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Sparkles,
  Building2,
  Target,
  Zap,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotGrid from '@/components/ui/DotGrid';

gsap.registerPlugin(ScrollTrigger);

interface BrandsPageProps {
  onNavigate: (page: string) => void;
}

const solutions = [
  {
    Icon: Search,
    title: 'Find the Right Voice',
    description: 'AI-powered matching connects you with creators who align with your brand values.',
  },
  {
    Icon: FileText,
    title: 'Brief at Scale',
    description: 'Create and manage campaign briefs for multiple creators simultaneously.',
  },
  {
    Icon: BarChart3,
    title: 'Track Performance',
    description: 'Real-time analytics and ROI tracking for every campaign.',
  },
  {
    Icon: Handshake,
    title: 'Close Deals Faster',
    description: 'Streamlined negotiations, contracts, and payments in one platform.',
  },
];

const stats = [
  { value: '3x', label: 'Average ROI increase' },
  { value: '70%', label: 'Faster campaign setup' },
  { value: '500+', label: 'Verified creators' },
  { value: '50+', label: 'Countries reached' },
];

const caseStudies = [
  {
    brand: 'TechStart Inc.',
    industry: 'Technology',
    result: '250% increase in engagement',
    description: 'Launched a product campaign with 15 tech creators, reaching 2M+ viewers.',
  },
  {
    brand: 'Fashion Forward',
    industry: 'Fashion',
    result: '$500K in attributed sales',
    description: 'Seasonal campaign with lifestyle creators drove record-breaking sales.',
  },
];

export const BrandsPage: React.FC<BrandsPageProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Solutions animation
      const solutionCards = solutionsRef.current?.querySelectorAll('.solution-card');
      if (solutionCards) {
        gsap.fromTo(
          solutionCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: solutionsRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
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
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">For Brands & Businesses</span>
            </div>
            <h1 className="font-heading font-semibold text-4xl lg:text-6xl text-foreground mb-6">
              AI-Powered Brand{' '}
              <span className="text-primary">Growth Solutions</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              Discover, collaborate, and scale with the perfect creators for your brand. 
              Our AI does the heavy lifting so you can focus on results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 rounded-full"
                onClick={() => onNavigate('login')}
              >
                Start as Brand
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2"
                onClick={() => onNavigate('contact')}
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 lg:py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map(({ value, label }, index) => (
              <div key={index} className="stat-item text-center">
                <p className="font-heading font-bold text-4xl lg:text-5xl text-primary mb-2">
                  {value}
                </p>
                <p className="text-muted-foreground text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section ref={solutionsRef} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4">
              How Elitecallab Helps Brands
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              End-to-end solutions for finding, managing, and scaling creator partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map(({ Icon, title, description }, index) => (
              <div
                key={index}
                className="solution-card bg-white rounded-3xl shadow-card p-8 hover:shadow-card-hover transition-shadow"
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

      {/* Case Studies */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how brands are achieving remarkable results with Elitecallab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {caseStudies.map(({ brand, industry, result, description }, index) => (
              <div
                key={index}
                className="bg-[#F6F8F7] rounded-3xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      {brand}
                    </h3>
                    <p className="text-sm text-muted-foreground">{industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">{result}</span>
                </div>
                <p className="text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-6">
                  Everything You Need to Scale
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Our platform provides all the tools and insights you need to run 
                  successful creator marketing campaigns at any scale.
                </p>
                <ul className="space-y-4">
                  {[
                    'AI-powered creator matching',
                    'Campaign management dashboard',
                    'Real-time performance analytics',
                    'Automated contract & payments',
                    'Content approval workflows',
                    'Global compliance & legal support',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-3xl shadow-card p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded-2xl p-6 text-center">
                    <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="font-semibold text-foreground">Precise Targeting</p>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 text-center">
                    <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="font-semibold text-foreground">Global Reach</p>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 text-center">
                    <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="font-semibold text-foreground">Fast Execution</p>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 text-center">
                    <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="font-semibold text-foreground">Team Collaboration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto bg-primary rounded-[32px] p-8 lg:p-16 text-center text-white">
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl mb-4">
              Ready to Scale Your Brand?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of brands using Elitecallab to drive growth through creator partnerships.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full bg-white text-primary hover:bg-white/90"
                onClick={() => onNavigate('login')}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-white text-white hover:bg-white/10"
                onClick={() => onNavigate('contact')}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandsPage;
