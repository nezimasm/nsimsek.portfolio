import { useEffect, useState, MouseEvent } from 'react';
import { motion } from 'motion/react';

interface HeaderProps {
  isCategoryView?: boolean;
  onNavigateHomeWithAnchor?: (anchor: string) => void;
}

export default function Header({ isCategoryView = false, onNavigateHomeWithAnchor }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('#arrival');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleScrollSpy = () => {
      if (isCategoryView) {
        // When in Category view, highlight "Çalışmalarım" (#selected-works) as the active menu item
        setActiveItem('#selected-works');
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      
      const homeSection = document.getElementById('arrival');
      const journeySection = document.getElementById('journey');
      const worksSection = document.getElementById('selected-works');
      const contactSection = document.getElementById('contact');

      if (contactSection && scrollPosition >= contactSection.offsetTop) {
        setActiveItem('#contact');
      } else if (worksSection && scrollPosition >= worksSection.offsetTop) {
        setActiveItem('#selected-works');
      } else if (journeySection && scrollPosition >= journeySection.offsetTop) {
        setActiveItem('#journey');
      } else {
        setActiveItem('#arrival');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollSpy);
    
    // Initial runs
    handleScroll();
    handleScrollSpy();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, [isCategoryView]);

  const navItems = [
    { label: 'Ana Sayfa', href: '#arrival' },
    { label: 'Yolculuğum', href: '#journey' },
    { label: 'Çalışmalarım', href: '#selected-works' },
    { label: 'İletişim', href: '#contact' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (isCategoryView) {
      if (onNavigateHomeWithAnchor) {
        onNavigateHomeWithAnchor(href);
      }
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Turquoise (#00F0FF) is the active accent in category, otherwise original orange-vermilion (#FF4E20)
  const activeColor = isCategoryView ? '#00F0FF' : '#FF4E20';

  return (
    <motion.header
      id="main-nav-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 sm:px-12 ${
        scrolled 
          ? 'py-4 bg-[#070707]/80 backdrop-blur-md border-b border-white/5' 
          : 'py-6 bg-transparent'
      }`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        {/* Navigation List */}
        <nav id="desktop-nav">
          <ul className="flex items-center gap-4 sm:gap-8">
            {navItems.map((item) => {
              const isActive = activeItem === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase py-1.5 inline-block group transition-colors ${
                      isActive ? 'text-white font-bold' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span 
                      className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-300" 
                      style={{ 
                        backgroundColor: activeColor,
                        width: isActive ? '100%' : '0%'
                      }} 
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
