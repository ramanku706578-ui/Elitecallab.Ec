import React from 'react';
import { Sparkles, Instagram, Mail, Twitter, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const footerLinks = {
  product: [
    { label: 'AI Tools', page: 'ai-tools' },
    { label: 'For Creators', page: 'creators' },
    { label: 'For Brands', page: 'brands' },
    { label: 'Pricing', page: 'login' },
  ],
  company: [
    { label: 'About Us', page: 'about' },
    { label: 'Careers', page: 'about' },
    { label: 'Blog', page: 'about' },
    { label: 'Press', page: 'about' },
  ],
  support: [
    { label: 'Contact', page: 'contact' },
    { label: 'Help Center', page: 'contact' },
    { label: 'Privacy Policy', page: 'about' },
    { label: 'Terms of Service', page: 'about' },
  ],
};

const socialLinks = [
  { Icon: Instagram, href: 'https://www.instagram.com/elitecallab.official', label: 'Instagram' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-white py-16 lg:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">Elitecallab</span>
            </button>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Smart AI tools for creators, brands, and businesses. 
              Simplify your workflow and scale faster with our all-in-one platform.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.page)}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.page)}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.page)}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Elitecallab. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Mail className="w-4 h-4" />
            <a href="mailto:elitecallab@gmail.com" className="hover:text-white transition-colors">
              elitecallab@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
