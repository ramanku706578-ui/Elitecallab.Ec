import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  MapPin, 
  Instagram, 
  Send, 
  MessageCircle,
  User,
  Building2,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DotGrid from '@/components/ui/DotGrid';

gsap.registerPlugin(ScrollTrigger);

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const contactTypes = [
  { id: 'creator', label: 'I am a Creator', Icon: User },
  { id: 'brand', label: 'I am a Brand', Icon: Building2 },
  { id: 'business', label: 'Business Inquiry', Icon: Briefcase },
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [contactType, setContactType] = useState('creator');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#F6F8F7] pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 lg:py-24 overflow-hidden">
        <DotGrid className="opacity-80" />
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get in Touch</span>
            </div>
            <h1 className="font-heading font-semibold text-4xl lg:text-6xl text-foreground mb-6">
              Let's <span className="text-primary">Connect</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formRef} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Reach out to us through any of these channels. Our team is ready to help.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Email</p>
                      <a 
                        href="mailto:elitecallab@gmail.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        elitecallab@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Instagram</p>
                      <a 
                        href="https://www.instagram.com/elitecallab.official" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        @elitecallab.official
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Location</p>
                      <p className="text-muted-foreground">
                        Global operations, headquartered digitally
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="mt-10 pt-8 border-t">
                  <p className="font-medium text-foreground mb-4">Quick Links</p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => onNavigate('creators')}
                    >
                      For Creators
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => onNavigate('brands')}
                    >
                      For Brands
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => onNavigate('ai-tools')}
                    >
                      AI Tools
                    </Button>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl shadow-card p-6 lg:p-10">
                  {/* Contact Type Selector */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {contactTypes.map(({ id, label, Icon }) => (
                      <button
                        key={id}
                        onClick={() => setContactType(id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          contactType === id
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Your Name
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="rounded-xl h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email Address
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="rounded-xl h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Company/Brand (Optional)
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className="rounded-xl h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help..."
                          required
                          rows={5}
                          className="rounded-xl resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 rounded-full"
                      >
                        Send Message
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-semibold text-3xl text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'How do I get started as a creator?',
                  a: 'Simply create a free account, complete your profile, and start applying to brand campaigns that match your niche.',
                },
                {
                  q: 'What types of brands use Elitecallab?',
                  a: 'We work with businesses of all sizes—from startups to Fortune 500 companies—across various industries.',
                },
                {
                  q: 'How does the AI matching work?',
                  a: 'Our AI analyzes your profile, content style, and audience demographics to match you with the most relevant brand partnerships.',
                },
                {
                  q: 'Is there a fee to join?',
                  a: 'Creating an account is free. We charge a small commission only when you successfully complete a collaboration.',
                },
              ].map(({ q, a }, index) => (
                <div key={index} className="bg-[#F6F8F7] rounded-2xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">{q}</h3>
                  <p className="text-muted-foreground">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
