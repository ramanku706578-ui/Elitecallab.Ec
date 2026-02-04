import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import AIToolsPage from '@/pages/AIToolsPage';
import CreatorsPage from '@/pages/CreatorsPage';
import BrandsPage from '@/pages/BrandsPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

type PageType = 'home' | 'about' | 'ai-tools' | 'creators' | 'brands' | 'contact' | 'login';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger when page changes
    ScrollTrigger.refresh();
    
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'ai-tools':
        return <AIToolsPage onNavigate={handleNavigate} />;
      case 'creators':
        return <CreatorsPage onNavigate={handleNavigate} />;
      case 'brands':
        return <BrandsPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#F6F8F7] flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 animate-pulse">
            <svg 
              className="w-7 h-7 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
              />
            </svg>
          </div>
          <span className="font-heading font-semibold text-lg text-foreground">
            Elitecallab
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8F7]">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      {currentPage !== 'login' && (
        <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      )}

      {/* Main Content */}
      <main className="relative">
        {renderPage()}
      </main>

      {/* Footer */}
      {currentPage !== 'login' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
