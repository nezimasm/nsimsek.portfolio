import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'drag' | 'copy' | 'click' | 'text'>('default');
  const [cursorText, setCursorText] = useState('');
  const [accentColor, setAccentColor] = useState('rgba(255, 78, 32, 0.07)');
  const [ambientColor, setAmbientColor] = useState('rgba(255, 78, 32, 0.03)');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configurations for ultra-premium fluid response
  const cursorSpringConfig = { damping: 40, stiffness: 450, mass: 0.5 };
  const spotlightSpringConfig = { damping: 60, stiffness: 250, mass: 1.2 }; // slightly lazier for organic feel
  
  const springX = useSpring(cursorX, cursorSpringConfig);
  const springY = useSpring(cursorY, cursorSpringConfig);

  const spotlightX = useSpring(cursorX, spotlightSpringConfig);
  const spotlightY = useSpring(cursorY, spotlightSpringConfig);

  // Spotlight circle mask using useMotionTemplate for smooth performance and high-fidelity clipping
  const maskImage = useMotionTemplate`radial-gradient(circle 280px at ${spotlightX}px ${spotlightY}px, black 0%, transparent 100%)`;

  useEffect(() => {
    // Check if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add('cursor-none-active');

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hoverable = target.closest('[data-cursor]');
      if (hoverable) {
        const type = hoverable.getAttribute('data-cursor') as any;
        const text = hoverable.getAttribute('data-cursor-text') || '';
        setCursorType(type || 'pointer');
        setCursorText(text);
      } else if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive-cursor')
      ) {
        setCursorType('pointer');
        setCursorText('');
      } else if (target.closest('p, h1, h2, h3, blockquote')) {
        setCursorType('text');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleScrollColor = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      
      const homeSection = document.getElementById('arrival');
      const journeySection = document.getElementById('journey');
      const worksSection = document.getElementById('selected-works');
      const featuredSection = document.getElementById('featured');
      const contactSection = document.getElementById('contact');

      if (contactSection && scrollPosition >= contactSection.offsetTop) {
        setAccentColor('rgba(139, 92, 246, 0.08)'); // Purple
        setAmbientColor('rgba(139, 92, 246, 0.03)');
      } else if (featuredSection && scrollPosition >= featuredSection.offsetTop) {
        setAccentColor('rgba(46, 91, 255, 0.08)'); // Electric Blue
        setAmbientColor('rgba(46, 91, 255, 0.03)');
      } else if (worksSection && scrollPosition >= worksSection.offsetTop) {
        setAccentColor('rgba(0, 240, 255, 0.08)'); // Turquoise
        setAmbientColor('rgba(0, 240, 255, 0.03)');
      } else if (journeySection && scrollPosition >= journeySection.offsetTop) {
        setAccentColor('rgba(255, 78, 32, 0.08)'); // Orange
        setAmbientColor('rgba(255, 78, 32, 0.03)');
      } else {
        // Hero / Home subtle multicolor transition
        setAccentColor('rgba(255, 255, 255, 0.06)');
        setAmbientColor('rgba(255, 78, 32, 0.02)');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('scroll', handleScrollColor);

    // Initial run
    handleScrollColor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScrollColor);
      document.body.classList.remove('cursor-none-active');
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Variants for the custom cursor cursor element
  const variants = {
    default: {
      width: 8,
      height: 8,
      backgroundColor: '#FF4E20', // Glowing Exhibition Vermilion
      border: '0px solid transparent',
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(255, 78, 32, 0.1)',
      border: '1.5px solid #FF4E20',
    },
    text: {
      width: 4,
      height: 24,
      borderRadius: '2px',
      backgroundColor: '#ffffff',
      border: '0px solid transparent',
    },
    view: {
      width: 90,
      height: 90,
      backgroundColor: '#ffffff',
      border: '0px solid transparent',
    },
    drag: {
      width: 75,
      height: 75,
      backgroundColor: '#FF4E20',
      border: '0px solid transparent',
    },
    copy: {
      width: 80,
      height: 80,
      backgroundColor: '#090909',
      border: '1.5px solid #FF4E20',
    },
    click: {
      width: 32,
      height: 32,
      backgroundColor: '#FF4E20',
      border: '0px solid transparent',
    }
  };

  const isDarkCursor = cursorType === 'view';

  return (
    <>
      {/* Subtle dotted grid similar to Stitch AI */}
      <div className="dotted-grid" />

      {/* Dotted grid appearing inside spotlight radius using high-performance mask template */}
      <motion.div
        className="masked-dotted-grid"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />

      {/* Premium Cinematic Mouse Spotlight: follow cursor lazily on dark background */}
      <motion.div
        id="mouse-spotlight-glow"
        className="fixed top-0 left-0 pointer-events-none z-[3] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full mix-blend-screen opacity-100 filter blur-3xl transition-all duration-[800ms] ease-out"
        style={{
          x: spotlightX,
          y: spotlightY,
          background: `radial-gradient(circle, ${accentColor} 0%, ${ambientColor} 30%, transparent 70%)`,
        }}
      />

      {/* Subtle secondary ambient white light for perfect depth */}
      <motion.div
        id="mouse-ambient-glow"
        className="fixed top-0 left-0 pointer-events-none z-[2] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-60 filter blur-2xl"
        style={{
          x: spotlightX,
          y: spotlightY,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.015) 0%, transparent 70%)',
        }}
      />

      {/* Interactive Cursor Ring/Dot */}
      <motion.div
        id="custom-cursor-element"
        className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
        style={{
          x: springX,
          y: springY,
        }}
        animate={cursorType}
        variants={variants}
        transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.5 }}
      >
        {cursorText && (
          <span 
            id="custom-cursor-text-label"
            className={`text-[9px] font-mono tracking-[0.18em] uppercase font-bold text-center px-2 select-none leading-none ${
              isDarkCursor ? 'text-charcoal' : 'text-white'
            }`}
          >
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
