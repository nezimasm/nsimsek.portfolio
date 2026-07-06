import React, { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, QrCode, ArrowRight, Volume2, Music, Maximize2, RotateCcw, Film, Cpu } from 'lucide-react';

// Simulated QR Code vector representation matching the uploaded blue high-quality QR code
function YapayZekaDegerlerQR({ className = "w-44 h-44" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 25 25" 
      className={`${className} text-[#2E5BFF] transition-all duration-500 hover:text-[#00F0FF]`}
      fill="currentColor"
    >
      {/* 3 Main Finder Patterns */}
      {/* Top-Left */}
      <path d="M0,0 h7 v7 h-7 z M1,1 h5 v5 h-5 z" fillRule="evenodd" />
      <rect x="2" y="2" width="3" height="3" />

      {/* Top-Right */}
      <path d="M18,0 h7 v7 h-7 z M19,1 h5 v5 h-5 z" fillRule="evenodd" />
      <rect x="20" y="2" width="3" height="3" />

      {/* Bottom-Left */}
      <path d="M0,18 h7 v7 h-7 z M1,19 h5 v5 h-5 z" fillRule="evenodd" />
      <rect x="2" y="20" width="3" height="3" />

      {/* Alignment Pattern at Bottom-Right */}
      <path d="M16,16 h5 v5 h-5 z M17,17 h3 v3 h-3 z" fillRule="evenodd" />
      <rect x="18" y="18" width="1" height="1" />

      {/* Custom realistic QR module data matching the uploaded image */}
      <rect x="8" y="2" width="1" height="1" />
      <rect x="8" y="4" width="1" height="1" />
      <rect x="8" y="6" width="1" height="1" />
      <rect x="2" y="8" width="1" height="1" />
      <rect x="4" y="8" width="1" height="1" />
      <rect x="6" y="8" width="1" height="1" />

      <rect x="0" y="9" width="1" height="2" />
      <rect x="0" y="13" width="1" height="1" />
      <rect x="0" y="15" width="1" height="1" />
      
      <rect x="1" y="8" width="1" height="1" />
      <rect x="1" y="10" width="1" height="1" />
      <rect x="1" y="12" width="1" height="2" />
      <rect x="1" y="16" width="1" height="1" />
      
      <rect x="2" y="9" width="1" height="1" />
      <rect x="2" y="11" width="1" height="1" />
      <rect x="2" y="14" width="1" height="2" />

      <rect x="3" y="8" width="1" height="1" />
      <rect x="3" y="10" width="1" height="2" />
      <rect x="3" y="13" width="1" height="1" />
      <rect x="3" y="15" width="1" height="2" />

      <rect x="4" y="9" width="1" height="1" />
      <rect x="4" y="11" width="1" height="1" />
      <rect x="4" y="12" width="1" height="2" />
      <rect x="4" y="16" width="1" height="1" />

      <rect x="5" y="8" width="1" height="1" />
      <rect x="5" y="10" width="1" height="1" />
      <rect x="5" y="13" width="1" height="1" />
      <rect x="5" y="15" width="1" height="1" />

      <rect x="6" y="9" width="1" height="2" />
      <rect x="6" y="12" width="1" height="1" />
      <rect x="6" y="14" width="1" height="2" />

      <rect x="7" y="8" width="1" height="1" />
      <rect x="7" y="10" width="1" height="3" />
      <rect x="7" y="14" width="1" height="1" />
      <rect x="7" y="16" width="1" height="2" />
      <rect x="7" y="21" width="1" height="1" />
      <rect x="7" y="23" width="1" height="2" />

      <rect x="8" y="0" width="1" height="1" />
      <rect x="8" y="2" width="1" height="1" />
      <rect x="8" y="4" width="1" height="2" />
      <rect x="8" y="8" width="1" height="2" />
      <rect x="8" y="11" width="1" height="1" />
      <rect x="8" y="13" width="1" height="2" />
      <rect x="8" y="17" width="1" height="2" />
      <rect x="8" y="20" width="1" height="1" />
      <rect x="8" y="22" width="1" height="2" />

      <rect x="9" y="1" width="1" height="2" />
      <rect x="9" y="4" width="1" height="1" />
      <rect x="9" y="6" width="1" height="2" />
      <rect x="9" y="9" width="1" height="1" />
      <rect x="9" y="11" width="1" height="2" />
      <rect x="9" y="15" width="1" height="2" />
      <rect x="9" y="18" width="1" height="1" />
      <rect x="9" y="21" width="1" height="1" />
      <rect x="9" y="23" width="1" height="1" />

      <rect x="10" y="0" width="1" height="1" />
      <rect x="10" y="3" width="1" height="2" />
      <rect x="10" y="7" width="1" height="1" />
      <rect x="10" y="9" width="1" height="2" />
      <rect x="10" y="12" width="1" height="1" />
      <rect x="10" y="14" width="1" height="2" />
      <rect x="10" y="18" width="1" height="2" />
      <rect x="10" y="21" width="1" height="2" />
      <rect x="10" y="24" width="1" height="1" />

      <rect x="11" y="2" width="1" height="2" />
      <rect x="11" y="5" width="1" height="1" />
      <rect x="11" y="8" width="1" height="1" />
      <rect x="11" y="10" width="1" height="2" />
      <rect x="11" y="13" width="1" height="2" />
      <rect x="11" y="16" width="1" height="1" />
      <rect x="11" y="19" width="1" height="2" />
      <rect x="11" y="22" width="1" height="1" />

      <rect x="12" y="0" width="1" height="2" />
      <rect x="12" y="3" width="1" height="1" />
      <rect x="12" y="6" width="1" height="2" />
      <rect x="12" y="9" width="1" height="3" />
      <rect x="12" y="14" width="1" height="1" />
      <rect x="12" y="16" width="1" height="2" />
      <rect x="12" y="20" width="1" height="1" />
      <rect x="12" y="22" width="1" height="2" />

      <rect x="13" y="1" width="1" height="1" />
      <rect x="13" y="4" width="1" height="2" />
      <rect x="13" y="8" width="1" height="1" />
      <rect x="13" y="10" width="1" height="2" />
      <rect x="13" y="13" width="1" height="1" />
      <rect x="13" y="15" width="1" height="3" />
      <rect x="13" y="19" width="1" height="1" />
      <rect x="13" y="21" width="1" height="2" />

      <rect x="14" y="0" width="1" height="2" />
      <rect x="14" y="3" width="1" height="1" />
      <rect x="14" y="5" width="1" height="2" />
      <rect x="14" y="9" width="1" height="2" />
      <rect x="14" y="12" width="1" height="2" />
      <rect x="14" y="16" width="1" height="2" />
      <rect x="14" y="20" width="1" height="1" />
      <rect x="14" y="23" width="1" height="1" />

      <rect x="15" y="8" width="1" height="1" />
      <rect x="15" y="10" width="1" height="2" />
      <rect x="15" y="13" width="1" height="1" />
      <rect x="15" y="15" width="1" height="2" />
      <rect x="15" y="19" width="1" height="1" />
      <rect x="15" y="22" width="1" height="2" />

      <rect x="16" y="9" width="1" height="2" />
      <rect x="16" y="12" width="1" height="1" />
      <rect x="16" y="14" width="1" height="1" />
      <rect x="16" y="22" width="1" height="1" />
      <rect x="16" y="24" width="1" height="1" />

      <rect x="17" y="8" width="1" height="1" />
      <rect x="17" y="11" width="1" height="1" />
      <rect x="17" y="13" width="1" height="2" />
      <rect x="17" y="21" width="1" height="2" />

      <rect x="18" y="8" width="1" height="2" />
      <rect x="18" y="11" width="1" height="2" />
      <rect x="18" y="14" width="1" height="1" />
      <rect x="18" y="22" width="1" height="2" />

      <rect x="19" y="9" width="1" height="1" />
      <rect x="19" y="12" width="1" height="1" />
      <rect x="19" y="15" width="1" height="2" />
      <rect x="19" y="21" width="1" height="1" />
      <rect x="19" y="23" width="1" height="1" />

      <rect x="20" y="8" width="1" height="1" />
      <rect x="20" y="10" width="1" height="2" />
      <rect x="20" y="13" width="1" height="1" />
      <rect x="20" y="24" width="1" height="1" />

      <rect x="21" y="9" width="1" height="2" />
      <rect x="21" y="12" width="1" height="2" />
      <rect x="21" y="21" width="1" height="3" />

      <rect x="22" y="8" width="1" height="1" />
      <rect x="22" y="11" width="1" height="1" />
      <rect x="22" y="14" width="1" height="1" />
      <rect x="22" y="22" width="1" height="2" />

      <rect x="23" y="9" width="1" height="1" />
      <rect x="23" y="12" width="1" height="2" />
      <rect x="23" y="23" width="1" height="1" />

      <rect x="24" y="8" width="1" height="2" />
      <rect x="24" y="11" width="1" height="1" />
      <rect x="24" y="13" width="1" height="2" />
      <rect x="24" y="21" width="1" height="2" />
    </svg>
  );
}

export default function FeaturedProject() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [progress, setProgress] = useState(35); // Initial play progress percentage
  const [volume, setVolume] = useState(80);
  const posterRef = useRef<HTMLDivElement>(null);

  const project = {
    title: 'Değerler Karakterleri',
    category: 'YAPAY ZEKA VİDEO PROJESİ',
    year: 'YAPAY ZEKA FİLMİ',
    location: '2026 // AI CREATION',
    description: 'Architecht kurum kültürü ve temel marka değerlerini temsil eden karakterlerin, gelişmiş üretken yapay zeka jeneratif video araçları ve dijital kompozisyon teknikleriyle hayata geçirildiği özgün görsel dünya çalışması.',
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!posterRef.current) return;
    const rect = posterRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Sound visualization bars when playing
  const barsCount = 32;

  return (
    <section 
      id="featured" 
      className="relative w-full min-h-screen bg-[#070707] flex flex-col justify-center overflow-hidden border-b border-white/5 py-32"
    >
      {/* Background atmosphere (soft electric blue neon) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2E5BFF]/[0.015] rounded-full filter blur-3xl pointer-events-none" />

      {/* Large Chapter Number header (04 AI Video) */}
      <div className="absolute top-24 left-6 md:left-12 flex items-baseline gap-5 pointer-events-none z-10 select-none">
        <span className="font-serif italic text-7xl md:text-[9rem] text-white/[0.025] leading-none">04</span>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#2E5BFF]/60 font-bold">BÖLÜM DÖRT</span>
          <span className="font-serif italic text-sm md:text-base text-white/30 uppercase tracking-widest">Yapay Zeka Videosu</span>
        </div>
      </div>

      {/* Animated subtle background floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <motion.div 
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#2E5BFF] filter blur-[1px]"
        />
        <motion.div 
          animate={{
            y: [20, -20, 20],
            x: [15, -15, 15],
          }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full bg-[#00F0FF] filter blur-[1px]"
        />
      </div>

      {/* Centered Section Header to match Bölüm 2 and Bölüm 3 */}
      <div className="max-w-5xl mx-auto w-full px-6 md:px-12 relative z-10 mb-20">
        <div className="flex flex-col items-center text-center relative">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#2E5BFF] uppercase font-bold mb-4">
            VİDEO & SİNEMATİK ANLATI
          </span>
          <div className="flex flex-col items-center">
            {/* Row 1: SİNEMATİK (Solid white font-display) */}
            <div className="overflow-hidden py-1">
              <span className="block font-display font-black uppercase text-[8vw] sm:text-[6vw] md:text-[5vw] leading-none tracking-tighter text-white">
                SİNEMATİK
              </span>
            </div>
            {/* Row 2: Yapay Zeka Videosu (Elegant Serif Italic, overlapping slightly) */}
            <div className="overflow-hidden py-1 -mt-2 sm:-mt-3">
              <span className="block font-serif italic text-[7vw] sm:text-[5vw] md:text-[4vw] leading-none text-white font-light tracking-tight">
                Yapay Zeka Videosu<span className="text-[#2E5BFF] font-sans not-italic text-2xl ml-1">.</span>
              </span>
            </div>
          </div>
          <div className="w-8 h-[1px] bg-white/20 mt-8" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Gorgeous QR Code Placeholder Space */}
        <div className="lg:col-span-5 flex flex-col items-center w-full">

          <div className="relative group flex justify-center items-center w-full">
            {/* Outer glowing design border */}
            <div className="absolute -inset-4 border border-white/5 rounded-3xl pointer-events-none group-hover:border-[#2E5BFF]/25 transition-all duration-700" />

            {/* Clean High-Tech Placeholder Screen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square w-full max-w-[380px] bg-[#0a0a0f]/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.98)] border border-white/10 flex flex-col items-center justify-center p-8 transition-all duration-500 hover:border-[#2E5BFF]/30"
            >
              {/* Tech Corner brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 group-hover:border-[#2E5BFF]/60 transition-colors duration-500" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20 group-hover:border-[#2E5BFF]/60 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20 group-hover:border-[#2E5BFF]/60 transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-[#2E5BFF]/60 transition-colors duration-500" />

              {/* Grid Background */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Simulated QR Code placeholder illustration */}
              <div className="relative p-6 bg-white/[0.02] border border-white/10 group-hover:border-[#2E5BFF]/30 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl">
                <YapayZekaDegerlerQR className="w-44 h-44" />
                
                {/* Scan Laser beam */}
                <motion.div 
                  className="absolute left-6 right-6 h-[2.5px] bg-[#2E5BFF] shadow-[0_0_15px_#2E5BFF]"
                  animate={{ top: ['24px', '200px', '24px'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                />
              </div>

              {/* Badge indicating QR code area */}
              <div className="mt-6 flex flex-col items-center text-center gap-1.5">
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#2E5BFF] font-bold uppercase">
                  YAPAY ZEKA DEĞERLER VİDEOSU
                </span>
                <span className="font-sans text-[10px] text-white/50">
                  Videoyu izlemek için kameranız ile okutun
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Editorial Information */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left relative z-10 pl-0 lg:pl-6">
          
          {/* Project Title */}
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-tight leading-tight mb-6">
            Değerler Karakterleri
          </h3>

          {/* Single clean Narrative description (No duplication) */}
          <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light mb-8 max-w-xl">
            Architecht'in kurum değerlerini temsil eden karakterleri; tarih, teknoloji ve sinematik anlatıyı bir araya getiren özgün bir yapay zekâ hikâyesine dönüştürdüm. Her sahne, farklı bir karakteri ve onun temsil ettiği değeri çağdaş bir görsel dille yeniden yorumlayacak şekilde tasarlandı. Karakterlerin bu yolculuğuna eşlik etmek ve filmin tamamını izlemek için yan taraftaki QR kodunu okutabilirsiniz.
          </p>

          <div className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">
              %100 YAPAY ZEKA // GEN-AI YOLCULUĞU
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
