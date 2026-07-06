import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowDown, Fingerprint, Play, BookOpen, Feather, Type, Sparkles } from 'lucide-react';

interface LabelItem {
  id: string;
  text: string;
  initialX: number; // percentage based
  initialY: number; // percentage based
  speed: number;
  color: string; // Dynamic accent color
  iconName: 'Fingerprint' | 'Play' | 'BookOpen' | 'Feather' | 'Type' | 'Sparkles';
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position in pixels
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax background grid offset
  const gridSpringX = useSpring(0, { damping: 50, stiffness: 100 });
  const gridSpringY = useSpring(0, { damping: 50, stiffness: 100 });

  // Ribbon mouse-drive translation
  const ribbonSpringX = useSpring(0, { damping: 40, stiffness: 80 });

  const labels: LabelItem[] = [
    { id: 'brand', text: 'Marka Kimliği', initialX: 12, initialY: 15, speed: 1.2, color: '#00F0FF', iconName: 'Fingerprint' }, // Cyan
    { id: 'motion', text: 'Motion Design', initialX: 78, initialY: 15, speed: 1.4, color: '#3B82F6', iconName: 'Play' }, // Electric Blue
    { id: 'editorial', text: 'Editoryal', initialX: 10, initialY: 34, speed: 1.1, color: '#FBBF24', iconName: 'Feather' }, // Warm Gold
    { id: 'typo', text: 'Tipografi', initialX: 80, initialY: 34, speed: 1.3, color: '#A78BFA', iconName: 'Type' }, // Violet
    { id: 'visual', text: 'Görsel Hikayecilik', initialX: 14, initialY: 52, speed: 1.2, color: '#10B981', iconName: 'BookOpen' }, // Emerald
    { id: 'event', text: 'Etkinlik Tasarımı', initialX: 76, initialY: 52, speed: 1.5, color: '#FF4E20', iconName: 'Sparkles' }, // Vermilion
  ];

  const designTools = [
    { id: 'canva', name: 'Canva', shortName: 'Cv', color: '#7d2ae8', textColor: '#ffffff', initialX: 25, initialY: 22, rotate: -12 },
    { id: 'illustrator', name: 'Illustrator', shortName: 'Ai', color: '#ff9a00', textColor: '#331c00', initialX: 68, initialY: 20, rotate: 10 },
    { id: 'photoshop', name: 'Photoshop', shortName: 'Ps', color: '#00c8ff', textColor: '#001c33', initialX: 84, initialY: 25, rotate: -15 },
    { id: 'aftereffects', name: 'After Effects', shortName: 'Ae', color: '#9999ff', textColor: '#120033', initialX: 30, initialY: 44, rotate: 8 },
    { id: 'blender', name: 'Blender', shortName: 'Bl', color: '#ea7600', textColor: '#ffffff', initialX: 66, initialY: 46, rotate: -10 },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        
        gridSpringX.set(normX * 25); 
        gridSpringY.set(normY * 25);
        ribbonSpringX.set(normX * -80); // Move ribbon opposite of mouse direction slightly
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, gridSpringX, gridSpringY, ribbonSpringX]);

  const ribbonWords = [
    "Marka Kimliği", "Motion Design", "Görsel Hikayecilik", "Editoryal", "Etkinlik Tasarımı",
    "Marka Kimliği", "Motion Design", "Görsel Hikayecilik", "Editoryal", "Etkinlik Tasarımı",
    "Marka Kimliği", "Motion Design", "Görsel Hikayecilik", "Editoryal", "Etkinlik Tasarımı"
  ];

  return (
    <section 
      ref={containerRef}
      id="arrival" 
      className="relative w-full bg-[#070707] flex flex-col select-none overflow-x-hidden"
    >
      {/* 1. First Fold: Centered Creative Designer Composition with Action Bar (Strictly 100vh) */}
      <div className="relative w-full h-screen flex flex-col justify-between overflow-hidden shrink-0">
        
        {/* Subtle Interactive Parallax Background Grid */}
        <motion.div 
          id="interactive-bg-grid"
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            x: gridSpringX,
            y: gridSpringY,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Large Chapter Number / Logo Backdrop */}
        <div className="absolute top-24 left-6 md:left-12 flex items-baseline gap-4 pointer-events-none z-20 select-none">
          <span className="font-serif italic text-6xl md:text-8xl text-white/15 leading-none">01</span>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#FF4E20] font-bold">BÖLÜM BİR</span>
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/40 uppercase">ANA SAYFA</span>
          </div>
        </div>

        {/* Interactive Vector Anchor Paths SVG (Illustrator / Pen Tool vibe, matching user reference) */}
        <svg className="absolute inset-x-0 top-0 w-full h-screen pointer-events-none z-10 opacity-35" xmlns="http://www.w3.org/2000/svg">
          {/* Curved Path */}
          <motion.path
            d="M 120 380 C 260 200, 480 520, 720 300 C 860 180, 1100 480, 1380 340"
            fill="none"
            stroke="#FF4E20"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Support lines from control anchors */}
          <line x1="120" y1="380" x2="220" y2="300" stroke="#00F0FF" strokeWidth="0.75" strokeDasharray="2,2" />
          <line x1="720" y1="300" x2="650" y2="380" stroke="#00F0FF" strokeWidth="0.75" strokeDasharray="2,2" />
          <line x1="720" y1="300" x2="790" y2="220" stroke="#00F0FF" strokeWidth="0.75" strokeDasharray="2,2" />

          {/* Anchor point circles */}
          <circle cx="120" cy="380" r="3.5" fill="#070707" stroke="#FF4E20" strokeWidth="1.5" />
          <circle cx="720" cy="300" r="3.5" fill="#070707" stroke="#FF4E20" strokeWidth="1.5" />
          <circle cx="1380" cy="340" r="3.5" fill="#070707" stroke="#FF4E20" strokeWidth="1.5" />

          {/* Direction handles (Cyan squares) */}
          <rect x="217" y="297" width="5" height="5" fill="#00F0FF" stroke="#00F0FF" strokeWidth="1" />
          <rect x="647" y="377" width="5" height="5" fill="#00F0FF" stroke="#00F0FF" strokeWidth="1" />
          <rect x="787" y="217" width="5" height="5" fill="#00F0FF" stroke="#00F0FF" strokeWidth="1" />
        </svg>

        {/* Floating Design Tool App Badges directly styled like User's image reference */}
        {designTools.map((tool) => (
          <motion.div
            key={tool.id}
            className="absolute cursor-pointer select-none z-20 hidden sm:flex items-center justify-center pointer-events-auto"
            style={{
              left: `${tool.initialX}%`,
              top: `${tool.initialY}%`,
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: tool.rotate }}
            animate={{ opacity: 1, scale: 1, rotate: tool.rotate }}
            whileHover={{
              scale: 1.15,
              rotate: tool.rotate * 1.5,
              y: -5,
              filter: "brightness(1.1)"
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <div 
              className="flex items-center gap-1.5 bg-[#0a0a0ad8] backdrop-blur-md border border-white/10 rounded-xl py-1.5 px-3.5 shadow-2xl transition-all duration-300 hover:border-white/20"
              style={{
                boxShadow: `0 8px 30px -4px ${tool.color}15`,
              }}
            >
              <span 
                className="font-sans font-black text-[10px] tracking-tight rounded-lg px-2 py-1 flex items-center justify-center shrink-0 min-w-[24px]"
                style={{
                  backgroundColor: tool.color,
                  color: tool.textColor,
                  boxShadow: `0 2px 10px ${tool.color}40`,
                }}
              >
                {tool.shortName}
              </span>
              <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/80 font-bold whitespace-nowrap">
                {tool.name}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Decorative Outlined Typography behind the main title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-[0.02] z-0">
          <h3 className="font-display font-black text-[25vw] uppercase text-outline-white tracking-widest translate-y-[-5%] leading-none">
            DESIGN
          </h3>
        </div>

        {/* Interactive Floating Labels */}
        {labels.map((label) => (
          <FloatingLabel 
            key={label.id} 
            item={label} 
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        ))}

        {/* Animated Connecting Lines (Thin SVG wireframe background) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] z-0" xmlns="http://www.w3.org/2000/svg">
          <motion.line 
            x1="15%" y1="25%" x2="45%" y2="50%" 
            stroke="white" strokeWidth="1" strokeDasharray="5,5" 
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
          <motion.line 
            x1="78%" y1="42%" x2="55%" y2="52%" 
            stroke="white" strokeWidth="1" strokeDasharray="4,4"
            animate={{ strokeDashoffset: [0, 20] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          />
          <motion.line 
            x1="45%" y1="80%" x2="15%" y2="75%" 
            stroke="white" strokeWidth="1" strokeDasharray="3,3"
            animate={{ strokeDashoffset: [0, -15] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
        </svg>

        {/* 3. Central Gorgeous Typographic Composition (Creative Director Style) */}
        <div className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl text-center px-4 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
          
          {/* Custom Typographic Overlapping Composition */}
          <div className="flex flex-col items-center relative p-6">
            
            {/* Vector bounding box overlay (Figma / Illustrator-like selection frame) */}
            <div className="absolute inset-0 border border-[#00F0FF]/30 rounded-sm pointer-events-none z-10 hidden sm:block animate-pulse" style={{ animationDuration: '4s' }}>
              {/* Corner handle dots */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#070707] border border-[#00F0FF] rounded-none" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#070707] border border-[#00F0FF] rounded-none" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#070707] border border-[#00F0FF] rounded-none" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#070707] border border-[#00F0FF] rounded-none" />
              {/* Mid points */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-1.5 h-1.5 bg-[#00F0FF] rounded-none" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-[#00F0FF] rounded-none" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00F0FF] rounded-none" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00F0FF] rounded-none" />

              {/* Design Metrics Banner */}
              <div className="absolute -top-7 left-2 bg-[#00F0FF] text-[#070707] font-mono text-[7px] tracking-widest font-bold py-0.5 px-2 rounded-sm flex items-center gap-1.5 shadow-lg">
                <span>W: 1080 PX</span>
                <span className="opacity-30">|</span>
                <span>H: 720 PX</span>
                <span className="opacity-30">|</span>
                <span>NEZIHA.SH</span>
              </div>
            </div>

            {/* Row 1: CREATIVE (Solid white with soft neon shadow for high legibility) */}
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: '100%', rotate: 1 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="font-display font-black uppercase text-[12vw] sm:text-[9.5vw] md:text-[8vw] leading-none tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(255,255,255,0.05)] text-center transition-all duration-500 hover:text-[#FF4E20]"
              >
                CREATIVE
              </motion.h1>
            </div>

            {/* Row 2: Designer (Elegant Editorial Serif Italic, overlapping) */}
            <div className="overflow-hidden py-2 -mt-2 sm:-mt-4 md:-mt-6 animate-fade-in">
              <motion.h2
                initial={{ y: '100%', rotate: -1 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                className="font-serif italic text-[11vw] sm:text-[9vw] md:text-[7.5vw] leading-none text-white font-light tracking-tight text-center"
              >
                Designer<span className="text-[#FF4E20] font-sans not-italic text-xl md:text-3xl ml-1">.</span>
              </motion.h2>
            </div>

            {/* Mobile-only clean organized tags to replace the floating labels elegantly */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-[280px] sm:hidden pointer-events-auto px-2"
            >
              {labels.map((lbl) => {
                const IconComp = {
                  Fingerprint,
                  Play,
                  BookOpen,
                  Feather,
                  Type,
                  Sparkles,
                }[lbl.iconName];
                return (
                  <div 
                    key={lbl.id}
                    className="flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full py-1 px-2.5 shadow-lg"
                  >
                    <span style={{ color: lbl.color }}>
                      {IconComp && <IconComp className="w-2.5 h-2.5" />}
                    </span>
                    <span className="font-mono text-[7px] tracking-widest uppercase text-white/80 font-medium">
                      {lbl.text}
                    </span>
                  </div>
                );
              })}
            </motion.div>

          </div>

        </div>

        {/* Bottom Row Action Bar (Placed elegantly at the bottom of the first fold) */}
        <div className="absolute bottom-6 left-0 right-0 w-full px-6 md:px-12 z-20 flex justify-between items-end pointer-events-auto">
          {/* Left short label */}
          <div className="flex flex-col text-left pointer-events-none">
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/35 uppercase">KONSEPT</span>
            <span className="font-mono text-[10px] text-white/60 uppercase">GÖRSEL İLETİŞİM // KREATİF</span>
          </div>

          {/* Center Scroll Prompt */}
          <div className="hidden lg:flex flex-col items-center gap-2 text-center pointer-events-none">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/20">AŞAĞI KAYDIR</span>
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-4 h-8 rounded-full border border-white/15 flex justify-center p-1"
            >
              <span className="w-0.5 h-1.5 bg-white/40 rounded-full" />
            </motion.div>
          </div>

          {/* Right simple scroll CTA button */}
          <button 
            onClick={() => document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 text-white rounded-full py-2 px-5 transition-all duration-300 group interactive-cursor"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest leading-none">
              Keşfetmeye Başla
            </span>
            <ArrowDown className="w-3 h-3 text-white/50 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* 2. Transition Fold: Elegant About Me Paragraph & Ribbon (Laid out naturally as we scroll) */}
      <div id="about-me" className="relative w-full flex flex-col items-center justify-center bg-[#070707] z-20">
        
        {/* Elegant About Me Editorial Paragraph Section */}
        <div className="w-full flex flex-col items-center justify-center pt-24 pb-32 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center max-w-xl sm:max-w-2xl mx-auto px-6 select-text pointer-events-auto"
          >
            <div className="w-8 h-[1.5px] bg-[#FF4E20]/50 mb-6" />
            <p className="font-sans text-[12px] sm:text-[14px] md:text-[15.5px] leading-relaxed text-white/70 font-normal tracking-wide text-center">
              Merhaba, ben <span className="text-white font-semibold">Neziha Şimşek</span>. Görsel iletişimden deneyim tasarımına uzanan disiplinler arası bir yaklaşımla; kurumsal kimlik, organizasyon tasarımı, dijital içerik ve fiziksel ürün deneyimleri geliştiriyorum. Her projede kullanıcı deneyimini merkeze alan, güçlü hikâyeler anlatan ve markaya değer katan tasarımlar üretmeyi hedefliyorum. Bu portfolyoda; eğitim yolculuğumu, profesyonel deneyimlerimi ve farklı disiplinlerde geliştirdiğim yaratıcı projeleri keşfedebilir, tasarım yaklaşımıma daha yakından göz atabilirsiniz.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Moving Thin Ribbon */}
        <div className="w-full relative overflow-hidden border-y border-white/5 bg-[#FF4E20]/5 py-2.5">
          <motion.div 
            className="flex gap-16 whitespace-nowrap text-white/40 font-mono text-[8px] tracking-[0.25em] uppercase"
            style={{ x: ribbonSpringX }}
          >
            <motion.div
              className="flex gap-16 shrink-0"
              animate={{ x: ["0%", "-33.33%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {ribbonWords.map((word, idx) => (
                <span key={idx} className="flex items-center gap-16">
                  <span className="hover:text-[#FF4E20] transition-colors duration-300">{word}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E20]/40 shrink-0" />
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// Sub-Component for Interactive Repelling Labels with Custom Glow and Floating Animations
interface FloatingLabelProps {
  item: LabelItem;
  mouseX: any;
  mouseY: any;
  key?: string;
}

function FloatingLabel({ 
  item, 
  mouseX, 
  mouseY 
}: FloatingLabelProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 45, stiffness: 180, mass: 1.1 };
  const offsetX = useSpring(0, springConfig);
  const offsetY = useSpring(0, springConfig);

  // Slow ambient floating offset
  const [ambientX, setAmbientX] = useState(0);
  const [ambientY, setAmbientY] = useState(0);

  useEffect(() => {
    let angle = Math.random() * 360;
    const interval = setInterval(() => {
      angle += 0.02;
      setAmbientX(Math.sin(angle) * 10);
      setAmbientY(Math.cos(angle * 1.2) * 8);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribeX = mouseX.on('change', (latestMouseX: number) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const latestMouseY = mouseY.get();

      // Calculate distance
      const dx = elementCenterX - latestMouseX;
      const dy = elementCenterY - latestMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Repelling Push radius
      const pushRadius = 220;

      if (distance < pushRadius && distance > 5) {
        const force = (pushRadius - distance) / pushRadius;
        const pushX = (dx / distance) * force * 70 * item.speed;
        const pushY = (dy / distance) * force * 70 * item.speed;
        offsetX.set(pushX);
        offsetY.set(pushY);
      } else {
        offsetX.set(0);
        offsetY.set(0);
      }
    });

    return () => {
      unsubscribeX();
    };
  }, [mouseX, mouseY, offsetX, offsetY, item.speed]);

  const IconComponent = {
    Fingerprint,
    Play,
    BookOpen,
    Feather,
    Type,
    Sparkles,
  }[item.iconName];

  return (
    <motion.div
      ref={elementRef}
      className="absolute cursor-default select-none z-10 hidden sm:block"
      style={{
        left: `${item.initialX}%`,
        top: `${item.initialY}%`,
        x: offsetX,
        y: offsetY,
      }}
    >
      <motion.div
        animate={{
          x: ambientX,
          y: ambientY,
        }}
        transition={{ type: 'tween', ease: 'linear' }}
        whileHover={{
          scale: 1.05,
          borderColor: `${item.color}50`,
          backgroundColor: `${item.color}08`,
          boxShadow: `0 8px 32px -4px ${item.color}20`,
        }}
        className="flex items-center gap-3 bg-[#0a0a0ad5] backdrop-blur-md border border-white/10 rounded-xl py-2 px-4 transition-all duration-500 shadow-2xl"
      >
        <div 
          className="p-1.5 rounded-lg flex items-center justify-center shrink-0"
          style={{
            backgroundColor: `${item.color}15`,
            color: item.color,
            boxShadow: `inset 0 0 8px ${item.color}20`
          }}
        >
          {IconComponent && <IconComponent className="w-4 h-4" />}
        </div>
        <div className="flex flex-col items-start text-left">
          <span className="font-mono text-[9px] tracking-widest uppercase text-white font-medium whitespace-nowrap">
            {item.text}
          </span>
          <span className="font-mono text-[7px] text-white/35 uppercase tracking-widest mt-0.5">
            // STUDIO
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
