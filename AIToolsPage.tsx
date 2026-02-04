import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileText, 
  Image, 
  Megaphone, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Compass, 
  Plug,
  ArrowRight,
  Sparkles,
  Wand2,
  Palette,
  Mail,
  Calendar,
  Search,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotGrid from '@/components/ui/DotGrid';

gsap.registerPlugin(ScrollTrigger);

interface AIToolsPageProps {
  onNavigate: (page: string) => void;
}

const toolCategories = [
  {
    id: 'content',
    title: 'AI Content Generator',
    description: 'Generate high-quality content for any platform, any audience.',
    Icon: FileText,
    color: 'bg-blue-500',
    tools: [
      { name: 'Blog Writer', description: 'Generate long-form articles in minutes', Icon: FileText },
      { name: 'Social Posts', description: 'Create engaging social media content', Icon: MessageSquare },
      { name: 'Email Composer', description: 'Write professional emails at scale', Icon: Mail },
      { name: 'Ad Copy', description: 'High-converting advertising copy', Icon: Megaphone },
    ],
  },
  {
    id: 'images',
    title: 'AI Image Generator',
    description: 'Create stunning visuals that match your brand identity.',
    Icon: Image,
    color: 'bg-purple-500',
    tools: [
      { name: 'Brand Images', description: 'On-brand visuals for any campaign', Icon: Palette },
      { name: 'Product Shots', description: 'Professional product photography', Icon: Image },
      { name: 'Social Graphics', description: 'Eye-catching social media images', Icon: Wand2 },
      { name: 'Logo Concepts', description: 'AI-powered logo design ideas', Icon: Sparkles },
    ],
  },
  {
    id: 'marketing',
    title: 'AI Marketing Tools',
    description: 'Plan, execute, and optimize campaigns with AI precision.',
    Icon: Megaphone,
    color: 'bg-orange-500',
    tools: [
      { name: 'Campaign Planner', description: 'Strategic marketing roadmaps', Icon: Compass },
      { name: 'SEO Optimizer', description: 'Rank higher on search engines', Icon: Search },
      { name: 'Audience Insights', description: 'Deep customer understanding', Icon: BarChart3 },
      { name: 'Competitor Analysis', description: 'Stay ahead of the competition', Icon: Target },
    ],
  },
  {
    id: 'productivity',
    title: 'AI Productivity Tools',
    description: 'Automate tasks and focus on what matters most.',
    Icon: Zap,
    color: 'bg-green-500',
    tools: [
      { name: 'Task Automation', description: 'Streamline repetitive workflows', Icon: Zap },
      { name: 'Meeting Summaries', description: 'AI-generated meeting notes', Icon: FileText },
      { name: 'Smart Scheduler', description: 'Optimize your calendar', Icon: Calendar },
      { name: 'Document Assistant', description: 'Draft and edit faster', Icon: FileText },
    ],
  },
];

export const AIToolsPage: React.FC<AIToolsPageProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

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

      // Category cards animation
      const categoryCards = categoriesRef.current?.querySelectorAll('.category-section');
      if (categoryCards) {
        categoryCards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );
        });
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
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Tools</span>
            </div>
            <h1 className="font-heading font-semibold text-4xl lg:text-6xl text-foreground mb-6">
              Powerful AI Tools for{' '}
              <span className="text-primary">Every Need</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              From content creation to analytics, our suite of AI tools helps you work smarter, 
              faster, and more effectively.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 rounded-full"
              onClick={() => onNavigate('login')}
            >
              Start Using AI Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section ref={categoriesRef} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="space-y-20">
            {toolCategories.map(({ id, title, description, Icon, color, tools }, index) => (
              <div key={id} className="category-section">
                <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-start`}>
                  {/* Category Header */}
                  <div className="lg:w-1/3">
                    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-4">
                      {title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {description}
                    </p>
                    <Button
                      variant="outline"
                      className="rounded-full border-2"
                      onClick={() => onNavigate('login')}
                    >
                      Explore {title.split(' ')[0]}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  {/* Tools Grid */}
                  <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tools.map((tool, toolIndex) => (
                      <div
                        key={toolIndex}
                        className="bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-shadow cursor-pointer group"
                        onClick={() => onNavigate('login')}
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <tool.Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration CTA */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-card p-8 lg:p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Plug className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4">
              Seamless Integrations
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Connect Elitecallab with your favorite tools. Works with Slack, Notion, 
              Google Workspace, and 50+ more platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 rounded-full"
                onClick={() => onNavigate('login')}
              >
                View All Integrations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIToolsPage;
