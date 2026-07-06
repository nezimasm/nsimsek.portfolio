import { motion } from 'motion/react';

export default function Manifesto() {
  const ribbon1 = [
    "MARKA KİMLİĞİ", "MOTION DESIGN", "EDİTORYAL", "TİPOGRAFİ", "ETKİNLİK TASARIMI", "GÖRSEL HİKAYECİLİK"
  ];
  const ribbon2 = [
    "GÖRSEL HİKAYECİLİK", "ETKİNLİK TASARIMI", "TİPOGRAFİ", "EDİTORYAL", "MOTION DESIGN", "MARKA KİMLİĞİ"
  ];

  // Triplicate the array elements to ensure absolute seamless infinite loop without gaps
  const items1 = [...ribbon1, ...ribbon1, ...ribbon1, ...ribbon1];
  const items2 = [...ribbon2, ...ribbon2, ...ribbon2, ...ribbon2];

  return (
    <section 
      id="manifesto" 
      className="relative w-full h-[28vh] min-h-[160px] bg-[#070707] flex flex-col justify-center items-center overflow-hidden border-b border-white/5 select-none"
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />



      {/* TWO Elegant Thin Ribbons (reduced angle, slower speed, thinner) */}
      <div className="relative w-full flex flex-col justify-center items-center gap-5 z-10 scale-105">

        {/* RIBBON 01: Orange background, thin elegance, smooth sliding */}
        <motion.div 
          initial={{ opacity: 0, rotate: -1.2, y: 15 }}
          whileInView={{ opacity: 1, rotate: -1.2, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-[140%] py-1.5 bg-[#FF4E20] flex items-center overflow-hidden rotate-[-1.2deg] shadow-[0_8px_20px_rgba(255,78,32,0.12)] relative"
        >
          <motion.div 
            className="flex whitespace-nowrap gap-16 text-black font-mono text-[8px] font-black tracking-[0.25em] uppercase"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: "linear"
            }}
          >
            {items1.map((text, idx) => (
              <span key={idx} className="flex items-center gap-16">
                <span>{text}</span>
                <span className="w-1 h-1 bg-white rounded-full shrink-0" />
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIBBON 02: Crisp dark ribbon with custom glow outlines, sliding reverse */}
        <motion.div 
          initial={{ opacity: 0, rotate: 1.0, y: -10 }}
          whileInView={{ opacity: 1, rotate: 1.0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="w-[140%] py-1.5 bg-white/[0.015] border-y border-white/5 flex items-center overflow-hidden rotate-[1.0deg] relative"
        >
          <motion.div 
            className="flex whitespace-nowrap gap-16 text-white/45 font-mono text-[8px] tracking-[0.3em] uppercase"
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: "linear"
            }}
          >
            {items2.map((text, idx) => (
              <span key={idx} className="flex items-center gap-16">
                <span className="hover:text-white transition-colors duration-300">{text}</span>
                <span className="w-1 h-1 bg-[#FF4E20] rounded-full shrink-0" />
              </span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
