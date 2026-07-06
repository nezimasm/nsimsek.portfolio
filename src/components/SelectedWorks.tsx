import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Fingerprint, Compass, Share2, Activity, Smartphone, Sparkles, 
  ArrowRight, Plus, Minus, ExternalLink, Calendar, User, Tag,
  Camera, BookOpen, Package, Layers
} from 'lucide-react';

interface ProjectRow {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  details: {
    client: string;
    year: string;
    role: string;
    problem: string;
    solution: string;
    outcomes: string[];
  };
}

interface SelectedWorksProps {
  onCategorySelect?: (id: string) => void;
}

export default function SelectedWorks({ onCategorySelect }: SelectedWorksProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const rows: ProjectRow[] = [
    {
      id: 'organizational',
      num: '01',
      title: 'Organizasyonel Tasarım',
      description: 'Etkinlik deneyimini güçlendiren kurumsal kimlik, mekan tasarımı ve organizasyon odaklı görsel çözümler.',
      icon: <Layers className="w-8 h-8 transition-all duration-500" />,
      color: '#00F0FF', // Cyan
      details: {
        client: 'Architecht',
        year: '2025-2026',
        role: 'Organizasyon Mimarı',
        problem: 'Geniş toplulukların etkinlik ve eğitim süreçlerinde yaşanan koordinasyon ve veri paylaşım karmaşası.',
        solution: 'Özelleştirilmiş roller, zaman çizelgeleri ve akış diagramları tasarlayarak süreçleri optimize ettik.',
        outcomes: ['30+ Aktif Koordinasyon Şablonu', 'Gelişmiş Ekip Rol Dağılım Matrisi', '%40 Daha Hızlı Süreç Yönetimi']
      }
    },
    {
      id: 'social-media',
      num: '02',
      title: 'Sosyal Medya',
      description: 'Sosyal medya iletişimini güçlendiren görsel kimlikler, hareketli içerikler ve yaratıcı kampanya tasarımları.',
      icon: <Share2 className="w-8 h-8 transition-all duration-500" />,
      color: '#FF4E20', // Orange
      details: {
        client: 'Kreatif Sosyal Girişimi',
        year: '2025',
        role: 'Sanat Yönetmeni',
        problem: 'Sosyal medya kanallarında özgünlüğü yitirmeden hızlı üretilebilir ve yüksek etkileşimli bir görsel dil kurmak.',
        solution: 'Tipografik vurguları ve dinamik negatif alanları öne çıkaran 12 modüllü hareketli video şablon seti geliştirdik.',
        outcomes: ['%120 Organik Takipçi Artışı', 'Estetik Bütünlük Sunan Sosyal Grid', '20+ Özelleştirilebilir Şablon Seti']
      }
    },
    {
      id: 'photography',
      num: '03',
      title: 'Fotoroman',
      description: 'Kurgu, karakter ve tipografiyi bir araya getiren beş farklı fotoroman çalışması.',
      icon: <Camera className="w-8 h-8 transition-all duration-500" />,
      color: '#10B981', // Emerald
      details: {
        client: 'Bağımsız Sanat Sergisi',
        year: '2024',
        role: 'Görsel Tasarımcı',
        problem: 'Dijital sergilerde ve fiziki basılı alanlarda ışık-gölge dengesini dramatik şekilde hissettirecek bir portre serisi.',
        solution: 'Yüksek kontrastlı monokrom çekimler and dijital noise katmanlarıyla deneysel bir kompozisyon dili yarattık.',
        outcomes: ['12+ Özgün Fotoğraf Serisi', 'Yüksek Baskı Kalitesinde Monokrom Eserler', 'Sanat Platformlarında Editör Seçkisi']
      }
    },
    {
      id: 'magazine',
      num: '04',
      title: 'Dergi & Yayın',
      description: 'Basılı ve dijital yayınlar için geliştirdiğim editoryal tasarımlar, dergi sayfaları ve yayın kimlikleri.',
      icon: <BookOpen className="w-8 h-8 transition-all duration-500" />,
      color: '#A78BFA', // Purple
      details: {
        client: 'Edebiyat & Sanat Kolektifi',
        year: '2025',
        role: 'Editoryal Tasarımcı',
        problem: 'Geleneksel dergi mizanpajlarının dinamik genç okuyucu kitlesine hitap etmekte hantal kalması.',
        solution: 'Asimetrik sayfa gridleri, geniş negatif alanlar ve deneysel büyük başlık tipografisi ile nefes alan bir tasarım sunduk.',
        outcomes: ['64 Sayfalık Özel Sergi Dergisi', 'Asimetrik Mizanpaj ve Grid Kurulumu', '10+ Özgün İllüstrasyon Entegrasyonu']
      }
    },
    {
      id: 'products',
      num: '05',
      title: 'Alternatif Afiş Tasarımları',
      description: 'Farklı konseptleri keşfetmek amacıyla ürettiğim afiş, poster ve deneysel görsel tasarım koleksiyonları.',
      icon: <Package className="w-8 h-8 transition-all duration-500" />,
      color: '#3B82F6', // Blue
      details: {
        client: 'Kreatif Tasarım Atölyesi',
        year: '2026',
        role: 'Ürün Tasarımcısı',
        problem: 'Dijital tasarımların fiziksel objelere aktarılırken dokusunu ve renk doğruluğunu kaybetmesi.',
        solution: 'Vektörel illüstrasyonları yüksek kaliteli tekstil ve kağıt baskı teknolojilerine göre optimize ettik.',
        outcomes: ['Özel Seri Sanat Posterleri', 'Sınırlı Sayıda Üretilen Tasarım Tişörtler', 'Kurumsal Hediye Kitleri Tasarımı']
      }
    },
    {
      id: 'apps',
      num: '06',
      title: 'Genel Tasarımlar',
      description: 'Belirli bir kategoriye bağlı kalmadan geliştirdiğim, farklı ölçek ve disiplinlerden oluşan tasarım seçkisi.',
      icon: <Smartphone className="w-8 h-8 transition-all duration-500" />,
      color: '#F43F5E', // Rose
      details: {
        client: 'Teknoloji & Girişim Ekosistemi',
        year: '2026',
        role: 'UI/UX Tasarımcısı',
        problem: 'Mobil uygulamalarda teknik zenginliğe sahip fonksiyonların kafa karıştırıcı ve düz görünmesi.',
        solution: 'Yatay akan asimetrik grid düzeni, harika geçiş animasyonları ve minimal tipografiye sahip dijital sergi tasarladık.',
        outcomes: ['Ödül Adayı Mobil Arayüz', 'Sonsuz Akış ve Kart Geçişleri', 'Mobil Uyumlu Mikro Etkileşimler']
      }
    }
  ];

  const getRowHeading = (id: string) => {
    switch (id) {
      case 'organizational':
        return { part1: 'ORGANİZASYONEL', part2: 'Tasarım' };
      case 'social-media':
        return { part1: 'SOSYAL MEDYA', part2: 'İletişimi' };
      case 'photography':
        return { part1: 'FOTOROMAN', part2: 'Projeleri' };
      case 'magazine':
        return { part1: 'DERGİ & YAYIN', part2: 'Tasarımı' };
      case 'products':
        return { part1: 'ALTERNATİF AFİŞ', part2: 'Tasarımları' };
      case 'apps':
        return { part1: 'GENEL', part2: 'Tasarımlar' };
      default:
        return { part1: 'KREATİF', part2: 'Tasarım' };
    }
  };

  return (
    <section 
      id="selected-works" 
      className="relative w-full min-h-screen bg-[#070707] py-32 flex flex-col justify-center overflow-hidden border-b border-white/5"
    >
      {/* Background radial atmosphere (soft turquoise neon) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00F0FF]/[0.015] rounded-full filter blur-3xl pointer-events-none" />

      {/* Large Chapter Number header (03 Çalışmalarım) */}
      <div className="absolute top-24 left-6 md:left-12 flex items-baseline gap-5 pointer-events-none z-10 select-none">
        <span className="font-serif italic text-7xl md:text-[9rem] text-white/[0.025] leading-none">03</span>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#00F0FF]/60 font-bold">BÖLÜM ÜÇ</span>
          <span className="font-serif italic text-sm md:text-base text-white/30 uppercase tracking-widest">Çalışmalarım</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 relative z-10">
        
        {/* Section Header styled in matching Creative/Designer typography format */}
        <div className="flex flex-col items-center text-center mb-32 relative">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#00F0FF] uppercase font-bold mb-4">
            KATEGORİLER & PROJELER
          </span>
          <div className="flex flex-col items-center">
            {/* Row 1: KREATİF (Solid white font-display) */}
            <div className="overflow-hidden py-1">
              <span className="block font-display font-black uppercase text-[8vw] sm:text-[6vw] md:text-[5vw] leading-none tracking-tighter text-white">
                KREATİF
              </span>
            </div>
            {/* Row 2: Çalışmalarım (Elegant Serif Italic, overlapping slightly) */}
            <div className="overflow-hidden py-1 -mt-2 sm:-mt-3">
              <span className="block font-serif italic text-[7vw] sm:text-[5vw] md:text-[4vw] leading-none text-white font-light tracking-tight">
                Çalışmalarım<span className="text-[#00F0FF] font-sans not-italic text-2xl ml-1">.</span>
              </span>
            </div>
          </div>
          <div className="w-8 h-[1px] bg-white/20 mt-8" />
        </div>

        {/* 6 Horizontal Rows (Creative Director Stack Layout) */}
        <div className="flex flex-col w-full border-t border-white/5">
          {rows.map((row, idx) => {
            const isHovered = hoveredIndex === idx;
            const isExpanded = expandedIndex === idx;

            return (
              <div 
                key={row.id}
                className="w-full border-b border-white/5 flex flex-col transition-all duration-500"
              >
                {/* Main Row Header Bar */}
                <div
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    onCategorySelect?.(row.id);
                  }}
                  className="w-full py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer relative overflow-hidden group select-none px-4"
                >
                  {/* Subtle hover gradient background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
                    style={{
                      background: `linear-gradient(90deg, ${row.color}05 0%, transparent 100%)`
                    }}
                  />

                  {/* Left Column: Number + Large Icon + Title */}
                  <div className="flex items-center gap-6 md:gap-10 relative z-10">
                    <span 
                      className="font-mono text-xs sm:text-sm tracking-wider transition-colors duration-500"
                      style={{ color: isHovered ? row.color : 'rgba(255,255,255,0.25)' }}
                    >
                      [{row.num}]
                    </span>

                    <div 
                      className="p-3 bg-white/[0.02] border border-white/5 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0"
                      style={{ 
                        color: isHovered ? row.color : 'rgba(255,255,255,0.4)',
                        borderColor: isHovered ? `${row.color}30` : 'rgba(255,255,255,0.05)',
                        boxShadow: isHovered ? `0 0 15px ${row.color}20` : 'none'
                      }}
                    >
                      {row.icon}
                    </div>

                    <h3 
                      className="flex flex-col items-start leading-none group-hover:translate-x-3 transition-transform duration-500"
                    >
                      <span className="font-sans font-black text-lg sm:text-xl tracking-tight text-white uppercase">
                        {getRowHeading(row.id).part1}
                      </span>
                      <span className="font-serif italic font-light text-sm sm:text-base tracking-wide mt-1 transition-colors duration-500" style={{ color: isHovered ? row.color : 'rgba(255,255,255,0.4)' }}>
                        {getRowHeading(row.id).part2}
                      </span>
                    </h3>
                  </div>

                  {/* Middle Column: Short Description */}
                  <div className="max-w-md relative z-10 md:ml-10">
                    <p className="font-sans text-xs sm:text-sm text-white/45 group-hover:text-white/80 transition-colors duration-500 leading-relaxed font-light">
                      {row.description}
                    </p>
                  </div>

                  {/* Right Column: Interaction Action Icon (Expand indicator) */}
                  <div className="flex items-center gap-4 shrink-0 relative z-10 ml-auto md:ml-0">
                    <div 
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        borderColor: isHovered ? row.color : 'rgba(255,255,255,0.1)',
                        color: isHovered ? row.color : 'rgba(255,255,255,0.4)'
                      }}
                    >
                      {isExpanded ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                      )}
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/[0.02] flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      <ArrowRight className="w-4 h-4" style={{ color: row.color }} />
                    </div>
                  </div>
                </div>

                {/* Highly Polished Expandable Case Study Details (Designed for future growth) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden bg-white/[0.01] border-t border-white/5"
                    >
                      <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative">
                        {/* Soft ambient inner glow */}
                        <div 
                          className="absolute right-0 bottom-0 w-[300px] h-[300px] rounded-full filter blur-3xl pointer-events-none opacity-40"
                          style={{
                            background: `radial-gradient(circle, ${row.color}15 0%, transparent 70%)`
                          }}
                        />

                        {/* Left Side: Summary and Specs */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <span className="font-mono text-[9px] tracking-widest text-[#00F0FF] uppercase font-bold" style={{ color: row.color }}>
                              PROJE KÜNYESİ
                            </span>
                            <h4 className="font-serif text-xl text-white font-medium">
                              {row.title} Vakaları
                            </h4>
                          </div>

                          <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-6 font-mono text-[11px] text-white/50">
                            <div className="flex flex-col gap-1">
                              <span className="text-white/30 flex items-center gap-1"><User className="w-3 h-3" /> MÜŞTERİ</span>
                              <span className="text-white/80 font-normal">{row.details.client}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-white/30 flex items-center gap-1"><Calendar className="w-3 h-3" /> YIL / DÖNEM</span>
                              <span className="text-white/80 font-normal">{row.details.year} // DİJİTAL</span>
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                              <span className="text-white/30 flex items-center gap-1"><Tag className="w-3 h-3" /> ROL / KAPSAM</span>
                              <span className="text-white/80 font-normal">{row.details.role}</span>
                            </div>
                          </div>

                          <motion.button
                            onClick={() => onCategorySelect?.(row.id)}
                            whileHover={{ scale: 1.02, backgroundColor: row.color, color: '#000000' }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 border border-white/10 rounded-full py-3.5 px-6 font-mono text-[10px] tracking-widest uppercase font-bold transition-all duration-300 mt-2 hover:border-transparent cursor-pointer"
                            style={{ borderColor: `${row.color}30` }}
                          >
                            Tüm Projeleri Keşfet 
                            <ExternalLink className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>

                        {/* Right Side: Narrative & Outcomes */}
                        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                          <div className="flex flex-col gap-2.5">
                            <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em]">TASARIM PROBLEMİ</span>
                            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                              {row.details.problem}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2.5">
                            <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em]">ÇÖZÜM YAKLAŞIMI</span>
                            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                              {row.details.solution}
                            </p>
                          </div>

                          <div className="flex flex-col gap-3">
                            <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em]">KAZANIMLAR & ÇIKTILAR</span>
                            <div className="flex flex-col gap-2">
                              {row.details.outcomes.map((outcome, oIdx) => (
                                <div key={oIdx} className="flex items-center gap-3">
                                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                                  <span className="font-mono text-[9px] tracking-wider text-white/80 uppercase">{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Clear Hint Prompt at the bottom */}
        <div className="flex flex-col items-center justify-center gap-3 mt-24">
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors duration-500 flex items-center gap-2">
            Detaylı incelemek ve vaka analizlerini açmak için satırlara tıklayın
          </p>
        </div>

      </div>
    </section>
  );
}
