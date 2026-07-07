import { motion } from 'motion/react';
import { ArrowUpRight, Mail, Star, ChevronRight, Phone, Linkedin } from 'lucide-react';

export default function Contact() {

  const contactRows = [
    {
      id: '01',
      channelName: 'E-POSTA',
      label: 'E-POSTA GÖNDERİN',
      value: 'nezimasm@gmail.com',
      href: 'mailto:nezimasm@gmail.com',
      icon: <Mail className="w-4 h-4 text-[#8B5CF6]" />,
      color: 'rgba(139, 92, 246, 0.08)',
    },
    {
      id: '02',
      channelName: 'LINKEDIN',
      label: 'BAĞLANTI KURUN',
      value: 'Neziha Şimşek',
      href: 'https://www.linkedin.com/in/neziha-%C5%9F-763139294/',
      icon: <Linkedin className="w-4 h-4 text-[#3B82F6]" />,
      color: 'rgba(59, 130, 246, 0.08)',
    },
    {
      id: '03',
      channelName: 'TELEFON',
      label: 'DOĞRUDAN ARAYIN',
      value: '+90 544 724 20 52',
      href: 'tel:+905447242052',
      icon: <Phone className="w-4 h-4 text-[#FF4E20]" />,
      color: 'rgba(255, 78, 32, 0.08)',
    },
  ];

  return (
    <section 
      id="contact" 
      className="relative w-full min-h-screen bg-[#070707] flex flex-col justify-between overflow-hidden py-24 sm:py-32 border-b border-white/5"
    >
      {/* Background atmosphere (soft purple/violet neon accent) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8B5CF6]/[0.015] rounded-full filter blur-3xl pointer-events-none" />

      {/* Subtle background vector lines representing connectivity */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M -100 200 C 400 400, 400 0, 1500 200" 
          fill="none" 
          stroke="white" 
          strokeWidth="1.5"
          animate={{ d: ["M -100 200 C 400 400, 400 0, 1500 200", "M -100 200 C 400 100, 400 300, 1500 200", "M -100 200 C 400 400, 400 0, 1500 200"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />
        <motion.path 
          d="M -100 600 C 500 300, 500 900, 1500 600" 
          fill="none" 
          stroke="white" 
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ d: ["M -100 600 C 500 300, 500 900, 1500 600", "M -100 600 C 500 800, 500 400, 1500 600", "M -100 600 C 500 300, 500 900, 1500 600"] }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
        />
      </svg>

      {/* Large Chapter Number header (05 İletişim) - Positioned with safe absolute top to prevent overlapping */}
      <div className="absolute top-12 left-6 md:left-12 flex items-baseline gap-4 pointer-events-none z-10 select-none">
        <span className="font-serif italic text-6xl md:text-8xl text-white/[0.02] leading-none">05</span>
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#8B5CF6]/50 font-bold">BÖLÜM BEŞ</span>
          <span className="font-serif italic text-xs text-white/20 uppercase tracking-widest">İletişim</span>
        </div>
      </div>

      {/* Main Container stacked vertically to allow perfectly centered layout without column collisions */}
      <div className="max-w-3xl mx-auto w-full px-6 md:px-12 relative z-10 flex flex-col items-center pt-28 pb-12">
        
        {/* Centered Let's Design Together Header */}
        <div className="flex flex-col items-center text-center mb-16 w-full">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#8B5CF6] uppercase font-bold mb-4 flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-ping" />
            BİRLİKTE ÇALIŞALIM
          </span>
          
          <div className="flex flex-col items-center">
            {/* Row 1: LET'S DESIGN (Elegant, clean serif italic) */}
            <div className="overflow-hidden py-1">
              <span className="block font-serif italic text-4xl sm:text-5xl font-light text-white tracking-tight leading-none">
                Let's Design
              </span>
            </div>
            {/* Row 2: TOGETHER (Giant bold uppercase in purple `#8B5CF6`) */}
            <div className="overflow-hidden py-1 -mt-1 sm:-mt-2">
              <span className="block font-display font-black uppercase text-[9vw] sm:text-[6vw] md:text-[5vw] leading-none tracking-tighter text-[#8B5CF6]">
                TOGETHER<span className="text-white font-sans not-italic text-xl ml-1">.</span>
              </span>
            </div>
          </div>

          <p className="font-sans text-xs sm:text-sm text-white/55 leading-relaxed font-light max-w-md mt-5">
            Fikirlerinizi, vizyonunuzu ve projelerinizi akıcı, ödül adayı dijital deneyimlere dönüştürmek için ilk adımı atın.
          </p>
        </div>

        {/* Centered Direct Communication Channels */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-center mb-2">
            <span className="font-mono text-[9px] tracking-[0.35em] text-white/35 uppercase">
              DOĞRUDAN İLETİŞİM KANALLARI
            </span>
          </div>

          <div className="flex flex-col border-y border-white/5 w-full bg-white/[0.01] rounded-2xl overflow-hidden divide-y divide-white/5">
            {contactRows.map((row) => (
              <motion.a
                key={row.id}
                href={row.href}
                target={row.href.startsWith('http') ? '_blank' : undefined}
                rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-6 px-6 overflow-hidden transition-all duration-500 hover:px-8 cursor-pointer gap-4 sm:gap-0"
              >
                {/* Dynamic Row Background Reveal on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: `linear-gradient(90deg, ${row.color} 0%, transparent 100%)`,
                  }}
                />

                <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                  {/* Row Counter Index */}
                  <span className="font-mono text-[10px] tracking-widest text-[#8B5CF6]/50 font-bold">
                    {row.id}
                  </span>

                  {/* Icon & Written Channel Name */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl group-hover:bg-white/[0.05] group-hover:scale-105 transition-all duration-500 text-white shrink-0">
                      {row.icon}
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#8B5CF6] font-bold">
                        {row.channelName}
                      </span>
                      <span className="font-mono text-[8px] tracking-[0.15em] text-white/30 uppercase mt-0.5">
                        {row.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct address/value info aligned to the right or center on mobile */}
                <div className="flex flex-col items-start sm:items-end text-left sm:text-right gap-1 relative z-10 pl-8 sm:pl-0">
                  <span className="font-serif italic text-lg sm:text-xl text-white group-hover:text-[#8B5CF6] transition-colors duration-300 tracking-tight">
                    {row.value}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-500">
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">
                      BAĞLANTIYI AÇ
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>

      {/* CV Download Bar placed ENTIRELY at the bottom of the section */}
      <div className="max-w-3xl mx-auto w-full px-6 md:px-12 mt-8 mb-12 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="relative w-full overflow-hidden rounded-2xl border border-[#8B5CF6]/20 bg-gradient-to-r from-[#8B5CF6]/90 to-[#6D28D9]/95 p-8 shadow-[0_20px_50px_rgba(139,92,246,0.25)] group/cv"
        >
          {/* Abstract decorative vector background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.04] rounded-full filter blur-2xl -mr-20 -mt-20 pointer-events-none group-hover/cv:scale-125 transition-transform duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col text-left gap-1">
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/70 uppercase font-bold">
                PORTFOLYO & ÖZGEÇMİŞ
              </span>
              <h3 className="font-serif italic text-xl text-white font-light tracking-tight">
                Özgeçmişimi İnceleyin
              </h3>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light max-w-sm mt-1">
                Tasarım felsefemi, detaylı iş geçmişimi ve tüm yetkinliklerimi barındıran güncel PDF formatındaki CV'mi indirin.
              </p>
            </div>

            <motion.a
              href="/Neziha_Simsek_CV.pdf"
              download="Neziha_Simsek_CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#8B5CF6] hover:bg-black hover:text-white font-mono text-[10px] tracking-widest uppercase font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(0,0,0,0.15)] shrink-0 self-start md:self-auto cursor-pointer"
            >
              CV'Yİ İNDİR (PDF)
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom Row: Only Copyright (left) and Back to Top (right). No address or location details. */}
      <div className="w-full px-6 md:px-12 border-t border-white/5 pt-10 mt-auto flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10 select-none">
        {/* Simplified Copyright notice (No addresses/locations) */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
          <span className="font-mono text-[9px] tracking-[0.15em] text-white/30 uppercase">
            ©2026 // NEZİHA ŞİMŞEK
          </span>
          <span className="font-sans text-[10px] text-white/50 font-light flex items-center gap-1">
            Her Hakkı Saklıdır <Star className="w-2.5 h-2.5 text-[#8B5CF6] fill-current" /> İstanbul
          </span>
        </div>

        {/* Quick Back to Top Link */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-[9px] tracking-[0.2em] text-white/35 hover:text-[#8B5CF6] hover:translate-y-[-2px] transition-all duration-300 uppercase flex items-center gap-1.5 cursor-pointer"
        >
          Yukarı Dön 
          <ChevronRight className="w-3.5 h-3.5 rotate-[-90deg] text-[#8B5CF6]" />
        </button>
      </div>
    </section>
  );
}
