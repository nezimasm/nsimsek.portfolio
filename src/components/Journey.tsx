import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useMotionValueEvent } from 'motion/react';
import { GraduationCap, Briefcase, Users, Calendar, ArrowDown } from 'lucide-react';

interface JourneyItem {
  id: string;
  type: 'education' | 'internship' | 'club';
  title: string;
  organization: string;
  period: string;
  description: string;
  details: string;
  skills: string[];
}

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Scroll timeline progress line binding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Mouse vertical tracking within the section
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const lineProgress = useMotionValue(0);
  const smoothProgress = useSpring(lineProgress, { stiffness: 100, damping: 25 });

  // Update lineProgress with scroll progress when mouse is not over it
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isHoveringSection) {
      lineProgress.set(latest);
    }
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsHoveringSection(true);
    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(1, relativeY / rect.height));
    lineProgress.set(percentage);
  };

  const handleMouseLeave = () => {
    setIsHoveringSection(false);
    lineProgress.set(scrollYProgress.get());
  };

  // Calculate timeline height and illumination based on smooth progress
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const journeyData: JourneyItem[] = [
    {
      id: 'yildiz-edu',
      type: 'education',
      title: 'İletişim Tasarımı Bölümü',
      organization: 'Yıldız Teknik Üniversitesi',
      period: '2022-2026',
      description: 'Görsel iletişimden kullanıcı deneyimine, tipografiden hareketli grafiklere uzanan disiplinler arası bir tasarım eğitimi aldım. Eğitim sürecim boyunca hem dijital hem de basılı mecralar için araştırma temelli projeler geliştirdim.',
      details: 'Üniversite sürecinde tasarımı yalnızca estetik bir çıktı olarak değil; araştırma, problem çözme ve deneyim tasarlama süreci olarak ele aldım. Farklı disiplinlerde geliştirdiğim projeler, bugün benimsediğim tasarım yaklaşımının temelini oluşturdu.',
      skills: ['İletişim Tasarımı', 'Tipografi', 'Kullanıcı Deneyimi']
    },
    {
      id: 'architecht-intern',
      type: 'internship',
      title: 'Experience Designer Intern',
      organization: 'Architecht',
      period: '2025-2026\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A01 yıl 2 ay',
      description: 'Çalışan deneyimi odaklı projelerde organizasyonel tasarım, etkinlik kimliği, iç iletişim ve dijital içerik üretimi üzerine çalıştım. Kurum kültürünü destekleyen görsel sistemler, sosyal medya içerikleri ve deneyim odaklı tasarımlar geliştirdim.',
      details: 'Staj sürecimde kurumsal etkinlik kimlikleri, organizasyon tasarımları, iç iletişim uygulamaları ve sosyal medya içerikleri için görsel tasarımlar ile motion video çalışmaları ürettim. Farklı ekiplerle birlikte çalışarak fikir geliştirme, tasarım süreçleri ve uygulama aşamalarında aktif rol aldım.',
      skills: ['Çalışan Deneyimi', 'Kurumsal İletişim', 'Motion Video']
    },
    {
      id: 'icerik-bulutu-intern',
      type: 'internship',
      title: 'İçerik Öncesi Operasyon Intern',
      organization: 'İçerik Bulutu',
      period: '6 ay',
      description: 'SEO odaklı içerik üretim süreçlerine destek vererek anahtar kelime araştırması, içerik planlama ve yapay zeka destekli blog yazımı çalışmalarında görev aldım. Dijital içeriklerin arama motoru görünürlüğünü artırmaya yönelik süreçlere katkı sağladım.',
      details: 'Staj sürecimde SEO uyumlu blog içerikleri için anahtar kelime analizi, rakip araştırması, iç bağlantı (internal linking) planlaması ve yapay zeka destekli içerik üretimi süreçlerinde aktif rol aldım. İçeriklerin yayın öncesi kalite kontrolünü destekleyerek arama motoru optimizasyonu odaklı çalışmalara katkıda bulundum.',
      skills: ['SEO', 'Anahtar Kelime Araştırması', 'Blog Yazımı']
    },
    {
      id: 'onder-kilavuz',
      type: 'club',
      title: 'Kılavuz Gemisi Liderlik Programı Katılımcısı',
      organization: 'Önder İmam-Hatipliler Derneği',
      period: '2022-2024',
      description: 'Medya, liderlik ve kişisel gelişim odaklı iki yıllık eğitim programını başarıyla tamamladım. Program kapsamında sektör profesyonelleriyle bir araya gelerek medya ve iletişim alanındaki farklı çalışma kültürlerini yakından gözlemleme fırsatı buldum.',
      details: 'Program süresince medya biriminde aktif olarak yer aldım. TRT 2, Albayrak Medya ve çeşitli ajanslara düzenlenen ofis ziyaretlerine katılarak sektör profesyonelleriyle buluştum. Düzenli kitap okuma programları, haftalık görevler ve gelişim odaklı eğitim süreçlerini tamamlayarak iki yıllık programdan mezun oldum.',
      skills: ['Liderlik', 'Medya', 'Kişisel Gelişim']
    },
    {
      id: 'onder-medya',
      type: 'club',
      title: 'Medya Ekibi / Etkinlik Fotoğrafçısı',
      organization: 'Önder İmam-Hatipliler Derneği / Önder Genç',
      period: '2024-2025',
      description: 'Dernek bünyesinde düzenlenen konferanslar, eğitimler ve sosyal etkinliklerde fotoğraf çekimleri gerçekleştirerek organizasyonların görsel arşivinin oluşturulmasına katkı sağladım.',
      details: 'Bir yıl boyunca medya ekibinde görev alarak konferanslar, seminerler ve çeşitli organizasyonlarda etkinlik fotoğrafçılığı yaptım. Programların atmosferini ve katılımcı deneyimini yansıtan kareler üreterek kurumun dijital arşiv ve sosyal medya içeriklerinde kullanılan görsel dokümantasyonu oluşturdum.',
      skills: ['Fotoğrafçılık', 'Medya', 'Görsel Arşiv']
    },
    {
      id: 'school-clubs',
      type: 'club',
      title: '',
      organization: 'YTÜ Kulüp Deneyimleri (Gönüllü)',
      period: '2022-2026',
      description: 'Üniversite yıllarım boyunca farklı öğrenci kulüplerinde grafik tasarım, sosyal medya ve organizasyon süreçlerinde aktif görev alarak etkinliklerin görsel iletişimine katkı sağladım.',
      details: 'YTÜ Veri Bilimi Topluluğu — Social Media Coordinator, Graphic Designer\nYTÜ GATO (Gastronomi Topluluğu) — Graphic Design Coordinator, Graphic Designer\nYTÜ Gıda Kulübü — Graphic Design Manager, Graphic Designer\n\nKulüpler bünyesinde etkinlik afişleri, sosyal medya içerikleri, kurumsal görseller ve organizasyon tasarımları üreterek ekiplerin görsel iletişim süreçlerini destekledim.',
      skills: ['Topluluk Yönetimi', 'Tasarım Koordinasyonu', 'Görsel İletişim']
    },
    {
      id: 'independent-exp',
      type: 'club',
      title: '',
      organization: 'Bağımsız Deneyimler',
      period: '',
      description: 'Üniversite eğitiminin yanında farklı platformlar ve yayınlarda bağımsız tasarım projeleri üreterek görsel iletişim, dijital içerik ve yayın tasarımı alanlarında deneyim kazandım.',
      details: 'zBurada\nGraphic Designer\nEtkinlik afişleri, sosyal medya içerikleri ve dijital görseller tasarlayarak platformun görsel iletişim süreçlerine katkı sağladım.\n\nGürbüz Dergisi\nGraphic Designer (Freelance)\nDergi tasarımı, sayfa düzeni ve basılı yayın süreçlerinde grafik tasarım desteği sağlayarak editoryal içeriklerin görsel kimliğini oluşturdum.',
      skills: ['Yayın Tasarımı', 'Freelance', 'Dijital İçerik']
    },
    {
      id: 'kaligrafi-egitmenligi',
      type: 'education',
      title: 'Kaligrafi Eğitmeni',
      organization: 'İlim Yayma Cemiyeti',
      period: '1 yıl',
      description: 'Cemiyet bünyesinde düzenlenen atölyelerde katılımcılara kaligrafi sanatı, harf estetiği ve el yazısı tasarımı konularında dersler verdim.',
      details: 'İlim Yayma Cemiyeti bünyesinde 1 yıl kaligrafi dersleri vererek gençlerin ve yetişkinlerin estetik harf tasarımı ve kaligrafi tekniklerinde gelişmesine katkı sağladım. Dönem boyunca teorik anlatımlar ve pratik yazı alıştırmalarıyla zenginleştirilmiş atölye süreçlerini yönettim.',
      skills: ['Kaligrafi', 'Eğitmenlik', 'Harf Tasarımı']
    }
  ];

  // Map icon types
  const getIcon = (type: string, active: boolean) => {
    const iconColor = active ? 'text-[#FF4E20]' : 'text-white/40';
    switch (type) {
      case 'education':
        return <GraduationCap className={`w-4 h-4 ${iconColor} transition-colors duration-500`} />;
      case 'internship':
        return <Briefcase className={`w-4 h-4 ${iconColor} transition-colors duration-500`} />;
      case 'club':
        return <Users className={`w-4 h-4 ${iconColor} transition-colors duration-500`} />;
      default:
        return <Briefcase className={`w-4 h-4 ${iconColor} transition-colors duration-500`} />;
    }
  };

  return (
    <section 
      ref={containerRef}
      id="journey" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-[#070707] py-32 flex flex-col justify-center overflow-hidden border-b border-white/5"
    >
      {/* Background radial atmosphere (soft orange neon) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF4E20]/[0.015] rounded-full filter blur-3xl pointer-events-none" />

      {/* Large Chapter Number header (02 Yolculuğum) */}
      <div className="absolute top-24 left-6 md:left-12 flex items-baseline gap-5 pointer-events-none z-10 select-none">
        <span className="font-serif italic text-7xl md:text-[9rem] text-white/[0.025] leading-none">02</span>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#FF4E20]/60 font-bold">BÖLÜM İKİ</span>
          <span className="font-serif italic text-sm md:text-base text-white/30 uppercase tracking-widest">Yolculuğum</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 md:px-12 relative z-10">
        
        {/* Section Header styled in matching Creative/Designer format */}
        <div className="flex flex-col items-center text-center mb-32 relative">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#FF4E20] uppercase font-bold mb-4">
            KRONOLOJİ & DENEYİM
          </span>
          <div className="flex flex-col items-center">
            {/* Row 1: DENEYİM (Solid white font-display) */}
            <div className="overflow-hidden py-1">
              <span className="block font-display font-black uppercase text-[8vw] sm:text-[6vw] md:text-[5vw] leading-none tracking-tighter text-white">
                DENEYİM
              </span>
            </div>
            {/* Row 2: Yolculuğum (Elegant Serif Italic, overlapping slightly) */}
            <div className="overflow-hidden py-1 -mt-2 sm:-mt-3">
              <span className="block font-serif italic text-[7vw] sm:text-[5vw] md:text-[4vw] leading-none text-white font-light tracking-tight">
                Yolculuğum<span className="text-[#FF4E20] font-sans not-italic text-2xl ml-1">.</span>
              </span>
            </div>
          </div>
          <div className="w-8 h-[1px] bg-white/20 mt-8" />
        </div>

        {/* Dynamic Timeline Wrapper */}
        <div className="relative pl-8 md:pl-0 flex flex-col gap-y-16">
          
          {/* Animated vertical centerline (desktop only) or side timeline (mobile) */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/5 -translate-x-[1px]">
            {/* The active scroll-reactive light beam line */}
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-[#FF4E20] origin-top rounded-full shadow-[0_0_12px_#FF4E20]"
              style={{ height: lineHeight }}
            />
            {/* Real-time glowing orange dot that tracks the tip of the active timeline progress */}
            <motion.div 
              className="absolute w-[12px] h-[12px] -left-[5px] -translate-y-1/2 rounded-full bg-[#FF4E20] shadow-[0_0_15px_#FF4E20] z-20 border-2 border-[#070707]"
              style={{ top: lineHeight }}
            />
          </div>

          {/* Chronological items mapping */}
          {journeyData.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            const isHovered = hoveredIndex === idx;

            return (
              <div 
                key={event.id}
                className="relative grid grid-cols-1 md:grid-cols-2 items-start w-full gap-8 md:gap-0"
              >
                {/* Visual Timeline Connector Dot */}
                <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-20">
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-[#070707] border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: isHovered ? '#FF4E20' : 'rgba(255,255,255,0.12)',
                      boxShadow: isHovered ? '0 0 15px rgba(255, 78, 32, 0.4)' : 'none'
                    }}
                  >
                    <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-[#FF4E20]' : 'bg-white/20'} transition-colors duration-300`} />
                  </motion.div>
                </div>

                {/* Left Card Area */}
                <div className="w-full flex justify-end">
                  {isLeft ? (
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        y: -8,
                      }}
                      onHoverStart={() => setHoveredIndex(idx)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      className={`group w-full max-w-[420px] p-6 sm:p-8 bg-white/[0.015] hover:bg-[#FF4E20]/[0.02] border border-white/5 hover:border-[#FF4E20]/30 rounded-2xl cursor-default transition-all duration-500 flex flex-col justify-between md:mr-12 ${
                        isHovered ? 'shadow-[0_15px_40px_rgba(255,78,32,0.08)] bg-[#FF4E20]/[0.02]' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="p-2.5 bg-white/[0.03] rounded-xl border border-white/5 group-hover:bg-[#FF4E20]/10 group-hover:border-[#FF4E20]/15 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0">
                          {getIcon(event.type, isHovered)}
                        </div>
                        {event.period && (
                          <span className="font-mono text-[9px] text-white/30 group-hover:text-white/60 tracking-wider flex items-center gap-1 transition-colors duration-300">
                            <Calendar className="w-3 h-3 text-white/20" />
                            {event.period}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-xl text-white group-hover:text-[#FF4E20] transition-colors duration-500 leading-tight">
                        {event.organization}
                      </h3>
                      {event.title && (
                        <p className="font-mono text-[10px] text-white/40 tracking-wider mt-1 uppercase mb-4">
                          {event.title}
                        </p>
                      )}

                      <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                        <p className="font-sans text-xs text-white/55 group-hover:text-white/85 leading-relaxed font-light transition-colors duration-500">
                          {event.description}
                        </p>

                        {/* Interactive Expandable Segment */}
                        <AnimatePresence initial={false}>
                          {isHovered && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden bg-[#FF4E20]/[0.03] border-l-2 border-[#FF4E20] p-3 rounded-r-lg mt-1"
                            >
                              <p className="font-sans text-[11px] text-white/75 leading-relaxed font-light whitespace-pre-line">
                                {event.details}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {event.skills.map(skill => (
                            <span key={skill} className="font-mono text-[8px] uppercase tracking-wider bg-white/5 group-hover:bg-[#FF4E20]/10 text-white/40 group-hover:text-[#FF4E20]/80 px-2 py-0.5 rounded transition-all duration-500">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="hidden md:block w-full max-w-[420px] md:mr-12" />
                  )}
                </div>

                {/* Right Card Area */}
                <div className="w-full flex justify-start">
                  {!isLeft ? (
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        y: -8,
                      }}
                      onHoverStart={() => setHoveredIndex(idx)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      className={`group w-full max-w-[420px] p-6 sm:p-8 bg-white/[0.015] hover:bg-[#FF4E20]/[0.02] border border-white/5 hover:border-[#FF4E20]/30 rounded-2xl cursor-default transition-all duration-500 flex flex-col justify-between md:ml-12 ${
                        isHovered ? 'shadow-[0_15px_40px_rgba(255,78,32,0.08)] bg-[#FF4E20]/[0.02]' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="p-2.5 bg-white/[0.03] rounded-xl border border-white/5 group-hover:bg-[#FF4E20]/10 group-hover:border-[#FF4E20]/15 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0">
                          {getIcon(event.type, isHovered)}
                        </div>
                        {event.period && (
                          <span className="font-mono text-[9px] text-white/30 group-hover:text-white/60 tracking-wider flex items-center gap-1 transition-colors duration-300">
                            <Calendar className="w-3 h-3 text-white/20" />
                            {event.period}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-xl text-white group-hover:text-[#FF4E20] transition-colors duration-500 leading-tight">
                        {event.organization}
                      </h3>
                      {event.title && (
                        <p className="font-mono text-[10px] text-white/40 tracking-wider mt-1 uppercase mb-4">
                          {event.title}
                        </p>
                      )}

                      <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                        <p className="font-sans text-xs text-white/55 group-hover:text-white/85 leading-relaxed font-light transition-colors duration-500">
                          {event.description}
                        </p>

                        {/* Interactive Expandable Segment */}
                        <AnimatePresence initial={false}>
                          {isHovered && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden bg-[#FF4E20]/[0.03] border-l-2 border-[#FF4E20] p-3 rounded-r-lg mt-1"
                            >
                              <p className="font-sans text-[11px] text-white/75 leading-relaxed font-light whitespace-pre-line">
                                {event.details}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {event.skills.map(skill => (
                            <span key={skill} className="font-mono text-[8px] uppercase tracking-wider bg-white/5 group-hover:bg-[#FF4E20]/10 text-white/40 group-hover:text-[#FF4E20]/80 px-2 py-0.5 rounded transition-all duration-500">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="hidden md:block w-full max-w-[420px] md:ml-12" />
                  )}
                </div>
              </div>
            );
          })}

        </div>

        {/* Simple Scroll Instruction */}
        <div className="flex justify-center items-center gap-3 mt-24 opacity-30 hover:opacity-100 transition-opacity duration-500 font-mono text-[9px] tracking-[0.25em] uppercase text-white/60">
          <span>Çalışmaları Görüntülemek İçin Kaydırın</span>
          <ArrowDown className="w-3 h-3 text-[#FF4E20] animate-bounce" />
        </div>

      </div>
    </section>
  );
}
