import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ArrowUp, FileText, Upload, ZoomIn, ZoomOut, Eye, EyeOff, Grid,
  Maximize2, Cpu, Award, Zap, BookOpen, Layers, Check, Sparkles, HelpCircle,
  Volume2, RotateCcw, RotateCw, ChevronLeft, ChevronRight, Edit2, Image as ImageIcon, Play,
  Heart, MessageCircle, Send, Bookmark
} from 'lucide-react';
import RdTshirt3DViewer from './RdTshirt3DViewer';

interface ProjectDetail {
  client: string;
  year: string;
  category: string;
  role: string;
  tools: string[];
}

interface Project {
  id: string;
  num: string;
  title: string;
  description: string;
  details: ProjectDetail;
}

interface CategoryViewProps {
  categoryId: string;
  onBack: () => void;
}

// ----------------==================================================================
// 🚨 TAMAMEN OTOMATİK STATİK GÖRSEL YOLU OLUŞTURUCU (HİÇBİR MANİFESTO / LOCALSTORAGE GEREKTİRMEZ)
// ----------------================================================== */
const resolveStaticAssetUrl = (categoryId: string, projectSubFolder: string, fileName: string): string => {
  let mappedCategory = "";
  
  // public/uploaded/ altındaki tam Türkçe kategori klasör isimlerinizle eşleştiriyoruz
  switch (categoryId) {
    case 'organizational':
      mappedCategory = "organizasyonel tasarım";
      break;
    case 'social-media':
      mappedPrefix = "sosyal medya iletişimi";
      break;
    case 'photography':
      mappedPrefix = "fotoroman projeleri";
      break;
    case 'magazine':
      mappedPrefix = "dergi & yayın";
      break;
    case 'products':
      mappedPrefix = "alternatif afiş tasarımları";
      break;
    case 'apps':
      mappedVideo = "genel tasarımlar";
      break;
    default:
      mappedPrefix = categoryId;
  }

  // Eğer doğrudan bir global ayraç veya takvim görseliyse üst klasör seviyesinden çağır
  if (!projectFolder) {
    return `/uploaded/${categoryName}/${fileName}`;
  }

  return `/uploaded/${categoryName}/${projectFolder}/${fileName}`;
};

// Vercel üzerinde de çalışan yeni, hafif ve güvenli bir taklitçi Hook
function usePersistentState(key: string, initialValue: string | null = null) {
  // Görselleri doğrudan public klasöründen kuralla bağlayacağımız için uploader state'lerini bypass ediyoruz
  const [state, setState] = useState<string | null>(initialValue);
  
  // Projenin mevcut yapısını bozmamak için fonksiyon şablonunu koruyoruz
  const setPersistentState = (value: string | null) => {
    setState(value);
  };

  return [state, setPersistentState] as const;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Lightbox({ isOpen, onClose, title, children }: LightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 sm:p-12"
        >
          <div className="absolute top-6 right-6 flex items-center gap-4">
            <span className="font-mono text-[9px] text-white/45 uppercase tracking-widest">// BAS ESC TO CLOSE</span>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 bg-white/5 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
          
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-full max-w-5xl h-[70vh] flex flex-col items-center justify-center relative"
          >
            <div className="w-full text-left mb-4">
              <span className="font-mono text-[9px] text-[#00F0FF] uppercase tracking-[0.3em] font-bold block mb-1">
                // FULLSCREEN INSPECTOR
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                {title}
              </h3>
            </div>
            
            <div className="w-full flex-1 bg-[#050508] border border-white/10 rounded-2xl overflow-hidden p-6 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="w-full h-full flex items-center justify-center scale-105 sm:scale-110 transition-transform duration-500">
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface PremiumImageFrameProps {
  children: React.ReactNode;
  aspect?: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
  theme?: 'retro' | 'default';
}

function PremiumImageFrame({ children, aspect = "aspect-square", title, subtitle, onClick, theme }: PremiumImageFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 1.5;
    const rotateY = ((x - centerX) / centerX) * 1.5;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  if (theme === 'retro') {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isHovered ? '0 0 25px rgba(168, 108, 255, 0.35), 4px 4px 0px #8F5BFF' : '4px 4px 0px rgba(143, 91, 255, 0.4)'
        }}
        className={`w-full ${aspect} bg-[#0B0815] border-2 border-[#A86CFF]/80 relative overflow-hidden group select-none flex items-center justify-center cursor-crosshair`}
      >
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-500"
            style={{
              background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(168, 108, 255, 0.12), transparent 80%)`
            }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#130f26_25%,transparent_25%),linear-gradient(-45deg,#130f26_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#130f26_75%),linear-gradient(-45deg,transparent_75%,#130f26_75%)] bg-[size:16px_16px] opacity-40 pointer-events-none z-0" />
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#A86CFF] pointer-events-none" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#A86CFF] pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#A86CFF] pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#A86CFF] pointer-events-none" />
        {title && <div className="absolute top-2.5 left-3 font-mono text-[8px] text-[#A86CFF]/60 tracking-wider uppercase z-20">{title}</div>}
        {subtitle && <div className="absolute top-2.5 right-3 font-mono text-[8px] text-[#A86CFF]/40 tracking-wider uppercase z-20">{subtitle}</div>}
        <div className="w-full h-full flex items-center justify-center p-6 z-10 group-hover:scale-[1.01] transition-transform duration-700">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isHovered ? '0 0 35px rgba(0, 240, 255, 0.15)' : '0 4px 30px rgba(0, 0, 0, 0.4)'
      }}
      className={`w-full ${aspect} rounded-2xl border bg-[#09090b]/80 border-white/5 relative overflow-hidden group select-none flex items-center justify-center`}
    >
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(0, 240, 255, 0.075), transparent 80%)`
          }}
        />
      )}
      <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-[#00F0FF]/20 group-hover:border-[#00F0FF]/60 transition-colors" />
      <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-[#00F0FF]/20 group-hover:border-[#00F0FF]/60 transition-colors" />
      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-[#00F0FF]/20 group-hover:border-[#00F0FF]/60 transition-colors" />
      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-[#00F0FF]/20 group-hover:border-[#00F0FF]/60 transition-colors" />
      {title && <div className="absolute top-4 left-4 font-mono text-[7px] text-white/20 tracking-widest uppercase z-20">// {title}</div>}
      {subtitle && <div className="absolute top-4 right-4 font-mono text-[7px] text-white/20 tracking-widest uppercase z-20">// {subtitle}</div>}
      <div className="w-full h-full flex items-center justify-center p-8 z-10 group-hover:scale-[1.015] transition-transform duration-700">{children}</div>
    </div>
  );
}

interface ProjectImageContainerProps {
  title: string;
  subtitle: string;
  aspect?: string;
  customGraphic?: React.ReactNode;
}

function ProjectImageContainer({ title, subtitle, aspect = "aspect-square", customGraphic }: ProjectImageContainerProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  return (
    <>
      <PremiumImageFrame title="" subtitle="" aspect={aspect} onClick={() => setIsLightboxOpen(true)}>
        <div className="w-full h-full flex items-center justify-center cursor-zoom-in">{customGraphic}</div>
      </PremiumImageFrame>
      <Lightbox isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} title={`${title} — ${subtitle}`}>{customGraphic}</Lightbox>
    </>
  );
}

interface ImageUploadPlaceholderProps {
  image: string | null;
  onUpload: (url: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  title: string;
  aspect?: string;
  customGraphic?: React.ReactNode;
  objectFit?: 'cover' | 'contain';
  isLocked?: boolean;
  onLockedClick?: () => void;
  theme?: 'retro' | 'default';
}

function ImageUploadPlaceholder({ image, title, aspect = "aspect-[4/3]", customGraphic, objectFit = 'cover', theme = 'default' }: ImageUploadPlaceholderProps) {
  return (
    <PremiumImageFrame title={title.toUpperCase()} subtitle="STATIC_PUBLIC_CDN" aspect={aspect} theme={theme}>
      <div className="absolute inset-0 w-full h-full">
        {image ? (
          <img src={image} alt={title} className={`w-full h-full ${objectFit === 'contain' ? 'object-contain bg-black/25' : 'object-cover'}`} referrerPolicy="no-referrer" />
        ) : customGraphic ? (
          customGraphic
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center select-none opacity-20">
            <ImageIcon className="w-6 h-6 mb-2" />
            <span className="font-mono text-[8px] tracking-widest uppercase">GÖRSEL BULUNAMADI</span>
          </div>
        )}
      </div>
    </PremiumImageFrame>
  );
}

function SectionTransition({ index }: { index: number }) {
  return (
    <div className="w-full py-28 relative flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none my-16">
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-1.5 rotate-45 bg-[#FF4E20] opacity-80" />
          <div className="h-[0.5px] w-14 bg-white/15" />
          <span className="font-mono text-[7.5px] tracking-[0.45em] text-white/35 uppercase font-medium">SECTION.0{index} // METADATA_CORRELATION</span>
          <div className="h-[0.5px] w-14 bg-white/15" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#00F0FF] opacity-80" />
        </div>
      </div>
    </div>
  );
}

const AssetsManifestProvider = ({ children }: { children: React.ReactNode }) => children;

const GASTRONOMI_TITLES = [
  "Orman Meyveli Cheesecake Workshopu", "Atıksız Mutfak Atölyesi", "Kuru Dolma ve Meze Tanıtım Etkinliği",
  "Dünya Kadınlar Günü", "Dünya Spagetti Günü", "Yeni Yıl Tasarımı",
  "İçli Köfte ve Mantı Workshop", "En İyi 10 Dünya Mutfağı", "Halloween Özel Balkabağı Tatlısı Tarifi"
];

const GASTRONOMI_CAPTIONS: Record<string, string> = {
  "gastronomi_grid_1": "Sürdürülebilir mutfak pratikleri ve atık azaltma yöntemlerini ele aldığımız bu özel atölyede, profesyonel şeflerimizin rehberliğinde hem çevre dostu yemek pişirme tekniklerini öğrendik hem de gastronomiye dair yeni bakış açıları kazandık.",
  "gastronomi_grid_2": "Tatlı sanatının inceliklerine indiğimiz, kıvam ve lezzet dengesini kusursuzlaştırdığımız workshop çalışmamızda; katılımcılarımız kendi elleriyle taze orman meyveli çıtır tabanlı çizkeklerini hazırlayıp teknik detayları bizzat tecrübe ettiler.",
  "gastronomi_grid_3": "Geleneksel Türk mutfağının başyapıtlarından kuru dolma ve zengin meze çeşitlerimizin tarihsel hikayelerini ve özgün reçetelerini inceleyip, eşsiz lezzet sunumlarıyla unutulmaz bir tadım deneyimi gerçekleştirdik.",
  "gastronomi_grid_4": "Eski çağlardan günümüze ekmeğin serüvenini ele aldığımız eğitimde; ekşi maya kurulumu, fermantasyon süreçleri ve fırınlama tekniklerini pratik uygulamalarla katılımcılarımıza aktardık.",
  "gastronomi_grid_5": "Dünya Spagetti Günü: Sıcak kırmızı tonlarındaki dairesel ışık çizgileriyle odağı tamamen ürüne çeyen çalışma, çatal etrafında dönen hareketli spagetti görseli ve bütünleşik tipografisiyle eğlenceli bir kompozisyon sunmaktadır.",
  "gastronomi_grid_6": "Yeni yıl ruhunu canlı renkler ve geleneksel kış elementleriyle harmanlayan bu tasarımda, hareketli tipografi ve alt kısımda konumlandırılan kurumsal logolarla dengeli bir topluluk aidiyeti sunulmuştur.",
  "gastronomi_grid_7": "İçli köfte ve mantı yapımının tüm püf noktalarını, harç hazırlama, hamur açma ve şekillendirme tekniklerini bizzat uygulayarak öğrendiğimiz, geleneksel lezzetlerimize odaklanan özel atölyemiz.",
  "gastronomi_grid_8": "En İyi 10 Dünya Mutfağı: Kültürel lezzet çeşitliliğini sakin bir yeşil fon üzerinde gerçek ürün görselleriyle harmanlayan tasarım, altın sarısı taç detayıyla prestijli bir liste algısı yaratmaktadır.",
  "gastronomi_grid_9": "Halloween Özel Balkabağı Tatlısı Tarifi: Cadılar Bayramı atmosferini turuncu tonları ve tematik illüstrasyonlarla yansıtan bu tasarımda, hareketli yazı stiliyle etkinliğin eğlenceli ruhu ön plana çıkarılmıştır."
};

const ZERRA_TITLES = [
  "zBurada Girişimi", "LinkedIn CV Mülakat Atölyesi", "Erasmus ile Sınırları Aşanlar",
  "Girişimci Olmaya Ne Dersin", "Girişimci Olmak ya da Olmamak", "zBurada Kurumsal İçerik",
  "Tercih Pusulası", "zBurada Kurumsal İçerik", "zBurada Kurumsal İçerik",
  "20 Yılda Değişenler", "Mikro Yeterlilikler", "zBurada Kurumsal İçerik"
];

const ZERRA_CAPTIONS: Record<string, string> = {
  "zburada_grid_1": "zBurada Girişimi: Gençlerin kariyer tercihlerinde doğru kararlar vermelerine yardımcı olmak amacıyla çeşitli simülasyon atölyeleri düzenleyen, yenilikçi ve gelecek odaklı bir girişim vizyonunun kapak tasarımı.",
  "zburada_grid_2": "Gençlerin iş dünyasındaki kariyer yolculuklarını, profesyonel CV hazırlama adımlarını ve LinkedIn mülakat simülasyon süreçlerini kurumsal zBurada kimliğinde anlatan rehber grafik.",
  "zburada_grid_3": "Erasmus ile Sınırları Aşanlar: Erasmus programıyla yurt dışı eğitim ve staj süreçlerinde sınırları aşan gençlerin ilham verici tecrübelerini ve başarı hikayelerini içeren özel deneyim paylaşım serisi.",
  "zburada_grid_4": "Girişimci Olmaya Ne Dersin: Üniversite ve lise öğrencilerinin girişimcilik ekosistemine dahil olabilmeleri için gerekli temel kavramları, adımları ve heyecan verici başlangıç ipuçlarını sunan pratik rehber.",
  "zburada_grid_5": "Girişimci Olmak ya da Olmamak: Kariyer tercih aşamasındaki öğrencilerin kendi potansiyellerini keşfetmelerine yardımcı olan, zBurada tarzında hazırlanmış analitik kıyaslama ve kişisel analiz içeriği.",
  "zburada_grid_6": "zBurada Kurumsal İçerik: Gençlerin gelecek vizyonlarını desteklemek ve kariyer yolculuklarında onlara eşlik etmek üzere zBurada kurumsal kimlik estetiğinde üretilmiş modern sosyal medya paylaşımı.",
  "zburada_grid_7": "Tercih Pusulası: Kariyer ve university tercih süreçlerinde öğrencilerin adımlarına yön verecek rehberlik bilgileri, mesleki yönelim analizleri ve pusula niteliğindeki bilgilendirici grafikler.",
  "zburada_grid_8": "zBurada Kurumsal İçerik: zBurada'nın dinamik topluluk yapısını, gençlik odaklı kariyer atölyelerini ve interaktif simülasyon programlarını tanıtan yenilikçi sosyal medya tasarımı.",
  "zburada_grid_9": "zBurada Kurumsal İçerik: zBurada kimlik rehberine and modern tasarım diline sadık kalınarak, genç profesyonellerin kariyer gelişimini desteklemek amacıyla özel olarak kurgulanan kurumsal şablon.",
  "zburada_grid_10": "20 Yılda Değişenler: Son 20 yılda geleneksel eğitim sistemlerinden modern dijital yöntemlere geçişi ve günümüzde tamamen evrilen yenilikçi eğitim bakış açılarını mercek altına alan karşılaştırma tasarımı.",
  "zburada_grid_11": "Mikro Yeterlilikler: Günümüz iş dünyasında ve kariyer simülasyonlarında öne çıkan dijital beceriler, mikro sertifikasyon süreçleri ve gençlerin kazanması gereken yeni nesil yetkinlik tabloları.",
  "zburada_grid_12": "zBurada Kurumsal İçerik: zBurada simülasyon atölyeleri sonrasında genç katılımcıların kariyer tercihlerinde elde ettikleri başarıları ve geleceğin yetkinlik haritasını gösteren kurumsal sunum görseli."
};

export default function CategoryView(props: CategoryViewProps) {
  return <CategoryViewInner {...props} />;
}

function CategoryViewInner({ categoryId, onBack }: CategoryViewProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  const getCategoryHeadingInfo = () => {
    switch (categoryId) {
      case 'organizational':
        return {
          section: '// BÖLÜM 01 // ORGANİZASYONEL TASARIM', part1: 'ORGANİZASYONEL', part2: 'Tasarım', color: '#00F0FF',
          desc: 'Kurumsal kimlik dönüşümlerini, stratejik süreç şablonlarını, akıllı asistan entegrasyonlarını ve kurum içi gelişim modellerini kapsayan bütünsel bir tasarım metodolojisi.'
        };
      case 'social-media':
        return {
          section: '// BÖLÜM 02 // SOSYAL MEDYA SİSTEMLERİ', part1: 'SOSYAL MEDYA', part2: 'İçerikleri', color: '#FF6B00',
          desc: 'Markaların dijital dünyadaki estetik kimliğini, kreatif kurgularını ve bütünsel sosyal medya anlatılarını tasarlayan üst düzey görsel diller.'
        };
      case 'photography':
        return {
          section: '// BÖLÜM 03 // FOTOĞRAFÇILIK & EDİTÖRYAL TASARIM', part1: 'FOTOĞRAFÇILIK', part2: 'Serileri', color: '#10B981',
          desc: 'Işık-gölge dramaturjisi, dikey kadraj mizanpajı ve sayfa ritmiyle kurgulanmış 5 adet fotoroman sergisi.'
        };
      case 'magazine':
        return {
          section: '// BÖLÜM 04 // DERGİ TASARIMI', part1: 'GÜRBÜZ', part2: 'Dergisi', color: '#A78BFA',
          desc: 'Gürbüz, kaosun ortasında bir gürz ağacı mottosuyla iki ayda bir yayımlanan bir kültür, sanat ve edebiyat dergisidir.'
        };
      case 'products':
        return {
          section: '// BÖLÜM 05 // ALTERNATİF TASARIMLAR', part1: 'ALTERNATİF', part2: 'Tasarımlar', color: '#3B82F6',
          desc: 'Fiziksel ve dijital tasarım çıktıları, poster serileri, kurumsal kimlik kitleri ve deneysel mizanpaj çalışmaları.'
        };
      case 'apps':
        return {
          section: '// BÖLÜM 06 // GENEL TASARIMLAR', part1: 'GENEL', part2: 'Tasarımlar', color: '#F43F5E',
          desc: 'Kurumsal yaka kartları, özel gün konsept ambalajları ve fiziksel mekanizmalı takvim tasarımlarını barındıran zengin sergi.'
        };
      default:
        return { section: '', part1: 'KREATİF', part2: 'Tasarım', color: '#00F0FF', desc: '' };
    }
  };

  const catHeading = getCategoryHeadingInfo();
  
  // ----------------==================================================================
  // 🚨 STATİK MEDYA ATAMALARI (TÜM GÖRSELLERİ DOĞRUDAN public/uploaded/ KLASÖRÜNDEN ÇEKER)
  // ----------------================================================== */
  const getUrl = (projFolder: string, fileName: string) => resolveStaticAssetUrl(categoryId, projFolder, fileName);

  const degerlerCoverImage = getUrl('', 'cover.jpg');
  const aiFactoryCoverImage = getUrl('', 'cover.jpg');
  const egitimCoverImage = getUrl('', 'cover.jpg');
  const rdTechathonCoverImage = getUrl('', 'cover.jpg');

  const degerlerKitiBannerImage = getUrl('değerler lansmanı', 'identity.jpg');
  const degerlerKalbiImage = getUrl('değerler lansmanı', 'heart.jpg');
  const degerlerKitiImage = getUrl('değerler lansmanı', 'kit.jpg');
  const kitDefterImage = getUrl('değerler lansmanı', 'notebook.jpg');
  const kitStickerImage = getUrl('değerler lansmanı', 'sticker.jpg');
  
  const sepFatihImage = getUrl('değerler lansmanı', 'fatih.jpg');
  const sepAhiImage = getUrl('değerler lansmanı', 'ahi.jpg');
  const sepAliImage = getUrl('değerler lansmanı', 'ali.jpg');
  const sepYusufImage = getUrl('değerler lansmanı', 'yusuf.jpg');
  const sepBarbarosImage = getUrl('değerler lansmanı', 'barbaros.jpg');
  const sepCezeriImage = getUrl('değerler lansmanı', 'cezeri.jpg');
  
  const diaryVizyonImage = getUrl('değerler lansmanı', 'vision.jpg');
  const diaryManifestoImage = getUrl('değerler lansmanı', 'manifesto.jpg');
  const diaryIcSayfa1Image = getUrl('değerler lansmanı', 'page1.jpg');
  const diaryIcSayfa2Image = getUrl('değerler lansmanı', 'page2.jpg');
  
  const backdropImage = getUrl('değerler lansmanı', 'backdrop.jpg');
  const lanyardFrontImage = getUrl('değerler lansmanı', 'lanyard1.png');
  const lanyardBackImage = getUrl('değerler lansmanı', 'lanyard2.png');
  const directionFrameImage = getUrl('değerler lansmanı', 'signage.jpg');

  const interactivePlacard1Image = getUrl('değerler lansmanı', 'placard1.jpg');
  const interactivePlacard2Image = getUrl('değerler lansmanı', 'placard2.jpg');
  const interactivePlacard3Image = getUrl('değerler lansmanı', 'placard3.jpg');
  const interactivePlacard4Image = getUrl('değerler lansmanı', 'placard4.jpg');

  const aiFactoryImage = getUrl('ai_agent', 'identity1.jpg');
  const aiFactoryThemeImage = getUrl('ai_agent', 'identity2.jpg');
  const aiFactoryBackdropImage = getUrl('ai_agent', 'backdrop.jpg');
  const aiFactoryDirectionImage = getUrl('ai_agent', 'signage.jpg');
  const aiFactoryFrameImage = getUrl('ai_agent', 'photo_frame.jpg');
  const aiFactoryCarouselImage = getUrl('ai_agent', 'instagram1.jpg');
  const aiFactoryInsta2Image = getUrl('ai_agent', 'instagram2.jpg');
  const aiFactoryInsta3Image = getUrl('ai_agent', 'instagram3.jpg');
  const aiFactoryInsta4Image = getUrl('ai_agent', 'instagram4.jpg');
  const aiFactoryStickerImage = getUrl('ai_agent', 'sticker.jpg');
  const aiFactoryBadgeImage = getUrl('ai_agent', 'badge.jpg');
  const aiFactoryTrophyImage = getUrl('ai_agent', 'trophy.jpg');

  const egitimThemeImage = getUrl('architecht academy', 'hero.jpg');
  const egitimTypographyImage = getUrl('architecht academy', 'identity.jpg');
  const egitimKit1Image = getUrl('architecht academy', 'kit1.jpg');
  const egitimKit2Image = getUrl('architecht academy', 'kit2.jpg');
  const egitimKit3Image = getUrl('architecht academy', 'kit3.jpg');
  const egitimPleksi1Image = getUrl('architecht academy', 'pleksi1.jpg');
  const egitimPleksi2Image = getUrl('architecht academy', 'pleksi2.jpg');
  const egitimPleksi3Image = getUrl('architecht academy', 'pleksi3.jpg');
  const egitimPankart1Image = getUrl('architecht academy', 'pankart1.jpg');
  const egitimPankart2Image = getUrl('architecht academy', 'pankart2.jpg');
  const egitimPankart3Image = getUrl('architecht academy', 'pankart3.jpg');
  const egitimPankart4Image = getUrl('architecht academy', 'pankart4.jpg');
  const egitimYakaFrontImage = getUrl('architecht academy', 'yaka_front.jpg');
  const egitimYakaBackImage = getUrl('architecht academy', 'yaka_back.jpg');
  const egitimVeriNimetImage = getUrl('architecht academy', 'veri_nimet.jpg');

  const rdSection1Image = getUrl('r&d techathon', 'identity.jpg');
  const rdYakaKartiFrontImage = getUrl('r&d techathon', 'yaka_front.jpg');
  const rdYakaKartiBackImage = getUrl('r&d techathon', 'yaka_back.jpg');
  const rdStickerImage = getUrl('r&d techathon', 'sticker.jpg');
  const rdTshirtFrontImage = getUrl('r&d techathon', 'tshirt_front.jpg');
  const rdTshirtBackImage = getUrl('r&d techathon', 'tshirt_back.jpg');
  const rdDirection1Image = getUrl('r&d techathon', 'signage1.jpg');
  const rdDirection2Image = getUrl('r&d techathon', 'signage2.jpg');
  const rdVideoUrl = getUrl('r&d techathon', 'video.mp4');

  const divider1Image = getUrl('', 'desenuzun.png');
  const divider2Image = getUrl('', 'desenuzun.png');
  const divider3Image = getUrl('', 'desenuzun.png');
  const divider4Image = getUrl('', 'desenuzun.png');
  const divider5Image = getUrl('', 'desenuzun.png');
  const divider6Image = getUrl('', 'desenuzun.png');
  const divider7Image = getUrl('', 'desenuzun.png');
  const divider8Image = getUrl('', 'desenuzun.png');

  const socialGridImage = getUrl('küratörlü grid tasarımı', 'grid_preview.jpg');
  const socialVideoImage = getUrl('dinamik video şablonları', 'video_preview.jpg');
  const socialCampaignImage = getUrl('kampanya tasarımları', 'campaign_preview.jpg');
  const campaignSlide1Image = getUrl('kampanya tasarımları', 'slide1.jpg');
  const campaignSlide2Image = getUrl('kampanya tasarımları', 'slide2.jpg');
  const campaignSlide3Image = getUrl('kampanya tasarımları', 'slide3.jpg');
  const campaignSlide4Image = getUrl('kampanya tasarımları', 'slide4.jpg');

  const [activeSocialTab, setActiveSocialTab] = useState<'gastronomi' | 'zburada' | 'veribilimi'>('gastronomi');
  const [productsActiveIdx, setProductsActiveIdx] = useState(0);
  const [yakaActiveSlide, setYakaActiveSlide] = useState(0);
  const [chocolateActiveSlide, setChocolateActiveSlide] = useState(0);
  const [calendarMonth, setCalendarMonth] = useState(6);
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarUserDayIndex, setCalendarUserDayIndex] = useState(0);
  const [hideCalendarTexts, setHideCalendarTexts] = useState(false);
  const [aiFactoryInstaActiveIdx, setAiFactoryInstaActiveIdx] = useState(0);
  const [yakaKartiSide, setYakaKartiSide] = useState<'front' | 'back'>('front');
  const [egitimPankartActiveIdx, setEgitimPankartActiveIdx] = useState(0);
  const [egitimYakaFlipped, setEgitimYakaFlipped] = useState(false);
  const [activeInteractivePlacard, setActiveInteractivePlacard] = useState<number>(1);
  const [socialVideoLikes, setSocialVideoLikes] = useState<number>(1248);
  const [isSocialVideoLiked, setIsSocialVideoLiked] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [magazineData, setMagazineData] = useState({
    activeViewIdxs: { "mag_issue_1": 0, "mag_issue_2": 0, "mag_issue_3": 0, "mag_issue_4": 0, "mag_issue_5": 0 },
    activeIssue: 1,
    description: "Gürbüz, kaosun ortasında bir gürz ağacı mottosuyla iki ayda bir yayımlanan bir kültür, sanat ve edebiyat dergisidir.",
    isEditingDesc: false
  });

  const [fotoromanData, setFotoromanData] = useState({
    activePageIdxs: { "fotoroman_1": 0, "fotoroman_2": 0, "fotoroman_3": 0, "fotoroman_4": 0, "fotoroman_5": 0 }
  });

  const updateFotoromanActivePage = (fotoromanKey: string, pageIdx: number) => {
    setFotoromanData(prev => ({
      ...prev,
      activePageIdxs: { ...prev.activePageIdxs, [fotoromanKey]: pageIdx }
    }));
  };

  const handleSelectIssue = (issueNum: number) => {
    setMagazineData(prev => ({ ...prev, activeIssue: issueNum }));
  };

  const handleGoToView = (viewIdx: number) => {
    setMagazineData(prev => ({
      ...prev,
      activeViewIdxs: { ...prev.activeViewIdxs, [`mag_issue_${prev.activeIssue}`]: viewIdx }
    }));
  };

  const handleGoToPage = (pageIdx: number) => {
    const currentIssueConfig = magazineIssuesConfig.find(item => item.id === magazineData.activeIssue) || magazineIssuesConfig[0];
    const viewIdx = currentIssueConfig.views.findIndex(v => v.rightPageIdx === pageIdx || v.leftPageIdx === pageIdx);
    if (viewIdx !== -1) handleGoToView(viewIdx);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [selectedProjectId]);

  const isLocked = true;
  const accentColor = selectedProjectId === 'egitim' ? '#FF4E00' : (categoryId === 'social-media' ? '#FF6B00' : (categoryId === 'photography' ? '#10B981' : '#00F0FF'));

  const projects: Project[] = categoryId === 'social-media' ? [
    { id: 'social-grid', num: '01', title: 'Küratörlü Grid Tasarımı', description: 'Estetik bütünlüğe sahip kurumsal Instagram grid yapıları, asimetrik boşluklar ve minimal tipografik şablonlar.', details: { client: 'Kreatif Sosyal Girişimi', year: '2025', category: 'Sosyal Medya İçerikleri', role: 'Sanat Yönetmeni & Lead Designer', tools: ['Photoshop', 'Illustrator', 'Figma'] } },
    { id: 'social-video', num: '02', title: 'Dinamik Video Şablonları', description: 'Yüksek dönüşüm odaklı, kinetik tipografi ve akıcı geçiş efektleri barındıran dikey ve yatay video kurguları.', details: { client: 'Kreatif Sosyal Girişimi', year: '2025', category: 'Sosyal Medya İçerikleri', role: 'Motion Designer', tools: ['After Effects', 'Premiere Pro'] } },
    { id: 'social-campaign', num: '03', title: 'Kampanya Tasarımları', description: 'Markanın dijital vizyonunu ve kurumsal ritmini yansıtan kreatif kampanya kurguları.', details: { client: 'Kreatif Sosyal Girişimi', year: '2025', category: 'Sosyal Medya İçerikleri', role: 'Creative Director', tools: ['Figma', 'Illustrator'] } }
  ] : [
    { id: 'degerler', num: '01', title: 'Değerler Lansmanı', description: 'Marka değerlerini yalnızca anlatmak yerine deneyime dönüştüren disiplinler arası üretken proje tasarımlarıdır.', details: { client: 'Architecht', year: '2026', category: 'Organizasyonel Tasarım', role: 'Creative Designer', tools: ['Illustrator', 'Photoshop'] } },
    { id: 'ai-factory', num: '02', title: 'AI Agent Factory', description: 'Yapay zekâ odaklı eğitim programı için geliştirilen deneyim ve organizasyon tasarımları.', details: { client: 'Architecht', year: '2026', category: 'Organizasyonel Tasarım', role: 'Experience Designer', tools: ['Figma', 'Illustrator'] } },
    { id: 'egitim', num: '03', title: 'Architecht Academy', description: 'Kurumsal eğitim programlarını destekleyen bütünsel etkinlik ve iletişim tasarımları.', details: { client: 'Architecht', year: '2025-2026', category: 'Kurumsal Eğitim Tasarımı', role: 'Graphic Designer', tools: ['Figma', 'Illustrator'] } },
    { id: 'rd-techathon-2026', num: '04', title: 'R&D Techathon 2026', description: 'Hackathon sürecinde geliştirilen organizasyon, yönlendirme ve deneyim tasarımları.', details: { client: 'Architecht', year: '2026', category: 'Organizasyonel Tasarım', role: 'Graphic Designer', tools: ['Figma', 'Illustrator'] } }
  ];

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const magazineIssuesConfig = [
    { id: 1, title: "GÜRBÜZ // BİRİNCİ SAYI", subtitle: "Gürbüz Dergisi", views: [{ label: "Kapak", leftPageIdx: null, rightPageIdx: 0 }, { label: "Sayfa 1-2", leftPageIdx: 1, rightPageIdx: 2 }, { label: "Sayfa 3-4", leftPageIdx: 3, rightPageIdx: 4 }], totalPages: 5 },
    { id: 2, title: "GÜRBÜZ // İKİNCİ SAYI", subtitle: "Gürbüz Dergisi", views: [{ label: "Kapak", leftPageIdx: null, rightPageIdx: 0 }, { label: "Sayfa 1-2", leftPageIdx: 1, rightPageIdx: 2 }, { label: "Sayfa 3-4", leftPageIdx: 3, rightPageIdx: 4 }], totalPages: 5 },
    { id: 3, title: "GÜRBÜZ // ÜÇÜNCÜ SAYI", subtitle: "Gürbüz Dergisi", views: [{ label: "Kapak", leftPageIdx: null, rightPageIdx: 0 }, { label: "Sayfa 1-2", leftPageIdx: 1, rightPageIdx: 2 }], totalPages: 3 },
    { id: 4, title: "GÜRBÜZ // DÖRDÜNCÜ SAYI", subtitle: "Gürbüz Dergisi", views: [{ label: "Kapak", leftPageIdx: null, rightPageIdx: 0 }], totalPages: 1 },
    { id: 5, title: "GÜRBÜZ // BEŞİNCİ SAYI", subtitle: "Gürbüz Dergisi", views: [{ label: "Kapak", leftPageIdx: null, rightPageIdx: 0 }, { label: "Sayfa 1-2", leftPageIdx: 1, rightPageIdx: 2 }], totalPages: 3 }
  ];

  const renderMagazineDefaultSVG = (issueId: number, pageIdx: number) => {
    return <img src={getUrl('dergi & yayın', `sayi${issueId}_sayfa${pageIdx}.jpg`)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />;
  };

  const renderFotoromanDefaultSVG = (fotoromanIdx: number, pageIdx: number) => {
    return <img src={getUrl('fotoroman projeleri', `seri${fotoromanIdx}_sayfa${pageIdx}.jpg`)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />;
  };

  if (selectedProjectId === null) {
    if (categoryId === 'photography') {
      return (
        <div className="relative min-h-screen bg-[#070707] text-white overflow-hidden pb-40">
          <div className="paper-grain opacity-85" />
          <div className="max-w-6xl mx-auto pt-32 px-12 text-left relative z-10">
            <div className="mb-12">
              <button onClick={onBack} className="inline-flex items-center gap-2 bg-[#10B981] text-black py-2 px-5 rounded-xl font-mono text-[10px] font-black uppercase">← Geri Dön</button>
            </div>
            <div className="mb-16 border-b border-white/5 pb-12">
              <h1 className="font-sans font-black text-4xl uppercase text-white">Fotoroman Projeleri</h1>
            </div>
            <div className="flex flex-col gap-16">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="border border-white/5 bg-white/[0.01] rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/3 text-left">
                    <h3 className="font-sans font-black text-2xl text-[#10B981] uppercase">SERİ 0{idx}</h3>
                    <p className="font-sans text-xs text-white/50 mt-2">Kurgu, karakter ve tipografiyi harmanlayan fotoroman çalışması.</p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((page) => (
                      <div key={page} className="aspect-[3/4.2] border border-white/10 rounded-xl overflow-hidden bg-black">
                        {renderFotoromanDefaultSVG(idx, page)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (categoryId === 'social-media') {
      return (
        <div className="relative min-h-screen bg-[#070707] text-white overflow-hidden pb-40">
          <div className="paper-grain opacity-85" />
          <div className="max-w-6xl mx-auto pt-32 px-12 text-left relative z-10">
            <div className="mb-12">
              <button onClick={onBack} className="inline-flex items-center gap-2 bg-[#FF6B00] text-white py-2 px-5 rounded-xl font-mono text-[10px] font-black uppercase">← Geri Dön</button>
            </div>
            <div className="relative w-full flex flex-col items-center mb-16">
              <div className="grid grid-cols-3 w-full max-w-4xl text-center">
                {['gastronomi', 'zburada', 'veribilimi'].map((tab) => (
                  <div key={tab} onClick={() => setActiveSocialTab(tab as any)} className={`cursor-pointer py-4 font-sans font-black uppercase text-sm ${activeSocialTab === tab ? 'text-[#FF6B00]' : 'text-white/45'}`}>
                    {tab === 'gastronomi' ? 'Gastronomi' : tab === 'zburada' ? 'zBurada' : 'Veri Bilimi'}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square border border-white/10 rounded-2xl overflow-hidden bg-black">
                  <img src={getUrl(activeSocialTab === 'gastronomi' ? 'gastronomi topluluğu' : activeSocialTab === 'zburada' ? 'zburada' : 'veri bilimi topluluğu', `gorsel${i+1}.jpg`)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <p className="p-3 text-[11px] text-white/60 text-center font-sans">{activeSocialTab === 'gastronomi' ? GASTRONOMI_TITLES[i] : ZERRA_TITLES[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (categoryId === 'magazine') {
      return (
        <div className="relative min-h-screen bg-[#070707] text-white overflow-hidden pb-40">
          <div className="paper-grain opacity-85" />
          <div className="max-w-6xl mx-auto pt-32 px-12 text-left relative z-10">
            <div className="mb-12">
              <button onClick={onBack} className="inline-flex items-center gap-2 bg-[#A78BFA] text-black py-2 px-5 rounded-xl font-mono text-[10px] font-black uppercase">← Geri Dön</button>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-68 flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map(issueNum => (
                  <div key={issueNum} onClick={() => handleSelectIssue(issueNum)} className={`p-4 border rounded-xl cursor-pointer ${magazineData.activeIssue === issueNum ? 'border-[#A78BFA] bg-white/5' : 'border-white/5'}`}>
                    <span className="font-mono text-xs text-white">SAYI 0{issueNum}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map(page => (
                  <div key={page} className="aspect-[3/4] border border-white/10 rounded-2xl overflow-hidden bg-black">
                    {renderMagazineDefaultSVG(magazineData.activeIssue, page)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Fallback
    return (
      <div className="max-w-6xl mx-auto pt-32 px-12 text-left text-white">
        <button onClick={onBack} className="bg-[#00F0FF] text-black px-4 py-2 rounded-xl">← Geri Dön</button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {projects.map((proj) => (
            <div key={proj.id} onClick={() => setSelectedProjectId(proj.id)} className="border border-white/5 bg-white/[0.015] rounded-3xl p-6 cursor-pointer hover:border-[#00F0FF] transition-all">
              <h3 className="font-sans font-black text-xl text-[#00F0FF] uppercase">{proj.title}</h3>
              <p className="text-white/60 text-xs font-sans mt-2">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // INDIVIDUAL DETAILED SUB-PROJECT VIEWS
  return (
    <div className="max-w-6xl mx-auto pt-32 px-12 text-left text-white">
      <button onClick={() => setSelectedProjectId(null)} className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[11px] font-mono">← Projelere Dön</button>
      
      <div className="mt-12 border-b border-white/5 pb-8 mb-12">
        <h1 className="font-sans font-black text-4xl uppercase">{selectedProject.title}</h1>
        <p className="text-white/60 text-sm font-sans mt-2">{selectedProject.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ImageUploadPlaceholder image={getUrl(selectedProject.title.toLowerCase(), 'identity.jpg')} title="Kimlik ve Konsept" aspect="aspect-[4/3]" isLocked={true} />
        </div>
        <div>
          <ImageUploadPlaceholder image={getUrl(selectedProject.title.toLowerCase(), 'backdrop.jpg')} title="Alan / Uygulama" aspect="aspect-[4/3]" isLocked={true} />
        </div>
      </div>
    </div>
  );
}