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
          transition: isHovered
            ? 'transform 0.08s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
            : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.8s ease, box-shadow 0.8s ease',
          boxShadow: isHovered
            ? '0 0 25px rgba(168, 108, 255, 0.35), 4px 4px 0px #8F5BFF'
            : '4px 4px 0px rgba(143, 91, 255, 0.4)'
        }}
        className={`w-full ${aspect} bg-[#0B0815] border-2 border-[#A86CFF]/80 relative overflow-hidden group select-none transition-all duration-700 hover:border-[#C67CFF] flex items-center justify-center cursor-crosshair`}
      >
        <div className="absolute inset-0 pointer-events-none z-30 border border-[#A86CFF]/0 group-hover:border-[#A86CFF]/25 transition-all duration-700" />
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-500"
            style={{
              background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(168, 108, 255, 0.12), transparent 80%)`
            }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#130f26_25%,transparent_25%),linear-gradient(-45deg,#130f26_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#130f26_75%),linear-gradient(-45deg,transparent_75%,#130f26_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0px] opacity-40 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none z-0" />
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#A86CFF] pointer-events-none group-hover:bg-[#C67CFF] transition-colors animate-pulse" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#A86CFF] pointer-events-none group-hover:bg-[#C67CFF] transition-colors animate-pulse" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#A86CFF] pointer-events-none group-hover:bg-[#C67CFF] transition-colors animate-pulse" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#A86CFF] pointer-events-none group-hover:bg-[#C67CFF] transition-colors animate-pulse" />
        {title && (
          <div className="absolute top-2.5 left-3 font-mono text-[8px] text-[#A86CFF]/60 tracking-wider uppercase transition-colors duration-500 group-hover:text-[#C67CFF] z-20">
            {title}
          </div>
        )}
        {subtitle && (
          <div className="absolute top-2.5 right-3 font-mono text-[8px] text-[#A86CFF]/40 tracking-wider uppercase z-20">
            {subtitle}
          </div>
        )}
        <div className="w-full h-full flex items-center justify-center p-6 z-10 transition-transform duration-700 ease-out group-hover:scale-[1.01]">
          {children}
        </div>
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
        transition: isHovered
          ? 'transform 0.08s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
          : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.8s ease, box-shadow 0.8s ease',
        boxShadow: isHovered
          ? '0 0 35px rgba(0, 240, 255, 0.15), inset 0 0 20px rgba(0, 240, 255, 0.03)'
          : '0 4px 30px rgba(0, 0, 0, 0.4)'
      }}
      className={`w-full ${aspect} rounded-2xl border bg-[#09090b]/80 border-white/5 relative overflow-hidden group select-none transition-all duration-700 hover:border-[#00F0FF]/35 flex items-center justify-center`}
    >
      <div className="absolute inset-0 pointer-events-none z-30 border border-[#00F0FF]/0 group-hover:border-[#00F0FF]/20 rounded-2xl transition-all duration-700" />
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(0, 240, 255, 0.075), transparent 80%)`
          }}
        />
      )}
      <div
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${rotate.y * -3}px, ${rotate.x * 3}px)`
        }}
      />
      <div className="absolute inset-x-0 top-1/2 h-[1px] border-b border-dashed border-white/[0.015] pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 w-[1px] border-r border-dashed border-white/[0.015] pointer-events-none" />
      <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-[#00F0FF]/20 pointer-events-none group-hover:border-[#00F0FF]/60 transition-colors duration-500" />
      <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-[#00F0FF]/20 pointer-events-none group-hover:border-[#00F0FF]/60 transition-colors duration-500" />
      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-[#00F0FF]/20 pointer-events-none group-hover:border-[#00F0FF]/60 transition-colors duration-500" />
      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-[#00F0FF]/20 pointer-events-none group-hover:border-[#00F0FF]/60 transition-colors duration-500" />
      {title && (
        <div className="absolute top-4 left-4 font-mono text-[7px] text-white/20 tracking-widest uppercase transition-colors duration-500 group-hover:text-[#00F0FF]/40 z-20">
          // {title}
        </div>
      )}
      {subtitle && (
        <div className="absolute top-4 right-4 font-mono text-[7px] text-white/20 tracking-widest uppercase z-20">
          // {subtitle}
        </div>
      )}
      <div
        className="w-full h-full flex items-center justify-center p-8 z-10 transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        style={{
          transform: isHovered ? `translate(${rotate.y * 1.5}px, ${rotate.x * -1.5}px)` : 'none'
        }}
      >
        {children}
      </div>
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
      <PremiumImageFrame
        title=""
        subtitle=""
        aspect={aspect}
        onClick={() => setIsLightboxOpen(true)}
      >
        <div className="w-full h-full flex items-center justify-center cursor-zoom-in">
          {customGraphic}
        </div>
      </PremiumImageFrame>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={`${title} — ${subtitle}`}
      >
        {customGraphic}
      </Lightbox>
    </>
  );
}

const compressAndResizeImage = (file: File, maxWidth = 1600, maxHeight = 1600, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const mimeType = file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/svg+xml' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(event.target?.result as string);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

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

function ImageUploadPlaceholder({
  image,
  onUpload,
  fileInputRef,
  title,
  aspect = "aspect-[4/3]",
  customGraphic,
  objectFit = 'cover',
  isLocked = false,
  onLockedClick,
  theme = 'default'
}: ImageUploadPlaceholderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      compressAndResizeImage(file, 2048, 2048, 0.95)
        .then((compressedUrl) => {
          onUpload(compressedUrl);
        })
        .catch((err) => {
          console.error("Compression error, falling back:", err);
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              onUpload(reader.result);
            }
          };
          reader.readAsDataURL(file);
        });
    }
  };

  const isRetro = theme === 'retro';
  const overlayBorderColor = isRetro ? 'border-[#A86CFF]/40' : 'border-[#00F0FF]/40';
  const overlayBgColor = isRetro ? 'bg-[#A86CFF]/5' : 'bg-[#00F0FF]/5';
  const overlayTextColor = isRetro ? 'text-[#A86CFF]' : 'text-[#00F0FF]';
  const overlayShadowColor = isRetro ? 'shadow-[0_0_15px_rgba(168,108,255,0.35)]' : 'shadow-[0_0_15px_rgba(0,240,255,0.35)]';

  return (
    <PremiumImageFrame
      title={title.toUpperCase()}
      subtitle={isLocked ? "LOCK_SECURED_01" : "UPLOAD_REF_77A"}
      aspect={aspect}
      theme={theme}
      onClick={isLocked ? onLockedClick : () => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {image ? (
        <div className={`absolute inset-0 w-full h-full ${isLocked ? 'cursor-default' : 'cursor-pointer group/uploaded'}`}>
          <img
            src={image}
            alt={title}
            className={`w-full h-full transition-transform duration-700 ${!isLocked ? 'group-hover/uploaded:scale-105' : ''} ${objectFit === 'contain' ? 'object-contain bg-black/25' : 'object-cover'
              }`}
            referrerPolicy="no-referrer"
          />
          {!isLocked && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/uploaded:opacity-100 backdrop-blur-[2px] transition-all duration-300 z-20 flex flex-col items-center justify-center gap-3">
              <div className={`w-12 h-12 rounded-full border ${overlayBorderColor} ${overlayBgColor} flex items-center justify-center ${overlayTextColor} ${overlayShadowColor}`}>
                <Upload className="w-4 h-4 animate-pulse" />
              </div>
              <span className={`font-mono text-[9px] ${overlayTextColor} tracking-[0.3em] font-bold uppercase`}>// GÖRSELİ DEĞİŞTİR</span>
            </div>
          )}
        </div>
      ) : customGraphic ? (
        <div className={`absolute inset-0 w-full h-full ${isLocked ? 'cursor-default' : 'cursor-pointer group/custom-graphic'}`}>
          {customGraphic}
          {!isLocked && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/custom-graphic:opacity-100 backdrop-blur-[1px] transition-all duration-300 z-20 flex flex-col items-center justify-center gap-3">
              <div className={`w-12 h-12 rounded-full border ${overlayBorderColor} ${overlayBgColor} flex items-center justify-center ${overlayTextColor} ${overlayShadowColor}`}>
                <Upload className="w-4 h-4 animate-pulse" />
              </div>
              <span className={`font-mono text-[9px] ${overlayTextColor} tracking-[0.3em] font-bold uppercase`}>// GÖRSEL YÜKLE</span>
            </div>
          )}
        </div>
      ) : (
        <div className={`flex flex-col items-center gap-3 text-center p-6 select-none ${isLocked ? 'cursor-default' : 'cursor-pointer'}`}>
          <div className={`w-11 h-11 rounded-full border border-dashed ${isRetro ? 'border-[#A86CFF]/30 bg-[#A86CFF]/5 text-[#A86CFF]/60' : 'border-white/20 bg-white/5 text-white/40'} flex items-center justify-center transition-colors`}>
            <Upload className="w-4 h-4" />
          </div>
          <span className={`font-mono text-[9px] ${isRetro ? 'text-[#A86CFF]/80' : 'text-white/50'} tracking-[0.2em] uppercase block`}>GÖRSEL EKLEME ALANI</span>
          <p className="font-sans text-[11px] text-white/30 max-w-[240px] leading-relaxed font-light">Projeye ait ekran görüntülerinizi veya tasarımlarınızı buraya ekleyin.</p>
        </div>
      )}
    </PremiumImageFrame>
  );
}

function SectionTransition({ index }: { index: number }) {
  const scanLineStyle = `
    @keyframes scanLine {
      0% { left: -30%; }
      100% { left: 130%; }
    }
  `;

  return (
    <div className="w-full py-28 sm:py-36 md:py-44 relative flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none my-16">
      <style dangerouslySetInnerHTML={{ __html: scanLineStyle }} />
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-4 h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute inset-x-0 top-1/2 translate-y-4 h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      <div
        className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/35 to-transparent w-1/3"
        style={{
          left: '-30%',
          animation: 'scanLine 9s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          top: '50%'
        }}
      />

      <div className="absolute top-1/2 left-10 md:left-24 -translate-y-1/2 flex items-center gap-3">
        <span className="font-mono text-[6px] text-white/10">ALIGN_L // [X: 104]</span>
        <div className="flex gap-1.5">
          <span className="w-1 h-1 rounded-full bg-white/15" />
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span className="w-1 h-1 rounded-full bg-[#00F0FF]/25 animate-pulse" />
        </div>
      </div>

      <div className="absolute top-1/2 right-10 md:right-24 -translate-y-1/2 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#00F0FF]/25 animate-pulse" />
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span className="w-1 h-1 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[6px] text-white/10">[Y: 772] // ALIGN_R</span>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-1.5 rotate-45 bg-[#FF4E20] opacity-80" />
          <div className="h-[0.5px] w-14 bg-white/15" />
          <span className="font-mono text-[7.5px] tracking-[0.45em] text-white/35 uppercase font-medium">
            SECTION.0{index} // METADATA_CORRELATION
          </span>
          <div className="h-[0.5px] w-14 bg-white/15" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#00F0FF] opacity-80" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-1 font-mono text-[6.5px] text-white/20 tracking-wider">
          <span>LAT: 41.0082° N</span>
          <span className="text-white/5">•</span>
          <span>LON: 28.9784° E</span>
          <span className="text-white/5">•</span>
          <span>ALT: 104.5M</span>
          <span className="text-white/5">•</span>
          <span>SYSTEM_REF: CRS_OSD_2026</span>
          <span className="text-white/5">•</span>
          <span className="text-[#00F0FF]/30">STATUS: CALIBRATED</span>
        </div>
      </div>
    </div>
  );
}

const uploadImageToServerAndGetUrl = async (key: string, base64: string): Promise<string> => {
  if (!base64 || !base64.startsWith('data:')) return base64;
  try {
    const res = await fetch('/api/save-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, base64 }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.url) {
        return data.url;
      }
    }
  } catch (err) {
    console.error('Error uploading image to server:', err);
  }
  return base64;
};

const AssetsManifestContext = React.createContext<{
  manifest: Record<string, string>;
  isLoaded: boolean;
  saveAsset: (key: string, url: string) => Promise<void>;
}>({
  manifest: {},
  isLoaded: false,
  saveAsset: async () => { },
});

function AssetsManifestProvider({ children }: { children: React.ReactNode }) {
  const [manifest, setManifest] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`/uploaded/assets_manifest.json?t=${Date.now()}`)
      .then(res => {
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          return res.json();
        }
        return fetch(`/api/assets-manifest?t=${Date.now()}`).then(r => {
          const rType = r.headers.get('content-type') || '';
          if (r.ok && rType.includes('application/json')) {
            return r.json();
          }
          return {};
        });
      })
      .then(data => {
        setManifest(data || {});
        setIsLoaded(true)
      })
      .catch(err => {
        console.warn('Failed to load static assets manifest, trying fallback:', err);
        fetch(`/api/assets-manifest?t=${Date.now()}`)
          .then(res => {
            const contentType = res.headers.get('content-type') || '';
            if (res.ok && contentType.includes('application/json')) {
              return res.json();
            }
            return {};
          })
          .then(data => {
            setManifest(data || {});
            setIsLoaded(true);
          })
          .catch(() => {
            setManifest({});
            setIsLoaded(true);
          });
      });
  }, []);

  const saveAsset = async (key: string, url: string) => {
    setManifest(prev => ({ ...prev, [key]: url }));
    try {
      await fetch('/api/save-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value: url }),
      });
    } catch (err) {
      console.error('Failed to save asset string to server:', err);
    }
  };

  return (
    <AssetsManifestContext.Provider value={{ manifest, isLoaded, saveAsset }}>
      {children}
    </AssetsManifestContext.Provider>
  );
}

const isUploadedAsset = (key: string): boolean => {
  const k = key.toLowerCase();
  return k.includes('image') || k.includes('url') || k.includes('img') || k.includes('logo') || k.includes('pdf');
};

function usePersistentState(key: string, initialValue: string | null = null) {
  const { manifest, isLoaded, saveAsset } = React.useContext(AssetsManifestContext);
  const isAsset = isUploadedAsset(key);

  const [state, setState] = useState<string | null>(() => {
    if (isAsset) {
      try {
        const localSaved = localStorage.getItem(`asset_${key}`);
        if (localSaved) return localSaved;
      } catch (e) { }
      return initialValue;
    }
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? saved : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isLoaded) {
      if (isAsset) {
        if (manifest[key] !== undefined) {
          setState(manifest[key]);
        } else {
          try {
            const localSaved = localStorage.getItem(`asset_${key}`);
            if (localSaved) {
              setState(localSaved);
            }
          } catch (e) { }
        }
      } else {
        try {
          const saved = localStorage.getItem(key);
          if (saved !== null) {
            setState(saved);
          }
        } catch (e) { }
      }
    }
  }, [isLoaded, manifest, key, isAsset]);

  const setPersistentState = (value: string | null) => {
    setState(value);

    if (isAsset) {
      if (value) {
        try {
          localStorage.setItem(`asset_${key}`, value);
        } catch (e) {
          console.warn("localStorage cache save failed:", e);
        }
        if (value.startsWith('data:')) {
          uploadImageToServerAndGetUrl(key, value).then((serverUrl) => {
            setState(serverUrl);
            saveAsset(key, serverUrl);
            try {
              localStorage.setItem(`asset_${key}`, serverUrl);
            } catch (e) { }
          });
        } else {
          saveAsset(key, value);
        }
      } else {
        saveAsset(key, '');
        try {
          localStorage.removeItem(`asset_${key}`);
        } catch (e) { }
      }
    } else {
      try {
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
      } catch (e) { }
    }
  };

  return [state, setPersistentState] as const;
}

const loadCachedAssets = (prefix: string): Record<string, string> => {
  const assets: Record<string, string> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) {
        const val = localStorage.getItem(k);
        if (val) {
          assets[k.substring(prefix.length)] = val;
        }
      }
    }
  } catch (e) {
    console.error("Error loading cached assets from localStorage:", e);
  }
  return assets;
};

const GASTRONOMI_TITLES = [
  "Orman Meyveli Cheesecake Workshopu",
  "Atıksız Mutfak Atölyesi",
  "Kuru Dolma ve Meze Tanıtım Etkinliği",
  "Dünya Kadınlar Günü",
  "Dünya Spagetti Günü",
  "Yeni Yıl Tasarımı",
  "İçli Köfte ve Mantı Workshop",
  "En İyi 10 Dünya Mutfağı",
  "Halloween Özel Balkabağı Tatlısı Tarifi"
];

const GASTRONOMI_CAPTIONS: Record<string, string> = {
  "gastronomi_grid_1": "Sürdürülebilir mutfak pratikleri ve atık azaltma yöntemlerini ele aldığımız bu özel atölyede, profesyonel şeflerimizin rehberliğinde hem çevre dostu yemek pişirme tekniklerini öğrendik hem de gastronomiye dair yeni bakış açıları kazandık.",
  "gastronomi_grid_2": "Tatlı sanatının inceliklerine indiğimiz, kıvam and lezzet dengesini kusursuzlaştırdığımız workshop çalışmamızda; katılımcılarımız kendi elleriyle taze orman meyveli çıtır tabanlı çizkeklerini hazırlayıp teknik detayları bizzat tecrübe ettiler.",
  "gastronomi_grid_3": "Geleneksel Türk mutfağının başyapıtlarından kuru dolma ve zengin meze çeşitlerimizin tarihsel hikayelerini ve özgün reçetelerini inceleyip, eşsiz lezzet sunumlarıyla unutulmaz bir tadım deneyimi gerçekleştirdik.",
  "gastronomi_grid_4": "Eski çağlardan günümüze ekmeğin serüvenini ele aldığımız eğitimde; ekşi maya kurulumu, fermantasyon süreçleri and fırınlama tekniklerini pratik uygulamalarla katılımcılarımıza aktardık.",
  "gastronomi_grid_5": "Dünya Spagetti Günü: Sıcak kırmızı tonlarındaki dairesel ışık çizgileriyle odağı tamamen ürüne çeken çalışma, çatal etrafında dönen hareketli spagetti görseli ve bütünleşik tipografisiyle eğlenceli bir kompozisyon sunmaktadır.",
  "gastronomi_grid_6": "Yeni yıl ruhunu canlı renkler ve geleneksel kış elementleriyle harmanlayan bu tasarımda, hareketli tipografi and alt kısımda konumlandırılan kurumsal logolarla dengeli bir topluluk aidiyeti sunulmuştur.",
  "gastronomi_grid_7": "İçli köfte ve mantı yapımının tüm püf noktalarını, harç hazırlama, hamur açma and şekillendirme tekniklerini bizzat uygulayarak öğrendiğimiz, geleneksel lezzetlerimize odaklanan özel atölyemiz.",
  "gastronomi_grid_8": "En İyi 10 Dünya Mutfağı: Kültürel lezzet çeşitliliğini sakin bir yeşil fon üzerinde gerçek ürün görselleriyle harmanlayan tasarım, altın sarısı taç detayıyla prestijli bir liste algısı yaratmaktadır.",
  "gastronomi_grid_9": "Halloween Özel Balkabağı Tatlısı Tarifi: Cadılar Bayramı atmosferini turuncu tonları and tematik illüstrasyonlarla yansıtan bu tasarımda, hareketli yazı stiliyle etkinliğin eğlenceli ruhu ön plana çıkarılmıştır."
};

const GASTRONOMI_IMAGES = [
  '/uploaded/sosyal-medya/gastronomi-1.png',
  '/uploaded/sosyal-medya/gastronomi-2.png',
  '/uploaded/sosyal-medya/gastronomi-3.png',
  '/uploaded/sosyal-medya/gastronomi-4.png',
  '/uploaded/sosyal-medya/gastronomi-5.png',
  '/uploaded/sosyal-medya/gastronomi-6.png',
  '/uploaded/sosyal-medya/gastronomi-7.png',
  '/uploaded/sosyal-medya/gastronomi-8.png',
  '/uploaded/sosyal-medya/gastronomi-9.png'
];

const getGastronomiImg = (idx: number) => {
  return GASTRONOMI_IMAGES[idx] || `/uploaded/sosyal-medya/gastronomi-${idx + 1}.png`;
};

const ZERRA_TITLES = [
  "zBurada Girişimi",
  "LinkedIn CV Mülakat Atölyesi",
  "Erasmus ile Sınırları Aşanlar",
  "Girişimci Olmaya Ne Dersin",
  "Girişimci Olmak ya da Olmamak",
  "zBurada Kurumsal İçerik",
  "Tercih Pusulası",
  "zBurada Kurumsal İçerik",
  "zBurada Kurumsal İçerik",
  "20 Yılda Değişenler",
  "Mikro Yeterlilikler",
  "zBurada Kurumsal İçerik"
];

const ZERRA_CAPTIONS: Record<string, string> = {
  "zburada_grid_1": "zBurada Girişimi: Gençlerin kariyer tercihlerinde doğru kararlar vermelerine yardımcı olmak amacıyla çeşitli simülasyon atölyeleri düzenleyen, yenilikçi and gelecek odaklı bir girişim vizyonunun kapak tasarımı.",
  "zburada_grid_2": "Gençlerin iş dünyasındaki kariyer yolculuklarını, profesyonel CV hazırlama adımlarını and LinkedIn mülakat simülasyon süreçlerini kurumsal zBurada kimliğinde anlatan rehber grafik.",
  "zburada_grid_3": "Erasmus ile Sınırları Aşanlar: Erasmus programıyla yurt dışı eğitim and staj süreçlerinde sınırları aşan gençlerin ilham verici tecrübelerini and başarı hikayelerini içeren özel deneyim paylaşım serisi.",
  "zburada_grid_4": "Girişimci Olmaya Ne Dersin: Üniversite and lise öğrencilerinin girişimcilik ekosistemine dahil olabilmeleri için gerekli temel kavramları, adımları and heyecan verici başlangıç ipuçlarını sunan pratik rehber.",
  "zburada_grid_5": "Girişimci Olmak ya da Olmamak: Kariyer tercih aşamasındaki öğrencilerin kendi potansiyellerini keşfetmelerine yardımcı olan, zBurada tarzında hazırlanmış analitik kıyaslama and kişisel analiz içeriği.",
  "zburada_grid_6": "zBurada Kurumsal İçerik: Gençlerin gelecek vizyonlarını desteklemek and kariyer yolculuklarında onlara eşlik etmek üzere zBurada kurumsal kimlik estetiğinde üretilmiş modern sosyal medya paylaşımı.",
  "zburada_grid_7": "Tercih Pusulası: Kariyer and üniversite tercih süreçlerinde öğrencilerin adımlarına yön verecek rehberlik bilgileri, mesleki yönelim analizleri and pusula niteliğindeki bilgilendirici grafikler.",
  "zburada_grid_8": "zBurada Kurumsal İçerik: zBurada'nın dinamik topluluk yapısını, gençlik odaklı kariyer atölyelerini and interaktif simülasyon programlarını tanıtan yenilikçi sosyal medya tasarımı.",
  "zburada_grid_9": "zBurada Kurumsal İçerik: zBurada kimlik rehberine and modern tasarım diline sadık kalınarak, genç profesyonellerin kariyer gelişimini desteklemek amacıyla özel olarak kurgulanan kurumsal şablon.",
  "zburada_grid_10": "20 Yılda Değişenler: Son 20 yılda geleneksel eğitim sistemlerinden modern dijital yöntemlere geçişi and günümüzde tamamen evrilen yenilikçi eğitim bakış açılarını mercek altına alan karşılaştırma tasarımı.",
  "zburada_grid_11": "Mikro Yeterlilikler: Günümüz iş dünyasında and kariyer simülasyonlarında öne çıkan dijital beceriler, mikro sertifikasyon süreçleri and gençlerin kazanması gereken yeni nesil yetkinlik tabloları.",
  "zburada_grid_12": "zBurada Kurumsal İçerik: zBurada simülasyon atölyeleri sonrasında genç katılımcıların kariyer tercihlerinde elde ettikleri başarıları and geleceğin yetkinlik haritasını gösteren kurumsal sunum görseli."
};

const ZERRA_IMAGES = [
  '/uploaded/sosyal-medya/zburada-1.png',
  '/uploaded/sosyal-medya/zburada-2.png',
  '/uploaded/sosyal-medya/zburada-3.png',
  '/uploaded/sosyal-medya/zburada-4.png',
  '/uploaded/sosyal-medya/zburada-5.png',
  '/uploaded/sosyal-medya/zburada-6.png',
  '/uploaded/sosyal-medya/zburada-7.png',
  '/uploaded/sosyal-medya/zburada-8.png',
  '/uploaded/sosyal-medya/zburada-9.png',
  '/uploaded/sosyal-medya/zburada-10.png',
  '/uploaded/sosyal-medya/zburada-11.png',
  '/uploaded/sosyal-medya/zburada-12.png'
];

const getZerraImg = (idx: number) => {
  return ZERRA_IMAGES[idx] || `/uploaded/sosyal-medya/zburada-${idx + 1}.png`;
};

export default function CategoryView(props: CategoryViewProps) {
  return (
    <AssetsManifestProvider>
      <CategoryViewInner {...props} />
    </AssetsManifestProvider>
  );
}

function CategoryViewInner({ categoryId, onBack }: CategoryViewProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const getCategoryHeadingInfo = () => {
    switch (categoryId) {
      case 'organizational':
        return {
          section: '// BÖLÜM 01 // ORGANİZASYONEL TASARIM',
          part1: 'ORGANİZASYONEL',
          part2: 'Tasarım',
          color: '#00F0FF',
          desc: 'Kurumsal kimlik dönüşümlerini, stratejik süreç şablonlarını, akıllı asistan entegrasyonlarını and kurum içi gelişim modellerini kapsayan bütünsel bir tasarım metodolojisi. Bu ekosistem; organizasyonel yapıyı sadece hiyerarşik bir şema olmaktan çıkarıp, yaşayan, öğrenen and değerleriyle nefes alan dinamik bir kültüre dönüştürmeyi hedefler.'
        };
      case 'social-media':
        return {
          section: '// BÖLÜM 02 // SOSYAL MEDYA SİSTEMLERİ',
          part1: 'SOSYAL MEDYA',
          part2: 'İçerikleri',
          color: '#FF6B00',
          desc: 'Markaların dijital dünyadaki estetik kimliğini, kreatif kurgularını and bütünsel sosyal medya anlatılarını tasarlayan üst düzey görsel diller, grid sistemleri and video şablonları.'
        };
      case 'photography':
        return {
          section: '// BÖLÜM 03 // FOTOĞRAFÇILIK & EDİTÖRYAL TASARIM',
          part1: 'FOTOĞRAFÇILIK',
          part2: 'Serileri',
          color: '#10B981',
          desc: 'Işık-gölge dramaturjisi, dikey kadraj mizanpajı and sayfa ritmiyle kurgulanmış 5 adet fotoroman sergisi. Her fotoromanın bir ana A5 kapak görseli and yanında 3-4 adet sayfa örneği bulunur. Sayfalara basarak onları ana odak alanına getirebilir, kendi görsellerinizi yüklemek için üstlerindeki yükle butonuna tıklayabilirsiniz.'
        };
      case 'magazine':
        return {
          section: '// BÖLÜM 04 // DERGİ TASARIMI',
          part1: 'GÜRBÜZ',
          part2: 'Dergisi',
          color: '#A78BFA',
          desc: 'Gürbüz, kaosun ortasında bir gürbüz ağacı mottosuyla iki ayda bir yayımlanan bir kültür, sanat and edebiyat dergisidir. Adını bir şiirde geçen "gürz" kelimesinden alan dergimizin yayımlanmış olan toplam 5 sayısının tamamının görsel and editoryal mizanpaj tasarımı bana aittir.'
        };
      case 'products':
        return {
          section: '// BÖLÜM 05 // ALTERNATİF TASARIMLAR',
          part1: 'ALTERNATİF',
          part2: 'Tasarımlar',
          color: '#3B82F6',
          desc: 'Fiziksel and dijital tasarım çıktıları, poster serileri, kurumsal kimlik kitleri and deneysel mizanpaj çalışmalarının bir araya geldiği alternatif sergileme alanı.'
        };
      case 'apps':
        return {
          section: '// BÖLÜM 06 // GENEL TASARIMLAR',
          part1: 'GENEL',
          part2: 'Tasarımlar',
          color: '#F43F5E',
          desc: 'Kurumsal yaka kartları, özel gün konsept ambalajları and fiziksel mekanizmalı takvim tasarımlarını barındıran zengin and etkileşimli tasarım çalışmaları sergisi.'
        };
      default:
        return {
          section: '// BÖLÜM // KATEGORİ SEÇİMİ',
          part1: 'KREATİF',
          part2: 'Tasarım',
          color: '#00F0FF',
          desc: ''
        };
    }
  };

  const catHeading = getCategoryHeadingInfo();
  const { manifest, isLoaded, saveAsset } = React.useContext(AssetsManifestContext);
  const [uploadedPdfUrl, setUploadedPdfUrl] = usePersistentState('uploadedPdfUrl');
  const [uploadedPdfName, setUploadedPdfName] = usePersistentState('uploadedPdfName');
  const [isDragging, setIsDragging] = useState(false);
  const [pdfZoom, setPdfZoom] = useState(100);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [aiFactoryImage, setAiFactoryImage] = usePersistentState('aiFactoryImage', '/uploaded/organizasyonel-tasarim/ai-agent/kimlik-sol-gorsel.png');
  const [aiTunnelImage, setAiTunnelImage] = usePersistentState('aiTunnelImage');
  const [aiFactoryInstaActiveIdx, setAiFactoryInstaActiveIdx] = useState(0);
  const [aiKioskImage, setAiKioskImage] = usePersistentState('aiKioskImage');
  const [rdImage, setRdImage] = usePersistentState('rdImage');
  const [egitimImage, setEgitimImage] = usePersistentState('egitimImage');
  const [diaryArkaKapakImage, setDiaryArkaKapakImage] = usePersistentState('diaryArkaKapakImage', null);
  const [diaryIcSayfaImage, setDiaryIcSayfaImage] = usePersistentState('diaryIcSayfaImage', null);
  const [backdropImage, setBackdropImage] = usePersistentState('backdropImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/backdrop.png');

  const [aiFactoryCoverImageInternal] = useState('/uploaded/organizasyonel-tasarim/ai-agent/kapak.png');
  const [aiFactoryThemeImage, setAiFactoryThemeImage] = usePersistentState('aiFactoryThemeImage', '/uploaded/organizasyonel-tasarim/ai-agent/kimlik-sag-gorsel.png');
  const [aiFactoryBackdropImage, setAiFactoryBackdropImage] = usePersistentState('aiFactoryBackdropImage', '/uploaded/organizasyonel-tasarim/ai-agent/backdrop-tasarımı.png');
  const [aiFactoryDirectionImage, setAiFactoryDirectionImage] = usePersistentState('aiFactoryDirectionImage', '/uploaded/organizasyonel-tasarim/ai-agent/yonlendirme.png');
  const [aiFactoryFrameImage, setAiFactoryFrameImage] = usePersistentState('aiFactoryFrameImage', '/uploaded/organizasyonel-tasarim/ai-agent/sipsak-foto-deneyimi.png');
  const [aiFactoryCarouselImage, setAiFactoryCarouselImage] = usePersistentState('aiFactoryCarouselImage', '/uploaded/organizasyonel-tasarim/ai-agent/instagram-gonderisi-1.jpg');
  const [aiFactoryInsta2Image, setAiFactoryInsta2Image] = usePersistentState('aiFactoryInsta2Image', '/uploaded/organizasyonel-tasarim/ai-agent/instagram-gonderisi-2.jpg');
  const [aiFactoryInsta3Image, setAiFactoryInsta3Image] = usePersistentState('aiFactoryInsta3Image', '/uploaded/organizasyonel-tasarim/ai-agent/instagram-gonderisi-3.jpg');
  const [aiFactoryInsta4Image, setAiFactoryInsta4Image] = usePersistentState('aiFactoryInsta4Image', '/uploaded/organizasyonel-tasarim/ai-agent/instagram-gonderisi-4.jpg');
  const [aiFactoryStickerImage, setAiFactoryStickerImage] = usePersistentState('aiFactoryStickerImage', '/uploaded/organizasyonel-tasarim/ai-agent/sticker-sets-tasarımı.png');
  const [aiFactoryBadgeImage, setAiFactoryBadgeImage] = usePersistentState('aiFactoryBadgeImage', '/uploaded/organizasyonel-tasarim/ai-agent/takım-isimligi-tasarımı.png');
  const [aiFactoryTrophyImage, setAiFactoryTrophyImage] = usePersistentState('aiFactoryTrophyImage', '/uploaded/organizasyonel-tasarim/ai-agent/dino-odulu.png');

  const rdThemeFileInputRef = useRef<HTMLInputElement>(null);
  const rdSection1FileInputRef = useRef<HTMLInputElement>(null);
  const rdSection2FileInputRef = useRef<HTMLInputElement>(null);
  const rdSection3FileInputRef = useRef<HTMLInputElement>(null);
  const rdSection4FileInputRef = useRef<HTMLInputElement>(null);
  const rdYakaKartiFrontFileInputRef = useRef<HTMLInputElement>(null);
  const rdYakaKartiBackFileInputRef = useRef<HTMLInputElement>(null);
  const rdVideoFileInputRef = useRef<HTMLInputElement>(null);
  const rdStickerFileInputRef = useRef<HTMLInputElement>(null);
  const rdTshirtFrontFileInputRef = useRef<HTMLInputElement>(null);
  const rdTshirtBackFileInputRef = useRef<HTMLInputElement>(null);
  const rdDirection1FileInputRef = useRef<HTMLInputElement>(null);
  const rdDirection2FileInputRef = useRef<HTMLInputElement>(null);

  const [rdThemeImage, setRdThemeImage] = usePersistentState('rdThemeImage', '/uploaded/organizasyonel-tasarim/rd-techathon/tasarım-kimligi.png');
  const [rdSection1Image, setRdSection1Image] = usePersistentState('rdSection1Image', '/uploaded/organizasyonel-tasarim/rd-techathon/tasarım-kimligi.png');
  const [rdSection2Image, setRdSection2Image] = usePersistentState('rdSection2Image');
  const [rdSection3Image, setRdSection3Image] = usePersistentState('rdSection3Image');
  const [rdSection4Image, setRdSection4Image] = usePersistentState('rdSection4Image');
  const [rdYakaKartiFrontImage, setRdYakaKartiFrontImage] = usePersistentState('rdYakaKartiFrontImage', '/uploaded/organizasyonel-tasarim/rd-techathon/yaka-kartı-on.png');
  const [rdYakaKartiBackImage, setRdYakaKartiBackImage] = usePersistentState('rdYakaKartiBackImage', '/uploaded/organizasyonel-tasarim/rd-techathon/yaka-kartı-arka.png');
  const [rdVideoUrl, setRdVideoUrl] = usePersistentState('rdVideoUrl', '/uploaded/organizasyonel-tasarim/rd-techathon/yarısmacı-tanıtım-videosu.mp4');
  const [rdStickerImage, setRdStickerImage] = usePersistentState('rdStickerImage', '/uploaded/organizasyonel-tasarim/rd-techathon/sticker-seti.png');
  const [rdTshirtFrontImage, setRdTshirtFrontImage] = usePersistentState('rdTshirtFrontImage', '/uploaded/organizasyonel-tasarim/rd-techathon/tisort-tasarımı-on.jpeg');
  const [rdTshirtBackImage, setRdTshirtBackImage] = usePersistentState('rdTshirtBackImage', '/uploaded/organizasyonel-tasarim/rd-techathon/tisort-tasarımı-arka.jpeg');
  const [rdDirection1Image, setRdDirection1Image] = usePersistentState('rdDirection1Image', '/uploaded/organizasyonel-tasarim/rd-techathon/dikey-pano-1.png');
  const [rdDirection2Image, setRdDirection2Image] = usePersistentState('rdDirection2Image', '/uploaded/organizasyonel-tasarim/rd-techathon/dikey-pano-2.png');
  const [yakaKartiSide, setYakaKartiSide] = useState<'front' | 'back'>('front');

  const egitimThemeFileInputRef = useRef<HTMLInputElement>(null);
  const egitimColorPaletteFileInputRef = useRef<HTMLInputElement>(null);
  const egitimTypographyFileInputRef = useRef<HTMLInputElement>(null);
  const egitimKit1FileInputRef = useRef<HTMLInputElement>(null);
  const egitimKit2FileInputRef = useRef<HTMLInputElement>(null);
  const egitimKit3FileInputRef = useRef<HTMLInputElement>(null);
  const egitimPleksi1FileInputRef = useRef<HTMLInputElement>(null);
  const egitimPleksi2FileInputRef = useRef<HTMLInputElement>(null);
  const egitimPleksi3FileInputRef = useRef<HTMLInputElement>(null);
  const egitimPankart1FileInputRef = useRef<HTMLInputElement>(null);
  const egitimPankart2FileInputRef = useRef<HTMLInputElement>(null);
  const egitimPankart3FileInputRef = useRef<HTMLInputElement>(null);
  const egitimPankart4FileInputRef = useRef<HTMLInputElement>(null);
  const egitimYakaFrontFileInputRef = useRef<HTMLInputElement>(null);
  const egitimYakaBackFileInputRef = useRef<HTMLInputElement>(null);
  const egitimVeriNimetFileInputRef = useRef<HTMLInputElement>(null);

  const [egitimThemeImage, setEgitimThemeImage] = usePersistentState('egitimThemeImage', '/uploaded/organizasyonel-tasarim/architecht-academy/kapak.png');
  const [egitimColorPaletteImage, setEgitimColorPaletteImage] = usePersistentState('egitimColorPaletteImage');
  const [egitimTypographyImage, setEgitimTypographyImage] = usePersistentState('egitimTypographyImage', '/uploaded/organizasyonel-tasarim/architecht-academy/academy-hero-image.png');
  const [egitimKit1Image, setEgitimKit1Image] = usePersistentState('egitimKit1Image', '/uploaded/organizasyonel-tasarim/architecht-academy/bez-canta-ve-kupa.png');
  const [egitimKit2Image, setEgitimKit2Image] = usePersistentState('egitimKit2Image', '/uploaded/organizasyonel-tasarim/architecht-academy/3d-plaket-sticker.png');
  const [egitimKit3Image, setEgitimKit3Image] = usePersistentState('egitimKit3Image', '/uploaded/organizasyonel-tasarim/architecht-academy/ayrac-detaylar.png');
  const [egitimPleksi1Image, setEgitimPleksi1Image] = usePersistentState('egitimPleksi1Image', '/uploaded/organizasyonel-tasarim/architecht-academy/pleksi-1.jpeg');
  const [egitimPleksi2Image, setEgitimPleksi2Image] = usePersistentState('egitimPleksi2Image', '/uploaded/organizasyonel-tasarim/architecht-academy/pleksi-2.png');
  const [egitimPleksi3Image, setEgitimPleksi3Image] = usePersistentState('egitimPleksi3Image', '/uploaded/organizasyonel-tasarim/architecht-academy/pleksi-3.png');
  const [egitimPankart1Image, setEgitimPankart1Image] = usePersistentState('egitimPankart1Image', '/uploaded/organizasyonel-tasarim/architecht-academy/el-pankartı-1.png');
  const [egitimPankart2Image, setEgitimPankart2Image] = usePersistentState('egitimPankart2Image', '/uploaded/organizasyonel-tasarim/architecht-academy/el-pankartı-2.png');
  const [egitimPankart3Image, setEgitimPankart3Image] = usePersistentState('egitimPankart3Image', '/uploaded/organizasyonel-tasarim/architecht-academy/el-pankartı-3.png');
  const [egitimPankart4Image, setEgitimPankart4Image] = usePersistentState('egitimPankart4Image', '/uploaded/organizasyonel-tasarim/architecht-academy/el-pankartı-4.png');
  const [egitimYakaFrontImage, setEgitimYakaFrontImage] = usePersistentState('egitimYakaFrontImage', '/uploaded/organizasyonel-tasarim/architecht-academy/yaka-kartı-on.png');
  const [egitimYakaBackImage, setEgitimYakaBackImage] = usePersistentState('egitimYakaBackImage', '/uploaded/organizasyonel-tasarim/architecht-academy/yaka-kartı-arka.png');
  const [egitimVeriNimetImage, setEgitimVeriNimetImage] = usePersistentState('egitimVeriNimetImage', '/uploaded/organizasyonel-tasarim/architecht-academy/veri-nimet-kart.png');

  const [degerlerCoverImage, setDegerlerCoverImage] = usePersistentState('degerlerCoverImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/kapak.png');
  const [aiFactoryCoverImage, setAiFactoryCoverImage] = usePersistentState('aiFactoryCoverImage', '/uploaded/organizasyonel-tasarim/ai-agent/kapak.png');
  const [rdCoverImage, setRdCoverImage] = usePersistentState('rdCoverImage');
  const [egitimCoverImage, setEgitimCoverImage] = usePersistentState('egitimCoverImage', '/uploaded/organizasyonel-tasarim/architecht-academy/kapak.png');
  const [rdTechathonCoverImage, setRdTechathonCoverImage] = usePersistentState('rdTechathonCoverImage', '/uploaded/organizasyonel-tasarim/rd-techathon/kapak.png');

  const [socialGridImage, setSocialGridImage] = usePersistentState('socialGridImage', null);
  const [socialVideoImage, setSocialVideoImage] = usePersistentState('socialVideoImage', null);
  const [socialCampaignImage, setSocialCampaignImage] = usePersistentState('socialCampaignImage', null);
  const [socialGrid1Image, setSocialGrid1Image] = usePersistentState('socialGrid1Image', null);
  const [socialGrid2Image, setSocialGrid2Image] = usePersistentState('socialGrid2Image', null);
  const [socialGrid3Image, setSocialGrid3Image] = usePersistentState('socialGrid3Image', null);
  const [socialGrid4Image, setSocialGrid4Image] = usePersistentState('socialGrid4Image', null);
  const [socialGrid5Image, setSocialGrid5Image] = usePersistentState('socialGrid5Image', null);
  const [socialGrid6Image, setSocialGrid6Image] = usePersistentState('socialGrid6Image', null);
  const [socialGrid7Image, setSocialGrid7Image] = usePersistentState('socialGrid7Image', null);
  const [socialGrid8Image, setSocialGrid8Image] = usePersistentState('socialGrid8Image', null);
  const [socialGrid9Image, setSocialGrid9Image] = usePersistentState('socialGrid9Image', null);
  const [campaignSlide1Image, setCampaignSlide1Image] = usePersistentState('campaignSlide1Image', null);
  const [campaignSlide2Image, setCampaignSlide2Image] = usePersistentState('campaignSlide2Image', null);
  const [campaignSlide3Image, setCampaignSlide3Image] = usePersistentState('campaignSlide3Image', null);
  const [campaignSlide4Image, setCampaignSlide4Image] = usePersistentState('campaignSlide4Image', null);

  const [magazineIssues, setMagazineIssues] = usePersistentState('magazineIssuesData', [
    {
      id: 1,
      title: "Dergi - Sayı 01",
      pages: [
        '/uploaded/dergi/sayi1/sayfa-1.png',
        '/uploaded/dergi/sayi1/sayfa-2.png',
        '/uploaded/dergi/sayi1/sayfa-3.png',
        '/uploaded/dergi/sayi1/sayfa-4.png',
        '/uploaded/dergi/sayi1/sayfa-5.png'
      ]
    },
    {
      id: 2,
      title: "Dergi - Sayı 02",
      pages: [
        '/uploaded/dergi/sayi2/sayfa-1.png',
        '/uploaded/dergi/sayi2/sayfa-2.png',
        '/uploaded/dergi/sayi2/sayfa-3.png',
        '/uploaded/dergi/sayi2/sayfa-4.png',
        '/uploaded/dergi/sayi2/sayfa-5.png',
        '/uploaded/dergi/sayi2/sayfa-6.png',
        '/uploaded/dergi/sayi2/sayfa-7.png'
      ]
    },
    {
      id: 3,
      title: "Dergi - Sayı 03",
      pages: [
        '/uploaded/dergi/sayi3/sayfa-1.png',
        '/uploaded/dergi/sayi3/sayfa-2.png',
        '/uploaded/dergi/sayi3/sayfa-3.png',
        '/uploaded/dergi/sayi3/sayfa-4.png',
        '/uploaded/dergi/sayi3/sayfa-6.png',
        '/uploaded/dergi/sayi3/sayfa-7.png'
      ]
    },
    {
      id: 4,
      title: "Dergi - Sayı 04",
      pages: [
        '/uploaded/dergi/sayi4/sayfa-1.png',
        '/uploaded/dergi/sayi4/sayfa-2.png',
        '/uploaded/dergi/sayi4/sayfa-3.png'
      ]
    },
    {
      id: 5,
      title: "Dergi - Sayı 05",
      pages: [
        '/uploaded/dergi/sayi5/sayfa-1.png',
        '/uploaded/dergi/sayi5/sayfa-2.png',
        '/uploaded/dergi/sayi5/sayfa-3.png',
        '/uploaded/dergi/sayi5/sayfa-4.png',
        '/uploaded/dergi/sayi5/sayfa-5.png'
      ]
    }
  ]);

  const [activeSocialTab, setActiveSocialTab] = useState<'gastronomi' | 'zburada' | 'veribilimi'>('gastronomi');
  const [productsActiveIdx, setProductsActiveIdx] = useState(0);

  const [yakaActiveSlide, setYakaActiveSlide] = useState(0);
  const [chocolateActiveSlide, setChocolateActiveSlide] = useState(0);
  const [calendarMonth, setCalendarMonth] = useState(6);
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarUserDayIndex, setCalendarUserDayIndex] = useState(0);
  const [hideCalendarTexts, setHideCalendarTexts] = useState(false);

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const productsWheelTimeRef = useRef(0);
  const SOCIAL_GRID_DEFAULT_IMAGES: Record<string, string> = (() => {
    const result: Record<string, string> = {};
    for (let i = 1; i <= 9; i++) {
      result[`gastronomi_grid_${i}`] = `/uploaded/sosyal-medya/gastronomi-${i}.png`;
    }
    for (let i = 1; i <= 12; i++) {
      result[`zburada_grid_${i}`] = `/uploaded/sosyal-medya/zburada-${i}.png`;
    }
    return result;
  })();

  const [socialMediaData, setSocialMediaData] = useState<{
    images: Record<string, string>;
    captions: Record<string, string>;
    titles: Record<string, string>;
  }>(() => {
    try {
      const cachedImages = loadCachedAssets('asset_social_');
      const saved = localStorage.getItem('social_media_assets');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          images: {
            ...SOCIAL_GRID_DEFAULT_IMAGES,
            ...cachedImages,
            ...(parsed.images || {})
          },
          captions: {
            ...GASTRONOMI_CAPTIONS,
            ...ZERRA_CAPTIONS,
            ...(parsed.captions || {})
          },
          titles: {
            ...(parsed.titles || {})
          }
        };
      }
      return {
        images: { ...SOCIAL_GRID_DEFAULT_IMAGES, ...cachedImages },
        captions: {
          ...GASTRONOMI_CAPTIONS,
          ...ZERRA_CAPTIONS
        },
        titles: {}
      };
    } catch (e) {
      console.error(e);
    }
    return {
      images: { ...SOCIAL_GRID_DEFAULT_IMAGES },
      captions: {
        ...GASTRONOMI_CAPTIONS,
        ...ZERRA_CAPTIONS
      },
      titles: {}
    };
  });

  const FOTOROMAN_DEFAULT_IMAGES: Record<string, string> = {
    fotoroman_1_img_0: '/uploaded/fotoroman-projeleri/cobancık/1.png',
    fotoroman_1_img_1: '/uploaded/fotoroman-projeleri/cobancık/2.png',
    fotoroman_1_img_2: '/uploaded/fotoroman-projeleri/cobancık/3.png',
    fotoroman_1_img_3: '/uploaded/fotoroman-projeleri/cobancık/4.png',
    fotoroman_1_img_4: '/uploaded/fotoroman-projeleri/cobancık/5.png',
    fotoroman_2_img_0: '/uploaded/fotoroman-projeleri/ekmek-teknesi/1.png',
    fotoroman_2_img_1: '/uploaded/fotoroman-projeleri/ekmek-teknesi/2.png',
    fotoroman_2_img_2: '/uploaded/fotoroman-projeleri/ekmek-teknesi/3.png',
    fotoroman_2_img_3: '/uploaded/fotoroman-projeleri/ekmek-teknesi/4.png',
    fotoroman_2_img_4: '/uploaded/fotoroman-projeleri/ekmek-teknesi/5.png',
    fotoroman_3_img_0: '/uploaded/fotoroman-projeleri/herhangi-bir-yer/1.png',
    fotoroman_3_img_1: '/uploaded/fotoroman-projeleri/herhangi-bir-yer/2.png',
    fotoroman_3_img_2: '/uploaded/fotoroman-projeleri/herhangi-bir-yer/3.png',
    fotoroman_3_img_3: '/uploaded/fotoroman-projeleri/herhangi-bir-yer/4.png',
    fotoroman_3_img_4: '/uploaded/fotoroman-projeleri/herhangi-bir-yer/5.png',
    fotoroman_4_img_0: '/uploaded/fotoroman-projeleri/herhangi-bir-an/1.png',
    fotoroman_4_img_1: '/uploaded/fotoroman-projeleri/herhangi-bir-an/2.png',
    fotoroman_4_img_2: '/uploaded/fotoroman-projeleri/herhangi-bir-an/3.png',
    fotoroman_4_img_3: '/uploaded/fotoroman-projeleri/herhangi-bir-an/4.png',
    fotoroman_5_img_0: '/uploaded/fotoroman-projeleri/herhangi-biri/1.png',
    fotoroman_5_img_1: '/uploaded/fotoroman-projeleri/herhangi-biri/2.png',
    fotoroman_5_img_2: '/uploaded/fotoroman-projeleri/herhangi-biri/3.png',
    fotoroman_5_img_3: '/uploaded/fotoroman-projeleri/herhangi-biri/4.png',
  };

  const [fotoromanData, setFotoromanData] = useState<{
    images: Record<string, string>;
    activePageIdxs: Record<string, number>;
  }>(() => {
    try {
      const cachedImages = loadCachedAssets('asset_fotoroman_');
      const saved = localStorage.getItem('fotoroman_assets');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          images: {
            ...FOTOROMAN_DEFAULT_IMAGES,
            ...cachedImages,
            ...(parsed.images || {})
          }
        };
      }
      return {
        images: { ...FOTOROMAN_DEFAULT_IMAGES, ...cachedImages },
        activePageIdxs: {}
      };
    } catch (e) {
      console.error(e);
    }
    return { images: { ...FOTOROMAN_DEFAULT_IMAGES }, activePageIdxs: {} };
  });

  useEffect(() => {
    if (isLoaded) {
      setSocialMediaData(prev => {
        const updatedImages = { ...prev.images };
        let hasChanges = false;
        Object.entries(manifest).forEach(([key, val]) => {
          if ((key.includes('_grid_') || key.includes('_carousel_') || key.includes('socialGrid') || key.includes('campaignSlide')) && val) {
            if (updatedImages[key] !== val) {
              updatedImages[key] = val;
              hasChanges = true;
            }
          }
        });
        if (hasChanges) {
          return { ...prev, images: updatedImages };
        }
        return prev;
      });
    }
  }, [isLoaded, manifest]);

  useEffect(() => {
    if (isLoaded) {
      setFotoromanData(prev => {
        const updatedImages = { ...prev.images };
        let hasChanges = false;
        Object.entries(manifest).forEach(([key, val]) => {
          if (key.startsWith('fotoroman_') && val) {
            if (updatedImages[key] !== val) {
              updatedImages[key] = val;
              hasChanges = true;
            }
          }
        });
        if (hasChanges) {
          return { ...prev, images: updatedImages };
        }
        return prev;
      });
    }
  }, [isLoaded, manifest]);

  const updateFotoromanAsset = (key: string, value: string) => {
    try {
      localStorage.setItem(`asset_fotoroman_${key}`, value);
    } catch (e) {
      console.warn("Could not cache fotoroman image locally:", e);
    }

    setFotoromanData(prev => {
      const updated = {
        ...prev,
        images: {
          ...prev.images,
          [key]: value
        }
      };
      try {
        const cleanFotoroman = {
          ...updated,
          images: {}
        };
        localStorage.setItem('fotoroman_assets', JSON.stringify(cleanFotoroman));
      } catch (e) {
        console.warn("Could not save fotoroman assets to localStorage:", e instanceof Error ? e.message : e);
      }
      return updated;
    });

    if (value.startsWith('data:image/')) {
      uploadImageToServerAndGetUrl(key, value).then((serverUrl) => {
        if (serverUrl !== value) {
          saveAsset(key, serverUrl);
          try {
            localStorage.setItem(`asset_fotoroman_${key}`, serverUrl);
          } catch (e) { }
          setFotoromanData(prev => {
            const updated = {
              ...prev,
              images: {
                ...prev.images,
                [key]: serverUrl
              }
            };
            return updated;
          });
        }
      });
    }
  };

  const updateFotoromanActivePage = (fotoromanKey: string, pageIdx: number) => {
    setFotoromanData(prev => {
      const updated = {
        ...prev,
        activePageIdxs: {
          ...prev.activePageIdxs,
          [fotoromanKey]: pageIdx
        }
      };
      try {
        const cleanFotoroman = {
          ...updated,
          images: {}
        };
        localStorage.setItem('fotoroman_assets', JSON.stringify(cleanFotoroman));
      } catch (e) {
        console.warn("Could not save fotoroman active page to localStorage:", e instanceof Error ? e.message : e);
      }
      return updated;
    });
  };

  const [productsData, setProductsData] = useState<{
    images: Record<string, string>;
    titles: Record<string, string>;
    captions: Record<string, string>;
  }>(() => {
    try {
      const cachedImages = loadCachedAssets('asset_products_');
      const saved = localStorage.getItem('products_assets_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          titles: {},
          captions: {},
          ...parsed,
          images: {
            ...cachedImages,
            ...(parsed.images || {})
          }
        };
      }
      return { images: cachedImages, titles: {}, captions: {} };
    } catch (e) {
      console.error(e);
    }
    return { images: {}, titles: {}, captions: {} };
  });

  const [appsData, setAppsData] = useState<{
    images: Record<string, string>;
    titles: Record<string, string>;
    captions: Record<string, string>;
  }>(() => {
    try {
      const cachedImages = loadCachedAssets('asset_apps_');
      const saved = localStorage.getItem('apps_assets_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          titles: {},
          captions: {},
          ...parsed,
          images: {
            ...cachedImages,
            ...(parsed.images || {})
          }
        };
      }
      return { images: cachedImages, titles: {}, captions: {} };
    } catch (e) {
      console.error(e);
    }
    return { images: {}, titles: {}, captions: {} };
  });

  const [uploadTimestamp, setUploadTimestamp] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isLoaded) {
      setProductsData(prev => {
        const updatedImages = { ...prev.images };
        let hasChanges = false;
        Object.entries(manifest).forEach(([key, val]) => {
          if ((key.startsWith('products_') || key.startsWith('afis_') || key.startsWith('logo_')) && val) {
            if (updatedImages[key] !== val) {
              updatedImages[key] = val;
              hasChanges = true;
            }
          }
        });
        if (hasChanges) {
          return { ...prev, images: updatedImages };
        }
        return prev;
      });
    }
  }, [isLoaded, manifest]);

  useEffect(() => {
    if (isLoaded) {
      setAppsData(prev => {
        const updatedImages = { ...prev.images };
        let hasChanges = false;
        Object.entries(manifest).forEach(([key, val]) => {
          if ((key.startsWith('apps_') || key.startsWith('bagimsiz_')) && val) {
            if (updatedImages[key] !== val) {
              updatedImages[key] = val;
              hasChanges = true;
            }
          }
        });
        if (hasChanges) {
          return { ...prev, images: updatedImages };
        }
        return prev;
      });
    }
  }, [isLoaded, manifest]);

  const updateProductsDataField = (field: 'titles' | 'captions', key: string, val: string) => {
    setProductsData(prev => {
      const updated = {
        ...prev,
        [field]: {
          ...(prev[field] || {}),
          [key]: val
        }
      };
      try {
        const cleanProducts = {
          ...updated,
          images: {}
        };
        localStorage.setItem('products_assets_v2', JSON.stringify(cleanProducts));
      } catch (e) { }
      return updated;
    });
  };

  const updateAppsDataField = (field: 'titles' | 'captions', key: string, val: string) => {
    setAppsData(prev => {
      const updated = {
        ...prev,
        [field]: {
          ...(prev[field] || {}),
          [key]: val
        }
      };
      try {
        const cleanApps = {
          ...updated,
          images: {}
        };
        localStorage.setItem('apps_assets_v2', JSON.stringify(cleanApps));
      } catch (e) { }
      return updated;
    });
  };

  const handleProductsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && currentProductsUploadSlot.current) {
      const file = e.target.files[0];
      const slot = currentProductsUploadSlot.current;
      compressAndResizeImage(file)
        .then((compressedUrl) => {
          try {
            localStorage.setItem(`asset_products_${slot}`, compressedUrl);
          } catch (err) {
            console.warn("Could not cache products image locally:", err);
          }

          setProductsData(prev => {
            const updated = {
              ...prev,
              images: {
                ...(prev.images || {}),
                [slot]: compressedUrl
              }
            };
            try {
              localStorage.setItem('products_assets_v2', JSON.stringify({
                ...updated,
                images: {}
              }));
            } catch (err) { }
            return updated;
          });

          if (compressedUrl.startsWith('data:image/')) {
            uploadImageToServerAndGetUrl(slot, compressedUrl).then((serverUrl) => {
              if (serverUrl !== compressedUrl) {
                saveAsset(slot, serverUrl);
                try {
                  localStorage.setItem(`asset_products_${slot}`, serverUrl);
                } catch (err) { }
                setProductsData(prev => {
                  const updated = {
                    ...prev,
                    images: {
                      ...(prev.images || {}),
                      [slot]: serverUrl
                    }
                  };
                  try {
                    localStorage.setItem('products_assets_v2', JSON.stringify({
                      ...updated,
                      images: {}
                    }));
                  } catch (err) { }
                  return updated;
                });
              }
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleAppsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && currentAppsUploadSlot.current) {
      const file = e.target.files[0];
      const slot = currentAppsUploadSlot.current;
      compressAndResizeImage(file)
        .then((compressedUrl) => {
          try {
            localStorage.setItem(`asset_apps_${slot}`, compressedUrl);
          } catch (err) {
            console.warn("Could not cache apps image locally:", err);
          }

          setAppsData(prev => {
            const updated = {
              ...prev,
              images: {
                ...(prev.images || {}),
                [slot]: compressedUrl
              }
            };
            try {
              localStorage.setItem('apps_assets_v2', JSON.stringify({
                ...updated,
                images: {}
              }));
            } catch (err) { }
            return updated;
          });
          setUploadTimestamp(prev => ({ ...prev, [slot]: Date.now() }));

          if (compressedUrl.startsWith('data:image/')) {
            uploadImageToServerAndGetUrl(slot, compressedUrl).then((serverUrl) => {
              if (serverUrl !== compressedUrl) {
                saveAsset(slot, serverUrl);
                try {
                  localStorage.setItem(`asset_apps_${slot}`, serverUrl);
                } catch (err) { }
                setAppsData(prev => {
                  const updated = {
                    ...prev,
                    images: {
                      ...(prev.images || {}),
                      [slot]: serverUrl
                    }
                  };
                  try {
                    localStorage.setItem('apps_assets_v2', JSON.stringify({
                      ...updated,
                      images: {}
                    }));
                  } catch (err) { }
                  return updated;
                });
                setUploadTimestamp(prev => ({ ...prev, [slot]: Date.now() }));
              }
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const productsFileInputRef = useRef<HTMLInputElement>(null);
  const appsFileInputRef = useRef<HTMLInputElement>(null);
  const currentProductsUploadSlot = useRef<string | null>(null);
  const currentAppsUploadSlot = useRef<string | null>(null);

  const currentPhotographyUploadSlot = useRef<string | null>(null);
  const photographySingleFileInputRef = useRef<HTMLInputElement>(null);

  const updateSocialMediaAsset = (type: 'images' | 'captions' | 'titles', key: string, value: string) => {
    if (type === 'images') {
      try {
        localStorage.setItem(`asset_social_${key}`, value);
      } catch (e) {
        console.warn("Could not cache social image locally:", e);
      }
    }

    setSocialMediaData(prev => {
      const updated = {
        ...prev,
        [type]: {
          ...prev[type],
          [key]: value
        }
      };
      try {
        const cleanSocialMedia = {
          ...updated,
          images: {}
        };
        localStorage.setItem('social_media_assets', JSON.stringify(cleanSocialMedia));
      } catch (e) {
        console.warn("Could not save social media assets to localStorage:", e instanceof Error ? e.message : e);
      }
      return updated;
    });

    if (type === 'images' && value.startsWith('data:image/')) {
      uploadImageToServerAndGetUrl(key, value).then((serverUrl) => {
        if (serverUrl !== value) {
          saveAsset(key, serverUrl);
          try {
            localStorage.setItem(`asset_social_${key}`, serverUrl);
          } catch (e) { }
          setSocialMediaData(prev => {
            const updated = {
              ...prev,
              images: {
                ...prev.images,
                [key]: serverUrl
              }
            };
            return updated;
          });
        }
      });
    }
  };

  const [gastronomiCarouselIdx, setGastronomiCarouselIdx] = useState(0);
  const [zburadaCarouselIdx, setZburadaCarouselIdx] = useState(0);
  const currentUploadSlot = useRef<{ type: 'images' | 'captions' | 'titles'; key: string } | null>(null);
  const socialSingleFileInputRef = useRef<HTMLInputElement>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLockedClick = (ref: React.RefObject<HTMLInputElement | null>) => {
    // Lock secured
  };

  const [editModeStr, setEditModeStr] = usePersistentState('degerlerEditMode', 'false');
  const isLocked = true;
  const [degerlerKalbiImage, setDegerlerKalbiImage] = usePersistentState('degerlerKalbiImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/degerler-kalbi.png');
  const [degerlerKitiImage, setDegerlerKitiImage] = usePersistentState('degerlerKitiImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/degerler-kiti.jpeg');
  const [degerlerKitiBannerImage, setDegerlerKitiBannerImage] = usePersistentState('degerlerKitiBannerImage');
  const [kitDefterImage, setKitDefterImage] = usePersistentState('kitDefterImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/kitin-ici-gorunumu.png');
  const [kitStickerImage, setKitStickerImage] = usePersistentState('kitStickerImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/sticker_ceti.png');
  const [identityFontImage, setIdentityFontImage] = usePersistentState('identityFontImage');
  const identityFontFileInputRef = useRef<HTMLInputElement>(null);

  const [sepFatihImage, setSepFatihImage] = usePersistentState('sepFatihImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/seperator-1.png');
  const [sepAhiImage, setSepAhiImage] = usePersistentState('sepAhiImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/seperator-2.png');
  const [sepAliImage, setSepAliImage] = usePersistentState('sepAliImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/seperator-3.png');
  const [sepYusufImage, setSepYusufImage] = usePersistentState('sepYusufImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/seperator-4.png');
  const [sepBarbarosImage, setSepBarbarosImage] = usePersistentState('sepBarbarosImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/seperator-5.png');
  const [sepCezeriImage, setSepCezeriImage] = usePersistentState('sepCezeriImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/seperator-6.png');

  const [diaryIcSayfa1Image, setDiaryIcSayfa1Image] = usePersistentState('diaryIcSayfa1Image', '/uploaded/organizasyonel-tasarim/degerler-lansmani/defter-ic-ornek-1.png');
  const [diaryIcSayfa2Image, setDiaryIcSayfa2Image] = usePersistentState('diaryIcSayfa2Image', '/uploaded/organizasyonel-tasarim/degerler-lansmani/defter-ic-ornek-2.png');
  const [diaryVizyonImage, setDiaryVizyonImage] = usePersistentState('diaryVizyonImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/vizyon-misyon.png');
  const [diaryManifestoImage, setDiaryManifestoImage] = usePersistentState('diaryManifestoImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/manifesto.png');

  const [lanyardFrontImage, setLanyardFrontImage] = usePersistentState('lanyardFrontImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/yaka-ipi-1.png');
  const [lanyardBackImage, setLanyardBackImage] = usePersistentState('lanyardBackImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/yaka-ipi-2.png');

  const [directionFrameImage, setDirectionFrameImage] = usePersistentState('directionFrameImage', '/uploaded/organizasyonel-tasarim/degerler-lansmani/interaktif-cerceve.jpeg');
  const [mainPlacardImage, setMainPlacardImage] = usePersistentState('mainPlacardImage');
  const [placardAlt1Image, setPlacardAlt1Image] = usePersistentState('placardAlt1Image');
  const [placardAlt2Image, setPlacardAlt2Image] = usePersistentState('placardAlt2Image');
  const [placardAlt3Image, setPlacardAlt3Image] = usePersistentState('placardAlt3Image');
  const [placardAlt4Image, setPlacardAlt4Image] = usePersistentState('placardAlt4Image');
  const [placardAlt5Image, setPlacardAlt5Image] = usePersistentState('placardAlt5Image');
  const [placardAlt6Image, setPlacardAlt6Image] = usePersistentState('placardAlt6Image');
  const [secondPlacardImage, setSecondPlacardImage] = usePersistentState('secondPlacardImage');
  const [placardAlt7Image, setPlacardAlt7Image] = usePersistentState('placardAlt7Image');
  const [placardAlt8Image, setPlacardAlt8Image] = usePersistentState('placardAlt8Image');
  const [placardAlt9Image, setPlacardAlt9Image] = usePersistentState('placardAlt9Image');
  const [placardAlt10Image, setPlacardAlt10Image] = usePersistentState('placardAlt10Image');

  const [interactivePlacard1Image, setInteractivePlacard1Image] = usePersistentState('interactivePlacard1Image', '/uploaded/organizasyonel-tasarim/degerler-lansmani/el-pankartı-1.png');
  const [interactivePlacard2Image, setInteractivePlacard2Image] = usePersistentState('interactivePlacard2Image', '/uploaded/organizasyonel-tasarim/degerler-lansmani/el-pankartı-2.png');
  const [interactivePlacard3Image, setInteractivePlacard3Image] = usePersistentState('interactivePlacard3Image', '/uploaded/organizasyonel-tasarim/degerler-lansmani/el-pankartı-3.png');
  const [interactivePlacard4Image, setInteractivePlacard4Image] = usePersistentState('interactivePlacard4Image', '/uploaded/organizasyonel-tasarim/degerler-lansmani/el-pankartı-4.png');
  const [activeInteractivePlacard, setActiveInteractivePlacard] = useState<number>(1);
  const [activeCampaignSlide, setActiveCampaignSlide] = useState<number>(1);
  const [socialVideoLikes, setSocialVideoLikes] = useState<number>(1248);
  const [isSocialVideoLiked, setIsSocialVideoLiked] = useState<boolean>(false);

  const [divider1Image, setDivider1Image] = usePersistentState('divider1Image');
  const [divider2Image, setDivider2Image] = usePersistentState('divider2Image');
  const [divider3Image, setDivider3Image] = usePersistentState('divider3Image');
  const [divider4Image, setDivider4Image] = usePersistentState('divider4Image');
  const [divider5Image, setDivider5Image] = usePersistentState('divider5Image');
  const [divider6Image, setDivider6Image] = usePersistentState('divider6Image');
  const [divider7Image, setDivider7Image] = usePersistentState('divider7Image');
  const [divider8Image, setDivider8Image] = usePersistentState('divider8Image');

  const aiFactoryFileInputRef = useRef<HTMLInputElement>(null);
  const aiTunnelFileInputRef = useRef<HTMLInputElement>(null);
  const aiKioskFileInputRef = useRef<HTMLInputElement>(null);
  const rdFileInputRef = useRef<HTMLInputElement>(null);
  const egitimFileInputRef = useRef<HTMLInputElement>(null);
  const diaryFileInputRef = useRef<HTMLInputElement>(null);
  const diaryVizyonFileInputRef = useRef<HTMLInputElement>(null);
  const diaryManifestoFileInputRef = useRef<HTMLInputElement>(null);
  const diaryArkaKapakFileInputRef = useRef<HTMLInputElement>(null);
  const diaryIcSayfaFileInputRef = useRef<HTMLInputElement>(null);
  const backdropFileInputRef = useRef<HTMLInputElement>(null);

  const degerlerCoverFileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryCoverFileInputRef = useRef<HTMLInputElement>(null);
  const rdCoverFileInputRef = useRef<HTMLInputElement>(null);
  const egitimCoverFileInputRef = useRef<HTMLInputElement>(null);
  const rdTechathonCoverFileInputRef = useRef<HTMLInputElement>(null);

  const aiFactoryThemeFileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryBackdropFileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryDirectionFileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryFrameFileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryCarouselFileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryInsta2FileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryInsta3FileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryInsta4FileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryStickerFileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryBadgeFileInputRef = useRef<HTMLInputElement>(null);
  const aiFactoryTrophyFileInputRef = useRef<HTMLInputElement>(null);

  const degerlerKalbiFileInputRef = useRef<HTMLInputElement>(null);
  const degerlerKitiFileInputRef = useRef<HTMLInputElement>(null);
  const degerlerKitiBannerFileInputRef = useRef<HTMLInputElement>(null);
  const kitDefterFileInputRef = useRef<HTMLInputElement>(null);
  const kitStickerFileInputRef = useRef<HTMLInputElement>(null);

  const sepFatihFileInputRef = useRef<HTMLInputElement>(null);
  const sepAhiFileInputRef = useRef<HTMLInputElement>(null);
  const sepAliFileInputRef = useRef<HTMLInputElement>(null);
  const sepYusufFileInputRef = useRef<HTMLInputElement>(null);
  const sepBarbarosFileInputRef = useRef<HTMLInputElement>(null);
  const sepCezeriFileInputRef = useRef<HTMLInputElement>(null);

  const diaryIcSayfa1FileInputRef = useRef<HTMLInputElement>(null);
  const diaryIcSayfa2FileInputRef = useRef<HTMLInputElement>(null);

  const lanyardFrontFileInputRef = useRef<HTMLInputElement>(null);
  const lanyardBackFileInputRef = useRef<HTMLInputElement>(null);

  const directionFrameFileInputRef = useRef<HTMLInputElement>(null);
  const mainPlacardFileInputRef = useRef<HTMLInputElement>(null);
  const secondPlacardFileInputRef = useRef<HTMLInputElement>(null);
  const placardAlt1FileInputRef = useRef<HTMLInputElement>(null);
  const placardAlt2FileInputRef = useRef<HTMLInputElement>(null);
  const placardAlt3FileInputRef = useRef<HTMLInputElement>(null);
  const placardAlt4FileInputRef = useRef<HTMLInputElement>(null);
  const placardAlt5FileInputRef = useRef<HTMLInputElement>(null);
  const placardAlt6FileInputRef = useRef<HTMLInputElement>(null);
  const placardAlt7FileInputRef = useRef<HTMLInputElement>(null);
  const placardAlt8FileInputRef = useRef<HTMLInputElement>(null);
  const placardAlt9FileInputRef = useRef<HTMLInputElement>(null);
  const placardAlt10FileInputRef = useRef<HTMLInputElement>(null);

  const interactivePlacard1FileInputRef = useRef<HTMLInputElement>(null);
  const interactivePlacard2FileInputRef = useRef<HTMLInputElement>(null);
  const interactivePlacard3FileInputRef = useRef<HTMLInputElement>(null);
  const interactivePlacard4FileInputRef = useRef<HTMLInputElement>(null);

  const socialGridFileInputRef = useRef<HTMLInputElement>(null);
  const socialVideoFileInputRef = useRef<HTMLInputElement>(null);
  const socialCampaignFileInputRef = useRef<HTMLInputElement>(null);
  const socialGrid1FileInputRef = useRef<HTMLInputElement>(null);
  const socialGrid2FileInputRef = useRef<HTMLInputElement>(null);
  const socialGrid3FileInputRef = useRef<HTMLInputElement>(null);
  const socialGrid4FileInputRef = useRef<HTMLInputElement>(null);
  const socialGrid5FileInputRef = useRef<HTMLInputElement>(null);
  const socialGrid6FileInputRef = useRef<HTMLInputElement>(null);
  const socialGrid7FileInputRef = useRef<HTMLInputElement>(null);
  const socialGrid8FileInputRef = useRef<HTMLInputElement>(null);
  const socialGrid9FileInputRef = useRef<HTMLInputElement>(null);
  const campaignSlide1FileInputRef = useRef<HTMLInputElement>(null);
  const campaignSlide2FileInputRef = useRef<HTMLInputElement>(null);
  const campaignSlide3FileInputRef = useRef<HTMLInputElement>(null);
  const campaignSlide4FileInputRef = useRef<HTMLInputElement>(null);

  const divider1FileInputRef = useRef<HTMLInputElement>(null);
  const divider2FileInputRef = useRef<HTMLInputElement>(null);
  const divider3FileInputRef = useRef<HTMLInputElement>(null);
  const divider4FileInputRef = useRef<HTMLInputElement>(null);
  const divider5FileInputRef = useRef<HTMLInputElement>(null);
  const divider6FileInputRef = useRef<HTMLInputElement>(null);
  const divider7FileInputRef = useRef<HTMLInputElement>(null);
  const divider8FileInputRef = useRef<HTMLInputElement>(null);

  const MAGAZINE_DEFAULT_IMAGES: Record<string, string> = (() => {
    const totalPagesByIssue: Record<number, number> = { 1: 5, 2: 7, 3: 6, 4: 3, 5: 5 };
    const result: Record<string, string> = {};
    Object.entries(totalPagesByIssue).forEach(([issueIdStr, totalPages]) => {
      const issueId = Number(issueIdStr);
      for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
        result[`mag_issue_${issueId}_page_${pageIdx}`] = `/uploaded/dergi/sayi${issueId}/sayfa-${pageIdx + 1}.png`;
      }
    });
    return result;
  })();

  const [magazineData, setMagazineData] = useState<{
    images: Record<string, string>;
    activeViewIdxs: Record<string, number>;
    activeIssue: number;
    description: string;
    isEditingDesc: boolean;
  }>(() => {
    try {
      const cachedImages = loadCachedAssets('asset_magazine_');
      const saved = localStorage.getItem('magazine_assets_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          images: {
            ...MAGAZINE_DEFAULT_IMAGES,
            ...cachedImages,
            ...(parsed.images || {})
          }
        };
      }
      return {
        images: { ...MAGAZINE_DEFAULT_IMAGES, ...cachedImages },
        activeViewIdxs: {
          "mag_issue_1": 0,
          "mag_issue_2": 0,
          "mag_issue_3": 0,
          "mag_issue_4": 0,
          "mag_issue_5": 0,
        },
        activeIssue: 1,
        description: "Gürbüz, kaosun ortasında bir gürz ağacı mottosuyla iki ayda bir yayımlanan bir kültür, sanat and edebiyat dergisidir. Adını bir şiirde geçen \"gürz\" kelimesinden alan dergimizin yayımlanmış olan toplam 5 sayısının tamamının görsel and editoryal mizanpaj tasarımı bana aittir.",
        isEditingDesc: false
      };
    } catch (e) {
      console.error(e);
    }
    return {
      images: { ...MAGAZINE_DEFAULT_IMAGES },
      activeViewIdxs: {
        "mag_issue_1": 0,
        "mag_issue_2": 0,
        "mag_issue_3": 0,
        "mag_issue_4": 0,
        "mag_issue_5": 0,
      },
      activeIssue: 1,
      description: "Gürbüz, kaosun ortasında bir gürz ağacı mottosuyla iki ayda bir yayımlanan bir kültür, sanat and edebiyat dergisidir. Adını bir şiirde geçen \"gürz\" kelimesinden alan dergimizin yayımlanmış olan toplam 5 sayısının tamamının görsel and editoryal mizanpaj tasarımı bana aittir.",
      isEditingDesc: false
    };
  });

  useEffect(() => {
    if (isLoaded) {
      setMagazineData(prev => {
        const updatedImages = { ...prev.images };
        let hasChanges = false;
        Object.entries(manifest).forEach(([key, val]) => {
          if (key.startsWith('mag_issue_') && val) {
            if (updatedImages[key] !== val) {
              updatedImages[key] = val;
              hasChanges = true;
            }
          }
        });
        if (hasChanges) {
          return { ...prev, images: updatedImages };
        }
        return prev;
      });
    }
  }, [isLoaded, manifest]);

  const saveMagazineData = (newData: typeof magazineData) => {
    try {
      const cleanMagazine = {
        ...newData,
        images: {}
      };
      localStorage.setItem('magazine_assets_v2', JSON.stringify(cleanMagazine));
    } catch (e) {
      console.warn("Could not save magazine assets:", e);
    }
  };

  const currentMagazineUploadSlot = useRef<string | null>(null);
  const magazineFileInputRef = useRef<HTMLInputElement>(null);

  const handleMagazineUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && currentMagazineUploadSlot.current) {
      const file = e.target.files[0];
      const slot = currentMagazineUploadSlot.current;
      compressAndResizeImage(file)
        .then((compressedUrl) => {
          try {
            localStorage.setItem(`asset_magazine_${slot}`, compressedUrl);
          } catch (err) {
            console.warn("Could not cache magazine image locally:", err);
          }

          setMagazineData(prev => {
            const updated = {
              ...prev,
              images: {
                ...prev.images,
                [slot]: compressedUrl
              }
            };
            saveMagazineData(updated);
            return updated;
          });

          if (compressedUrl.startsWith('data:image/')) {
            uploadImageToServerAndGetUrl(slot, compressedUrl).then((serverUrl) => {
              if (serverUrl !== compressedUrl) {
                saveAsset(slot, serverUrl);
                try {
                  localStorage.setItem(`asset_magazine_${slot}`, serverUrl);
                } catch (err) { }
                setMagazineData(prev => {
                  const updated = {
                    ...prev,
                    images: {
                      ...prev.images,
                      [slot]: serverUrl
                    }
                  };
                  saveMagazineData(updated);
                  return updated;
                });
              }
            });
          }
        })
        .finally(() => {
          e.target.value = '';
        });
    }
  };

  const magazineIssuesConfig = [
    {
      id: 1,
      title: "GÜRBÜZ // BİRİNCİ SAYI",
      subtitle: "Gürbüz Dergisi // İki Aylık Kültür, Sanat and Edebiyat Yayını",
      views: [
        { label: "Kapak", leftPageIdx: null, rightPageIdx: 0 },
        { label: "Sayfa 1-2", leftPageIdx: 1, rightPageIdx: 2 },
        { label: "Sayfa 3-4", leftPageIdx: 3, rightPageIdx: 4 }
      ],
      totalPages: 5
    },
    {
      id: 2,
      title: "GÜRBÜZ // İKİNCİ SAYI",
      subtitle: "Gürbüz Dergisi // İki Aylık Kültür, Sanat and Edebiyat Yayını",
      views: [
        { label: "Kapak", leftPageIdx: null, rightPageIdx: 0 },
        { label: "Sayfa 1-2", leftPageIdx: 1, rightPageIdx: 2 },
        { label: "Sayfa 3-4", leftPageIdx: 3, rightPageIdx: 4 },
        { label: "Sayfa 5-6", leftPageIdx: 5, rightPageIdx: 6 }
      ],
      totalPages: 7
    },
    {
      id: 3,
      title: "GÜRBÜZ // ÜÇÜNCÜ SAYI",
      subtitle: "Gürbüz Dergisi // İki Aylık Kültür, Sanat and Edebiyat Yayını",
      views: [
        { label: "Kapak", leftPageIdx: null, rightPageIdx: 0 },
        { label: "Sayfa 1-2", leftPageIdx: 1, rightPageIdx: 2 },
        { label: "Sayfa 3-4", leftPageIdx: 3, rightPageIdx: 4 },
        { label: "Sayfa 5", leftPageIdx: 5, rightPageIdx: null }
      ],
      totalPages: 6
    },
    {
      id: 4,
      title: "GÜRBÜZ // DÖRDÜNCÜ SAYI",
      subtitle: "Gürbüz Dergisi // İki Aylık Kültür, Sanat and Edebiyat Yayını",
      views: [
        { label: "Kapak", leftPageIdx: null, rightPageIdx: 0 },
        { label: "Sayfa 1-2", leftPageIdx: 1, rightPageIdx: 2 }
      ],
      totalPages: 3
    },
    {
      id: 5,
      title: "GÜRBÜZ // BEŞİNCİ SAYI",
      subtitle: "Gürbüz Dergisi // İki Aylık Kültür, Sanat and Edebiyat Yayını",
      views: [
        { label: "Kapak", leftPageIdx: null, rightPageIdx: 0 },
        { label: "Sayfa 1-2", leftPageIdx: 1, rightPageIdx: 2 },
        { label: "Sayfa 3-4", leftPageIdx: 3, rightPageIdx: 4 }
      ],
      totalPages: 5
    }
  ];

  const playPageFlipSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const t = i / ctx.sampleRate;
        const noise = Math.random() * 2 - 1;
        let env = 0;
        if (t < 0.05) {
          env = t / 0.05;
        } else if (t < 0.15) {
          env = 1.0 - (t - 0.05) * 0.8;
        } else {
          env = 0.92 * (1.0 - (t - 0.15) / 0.25);
        }
        const paperTexture = 1.0 + 0.3 * Math.sin(t * 120) * Math.cos(t * 450);
        data[i] = noise * env * 0.15 * paperTexture;
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.35);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

      noiseNode.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseNode.start();
    } catch (e) {
      console.warn("AudioContext failed to play flip sound:", e);
    }
  };

  const renderMagazineDefaultSVG = (issueId: number, pageIdx: number) => {
    const colors = [
      { bg: "#0d0c10", border: "#A78BFA", text: "#e5e7eb", accent: "#8B5CF6" },
      { bg: "#090c0a", border: "#10B981", text: "#f0fdf4", accent: "#059669" },
      { bg: "#0b0d12", border: "#3B82F6", text: "#eff6ff", accent: "#2563EB" },
      { bg: "#0c0a09", border: "#F59E0B", text: "#fef3c7", accent: "#D97706" },
      { bg: "#0c0d10", border: "#EC4899", text: "#fdf2f8", accent: "#DB2777" }
    ];
    const col = colors[(issueId - 1) % colors.length];

    if (pageIdx === 0) {
      return (
        <div
          className="w-full h-full flex flex-col justify-between p-8 select-none text-left"
          style={{ backgroundColor: col.bg, border: `1px solid ${col.border}25`, color: col.text }}
        >
          <div className="flex justify-between items-center font-mono text-[8px]" style={{ color: col.border }}>
            <span>SAYI 0{issueId} // KAPAK</span>
            <span>EDİTÖRYAL PRESTİJ</span>
          </div>
          <div className="my-auto flex flex-col items-center text-center gap-5">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase font-black" style={{ color: `${col.border}90` }}>
              // GATO MAGAZINE
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tighter leading-none">
              KREATİF<br />
              <span style={{ color: col.border }}>SİNERJİ</span>
            </h2>
            <div className="w-12 h-[2px] mt-2" style={{ backgroundColor: col.border }} />
            <p className="font-serif italic text-xs opacity-60 mt-2 max-w-[180px]">
              Tasarım Kültürü and Geleceğin Görsel Kodları
            </p>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-4 text-[7px] font-mono opacity-50">
            <span>YIL: 2026</span>
            <span>SAYFA 01</span>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="w-full h-full flex flex-col justify-between p-8 select-none text-left"
          style={{ backgroundColor: `${col.bg}e0`, border: `1px solid ${col.border}15`, color: col.text }}
        >
          <div className="flex justify-between items-center font-mono text-[7px] opacity-40">
            <span>SAYI 0{issueId} // SAYFA 0{pageIdx}</span>
            <span>MİZANPAJ GRİDİ</span>
          </div>
          <div className="my-auto flex flex-col gap-4">
            <span className="font-mono text-[8px] tracking-wider uppercase font-bold" style={{ color: col.border }}>
              // BÖLÜM ANALİZİ
            </span>
            <h3 className="font-serif italic text-lg tracking-tight font-light">
              Estetik Formlar and Boşluğun Ritmi 0{pageIdx}
            </h3>
            <div className="flex flex-col gap-2 opacity-50">
              <div className="h-[1px] w-full bg-white/10" />
              <div className="h-[1px] w-5/6 bg-white/10" />
              <div className="h-[1px] w-4/6 bg-white/10" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] font-mono opacity-40">
            <span>GATO PUBLISHING</span>
            <span>SAYFA 0{pageIdx + 1}</span>
          </div>
        </div>
      );
    }
  };

  const handleSelectIssue = (issueNum: number) => {
    setMagazineData(prev => {
      const updated = {
        ...prev,
        activeIssue: issueNum
      };
      saveMagazineData(updated);
      return updated;
    });
    playPageFlipSound();
  };

  const handleResetIssueImages = () => {
    if (window.confirm("Bu sayının tüm yüklenmiş görsellerini sıfırlamak istediğinize emin misiniz?")) {
      setMagazineData(prev => {
        const cleanedImages = { ...prev.images };
        Object.keys(cleanedImages).forEach(key => {
          if (key.startsWith(`mag_issue_${magazineData.activeIssue}_`)) {
            delete cleanedImages[key];
          }
        });
        const updated = {
          ...prev,
          images: cleanedImages
        };
        saveMagazineData(updated);
        return updated;
      });
      playPageFlipSound();
    }
  };

  const handleGoToView = (viewIdx: number) => {
    const currentIssueConfig = magazineIssuesConfig.find(item => item.id === magazineData.activeIssue) || magazineIssuesConfig[0];
    if (viewIdx >= 0 && viewIdx < currentIssueConfig.views.length) {
      setMagazineData(prev => {
        const updated = {
          ...prev,
          activeViewIdxs: {
            ...prev.activeViewIdxs,
            [`mag_issue_${magazineData.activeIssue}`]: viewIdx
          }
        };
        saveMagazineData(updated);
        return updated;
      });
      playPageFlipSound();
    }
  };

  const handleGoToPage = (pageIdx: number) => {
    const currentIssueConfig = magazineIssuesConfig.find(item => item.id === magazineData.activeIssue) || magazineIssuesConfig[0];
    const viewIdx = currentIssueConfig.views.findIndex(v =>
      v.rightPageIdx === pageIdx || v.leftPageIdx === pageIdx
    );
    if (viewIdx !== -1) {
      handleGoToView(viewIdx);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [selectedProjectId]);

  const [egitimPankartActiveIdx, setEgitimPankartActiveIdx] = useState(0);
  const [egitimYakaFlipped, setEgitimYakaFlipped] = useState(false);

  const isEgitim = selectedProjectId === 'egitim';
  const accentColor = isEgitim ? '#FF4E00' : (categoryId === 'social-media' ? '#FF6B00' : (categoryId === 'photography' ? '#10B981' : '#00F0FF'));

  const projects: Project[] = categoryId === 'social-media' ? [
    {
      id: 'social-grid',
      num: '01',
      title: 'Küratörlü Grid Tasarımı',
      description: 'Estetik bütünlüğe sahip kurumsal Instagram grid yapıları, asimetrik boşluklar and minimal tipografik şablonlar.',
      details: {
        client: 'Kreatif Sosyal Girişimi',
        year: '2025',
        category: 'Sosyal Medya İçerikleri',
        role: 'Sanat Yönetmeni & Lead Designer',
        tools: ['Photoshop', 'Illustrator', 'Figma', 'Lightroom']
      }
    },
    {
      id: 'social-video',
      num: '02',
      title: 'Dinamik Video Şablonları',
      description: 'Yüksek dönüşüm odaklı, kinetik tipografi and akıcı geçiş efektleri barındıran dikey and yatay video kurguları.',
      details: {
        client: 'Kreatif Sosyal Girişimi',
        year: '2025',
        category: 'Sosyal Medya İçerikleri',
        role: 'Motion Designer',
        tools: ['After Effects', 'Premiere Pro', 'Midjourney', 'Luma AI']
      }
    },
    {
      id: 'social-campaign',
      num: '03',
      title: 'Kampanya Tasarımları',
      description: 'Markanın dijital vizyonunu and kurumsal ritmini yansıtan kreatif kampanya kurguları and özelleştirilmiş hikaye serileri.',
      details: {
        client: 'Kreatif Sosyal Girişimi',
        year: '2025',
        category: 'Sosyal Medya İçerikleri',
        role: 'Creative Director',
        tools: ['Figma', 'Illustrator', 'Canva', 'Runway Gen-2']
      }
    }
  ] : [
    {
      id: 'degerler',
      num: '01',
      title: 'Değerler Lansmanı',
      description: 'Marka değerlerini yalnızca anlatmak yerine deneyime dönüştüren; karakter tasarımı, üretken yapay zekâ, görsel kompozisyon, hareket tasarımı and hikâye anlatımını bir araya getiren disiplinler arası üretken proje tasrımlarıdır.',
      details: {
        client: 'Architecht',
        year: '2026',
        category: 'Organizasyonel Tasarım',
        role: 'Creative Designer',
        tools: ['Illustrator', 'Photoshop', 'After Effects', 'Canva']
      }
    },
    {
      id: 'ai-factory',
      num: '02',
      title: 'AI Agent Factory',
      description: 'Yapay zekâ odaklı eğitim programı için geliştirilen deneyim and organizasyon tasarımları.',
      details: {
        client: 'Architecht',
        year: '2026',
        category: 'Organizasyonel Tasarım',
        role: 'Experience Designer',
        tools: ['Figma', 'Illustrator', 'Midjourney', 'Kling']
      }
    },
    {
      id: 'egitim',
      num: '03',
      title: 'Architecht Academy',
      description: 'Kurumsal eğitim programlarını destekleyen bütünsel etkinlik and iletişim tasarımları.',
      details: {
        client: 'Architecht',
        year: '2025-2026',
        category: 'Kurumsal Eğitim Tasarımı',
        role: 'Graphic Designer',
        tools: ['Figma', 'Illustrator', 'Photoshop', 'Midjourney']
      }
    },
    {
      id: 'rd-techathon-2026',
      num: '04',
      title: 'R&D Techathon 2026',
      description: 'Hackathon sürecinde geliştirilen organizasyon, yönlendirme and deneyim tasarımları.',
      details: {
        client: 'Architecht',
        year: '2026',
        category: 'Organizasyonel Tasarım',
        role: 'Graphic Designer',
        tools: ['Figma', 'Illustrator', 'Three.js', 'React']
      }
    }
  ];

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setUploadedPdfUrl(reader.result);
            setUploadedPdfName(file.name);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUploadedPdfUrl(reader.result);
          setUploadedPdfName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUploadedPdf = () => {
    setUploadedPdfUrl(null);
    setUploadedPdfName(null);
  };

  const renderDegerlerDivider = () => {
    return (
      <div className="w-full flex items-center justify-center my-8 md:my-12 overflow-hidden select-none pointer-events-none opacity-90">
        <svg width="100%" height="48" viewBox="0 0 1000 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[800px]">
          <path d="M 40 10 L 60 30 L 40 50 L 20 30 Z" stroke="#38B6E3" strokeWidth="1" fill="none" />
          <path d="M 40 14 L 56 30 L 40 46 L 24 30 Z" stroke="#FF4E00" strokeWidth="1.5" fill="none" />
          <path d="M 40 18 L 52 30 L 40 42 L 28 30 Z" fill="#A31D44" />
          <path d="M 40 2 L 43 5 L 40 8 L 37 5 Z" fill="#FF4E00" />
          <path d="M 40 52 L 43 55 L 40 58 L 37 55 Z" fill="#FF4E00" />
          <path d="M 15 27 L 18 30 L 15 33 L 12 30 Z" fill="#FF4E00" />
          <path d="M 65 27 L 68 30 L 65 33 L 62 30 Z" fill="#FF4E00" />
          <path d="M 82 12 L 72 30 L 82 48" stroke="#A31D44" strokeWidth="2" fill="none" />
          <path d="M 85 12 L 90 30 L 85 48 L 78 42 L 91 30 L 78 18 Z" fill="#FF4E00" />
          <path d="M 85 15 L 110 30 L 85 45" stroke="#0062AF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 92 15 L 117 30 L 92 45" stroke="#38B6E3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 99 15 L 124 30 L 99 45" stroke="#38B6E3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="154" y1="24" x2="450" y2="24" stroke="#0062AF" strokeWidth="1" />
          <line x1="154" y1="30" x2="450" y2="30" stroke="#0062AF" strokeWidth="1" />
          <line x1="154" y1="36" x2="450" y2="36" stroke="#0062AF" strokeWidth="1" />
          <path d="M 230 24 L 235 16 L 240 24 Z" fill="#FF4E00" />
          <path d="M 260 36 L 265 28 L 270 36 Z" fill="#FF4E00" />
          <path d="M 205 24 L 210 32 L 215 24 Z" fill="#A31D44" />
          <path d="M 245 30 L 250 38 L 255 30 Z" fill="#A31D44" />
          <path d="M 480 5 L 505 30 L 480 55 L 455 30 Z" stroke="#0062AF" strokeWidth="2" fill="none" />
          <path d="M 520 5 L 545 30 L 520 55 L 495 30 Z" stroke="#0062AF" strokeWidth="2" fill="none" />
          <line x1="550" y1="24" x2="846" y2="24" stroke="#0062AF" strokeWidth="1" />
          <line x1="550" y1="30" x2="846" y2="30" stroke="#0062AF" strokeWidth="1" />
          <line x1="550" y1="36" x2="846" y2="36" stroke="#0062AF" strokeWidth="1" />
          <path d="M 770 24 L 765 16 L 760 24 Z" fill="#FF4E00" />
          <path d="M 740 36 L 735 28 L 730 36 Z" fill="#FF4E00" />
          <path d="M 795 24 L 790 32 L 785 24 Z" fill="#A31D44" />
          <path d="M 755 30 L 750 38 L 745 30 Z" fill="#A31D44" />
          <path d="M 918 12 L 928 30 L 918 48" stroke="#A31D44" strokeWidth="2" fill="none" />
          <path d="M 885 12 L 905 30 L 885 48 L 878 42 L 891 30 L 878 18 Z" fill="#FF4E00" />
          <path d="M 885 15 L 860 30 L 885 45" stroke="#0062AF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 878 15 L 853 30 L 878 45" stroke="#38B6E3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 871 15 L 846 30 L 871 45" stroke="#38B6E3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 960 10 L 980 30 L 960 50 L 940 30 Z" stroke="#38B6E3" strokeWidth="1" fill="none" />
          <path d="M 960 14 L 976 30 L 960 46 L 944 30 Z" stroke="#FF4E00" strokeWidth="1.5" fill="none" />
          <path d="M 960 18 L 972 30 L 960 42 L 948 30 Z" fill="#A31D44" />
          <path d="M 960 2 L 963 5 L 960 8 L 957 5 Z" fill="#FF4E00" />
          <path d="M 960 52 L 963 55 L 960 58 L 957 55 Z" fill="#FF4E00" />
          <path d="M 935 27 L 938 30 L 935 33 L 932 30 Z" fill="#FF4E00" />
          <path d="M 985 27 L 988 30 L 985 33 L 982 30 Z" fill="#FF4E00" />
        </svg>
      </div>
    );
  };

  const renderGeometricPattern = (
    index: number,
    imageVal: string | null,
    setImageVal: (url: string) => void,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImageVal(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
      e.target.value = '';
    };

    return (
      <div className="w-full flex flex-col items-center justify-center my-6 relative group/divider select-none">
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="w-full max-w-4xl flex items-center justify-center gap-4 px-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-[#38B6E3]/20" />

          <div
            onClick={isLocked ? undefined : () => inputRef.current?.click()}
            className={`relative ${isLocked ? 'cursor-default' : 'cursor-pointer'} transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center rounded-lg overflow-hidden border border-dashed border-white/5 bg-white/[0.01] p-1.5 min-h-[36px] max-w-full`}
            style={{ width: '850px' }}
          >
            {imageVal ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={imageVal}
                  alt={`Bölüm Ayracı ${index}`}
                  className="w-full h-auto max-h-[80px] object-contain"
                  referrerPolicy="no-referrer"
                />
                {!isLocked && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/divider:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                    <Upload className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                    <span className="font-mono text-[7px] text-[#00F0FF] tracking-wider uppercase font-bold">// GÖRSELİ DEĞİŞTİR</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="/uploaded/organizasyonel-tasarim/degerler-lansmani/geometric-pattern-divider.png"
                  alt="Geometric Pattern Divider"
                  className="w-full h-auto max-h-[48px] object-contain opacity-70 group-hover/divider:opacity-95 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                {!isLocked && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/divider:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10 rounded-md">
                    <Upload className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span className="font-mono text-[7px] text-[#00F0FF] tracking-widest font-bold uppercase">// KENDİ AYRAÇ GÖRSELİNİ YÜKLE</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/10 to-[#38B6E3]/20" />
        </div>
      </div>
    );
  };

  const renderIdentityGraphic = () => (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#09090b]/90 to-black/95 rounded-2xl relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,240,255,0.015)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none z-0" />
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 items-start mt-1">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M 6 1 L 11 6 L 6 11 L 1 6 Z" stroke="#FF4E00" strokeWidth="1" fill="#A31D44" />
                <circle cx="6" cy="6" r="1.5" fill="#00F0FF" />
              </svg>
              <span className="font-serif italic text-xs sm:text-sm text-[#FF4E20] font-medium tracking-wide">
                Renk Paleti
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full max-w-[160px]">
              {[
                { hex: '#1D2F6F', rgb: '29, 47, 111', name: 'Navy' },
                { hex: '#0062AF', rgb: '0, 98, 175', name: 'Royal' },
                { hex: '#38B6E3', rgb: '56, 182, 227', name: 'Cyan' },
                { hex: '#A31D44', rgb: '163, 29, 68', name: 'Crimson' },
                { hex: '#FF4E00', rgb: '255, 78, 0', name: 'Orange' },
                { hex: '#FFFFFF', rgb: '255, 255, 255', name: 'White' }
              ].map((swatch, idx) => (
                <div
                  key={idx}
                  className="group/swatch relative w-full h-5 sm:h-6 flex items-center justify-between px-2 rounded-[2px] transition-all duration-300 hover:scale-[1.02] shadow-inner"
                  style={{ backgroundColor: swatch.hex }}
                >
                  <span className={`font-mono text-[7px] font-bold tracking-wider select-none ${swatch.hex === '#FFFFFF' ? 'text-neutral-900' : 'text-white/60 group-hover/swatch:text-white transition-colors'}`}>
                    {swatch.hex}
                  </span>
                  <span className={`font-mono text-[6px] select-none ${swatch.hex === '#FFFFFF' ? 'text-neutral-600' : 'text-white/30 group-hover/swatch:text-white/50'}`}>
                    {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M 6 1 L 11 6 L 6 11 L 1 6 Z" stroke="#FF4E00" strokeWidth="1" fill="#A31D44" />
                <circle cx="6" cy="6" r="1.5" fill="#00F0FF" />
              </svg>
              <span className="font-serif italic text-xs sm:text-sm text-[#FF4E20] font-medium tracking-wide">
                Font
              </span>
            </div>
            <div className="w-full bg-[#38B6E3]/5 border border-[#38B6E3]/20 rounded-xl p-3 sm:p-4 flex flex-col gap-1.5 relative select-none shadow-[inset_0_1px_10px_rgba(56,182,227,0.05)]">
              <div className="absolute inset-2 bg-[radial-gradient(rgba(56,182,227,0.15)_0.5px,transparent_0.5px)] bg-[size:6px_6px] pointer-events-none" />
              <span className="font-serif italic text-base sm:text-xl text-white tracking-wide block leading-none text-center">
                Armstrong
              </span>
              <div className="w-full h-[0.5px] bg-[#38B6E3]/20 my-1" />
              <p className="font-mono text-[6px] sm:text-[7px] text-[#38B6E3] tracking-[0.2em] uppercase text-center leading-normal">
                A B C D E F G H I J K L M N O P R S T U V Y Z
              </p>
              <p className="font-mono text-[6px] sm:text-[7px] text-white/50 tracking-[0.15em] text-center leading-normal mt-0.5">
                a b c d e f g h i j k l m n o p r s t u v y z
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-[#38B6E3]/5 border border-[#38B6E3]/15 rounded-xl p-3 text-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <p className="font-sans text-[9px] sm:text-[10px] text-white/80 leading-relaxed font-light">
            Klasik kurumsal renklerin dışına çıkarak, bu lansmanın ruhuna uygun <span className="text-[#38B6E3] font-medium">dinamik bir alternatif palet</span> belirledim. Kullandığım soyut desenleri ise kurumun köklü, geleneksel değerleri ile geleceğe uzanan vizyonu arasında bir köprü olarak kurguladım.
          </p>
        </div>
        <div className="w-full mt-2 flex justify-center">
          <svg viewBox="0 0 400 24" className="w-full h-6 opacity-95 max-w-[280px]">
            <line x1="50" y1="12" x2="160" y2="12" stroke="#0062AF" strokeWidth="0.75" />
            <line x1="240" y1="12" x2="350" y2="12" stroke="#0062AF" strokeWidth="0.75" />
            <path d="M 80 8 L 70 12 L 80 16" fill="none" stroke="#FF4E00" strokeWidth="1" />
            <path d="M 85 8 L 75 12 L 85 16" fill="none" stroke="#0062AF" strokeWidth="1" />
            <path d="M 320 8 L 330 12 L 320 16" fill="none" stroke="#FF4E00" strokeWidth="1" />
            <path d="M 315 8 L 325 12 L 315 16" fill="none" stroke="#0062AF" strokeWidth="1" />
            <path d="M 180 6 L 186 12 L 180 18 L 174 12 Z" fill="#A31D44" stroke="#FF4E00" strokeWidth="0.75" />
            <path d="M 200 4 L 208 12 L 200 20 L 192 12 Z" fill="none" stroke="#0062AF" strokeWidth="1" />
            <path d="M 200 7 L 205 12 L 200 17 L 195 12 Z" fill="#38B6E3" />
            <path d="M 220 6 L 226 12 L 220 18 L 214 12 Z" fill="#A31D44" stroke="#FF4E00" strokeWidth="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );

  const renderEgitimIdentityGraphic = () => (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#060b18]/95 to-black/95 rounded-2xl relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,78,0,0.015)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none z-0" />
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 items-start mt-1">
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 mb-3">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M 6 1 L 11 6 L 6 11 L 1 6 Z" stroke="#FF4E00" strokeWidth="1" fill="#FF4E00" />
                <circle cx="6" cy="6" r="1.5" fill="#3AC5E6" />
              </svg>
              <span className="font-serif italic text-xs sm:text-sm text-[#FF4E00] font-medium tracking-wide">
                Renk Paleti
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full max-w-[160px]">
              {[
                { hex: '#000000', name: 'Siyah' },
                { hex: '#0C1033', name: 'Lacivert' },
                { hex: '#13227A', name: 'Koyu Mavi' },
                { hex: '#3AC5E6', name: 'Açık Mavi' },
                { hex: '#FF4E00', name: 'Turuncu' },
                { hex: '#F5F7FA', name: 'Beyaz/Gri' }
              ].map((swatch, idx) => (
                <div
                  key={idx}
                  className="group/swatch relative w-full h-5 sm:h-6 flex items-center justify-between px-2 rounded-[2px] transition-all duration-300 hover:scale-[1.02] shadow-inner border border-white/5"
                  style={{ backgroundColor: swatch.hex }}
                >
                  <span className="font-mono text-[7px] font-bold tracking-wider select-none text-white/70 group-hover/swatch:text-white transition-colors">
                    {swatch.hex}
                  </span>
                  <span className="font-sans text-[6px] select-none text-white/40 tracking-tight">
                    {swatch.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 mb-3">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M 6 1 L 11 6 L 6 11 L 1 6 Z" stroke="#FF4E00" strokeWidth="1" fill="#FF4E00" />
                <circle cx="6" cy="6" r="1.5" fill="#3AC5E6" />
              </svg>
              <span className="font-serif italic text-xs sm:text-sm text-[#FF4E00] font-medium tracking-wide">
                Fontlar
              </span>
            </div>
            <div className="w-full bg-[#FF4E00]/5 border border-[#FF4E00]/20 rounded-xl p-3 sm:p-4 flex flex-col gap-2 relative select-none shadow-[inset_0_1px_10px_rgba(255,78,0,0.05)]">
              <div className="absolute inset-2 bg-[radial-gradient(rgba(255,78,0,0.15)_0.5px,transparent_0.5px)] bg-[size:6px_6px] pointer-events-none" />
              <div className="flex flex-col gap-1 text-center font-sans">
                <div className="border-b border-white/5 pb-1">
                  <span className="font-bold text-[8px] text-white tracking-widest block font-mono uppercase">BROILINK DEMO</span>
                  <span className="text-[6px] text-[#FF4E00]/70 font-mono tracking-widest uppercase">// AKADEMİK YIL</span>
                </div>
                <div className="border-b border-white/5 pb-1">
                  <span className="font-bold text-[8px] text-white tracking-widest block font-mono uppercase">ALTERNITY</span>
                  <span className="text-[6px] text-[#FF4E00]/70 font-mono tracking-widest uppercase">// 2025-2026</span>
                </div>
                <div className="border-b border-white/5 pb-1">
                  <span className="font-bold text-[8px] text-white tracking-wider block">All Round Gothic</span>
                  <span className="text-[6px] text-[#FF4E00]/70 font-mono tracking-widest uppercase">// AKADEMİK YIL</span>
                </div>
                <div className="border-b border-white/5 pb-1">
                  <span className="italic text-[9px] text-white font-serif block">Caveat</span>
                  <span className="text-[6px] text-[#FF4E00]/70 font-mono tracking-widest uppercase">// AKADEMİK YIL</span>
                </div>
                <div>
                  <span className="italic text-[9px] text-white font-serif block">Dancing Script</span>
                  <span className="text-[6px] text-[#FF4E00]/70 font-mono tracking-widest uppercase">// HOŞ GELDİNİZ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-[#FF4E00]/5 border border-[#FF4E00]/15 rounded-xl p-3 text-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <p className="font-sans text-[9px] sm:text-[10px] text-white/80 leading-relaxed font-light">
            Kurumsal renklerin ciddiyetini simgeleyen koyu lacivert ile gelişimin enerjisini temsil eden canlı turuncuyu modern ve el yazısı yazı tipleriyle dengeli bir şekilde harmanladım.
          </p>
        </div>
      </div>
    </div>
  );

  const renderHeartGraphic = () => (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 bg-transparent relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(56,182,227,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
      <div className="relative z-10 w-full h-full flex items-center justify-center max-w-[340px] max-h-[340px] aspect-square">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#38B6E3]">
          <defs>
            <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38B6E3" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#38B6E3" stopOpacity="0" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#heartGlow)" />
          <g filter="url(#glow)">
            <path d="M 200 120 L 110 180 L 140 280 L 200 340 L 260 280 L 290 180 Z" fill="none" stroke="#38B6E3" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
            <path d="M 200 120 L 200 340 M 110 180 L 290 180 M 140 280 L 260 280" fill="none" stroke="#38B6E3" strokeWidth="0.5" opacity="0.2" />
            <circle cx="200" cy="120" r="12" fill="#0c0c0f" stroke="#38B6E3" strokeWidth="2" />
            <circle cx="110" cy="180" r="12" fill="#0c0c0f" stroke="#38B6E3" strokeWidth="2" />
            <circle cx="290" cy="180" r="12" fill="#0c0c0f" stroke="#38B6E3" strokeWidth="2" />
            <circle cx="140" cy="280" r="12" fill="#0c0c0f" stroke="#38B6E3" strokeWidth="2" />
            <circle cx="260" cy="280" r="12" fill="#0c0c0f" stroke="#38B6E3" strokeWidth="2" />
            <circle cx="200" cy="340" r="10" fill="#0c0c0f" stroke="#A31D44" strokeWidth="2" />
            <circle cx="200" cy="200" r="28" fill="#0c0c0f" stroke="#38B6E3" strokeWidth="2.5" />
          </g>
          <text x="200" y="204" fontFamily="monospace" fontSize="8" fill="#38B6E3" textAnchor="middle" fontWeight="bold" letterSpacing="1">MİSYON</text>
          <text x="200" y="95" fontFamily="monospace" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold" letterSpacing="1">GÜVEN</text>
          <text x="70" y="184" fontFamily="monospace" fontSize="8" fill="white" textAnchor="end" fontWeight="bold" letterSpacing="1">MÜŞTERİ ODAKLILIK</text>
          <text x="330" y="184" fontFamily="monospace" fontSize="8" fill="white" textAnchor="start" fontWeight="bold" letterSpacing="1">ÇEVİK TAKIM</text>
          <text x="95" y="284" fontFamily="monospace" fontSize="8" fill="white" textAnchor="end" fontWeight="bold" letterSpacing="1">SÜREKLİ GELİŞİM</text>
          <text x="305" y="284" fontFamily="monospace" fontSize="8" fill="white" textAnchor="start" fontWeight="bold" letterSpacing="1">YENİLİKÇİLİK</text>
          <text x="200" y="365" fontFamily="monospace" fontSize="8" fill="#FF4E00" textAnchor="middle" fontWeight="bold" letterSpacing="1">KÜLTÜR LANSMANI</text>
        </svg>
      </div>
      <div className="absolute bottom-4 text-center z-10">
        <span className="font-mono text-[8px] text-neutral-400 tracking-[0.2em] uppercase block font-semibold">
          DEĞERLER KALBİ (ORGANİK BÜTÜNLEŞİK YAPI)
        </span>
        <span className="font-mono text-[6px] text-[#38B6E3] tracking-widest uppercase block mt-1 font-medium">
          GÜVEN • MÜŞTERİ ODAKLILIK • ÇEVİK TAKIM RUHU • SÜREKLİ GELİŞİM • YENİLİKÇİLİK
        </span>
      </div>
    </div>
  );

  const renderKitImages = () => (
    <div className="w-full h-full grid grid-cols-2 gap-4 p-4 sm:p-6 bg-transparent select-none">
      <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-neutral-950/30 flex flex-col items-center justify-center aspect-[3/4.2] p-4 shadow-2xl group/kit0">
        <svg viewBox="0 0 200 280" className="w-full h-full text-[#38B6E3] opacity-80">
          <rect x="10" y="10" width="180" height="260" rx="12" fill="#08080a" stroke="#38B6E3" strokeWidth="1.5" />
          <line x1="10" y1="50" x2="190" y2="50" stroke="#38B6E3" strokeWidth="0.5" strokeDasharray="2,2" />
          <circle cx="100" cy="130" r="30" fill="none" stroke="#38B6E3" strokeWidth="1" />
          <path d="M 85 130 L 115 130 M 100 115 L 100 145" stroke="#38B6E3" strokeWidth="1" />
          <text x="100" y="210" fontFamily="monospace" fontSize="8" fill="white" textAnchor="middle" letterSpacing="1.5">LANSMAN KİTİ</text>
          <text x="100" y="222" fontFamily="monospace" fontSize="6" fill="#38B6E3" textAnchor="middle" letterSpacing="1">KAPAK TASARIMI</text>
          <text x="100" y="245" fontFamily="monospace" fontSize="4" fill="white" opacity="0.3" textAnchor="middle">ARCHITECHT KÜLTÜR // 2026</text>
        </svg>
        <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-mono text-[#38B6E3] tracking-wider font-bold">
          DIŞ KAPAK
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-neutral-950/30 flex flex-col items-center justify-center aspect-[3/4.2] p-4 shadow-2xl group/kit1">
        <svg viewBox="0 0 200 280" className="w-full h-full text-[#38B6E3] opacity-80">
          <rect x="10" y="10" width="180" height="260" rx="12" fill="#08080a" stroke="#38B6E3" strokeWidth="1" strokeDasharray="3,3" />
          <rect x="25" y="30" width="150" height="50" rx="6" fill="#121216" stroke="white" strokeWidth="0.5" opacity="0.1" />
          <rect x="25" y="90" width="150" height="50" rx="6" fill="#121216" stroke="white" strokeWidth="0.5" opacity="0.1" />
          <rect x="25" y="150" width="150" height="50" rx="6" fill="#121216" stroke="white" strokeWidth="0.5" opacity="0.1" />
          <line x1="35" y1="45" x2="165" y2="45" stroke="#38B6E3" strokeWidth="1.5" />
          <line x1="35" y1="55" x2="115" y2="55" stroke="white" strokeWidth="1" opacity="0.4" />
          <circle cx="45" cy="115" r="10" fill="#38B6E3" opacity="0.2" />
          <line x1="65" y1="110" x2="155" y2="110" stroke="white" strokeWidth="1" opacity="0.8" />
          <line x1="65" y1="120" x2="125" y2="120" stroke="white" strokeWidth="0.5" opacity="0.4" />
          <text x="100" y="222" fontFamily="monospace" fontSize="8" fill="white" textAnchor="middle" letterSpacing="1.5">SET VE İÇERİK</text>
          <text x="100" y="235" fontFamily="monospace" fontSize="6" fill="#38B6E3" textAnchor="middle" letterSpacing="1">KİTAPÇIK DETAYI</text>
        </svg>
        <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-mono text-[#38B6E3] tracking-wider font-bold">
          İÇERİK VE SET
        </div>
      </div>
    </div>
  );

  const renderKitGraphic = () => (
    <div className="w-full h-full flex flex-col justify-between p-6">
      <div className="grid grid-cols-12 gap-4 items-center my-auto">
        <div className="col-span-5 flex flex-col items-center">
          <div className="w-24 h-32 border border-[#00F0FF]/30 bg-white/[0.01] rounded-xl p-3 flex flex-col justify-between relative shadow-xl">
            <div className="w-10 h-2 bg-neutral-800 rounded-full mx-auto" />
            <div className="w-full aspect-square border border-dashed border-[#00F0FF]/25 rounded flex items-center justify-center bg-black/40">
              <span className="font-mono text-[7px] text-[#00F0FF]/70">BRAND EMBLEM</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/5 pt-2">
              <span className="font-mono text-[5px] text-white/30">BEZ KESE // 100% ECO</span>
              <span className="font-mono text-[5px] text-[#00F0FF] font-bold">RELEASED</span>
            </div>
          </div>
        </div>
        <div className="col-span-7 flex flex-col gap-3">
          <span className="font-mono text-[8px] text-[#00F0FF] tracking-widest uppercase">// STICKER SET & MIKRO TASARIM</span>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full border border-dashed border-white/10 flex items-center justify-center bg-white/5">
              <span className="font-mono text-[6px] text-white/40">GÜVEN</span>
            </div>
            <div className="w-8 h-8 rounded-lg border border-dashed border-[#FF4E20]/30 flex items-center justify-center bg-[#FF4E20]/5">
              <span className="font-mono text-[6px] text-[#FF4E20]/80">ÇEVİK</span>
            </div>
            <div className="w-8 h-8 rotate-12 rounded border border-dashed border-[#00F0FF]/30 flex items-center justify-center bg-[#00F0FF]/5">
              <span className="font-mono text-[6px] text-[#00F0FF]/80">YENİ</span>
            </div>
          </div>
          <p className="font-sans text-[10px] text-white/45 leading-relaxed font-light">
            Katılımcıların ilk andan itibaren aidiyet hissetmelerini sağlayan, kurumsal logolardan oluşan sticker seti, anahtarlık and broş gibi mikro tasarım nesneleri.
          </p>
        </div>
      </div>
    </div>
  );

  const renderSeparatorsGraphic = () => (
    <div className="w-full h-full flex flex-col justify-between p-4">
      <div className="grid grid-cols-4 gap-3 my-auto">
        {[
          { name: 'Al-Jazari', val: 'TEKNOLOJİ', dec: 'Mimar' },
          { name: 'Da Vinci', val: 'TASARIM', dec: 'Sanatçı' },
          { name: 'Tesla', val: 'YENİLİKÇİLİK', dec: 'Mucit' },
          { name: 'Architecht', val: 'GELECEK', dec: 'Vizyon' }
        ].map((item, idx) => (
          <div key={idx} className="aspect-[3/4.5] border border-white/10 bg-[#07070a]/80 rounded-lg p-2.5 flex flex-col justify-between relative group/card transition-all duration-300 hover:border-[#00F0FF]/30 hover:-translate-y-1">
            <div className="absolute top-1.5 left-1.5 font-mono text-[5px] text-white/20">0{idx + 1}</div>
            <div className="w-full aspect-square border border-dashed border-white/5 rounded bg-black/50 flex flex-col items-center justify-center p-1">
              <span className="font-serif italic text-[8px] text-[#00F0FF]">{item.name}</span>
              <span className="font-mono text-[4px] text-white/30 block mt-0.5">{item.dec.toUpperCase()}</span>
            </div>
            <div className="border-t border-white/5 pt-1.5 text-left">
              <span className="font-mono text-[5px] text-white/40 block">DEĞER:</span>
              <span className="font-mono text-[6px] text-white/80 font-bold block truncate">{item.val}</span>
            </div>
          </div>
        ))}
      </div>
      <span className="font-mono text-[6px] text-white/35 text-center block mt-2">// SEPERATÖRLER & LİDER DEFTER İÇ SAYFA DETAYLARI</span>
    </div>
  );

  const renderSpatialGraphic = () => (
    <div className="w-full h-full flex flex-col justify-between p-5">
      <div className="border border-white/5 bg-black/40 rounded-xl p-4 flex-1 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-3 left-3 font-mono text-[7px] text-[#00F0FF]">// BACKDROP SİMÜLASYONU</div>
        <div className="absolute bottom-3 right-3 font-mono text-[6px] text-white/35">STAND SCALE 1:100</div>
        <div className="my-auto flex justify-center items-center h-28 relative">
          <div className="absolute bottom-2 w-full h-[1px] bg-white/15" />
          <div className="w-48 h-20 bg-gradient-to-r from-neutral-900 to-[#07070a] border border-white/10 rounded relative z-10 flex flex-col justify-between p-2.5 shadow-2xl">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[5px] text-[#00F0FF]">// ARCHITECHT</span>
              <span className="font-mono text-[5px] text-white/30">16:9 RATIO</span>
            </div>
            <div className="w-full h-[1px] bg-dashed bg-white/5 my-1" />
            <div className="flex justify-between items-end">
              <span className="font-serif italic text-[10px] text-white">Değerler Lansmanı</span>
              <span className="font-mono text-[4px] text-white/40">EST. 2026</span>
            </div>
          </div>
          <div className="w-14 h-16 border border-dashed border-[#00F0FF]/40 bg-[#00F0FF]/5 rounded ml-4 relative z-10 flex flex-col justify-center items-center p-1.5 shadow-lg rotate-3">
            <span className="font-mono text-[4px] text-[#00F0FF] text-center font-bold">FOTOĞRAF ÇERÇEVESİ</span>
            <span className="font-mono text-[3px] text-white/50 text-center mt-1">Sürecin Bir Parçası Ol</span>
          </div>
          <div className="absolute left-10 bottom-2 z-20 flex gap-2">
            <div className="w-3 h-10 border border-white/20 bg-white/5 rounded-full" />
            <div className="w-3.5 h-12 border border-[#00F0FF]/30 bg-[#00F0FF]/5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderWayfindingGraphic = () => (
    <div className="w-full h-full flex flex-col justify-between p-5">
      <div className="grid grid-cols-12 gap-4 items-center my-auto">
        <div className="col-span-4 flex justify-center">
          <div className="w-12 h-36 border border-white/10 bg-[#0c0c0f] rounded p-1.5 flex flex-col justify-between relative shadow-2xl">
            <div className="border border-[#00F0FF]/25 bg-[#00F0FF]/5 rounded p-1 text-center">
              <span className="font-mono text-[5px] text-[#00F0FF] block">GÜVEN</span>
            </div>
            <div className="border border-white/5 rounded p-1 text-center">
              <span className="font-mono text-[4px] text-white/50 block">ÇEVİKLİK</span>
            </div>
            <div className="border border-[#FF4E20]/25 bg-[#FF4E20]/5 rounded p-1 text-center">
              <span className="font-mono text-[4px] text-[#FF4E20] block">YENİLİK</span>
            </div>
            <div className="border-t border-white/5 pt-1.5 text-center">
              <span className="font-mono text-[4px] text-white/30 block">MESAJ TOTEMİ</span>
            </div>
          </div>
        </div>
        <div className="col-span-8 flex flex-col gap-3">
          <span className="font-mono text-[8px] text-[#00F0FF] tracking-widest uppercase">// EL PANKARTLARI & SLOGANLAR</span>
          <div className="flex flex-col gap-1.5">
            <div className="border border-dashed border-white/10 bg-white/[0.01] rounded-lg py-1.5 px-3 text-left">
              <span className="font-mono text-[5px] text-white/30 uppercase block">SLOGAN 01 //</span>
              <span className="font-mono text-[8px] text-white/80 font-bold">"Teknolojinin Mimarı, Geleceğin İmzası Sensin!"</span>
            </div>
            <div className="border border-dashed border-[#FF4E20]/20 bg-[#FF4E20]/5 rounded-lg py-1.5 px-3 text-left">
              <span className="font-mono text-[5px] text-[#FF4E20] uppercase block">SLOGAN 02 //</span>
              <span className="font-mono text-[8px] text-white/80 font-bold">"Birlikte, Yaşayan Bir Kültür Üretiyoruz"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAiStrategyGraphic = () => (
    <div className="w-full h-full flex flex-col justify-center items-center relative p-6">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
      <div className="border border-white/5 bg-black/50 rounded-2xl p-4 w-full h-full flex flex-col justify-between relative overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[8px] text-[#00F0FF] tracking-widest uppercase">// AI INTERACTIVE STATION MAP</span>
          <span className="font-mono text-[6px] text-white/30">SCALE 1:50</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-auto text-center">
          <div className="border border-dashed border-[#00F0FF]/30 bg-[#00F0FF]/5 rounded-xl p-2">
            <Cpu className="w-6 h-6 text-[#00F0FF] mx-auto mb-1 animate-pulse" />
            <span className="font-mono text-[6px] text-white/60 block uppercase font-bold">PORTRAIT GENERATOR</span>
          </div>
          <div className="border border-dashed border-white/10 bg-white/[0.02] rounded-xl p-2">
            <Cpu className="w-6 h-6 text-white/45 mx-auto mb-1" />
            <span className="font-mono text-[6px] text-white/45 block uppercase">TRANSPARENT LED</span>
          </div>
          <div className="border border-dashed border-[#FF4E20]/30 bg-[#FF4E20]/5 rounded-xl p-2">
            <Cpu className="w-6 h-6 text-[#FF4E20] mx-auto mb-1" />
            <span className="font-mono text-[6px] text-white/60 block uppercase font-bold">AGENT RUNTIME</span>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-white/5 pt-2">
          <span className="font-mono text-[5px] text-white/30">SYSTEM: STATIC & EVENT TRIGGERED</span>
          <span className="font-mono text-[5px] text-[#00F0FF] font-bold">ACTIVE REGION</span>
        </div>
      </div>
    </div>
  );

  const renderAiTunnelGraphic = () => (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-44 h-44 drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">
        <defs>
          <linearGradient id="tunnelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#07070a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="10" y1="10" x2="50" y2="50" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.5" />
        <line x1="90" y1="10" x2="50" y2="50" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.5" />
        <line x1="10" y1="90" x2="50" y2="50" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.5" />
        <line x1="90" y1="90" x2="50" y2="50" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.5" />

        <rect x="15" y="15" width="70" height="70" fill="none" stroke="url(#tunnelGrad)" strokeWidth="1" />
        <rect x="25" y="25" width="50" height="50" fill="none" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="0.75" />
        <rect x="35" y="35" width="30" height="30" fill="none" stroke="rgba(255, 78, 32, 0.3)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="5" fill="none" stroke="#00F0FF" strokeWidth="1" className="animate-pulse" />
      </svg>
      <span className="font-mono text-[7px] text-white/45 tracking-widest uppercase mt-2">// DIGITAL TUNNEL perspective simulation</span>
    </div>
  );

  const renderAiKioskGraphic = () => (
    <div className="w-full h-full flex flex-col justify-between p-6">
      <div className="border border-white/5 bg-black/60 rounded-xl p-4 flex-1 flex flex-col justify-between relative overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[6px] text-white/35">// LED AND KIOSK INTERFACE UX</span>
          <span className="font-mono text-[6px] text-[#00F0FF] font-bold">1920x1080 S-GRID</span>
        </div>

        <div className="my-auto flex flex-col gap-2">
          <div className="w-3/4 h-1.5 bg-neutral-800 rounded" />
          <div className="w-1/2 h-1 bg-neutral-800 rounded" />
          <div className="grid grid-cols-4 gap-2 mt-2">
            <div className="h-6 border border-dashed border-[#00F0FF]/30 bg-[#00F0FF]/5 rounded flex items-center justify-center">
              <span className="font-mono text-[5px] text-[#00F0FF]">PORTRAIT</span>
            </div>
            <div className="h-6 border border-dashed border-white/10 bg-white/[0.01] rounded flex items-center justify-center">
              <span className="font-mono text-[5px] text-white/30">MODEL</span>
            </div>
            <div className="h-6 border border-dashed border-white/10 bg-white/[0.01] rounded flex items-center justify-center">
              <span className="font-mono text-[5px] text-white/30">CATALOG</span>
            </div>
            <div className="h-6 border border-dashed border-white/10 bg-white/[0.01] rounded flex items-center justify-center">
              <span className="font-mono text-[5px] text-white/30">FINISH</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/5 my-1" />
        <span className="font-mono text-[5px] text-white/30 text-left">LED KIOSK INTEGRATION PLATFORM VERSION 4.0</span>
      </div>
    </div>
  );

  const renderFotoromanDefaultSVG = (fotoromanIdx: number, pageIdx: number) => {
    if (fotoromanIdx === 1) {
      if (pageIdx === 0) {
        return (
          <div className="w-full h-full bg-[#050508] border border-[#10B981]/10 flex flex-col justify-between p-6 select-none font-sans text-white/90 text-left">
            <div className="flex justify-between items-center font-mono text-[7px] text-[#10B981]">
              <span>[KAPAK] // BÖLÜM 01</span>
              <span>DEĞER: GÜVEN</span>
            </div>
            <div className="my-auto flex flex-col items-center gap-4 text-center">
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#10B981]/40 uppercase font-black">// AHİ EVRAN</span>
              <h2 className="font-serif italic text-2xl tracking-tight text-white/90">İnançla Yükselen Güven</h2>
              <p className="font-sans text-[8px] max-w-[150px] text-white/40 leading-relaxed font-light">"Söylediğimizi yapar, yaptığımızı sahipleniriz."</p>
              <div className="w-8 h-[1px] bg-[#10B981]/20" />
            </div>
            <div className="flex justify-between items-end font-mono text-[6px] text-white/20">
              <span>EDİTÖRYAL: GÜVEN</span>
              <span>SAYFA: A5_GRID</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 1) {
        return (
          <div className="w-full h-full bg-[#050508] border border-[#10B981]/10 flex flex-col justify-between p-5 select-none font-sans text-white/90 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
              <span>SAYFA 01 // DEĞER TEMELİ</span>
              <span>LİDER: AHİ EVRAN</span>
            </div>
            <div className="flex-1 my-4 grid grid-cols-2 gap-3 items-center">
              <div className="h-full border border-dashed border-white/5 bg-white/[0.01] flex items-center justify-center relative p-3">
                <div className="absolute inset-2 border border-white/[0.02]" />
                <span className="font-mono text-[6px] text-white/25">[GÜVEN 1.A]</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-serif italic text-[11px] text-white">Sahiplenme</span>
                <p className="font-sans text-[6px] text-white/40 leading-relaxed font-light">
                  Ahi Evran teşkilatının dürüstlük ve güven ilkesi, işimizdeki en sarsılmaz temeli çizer.
                </p>
                <div className="h-[2px] w-6 bg-[#10B981]/30" />
              </div>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
              <span>GÜVEN DEĞERİ</span>
              <span>A5_PORTRAIT_01</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 2) {
        return (
          <div className="w-full h-full bg-[#050508] border border-[#10B981]/10 flex flex-col justify-between p-6 select-none font-sans text-white/90 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
              <span>SAYFA 02 // MANİFESTO</span>
              <span>ODAK: İNANÇ</span>
            </div>
            <div className="my-auto text-left flex flex-col gap-3">
              <span className="font-mono text-[14px] text-[#10B981]/30 font-bold">"</span>
              <p className="font-serif italic text-sm text-white/80 leading-relaxed font-light">
                Güven bir sözleşme değil, dürüst bir duruştur. Söylediğini yapanlar, yarını inançla inşa ederler.
              </p>
              <span className="font-mono text-[6px] text-white/30 tracking-widest uppercase mt-1">// KURUMSAL KÜLTÜR</span>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
              <span>GÜVEN DEĞERİ</span>
              <span>A5_PORTRAIT_02</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 3) {
        return (
          <div className="w-full h-full bg-[#050508] border border-[#10B981]/10 flex flex-col justify-between p-5 select-none font-sans text-white/90 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
              <span>SAYFA 03 // DETAY</span>
              <span>GÜVEN UNSURU</span>
            </div>
            <div className="flex-1 my-4 flex flex-col justify-center items-center gap-3">
              <div className="w-20 h-20 rounded-full border border-[#10B981]/20 flex items-center justify-center relative bg-[#10B981]/[0.01]">
                <div className="absolute inset-2 rounded-full border border-dashed border-white/5" />
                <span className="font-mono text-[6px] text-[#10B981]/60">DÜRÜSTLÜK</span>
              </div>
              <p className="font-sans text-[6px] text-white/40 leading-relaxed font-light text-center max-w-[140px]">
                "Söylediğimizi yapar, yaptığımızı sahipleniriz."
              </p>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
              <span>GÜVEN DEĞERİ</span>
              <span>A5_PORTRAIT_03</span>
            </div>
          </div>
        );
      }
      return (
        <div className="w-full h-full bg-[#050508] border border-[#10B981]/10 flex flex-col justify-between p-5 select-none font-sans text-white/90 text-left">
          <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
            <span>SAYFA 04 // ÇIKIŞ</span>
            <span>GÜVEN: TAMAMLANDI</span>
          </div>
          <div className="my-auto flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-[1px] bg-[#10B981]/45" />
            <span className="font-mono text-[8px] text-white/30 tracking-wider">MİSYON</span>
            <p className="font-serif italic text-[11px] text-white/70 max-w-[120px] leading-relaxed">
              Her adımda güven, her kararda dürüstlük ve aidiyet.
            </p>
          </div>
          <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
            <span>GÜVEN DEĞERİ</span>
            <span>A5_PORTRAIT_04</span>
          </div>
        </div>
      );
    }

    if (fotoromanIdx === 2) {
      if (pageIdx === 0) {
        return (
          <div className="w-full h-full bg-[#040906] border border-[#10B981]/15 flex flex-col justify-between p-6 select-none font-sans text-emerald-100 text-left">
            <div className="flex justify-between items-center font-mono text-[7px] text-[#10B981]">
              <span>[KAPAK] // BÖLÜM 02</span>
              <span>DEĞER: SÜREKLİ GELİŞİM</span>
            </div>
            <div className="my-auto flex flex-col items-center gap-4 text-center">
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#10B981]/40 uppercase font-black">// ALİ KUŞÇU</span>
              <h2 className="font-serif italic text-2xl tracking-tight text-white/90">Yarının Potansiyeli</h2>
              <p className="font-sans text-[8px] max-w-[150px] text-emerald-100/40 leading-relaxed font-light">"Bugünün başarısını yarının potansiyeline dönüştürürüz."</p>
              <div className="w-8 h-[1px] bg-emerald-500/20" />
            </div>
            <div className="flex justify-between items-end font-mono text-[6px] text-emerald-100/20">
              <span>EDİTÖRYAL: GELİŞİM</span>
              <span>GÖK ATLASI</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 1) {
        return (
          <div className="w-full h-full bg-[#040906] border border-[#10B981]/15 flex flex-col justify-between p-5 select-none font-sans text-emerald-100 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
              <span>SAYFA 01 // UFUK</span>
              <span>LİDER: ALİ KUŞÇU</span>
            </div>
            <div className="flex-1 my-4 flex flex-col justify-center gap-2">
              <div className="border border-emerald-500/10 bg-emerald-500/[0.01] rounded-lg p-2.5 flex items-center justify-between">
                <span className="font-mono text-[7px] text-emerald-400/80">Kozmik Ufuk</span>
                <span className="font-mono text-[6px] text-white/30">#ALİ_KUŞÇU</span>
              </div>
              <p className="font-sans text-[7px] text-emerald-100/50 leading-relaxed font-light">
                Gökyüzünü ve yıldızları inceleyen meraklı gözler, sürekli öğrenmenin ve değişimin en canlı örneğidir.
              </p>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-emerald-100/20">
              <span>SÜREKLİ GELİŞİM</span>
              <span>A5_PORTRAIT_01</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 2) {
        return (
          <div className="w-full h-full bg-[#040906] border border-[#10B981]/15 flex flex-col justify-between p-6 select-none font-sans text-emerald-100 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
              <span>SAYFA 02 // MERAK</span>
              <span>ODAK: BİLGİ</span>
            </div>
            <div className="my-auto text-left flex flex-col gap-2.5">
              <span className="font-serif italic text-xs text-[#10B981] font-semibold">"Sınırları aşmak."</span>
              <p className="font-serif italic text-[11px] text-emerald-100/70 leading-relaxed font-light">
                Bugün ulaştığımız başarı, yarının daha büyük keşifleri için sadece bir basamaktır. Merakımız bizi geleceğe taşır.
              </p>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-emerald-100/20">
              <span>SÜREKLİ GELİŞİM</span>
              <span>A5_PORTRAIT_02</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 3) {
        return (
          <div className="w-full h-full bg-[#040906] border border-[#10B981]/15 flex flex-col justify-between p-5 select-none font-sans text-emerald-100 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
              <span>SAYFA 03 // KEŞİF</span>
              <span>SÜREÇ: DİNAMİK</span>
            </div>
            <div className="flex-1 my-3 grid grid-cols-3 gap-1.5 items-center">
              <div className="h-full border border-[#10B981]/10 bg-[#10B981]/[0.02] flex items-center justify-center">
                <span className="font-mono text-[5px] text-[#10B981]/40">ÖĞREN</span>
              </div>
              <div className="h-full border border-[#10B981]/10 bg-[#10B981]/[0.02] flex items-center justify-center">
                <span className="font-mono text-[5px] text-[#10B981]/40">UYGULA</span>
              </div>
              <div className="h-full border border-[#10B981]/10 bg-[#10B981]/[0.02] flex items-center justify-center">
                <span className="font-mono text-[5px] text-[#10B981]/40">GELİŞ</span>
              </div>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-emerald-100/20">
              <span>SÜREKLİ GELİŞİM</span>
              <span>A5_PORTRAIT_03</span>
            </div>
          </div>
        );
      }
      return (
        <div className="w-full h-full bg-[#040906] border border-[#10B981]/15 flex flex-col justify-between p-5 select-none font-sans text-emerald-100 text-left">
          <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
            <span>SAYFA 04 // ÇIKIŞ</span>
            <span>UFKUN ÖTESİ</span>
          </div>
          <div className="my-auto flex flex-col items-center gap-2 text-center">
            <span className="font-mono text-[16px] text-emerald-500 animate-pulse">✿</span>
            <p className="font-serif italic text-[11px] text-emerald-100/60 leading-relaxed">
              Öğrenme atlası açık, gelişim yolculuğu sürekli.
            </p>
          </div>
          <div className="flex justify-between items-center font-mono text-[5px] text-emerald-100/20">
            <span>SÜREKLİ GELİŞİM</span>
            <span>A5_PORTRAIT_04</span>
          </div>
        </div>
      );
    }

    if (fotoromanIdx === 3) {
      if (pageIdx === 0) {
        return (
          <div className="w-full h-full bg-[#05050b] border border-emerald-500/10 flex flex-col justify-between p-6 select-none font-sans text-white/90 text-left">
            <div className="flex justify-between items-center font-mono text-[7px] text-emerald-400">
              <span>[KAPAK] // BÖLÜM 03</span>
              <span>DEĞER: MÜŞTERİ ODAKLILIK</span>
            </div>
            <div className="my-auto flex flex-col items-center gap-4 text-center">
              <span className="font-mono text-[8px] tracking-[0.3em] text-emerald-500/40 uppercase font-black">// YUSUF HAS HACİB</span>
              <h2 className="font-serif italic text-2xl tracking-tight text-white/90">Geleceğin Öngörüsü</h2>
              <p className="font-sans text-[8px] max-w-[150px] text-white/40 leading-relaxed font-light">"Müşterilerimizin beklentilerini öngörürüz."</p>
              <div className="w-8 h-[1px] bg-emerald-500/30" />
            </div>
            <div className="flex justify-between items-end font-mono text-[6px] text-white/20">
              <span>EDİTÖRYAL: ODAK</span>
              <span>KUTADGU BİLİG</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 1) {
        return (
          <div className="w-full h-full bg-[#05050b] border border-emerald-500/10 flex flex-col justify-between p-5 select-none font-sans text-white/90 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-emerald-400/40">
              <span>SAYFA 01 // EMPATİ</span>
              <span>LİDER: YUSUF HAS HACİB</span>
            </div>
            <div className="flex-1 my-4 flex flex-col justify-center items-center gap-3">
              <div className="w-20 h-12 bg-emerald-500/5 border border-dashed border-emerald-500/20 flex items-center justify-center relative">
                <span className="font-mono text-[5px] text-emerald-400/60">// DENEYİM ODAĞI</span>
              </div>
              <p className="font-sans text-[6px] text-white/40 leading-relaxed font-light text-center">
                Müşteri beklentilerini bir bilgelikle okuyup, onlara henüz dile getirmedikleri çözümleri sunarız.
              </p>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
              <span>MÜŞTERİ ODAKLILIK</span>
              <span>A5_PORTRAIT_01</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 2) {
        return (
          <div className="w-full h-full bg-[#05050b] border border-emerald-500/10 flex flex-col justify-between p-6 select-none font-sans text-white/90 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-emerald-400/40">
              <span>SAYFA 02 // HİZMET</span>
              <span>ODAK: DENEYİM</span>
            </div>
            <div className="my-auto text-left flex flex-col gap-2">
              <span className="font-mono text-[8px] text-emerald-400 font-bold">// BİLGELİK</span>
              <p className="font-serif italic text-xs text-white/80 leading-relaxed font-light">
                Kutadgu Bilig'in insan odaklı felsefesini modern iş dünyasının deneyim tasarımıyla harmanlayarak değer üretiriz.
              </p>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
              <span>MÜŞTERİ ODAKLILIK</span>
              <span>A5_PORTRAIT_02</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 3) {
        return (
          <div className="w-full h-full bg-[#05050b] border border-emerald-500/10 flex flex-col justify-between p-5 select-none font-sans text-white/90 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-emerald-400/40">
              <span>SAYFA 03 // ETKİLEŞİM</span>
              <span>ÇÖZÜM: REAKSİYON</span>
            </div>
            <div className="flex-1 my-3 grid grid-cols-2 gap-2">
              <div className="h-full border border-dashed border-emerald-500/10 flex items-center justify-center">
                <span className="font-mono text-[5px] text-emerald-400/30">[BEKLENTİ]</span>
              </div>
              <div className="h-full border border-dashed border-emerald-500/10 flex items-center justify-center">
                <span className="font-mono text-[5px] text-emerald-400/30">[MEMNUNİYET]</span>
              </div>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
              <span>MÜŞTERİ ODAKLILIK</span>
              <span>A5_PORTRAIT_03</span>
            </div>
          </div>
        );
      }
      return (
        <div className="w-full h-full bg-[#05050b] border border-emerald-500/10 flex flex-col justify-between p-5 select-none font-sans text-white/90 text-left">
          <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
            <span>SAYFA 04 // SÜREKLİLİK</span>
            <span>ÖNGÖRÜ: AKTİF</span>
          </div>
          <div className="my-auto flex flex-col items-center gap-2 text-center">
            <span className="font-mono text-[8px] text-emerald-400 tracking-widest animate-pulse">// MÜŞTERİ MUTLULUĞU //</span>
            <p className="font-serif italic text-[11px] text-white/60">
              İhtiyaçlar anlaşıldı, kusursuz deneyim kaydedildi.
            </p>
          </div>
          <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
            <span>MÜŞTERİ ODAKLILIK</span>
            <span>A5_PORTRAIT_04</span>
          </div>
        </div>
      );
    }

    if (fotoromanIdx === 4) {
      if (pageIdx === 0) {
        return (
          <div className="w-full h-full bg-[#090807] border border-amber-800/15 flex flex-col justify-between p-6 select-none font-sans text-amber-100/90 text-left">
            <div className="flex justify-between items-center font-mono text-[7px] text-amber-600">
              <span>[KAPAK] // BÖLÜM 04</span>
              <span>DEĞER: ÇEVİK TAKIM RUHU</span>
            </div>
            <div className="my-auto flex flex-col items-center gap-4 text-center">
              <span className="font-mono text-[8px] tracking-[0.3em] text-amber-600/40 uppercase font-black">// BARBAROS HAYREDDİN</span>
              <h2 className="font-serif italic text-2xl tracking-tight text-white/90">Ortak Hedefe Tek Takım</h2>
              <p className="font-sans text-[8px] max-w-[150px] text-amber-100/40 leading-relaxed font-light">"Birlikte düşünür, birlikte karar alırız."</p>
              <div className="w-8 h-[1px] bg-amber-600/20" />
            </div>
            <div className="flex justify-between items-end font-mono text-[6px] text-amber-100/20">
              <span>EDİTÖRYAL: ÇEVİKLİK</span>
              <span>FORSA HARİTASI</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 1) {
        return (
          <div className="w-full h-full bg-[#090807] border border-amber-800/15 flex flex-col justify-between p-5 select-none font-sans text-amber-100/90 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-amber-600/40">
              <span>SAYFA 01 // SINERJİ</span>
              <span>LİDER: BARBAROS</span>
            </div>
            <div className="flex-1 my-4 flex flex-col justify-center items-center gap-3">
              <div className="w-20 h-20 rounded-sm border border-dashed border-amber-600/20 bg-amber-600/[0.01] flex items-center justify-center">
                <span className="font-mono text-[5px] text-amber-600/50">[BİRLİK_ZAMAN]</span>
              </div>
              <p className="font-sans text-[6.5px] text-amber-100/50 leading-relaxed text-center font-light">
                Her fikrin dinlendiği ve her elin küreğe aynı inançla asıldığı bir takımda aşılmayacak fırtına yoktur.
              </p>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-amber-100/20">
              <span>ÇEVİK TAKIM RUHU</span>
              <span>A5_PORTRAIT_01</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 2) {
        return (
          <div className="w-full h-full bg-[#090807] border border-amber-800/15 flex flex-col justify-between p-6 select-none font-sans text-amber-100/90 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-amber-600/40">
              <span>SAYFA 02 // DAYANIŞMA</span>
              <span>ODAK: TAKIM</span>
            </div>
            <div className="my-auto text-left flex flex-col gap-2">
              <span className="font-serif italic text-xs text-amber-400 font-semibold">Birlikte Karar</span>
              <p className="font-serif italic text-[11px] text-amber-100/70 leading-relaxed font-light">
                Tek başına hızlı gidebilirsin ama ancak birlikteyken uzağa ve derin sulara yelken açabilirsin. Biz bir takımız.
              </p>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-amber-100/20">
              <span>ÇEVİK TAKIM RUHU</span>
              <span>A5_PORTRAIT_02</span>
            </div>
          </div>
        );
      }
      if (pageIdx === 3) {
        return (
          <div className="w-full h-full bg-[#090807] border border-amber-800/15 flex flex-col justify-between p-5 select-none font-sans text-amber-100/90 text-left">
            <div className="flex justify-between items-center font-mono text-[6px] text-amber-600/40">
              <span>SAYFA 03 // TAKTİK</span>
              <span>SÜRÜM: SÜPER-ÇEVİK</span>
            </div>
            <div className="flex-1 my-3 flex flex-col gap-1 justify-center">
              <div className="h-6 border border-dashed border-amber-600/10 flex items-center justify-center font-mono text-[5px] text-amber-100/30">DÜŞÜN // PLANLA</div>
              <div className="h-6 border border-dashed border-amber-600/10 flex items-center justify-center font-mono text-[5px] text-amber-100/30">KARAR AL // UYGULA</div>
            </div>
            <div className="flex justify-between items-center font-mono text-[5px] text-amber-100/20">
              <span>ÇEVİK TAKIM RUHU</span>
              <span>A5_PORTRAIT_03</span>
            </div>
          </div>
        );
      }
      return (
        <div className="w-full h-full bg-[#090807] border border-amber-800/15 flex flex-col justify-between p-5 select-none font-sans text-amber-100/90 text-left">
          <div className="flex justify-between items-center font-mono text-[6px] text-amber-600/40">
            <span>SAYFA 04 // ÇIKIŞ</span>
            <span>UÇTAN_UCA_BİRLİK</span>
          </div>
          <div className="my-auto flex flex-col items-center gap-2.5 text-center">
            <span className="font-mono text-[6px] text-amber-500 font-bold uppercase tracking-[0.2em]">// RÜZGAR ARKADA //</span>
            <p className="font-serif italic text-[11px] text-amber-100/60">
              Takım ruhu pekiştirildi, yelkenler dolduruldu.
            </p>
          </div>
          <div className="flex justify-between items-center font-mono text-[5px] text-amber-100/20">
            <span>ÇEVİK TAKIM RUHU</span>
            <span>A5_PORTRAIT_04</span>
          </div>
        </div>
      );
    }

    if (pageIdx === 0) {
      return (
        <div className="w-full h-full bg-[#08080a] border border-[#10B981]/10 flex flex-col justify-between p-6 select-none font-sans text-white/90 text-left">
          <div className="flex justify-between items-center font-mono text-[7px] text-[#10B981]">
            <span>[KAPAK] // BÖLÜM 05</span>
            <span>DEĞER: YENİLİKÇİLİK</span>
          </div>
          <div className="my-auto flex flex-col items-center gap-4 text-center">
            <span className="font-mono text-[8px] tracking-[0.3em] text-[#10B981]/40 uppercase font-black">// EL-CEZERİ</span>
            <h2 className="font-serif italic text-2xl tracking-tight text-white/90">Geleceğin İmzası</h2>
            <p className="font-sans text-[8px] max-w-[150px] text-white/40 leading-relaxed font-light">"Yenilikçi çözümlerimizle kalıcı avantajlar oluştururuz."</p>
            <div className="w-8 h-[1px] bg-[#10B981]/25" />
          </div>
          <div className="flex justify-between items-end font-mono text-[6px] text-white/20">
            <span>EDİTÖRYAL: İNOVASYON</span>
            <span>SİBER-MEKANİK</span>
          </div>
        </div>
      );
    }
    if (pageIdx === 1) {
      return (
        <div className="w-full h-full bg-[#08080a] border border-[#10B981]/10 flex flex-col justify-between p-5 select-none font-sans text-white/90 text-left">
          <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
            <span>SAYFA 01 // İNOVASYON</span>
            <span>LİDER: EL-CEZERİ</span>
          </div>
          <div className="flex-1 my-4 flex flex-col justify-center gap-3">
            <div className="h-16 border border-dashed border-[#10B981]/20 relative flex items-center justify-center bg-[#10B981]/[0.01]">
              <div className="absolute inset-x-0 top-1/2 h-[1px] border-b border-white/5" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] border-r border-white/5" />
              <span className="font-mono text-[5px] text-white/20 z-10">[KİNETİK SİSTEM]</span>
            </div>
            <p className="font-sans text-[6px] text-white/45 leading-relaxed">
              Mekanik zekanın ve otomasyonun ilk kaşifi olan El-Cezeri gibi, biz de yazılımda yenilikçi çözümlerle fark yaratırız.
            </p>
          </div>
          <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
            <span>YENİLİKÇİLİK</span>
            <span>A5_PORTRAIT_01</span>
          </div>
        </div>
      );
    }
    if (pageIdx === 2) {
      return (
        <div className="w-full h-full bg-[#08080a] border border-[#10B981]/10 flex flex-col justify-between p-6 select-none font-sans text-white/90 text-left">
          <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
            <span>SAYFA 02 // TASARIM</span>
            <span>ODAK: İLERİ TEK</span>
          </div>
          <div className="my-auto text-left flex flex-col gap-2.5">
            <span className="font-mono text-[8px] text-[#10B981] font-bold">// REKABETÇİ AVANTAJ</span>
            <p className="font-serif italic text-xs text-white/85 leading-relaxed font-light">
              Yenilikçilik, sadece yeni fikirler üretmek değil; bu fikirlerle işimizi ve sektörümüzü geleceğe taşımaktır.
            </p>
          </div>
          <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
            <span>YENİLİKÇİLİK</span>
            <span>A5_PORTRAIT_02</span>
          </div>
        </div>
      );
    }
    if (pageIdx === 3) {
      return (
        <div className="w-full h-full bg-[#08080a] border border-[#10B981]/10 flex flex-col justify-between p-5 select-none font-sans text-white/90 text-left">
          <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
            <span>SAYFA 03 // ŞEMA</span>
            <span>SİSTEM: OTOMASYON</span>
          </div>
          <div className="flex-1 my-3 flex flex-col justify-center gap-1.5 text-[5px] font-mono text-[#10B981]/70">
            <div className="p-1 border border-[#10B981]/10 flex justify-between">
              <span>MÜHENDİSLİK</span>
              <span>100% OK</span>
            </div>
            <div className="p-1 border border-[#10B981]/10 flex justify-between">
              <span>İNOVATİF GÜÇ</span>
              <span>100% EFF</span>
            </div>
          </div>
          <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
            <span>YENİLİKÇİLİK</span>
            <span>A5_PORTRAIT_03</span>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full h-full bg-[#08080a] border border-[#10B981]/10 flex flex-col justify-between p-5 select-none font-sans text-white/90 text-left">
        <div className="flex justify-between items-center font-mono text-[6px] text-[#10B981]/40">
          <span>SAYFA 04 // FİNAL</span>
          <span>İNOVASYON: TAMAM</span>
        </div>
        <div className="my-auto flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-[7px] border border-[#10B981]/30 py-1 px-2.5 rounded text-[#10B981]">SYSTEM END</span>
          <p className="font-serif italic text-[11px] text-white/60 leading-relaxed">
            Yaratıcı fikirler hayata geçti, gelecek kaydedildi.
          </p>
        </div>
        <div className="flex justify-between items-center font-mono text-[5px] text-white/20">
          <span>YENİLİKÇİLİK</span>
          <span>A5_PORTRAIT_04</span>
        </div>
      </div>
    );
  };

  const renderRetroSectionHeader = (num: string, title: string) => {
    return (
      <div className="flex flex-col relative mb-5">
        <div className="absolute -top-12 -left-4 font-mono text-[96px] sm:text-[120px] font-black text-[#A86CFF]/5 select-none pointer-events-none leading-none tracking-tighter">
          {num}
        </div>
        <div className="font-pixel text-[#A86CFF] text-[8px] sm:text-[9px] tracking-[0.1em] font-bold uppercase mb-5 z-10">
          AI AGENT FACTORY'26
        </div>
        <h3 className="font-pixel text-lg sm:text-2xl text-white uppercase tracking-wider z-10">
          {title}
        </h3>
      </div>
    );
  };

  const renderRetroDivider = () => {
    return (
      <div className="w-full py-16 flex items-center justify-center relative overflow-hidden select-none pointer-events-none my-16">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#A86CFF]/40 to-transparent relative shadow-[0_0_8px_#8F5BFF]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#C67CFF] border border-[#0B0815] animate-pulse" />
        </div>
      </div>
    );
  };

  const renderNeonDivider = (color: string = '#00F0FF') => {
    return (
      <div className="w-full py-12 flex items-center justify-center relative overflow-hidden select-none pointer-events-none my-12">
        <div
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-current to-transparent relative"
          style={{
            color: color,
            boxShadow: `0 0 10px ${color}, 0 0 4px ${color}`,
            opacity: 0.5
          }}
        />
      </div>
    );
  };

  const renderNestedTrianglesBackground = (accentColor: string = '#00F0FF') => {
    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-25 select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] flex items-center justify-center">
          <div className="absolute font-sans font-black text-[120px] tracking-[0.2em] text-[#00F0FF]/3 select-none pointer-events-none transform translate-y-6">
            R&D
          </div>
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            {Array.from({ length: 12 }).map((_, i) => {
              const scale = 1 - i * 0.07;
              const rot = i * 1.5;
              if (scale <= 0) return null;
              return (
                <polygon
                  key={i}
                  points="50,12 12,83 88,83"
                  stroke={accentColor}
                  strokeWidth={0.15 + i * 0.05}
                  style={{
                    transform: `scale(${scale}) rotate(${rot}deg)`,
                    transformOrigin: '50% 60%',
                    opacity: 0.15 - i * 0.008,
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  const renderGridCell = (slotKey: string, cellIndexLabel: number) => {
    const img = socialMediaData.images[slotKey];
    const caption = socialMediaData.captions[slotKey] || '';

    const isGastronomi = slotKey.startsWith('gastronomi_');
    const isZebra = slotKey.startsWith('zburada_');

    if (isGastronomi) {
      const eventTitle = socialMediaData.titles?.[slotKey] || GASTRONOMI_TITLES[cellIndexLabel - 1] || "Gastronomi Etkinliği";
      const tag = "";

      return (
        <div key={slotKey} className="flex flex-col items-stretch group relative p-4 bg-[#0a0a0c]/80 border border-white/5 rounded-2xl shadow-xl transition-all duration-300 hover:border-[#FF6B00]/30 hover:shadow-[0_4px_25px_rgba(255,107,0,0.05)]">
          {tag && (
            <div className="w-full text-center mb-2.5 select-none">
              <span className="font-mono text-[9px] text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                {tag}
              </span>
            </div>
          )}

          <div
            onClick={isLocked ? undefined : () => {
              currentUploadSlot.current = { type: 'images', key: slotKey };
              socialSingleFileInputRef.current?.click();
            }}
            className={`w-full aspect-square bg-white/[0.01] ${isLocked ? 'cursor-default' : 'cursor-pointer hover:bg-[#FF6B00]/[0.02]'} border-2 border-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.15)] transition-all duration-500 rounded-xl overflow-hidden relative group/img`}
          >
            {img ? (
              <div className="w-full h-full relative">
                <img
                  src={img}
                  alt={eventTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-102"
                  referrerPolicy="no-referrer"
                />
                {!isLocked && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
                    <Upload className="w-5 h-5 text-[#FF6B00] mb-1.5" />
                    <span className="font-sans text-[8px] text-white tracking-widest uppercase font-bold">Görseli Değiştir</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center select-none h-full justify-center">
                <div className="w-10 h-10 rounded-full bg-white/[0.02] group-hover/img:bg-[#FF6B00]/10 flex items-center justify-center border border-white/5 group-hover/img:border-[#FF6B00]/20 transition-all mb-3">
                  <Upload className="w-4 h-4 text-white/30 group-hover/img:text-[#FF6B00] transition-colors" />
                </div>
                <span className="font-sans text-[9px] text-white/30 group-hover/img:text-white/60 uppercase tracking-widest font-black">Görsel Ekle</span>
                <span className="font-serif italic text-[11px] text-white/15 group-hover/img:text-[#FF6B00]/40 mt-1">Görsel #{cellIndexLabel}</span>
              </div>
            )}
          </div>

          <div className="w-full text-center mt-4 mb-2">
            <span className="font-mono text-[7px] text-white/30 tracking-widest uppercase block mb-1 select-none">// ETKİNLİK ADI</span>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => updateSocialMediaAsset('titles', slotKey, e.target.value)}
              readOnly={isLocked}
              placeholder="Etkinlik adını yazın..."
              className="font-sans font-semibold text-center text-xs sm:text-sm tracking-wide text-[#FF6B00] bg-transparent border-none focus:ring-0 focus:outline-none w-full p-0 cursor-text"
            />
          </div>

          <div className="w-full mt-1">
            <span className="font-mono text-[7px] text-[#FF6B00]/50 tracking-widest uppercase block mb-1 select-none">// AÇIKLAMA</span>
            <textarea
              value={caption}
              onChange={(e) => updateSocialMediaAsset('captions', slotKey, e.target.value)}
              readOnly={isLocked}
              placeholder="Açıklama cümlesi yazın..."
              rows={4}
              className="font-sans text-white/70 text-center tracking-wide text-[11px] leading-relaxed block w-full bg-transparent border-none focus:ring-0 focus:outline-none resize-none overflow-hidden min-h-[90px] p-0"
            />
          </div>
        </div>
      );
    }

    if (isZebra) {
      const zerraTitle = socialMediaData.titles?.[slotKey] || ZERRA_TITLES[cellIndexLabel - 1] || "zBurada Girişim Analizi";
      return (
        <div key={slotKey} className="flex flex-col items-stretch group relative p-4 bg-[#0a0a0c]/80 border border-white/5 rounded-2xl shadow-xl transition-all duration-300 hover:border-[#FF6B00]/30 hover:shadow-[0_4px_25px_rgba(255,107,0,0.05)]">
          <div
            onClick={isLocked ? undefined : () => {
              currentUploadSlot.current = { type: 'images', key: slotKey };
              socialSingleFileInputRef.current?.click();
            }}
            className={`w-full aspect-square bg-white/[0.01] ${isLocked ? 'cursor-default' : 'cursor-pointer hover:bg-[#FF6B00]/[0.02]'} border border-white/[0.05] hover:border-[#FF6B00]/20 transition-all duration-500 rounded-xl overflow-hidden relative group/img`}
          >
            {img ? (
              <div className="w-full h-full relative">
                <img
                  src={img}
                  alt={zerraTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-102"
                  referrerPolicy="no-referrer"
                />
                {!isLocked && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
                    <Upload className="w-5 h-5 text-[#FF6B00] mb-1.5" />
                    <span className="font-sans text-[8px] text-white tracking-widest uppercase font-bold">Görseli Değiştir</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center select-none h-full justify-center">
                <div className="w-10 h-10 rounded-full bg-white/[0.02] group-hover/img:bg-[#FF6B00]/10 flex items-center justify-center border border-white/5 group-hover/img:border-[#FF6B00]/20 transition-all mb-3">
                  <Upload className="w-4 h-4 text-white/30 group-hover/img:text-[#FF6B00] transition-colors" />
                </div>
                <span className="font-sans text-[9px] text-white/30 group-hover/img:text-white/60 uppercase tracking-widest font-black">Görsel Ekle</span>
                <span className="font-serif italic text-[11px] text-white/15 group-hover/img:text-[#FF6B00]/40 mt-1">Görsel #{cellIndexLabel}</span>
              </div>
            )}
          </div>

          <div className="w-full text-center mt-4 mb-2">
            <span className="font-mono text-[7px] text-white/30 tracking-widest uppercase block mb-1 select-none">// RAPOR ADI</span>
            <input
              type="text"
              value={zerraTitle}
              onChange={(e) => updateSocialMediaAsset('titles', slotKey, e.target.value)}
              readOnly={isLocked}
              placeholder="Rapor adını yazın..."
              className="font-sans font-semibold text-center text-xs sm:text-sm tracking-wide text-[#FF6B00] bg-transparent border-none focus:ring-0 focus:outline-none w-full p-0 cursor-text"
            />
          </div>

          <div className="w-full mt-1">
            <span className="font-mono text-[7px] text-[#FF6B00]/50 tracking-widest uppercase block mb-1 select-none">// ANALİZ & DETAY</span>
            <textarea
              value={caption}
              onChange={(e) => updateSocialMediaAsset('captions', slotKey, e.target.value)}
              readOnly={isLocked}
              placeholder="Açıklama ve tasarım detaylarını yazın..."
              rows={4}
              className="font-sans text-white/70 text-center tracking-wide text-[11px] leading-relaxed block w-full bg-transparent border-none focus:ring-0 focus:outline-none resize-none overflow-hidden min-h-[90px] p-0"
            />
          </div>
        </div>
      );
    }

    return (
      <div key={slotKey} className="flex flex-col items-center group relative p-3">
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/10 group-hover:border-[#FF6B00]/50 transition-colors pointer-events-none" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/10 group-hover:border-[#FF6B00]/50 transition-colors pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/10 group-hover:border-[#FF6B00]/50 transition-colors pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/10 group-hover:border-[#FF6B00]/50 transition-colors pointer-events-none" />

        <div
          onClick={isLocked ? undefined : () => {
            currentUploadSlot.current = { type: 'images', key: slotKey };
            socialSingleFileInputRef.current?.click();
          }}
          className={`w-full aspect-square bg-white/[0.01] ${isLocked ? 'cursor-default' : 'cursor-pointer hover:bg-[#FF6B00]/[0.02]'} border border-white/[0.04] hover:border-[#FF6B00]/20 transition-all duration-500 rounded-xl overflow-hidden relative group/img`}
        >
          {img ? (
            <div className="w-full h-full relative">
              <img
                src={img}
                alt={`Grid Item ${cellIndexLabel}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-102"
                referrerPolicy="no-referrer"
              />
              {!isLocked && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
                  <Upload className="w-5 h-5 text-[#FF6B00] mb-1.5" />
                  <span className="font-sans text-[8px] text-white tracking-widest uppercase font-bold">Görseli Değiştir</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center select-none">
              <div className="w-10 h-10 rounded-full bg-white/[0.02] group-hover/img:bg-[#FF6B00]/10 flex items-center justify-center border border-white/5 group-hover/img:border-[#FF6B00]/20 transition-all mb-3">
                <Upload className="w-4 h-4 text-white/30 group-hover/img:text-[#FF6B00] transition-colors" />
              </div>
              <span className="font-sans text-[9px] text-white/30 group-hover/img:text-white/60 uppercase tracking-widest font-black">Görsel Ekle</span>
              <span className="font-serif italic text-[11px] text-white/15 group-hover/img:text-[#FF6B00]/40 mt-1">Sayı {cellIndexLabel}</span>
            </div>
          )}
        </div>

        <div className="w-full mt-4 px-2">
          <textarea
            value={caption}
            onChange={(e) => updateSocialMediaAsset('captions', slotKey, e.target.value)}
            readOnly={isLocked}
            placeholder="Açıklama cümlesi yazın..."
            rows={3}
            className="font-sans text-white/90 tracking-wide text-[11px] sm:text-xs text-center block w-full bg-[#121215]/80 border border-white/10 hover:border-white/20 focus:border-[#FF6B00]/40 py-2 px-3 rounded-lg transition-all focus:outline-none placeholder:text-white/30 shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] resize-none min-h-[64px]"
          />
        </div>
      </div>
    );
  };

  const renderGroupedImage = (slotKey: string, cellIndexLabel: number, aspectClass: string = "aspect-square") => {
    const img = socialMediaData.images[slotKey];
    return (
      <div key={slotKey} className="flex flex-col items-center group relative p-1.5">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/5 group-hover:border-[#FF6B00]/40 transition-colors pointer-events-none" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/5 group-hover:border-[#FF6B00]/40 transition-colors pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/5 group-hover:border-[#FF6B00]/40 transition-colors pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/5 group-hover:border-[#FF6B00]/40 transition-colors pointer-events-none" />

        <div
          onClick={isLocked ? undefined : () => {
            currentUploadSlot.current = { type: 'images', key: slotKey };
            socialSingleFileInputRef.current?.click();
          }}
          className={`w-full ${aspectClass} bg-white/[0.01] ${isLocked ? 'cursor-default' : 'cursor-pointer hover:bg-[#FF6B00]/[0.02]'} border border-white/[0.04] hover:border-[#FF6B00]/20 transition-all duration-500 rounded-lg overflow-hidden relative group/img`}
        >
          {img ? (
            <div className="w-full h-full relative">
              <img
                src={img}
                alt={`Grid Item ${cellIndexLabel}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-102"
                referrerPolicy="no-referrer"
              />
              {!isLocked && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
                  <Upload className="w-4 h-4 text-[#FF6B00] mb-1" />
                  <span className="font-sans text-[8px] text-white tracking-widest uppercase font-bold">Değiştir</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-3 text-center select-none h-full justify-center">
              <div className="w-8 h-8 rounded-full bg-white/[0.02] group-hover/img:bg-[#FF6B00]/10 flex items-center justify-center border border-white/5 group-hover/img:border-[#FF6B00]/20 transition-all mb-1">
                <Upload className="w-3.5 h-3.5 text-white/30 group-hover/img:text-[#FF6B00] transition-colors" />
              </div>
              <span className="font-sans text-[8px] text-white/30 group-hover/img:text-white/60 uppercase tracking-widest font-black">Yükle</span>
              <span className="font-mono text-[8px] text-white/10 group-hover/img:text-[#FF6B00]/40 mt-0.5">#{cellIndexLabel}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCarousel = (prefix: string, activeIdx: number, setActiveIdx: (idx: number) => void) => {
    const slideKey = `${prefix}_carousel_1`;
    const img = socialMediaData.images[slideKey];

    return (
      <div className="mt-24 border-t border-white/5 pt-16 w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <span className="font-sans text-[9px] tracking-[0.3em] text-[#FF6B00] uppercase font-black mb-2">
            // CAROUSEL ÇALIŞMA ÖRNEĞİ
          </span>
          <h2 className="flex flex-col items-center leading-none">
            <span className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tighter text-white">
              Carousel Çalışma Örneği
            </span>
          </h2>
        </div>

        <div className={`relative group/carousel w-full max-w-[774px] mx-auto aspect-[774/530] bg-white/[0.01] border border-white/5 ${img ? '' : 'hover:border-[#FF6B00]/20'} rounded-2xl overflow-hidden transition-all duration-500 flex flex-col items-center justify-center shadow-2xl`}>
          {img ? (
            <div
              onClick={isLocked ? undefined : () => {
                currentUploadSlot.current = { type: 'images', key: slideKey };
                socialSingleFileInputRef.current?.click();
              }}
              className={`absolute inset-0 w-full h-full ${isLocked ? 'cursor-default' : 'cursor-pointer'} group/slide`}
            >
              <img
                src={img}
                alt={`${prefix} Campaign Visual`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/slide:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div
              onClick={isLocked ? undefined : () => {
                currentUploadSlot.current = { type: 'images', key: slideKey };
                socialSingleFileInputRef.current?.click();
              }}
              className={`absolute inset-0 flex flex-col items-center justify-center p-12 text-center ${isLocked ? 'cursor-default' : 'cursor-pointer hover:bg-[#FF6B00]/[0.02]'} select-none`}
            >
              <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center border border-white/5 transition-all mb-3">
                <Upload className="w-5 h-5 text-white/40" />
              </div>
              <span className="font-sans text-[10px] text-white/40 tracking-widest uppercase font-black select-none">// GÖRSEL BULUNMAMAKTADIR</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (categoryId === 'photography') {
      const fotoromanList = [
        {
          idx: 1,
          no: "01",
          title: "Çobancık",
          subtitle: "Belgesel Fotoroman Projesi",
          desc: "8 yaşındaki bir çocuğun doğayla, sürüsüyle ve kendi çocukluğuyla olan mücadelesini anlatan bir görsel hikaye çalışması. Fotoğraf çekimlerinden metin kurgusuna kadar üstlendiğim bu projede; minik bir bedenin yaşamın ağır kilitlerini ve sürgülerini açma çabasını kare kare fotoğraflayarak zamansız bir anlatı oluşturmayı hedefledim.",
          tags: ["Belgesel", "Fotoroman", "Portre", "Doğa"]
        },
        {
          idx: 2,
          no: "02",
          title: "Ekmek Teknesi",
          subtitle: "Belgesel Görsel Anlatı",
          desc: "İstanbul kıyılarında sabahın ilk ışıklarıyla başlayan olta balıkçılığı rutinini ve Cemil Amca'nın denizle olan sessiz bağını ele alan fotoroman çalışması. Proje; insan, emek ve şehir dinamiklerini zamansız bir monokrom estetik ve detay odaklı bir kurguyla bir araya getirmektedir.",
          tags: ["Belgesel", "Görsel Anlatı", "Monokrom", "İstanbul"]
        },
        {
          idx: 3,
          no: "03",
          title: "Herhangi Bir Yer",
          subtitle: "Belgesel Görsel Anlatı",
          desc: "Doğanın kendi ritminde filizlenen ufak detayların ve insanın toprağa dönüş hikayesinin fotoroman çalışması. Bu projede; bir ekmeğin, bir çiçeğin ve bir yolun insana yettiği o yalın yaşam felsefesini detay odaklı ve monokrom bir kompozisyon devamlılığıyla sunmaktadır.",
          tags: ["Belgesel", "Doğa", "Kompozisyon", "Monokrom"]
        },
        {
          idx: 4,
          no: "04",
          title: "Herhangi Bir An",
          subtitle: "Belgesel Görsel Öykü",
          desc: "İstanbul kıyılarında sıradan bir günün içinde filizlenen küçük bir rastlantının ve solmuş bir gülün hikayesi. Çekimlerinden sayfa düzeni kurgusuna kadar hazırladığım bu fotoroman; şehir monologlarını, insan ifadelerini ve mekansal dokuyu detay odaklı, zamansız bir monokrom estetikle bir araya getiriyor.",
          tags: ["Görsel Öykü", "Monokrom", "Sokak", "İstanbul"]
        },
        {
          idx: 5,
          no: "05",
          title: "Herhangi Biri",
          subtitle: "Belgesel Görsel Anlatı",
          desc: "Modern insanın kalabalıklar içindeki yalnızlığını, gitmek ile kalmak arasında sıkışan bir karakterin adımları üzerinden takip eden fotoroman projesi. Bu çalışma; yansımalar, portre ifadeleri ve yolculuk temasını zamansız bir monokrom bütünlük ve güçlü bir iç ses anlatımıyla bir araya getiriyor.",
          tags: ["Görsel Anlatı", "Yolculuk", "Monokrom", "Portre"]
        }
      ];

      return (
        <div className="relative min-h-screen bg-[#070707] text-white overflow-hidden pb-40 selection:bg-[#10B981] selection:text-black">
          {/* Hidden single uploader */}
          <input
            type="file"
            ref={photographySingleFileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0] && currentPhotographyUploadSlot.current) {
                const file = e.target.files[0];
                compressAndResizeImage(file)
                  .then((compressedUrl) => {
                    if (currentPhotographyUploadSlot.current) {
                      updateFotoromanAsset(currentPhotographyUploadSlot.current, compressedUrl);
                    }
                  })
                  .catch((err) => {
                    console.error("Photography upload compression error:", err);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      if (typeof reader.result === 'string' && currentPhotographyUploadSlot.current) {
                        updateFotoromanAsset(currentPhotographyUploadSlot.current, reader.result);
                      }
                    };
                    reader.readAsDataURL(file);
                  })
                  .finally(() => {
                    e.target.value = '';
                  });
              }
            }}
            accept="image/*"
            className="hidden"
          />

          {/* Dynamic Grid Background with faint green radial spotlight */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#10B981]/[0.012] rounded-full filter blur-3xl pointer-events-none" />
          <div className="paper-grain opacity-85" />

          <div className="max-w-6xl mx-auto pt-28 sm:pt-32 px-6 sm:px-12 relative z-10 text-left">
            {/* Back Button */}
            <div className="mb-12">
              <motion.button
                onClick={onBack}
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 group cursor-pointer bg-[#10B981] text-black hover:bg-[#059669] transition-all duration-300 py-2.5 px-5 rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.25)] font-black font-mono text-[10px] tracking-widest uppercase"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-black" />
                <span>← Çalışmalarıma Dön</span>
              </motion.button>
            </div>

            {/* Title Block */}
            <div className="mb-20 border-b border-white/5 pb-12">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold block mb-4 animate-fade-in" style={{ color: catHeading.color }}>
                {catHeading.section}
              </span>
              <h1 className="flex flex-col items-start leading-none mb-6">
                <span className="font-sans font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">{catHeading.part1}</span>
                <span className="font-serif italic font-light text-2xl sm:text-3xl md:text-4xl tracking-tight mt-1" style={{ color: catHeading.color }}>{catHeading.part2}</span>
              </h1>
              <p className="font-sans text-sm sm:text-base text-white/55 leading-relaxed font-light max-w-3xl">
                {catHeading.desc}
              </p>
            </div>

            {/* List of 5 Fotoromans Stacked Vertically */}
            <div className="flex flex-col gap-24">
              {fotoromanList.map((fotoroman) => {
                const fKey = `fotoroman_${fotoroman.idx}`;
                const hasFourPages = fotoroman.idx === 4 || fotoroman.idx === 5;
                const activePageIdxRaw = fotoromanData.activePageIdxs[fKey] ?? 0;
                const activePageIdx = hasFourPages && activePageIdxRaw > 3 ? 0 : activePageIdxRaw;
                const activeImgKey = `${fKey}_img_${activePageIdx}`;
                const activeImgUrl = fotoromanData.images[activeImgKey] || null;

                const pages = hasFourPages
                  ? [
                      { label: "Kapak", idx: 0 },
                      { label: "Sayfa 1", idx: 1 },
                      { label: "Sayfa 2", idx: 2 },
                      { label: "Sayfa 3", idx: 3 }
                    ]
                  : [
                      { label: "Kapak", idx: 0 },
                      { label: "Sayfa 1", idx: 1 },
                      { label: "Sayfa 2", idx: 2 },
                      { label: "Sayfa 3", idx: 3 },
                      { label: "Sayfa 4", idx: 4 }
                    ];

                return (
                  <div 
                    key={fotoroman.idx} 
                    className="group border border-white/5 bg-white/[0.005] hover:bg-white/[0.015] rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-500 relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch"
                  >
                    <div className="absolute inset-0 rounded-3xl border border-[#10B981]/0 group-hover:border-[#10B981]/10 pointer-events-none transition-all duration-700" />
                    
                    {/* Left Side: Editorial Context & Information (Left aligned and compact) */}
                    <div className="w-full lg:w-[320px] shrink-0 flex flex-col justify-between py-2 text-left">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <span className="font-mono text-xs text-[#10B981] font-bold">
                            [{fotoroman.no}]
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          <span className="font-mono text-[8px] tracking-widest text-white/30 uppercase">
                            // FOTOROMAN SERİSİ
                          </span>
                        </div>

                        {(() => {
                          const words = fotoroman.title.trim().split(/\s+/);
                          const firstPart = words.slice(0, words.length - 1).join(" ").toUpperCase();
                          const lastWord = words[words.length - 1];
                          const lastWordFormatted = lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
                          return (
                            <h2 className="flex flex-col items-start leading-none mb-2 select-none">
                              <span className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter text-white group-hover:text-[#10B981] transition-colors">
                                {firstPart}
                              </span>
                              <span className="font-serif italic font-light text-xl sm:text-2xl text-[#10B981] tracking-tight mt-1">
                                {lastWordFormatted}
                              </span>
                            </h2>
                          );
                        })()}
                        
                        <p className="font-mono text-[9px] text-[#10B981]/50 uppercase tracking-widest mb-6">
                          {fotoroman.subtitle}
                        </p>

                        <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed font-light mb-8 max-w-lg">
                          {fotoroman.desc}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-8">
                          {fotoroman.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="font-mono text-[8px] text-white/35 bg-white/5 border border-white/5 rounded px-2.5 py-1 uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-white/20 font-mono text-[9px]">
                          <span>AKTİF GÖRÜNÜM:</span>
                          <span className="text-[#10B981] font-bold">
                            {activePageIdx === 0 ? "KAPAK GÖRSELİ" : `SAYFA ÖRNEĞİ 0${activePageIdx}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Interactive Fotoroman Workspace Grid (Much larger image space) */}
                    <div className="flex-1 flex flex-col md:flex-row items-center gap-8 lg:gap-12 justify-center min-w-0 bg-white/[0.003] border border-white/5 rounded-2xl p-6 lg:p-8">
                      <div className="flex flex-col items-center gap-3 shrink-0">
                        <span className="font-mono text-[7px] tracking-[0.2em] text-[#10B981]/60 uppercase">// A5 KAPAK & ODAK ALANI</span>
                        
                        <div 
                          className={`relative w-[280px] h-[396px] sm:w-[320px] sm:h-[452px] rounded-2xl border border-white/10 bg-[#0c0c10] overflow-hidden shadow-2xl flex items-center justify-center group/cover ${isLocked ? 'cursor-default' : 'cursor-pointer hover:border-[#10B981]/30'} transition-colors`}
                        >
                          {activeImgUrl ? (
                            <img 
                              src={activeImgUrl} 
                              alt="Fotoroman page focus" 
                              className="w-full h-full object-cover transition-transform duration-700" 
                            />
                          ) : (
                            renderFotoromanDefaultSVG(fotoroman.idx, activePageIdx)
                          )}

                          {!isLocked && (
                            <div 
                              onClick={() => {
                                currentPhotographyUploadSlot.current = activeImgKey;
                                photographySingleFileInputRef.current?.click();
                              }}
                              className="absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 z-30 cursor-pointer"
                            >
                              <div className="w-9 h-9 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
                                <Upload className="w-4 h-4" />
                              </div>
                              <span className="font-mono text-[8px] text-[#10B981] font-bold tracking-widest uppercase">GÖRSELİ DEĞİŞTİR</span>
                              <span className="font-mono text-[6px] text-white/40 uppercase">
                                {activePageIdx === 0 ? "Kapak" : `Sayfa ${activePageIdx}`} Alanı
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex md:flex-col flex-wrap gap-4 justify-center items-center">
                        <span className="font-mono text-[7px] tracking-[0.2em] text-white/20 uppercase md:mb-1 select-none">// SAYFALAR</span>
                        
                        {pages.map((p) => {
                          const pImgKey = `${fKey}_img_${p.idx}`;
                          const pImgUrl = fotoromanData.images[pImgKey] || null;
                          const isPageActive = activePageIdx === p.idx;

                          return (
                            <div 
                              key={p.idx} 
                              className="flex flex-col items-center gap-1.5"
                            >
                              <div 
                                onClick={() => updateFotoromanActivePage(fKey, p.idx)}
                                className={`relative w-[68px] h-[96px] rounded-lg border bg-[#050508] overflow-hidden cursor-pointer transition-all duration-300 ${
                                  isPageActive 
                                    ? "border-[#10B981] scale-105 ring-2 ring-[#10B981]/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                                    : "border-white/10 hover:border-white/30 hover:scale-102"
                                }`}
                              >
                                {pImgUrl ? (
                                  <img 
                                    src={pImgUrl} 
                                    alt="Fotoroman page thumb" 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : (
                                  <div className="w-[200px] h-[283px] scale-[0.34] origin-top-left pointer-events-none opacity-40">
                                    {renderFotoromanDefaultSVG(fotoroman.idx, p.idx)}
                                  </div>
                                )}

                                {!isLocked && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      currentPhotographyUploadSlot.current = pImgKey;
                                      photographySingleFileInputRef.current?.click();
                                    }}
                                    className="absolute bottom-1 right-1 w-4 h-4 rounded-md bg-black/60 hover:bg-black border border-white/10 hover:border-[#10B981]/50 flex items-center justify-center text-white hover:text-[#10B981] transition-colors"
                                  >
                                    <Upload className="w-2.5 h-2.5" />
                                  </button>
                                )}
                              </div>

                              <span className={`font-mono text-[6px] tracking-wider uppercase font-bold ${
                                isPageActive ? "text-[#10B981]" : "text-white/30"
                              }`}>
                                {p.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="max-w-6xl mx-auto border-t border-white/5 pt-16 mt-32 text-center relative z-10 flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-2 select-none">
                <span className="font-mono text-[8px] tracking-[0.4em] text-[#10B981]/40 uppercase">// END_OF_GALLERY</span>
                <span className="font-serif italic text-white/50 text-sm">Tüm Çalışmaları İncelediniz</span>
              </div>
              
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 group cursor-pointer bg-white/5 border border-white/10 text-[#10B981] hover:text-[#10B981] hover:border-[#10B981]/45 hover:bg-[#10B981]/5 font-bold font-mono text-[9px] tracking-widest uppercase py-3.5 px-8 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
              >
                <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-[#10B981]" />
                <span>Başa Dön</span>
              </motion.button>
              
              <div className="text-[6.5px] font-mono text-white/15 tracking-widest uppercase mt-4">
                © 2026 DESIGN PORTFOLIO // ALL RIGHTS RESERVED
              </div>
            </div>
          </div>
        </div>
      );
    }

  if (categoryId === 'social-media') {
    return (
      <div className="relative min-h-screen bg-[#070707] text-white overflow-hidden animate-fadeIn">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="paper-grain opacity-85" />

        <div className="max-w-6xl mx-auto pt-28 sm:pt-32 pb-40 px-6 sm:px-12 relative z-10 text-left">
          <div className="mb-12">
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 group cursor-pointer bg-[#FF6B00] text-white hover:bg-[#e66000] transition-all duration-300 py-2.5 px-5 rounded-xl shadow-[0_4px_20px_rgba(255,107,0,0.25)] font-bold font-mono text-[10px] tracking-widest uppercase"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-white" />
              <span>← Çalışmalarıma Dön</span>
            </motion.button>
          </div>

        {/* Heading styled with creative bold straight font for titles, and elegant small descriptions */}
        <div className="mb-16 border-b border-white/5 pb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold block mb-4 animate-fade-in" style={{ color: catHeading.color }}>
            {catHeading.section}
          </span>
          <h1 className="flex flex-col items-start leading-none mb-6">
            <span className="font-sans font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">{catHeading.part1}</span>
            <span className="font-serif italic font-light text-2xl sm:text-3xl md:text-4xl tracking-tight mt-1" style={{ color: catHeading.color }}>{catHeading.part2}</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/55 leading-relaxed font-light max-w-3xl">
            {catHeading.desc}
          </p>
        </div>

        {/* Connection Tab bar */}
        <div className="relative w-full flex flex-col items-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-4xl mx-auto relative z-10 text-center gap-4 md:gap-0">
            {[
              { id: 'gastronomi', label: 'Gastronomi Topluluğu' },
              { id: 'zburada', label: 'zBurada' },
              { id: 'veribilimi', label: 'Veri Bilimi Topluluğu' }
            ].map((tab) => {
              const isActive = activeSocialTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveSocialTab(tab.id as any)}
                  className="cursor-pointer py-4 relative flex flex-col items-center justify-center transition-all duration-500"
                >
                  <span className={`font-sans font-black uppercase text-xs sm:text-sm md:text-base tracking-wider transition-all duration-300 ${isActive ? 'text-[#FF6B00] scale-105 drop-shadow-[0_0_12px_rgba(255,107,0,0.45)]' : 'text-white/40 hover:text-white/70'}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="socialActiveIndicator"
                      className="absolute bottom-0 w-32 h-[3px] bg-[#FF6B00] shadow-[0_0_12px_#FF6B00]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full h-[1px] bg-white/10 relative mt-4" />

          {/* Schematic visual connection line flowing downwards */}
          <div className="h-12 w-[1px] border-l border-dashed border-[#FF6B00]/30 relative flex justify-center overflow-hidden">
            <motion.div
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 w-[4px] h-[4px] rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full">
          {activeSocialTab === 'gastronomi' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              <div className="text-center max-w-xl mx-auto mb-8 flex flex-col items-center">
                <span className="font-mono text-[9px] tracking-[0.35em] text-[#FF6B00] font-black uppercase block mb-3">// 3 SIRA // 9 GÖRSEL ALANI //</span>
                <h2 className="flex flex-col items-center leading-none">
                  <span className="font-sans font-black text-base sm:text-lg uppercase tracking-widest text-white block mb-1">Yıldız Teknik Üniversitesi</span>
                  <span className="font-serif italic font-light text-3xl sm:text-4xl text-[#FF6B00] tracking-tight block">Gastronomi Topluluğu</span>
                </h2>
              </div>

              {/* High fidelity readable sans-serif description card */}
              <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#121215] to-[#08080a] border border-[#FF6B00]/30 rounded-2xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(255,107,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6B00]" />
                <p className="font-sans text-white/90 text-sm sm:text-base leading-relaxed text-left font-light whitespace-pre-line">
                  {`Yıldız Teknik Üniversitesi bünyesinde faaliyet gösteren Gastronomi Kulübü (GATO), gastronomi kültürünü akademik and sosyal etkinliklerle zenginleştirmeyi amaçlayan, workshoplar, tadım günleri and atölyeler düzenleyen dinamik bir öğrenci topluluğudur.\n\nBu vizyoner toplulukta ilk yılımda Grafik Tasarımcı olarak görev alarak kulübün dijital and basılı tüm görsel kimliğini, etkinlik duyurularını and sosyal medya materyallerini kreatif bir dille inşa ettim. İkinci yılımda ise Tasarım Koordinatörlüğü rolünü üstlenerek tasarım ekibinin yönetimini, iş paylaşımlarını and markanın görsel stratejisinin sürdürülebilirliğini organize ettim; böylece ham fikirlerin estetik and işlevsel birer kurumsal çıktıya dönüşme sürecine liderlik ettim.`}
                </p>
              </div>

              {/* Grid 3x3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, i) =>
                  renderGridCell(`gastronomi_grid_${i + 1}`, i + 1)
                )}
              </div>

              {/* Subtitle / Footer Info for Gastronomi */}
              <div className="w-full h-[1px] bg-white/5 my-8 animate-pulse" />
              <div className="flex justify-between items-center text-[#FF6B00]/60 select-none text-[9px] font-mono tracking-widest uppercase px-4 max-w-4xl mx-auto">
                <span>Yıldız Teknik Üniversitesi</span>
                <span className="font-sans font-black">// Gastronomi Topluluğu //</span>
              </div>

            </motion.div>
          )}

          {activeSocialTab === 'zburada' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              <div className="text-center max-w-xl mx-auto mb-8 flex flex-col items-center">
                <span className="font-mono text-[9px] tracking-[0.35em] text-[#FF6B00] font-black uppercase block mb-3">// 4 SIRA // 12 GÖRSEL ALANI //</span>
                <h2 className="flex flex-col items-center leading-none">
                  <span className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter text-white">zBurada</span>
                  <span className="font-serif italic font-light text-xl sm:text-2xl text-[#FF6B00] tracking-tight mt-1">zBurada Girişimi</span>
                </h2>
              </div>

              {/* High fidelity readable sans-serif description card */}
              <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#121215] to-[#08080a] border border-[#FF6B00]/30 rounded-2xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(255,107,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6B00]" />
                <p className="font-sans text-white/90 text-sm sm:text-base leading-relaxed text-left font-light whitespace-pre-line">
                  {`zBurada, gençlerin kariyer tercihlerinde doğru kararlar vermelerine yardımcı olmak amacıyla çeşitli simülasyon atölyeleri düzenleyen yenilikçi bir girişim fikridir. Gençlerin iş dünyasındaki gerçek senaryoları deneyimlemelerini sağlayan bu simülasyonlar, gelecek vizyonlarını şekillendirmelerine mentorluk eder.\n\nBu kategoride, zBurada girişiminin dinamik kurumsal kimliğini, 'Erasmus ile Sınırları Aşanlar' and 'Girişimci Olmak ya da Olmamak' gibi gençlik odaklı vizyoner atölyelerini and zBurada kurumsal tarzında hazırlanmış özgün sosyal medya tasarımlarını bulabilirsiniz.`}
                </p>
              </div>

              {/* Grid 4x3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {Array.from({ length: 12 }).map((_, i) =>
                  renderGridCell(`zburada_grid_${i + 1}`, i + 1)
                )}
              </div>

            </motion.div>
          )}

          {activeSocialTab === 'veribilimi' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              {/* Top Header Card */}
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#121215] to-[#08080a] border border-[#FF6B00]/30 rounded-2xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(255,107,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF6B00]" />

                <div className="mb-6">
                  <span className="font-mono text-[9px] text-[#FF6B00] tracking-[0.3em] font-bold uppercase mb-2 block">// KULÜP KURUMSAL KİMLİK TASARIMLARI</span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wider block leading-tight">
                    Yıldız Teknik Üniversitesi
                  </h2>
                  <h3 className="font-serif italic font-light text-3xl sm:text-4xl text-[#FF6B00] tracking-tight mt-1">
                    Veri Bilimi Topluluğu
                  </h3>
                </div>

                <p className="font-sans text-white/90 text-sm sm:text-base leading-relaxed text-left font-light whitespace-pre-line mb-6">
                  {`YTÜ Veri Bilimi Topluluğu’nda 1 year Grafik Tasarımcılık, 1 year Medya Koordinatörlüğü and Yönetim Kurulu Üyeliği yaparak kulübün tüm görsel dilini and medya stratejisini bizzat yönettim. Sergilediğimiz bu istikrarlı büyüme and kurumsal markalama süreci sonucunda topluluğumuz resmi olarak Kulüp statüsüne kavuşmuştur. Bu bölümdeki tüm çalışmalar, tasarımcı and yönetici olarak kulübün kurumsal kimliğine yaptığım doğrudan katkıları içermektedir.\n\nYTÜ Veri Bilimi Topluluğu bünyesinde gerçekleştirdiğimiz büyük çaplı zirveler, teknik geziler and eğitim serileri için özgün alt kimlikler kurguladım. Tasarımlarda temel amacım; veri biliminin rasyonel, fütüristik and analitik dünyasını, topluluk dinamizmine uygun, dikkat çekici dijital varlıklara dönüştürmekti. Etkinliklerin konseptine göre siberpunk neon hatlardan kurumsal teknik çizgilere kadar geniş and tutarlı bir tasarım yelpazesi belirledim.`}
                </p>
              </div>

              {/* 1. Kariyer Haritası Card Group */}
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0c0c0e] to-[#040405] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="flex flex-col mb-6">
                  <span className="font-mono text-[9px] text-[#38B6E3] tracking-[0.3em] font-bold uppercase mb-1">// KONSEPT SERİSİ</span>
                  <h3 className="font-serif text-2xl text-white font-medium tracking-tight">
                    Kariyer <span className="text-[#38B6E3] italic font-normal">Haritası</span>
                  </h3>
                </div>

                {/* Group Grid of 6 images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const imgNum = i + 1;
                    return (
                      <div key={imgNum} className="relative overflow-hidden rounded-xl bg-[#121214] aspect-square">
                        <img src={`/uploaded/veri-bilimi-toplulugu/${imgNum}.png`} alt={`Kariyer ${imgNum}`} className="w-full h-full object-cover" />
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Single Description */}
                <div className="border-t border-white/5 pt-4">
                  <p className="font-sans text-white/70 text-xs sm:text-sm leading-relaxed text-left">
                    Kariyer Haritası 7 serisinde; derin petrol mavisi zemin üzerine oturtulmuş siber ağ efektleri and ışıklı çember hatlar kullandım. Bu tasarım dili, etkinliğe katılan sektör profesyonellerinin topluluğa sunduğu rehberlik and vizyonu sembolize ederken, çoklu konuşmacı yapısını net bir bilgi mimarisiyle sunmaktadır.
                  </p>
                </div>
              </div>

              {/* 2. Yıldız Veri Günleri Card Group */}
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0c0c0e] to-[#040405] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="flex flex-col mb-6">
                  <span className="font-mono text-[9px] text-[#FF007F] tracking-[0.3em] font-bold uppercase mb-1">// RETRO RETREAT</span>
                  <h3 className="font-serif text-2xl text-white font-medium tracking-tight">
                    Yıldız <span className="text-[#FF007F] italic font-normal">Veri Günleri</span>
                  </h3>
                </div>

                {/* Group Grid of 9 images */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Array.from({ length: 9 }).map((_, i) => {
                    const imgNum = i + 7;
                    return (
                      <div key={imgNum} className="relative overflow-hidden rounded-xl bg-[#121214] aspect-square">
                        <img src={`/uploaded/veri-bilimi-toplulugu/${imgNum}.png`} alt={`Yıldız Veri ${imgNum}`} className="w-full h-full object-cover" />
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Single Description */}
                <div className="border-t border-white/5 pt-4">
                  <p className="font-sans text-white/70 text-xs sm:text-sm leading-relaxed text-left">
                    80'lerin retro dalgası (Synthwave/Retro-futurism) çizgilerinde parlayan neon pembe and camgöbeği ızgara (grid) zeminleri kullanarak, verinin zamansızlığını eğlenceli and dinamik bir parti/etkinlik havasında görselleştirdim.
                  </p>
                </div>
              </div>

              {/* 3. Yapay Zeka & Veri Bilimi Zirvesi Card Group */}
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0c0c0e] to-[#040405] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="flex flex-col mb-6">
                  <span className="font-mono text-[9px] text-[#FF6B00] tracking-[0.3em] font-bold uppercase mb-1">// INSTAGRAM PORTRAIT 3:4</span>
                  <h3 className="font-serif text-2xl text-white font-medium tracking-tight">
                    Yapay Zeka & <span className="text-[#FF6B00] italic font-normal">Veri Bilimi Zirvesi</span>
                  </h3>
                </div>

                {/* Group Grid of 6 images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const imgNum = i + 16;
                    return (
                      <div key={imgNum} className="relative overflow-hidden rounded-xl bg-[#121214] aspect-[3/4]">
                        <img src={`/uploaded/veri-bilimi-toplulugu/${imgNum}.png`} alt={`Zirve ${imgNum}`} className="w-full h-full object-cover" />
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Single Description */}
                <div className="border-t border-white/5 pt-4">
                  <p className="font-sans text-white/70 text-xs sm:text-sm leading-relaxed text-left">
                    Siberpunk esintili fütüristik turuncu tonları, derin uzay siyahıyla harmanlayarak yapay zekanın and ileri teknolojinin gizemli and güçlü yapısını yansıtan bir zirve kimliği kurgulanmıştır.
                  </p>
                </div>
              </div>

              {/* 4. Genel Çalışmalar Card Group */}
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0c0c0e] to-[#040405] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="flex flex-col mb-6">
                  <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] font-bold uppercase mb-1">// GENEL TOPLULUK ÇALIŞMALARI</span>
                  <h3 className="font-serif text-xl text-white/80 font-medium tracking-tight">
                    Teknik Gezi, Toplantı & Sosyal Etkinlikler
                  </h3>
                </div>

                {/* Group Grid of 6 images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const imgNum = i + 22;
                    return (
                      <div key={imgNum} className="relative overflow-hidden rounded-xl bg-[#121214] aspect-square">
                        <img src={`/uploaded/veri-bilimi-toplulugu/${imgNum}.png`} alt={`Sosyal ${imgNum}`} className="w-full h-full object-cover" />
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Single Description */}
                <div className="border-t border-white/5 pt-4">
                  <p className="font-sans text-white/70 text-xs sm:text-sm leading-relaxed text-left">
                    Akbank, Türk Telekom and ING gibi dev markaların kurumsal renklerini kendi kimlikleriyle bozmadan entegre ederken; tanışma kahvaltısı gibi daha sosyal etkinliklerde ise organik and sıcak flat illüstrasyonlarla topluluk içi bağları güçlendirmeyi hedefledim.
                  </p>
                </div>
              </div>

              {/* 5. Eğitimler Card Group */}
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0c0c0e] to-[#040405] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="flex flex-col mb-6">
                  <span className="font-mono text-[9px] text-[#00F0FF] tracking-[0.3em] font-bold uppercase mb-1">// AKADEMİK VE ATÖLYELER</span>
                  <h3 className="font-serif text-2xl text-white font-medium tracking-tight">
                    Eğitim <span className="text-[#00F0FF] italic font-normal">Serileri</span>
                  </h3>
                </div>

                {/* Group Grid of 6 images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const imgNum = i + 1 + 28;
                    const ext = (imgNum === 28 || imgNum === 29) ? 'jpg' : 'png';
                    return (
                      <div key={imgNum} className="relative overflow-hidden rounded-xl bg-[#121214] aspect-square">
                        <img
                          src={`/uploaded/veri-bilimi-toplulugu/${imgNum}.${ext}`}
                          alt={`Egitim ${imgNum}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-white/5 pt-4">
                  <p className="font-sans text-white/70 text-xs sm:text-sm leading-relaxed text-left">
                    Veri Bilimi Topluluğu bünyesinde düzenlenen eğitim serileri ve teknik atölyeler için hazırlanan bu tasarımlar, katılımcılara profesyonel ve tutarlı bir görsel deneyim sunmayı amaçladı.
                  </p>
                </div>

              </div>

            </motion.div>
          )}
        </div>
        </div>
      </div>
    );
  }

          if (categoryId === 'magazine') {
    const currentIssueConfig = magazineIssuesConfig.find(item => item.id === magazineData.activeIssue) || magazineIssuesConfig[0];
          const activeViewIdx = magazineData.activeViewIdxs[`mag_issue_${magazineData.activeIssue}`] || 0;
          const currentView = currentIssueConfig.views[activeViewIdx] || currentIssueConfig.views[0];

          return (
          <div className="relative min-h-screen bg-[#070707] text-white overflow-hidden animate-fadeIn">
            <input
              type="file"
              ref={magazineFileInputRef}
              onChange={handleMagazineUpload}
              className="hidden"
              accept="image/*"
            />

            <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="paper-grain opacity-85" />

            <div className="max-w-7xl mx-auto pt-28 sm:pt-32 pb-40 px-6 sm:px-12 relative z-10 text-left">
              <div className="mb-12">
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.05, x: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2.5 group cursor-pointer bg-[#A78BFA] text-black hover:bg-[#906ef5] transition-all duration-300 py-2.5 px-5 rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.25)] font-bold font-mono text-[10px] tracking-widest uppercase"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-black" />
                  <span>← Çalışmalarıma Dön</span>
                </motion.button>
              </div>

              <div className="mb-12">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold block mb-4" style={{ color: catHeading.color }}>
                  {catHeading.section}
                </span>
                <h1 className="flex flex-col items-start leading-none mb-6">
                  <span className="font-sans font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">{catHeading.part1}</span>
                  <span className="font-serif italic font-light text-2xl sm:text-3xl md:text-4xl tracking-tight mt-1" style={{ color: catHeading.color }}>{catHeading.part2}</span>
                </h1>
              </div>

              <div className="mb-12 max-w-3xl bg-white/[0.015] border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden text-left group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#A78BFA]" />

                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[9px] tracking-widest text-[#A78BFA] font-bold uppercase">// EDİTÖRYAL TANITIM METNİ</span>
                  {!isLocked && (
                    <button
                      onClick={() => {
                        setMagazineData(prev => {
                          const updated = {
                            ...prev,
                            isEditingDesc: !prev.isEditingDesc
                          };
                          saveMagazineData(updated);
                          return updated;
                        });
                      }}
                      className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#A78BFA] font-mono text-[9px] tracking-wider uppercase transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      {magazineData.isEditingDesc ? "Tamamla" : "Metni Düzenle"}
                    </button>
                  )}
                </div>

                {magazineData.isEditingDesc ? (
                  <textarea
                    value={magazineData.description}
                    onChange={(e) => {
                      const descVal = e.target.value;
                      setMagazineData(prev => {
                        const updated = {
                          ...prev,
                          description: descVal
                        };
                        saveMagazineData(updated);
                        return updated;
                      });
                    }}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-4 font-sans text-sm text-white/90 leading-relaxed focus:outline-none focus:border-[#A78BFA]/50 resize-y h-32"
                    placeholder="Dergi and yayın tasarımı hakkında açıklama metni giriniz..."
                  />
                ) : (
                  <p className="font-sans text-white/75 text-sm sm:text-base leading-relaxed font-light">
                    {magazineData.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="w-full lg:w-[260px] shrink-0 flex flex-col gap-3">
                  <span className="font-mono text-[8px] tracking-[0.25em] text-white/25 uppercase block mb-1 text-left">// EDİSASYON SEÇİMİ</span>

                  {magazineIssuesConfig.map((issue) => {
                    const isActive = magazineData.activeIssue === issue.id;
                    const coverKey = `mag_issue_${issue.id}_page_0`;
                    const coverUrl = magazineData.images[coverKey] || null;

                    return (
                      <motion.div
                        key={issue.id}
                        onClick={() => handleSelectIssue(issue.id)}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group border rounded-2xl p-4 flex gap-4 items-center cursor-pointer transition-all duration-300 text-left ${isActive
                            ? 'bg-[#A78BFA]/5 border-[#A78BFA] shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                            : 'bg-white/[0.005] border-white/5 hover:border-white/15'
                          }`}
                      >
                        <div className="w-10 h-14 rounded border border-white/10 bg-[#0c0c0f] overflow-hidden shrink-0 relative flex items-center justify-center">
                          {coverUrl ? (
                            <img src={coverUrl} alt="Cover Thumbnail" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-[100px] h-[141px] scale-[0.1] origin-top-left pointer-events-none opacity-30">
                              {renderMagazineDefaultSVG(issue.id, 0)}
                            </div>
                          )}
                          <span className="absolute bottom-0 right-0 bg-black/75 px-1 text-[5.5px] font-mono text-[#A78BFA]">S0{issue.id}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="font-mono text-[7px] text-[#A78BFA] font-bold block mb-1">EDİSASYON 0{issue.id}</span>
                          <h4 className="font-serif text-xs text-white group-hover:text-[#A78BFA] transition-colors truncate">{issue.title.split("//")[1]?.trim() || issue.title}</h4>
                          <span className="font-mono text-[6px] text-white/30 block mt-0.5 truncate">{issue.subtitle}</span>
                        </div>
                      </motion.div>
                    );
                  })}

                  {!isLocked && (
                    <button
                      onClick={handleResetIssueImages}
                      className="mt-6 inline-flex items-center justify-center gap-2 border border-white/5 hover:border-red-500/30 bg-white/[0.01] hover:bg-red-500/5 text-white/40 hover:text-red-400 py-3.5 px-4 rounded-xl font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-300"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Bu Sayıyı Sıfırla
                    </button>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-8 items-center w-full">
                  <div className="w-full flex justify-between items-center border-b border-white/5 pb-4 select-none">
                    <div className="text-left">
                      <span className="font-mono text-[8px] text-[#A78BFA] tracking-widest block mb-1 uppercase">// AKTİF TASARIM PANELİ</span>
                      <h3 className="font-serif text-xl text-white font-medium">{currentIssueConfig.title}</h3>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-1.5 font-mono text-[9px] text-[#A78BFA]">
                      <BookOpen className="w-4 h-4 text-[#A78BFA]" />
                      <span>{activeViewIdx + 1} / {currentIssueConfig.views.length} GÖRÜNÜM</span>
                    </div>
                  </div>

                  <div className="relative w-full max-w-4xl aspect-[1.414/1] bg-black/40 border border-white/5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex divide-x divide-white/10">
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-16 bg-gradient-to-r from-black/0 via-black/45 to-black/0 pointer-events-none z-20" />

                    <div className="flex-1 h-full relative group/left overflow-hidden bg-[#0c0c0f] flex items-center justify-center">
                      {currentView.leftPageIdx === null ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#070709] opacity-90 p-8 select-none">
                          <div className="w-1.5 h-full bg-gradient-to-r from-black/20 via-white/5 to-black/40 border-r border-white/5 absolute right-0" />
                          <span className="font-mono text-[9px] tracking-[0.4em] text-white/15 uppercase rotate-90">// FRONT_COVER_CLOSED</span>
                        </div>
                      ) : (
                        (() => {
                          const pageKey = `mag_issue_${magazineData.activeIssue}_page_${currentView.leftPageIdx}`;
                          const imgUrl = magazineData.images[pageKey] || null;
                          return (
                            <div
                              className={`w-full h-full relative ${isLocked ? 'cursor-default' : 'cursor-pointer'}`}
                              onClick={isLocked ? undefined : () => {
                                currentMagazineUploadSlot.current = pageKey;
                                magazineFileInputRef.current?.click();
                              }}
                            >
                              {imgUrl ? (
                                <img src={imgUrl} alt="Magazine Left Page" className="w-full h-full object-cover animate-fadeIn" referrerPolicy="no-referrer" />
                              ) : (
                                renderMagazineDefaultSVG(magazineData.activeIssue, currentView.leftPageIdx)
                              )}
                              {!isLocked && (
                                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                  <Upload className="w-5 h-5 text-[#A78BFA]" />
                                  <span className="font-mono text-[9px] text-[#A78BFA] font-bold">SOL SAYFAYI DEĞİŞTİR</span>
                                  <span className="font-mono text-[7px] text-white/45">Sayfa {currentView.leftPageIdx}</span>
                                </div>
                              )}
                            </div>
                          );
                        })()
                      )}
                    </div>

                    <div className="flex-1 h-full relative group/right overflow-hidden bg-[#0c0c0f] flex items-center justify-center">
                      {currentView.rightPageIdx === null ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#070709] opacity-90 p-8 select-none">
                          <div className="w-1.5 h-full bg-gradient-to-l from-black/20 via-white/5 to-black/40 border-l border-white/5 absolute left-0" />
                          <span className="font-mono text-[9px] tracking-[0.4em] text-white/15 uppercase -rotate-90">// END_OF_SPREAD</span>
                        </div>
                      ) : (
                        (() => {
                          const pageKey = `mag_issue_${magazineData.activeIssue}_page_${currentView.rightPageIdx}`;
                          const imgUrl = magazineData.images[pageKey] || null;
                          return (
                            <div
                              className={`w-full h-full relative ${isLocked ? 'cursor-default' : 'cursor-pointer'}`}
                              onClick={isLocked ? undefined : () => {
                                currentMagazineUploadSlot.current = pageKey;
                                magazineFileInputRef.current?.click();
                              }}
                            >
                              {imgUrl ? (
                                <img src={imgUrl} alt="Magazine Right Page" className="w-full h-full object-cover animate-fadeIn" referrerPolicy="no-referrer" />
                              ) : (
                                renderMagazineDefaultSVG(magazineData.activeIssue, currentView.rightPageIdx)
                              )}
                              {!isLocked && (
                                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                  <Upload className="w-5 h-5 text-[#A78BFA]" />
                                  <span className="font-mono text-[9px] text-[#A78BFA] font-bold">
                                    {currentView.rightPageIdx === 0 ? "KAPAĞI DEĞİŞTİR" : "SAĞ SAYFAYI DEĞİŞTİR"}
                                  </span>
                                  <span className="font-mono text-[7px] text-white/45">
                                    {currentView.rightPageIdx === 0 ? "Kapak Sayfası" : `Sayfa ${currentView.rightPageIdx}`}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })()
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 select-none">
                    <motion.button
                      onClick={() => handleGoToView(activeViewIdx - 1)}
                      disabled={activeViewIdx === 0}
                      whileHover={{ scale: activeViewIdx > 0 ? 1.05 : 1, x: activeViewIdx > 0 ? -3 : 0 }}
                      whileTap={{ scale: activeViewIdx > 0 ? 0.95 : 1 }}
                      className={`inline-flex items-center gap-2 border rounded-full py-3 px-6 font-mono text-[9px] font-bold tracking-widest uppercase cursor-pointer transition-all ${activeViewIdx === 0
                          ? 'border-white/5 text-white/20 opacity-40 cursor-not-allowed'
                          : 'border-white/15 text-white hover:border-[#A78BFA] hover:bg-[#A78BFA]/5'
                        }`}
                    >
                      <ChevronLeft className="w-4 h-4 text-[#A78BFA]" />
                      Önceki Sayfa
                    </motion.button>

                    <motion.button
                      onClick={() => handleGoToView(activeViewIdx + 1)}
                      disabled={activeViewIdx === currentIssueConfig.views.length - 1}
                      whileHover={{ scale: activeViewIdx < currentIssueConfig.views.length - 1 ? 1.05 : 1, x: activeViewIdx < currentIssueConfig.views.length - 1 ? 3 : 0 }}
                      whileTap={{ scale: activeViewIdx < currentIssueConfig.views.length - 1 ? 0.95 : 1 }}
                      className={`inline-flex items-center gap-2 border rounded-full py-3 px-6 font-mono text-[9px] font-bold tracking-widest uppercase cursor-pointer transition-all ${activeViewIdx === currentIssueConfig.views.length - 1
                          ? 'border-white/5 text-white/20 opacity-40 cursor-not-allowed'
                          : 'border-white/15 text-white hover:border-[#A78BFA] hover:bg-[#A78BFA]/5'
                        }`}
                    >
                      Sonraki Sayfa
                      <ChevronRight className="w-4 h-4 text-[#A78BFA]" />
                    </motion.button>
                  </div>

                  <div className="w-full flex flex-col gap-3 select-none text-left">
                    <span className="font-mono text-[8px] tracking-[0.25em] text-white/20 uppercase">// TÜM SAYFALAR (Tıklayarak Sayfaya Git)</span>

                    <div className="w-full grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
                      {Array.from({ length: currentIssueConfig.totalPages }).map((pIdx) => {
                        const pageKey = `mag_issue_${magazineData.activeIssue}_page_${pIdx}`;
                        const pageUrl = magazineData.images[pageKey] || null;

                        const containingViewIdx = currentIssueConfig.views.findIndex(v =>
                          v.rightPageIdx === pIdx || v.leftPageIdx === pIdx
                        );
                        const isThumbActive = activeViewIdx === containingViewIdx;

                        return (
                          <div
                            key={pIdx}
                            onClick={() => handleGoToPage(pIdx)}
                            className={`group/thumb relative rounded-xl border bg-[#060608] aspect-[0.707/1] overflow-hidden cursor-pointer transition-all duration-300 ${isThumbActive
                                ? 'border-[#A78BFA] scale-103 shadow-[0_0_12px_rgba(167,139,250,0.15)] ring-1 ring-[#A78BFA]/30'
                                : 'border-white/5 opacity-60 hover:opacity-100 hover:border-white/20'
                              }`}
                          >
                            {pageUrl ? (
                              <img src={pageUrl} alt={`Page ${pIdx} Thumb`} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-[100px] h-[141px] scale-[0.3] origin-top-left pointer-events-none opacity-40">
                                {renderMagazineDefaultSVG(magazineData.activeIssue, pIdx)}
                              </div>
                            )}

                            {!isLocked && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  currentMagazineUploadSlot.current = pageKey;
                                  magazineFileInputRef.current?.click();
                                }}
                                className="absolute bottom-1 right-1 w-5 h-5 rounded bg-black/70 hover:bg-black border border-white/10 hover:border-[#A78BFA]/50 flex items-center justify-center text-white hover:text-[#A78BFA] transition-all"
                              >
                                <Upload className="w-3 h-3" />
                              </button>
                            )}

                            <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-sm rounded px-1.5 py-0.5 text-[6.5px] font-mono text-white/50 group-hover/thumb:text-[#A78BFA]">
                              {pIdx === 0 ? "Kapak" : `S0${pIdx}`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          );
  }

          if (categoryId === 'products') {
    const getCircularDistance = (idx: number, activeIdx: number, total: number) => {
            let diff = idx - activeIdx;
          while (diff < -total / 2) diff += total;
      while (diff > total / 2) diff -= total;
          return diff;
    };

    const getPosterMetadata = (idx: number) => {
      const paths = [
          '/uploaded/alternatif-afis-tasarimlari/1.png',
          '/uploaded/alternatif-afis-tasarimlari/2.png',
          '/uploaded/alternatif-afis-tasarimlari/3.png',
          '/uploaded/alternatif-afis-tasarimlari/4.png',
          '/uploaded/alternatif-afis-tasarimlari/5.png',
          '/uploaded/alternatif-afis-tasarimlari/6.png',
          '/uploaded/alternatif-afis-tasarimlari/7.png',
          '/uploaded/alternatif-afis-tasarimlari/8.png',
          '/uploaded/alternatif-afis-tasarimlari/9.png',
          '/uploaded/alternatif-afis-tasarimlari/10.png',
          '/uploaded/alternatif-afis-tasarimlari/11.png',
          '/uploaded/alternatif-afis-tasarimlari/12.jpg',
          '/uploaded/alternatif-afis-tasarimlari/13.png'
          ];

          return {
            title: "",
          concept: "",
          desc: "Minimal grafik tasarım geleneğinden ilham alan, asimetrik grid mizanpajı and negatif alan dengesi üzerine kurulu deneysel afiş çalışması. Tipografinin salt bir bilgi aktarım aracı değil, kendi başına görsel bir enstrüman olarak kurgulandığı kompozisyon.",
          path: paths[idx] || `/uploaded/alternatif-afis-tasarimlari/${idx + 1}.png`
      };
    };

          const posterMeta = getPosterMetadata(productsActiveIdx);
  
    const handleWheel = (e: React.WheelEvent) => {
      const now = Date.now();
          if (now - productsWheelTimeRef.current < 700) return;
      if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 15) {
        if (e.deltaY > 0 || e.deltaX > 0) {
            setProductsActiveIdx(prev => (prev + 1) % 13);
        } else {
            setProductsActiveIdx(prev => (prev - 1 + 13) % 13);
        }
          productsWheelTimeRef.current = now;
      }
    };
  
    const handleDragEnd = (_event: any, info: any) => {
      const threshold = 40;
          if (info.offset.x < -threshold) {
            setProductsActiveIdx(prev => (prev + 1) % 13);
      } else if (info.offset.x > threshold) {
            setProductsActiveIdx(prev => (prev - 1 + 13) % 13);
      }
    };

          const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

          return (
          <div
            className="relative min-h-screen bg-[#050508] text-white overflow-y-auto animate-fadeIn select-none flex flex-col pt-24 pb-16 scroll-smooth"
          >
            <input
              type="file"
              ref={productsFileInputRef}
              onChange={handleProductsUpload}
              className="hidden"
              accept="image/*" />

            <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="paper-grain opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full relative z-10 flex flex-col items-start mb-4">
              <div className="mb-10">
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.03, x: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 group cursor-pointer bg-white/5 text-white/70 hover:text-white border border-white/10 hover:bg-white/10 transition-all py-2 px-4 rounded-xl font-bold font-mono text-[9px] tracking-widest uppercase"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-white/70" />
                  <span>← GERİ DÖN</span>
                </motion.button>
              </div>

              <div className="mb-8">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#FF4E20]/80 uppercase font-bold block mb-3 animate-fade-in">
                  {catHeading.section}
                </span>
                <h1 className="flex flex-col items-start leading-none mb-6">
                  <span className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">Alternatif</span>
                  <span className="font-serif italic font-light text-2xl sm:text-3xl md:text-4xl tracking-tight mt-1 text-[#FF4E20]">Afiş Tasarımları</span>
                </h1>
              </div>

              <div className="mb-8 max-w-3xl bg-white/[0.015] border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden text-left shadow-2xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FF4E20]" />
                <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light">
                  Tasarım dünyasında sınırları zorlayan, <strong>modern Minimal tipografisinden</strong> esinlenmiş <strong>asimetrik mizanpajlar</strong>, <strong>minimalist geometrik soyutlamalar</strong> and <strong>estetik bütünlük</strong> arayışındaki 12 dikey and 1 yatay afiş çalışmasının yer aldığı küratöryel sergileme alanı. Her bir çalışma, görsel bir enstrüman and kavramsal bir dil olarak kurgulanmıştır.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-1.5 py-4 w-full text-white/35 animate-pulse mt-4">
                <span className="font-mono text-[8px] tracking-[0.25em] uppercase">AŞAĞIYA KAYDIRARAK SERGİYİ GEZİN // SCROLL DOWN TO EXPLORE GALLERY</span>
                <ArrowUp className="w-3.5 h-3.5 rotate-180 text-[#FF4E20]/80" />
              </div>
            </div>

            <div
              onWheel={handleWheel}
              className="relative w-full border-t border-white/5 pt-32 pb-12 mt-10 overflow-visible flex flex-col justify-between"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none w-full">
                <div className="w-24 h-1.5 bg-[#121218] rounded-full border-b border-white/10 shadow-lg" />
                <div className="w-3 h-5 bg-[#1c1c24] border-x border-white/5" />
                <div className="w-14 h-12 bg-gradient-to-r from-[#181822] via-[#242432] to-[#181822] rounded-md border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.9)] flex flex-col justify-end items-center relative overflow-hidden">
                  <div className="absolute top-2 inset-x-2 h-[2px] bg-black/40" />
                  <div className="absolute top-4 inset-x-2 h-[2px] bg-black/40" />
                  <div className="absolute top-6 inset-x-2 h-[2px] bg-black/40" />
                  <div className="w-full h-2.5 bg-gradient-to-r from-[#FF4E20]/80 via-[#fdfdfd] to-[#FF4E20]/80 border-t border-white/20" />
                  <div className="w-7 h-1 bg-white rounded-full filter blur-[1px] shadow-[0_0_20px_9px_rgba(255,255,255,0.95),0_0_40px_15px_rgba(255,78,32,0.4)] animate-pulse" />
                </div>
                <div className="w-16 h-16 bg-[#FF4E20]/25 rounded-full filter blur-md -mt-2 animate-pulse" />
              </div>

              <div
                className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[650px] pointer-events-none z-10 mix-blend-screen opacity-95 transition-all duration-700"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.11) 0%, rgba(255,78,32,0.02) 45%, transparent 100%)',
                  clipPath: 'polygon(50% 0%, 15% 100%, 85% 100%)',
                }}
              />
              <div
                className="absolute top-12 left-1/2 -translate-x-1/2 w-[480px] h-[600px] pointer-events-none z-10 mix-blend-screen opacity-95 transition-all duration-700"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 35%, transparent 100%)',
                  clipPath: 'polygon(50% 0%, 28% 100%, 72% 100%)',
                }}
              />
              <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-r from-[#FF4E20]/[0.06] to-[#FF4E20]/[0.06] rounded-full filter blur-[100px] pointer-events-none z-0 mix-blend-screen" />

              <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 flex-1 flex flex-col justify-between w-full">

                <div className="relative w-full h-[400px] sm:h-[460px] md:h-[500px] flex items-center justify-center overflow-visible [perspective:1400px] my-auto">

                  <div className="absolute left-0 sm:left-4 md:left-8 lg:left-12 z-30">
                    <motion.button
                      onClick={() => setProductsActiveIdx(prev => (prev - 1 + 13) % 13)}
                      whileHover={{ scale: 1.05, x: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full border border-white/10 hover:border-[#FF4E20] bg-black/60 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer shadow-xl"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                  </div>

                  <div className="absolute right-0 sm:right-4 md:right-8 lg:right-12 z-30">
                    <motion.button
                      onClick={() => setProductsActiveIdx(prev => (prev + 1) % 13)}
                      whileHover={{ scale: 1.05, x: 3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full border border-white/10 hover:border-[#FF4E20] bg-black/60 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer shadow-xl"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {Array.from({ length: 13 }).map((_, idx) => {
                    const slotKey = `products_afis_${idx + 1}`;
                    const extension = (idx === 11) ? 'jpg' : 'png';
                    const imgUrl = productsData.images[slotKey] || `/uploaded/alternatif-afis-tasarimlari/${idx + 1}.${extension}`;
                    const isActive = idx === productsActiveIdx;
                    const isHorizontal = idx === 12;

                    const diff = getCircularDistance(idx, productsActiveIdx, 13);
                    const absDiff = Math.abs(diff);

                    const isVisible = absDiff <= 2;

                    const activeWidth = isHorizontal ? (isMobile ? 345 : isTablet ? 475 : 565) : (isMobile ? 210 : isTablet ? 270 : 315);
                    const inactiveWidth = isHorizontal ? (isMobile ? 180 : isTablet ? 240 : 280) : (isMobile ? 120 : isTablet ? 160 : 190);
                    const currentWidth = diff === 0 ? activeWidth : inactiveWidth;
                    const aspectRatio = isHorizontal ? '1.5 / 1' : '1 / 1.414';

                    let scale = 1.0;
                    let rotateY = 0;
                    let translateZ = 0;
                    let opacity = 0;
                    let zIndex = 10;
                    let translateX = 0;

                    if (isVisible) {
                      opacity = 1.0;
                      if (diff === 0) {
                        scale = 1.0;
                        rotateY = 0;
                        translateZ = 180;
                        zIndex = 50;
                      } else if (diff === -1) {
                        scale = 0.75;
                        rotateY = 24;
                        translateZ = 0;
                        translateX = isMobile ? -110 : isTablet ? -200 : -270;
                        opacity = 0.65;
                        zIndex = 30;
                      } else if (diff === 1) {
                        scale = 0.75;
                        rotateY = -24;
                        translateZ = 0;
                        translateX = isMobile ? 110 : isTablet ? 200 : 270;
                        opacity = 0.65;
                        zIndex = 30;
                      } else if (diff === -2) {
                        scale = 0.52;
                        rotateY = 36;
                        translateZ = -120;
                        translateX = isMobile ? -200 : isTablet ? -370 : -490;
                        opacity = 0.32;
                        zIndex = 20;
                        if (isMobile) opacity = 0;
                      } else if (diff === 2) {
                        scale = 0.52;
                        rotateY = -36;
                        translateZ = -120;
                        translateX = isMobile ? 200 : isTablet ? 370 : 490;
                        opacity = 0.32;
                        zIndex = 20;
                        if (isMobile) opacity = 0;
                      }
                    } else {
                      opacity = 0;
                      scale = 0.35;
                      translateZ = -220;
                      translateX = diff < 0 ? -600 : 600;
                      zIndex = 10;
                    }

                    return (
                      <motion.div
                        key={slotKey}
                        animate={{
                          x: translateX,
                          scale: scale,
                          rotateY: rotateY,
                          z: translateZ,
                          opacity: opacity,
                          width: currentWidth,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 18,
                        }}
                        style={{
                          aspectRatio: aspectRatio,
                          zIndex: zIndex,
                        }}
                        onClick={() => {
                          if (!isActive) {
                            setProductsActiveIdx(idx);
                          }
                        }}
                        drag={isActive ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={isActive ? handleDragEnd : undefined}
                        className={`absolute group ${isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} select-none`}
                      >
                        <div
                          className={`w-full h-full bg-[#fdfdfd] p-3.5 sm:p-5 md:p-6 rounded-[2px] transition-all duration-500 flex flex-col justify-between relative ${isActive
                              ? 'shadow-[0_45px_85px_-20px_rgba(0,0,0,0.95),_0_0_35px_rgba(255,255,255,0.02)] border-r-[4px] border-b-[4px] border-[#d4d4d8]'
                              : 'shadow-[0_20px_45px_-12px_rgba(0,0,0,0.85)] border-r-[3px] border-b-[3px] border-[#c0c0c5]'
                            }`}
                        >
                          <div className="absolute inset-1.5 border border-black/5 rounded-[1px] pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.03] to-white/[0.02] pointer-events-none" />

                          <div className="w-full h-full bg-[#f5f5f5] p-3 sm:p-4 md:p-5 border border-gray-200/60 flex items-center justify-center relative overflow-hidden shadow-inner">
                            <div className="absolute inset-[11px] sm:inset-[15px] md:inset-[19px] border border-black/10 pointer-events-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]" />

                            <div className="w-full h-full bg-[#e8e8ed] relative flex items-center justify-center overflow-hidden border border-black/[0.04]">
                              {imgUrl ? (
                                <img
                                  src={imgUrl}
                                  alt={`Poster ${idx + 1}`}
                                  className={`w-full h-full ${isHorizontal ? 'object-contain bg-[#f9f9fb]' : 'object-cover'}`}
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center p-3 text-center">
                                  <ImageIcon className="w-7 h-7 text-black/15 mb-2" />
                                  <span className="font-mono text-[7px] text-black/35 uppercase tracking-widest font-bold">
                                    {isHorizontal ? 'YATAY AFİŞ' : `AFİŞ ${idx + 1 < 10 ? `0${idx + 1}` : idx + 1}`}
                                  </span>
                                  <span className="font-sans text-[7px] text-black/25 mt-0.5">Görsel Yok</span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                            </div>
                          </div>

                          <div className="mt-3.5 flex justify-between items-center px-1 text-black/45 font-mono text-[5.5px] sm:text-[6.5px] tracking-widest select-none">
                            <span>NEZİHA ŞİMŞEK</span>
                            <span>{isHorizontal ? 'YATAY SEÇKİ // LANDSCAPE' : `SERİ: #${idx + 1 < 10 ? `0${idx + 1}` : idx + 1}`}</span>
                          </div>

                          {isActive && !isLocked && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                currentProductsUploadSlot.current = `products_afis_${idx + 1}`;
                                productsFileInputRef.current?.click();
                              }}
                              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-[#FF4E20] border border-white/10 text-white/80 hover:text-white hover:scale-105 transition-all duration-300 pointer-events-auto shadow-lg backdrop-blur-sm"
                              title="Görseli Değiştir / Yükle"
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* BOTTOM THUMBNAILS */}
                <div className="mt-4 w-full relative z-10 border-t border-white/5 pt-5">
                  <div className="flex items-center justify-between mb-3.5 px-1">
                    <span className="font-mono text-[8px] text-white/45 tracking-wider uppercase">SERGİ ŞERİDİ // INDEX STRIP</span>
                    <span className="font-mono text-[8px] text-[#FF4E20]/80 tracking-widest font-semibold uppercase">12 DIKEY + 1 YATAY TASARIM</span>
                  </div>

                  <div className="flex gap-4 items-center w-full">
                    <div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-1.5 scrollbar-hide snap-x flex-1">
                      {Array.from({ length: 12 }).map((_, idx) => {
                        const slotKey = `products_afis_${idx + 1}`;
                        const extension = (idx === 11) ? 'jpg' : 'png';
                        const imgUrl = productsData.images[slotKey] || `/uploaded/alternatif-afis-tasarimlari/${idx + 1}.${extension}`;
                        const isActive = idx === productsActiveIdx;

                        return (
                          <div
                            key={`thumb_${slotKey}`}
                            onClick={() => setProductsActiveIdx(idx)}
                            className={`snap-center shrink-0 w-[44px] sm:w-[54px] aspect-[1/1.414] border rounded-md overflow-hidden cursor-pointer relative transition-all duration-300 ${isActive
                                ? 'border-[#FF4E20] ring-2 ring-[#FF4E20]/30 scale-103 shadow-lg shadow-[#FF4E20]/20'
                                : 'border-white/10 hover:border-white/25 grayscale-[35%] hover:grayscale-0'
                              }`}
                          >
                            {imgUrl ? (
                              <img
                                src={imgUrl}
                                alt={`Mini ${idx + 1}`}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#0c0c12] flex flex-col items-center justify-center">
                                <span className="font-mono text-[6.5px] text-white/35 font-semibold">
                                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                </span>
                              </div>
                            )}
                            {isActive && (
                              <div className="absolute inset-0 bg-[#FF4E20]/10 mix-blend-screen pointer-events-none" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="h-10 w-[1px] bg-white/10 self-center shrink-0 mx-1 sm:mx-2" />

                    {(() => {
                      const idx = 12;
                      const slotKey = `products_afis_${idx + 1}`;
                      const imgUrl = productsData.images[slotKey] || `/uploaded/alternatif-afis-tasarimlari/${idx + 1}.png`;
                      const isActive = idx === productsActiveIdx;

                      return (
                        <div className="flex flex-col items-end shrink-0 select-none">
                          <div
                            onClick={() => setProductsActiveIdx(idx)}
                            className={`snap-center shrink-0 w-[78px] sm:w-[94px] aspect-[1.414/1] border rounded-md overflow-hidden cursor-pointer relative transition-all duration-300 ${isActive
                                ? 'border-[#FF4E20] ring-2 ring-[#FF4E20]/30 scale-103 shadow-lg shadow-[#FF4E20]/20'
                                : 'border-white/15 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                              }`}
                          >
                            {imgUrl ? (
                              <img
                                src={imgUrl}
                                alt="Mini Horizontal"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#0c0c12] flex flex-col items-center justify-center">
                                <span className="font-mono text-[8px] text-[#FF4E20]/80 font-bold">13</span>
                                <span className="font-sans text-[6px] text-white/35">Horizontal</span>
                              </div>
                            )}
                            {isActive && (
                              <div className="absolute inset-0 bg-[#FF4E20]/15 mix-blend-screen pointer-events-none" />
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

              </div>
            </div>

          </div>
          );
  }

          if (categoryId === 'apps') {
    const targetDayIndex = (() => {
      const day = new Date(calendarYear, calendarMonth, 1).getDay();
          return day === 0 ? 6 : day - 1;
    })();

          const MONTH_NAMES = [
          "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
          "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
          ];
          const WEEKDAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Par"];

          const yakaFrontUrl = appsData.images['apps_yaka_1'] || '/uploaded/yaka-kartı/kart-tasarım.png';
          const yakaBackUrl = appsData.images['apps_yaka_2'] || '/uploaded/yaka-kartı/model.jpeg';

          const chocolateBoxUrl1 = appsData.images['apps_cikolata_1'] || '/uploaded/kutu/dıs.jpeg';
          const chocolateBoxUrl2 = appsData.images['apps_cikolata_2'] || '/uploaded/kutu/ic.jpeg';

          const baseTakvimPhotoUrl = appsData?.images?.['apps_takvim_foto'] || '/uploaded/takvim/takim-fiziki.jpeg';
          const takvimPhotoUrl = baseTakvimPhotoUrl ? `${baseTakvimPhotoUrl}` : '';

          const baseTakvimBackdropUrl = appsData?.images?.['apps_takvim_backdrop'] || '/uploaded/takvim/takvim-arkaplan.png';
          const takvimBackdropUrl = baseTakvimBackdropUrl ? `${baseTakvimBackdropUrl}` : '';

          const isCalendarMatched = calendarUserDayIndex === targetDayIndex;
          return (
          <div className="relative min-h-screen bg-[#070707] text-white overflow-hidden animate-fadeIn">
            <input
              type="file"
              ref={appsFileInputRef}
              onChange={handleAppsUpload}
              className="hidden"
              accept="image/*"
            />
            <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="paper-grain opacity-85" />

            <div className="max-w-7xl mx-auto pt-28 sm:pt-32 pb-40 px-6 sm:px-12 relative z-10 text-left">
              <div className="mb-12">
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.03, x: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2.5 group cursor-pointer bg-[#F43F5E] text-white hover:bg-[#E11D48] transition-all duration-300 py-2.5 px-5 rounded-xl shadow-[0_4px_20px_rgba(244,63,94,0.25)] font-bold font-mono text-[10px] tracking-widest uppercase"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-white" />
                  <span>← Çalışmalarıma Dön</span>
                </motion.button>
              </div>

              <div className="mb-16 border-b border-white/5 pb-10">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold block mb-4" style={{ color: catHeading.color }}>
                  {catHeading.section}
                </span>
                <h1 className="flex flex-col items-start leading-none mb-6">
                  <span className="font-sans font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">{catHeading.part1}</span>
                  <span className="font-serif italic font-light text-2xl sm:text-3xl md:text-4xl tracking-tight mt-1" style={{ color: catHeading.color }}>{catHeading.part2}</span>
                </h1>
                <p className="font-sans text-sm sm:text-base text-white/55 leading-relaxed font-light mt-6 max-w-3xl">
                  {catHeading.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col bg-[#0d0d12]/80 border border-white/5 rounded-3xl p-6 sm:p-8 hover:border-[#F43F5E]/20 transition-all duration-500 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#F43F5E]/5 rounded-full blur-[80px] pointer-events-none" />

                  <span className="font-mono text-[9px] text-[#F43F5E] tracking-[0.2em] font-bold uppercase mb-2 block">// YAKA KARTI TASARIMI & MODEL</span>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#00F0FF] tracking-tight leading-tight uppercase mb-1">
                    Yaka Kartı Tasarımı
                  </h3>
                  <h4 className="font-serif italic text-white/70 text-base sm:text-lg mb-4">
                    Architecht Teknoloji Sohbetleri
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-white/65 font-light leading-relaxed mb-6">
                    Kurumsal etkinlik kimliğini güçlendirmek amacıyla tasarlanan, şeffaf akrilik malzemeye özel kesim formu and kişiye özel illüstrasyonlarla hazırlanan yaka kartı tasarımı.
                  </p>

                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black/40 mb-6 group-hover:border-white/20 transition-all">
                    <img
                      src={yakaActiveSlide === 0 ? yakaFrontUrl : yakaBackUrl}
                      alt={yakaActiveSlide === 0 ? "Yaka Kartı Tasarım" : "Yaka Kartı Model"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between pointer-events-auto">
                      <button
                        onClick={() => setYakaActiveSlide(prev => prev === 0 ? 1 : 0)}
                        className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10 shadow-lg text-white"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-mono text-[9px] text-white/80 uppercase tracking-widest font-semibold">
                        {yakaActiveSlide === 0 ? "KART TASARIMI" : "MODEL ÜZERİNDEKİ HALİ"}
                      </div>

                      <button
                        onClick={() => setYakaActiveSlide(prev => prev === 0 ? 1 : 0)}
                        className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10 shadow-lg text-white"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div
                      onClick={() => {
                        currentAppsUploadSlot.current = yakaActiveSlide === 0 ? 'apps_yaka_1' : 'apps_yaka_2';
                        appsFileInputRef.current?.click();
                      }}
                      className="absolute top-4 right-4 bg-black/60 backdrop-blur-md hover:bg-white hover:text-black hover:scale-105 border border-white/10 text-white font-mono text-[8px] tracking-widest uppercase py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-xl"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Değiştir</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 mb-6">
                    <span
                      onClick={() => setYakaActiveSlide(0)}
                      className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${yakaActiveSlide === 0 ? 'bg-[#F43F5E] w-6' : 'bg-white/10 hover:bg-white/30'}`}
                    />
                    <span
                      onClick={() => setYakaActiveSlide(1)}
                      className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${yakaActiveSlide === 1 ? 'bg-[#F43F5E] w-6' : 'bg-white/10 hover:bg-white/30'}`}
                    />
                  </div>

                  <div className="mt-auto pt-5 border-t border-white/5 flex flex-col gap-1.5">
                    <span className="font-mono text-[8px] text-[#00F0FF] tracking-wider uppercase font-bold">// KUTU AÇIKLAMA</span>
                    <p className="font-sans text-[11px] text-white/55 leading-relaxed">
                      Architecht Teknoloji Sohbetleri etkinlik ambalajı için tasarlanan bu yaka kartında, standart kart anlayışının dışına çıkarak şeffaf akrilik yüzey, özel kesim formu and katılımcıya özel dijital illüstrasyon bir araya getirildi.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col bg-[#0d0d12]/80 border border-white/5 rounded-3xl p-6 sm:p-8 hover:border-[#F43F5E]/20 transition-all duration-500 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#F43F5E]/5 rounded-full blur-[80px] pointer-events-none" />

                  <span className="font-mono text-[9px] text-[#F43F5E] tracking-[0.2em] font-bold uppercase mb-2 block">// KÜLTÜR HEDİYESİ & AMBALAJ</span>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#00F0FF] tracking-tight leading-tight uppercase mb-1">
                    Çikolata Kutusu Tasarımı
                  </h3>
                  <h4 className="font-serif italic text-white/70 text-base sm:text-lg mb-4">
                    Architecht 2026 Ramazan Bayramı Ambalajı
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-white/65 font-light leading-relaxed mb-6">
                    Kurumsal bayramlaşma sürecini güçlendirmek amacıyla tasarlanan, özel illüstrasyonlar and marka kimliğiyle bütünleşen premium çikolata kutusu tasarımı.
                  </p>

                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black/40 mb-6 group-hover:border-white/20 transition-all flex items-center justify-center">
                    {((chocolateActiveSlide === 0 ? chocolateBoxUrl1 : chocolateBoxUrl2)) ? (
                      <img
                        src={chocolateActiveSlide === 0 ? chocolateBoxUrl1 : chocolateBoxUrl2}
                        alt={chocolateActiveSlide === 0 ? "Kutu Dış Tasarım" : "Kutu İç Tasarım"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-4 text-white/30 group-hover:text-[#F43F5E]/70 group-hover:bg-[#F43F5E]/5 transition-all duration-500">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-[10px] text-white/40 tracking-wider uppercase group-hover:text-[#F43F5E] transition-colors">
                          {chocolateActiveSlide === 0 ? "DIŞ TASARIM GÖRSELİ" : "İÇ TASARIM GÖRSELİ"}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between pointer-events-auto z-10">
                      <button
                        onClick={() => setChocolateActiveSlide(prev => prev === 0 ? 1 : 0)}
                        className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10 shadow-lg text-white"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-mono text-[9px] text-white/80 uppercase tracking-widest font-semibold">
                        {chocolateActiveSlide === 0 ? "DIŞ TASARIM" : "İÇ TASARIM"}
                      </div>

                      <button
                        onClick={() => setChocolateActiveSlide(prev => prev === 0 ? 1 : 0)}
                        className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10 shadow-lg text-white"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div
                      onClick={() => {
                        currentAppsUploadSlot.current = chocolateActiveSlide === 0 ? 'apps_cikolata_1' : 'apps_cikolata_2';
                        appsFileInputRef.current?.click();
                      }}
                      className="absolute top-4 right-4 bg-black/60 backdrop-blur-md hover:bg-white hover:text-black hover:scale-105 border border-white/10 text-white font-mono text-[8px] tracking-widest uppercase py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-xl z-10"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Görsel Yükle</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 mb-6">
                    <span
                      onClick={() => setChocolateActiveSlide(0)}
                      className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${chocolateActiveSlide === 0 ? 'bg-[#F43F5E] w-6' : 'bg-white/10 hover:bg-white/30'}`}
                    />
                    <span
                      onClick={() => setChocolateActiveSlide(1)}
                      className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${chocolateActiveSlide === 1 ? 'bg-[#F43F5E] w-6' : 'bg-white/10 hover:bg-white/30'}`}
                    />
                  </div>

                  <div className="mt-auto pt-5 border-t border-white/5 flex flex-col gap-1.5">
                    <span className="font-mono text-[8px] text-[#F43F5E] tracking-wider uppercase font-bold">// KUTU İÇİNDEKİ AÇIKLAMA</span>
                    <p className="font-sans text-[11px] text-white/55 leading-relaxed">
                      Architecht için Ramazan Bayramı ambalajı kapsamında tasarlanan bu özel kutuda suluboya dokuları, İstanbul silüeti and kurumsal görsel dil bir araya getirildi.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* SECTION: ZAMANSIZ MASA TAKVİMİ */}
              <div className="mt-28 relative">
                <div className="mb-12">
                  <span className="font-mono text-[10px] text-[#00F0FF] tracking-[0.2em] font-bold uppercase mb-3 block">// BÖLÜM 06.B // FİZİKSEL MEKANİZMA SİMÜLASYONU</span>
                  <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
                    ZAMANSIZ MASA TAKVİMİ
                  </h2>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-[#00F0FF] to-[#00d8e6] rounded-full mt-4" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative mb-16">

                  <div className="lg:col-span-4 bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col gap-5">
                    <h4 className="font-mono text-[10px] text-[#00F0FF] tracking-widest font-bold uppercase">// SİMÜLATÖR AYARLARI</h4>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest">AY SEÇİN</label>
                      <select
                        value={calendarMonth}
                        onChange={(e) => setCalendarMonth(parseInt(e.target.value))}
                        className="bg-[#111116] text-white border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#00F0FF] transition-colors cursor-pointer"
                      >
                        {MONTH_NAMES.map((name, i) => (
                          <option key={i} value={i}>{name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest">YIL SEÇİN</label>
                      <input
                        type="number"
                        value={calendarYear}
                        onChange={(e) => setCalendarYear(parseInt(e.target.value) || 2026)}
                        min={2000}
                        max={2100}
                        className="bg-[#111116] text-white border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#00F0FF] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest">SÜRGÜ HİZALAMA KONTROLÜ (SÜRÜKLE)</label>
                      <div className="flex justify-between text-[8px] font-mono text-white/40">
                        <span>SOLA KAYDIR</span>
                        <span className="text-[#00F0FF] font-bold">KONUM: {WEEKDAYS[calendarUserDayIndex]}</span>
                        <span>SAĞA KAYDIR</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={6}
                        value={calendarUserDayIndex}
                        onChange={(e) => setCalendarUserDayIndex(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00F0FF] hover:accent-[#00d8e6] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        onClick={() => setCalendarUserDayIndex(targetDayIndex)}
                        className="bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/20 rounded-xl py-2 px-3 text-[10px] font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Sürgüyü o ayın ilk gününe otomatik eşitler"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Eşitle</span>
                      </button>
                      <button
                        onClick={() => setHideCalendarTexts(prev => !prev)}
                        className={`${hideCalendarTexts ? 'bg-[#00F0FF]/25 text-[#00F0FF] border-[#00F0FF]/30' : 'bg-white/5 text-white/70 border-white/10'} hover:bg-white/10 rounded-xl py-2 px-3 text-[10px] font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
                      >
                        {hideCalendarTexts ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{hideCalendarTexts ? "Sayıları Aç" : "Sayıları Gizle"}</span>
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
                      <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest">ŞABLON ARKA PLANI GÖRSELİ</label>
                      <button
                        onClick={() => {
                          currentAppsUploadSlot.current = 'apps_takvim_backdrop';
                          appsFileInputRef.current?.click();
                        }}
                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl py-2 px-3 text-[10px] font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Arka Plan Görseli Yükle</span>
                      </button>
                    </div>

                    <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                      <span className="font-mono text-[8px] text-white/35 tracking-wider uppercase">AYIN İLK GÜNÜ HESAPLAMASI</span>
                      <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/15 rounded-xl p-3">
                        <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
                          1 {MONTH_NAMES[calendarMonth]} {calendarYear} günü <strong className="text-[#00F0FF] font-bold">{WEEKDAYS[targetDayIndex]}</strong> gününe denk gelmektedir.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[460px] border border-white/5 rounded-2xl bg-[#08080c] overflow-hidden p-4 sm:p-6 group">

                    {isCalendarMatched && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-4 z-30 bg-[#10B981] text-black font-mono text-[9px] font-extrabold tracking-widest uppercase px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)] flex items-center gap-2"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>✓ MÜKEMMEL UYUM! TAKVİM DOĞRU HİZALANDI</span>
                      </motion.div>
                    )}

                    <div
                      className={`relative w-full max-w-[840px] aspect-[1200/400] rounded-3xl border ${isCalendarMatched ? 'border-[#00F0FF] shadow-[0_0_40px_rgba(0,240,255,0.25)]' : 'border-white/10 shadow-2xl'} transition-all duration-700 select-none overflow-hidden bg-[#08080c]`}
                    >
                      <img
                        src={takvimBackdropUrl}
                        alt="Takvim Arka Plan Tasarımı"
                        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-white/[0.12] pointer-events-none z-20" />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          currentAppsUploadSlot.current = 'apps_takvim_backdrop';
                          appsFileInputRef.current?.click();
                        }}
                        className="absolute top-4 right-4 z-30 bg-black/70 backdrop-blur-md hover:bg-[#00F0FF] hover:text-black hover:scale-105 border border-white/10 text-white font-mono text-[8px] tracking-widest uppercase py-1.5 px-3 rounded-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 cursor-pointer transition-all shadow-xl"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Arka Plan Yükle</span>
                      </button>

                      <div className="absolute top-[13%] left-[21.5%] right-[24.5%] h-[28px] flex items-center justify-between z-10 px-2 select-none">
                        <div className="relative w-full h-full flex items-center justify-between font-sans font-semibold tracking-wider">
                          {["OCA", "ŞUB", "MAR", "NİS", "MAY", "HAZ", "TEM", "AĞU", "EYL", "EKİ", "KAS", "ARA"].map((name, i) => {
                            const isActive = i === calendarMonth;
                            return (
                              <span
                                key={i}
                                onClick={() => setCalendarMonth(i)}
                                className={`cursor-pointer transition-all uppercase px-0.5 text-center select-none z-10 flex items-center justify-center font-bold text-[7px] sm:text-[8px] md:text-[9px] tracking-tight ${isActive
                                    ? 'text-[#00F0FF] scale-105 drop-shadow-[0_0_8px_rgba(0,240,255,0.85)] bg-white/5 rounded-md'
                                    : 'text-white/40 hover:text-white/80'
                                  }`}
                                style={{ width: '8.33%', height: '100%' }}
                                title={name}
                              >
                                {name}
                              </span>
                            );
                          })}

                          <div
                            className={`absolute h-[24px] border rounded-lg transition-all duration-300 pointer-events-none ${isCalendarMatched
                                ? 'border-[#10B981] bg-[#10B981]/15 shadow-[0_0_12px_rgba(16,185,129,0.7)]'
                                : 'border-[#00F0FF] bg-[#00F0FF]/15 shadow-[0_0_12px_rgba(0,240,255,0.7)]'
                              }`}
                            style={{
                              width: '8.33%',
                              left: `${calendarMonth * 8.33}%`,
                              top: '50%',
                              transform: 'translateY(-50%)'
                            }}
                          />
                        </div>
                      </div>

                      <div className="absolute top-[38%] bottom-[12%] left-[21.5%] right-[24.5%] overflow-hidden flex items-center z-10 p-1">

                        <div
                          className="absolute left-0 right-0 select-none px-1"
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(13, minmax(0, 1fr))',
                            top: '25%',
                            height: '75%',
                            alignItems: 'center'
                          }}
                        >
                          {Array.from({ length: 13 }).map((_, colIdx) => {
                            const columnDates = [
                              colIdx === 6 ? "1" : colIdx === 7 ? "2" : colIdx === 8 ? "3" : colIdx === 9 ? "4" : colIdx === 10 ? "5" : colIdx === 11 ? "6" : colIdx === 12 ? "7" : "",
                              colIdx === 0 ? "2" : colIdx === 1 ? "3" : colIdx === 2 ? "4" : colIdx === 3 ? "5" : colIdx === 4 ? "6" : colIdx === 5 ? "7" : colIdx === 6 ? "8" : colIdx === 7 ? "9" : colIdx === 8 ? "10" : colIdx === 9 ? "11" : colIdx === 10 ? "12" : colIdx === 11 ? "13" : "14",
                              colIdx === 0 ? "9" : colIdx === 1 ? "10" : colIdx === 2 ? "11" : colIdx === 3 ? "12" : colIdx === 4 ? "13" : colIdx === 5 ? "14" : colIdx === 6 ? "15" : colIdx === 7 ? "16" : colIdx === 8 ? "17" : colIdx === 9 ? "18" : colIdx === 10 ? "19" : colIdx === 11 ? "20" : "21",
                              colIdx === 0 ? "16" : colIdx === 1 ? "17" : colIdx === 2 ? "18" : colIdx === 3 ? "19" : colIdx === 4 ? "20" : colIdx === 5 ? "21" : colIdx === 6 ? "22" : colIdx === 7 ? "23" : colIdx === 8 ? "24" : colIdx === 9 ? "25" : colIdx === 10 ? "26" : colIdx === 11 ? "27" : "28",
                              colIdx === 0 ? "23/30" : colIdx === 1 ? "24/31" : colIdx === 2 ? "25" : colIdx === 3 ? "26" : colIdx === 4 ? "27" : colIdx === 5 ? "28" : colIdx === 6 ? "29" : colIdx === 7 ? "30" : colIdx === 8 ? "31" : ""
                            ];

                            return (
                              <div key={colIdx} className="flex flex-col justify-between h-[90%] my-auto text-center">
                                {columnDates.map((date, rowIdx) => {
                                  const isUnderSlider = colIdx >= calendarUserDayIndex && colIdx < calendarUserDayIndex + 7;
                                  return (
                                    <div
                                      key={rowIdx}
                                      className={`font-mono text-[7px] sm:text-[8px] md:text-[9px] font-semibold flex-1 flex items-center justify-center transition-all duration-300 ${isUnderSlider
                                          ? isCalendarMatched
                                            ? 'text-[#10B981] scale-105 drop-shadow-[0_0_6px_rgba(16,185,129,0.7)] font-bold'
                                            : 'text-[#00F0FF] scale-105 drop-shadow-[0_0_6px_rgba(0,240,255,0.7)] font-bold'
                                          : 'text-white/15 font-normal'
                                        }`}
                                    >
                                      {hideCalendarTexts ? "" : date}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>

                        <div
                          className={`absolute top-0 bottom-0 rounded-2xl border-2 flex flex-col justify-between p-1 pointer-events-none transition-all duration-500 ease-out z-20 ${isCalendarMatched
                              ? 'border-[#10B981] bg-[#10B981]/10 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                              : 'border-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                            }`}
                          style={{
                            width: `${(7 / 13) * 100}%`,
                            left: `${(calendarUserDayIndex / 13) * 100}%`,
                            height: '100%'
                          }}
                        >
                          <div
                            className={`grid grid-cols-7 gap-0 text-center w-full flex items-center justify-center rounded-t-xl border-b ${isCalendarMatched
                                ? 'bg-[#10B981]/25 border-[#10B981]/30'
                                : 'bg-[#00F0FF]/25 border-[#00F0FF]/30'
                              }`}
                            style={{ height: '25%' }}
                          >
                            {["PZT", "SAL", "ÇAR", "PER", "CUM", "CMT", "PAZ"].map((day, dIdx) => (
                              <div
                                key={day}
                                className="font-sans text-[6px] sm:text-[7.5px] md:text-[8.5px] font-bold tracking-wider uppercase text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                              >
                                {day}
                              </div>
                            ))}
                          </div>

                          <div
                            className={`flex-1 border-2 rounded-xl my-1 relative overflow-hidden ${isCalendarMatched
                                ? 'border-[#10B981]/25 bg-transparent'
                                : 'border-[#00F0FF]/25 bg-transparent'
                              }`}
                            style={{ height: '65%' }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08]" />
                          </div>

                          <div className="text-center font-mono text-[4px] text-white/40 tracking-widest uppercase font-black py-0.5">
                            SYSTEMA ZAMANSIZ
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col items-center gap-1.5 font-mono text-[9px] text-white/35">
                      <span>Mavi sürgüyü kaydırmak için sol taraftaki <strong>KONTROLLERİ</strong> kullanabilir,</span>
                      <span>veya direkt olarak <strong>EŞİTLE</strong> butonuna tıklayabilirsiniz.</span>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                  <div className="bg-[#09090d] border border-white/5 rounded-2xl p-6 hover:border-[#00F0FF]/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center border border-[#00F0FF]/20 text-[#00F0FF]">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <h4 className="font-sans font-extrabold text-sm sm:text-base text-white tracking-wider uppercase">
                        Zamansız Takvim Nedir?
                      </h4>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                      Architecht yöneticileri için özel olarak geliştirilen, mekanik olarak dairesel and yatay akrilik sürgüler yardımıyla her yıl and her ay kullanılabilen, kağıt tüketimini sıfırlayan and estetik duruşuyla prestij katan yenilikçi bir fiziksel masa aksesuarıdır.
                    </p>
                  </div>

                  <div className="bg-[#09090d] border border-white/5 rounded-2xl p-6 hover:border-[#00F0FF]/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center border border-[#00F0FF]/20 text-[#00F0FF]">
                        <Layers className="w-4 h-4" />
                      </div>
                      <h4 className="font-sans font-extrabold text-sm sm:text-base text-white tracking-wider uppercase">
                        Nasıl Kullanılır?
                      </h4>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                      Yukarıda yer alan simülatördeki kontrol panelinden yıl and ay seçimi yaptığınızda, o ayın ilk gününün (1 rakamının) hangi güne denk geldiği otomatik hesaplanır. Hemen yanındaki interaktif akrilik panelde mavi gün sürgüsünü sola and sağa hareket ettirerek doğru hizalamayı gerçekleştirin!
                    </p>
                  </div>
                </div>

                <div className="mt-16 bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col items-start text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-[90px] pointer-events-none" />

                  <span className="font-mono text-[9px] text-[#00F0FF] tracking-[0.2em] font-bold uppercase mb-2 block">// FİZİKSEL ÜRETİLMİŞ MAKET GÖRSELİ</span>
                  <h3 className="font-sans font-black text-2xl text-white tracking-tight uppercase mb-4">
                    BASKI & FOTOĞRAF SERGİSİ
                  </h3>

                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black/40 mb-6 group-hover:border-[#00F0FF]/30 transition-all flex items-center justify-center relative">
                    {takvimPhotoUrl ? (
                      <img
                        src={takvimPhotoUrl}
                        alt="Zamansız Takvim Fiziksel Görseli"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-4 text-[#00F0FF]/30 group-hover:text-[#00F0FF]/70 group-hover:bg-[#00F0FF]/5 transition-all duration-500">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-[10px] text-white/40 tracking-wider uppercase group-hover:text-[#00F0FF] transition-colors">
                          ZAMANSIZ TAKVİM BASKILI ÜRÜN FOTOĞRAFI
                        </span>
                      </div>
                    )}

                    <div
                      onClick={() => {
                        currentAppsUploadSlot.current = 'apps_takvim_foto';
                        appsFileInputRef.current?.click();
                      }}
                      className="absolute top-4 right-4 bg-black/60 backdrop-blur-md hover:bg-white hover:text-black hover:scale-105 border border-white/10 text-white font-mono text-[8px] tracking-widest uppercase py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-xl z-20"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Fotoğraf Yükle</span>
                    </div>
                  </div>

                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/5 pt-4">
                    <p className="font-sans text-xs text-white/50 leading-relaxed max-w-xl">
                      Yukarıdaki şemada tasarlanan fiziksel akrilik mekanizmanın, üretim bandından çıkan and Architecht yöneticilerine hediye edilen orijinal fotoğrafıdır.
                    </p>
                    <span className="font-mono text-[9px] text-amber-500 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                  // ÖZEL AKRİLİK GÖVDE
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
          );
  }

          if (categoryId === 'organizational') {
          if (!selectedProjectId) {
          return (
          <div className="relative min-h-screen bg-[#070707] text-white overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="paper-grain opacity-85" />

            <div className="max-w-6xl mx-auto pt-28 sm:pt-32 pb-40 px-6 sm:px-12 relative z-10 text-left">
              <div className="mb-12">
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.05, x: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2.5 group cursor-pointer bg-[#00F0FF] text-black hover:bg-[#00d8e6] transition-all duration-300 py-2.5 px-5 rounded-xl shadow-[0_4px_20px_rgba(0,240,255,0.25)] font-bold font-mono text-[10px] tracking-widest uppercase"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-black" />
                  <span>← Çalışmalarıma Dön</span>
                </motion.button>
              </div>

              <div className="mb-20">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold block mb-4" style={{ color: catHeading.color }}>
                  {catHeading.section}
                </span>
                <h1 className="flex flex-col items-start leading-none mb-6">
                  <span className="font-sans font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">{catHeading.part1}</span>
                  <span className="font-serif italic font-light text-2xl sm:text-3xl md:text-4xl tracking-tight mt-1" style={{ color: catHeading.color }}>{catHeading.part2}</span>
                </h1>
                <p className="font-sans text-sm sm:text-base text-white/55 leading-relaxed font-light mt-6 max-w-3xl">
                  {catHeading.desc}
                </p>
              </div>

              <div className={`grid grid-cols-1 ${categoryId === 'social-media' ? 'lg:grid-cols-3 md:grid-cols-3' : 'md:grid-cols-2'} gap-8`}>
                {projects.map((proj, index) => {
                  const icons = categoryId === 'social-media' ? [
                    <Grid className="w-6 h-6 text-[#00F0FF]" />,
                    <Cpu className="w-6 h-6 text-[#FF4E20]" />,
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  ] : [
                    <Award className="w-6 h-6 text-[#00F0FF]" />,
                    <Cpu className="w-6 h-6 text-[#FF4E20]" />,
                    <Zap className="w-6 h-6 text-emerald-400" />,
                    <BookOpen className="w-6 h-6 text-purple-400" />,
                    <Layers className="w-6 h-6 text-amber-400" />
                  ];

                  const getProjectCoverData = (id: string) => {
                    switch (id) {
                      case 'degerler':
                        return { img: degerlerCoverImage, setImg: setDegerlerCoverImage, ref: degerlerCoverFileInputRef };
                      case 'ai-factory':
                        return { img: aiFactoryCoverImage, setImg: setAiFactoryCoverImage, ref: aiFactoryCoverFileInputRef };
                      case 'rd':
                        return { img: rdCoverImage, setImg: setRdCoverImage, ref: rdCoverFileInputRef };
                      case 'egitim':
                        return { img: egitimCoverImage, setImg: setEgitimCoverImage, ref: egitimCoverFileInputRef };
                      case 'rd-techathon-2026':
                        return { img: rdTechathonCoverImage, setImg: setRdTechathonCoverImage, ref: rdTechathonCoverFileInputRef };
                      default:
                        return null;
                    }
                  };

                  if (categoryId === 'organizational') {
                    const coverData = getProjectCoverData(proj.id);
                    const isRosa = proj.id === 'rd-techathon-2026';
                    return (
                      <motion.div
                        key={proj.id}
                        onClick={() => setSelectedProjectId(proj.id)}
                        whileHover={{ y: -6, borderColor: isRosa ? '#FF4E00' : (proj.id === 'degerler' ? '#00F0FF' : proj.id === 'ai-factory' ? '#A86CFF' : '#FF4E00') }}
                        className="bg-white/[0.015] border border-white/5 rounded-2xl hover:bg-white/[0.03] transition-all duration-500 cursor-pointer flex flex-col group relative overflow-hidden"
                      >
                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-br from-[#00F0FF]/[0.01] to-[#00F0FF]/[0.03] rounded-full filter blur-xl opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        {coverData && (
                          <div className="w-full aspect-[16/9] relative overflow-hidden border-b border-white/5" onClick={(e) => e.stopPropagation()}>
                            <ImageUploadPlaceholder
                              image={coverData.img}
                              onUpload={coverData.setImg}
                              fileInputRef={coverData.ref}
                              title={`${proj.title} Kapak`}
                              aspect="aspect-[16/9]"
                              isLocked={isLocked}
                              onLockedClick={() => handleLockedClick(coverData.ref)}
                              customGraphic={
                                <div className="flex flex-col items-center gap-2 text-center p-6 select-none justify-center h-full w-full bg-[#050508]/40">
                                  <div className="w-10 h-10 rounded-full border border-dashed border-white/20 bg-white/5 text-white/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <Upload className="w-4 h-4 text-white/60" />
                                  </div>
                                  <span className="font-mono text-xs text-white/70 tracking-[0.25em] font-extrabold">UPLOAD COVER IMAGE</span>
                                  <span className="font-mono text-[10px] text-white/30 tracking-wider">16:9</span>
                                </div>
                              }
                            />
                          </div>
                        )}

                        <div className="px-6 py-6 flex flex-col flex-grow justify-between text-left">
                          <div>
                            <h3 className={`font-sans font-extrabold text-xl sm:text-2xl mb-3 tracking-tight ${proj.id === 'degerler' ? 'text-[#00F0FF]' :
                                proj.id === 'ai-factory' ? 'text-[#A86CFF]' :
                                  proj.id === 'egitim' ? 'text-[#FF4E00]' :
                                    'bg-gradient-to-r from-[#00F0FF] to-[#FF4E00] bg-clip-text text-transparent font-extrabold'
                              }`}>
                              {proj.title}
                            </h3>

                            <p className="font-sans text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed font-light mb-6">
                              {proj.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 text-[#00F0FF]/60 group-hover:text-[#00F0FF] transition-colors font-mono text-[9px] font-bold uppercase tracking-widest">
                            DETAYLARI İNCELE
                            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      whileHover={{ y: -6, borderColor: '#00F0FF' }}
                      className="bg-white/[0.015] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.03] transition-all duration-500 cursor-pointer flex flex-col justify-between group relative overflow-hidden h-[280px]"
                    >
                      <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-br from-[#00F0FF]/[0.01] to-[#00F0FF]/[0.03] rounded-full filter blur-xl opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-mono text-xs text-white/20 font-bold group-hover:text-[#00F0FF]/60 transition-colors">
                            [{proj.num}]
                          </span>
                          <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl group-hover:scale-110 transition-transform duration-500">
                            {icons[index]}
                          </div>
                        </div>

                        <h3 className="font-serif text-2xl font-light text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                          {proj.title}
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-white/45 group-hover:text-white/70 transition-colors leading-relaxed font-light">
                          {proj.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-4 text-[#00F0FF]/60 group-hover:text-[#00F0FF] transition-colors font-mono text-[9px] font-bold uppercase tracking-widest">
                        DETAYLARI İNCELE
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          );
}

          const isAiFactory = selectedProjectId === 'ai-factory';
          const customBg = isEgitim ? 'bg-[#060B18]' : (isAiFactory ? 'bg-[#0B0815]' : 'bg-[#070707]');

          return (
          <div className={`relative min-h-screen ${customBg} text-white overflow-hidden`}>
            {isEgitim ? (
              <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-40" />
            ) : isAiFactory ? (
              <div className="absolute inset-0 z-0 bg-[linear-gradient(45deg,#130f26_25%,transparent_25%),linear-gradient(-45deg,#130f26_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#130f26_75%),linear-gradient(-45deg,transparent_75%,#130f26_75%)] bg-[size:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0px] opacity-25 pointer-events-none" />
            ) : (
              <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            )}

            <div className="paper-grain opacity-85" />

            <div className="w-full pt-28 sm:pt-32 pb-40 px-6 sm:px-12 relative z-10">

              <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 sm:mb-20">
                <motion.button
                  onClick={() => setSelectedProjectId(null)}
                  whileHover={{ scale: 1.05, x: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2.5 group cursor-pointer ${isAiFactory
                      ? 'bg-[#A86CFF] text-black hover:bg-[#c67cff] shadow-[0_4px_20px_rgba(168,108,255,0.25)]'
                      : 'bg-[#00F0FF] text-black hover:bg-[#00d8e6] shadow-[0_4px_20px_rgba(0,240,255,0.25)]'
                    } transition-all duration-300 py-2 px-4 rounded-xl font-bold font-mono text-[9px] tracking-widest uppercase`}
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-black" />
                  <span>← Org Tasarımlara Dön</span>
                </motion.button>

                <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 p-1 rounded-xl">
                  {projects.map((proj) => {
                    const isSelected = selectedProjectId === proj.id;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => setSelectedProjectId(proj.id)}
                        className={`font-mono text-[9px] tracking-widest uppercase font-bold py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer ${isSelected
                            ? isAiFactory
                              ? 'bg-white/10 text-[#A86CFF] border border-[#A86CFF]/30 shadow-[0_0_15px_rgba(168,108,255,0.15)]'
                              : 'bg-white/10 text-[#00F0FF] border border-[#00F0FF]/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                            : 'text-white/40 hover:text-white/85 bg-transparent border border-transparent'
                          }`}
                      >
                        {proj.num} // {proj.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="max-w-6xl mx-auto text-left relative z-10 select-none mb-10 border-b border-white/5 pb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: accentColor }}>
                    PROJE {selectedProject.num}
                  </span>
                  <span className="w-8 h-[1px]" style={{ backgroundColor: accentColor }} />
                  <span className="font-mono text-[10px] text-white/35 uppercase tracking-widest">
                    {selectedProject.details.category}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-col items-start relative select-none">
                    <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl leading-tight text-white uppercase tracking-tight">
                      {selectedProject.title}
                    </h1>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-white/55 leading-relaxed font-light mt-6 max-w-3xl">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              <div className="max-w-6xl mx-auto relative z-10 mb-16">
                <div className={`w-full ${isAiFactory
                    ? 'bg-[#130f26]/60 border-2 border-[#8F5BFF]/30 hover:border-[#A86CFF]/40 shadow-[4px_4px_0px_rgba(143,91,255,0.1)]'
                    : 'bg-white/[0.015] border border-white/5 hover:border-[#00F0FF]/25 shadow-xl'
                  } rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden transition-all duration-500`}>
                  {isAiFactory && (
                    <>
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#8F5BFF]" />
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#8F5BFF]" />
                      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#8F5BFF]" />
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#8F5BFF]" />
                    </>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-12 w-full">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.25em]">KURUM</span>
                      <span className="text-white font-medium text-[13px] tracking-wide">{selectedProject.details.client}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 border-l border-white/5 pl-4 md:pl-6">
                      <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.25em]">YIL</span>
                      <span className={`${isAiFactory ? 'text-[#A86CFF]' : 'text-[#00F0FF]'} font-medium text-[13px]`}>{selectedProject.details.year}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 border-l border-white/5 pl-4 md:pl-6">
                      <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.25em]">KATEGORİ</span>
                      <span className="text-white/80 text-[13px]">{selectedProject.details.category}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 border-l border-white/5 pl-4 md:pl-6">
                      <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.25em]">ROLÜM</span>
                      <span className="text-white/80 text-[13px]">{selectedProject.details.role}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 border-l border-white/5 pl-4 md:pl-6 col-span-2 md:col-span-1">
                      <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.25em]">ARAÇLAR</span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {selectedProject.details.tools.map((tool, idx) => (
                          <span key={idx} className="font-mono text-[7px] bg-white/5 border border-white/5 text-white/60 px-1.5 py-0.5 rounded uppercase">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16 relative z-10 text-left">

                {selectedProjectId === 'degerler' && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
                    >
                      <div className="lg:w-5/12 flex flex-col justify-center py-6">
                        <div className="flex items-center gap-4 mb-6 select-none">
                          <span className="font-serif italic font-extralight text-7xl sm:text-8xl text-[#38B6E3]/25 leading-none select-none">01</span>
                          <div className="flex flex-col">
                            <span className="font-mono text-[8.5px] text-[#38B6E3] tracking-[0.3em] font-bold uppercase mb-1">// DEĞERLER LANSMANI</span>
                            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-tight flex items-center gap-2 flex-wrap">
                              Tasarım <span className="text-[#38B6E3] italic font-normal">Kimliği</span>
                              <svg width="74" height="20" viewBox="0 0 74 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block opacity-90 scale-75 origin-left">
                                <path d="M 8 10 L 13 5 L 18 10 L 13 15 Z" fill="#A31D44" stroke="#FF4E00" strokeWidth="1" />
                                <circle cx="13" cy="10" r="1.5" fill="#38B6E3" />
                                <path d="M 22 13 L 26 10 L 22 7" stroke="#1D2F6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M 25 14 L 30 10 L 25 6" stroke="#0062AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M 28 15 L 34 10 L 28 5" stroke="#38B6E3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="33" y1="10" x2="54" y2="10" stroke="#0062AF" strokeWidth="0.75" strokeDasharray="2,2" />
                                <path d="M 54 10 L 59 5 L 64 10 L 59 15 Z" stroke="#38B6E3" strokeWidth="1" fill="none" />
                              </svg>
                            </h3>
                          </div>
                        </div>
                        <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                          Etkinliğin ilk temas noktasında, Architecht'in <strong className="font-semibold text-white/90">güçlü kurumsal mirasını</strong> selamlayan bir giriş kurguladım. Katılımcıları ilk andan itibaren <strong className="font-semibold text-white/90">tanıdık</strong> ama bir o kadar da özel bir atmosferin içine çekmeyi hedefledim.
                        </p>
                        <div className="border-t border-white/5 pt-6 mt-2 flex flex-col gap-4">
                          <div>
                            <h4 className="font-mono text-[8px] tracking-widest text-white/35 uppercase mb-1">// TIPOGRAFİK FONT</h4>
                            <p className="font-sans text-xs text-white/45 leading-relaxed font-light">
                              Lansman başlıklarında <strong className="font-semibold text-white/80">Armstrong tabanlı</strong> el yazısı detayları kullanarak geleneksel derinlik and felsefi köprüyü yansıttım.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:w-7/12">
                        <ImageUploadPlaceholder
                          image={degerlerKitiBannerImage}
                          onUpload={setDegerlerKitiBannerImage}
                          fileInputRef={degerlerKitiBannerFileInputRef}
                          title="Tasarım Kimliği"
                          aspect="aspect-[4/3]"
                          customGraphic={renderIdentityGraphic()}
                          isLocked={isLocked}
                          onLockedClick={() => handleLockedClick(degerlerKitiBannerFileInputRef)}
                        />
                      </div>
                    </motion.div>

                    <div className="w-full py-2 sm:py-3 relative z-20">
                      {renderGeometricPattern(1, divider1Image, setDivider1Image, divider1FileInputRef)}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10"
                    >
                      <div className="lg:w-5/12 flex flex-col justify-center py-6">
                        <div className="flex items-center gap-4 mb-6 select-none">
                          <span className="font-serif italic font-extralight text-7xl sm:text-8xl text-[#38B6E3]/25 leading-none select-none">02</span>
                          <div className="flex flex-col">
                            <span className="font-mono text-[8.5px] text-[#38B6E3] tracking-[0.3em] font-bold uppercase mb-1">// DEĞERLER LANSMANI</span>
                            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-tight flex items-center gap-2 flex-wrap">
                              Değerler <span className="text-[#38B6E3] italic font-normal">Kalbi</span>
                              <svg width="74" height="20" viewBox="0 0 74 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block opacity-90 scale-75 origin-left">
                                <path d="M 8 10 L 13 5 L 18 10 L 13 15 Z" fill="#A31D44" stroke="#FF4E00" strokeWidth="1" />
                                <circle cx="13" cy="10" r="1.5" fill="#38B6E3" />
                                <path d="M 22 13 L 26 10 L 22 7" stroke="#1D2F6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M 25 14 L 30 10 L 25 6" stroke="#0062AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M 28 15 L 34 10 L 28 5" stroke="#38B6E3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="33" y1="10" x2="54" y2="10" stroke="#0062AF" strokeWidth="0.75" strokeDasharray="2,2" />
                                <path d="M 54 10 L 59 5 L 64 10 L 59 15 Z" stroke="#38B6E3" strokeWidth="1" fill="none" />
                              </svg>
                            </h3>
                          </div>
                        </div>
                        <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                          Bu tasarımda <strong className="font-semibold text-white">Güven</strong>, <strong className="font-semibold text-white">Müşteri Odaklılık</strong>, <strong className="font-semibold text-white">Çevik Takım Ruhu</strong>, <strong className="font-semibold text-white">Sürekli Gelişim</strong> and <strong className="font-semibold text-white">Yenilikçilik</strong> kavramlarını sadece birer kelime olarak bırakmayıp, kurumun duruşunu simgeleyen geometrinin rasyonel gücüyle birleştirdim; oluşturduğum <strong className="font-semibold text-[#38B6E3]">kalp formuyla</strong> da değerlerin arkasındaki insani bağı, yaşayan and birbirini besleyen <strong className="font-semibold text-white">bütünsel bir kültür</strong> olarak somutlaştırmaya çalıştım.
                        </p>
                      </div>
                      <div className="lg:w-7/12">
                        <ImageUploadPlaceholder
                          image={degerlerKalbiImage}
                          onUpload={setDegerlerKalbiImage}
                          fileInputRef={degerlerKalbiFileInputRef}
                          title="Tipografik Form / Değerler Kalbi"
                          aspect="aspect-[4/3]"
                          customGraphic={renderHeartGraphic()}
                          isLocked={isLocked}
                          onLockedClick={() => handleLockedClick(degerlerKalbiFileInputRef)}
                        />
                      </div>
                    </motion.div>

                    <div className="w-full py-2 sm:py-3 relative z-20">
                      {renderGeometricPattern(2, divider2Image, setDivider2Image, divider2FileInputRef)}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
                    >
                      <div className="lg:w-5/12 flex flex-col justify-center py-6">
                        <div className="flex items-center gap-4 mb-6 select-none">
                          <span className="font-serif italic font-extralight text-7xl sm:text-8xl text-[#38B6E3]/25 leading-none select-none">03</span>
                          <div className="flex flex-col">
                            <span className="font-mono text-[8.5px] text-[#38B6E3] tracking-[0.3em] font-bold uppercase mb-1">// DEĞERLER LANSMANI</span>
                            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-tight flex items-center gap-2 flex-wrap">
                              Değerler <span className="text-[#38B6E3] italic font-normal">Kiti</span>
                              <svg width="74" height="20" viewBox="0 0 74 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block opacity-90 scale-75 origin-left">
                                <path d="M 8 10 L 13 5 L 18 10 L 13 15 Z" fill="#A31D44" stroke="#FF4E00" strokeWidth="1" />
                                <circle cx="13" cy="10" r="1.5" fill="#38B6E3" />
                                <path d="M 22 13 L 26 10 L 22 7" stroke="#1D2F6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M 25 14 L 30 10 L 25 6" stroke="#0062AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M 28 15 L 34 10 L 28 5" stroke="#38B6E3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="33" y1="10" x2="54" y2="10" stroke="#0062AF" strokeWidth="0.75" strokeDasharray="2,2" />
                                <path d="M 54 10 L 59 5 L 64 10 L 59 15 Z" stroke="#38B6E3" strokeWidth="1" fill="none" />
                              </svg>
                            </h3>
                          </div>
                        </div>
                        <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                          Lansman kitinin dış kaplamasını and bez kesesini, etkinlik için kurguladığım alternatif renk paleti and döngüsel örüntülerle en baştan tasarladım. Bu kapağın altında bizden simalar and cümleler var! Kitin içindeki etkileşimi artırmak adına kurumsal logolardan oluşan dinamik bir sticker seti, anahtarlık and broş gibi mikro tasarım nesneleri kurguladım.
                        </p>
                      </div>
                      <div className="lg:w-7/12 max-w-[420px] w-full mx-auto">
                        <ImageUploadPlaceholder
                          image={degerlerKitiImage}
                          onUpload={setDegerlerKitiImage}
                          fileInputRef={degerlerKitiFileInputRef}
                          title="Değerler Kiti (690x908)"
                          aspect="aspect-[690/908]"
                          customGraphic={renderKitImages()}
                          objectFit="contain"
                          isLocked={isLocked}
                          onLockedClick={() => handleLockedClick(degerlerKitiFileInputRef)}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12 relative z-10"
                    >
                      <div className="border border-white/5 bg-[#07070a]/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#38B6E3]/20 group">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-1.5 h-6 bg-[#38B6E3] rounded-full" />
                            <h4 className="font-mono text-[10px] text-[#38B6E3] tracking-[0.2em] font-bold uppercase">// KİTİN İÇİ GÖRÜNÜMÜ</h4>
                          </div>
                          <p className="font-sans text-xs text-white/50 leading-relaxed font-light">
                            Lansman kitinin iç kısmına ait genel görünüm, yerleşim kurgusu and seperatör yerleşimleri.
                          </p>
                        </div>
                        <div className="max-w-[280px] w-full mx-auto">
                          <ImageUploadPlaceholder
                            image={kitDefterImage}
                            onUpload={setKitDefterImage}
                            fileInputRef={kitDefterFileInputRef}
                            title="Kitin İçi Görünümü"
                            aspect="aspect-[1/1.41]"
                            isLocked={isLocked}
                            onLockedClick={() => handleLockedClick(kitDefterFileInputRef)}
                          />
                        </div>
                      </div>

                      <div className="border border-white/5 bg-[#07070a]/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#38B6E3]/20 group">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-1.5 h-6 bg-[#38B6E3] rounded-full" />
                            <h4 className="font-mono text-[10px] text-[#38B6E3] tracking-[0.2em] font-bold uppercase">// LANSMANA ÖZEL STICKER SETİ</h4>
                          </div>
                          <p className="font-sans text-xs text-white/50 leading-relaxed font-light">
                            Değerleri and kurum kimliğini yansıtan, katılımcıların defterlerini, bilgisayarlarını veya kişisel alanlarını kişiselleştirebileceği dinamik sticker setleri.
                          </p>
                        </div>
                        <div className="max-w-[280px] w-full mx-auto">
                          <ImageUploadPlaceholder
                            image={kitStickerImage}
                            onUpload={setKitStickerImage}
                            fileInputRef={kitStickerFileInputRef}
                            title="Sticker Tasarımı (A4)"
                            aspect="aspect-[1/1.41]"
                            isLocked={isLocked}
                            onLockedClick={() => handleLockedClick(kitStickerFileInputRef)}
                          />
                        </div>
                      </div>
                    </motion.div>

                    <div className="w-full py-2 sm:py-3 relative z-20">
                      {renderGeometricPattern(3, divider3Image, setDivider3Image, divider3FileInputRef)}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex flex-col gap-6 relative z-10"
                    >
                      <div className="max-w-4xl flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4 select-none">
                          <span className="font-serif italic font-extralight text-6xl sm:text-7xl text-[#38B6E3]/25 leading-none select-none">04</span>
                          <div className="flex flex-col">
                            <span className="font-mono text-[8px] text-[#38B6E3] tracking-[0.3em] font-bold uppercase mb-0.5">// DEĞERLER LANSMANI</span>
                            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-tight">
                              Özel Tasarım Defter <span className="text-[#38B6E3] italic font-normal">Seperatörleri</span>
                            </h3>
                          </div>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4 border-l-2 border-[#38B6E3]/30 bg-[#38B6E3]/5 py-2.5 rounded-r-lg">
                          Bu defter tasarımı, lansmanın sadece bir hatıra objesi değil; <strong>kurumun kurumsal vizyonunu, misyonunu and gelecek felsefesini içinde barındıran ana iletişim and kimlik manifestosudur.</strong> Tasarım sürecinde sıradan, fonksiyonel bir not defteri çizmenin çok ötesine geçerek; markanın köklü kimliği ile geleceğe yön veren teknolojik gücü arasında felsefi bir köprü kurmayı hedefledim. Bu doğrultuda defterin iç mimarisini, <strong>tarihe, bilme and teknolojiye yön vermiş karakterlerle kurum değerlerinin özdeşleştiği</strong> devasa bir kavramsal kurgu üzerine inşa ettik.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-1.5 h-4 bg-[#A31D44] rounded-full" />
                          <h4 className="font-mono text-[10px] text-white/95 tracking-[0.2em] font-bold uppercase">// ÖZEL TASARIM DEFTER SEPERATÖRLERİ</h4>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                          {[
                            {
                              id: 'fatih',
                              leader: 'Fatih Sultan Mehmet',
                              motto: 'Zihinle',
                              value: 'VİZYON VE MİSYON',
                              text: 'Finansal teknolojide yapay zekâ dönüşümüne öncülük ederek en güvenilir iş ortağı olmak, bizim felsefemizin and vizyonumuzun temelidir.',
                              color: 'from-[#1a3a4b] to-[#0f232e]',
                              borderColor: 'border-[#38B6E3]/30',
                              badgeColor: 'text-[#38B6E3] bg-[#38B6E3]/10',
                              portrait: '👑'
                            },
                            {
                              id: 'ahi',
                              leader: 'Ahi Evran',
                              motto: 'İnançla',
                              value: 'Güven',
                              text: 'Dürüstlük and güven ilkelerimizi her şeyin üzerinde tutar; söylediğimizi yapar, yaptığımız işi büyük bir inançla sahipleniriz.',
                              color: 'from-[#423321] to-[#271e13]',
                              borderColor: 'border-[#e4a853]/30',
                              badgeColor: 'text-[#e4a853] bg-[#e4a853]/10',
                              portrait: '📜'
                            },
                            {
                              id: 'ali',
                              leader: 'Ali Kuşçu',
                              motto: 'Heyecanla',
                              value: 'Sürekli Gelişim',
                              text: 'Bugünün başarısını yarının ufkuna dönüştürür; öğrenme aşkıyla, merakla and heyecanla kendimizi and teknolojimizi her gün geliştiririz.',
                              color: 'from-[#1e3d30] to-[#11241c]',
                              borderColor: 'border-[#4eaf7d]/30',
                              badgeColor: 'text-[#4eaf7d] bg-[#4eaf7d]/10',
                              portrait: '🔭'
                            },
                            {
                              id: 'yusuf',
                              leader: 'Yusuf Has Hacib',
                              motto: 'Bilgeliğinde',
                              value: 'Müşteri Odaklılık',
                              text: 'Müşterilerimizin sadece bugünkü ihtiyaçlarını çözmekle kalmaz; bilgelikle, gelecekteki beklenti and deneyimlerini de öngörürüz.',
                              color: 'from-[#3a223f] to-[#221425]',
                              borderColor: 'border-[#b573c9]/30',
                              badgeColor: 'text-[#b573c9] bg-[#b573c9]/10',
                              portrait: '✍️'
                            },
                            {
                              id: 'barbaros',
                              leader: 'Barbaros Hayreddin Paşa',
                              motto: 'İlimle',
                              value: 'Çevik Takım Ruhu',
                              text: 'Ortak hedefe doğru tek bir yürek olarak ilerler; birlikte karar alır and zorluklara karşı çevik bir takım ruhuyla göğüs gereriz.',
                              color: 'from-[#192f44] to-[#0e1b27]',
                              borderColor: 'border-[#4299e1]/30',
                              badgeColor: 'text-[#4299e1] bg-[#4299e1]/10',
                              portrait: '⚓'
                            },
                            {
                              id: 'cezeri',
                              leader: 'El-Cezeri',
                              motto: 'İlhamla',
                              value: 'Yenilikçilik',
                              text: 'Deneyim yolculuğunu ileri teknolojiyle güçlendirir; yenilikçi çarklarımızla sektörde kalıcı and fark yaratan çözümler üretiriz.',
                              color: 'from-[#451e1e] to-[#271111]',
                              borderColor: 'border-[#f56565]/30',
                              badgeColor: 'text-[#f56565] bg-[#f56565]/10',
                              portrait: '⚙️'
                            }
                          ].map((card, idx) => {
                            let imageVal: string | null = null;
                            let setImageVal: ((url: string) => void) | null = null;
                            let inputRef: React.RefObject<HTMLInputElement | null> | null = null;

                            if (card.id === 'fatih') {
                              imageVal = sepFatihImage;
                              setImageVal = setSepFatihImage;
                              inputRef = sepFatihFileInputRef;
                            } else if (card.id === 'ahi') {
                              imageVal = sepAhiImage;
                              setImageVal = setSepAhiImage;
                              inputRef = sepAhiFileInputRef;
                            } else if (card.id === 'ali') {
                              imageVal = sepAliImage;
                              setImageVal = setSepAliImage;
                              inputRef = sepAliFileInputRef;
                            } else if (card.id === 'yusuf') {
                              imageVal = sepYusufImage;
                              setImageVal = setSepYusufImage;
                              inputRef = sepYusufFileInputRef;
                            } else if (card.id === 'barbaros') {
                              imageVal = sepBarbarosImage;
                              setImageVal = setSepBarbarosImage;
                              inputRef = sepBarbarosFileInputRef;
                            } else if (card.id === 'cezeri') {
                              imageVal = sepCezeriImage;
                              setImageVal = setSepCezeriImage;
                              inputRef = sepCezeriFileInputRef;
                            }

                            const handleCardClick = () => {
                              inputRef?.current?.click();
                            };

                            const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                compressAndResizeImage(file)
                                  .then(resized => {
                                    if (setImageVal) setImageVal(resized);
                                  })
                                  .finally(() => {
                                    e.target.value = '';
                                  });
                              }
                            };

                            return (
                              <div key={card.id} className="flex flex-col h-full group">
                                {!isLocked && (
                                  <input
                                    type="file"
                                    ref={inputRef as any}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                  />
                                )}
                                <div
                                  onClick={isLocked ? undefined : handleCardClick}
                                  className={`rounded-xl bg-gradient-to-b ${card.color} border ${card.borderColor} p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${isLocked ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(56,182,227,0.15)] hover:border-[#38B6E3]/30'} flex-1`}
                                >
                                  <div className="flex justify-center items-center z-10 border-b border-white/5 pb-1.5 mb-3">
                                    <span className="font-mono text-[8px] text-white/70 tracking-widest uppercase">SEPARATÖR 0{idx + 1}</span>
                                  </div>

                                  <div
                                    className="relative aspect-[827/1300] rounded-lg border border-white/5 bg-black/40 overflow-hidden group/separator-img"
                                  >
                                    {imageVal ? (
                                      <>
                                        <img
                                          src={imageVal}
                                          alt={card.leader}
                                          className="absolute inset-0 w-full h-full object-contain bg-black/30 transition-transform duration-500 group-hover/separator-img:scale-105"
                                          referrerPolicy="no-referrer"
                                        />
                                        {!isLocked && (
                                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/separator-img:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 z-20">
                                            <Upload className="w-4 h-4 text-[#00F0FF] animate-pulse" />
                                            <span className="font-mono text-[5px] text-[#00F0FF] tracking-wider uppercase font-bold">// GÖRSELİ DEĞİŞTİR</span>
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center select-none">
                                        <div className="text-xl opacity-40">{card.portrait}</div>
                                        <span className="font-mono text-[6px] text-white/30 tracking-wider uppercase block mt-1">
                                          {isLocked ? "SEPARATÖR GÖRSELİ" : "GÖRSEL YÜKLEME ALANI"}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="z-10 border-t border-white/5 pt-3 mt-3 flex flex-col gap-1 text-center items-center">
                                    <span className="font-mono text-[6px] text-white/45 uppercase tracking-widest block">KARAKTER</span>
                                    <span className="font-serif italic text-[12px] text-white/95 leading-none font-medium tracking-wide truncate max-w-full block">
                                      {card.leader}
                                    </span>
                                    <div className="w-full border-t border-white/5 mt-2 pt-2 flex flex-col items-center">
                                      <span className="font-mono text-[6px] text-[#38B6E3]/60 uppercase tracking-widest mb-1">DEĞER</span>
                                      <span className={`font-mono text-[8.5px] font-bold uppercase tracking-wider ${card.badgeColor.split(' ')[0]} bg-white/5 px-2 py-0.5 rounded border border-white/5`}>
                                        {card.value}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-2 bg-white/[0.01] border border-white/5 rounded-md p-2 h-[72px] flex flex-col justify-start overflow-y-auto scrollbar-none">
                                  <p className="font-sans text-[10px] text-white/50 leading-relaxed font-light">
                                    "{card.text}"
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>

                    <div className="w-full py-2 sm:py-3 relative z-20">
                      {renderGeometricPattern(4, divider4Image, setDivider4Image, divider4FileInputRef)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-4 bg-[#38B6E3] rounded-full" />
                        <h4 className="font-mono text-[10px] text-white/95 tracking-[0.2em] font-bold uppercase">// DİĞER ÖZEL SAYFALAR (DEFTER İÇ VE KAPAK TASARIMLARI)</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          {
                            id: 'vizyon_misyon',
                            title: 'Vizyon & Misyon Sayfası',
                            tag: 'VİZYON VE MİSYON',
                            text: 'Vizyon ve Misyon sayfası tasarımı. Yanındaki sayfa alanıyla birlikte bütünselliği sağlar.',
                            detail: '• VİZYON: Finansal teknolojide yapay zekâ dönüşümüne öncülük eden en güvenilir iş ortağı olmak.\n• MİSYON: Herkes için yenilikçi and sürdürülebilir finansal teknolojiler sunmak.',
                            color: 'from-[#172535] to-[#0c141d]',
                            borderColor: 'border-[#38B6E3]/20',
                            badgeColor: 'text-[#38B6E3]',
                            icon: '🎯'
                          },
                          {
                            id: 'manifesto',
                            title: 'Manifesto & Karakterler',
                            tag: 'DENEYİM MANİFESTOSU',
                            text: 'Yedi temel maddelik müşteri deneyim manifestosu and tüm lider karakterlerin bir arada bulunduğu özel sayfa.',
                            detail: 'Liderlerimizin felsefesini tek bir görselde toplayan and manifestoyu duyuran bütünsel sayfa tasarımı.',
                            color: 'from-[#221c38] to-[#120f1e]',
                            borderColor: 'border-[#a78bfa]/20',
                            badgeColor: 'text-[#a78bfa]',
                            icon: '📜'
                          },
                          {
                            id: 'ic_sayfa_1',
                            title: 'Örnek İç Sayfa 1',
                            tag: 'DEFTER İÇ SAYFA',
                            text: 'Defterin içinden 1. örnek sayfa şablonu. Geometrik kenar motifleri and lider detayları.',
                            detail: 'Liderlerin sayfalarını and genel yapıyı süsleyen modern-geleneksel sentezi ilk örnek sayfa düzeni.',
                            color: 'from-[#351a24] to-[#1c0e13]',
                            borderColor: 'border-[#f472b6]/20',
                            badgeColor: 'text-[#f472b6]',
                            icon: '📖'
                          },
                          {
                            id: 'ic_sayfa_2',
                            title: 'Örnek İç Sayfa 2',
                            tag: 'DEFTER İÇ SAYFA',
                            text: 'Defterin içinden 2. örnek sayfa şablonu. Alternatif sayfa yapısı and çizgi detayları.',
                            detail: 'Seperatör arkası veya çizgili/noktalı kullanım kurgularını gösteren ikinci örnek sayfa düzeni.',
                            color: 'from-[#192a2a] to-[#0d1616]',
                            borderColor: 'border-[#2dd4bf]/20',
                            badgeColor: 'text-[#2dd4bf]',
                            icon: '🎨'
                          }
                        ].map((card, idx) => {
                          let imageVal: string | null = null;
                          let inputRef: React.RefObject<HTMLInputElement | null> | null = null;
                          let setImageVal: ((url: string) => void) | null = null;

                          if (card.id === 'vizyon_misyon') {
                            imageVal = diaryVizyonImage;
                            inputRef = diaryVizyonFileInputRef;
                            setImageVal = setDiaryVizyonImage;
                          } else if (card.id === 'manifesto') {
                            imageVal = diaryManifestoImage;
                            inputRef = diaryManifestoFileInputRef;
                            setImageVal = setDiaryManifestoImage;
                          } else if (card.id === 'ic_sayfa_1') {
                            imageVal = diaryIcSayfa1Image;
                            inputRef = diaryIcSayfa1FileInputRef;
                            setImageVal = setDiaryIcSayfa1Image;
                          } else if (card.id === 'ic_sayfa_2') {
                            imageVal = diaryIcSayfa2Image;
                            inputRef = diaryIcSayfa2FileInputRef;
                            setImageVal = setDiaryIcSayfa2Image;
                          }

                          const handleCardClick = () => {
                            inputRef?.current?.click();
                          };

                          const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              compressAndResizeImage(file)
                                .then(resized => {
                                  if (setImageVal) setImageVal(resized);
                                })
                                .finally(() => {
                                  e.target.value = '';
                                });
                            }
                          };

                          return (
                            <div key={card.id} className="flex flex-col h-full group">
                              {!isLocked && (
                                <input
                                  type="file"
                                  ref={inputRef as any}
                                  onChange={handleFileChange}
                                  accept="image/*"
                                  className="hidden"
                                />
                              )}
                              <div
                                onClick={isLocked ? undefined : handleCardClick}
                                className={`aspect-[3/4.2] rounded-lg bg-gradient-to-b ${card.color} border ${card.borderColor} p-3 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${isLocked ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(56,182,227,0.15)] hover:border-[#38B6E3]/30'}`}
                              >
                                {imageVal ? (
                                  <div className="absolute inset-0 w-full h-full">
                                    <img
                                      src={imageVal}
                                      alt={card.title}
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute top-2 left-2 right-2 bg-black/75 backdrop-blur-sm px-2 py-1 rounded border border-white/5 z-30 flex justify-between items-center">
                                      <span className="font-mono text-[6px] text-[#38B6E3] font-bold tracking-wider">{card.tag}</span>
                                      <span className="font-serif italic text-[8px] text-white/90">{card.title}</span>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-center z-10 border-b border-white/5 pb-1.5">
                                      <span className="font-mono text-[6px] text-white/30 tracking-widest uppercase">{card.tag}</span>
                                      <span className="font-mono text-[6px] text-white/30">MOCKUP 0{idx + 1}</span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center my-auto py-1 z-10 select-none">
                                      <div className="w-11 h-11 rounded-full border border-dashed border-white/10 flex items-center justify-center bg-black/40 text-xl shadow-inner text-white/30 group-hover:text-[#00F0FF]/80 group-hover:border-[#00F0FF]/30 transition-colors">
                                        {card.icon}
                                      </div>
                                      <span className="font-serif italic text-xs text-white/60 mt-2 text-center block font-light leading-snug">
                                        {card.title}
                                      </span>
                                    </div>

                                    <div className="z-10 border-t border-white/5 pt-1 flex justify-between items-center select-none">
                                      <span className="font-sans font-bold text-[8px] text-white/50 block uppercase tracking-wider">
                                        {card.title.toUpperCase()}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>

                              <div className="mt-2 bg-white/[0.01] border border-white/5 rounded-md p-2 h-[120px] flex flex-col justify-start overflow-y-auto scrollbar-none">
                                <span className={`font-mono text-[7px] font-bold uppercase tracking-wider mb-1 ${card.badgeColor}`}>
                                  {card.tag}
                                </span>
                                <p className="font-sans text-[10px] text-white/50 leading-relaxed font-light mb-1.5">
                                  {card.text}
                                </p>
                                <div className="border-t border-white/5 pt-1.5 mt-auto">
                                  <p className="font-sans text-[9px] text-white/40 leading-relaxed font-light italic whitespace-pre-line">
                                    {card.detail}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="w-full py-2 sm:py-3 relative z-20">
                      {renderGeometricPattern(5, divider5Image, setDivider5Image, divider5FileInputRef)}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex flex-col gap-6 relative z-10 text-left"
                    >
                      <div className="max-w-4xl flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4 select-none">
                          <span className="font-serif italic font-extralight text-6xl sm:text-7xl text-[#38B6E3]/25 leading-none select-none">05</span>
                          <div className="flex flex-col">
                            <span className="font-mono text-[8px] text-[#38B6E3] tracking-[0.3em] font-bold uppercase mb-0.5">// DEĞERLER LANSMANI</span>
                            <h3>Alan Tasarımı</h3>
                          </div>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-2 pl-4 border-l-2 border-[#38B6E3]/30 bg-[#38B6E3]/5 py-3 rounded-r-lg">
                          Bu aşamada, dijitalde and defter tasarımında kurguladığım o derin felsefi dünyayı, katılımcıların etkileşime gireceği fiziksel etkinlik alanına taşıdım.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-4">
                        <div className="lg:col-span-5 flex flex-col justify-center py-2">
                          <div className="flex flex-col mb-4">
                            <span className="font-mono text-[8px] text-[#38B6E3]/70 tracking-[0.25em] font-bold uppercase mb-1">// ETKİNLİK GÖRSEL MERKEZ ÜSSÜ</span>
                            <h4 className="font-sans italic font-bold text-2xl sm:text-3xl text-white tracking-wide">
                              Backdrop Tasarımı
                            </h4>
                          </div>
                          <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light mb-6">
                            Etkinliğin görsel merkez üssü olan backdrop tasarımında, lansmana özel belirlediğim alternatif renk paletini and o kurumsal sürekliliği simgeleyen akışkan döngüsel örüntüleri kullandım.
                          </p>
                        </div>

                        <div className="lg:col-span-7 flex flex-col justify-center w-full">
                          <ImageUploadPlaceholder
                            image={backdropImage}
                            onUpload={setBackdropImage}
                            fileInputRef={backdropFileInputRef}
                            title="Backdrop Tasarımı"
                            aspect="aspect-[16/9]"
                            isLocked={isLocked}
                          />
                        </div>
                      </div>
                    </motion.div>

                    <div className="w-full py-2 sm:py-3 relative z-20">
                      {renderGeometricPattern(6, divider6Image, setDivider6Image, divider6FileInputRef)}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex flex-col gap-6 relative z-10 text-left"
                    >
                      <div className="max-w-4xl flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4 select-none">
                          <span className="font-serif italic font-extralight text-6xl sm:text-7xl text-[#38B6E3]/25 leading-none select-none">—</span>
                          <div className="flex flex-col">
                            <span className="font-mono text-[8px] text-[#38B6E3] tracking-[0.3em] font-bold uppercase mb-0.5">// DEĞERLER LANSMANI</span>
                            <h3>Yaka İpi Tasarımı</h3>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-6 mt-4">
                        <div className="w-full">
                          <ImageUploadPlaceholder
                            image={lanyardFrontImage}
                            onUpload={setLanyardFrontImage}
                            fileInputRef={lanyardFrontFileInputRef}
                            title="Yaka İpi Tasarımı 1"
                            aspect="aspect-[5316/108]"
                            objectFit="contain"
                            isLocked={isLocked}
                          />
                        </div>
                        <div className="w-full">
                          <ImageUploadPlaceholder
                            image={lanyardBackImage}
                            onUpload={setLanyardBackImage}
                            fileInputRef={lanyardBackFileInputRef}
                            title="Yaka İpi Tasarımı 2"
                            aspect="aspect-[5316/108]"
                            objectFit="contain"
                            isLocked={isLocked}
                          />
                        </div>
                      </div>
                    </motion.div>

                    <div className="w-full py-2 sm:py-3 relative z-20">
                      {renderGeometricPattern(7, divider7Image, setDivider7Image, divider7FileInputRef)}
                    </div>

              {/* Section 6: Yönlendirme ve Çerçeve Tasarımı */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Left Column: Title and Frame design text */}
                <div className="lg:col-span-3 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex items-center gap-3 mb-4 select-none">
                      <span className="font-serif italic font-extralight text-6xl text-[#38B6E3]/25 leading-none">06</span>
                      <div className="flex flex-col">
                        <span className="font-mono text-[8px] text-[#38B6E3] tracking-[0.3em] font-bold uppercase mb-0.5">// YÖNLENDİRME KULESİ</span>
                        <h3 className="font-serif text-2xl text-white font-light tracking-tight">
                          İnteraktif <span className="text-[#38B6E3] italic font-normal">Çerçeve</span>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6 mt-4">
                    <h4 className="font-mono text-[8px] tracking-widest text-[#A31D44] uppercase mb-2">// 02 / ÇERÇEVE YAZISI</h4>
                    <p className="font-sans text-xs text-white/45 leading-relaxed font-light">
                      Lansman fotoğraf alanlarında kullanılmak üzere tasarladığım çerçeve kurgusudur. Katılımcıların marka değerleriyle en şık şekilde fotoğraflanmasını ve etkileşim kurmasını sağlayan dinamik kurumsal çizgiler barındırır.
                    </p>
                  </div>
                </div>

                {/* Middle Column: The big image placeholder */}
                <div className="lg:col-span-6 flex flex-col justify-center gap-2 items-center">
                  <div className="w-full">
                    <div className="flex items-center gap-1.5 mb-2 justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                      <span className="font-mono text-[7.5px] text-white/50 tracking-widest uppercase">// GÖRSEL ÖNİZLEME PANOSU</span>
                    </div>
                    <ImageUploadPlaceholder 
                      image={directionFrameImage}
                      onUpload={setDirectionFrameImage}
                      fileInputRef={directionFrameFileInputRef}
                      title="İnteraktif Çerçeve / Yönlendirme Kulesi"
                      aspect="aspect-[16/10]" // Horizontal backdrop style aspect ratio
                      objectFit="contain"
                      isLocked={isLocked}
                    />
                  </div>
                </div>

                {/* Right Column: Direction info text */}
                <div className="lg:col-span-3 flex flex-col justify-center py-2 h-full">
                  <div className="border border-white/5 bg-[#07070a]/40 backdrop-blur-md rounded-2xl p-5 h-full flex flex-col justify-center">
                    <h4 className="font-mono text-[8px] tracking-widest text-[#38B6E3] uppercase mb-2">// 01 / YÖNLENDİRME BİLGİ YAZISI</h4>
                    <p className="font-sans text-xs text-white/45 leading-relaxed font-light">
                      Bu tasarımları basit birer yön tabelası olarak değil, katılımcıyı mekan boyunca kurumsal felsefeyle buluşturan 'mesaj kuleleri' olarak kurguladım. Üzerlerinde yer tarifi yerine kurum değerlerini, vizyon-misyon cümlelerini ve lansman manifestosunu barındıran bu panoların, katılımcıların mekanda hareket ederken bile kurum kültürünün o yaşayan ritmini sürekli okumasını ve hissetmesini sağlamayı amaçladım.
                    </p>
                  </div>
                </div>
              </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-white/5 pt-12 mt-12"
                    >
                      <input type="file" ref={interactivePlacard1FileInputRef} className="hidden" />
                      <input type="file" ref={interactivePlacard2FileInputRef} className="hidden" />
                      <input type="file" ref={interactivePlacard3FileInputRef} className="hidden" />
                      <input type="file" ref={interactivePlacard4FileInputRef} className="hidden" />

                      <div className="flex items-center gap-2 mb-6">
                        <span className="w-1.5 h-4 bg-[#A31D44] rounded-full animate-pulse" />
                        <h4 className="font-mono text-[10px] text-white/95 tracking-[0.2em] font-bold uppercase">// EL PANKARTLARI & SLOGANLAR</h4>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
                        <div className="lg:col-span-7 flex flex-col gap-6">
                          <div className="w-full max-w-[420px] mx-auto relative border border-white/10 bg-[#07070a]/60 backdrop-blur-md rounded-2xl p-5 group overflow-hidden">
                            {(() => {
                              const activeData = activeInteractivePlacard === 1 ? { img: interactivePlacard1Image, title: "Model 01" } :
                                activeInteractivePlacard === 2 ? { img: interactivePlacard2Image, title: "Model 02" } :
                                  activeInteractivePlacard === 3 ? { img: interactivePlacard3Image, title: "Model 03" } :
                                    { img: interactivePlacard4Image, title: "Model 04" };
                              return (
                                <ImageUploadPlaceholder
                                  image={activeData.img}
                                  onUpload={() => { }}
                                  fileInputRef={{ current: null }}
                                  title={activeData.title}
                                  aspect="aspect-[790/1024]"
                                  objectFit="contain"
                                  isLocked={isLocked}
                                />
                              );
                            })()}
                          </div>
                        </div>

                        <div className="lg:col-span-5 flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { id: 1, img: interactivePlacard1Image, label: "Model 01" },
                              { id: 2, img: interactivePlacard2Image, label: "Model 02" },
                              { id: 3, img: interactivePlacard3Image, label: "Model 03" },
                              { id: 4, img: interactivePlacard4Image, label: "Model 04" }
                            ].map((item) => (
                              <div key={item.id} className="cursor-pointer" onClick={() => setActiveInteractivePlacard(item.id)}>
                                <div className="aspect-[790/1024] border border-white/10 rounded-xl overflow-hidden relative bg-black/40">
                                  {item.img && <img src={item.img} alt={item.label} className="w-full h-full object-contain" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <div className="w-full py-6 relative z-20">
                      {renderGeometricPattern(8, divider8Image, setDivider8Image, divider8FileInputRef)}
                    </div>
                  </>
                )}

          {selectedProjectId === 'ai-factory' && (
            /* ==========================================
               REDESIGNED AI AGENT FACTORY SECTIONS (IMMERSIVE & DETAILED)
               ========================================== */
            <>
              {/* Section 01: Tasarım Kimliği */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center max-w-5xl mx-auto"
              >
                {/* Top Section Header */}
                <div className="flex flex-col items-center text-center relative mb-8">
                  {/* Huge transparent number */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 font-mono text-[96px] sm:text-[120px] font-black text-[#A86CFF]/5 select-none pointer-events-none leading-none tracking-tighter">
                    01
                  </div>
                  {/* small pixel label */}
                  <div className="font-pixel text-[#A86CFF] text-[10px] sm:text-[12px] tracking-[0.1em] font-bold uppercase mb-4 z-10">
                    AI AGENT FACTORY'26
                  </div>
                  {/* Large section title */}
                  <h3 className="font-pixel text-lg sm:text-2xl text-white uppercase tracking-wider z-10">
                    Tasarım Kimliği
                  </h3>
                </div>

                {/* Description Card with retro pixel theme */}
                <div className="w-full max-w-4xl bg-[#130f26]/60 border-2 border-[#8F5BFF]/30 rounded-lg p-6 sm:p-8 shadow-[inset_0_0_15px_rgba(168,108,255,0.05),4px_4px_0px_rgba(143,91,255,0.1)] text-left relative overflow-hidden mb-10">
                  {/* Retro Pixel corner accents */}
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#8F5BFF]" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#8F5BFF]" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#8F5BFF]" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#8F5BFF]" />
                  
                  <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed font-light mb-4">
                    Bu tasarımın temel görsel felsefesini, etkinliğin arkasındaki "Disruptive (Yıkıcı) Teknolojiler" kavramı ile en ilkel canlılardan biri olan dinozor maskotu arasındaki güçlü ironiden yola çıkarak kurguladık.
                  </p>
                  <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed font-light mb-4">
                    Geleceğin en üst noktası olan yapay zekâ ajanlarını, tarihin en eski ve vahşi unsuruyla özdeşleştirerek akılda kalıcı, düşündürücü ve yüksek grafik kontrastlı bir zıtlık yaratmayı hedefledim.
                  </p>
                  <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed font-light">
                    Yapay zekânın soğuk rasyonelliğini morun teknolojik tonlarıyla dengelerken, 8-bit piksel estetiğiyle de bu ironiyi eğlenceli ve yaşayan bir oyun evreni diliyle tüm lansmana yaymayı amaçladık.
                  </p>
                </div>

                {/* TWO IMAGE AREAS ON THE SAME ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  <div className="flex justify-center items-center">
                    <div className="w-full aspect-[16/9]">
                      <ImageUploadPlaceholder 
                        image={aiFactoryImage}
                        onUpload={setAiFactoryImage}
                        fileInputRef={aiFactoryFileInputRef}
                        title="Kimlik Sol Görsel"
                        aspect="aspect-[16/9]"
                        theme="retro"
                        isLocked={isLocked}
                        onLockedClick={() => handleLockedClick(aiFactoryFileInputRef)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-full aspect-[16/9]">
                      <ImageUploadPlaceholder 
                        image={aiFactoryThemeImage}
                        onUpload={setAiFactoryThemeImage}
                        fileInputRef={aiFactoryThemeFileInputRef}
                        title="Kimlik Sağ Görsel"
                        aspect="aspect-[16/9]"
                        theme="retro"
                        isLocked={isLocked}
                        onLockedClick={() => handleLockedClick(aiFactoryThemeFileInputRef)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {renderRetroDivider()}

              {/* Section 02: Backdrop */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16"
              >
                {/* Left: 16:9 placeholder */}
                <div className="lg:w-7/12">
                  <ImageUploadPlaceholder 
                    image={aiFactoryBackdropImage}
                    onUpload={setAiFactoryBackdropImage}
                    fileInputRef={aiFactoryBackdropFileInputRef}
                    title="Backdrop Tasarımı"
                    aspect="aspect-[16/9]"
                    theme="retro"
                    isLocked={isLocked}
                    onLockedClick={() => handleLockedClick(aiFactoryBackdropFileInputRef)}
                  />
                </div>
                
                {/* Right: Description panel */}
                <div className="lg:w-5/12 flex flex-col justify-center py-6">
                  {renderRetroSectionHeader("02", "Backdrop")}
                  <div className="space-y-4">
                    <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                      Etkinlik alanının merkez üssü olarak kurguladığım, katılımcıların önünde fotoğraf çekileceği 5×3 metre boyutlarındaki makro sahne arkası panosudur.
                    </p>
                    <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                      Lansmanın kurumsal mor tonlarını ve ironik 8-bit piksel evrenini devasa ölçekte mekâna yayarak katılımcıları ilk andan itibaren bu sıra dışı temayla sarmalamayı hedefledim.
                    </p>
                  </div>
                </div>
              </motion.div>

              {renderRetroDivider()}

              {/* Section 03: Yönlendirme */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16"
              >
                {/* Left: 240x330 placeholder (visually dominant size) */}
                <div className="lg:w-6/12 flex justify-center items-center">
                  <div className="w-[420px] max-w-full">
                    <ImageUploadPlaceholder 
                       image={aiFactoryDirectionImage}
                       onUpload={setAiFactoryDirectionImage}
                       fileInputRef={aiFactoryDirectionFileInputRef}
                       title="Yönlendirme Ünitesi"
                       aspect="aspect-[240/330]"
                       theme="retro"
                       isLocked={isLocked}
                       onLockedClick={() => handleLockedClick(aiFactoryDirectionFileInputRef)}
                    />
                  </div>
                </div>
                
                {/* Right: Description */}
                <div className="lg:w-6/12 flex flex-col justify-center py-6">
                  {renderRetroSectionHeader("03", "Yönlendirme")}
                  <div className="space-y-4">
                    <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                      Fiziksel etkinlik alanındaki bu dikey panoyu basit bir yer tarifi tabelası olmaktan çıkarıp konseptin ironik dünyasını alanda devleştirmeyi amaçladım.
                    </p>
                    <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                      Yaklaşık iki metre boyundaki bu kuleyi robot ve dinozor maskotlarıyla bezeyerek katılımcıların dikkatini anında çeken, önünde fotoğraf çekilmek isteyecekleri kadar ilgi çekici ve merak uyandırıcı bir alan nesnesine dönüştürdüm.
                    </p>
                  </div>
                </div>
              </motion.div>

              {renderRetroDivider()}

              {/* Section 04: Şipşak Foto Deneyimi */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 max-w-4xl mx-auto"
              >
                {/* LEFT: square aspect ratio image */}
                <div className="lg:w-5/12 flex justify-center items-center">
                  <div className="w-[320px] max-w-full">
                    <ImageUploadPlaceholder 
                      image={aiFactoryFrameImage}
                      onUpload={setAiFactoryFrameImage}
                      fileInputRef={aiFactoryFrameFileInputRef}
                      title="Fotoğraf Çerçevesi Şablonu"
                      aspect="aspect-square"
                      theme="retro"
                      isLocked={isLocked}
                      onLockedClick={() => handleLockedClick(aiFactoryFrameFileInputRef)}
                    />
                  </div>
                </div>
                
                {/* RIGHT: description */}
                <div className="lg:w-7/12 flex flex-col justify-center text-left py-6">
                  {renderRetroSectionHeader("04", "Şipşak Foto Deneyimi")}
                  <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                    Etkinlik günü katılımcıların anlık fotoğraflarını çekip yapay zekâ entegrasyonuyla 8-bit oyun karakterlerine dönüştürdüğüm ve lansman çerçevesiyle anında basıp teslim ettiğim deneyim alanıdır. Amacım etkinlik konseptini fiziksel ve unutulmaz bir hatıraya dönüştürmekti.
                  </p>
                </div>
              </motion.div>

              {renderRetroDivider()}

              {/* Section 05: Instagram Gönderisi */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center max-w-4xl mx-auto"
              >
                {renderRetroSectionHeader("05", "Instagram Gönderisi")}
                
                {/* Phone Mockup Container */}
                <div className="relative w-full max-w-[380px] bg-[#0c0a1a] rounded-[50px] p-3.5 border-4 border-[#8F5BFF] shadow-[0_0_30px_rgba(143,91,255,0.25),8px_8px_0px_rgba(143,91,255,0.4)] my-6 overflow-hidden">
                  {/* Speaker and Camera Cutout at the top */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-b-2xl z-40 flex items-center justify-center">
                    <div className="w-12 h-1 bg-white/10 rounded-full mb-1" />
                    <div className="w-2.5 h-2.5 bg-[#101010] rounded-full border border-white/5 absolute right-4 bottom-1" />
                  </div>

                  {/* Phone Screen Area */}
                  <div className="bg-black rounded-[36px] overflow-hidden border border-white/5 pt-6 pb-4 flex flex-col relative">
                    {/* Instagram App Header */}
                    <div className="px-4 py-2 flex items-center justify-between border-b border-white/5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-full bg-[#8F5BFF]/30 border border-[#A86CFF]/50 p-0.5 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-[#C67CFF]">🦖</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-sans text-[11px] font-bold text-white leading-tight">architecht</span>
                          <span className="font-sans text-[8px] text-white/50 leading-none">AI Agent Factory'26</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-white/40 hover:text-white/80 cursor-pointer">
                        <span className="w-1 h-1 bg-white/40 rounded-full" />
                        <span className="w-1 h-1 bg-white/40 rounded-full" />
                        <span className="w-1 h-1 bg-white/40 rounded-full" />
                      </div>
                    </div>

                    {/* Main Image Carousel Area with 4 upload placeholders */}
                    <div className="relative w-full aspect-[4/5] bg-[#130f26]/40 overflow-hidden group">
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={aiFactoryInstaActiveIdx}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full"
                        >
                          {aiFactoryInstaActiveIdx === 0 && (
                            <ImageUploadPlaceholder 
                              image={aiFactoryCarouselImage}
                              onUpload={setAiFactoryCarouselImage}
                              fileInputRef={aiFactoryCarouselFileInputRef}
                              title="GÖNDERİ 1"
                              aspect="aspect-[4/5]"
                              theme="retro"
                              isLocked={isLocked}
                              onLockedClick={() => handleLockedClick(aiFactoryCarouselFileInputRef)}
                            />
                          )}
                          {aiFactoryInstaActiveIdx === 1 && (
                            <ImageUploadPlaceholder 
                              image={aiFactoryInsta2Image}
                              onUpload={setAiFactoryInsta2Image}
                              fileInputRef={aiFactoryInsta2FileInputRef}
                              title="GÖNDERİ 2"
                              aspect="aspect-[4/5]"
                              theme="retro"
                              isLocked={isLocked}
                              onLockedClick={() => handleLockedClick(aiFactoryInsta2FileInputRef)}
                            />
                          )}
                          {aiFactoryInstaActiveIdx === 2 && (
                            <ImageUploadPlaceholder 
                              image={aiFactoryInsta3Image}
                              onUpload={setAiFactoryInsta3Image}
                              fileInputRef={aiFactoryInsta3FileInputRef}
                              title="GÖNDERİ 3"
                              aspect="aspect-[4/5]"
                              theme="retro"
                              isLocked={isLocked}
                              onLockedClick={() => handleLockedClick(aiFactoryInsta3FileInputRef)}
                            />
                          )}
                          {aiFactoryInstaActiveIdx === 3 && (
                            <ImageUploadPlaceholder 
                              image={aiFactoryInsta4Image}
                              onUpload={setAiFactoryInsta4Image}
                              fileInputRef={aiFactoryInsta4FileInputRef}
                              title="GÖNDERİ 4"
                              aspect="aspect-[4/5]"
                              theme="retro"
                              isLocked={isLocked}
                              onLockedClick={() => handleLockedClick(aiFactoryInsta4FileInputRef)}
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Horizontal Carousel Navigation Arrows */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAiFactoryInstaActiveIdx((prev) => (prev === 0 ? 3 : prev - 1));
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 border border-[#A86CFF]/30 flex items-center justify-center text-[#A86CFF] hover:text-white hover:bg-[#8F5BFF] transition-all z-20 shadow-[0_0_10px_rgba(168,108,255,0.4)]"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAiFactoryInstaActiveIdx((prev) => (prev === 3 ? 0 : prev + 1));
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 border border-[#A86CFF]/30 flex items-center justify-center text-[#A86CFF] hover:text-white hover:bg-[#8F5BFF] transition-all z-20 shadow-[0_0_10px_rgba(168,108,255,0.4)]"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Carousel Dots Indicator inside image at bottom */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
                        {[0, 1, 2, 3].map((idx) => (
                          <div 
                            key={idx}
                            onClick={() => setAiFactoryInstaActiveIdx(idx)}
                            className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                              aiFactoryInstaActiveIdx === idx ? 'bg-[#C67CFF] scale-110 shadow-[0_0_6px_#A86CFF]' : 'bg-white/30 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Instagram App Interaction Bar */}
                    <div className="px-4 py-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-white/80">
                          <button className="hover:text-[#A86CFF] transition-colors">
                            <Heart className="w-5 h-5" />
                          </button>
                          <button className="hover:text-[#A86CFF] transition-colors">
                            <MessageCircle className="w-5 h-5" />
                          </button>
                          <button className="hover:text-[#A86CFF] transition-colors">
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                        <button className="text-white/80 hover:text-[#A86CFF] transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Likes, Caption, Comments */}
                      <div className="space-y-1.5 text-left select-text">
                        <span className="font-sans text-[11px] font-bold text-white block">1,256 beğenme</span>
                        <div className="font-sans text-[11px] leading-relaxed">
                          <span className="font-bold text-white mr-1.5">architecht</span>
                          <span className="text-white/80 font-light">
                            AI Agent Factory\'26 kapsamında hazırlanan bu paylaşım serisi; etkinliğin ironik 8-bit dünyasını, piksel karakterlerini ve yapay zekâ temasını sosyal medyada sürdürülebilir bir görsel dile dönüştürmek amacıyla tasarlandı.
                          </span>
                        </div>
                        <span className="font-sans text-[9px] text-white/40 block uppercase tracking-wider mt-1">2 SAAT ÖNCE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {renderRetroDivider()}

              {/* Section 06: Sticker Seti */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16"
              >
                {/* Left: A5 placeholder */}
                <div className="lg:w-7/12 flex justify-center items-center">
                  <div className="w-[380px] max-w-full">
                    <ImageUploadPlaceholder 
                      image={aiFactoryStickerImage}
                      onUpload={setAiFactoryStickerImage}
                      fileInputRef={aiFactoryStickerFileInputRef}
                      title="Sticker Seti Tasarımı"
                      aspect="aspect-[1/1.414]"
                      theme="retro"
                      isLocked={isLocked}
                      onLockedClick={() => handleLockedClick(aiFactoryStickerFileInputRef)}
                    />
                  </div>
                </div>
                
                {/* Right: Description */}
                <div className="lg:w-5/12 flex flex-col justify-center py-6">
                  {renderRetroSectionHeader("06", "Sticker Seti")}
                  <div className="space-y-4">
                    <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                      Robot kafası, dinozor, klasör ve piksel imleç gibi formları eğlenceli sticker setlerine dönüştürdüm.
                    </p>
                    <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                      Katılımcıların bu görselleri etkinlik sonrasında da kullanmasını sağlayarak oyun evreninin yaşamaya devam etmesini amaçladım.
                    </p>
                  </div>
                </div>
              </motion.div>

              {renderRetroDivider()}

              {/* Section 07: Takım İsimliği */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16"
              >
                {/* Left: 16:9 placeholder with caption */}
                <div className="lg:w-7/12 flex flex-col gap-3">
                  <ImageUploadPlaceholder 
                    image={aiFactoryBadgeImage}
                    onUpload={setAiFactoryBadgeImage}
                    fileInputRef={aiFactoryBadgeFileInputRef}
                    title="Takım İsimliği Tasarımı"
                    aspect="aspect-[16/9]"
                    theme="retro"
                    isLocked={isLocked}
                    onLockedClick={() => handleLockedClick(aiFactoryBadgeFileInputRef)}
                  />
                  <span className="font-mono text-[9px] text-[#A86CFF]/40 text-center block">
                    (Görsel AI ile modellenmiştir.)
                  </span>
                </div>
                
                {/* Right: Description */}
                <div className="lg:w-5/12 flex flex-col justify-center py-6">
                  {renderRetroSectionHeader("07", "Takım İsimliği")}
                  <div className="space-y-4">
                    <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                      Yarışan ekipler için 3D yazıcı ile üretilmek üzere özel olarak modellediğim masa isimliği tasarımıdır.
                    </p>
                    <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                      Üst katmanda takım adı, alt katmanda geliştirilen yapay zekâ ürünü yer alır.
                    </p>
                    <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
                      Lansmanın 8-bit estetiğini fiziksel bir objeye dönüştürmeyi amaçladım.
                    </p>
                  </div>
                </div>
              </motion.div>

              {renderRetroDivider()}

              {/* Section 08: Dino Ödülü */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-[#130f26]/40 border-2 border-[#A86CFF] rounded-2xl p-8 sm:p-12 shadow-[0_0_30px_rgba(168,108,255,0.15),inset_0_0_20px_rgba(168,108,255,0.05)] relative overflow-hidden group"
              >
                {/* Glowing grid line effects inside */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Retro corner glow marks */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-[#C67CFF] shadow-[0_0_8px_#C67CFF]" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#C67CFF] shadow-[0_0_8px_#C67CFF]" />
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#C67CFF] shadow-[0_0_8px_#C67CFF]" />
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#C67CFF] shadow-[0_0_8px_#C67CFF]" />
                
                <div className="flex flex-col items-center max-w-2xl mx-auto z-10 relative">
                  {renderRetroSectionHeader("08", "Dino Ödülü")}
                  
                  {/* Center 260x360 placeholder */}
                  <div className="w-[260px] max-w-full mb-8">
                    <ImageUploadPlaceholder 
                      image={aiFactoryTrophyImage}
                      onUpload={setAiFactoryTrophyImage}
                      fileInputRef={aiFactoryTrophyFileInputRef}
                      title="Dino Ödülü Tasarımı"
                      aspect="aspect-[13/18]"
                      theme="retro"
                      isLocked={isLocked}
                      onLockedClick={() => handleLockedClick(aiFactoryTrophyFileInputRef)}
                    />
                  </div>
                  
                  {/* Below description */}
                  <div className="text-center">
                    <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light mb-2">
                      Konseptin merkezindeki "Yıkıcı Teknolojiler / İlkel Dinozor" ironisini fiziksel ödüle taşıdım.
                    </p>
                    <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light">
                      Kazananların havaya kaldıracağı bu ödülü piksel dinozor formunda tasarlayarak koleksiyon değeri taşıyan ikonik bir obje oluşturmayı amaçladım.
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {selectedProjectId === 'rd' && (
            /* ==========================================
               R&D SECTIONS
               ========================================== */
            <>
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16"
              >
                <div className="lg:w-5/12 flex flex-col justify-center py-6">
                  <span className="font-mono text-[#00F0FF] text-[10px] tracking-[0.3em] font-bold uppercase mb-4 block">// 01 / ORGANİZASYONEL SÜREÇ AR&GE</span>
                  <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-6">
                    RESEARCH &<br/>
                    <span className="text-[#00F0FF]">DEVELOPMENT</span>
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                    Geleceğin organizasyonel süreçlerini ve veri akışlarını bilimsel yaklaşımlar ve teknik optimizasyonlarla şekillendiren araştırma ve geliştirme modelleri.
                  </p>
                  <div className="border-t border-white/5 pt-6 mt-2">
                    <h4 className="font-mono text-[8px] tracking-widest text-[#00F0FF] uppercase mb-1.5">// SÜREÇ ENTEGRASYONLARI</h4>
                    <p className="font-sans text-xs text-white/45 leading-relaxed font-light">
                      Veri yollarını optimize etmek, ekipler arası iletişimi asimetrik şemalar yardımıyla en verimli hale getirmek için geliştirilmiş metodoloji şablonları.
                    </p>
                  </div>
                </div>
                <div className="lg:w-7/12 flex flex-col justify-center">
                  <ImageUploadPlaceholder 
                    image={rdImage}
                    onUpload={setRdImage}
                    fileInputRef={rdFileInputRef}
                    title="R&D Araştırma Görseli"
                    isLocked={isLocked}
                    onLockedClick={() => handleLockedClick(rdFileInputRef)}
                  />
                </div>
              </motion.div>
            </>
          )}

          {selectedProjectId === 'egitim' && (
            /* ==========================================
               EĞİTİM SECTIONS (Architecht Academy Etkinlikleri)
               ========================================== */
            <div className="flex flex-col gap-24 md:gap-32 pb-20">
              {/* Decorative Background Arrow Lines */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                {/* Arrow 1 */}
                <div className="absolute right-[5%] top-[15%] opacity-15 text-[#FF4E00]">
                  <svg width="240" height="120" viewBox="0 0 240 120" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M 0 60 L 200 60" />
                    <path d="M 180 45 L 200 60 L 180 75" />
                    <circle cx="10" cy="60" r="3" fill="currentColor" />
                  </svg>
                </div>
                {/* Arrow 2 */}
                <div className="absolute left-[8%] top-[45%] opacity-10 text-[#FF4E00]">
                  <svg width="180" height="180" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
                    <path d="M 10 90 L 90 10" />
                    <path d="M 60 10 L 90 10 L 90 40" />
                    <path d="M 30 90 L 90 30" strokeDasharray="3 3" />
                  </svg>
                </div>
                {/* Arrow 3 */}
                <div className="absolute right-[10%] top-[70%] opacity-15 text-[#FF4E00]">
                  <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
                    <path d="M 10 10 L 90 90" />
                    <path d="M 90 60 L 90 90 L 60 90" />
                  </svg>
                </div>
              </div>

              {/* HERO */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col lg:flex-row items-center gap-12 relative z-10"
              >
                <div className="lg:w-5/12 flex flex-col justify-center text-left">
                  <div className="flex items-center gap-2 text-[#FF4E00] font-mono text-[9px] font-bold tracking-[0.3em] uppercase mb-4">
                    <span>// OVERVIEW</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E00] animate-pulse" />
                  </div>
                  <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tighter leading-tight mb-6">
                    HİÇ DURMAYAN<br/>
                    ÖĞRENME <span className="text-[#FF4E00]">YOLCULUĞU</span>
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light mb-4">
                    Akademinin kurumsal ciddiyetini simgeleyen derin lacivert ile gelişimin enerjisini temsil eden canlı turuncu zıtlığı üzerine bir dünya kurguladım.
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    "Hiç Durmayan Öğrenme Yolculuğu" mottosundan yola çıkarak, sürekli ilerlemeyi sembolize eden dinamik yön oklarını ana grafik ögem haline getirmeyi hedefledim.
                  </p>
                </div>
                <div className="lg:w-7/12 w-full flex flex-col justify-center relative group">
                  <ImageUploadPlaceholder 
                    image={egitimThemeImage}
                    onUpload={setEgitimThemeImage}
                    fileInputRef={egitimThemeFileInputRef}
                    title="ACADEMY HERO IMAGE"
                    aspect="aspect-[16/9]"
                    isLocked={isLocked}
                    onLockedClick={() => handleLockedClick(egitimThemeFileInputRef)}
                  />
                </div>
              </motion.div>

              {/* SECTION 01 - Design Identity */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 text-left relative z-10"
              >
                {/* LEFT */}
                <div className="lg:w-5/12 flex flex-col justify-center py-6 relative">
                  <div className="flex items-center gap-4 mb-6 select-none">
                    <span className="font-serif italic font-extralight text-7xl sm:text-8xl text-[#FF4E00]/15 leading-none select-none">01</span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[8.5px] text-[#FF4E00] tracking-[0.3em] font-bold uppercase mb-1">// ARCHITECHT ACADEMY</span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-tight flex items-center gap-2">
                        Tasarım <span className="text-[#FF4E00] italic font-normal">Kimliği</span>
                      </h3>
                    </div>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                    Kurumsal kimliği oluştururken güven hissini temsil eden koyu lacivert ile gelişimi simgeleyen canlı turuncuyu ana renk sistemi olarak kullandım. Tipografide modern geometrik fontları, el yazısı detaylarıyla dengeleyerek akademinin hem profesyonel hem de samimi karakterini yansıttım. Sürekli ilerlemeyi anlatan yön okları, tüm organizasyon boyunca tekrar eden temel grafik dili oluşturdu.
                  </p>

                  <div className="border-t border-white/5 pt-6 mt-2 flex flex-col gap-4">
                    <div>
                      <h4 className="font-mono text-[8px] tracking-widest text-white/35 uppercase mb-1">// TIPOGRAFİK FONT SEÇİMLERİ</h4>
                      <p className="font-sans text-xs text-white/45 leading-relaxed font-light">
                        Başlıklarda fütüristik <strong className="font-semibold text-white/80">Broilink</strong> ve <strong className="font-semibold text-white/80">Alternity</strong> fontları ile teknolojik duruşu vurgularken; el yazısı <strong className="font-semibold text-white/80">Caveat</strong> ve <strong className="font-semibold text-white/80">Dancing Script</strong> ile akademinin samimi yanını dengeledik.
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="lg:w-7/12 w-full flex flex-col justify-center">
                  <ImageUploadPlaceholder 
                    image={egitimTypographyImage}
                    onUpload={setEgitimTypographyImage}
                    fileInputRef={egitimTypographyFileInputRef}
                    title="Tasarım Kimliği"
                    aspect="aspect-[4/3]"
                    customGraphic={renderEgitimIdentityGraphic()}
                    isLocked={isLocked}
                    onLockedClick={() => handleLockedClick(egitimTypographyFileInputRef)}
                  />
                </div>
              </motion.div>

              {/* SECTION 02 - Hediye Kit */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-8 relative z-10 text-left"
              >
                <div className="relative">
                  {/* Giant Transparent Number */}
                  <span className="absolute -left-4 -top-16 font-sans font-black text-[120px] md:text-[180px] text-white/[0.02] select-none leading-none pointer-events-none">
                    02
                  </span>
                  
                  <span className="font-mono text-[#FF4E00] text-[9px] tracking-[0.3em] font-bold uppercase mb-3 block relative z-10">
                    // ARCHITECHT ACADEMY
                  </span>
                  <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tight relative z-10">
                    Hediye Kit
                  </h2>
                </div>

                {/* Colored Keyword List */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-2 border-y border-white/5 font-mono text-[9px] tracking-widest uppercase text-[#FF4E00] font-bold">
                  <span>Turuncu</span>
                  <span className="text-white/20">•</span>
                  <span>Bez Çanta</span>
                  <span className="text-white/20">•</span>
                  <span>İsimli Kupa</span>
                  <span className="text-white/20">•</span>
                  <span>3D Yazıcı Plaket</span>
                  <span className="text-white/20">•</span>
                  <span>Sticker Seti</span>
                  <span className="text-white/20">•</span>
                  <span>Ayraç</span>
                </div>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-4xl">
                  Eğitmenler ve katılımcılar için tasarladığımız bu kurumsal kitte (bez çanta, isimli kupa, plaket, sticker seti ve ayraç); lacivert ile turuncu dengesini ürünlerin en küçük detayına kadar taşıdım. Amacım akademi içi aidiyet duygusunu güçlendirecek bütünsel bir karşılama paketi (welcome pack) oluşturmaktı.
                </p>

                {/* 3 side-by-side squares */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  <div className="flex flex-col gap-3">
                    <ImageUploadPlaceholder 
                      image={egitimKit1Image}
                      onUpload={setEgitimKit1Image}
                      fileInputRef={egitimKit1FileInputRef}
                      title="Bez Çanta & Kupa"
                      aspect="aspect-square"
                      isLocked={isLocked}
                      onLockedClick={() => handleLockedClick(egitimKit1FileInputRef)}
                    />
                    <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest text-center">// 1. REFERANS GÖRSELİ (320x320)</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <ImageUploadPlaceholder 
                      image={egitimKit2Image}
                      onUpload={setEgitimKit2Image}
                      fileInputRef={egitimKit2FileInputRef}
                      title="3D Plaket & Sticker"
                      aspect="aspect-square"
                      isLocked={isLocked}
                      onLockedClick={() => handleLockedClick(egitimKit2FileInputRef)}
                    />
                    <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest text-center">// 2. REFERANS GÖRSELİ (320x320)</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <ImageUploadPlaceholder 
                      image={egitimKit3Image}
                      onUpload={setEgitimKit3Image}
                      fileInputRef={egitimKit3FileInputRef}
                      title="Ayraç & Detaylar"
                      aspect="aspect-square"
                      isLocked={isLocked}
                      onLockedClick={() => handleLockedClick(egitimKit3FileInputRef)}
                    />
                    <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest text-center">// 3. REFERANS GÖRSELİ (320x320)</span>
                  </div>
                </div>
              </motion.div>

              {/* SECTION 03 - Pleksi & Yönlendirmeler */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-8 relative z-10 text-left"
              >
                <div className="relative">
                  {/* Giant Transparent Number */}
                  <span className="absolute -left-4 -top-16 font-sans font-black text-[120px] md:text-[180px] text-white/[0.02] select-none leading-none pointer-events-none">
                    03
                  </span>
                  
                  <span className="font-mono text-[#FF4E00] text-[9px] tracking-[0.3em] font-bold uppercase mb-3 block relative z-10">
                    // ARCHITECHT ACADEMY
                  </span>
                  <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tight relative z-10">
                    Pleksi & Yönlendirmeler
                  </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch gap-10">
                  <div className="lg:w-4/12 flex flex-col justify-center bg-[#FF4E00]/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8">
                    <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                      Eğitim alanında mekanı düz tabelalarla boğmak yerine, akademinin renk geçişlerini taşıyan bu panolar sayesinde yön bulma deneyimini estetik bir organizasyon diline dönüştürmeyi amaçladım.
                    </p>
                  </div>
                  
                  <div className="lg:w-8/12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <ImageUploadPlaceholder 
                        image={egitimPleksi1Image}
                        onUpload={setEgitimPleksi1Image}
                        fileInputRef={egitimPleksi1FileInputRef}
                        title="Pleksi 01"
                        aspect="aspect-[210/297]"
                        isLocked={isLocked}
                        onLockedClick={() => handleLockedClick(egitimPleksi1FileInputRef)}
                      />
                      <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest text-center">// A4 ORANI</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <ImageUploadPlaceholder 
                        image={egitimPleksi2Image}
                        onUpload={setEgitimPleksi2Image}
                        fileInputRef={egitimPleksi2FileInputRef}
                        title="Pleksi 02"
                        aspect="aspect-[210/297]"
                        isLocked={isLocked}
                        onLockedClick={() => handleLockedClick(egitimPleksi2FileInputRef)}
                      />
                      <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest text-center">// A4 ORANI</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <ImageUploadPlaceholder 
                        image={egitimPleksi3Image}
                        onUpload={setEgitimPleksi3Image}
                        fileInputRef={egitimPleksi3FileInputRef}
                        title="Pleksi 03"
                        aspect="aspect-[210/297]"
                        isLocked={isLocked}
                        onLockedClick={() => handleLockedClick(egitimPleksi3FileInputRef)}
                      />
                      <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest text-center">// A4 ORANI</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* SECTION 04 - El Pankartları */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-8 relative z-10 text-left"
              >
                <div className="relative">
                  {/* Giant Transparent Number */}
                  <span className="absolute -left-4 -top-16 font-sans font-black text-[120px] md:text-[180px] text-white/[0.02] select-none leading-none pointer-events-none">
                    04
                  </span>
                  
                  <span className="font-mono text-[#FF4E00] text-[9px] tracking-[0.3em] font-bold uppercase mb-3 block relative z-10">
                    // ARCHITECHT ACADEMY
                  </span>
                  <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tight relative z-10">
                    El Pankartları
                  </h2>
                </div>

                <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-4xl">
                  Eğitim aralarında ve fotoğraf alanlarında katılımcıların motivasyonunu artırmak için "Grow Your Mind" gibi akademi mottolarını taşıyan dairesel el pankartları tasarladım. Bu küçük objelerle kurumsal ciddiyeti eğlenceli bir etkileşimle dengelemeyi hedefledim.
                </p>

                {/* Carousel */}
                <div className="w-full flex justify-center mt-6">
                  {/* Interactive Carousel */}
                  <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
                    {/* Carousel Display */}
                    <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 py-16 sm:py-24 w-full">
                      {[
                        { id: 1, img: egitimPankart1Image, setImg: setEgitimPankart1Image, ref: egitimPankart1FileInputRef, title: "Grow Your Mind" },
                        { id: 2, img: egitimPankart2Image, setImg: setEgitimPankart2Image, ref: egitimPankart2FileInputRef, title: "Hiç Durma Öğren" },
                        { id: 3, img: egitimPankart3Image, setImg: setEgitimPankart3Image, ref: egitimPankart3FileInputRef, title: "Think Different" },
                        { id: 4, img: egitimPankart4Image, setImg: setEgitimPankart4Image, ref: egitimPankart4FileInputRef, title: "Academy Spirit" }
                      ].map((item, idx) => {
                        const isActive = idx === egitimPankartActiveIdx;
                        return (
                          <motion.div
                            key={item.id}
                            animate={{
                              scale: isActive ? 1.45 : 0.85,
                              opacity: isActive ? 1 : 0.4,
                              zIndex: isActive ? 20 : 10
                            }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative w-36 h-36 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full border-2 ${
                              isActive ? 'border-[#FF4E00] shadow-[0_0_45px_rgba(255,78,0,0.45)]' : 'border-white/10'
                            } bg-white/[0.01] overflow-hidden flex-shrink-0 flex items-center justify-center transition-colors duration-500`}
                          >
                            {/* Custom circular file upload inside */}
                            <input
                              type="file"
                              ref={item.ref}
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    compressAndResizeImage(file, 1024, 1024, 0.9)
                                      .then(compressedUrl => item.setImg(compressedUrl))
                                      .catch(() => {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          if (typeof reader.result === 'string') {
                                            item.setImg(reader.result);
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      });
                                  }
                              }}
                            />
                            
                            {item.img ? (
                              <div 
                                onClick={isLocked ? undefined : () => item.ref.current?.click()} 
                                className={`absolute inset-0 w-full h-full ${isLocked ? 'cursor-default' : 'cursor-pointer'} group/sign`}
                              >
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/sign:scale-105" referrerPolicy="no-referrer" />
                                {!isLocked && (
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/sign:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity z-20">
                                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4E00] animate-pulse" />
                                    <span className="font-mono text-[8px] sm:text-[10px] text-[#FF4E00] tracking-wider uppercase font-bold">// DEĞİŞTİR</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div 
                                onClick={isLocked ? undefined : () => item.ref.current?.click()} 
                                className={`flex flex-col items-center justify-center gap-1.5 ${isLocked ? 'cursor-default' : 'cursor-pointer'} p-4 text-center select-none`}
                              >
                                {!isLocked && (
                                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#FF4E00]/10 border border-[#FF4E00]/30 flex items-center justify-center text-[#FF4E00] mb-1">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M12 5v14M5 12h14" />
                                    </svg>
                                  </div>
                                )}
                                <span className="font-mono text-[8px] sm:text-[10px] md:text-[12px] text-[#FF4E00] tracking-wider uppercase font-bold leading-tight truncate max-w-[80px] sm:max-w-[130px]">{item.title}</span>
                                {!isLocked && <span className="font-sans text-[7px] sm:text-[9px] text-white/30 leading-tight hidden sm:inline">Yükle</span>}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Carousel Controls */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setEgitimPankartActiveIdx(prev => (prev - 1 + 4) % 4)}
                        className="p-3 bg-white/5 hover:bg-[#FF4E00]/10 border border-white/10 hover:border-[#FF4E00]/40 rounded-full text-white hover:text-[#FF4E00] transition-all duration-300 shadow-md group cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                      </button>
                      <div className="flex items-center gap-2">
                        {[0, 1, 2, 3].map(i => (
                          <button
                            key={i}
                            onClick={() => setEgitimPankartActiveIdx(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                              i === egitimPankartActiveIdx ? 'bg-[#FF4E00] w-6' : 'bg-white/20 hover:bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setEgitimPankartActiveIdx(prev => (prev + 1) % 4)}
                        className="p-3 bg-white/5 hover:bg-[#FF4E00]/10 border border-white/10 hover:border-[#FF4E00]/40 rounded-full text-white hover:text-[#FF4E00] transition-all duration-300 shadow-md group cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* SECTION 05 - Kişiselleştirilmiş Yaka Kartları */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-8 relative z-10 text-left"
              >
                <div className="relative">
                  {/* Giant Transparent Number */}
                  <span className="absolute -left-4 -top-16 font-sans font-black text-[120px] md:text-[180px] text-white/[0.02] select-none leading-none pointer-events-none">
                    05
                  </span>
                  
                  <span className="font-mono text-[#FF4E00] text-[9px] tracking-[0.3em] font-bold uppercase mb-3 block relative z-10">
                    // ARCHITECHT ACADEMY
                  </span>
                  <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tight relative z-10">
                    Kişiselleştirilmiş Yaka Kartları
                  </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 mt-4">
                  {/* Flip Interaction Placeholder */}
                  <div className="lg:w-6/12 flex flex-col items-center justify-center gap-6 w-full">
                    <div 
                      onClick={() => setEgitimYakaFlipped(!egitimYakaFlipped)} 
                      className="relative cursor-pointer group select-none flex items-center justify-center"
                      style={{ perspective: '1000px', width: '240px', height: '360px' }}
                    >
                      <motion.div
                        animate={{ rotateY: egitimYakaFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full relative"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* FRONT SIDE */}
                        <div 
                          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.01]"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <ImageUploadPlaceholder
                            image={egitimYakaFrontImage}
                            onUpload={setEgitimYakaFrontImage}
                            fileInputRef={egitimYakaFrontFileInputRef}
                            title="Yaka Kartı Ön"
                            aspect="aspect-[240/360]"
                            isLocked={isLocked}
                            onLockedClick={() => handleLockedClick(egitimYakaFrontFileInputRef)}
                          />
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-mono tracking-widest text-[#FF4E00] uppercase border border-white/5 flex items-center gap-1 select-none font-bold">
                            ÖN GÖRÜNÜM <span>⇅</span>
                          </div>
                        </div>

                        {/* BACK SIDE */}
                        <div 
                          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.01]"
                          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                          <ImageUploadPlaceholder
                            image={egitimYakaBackImage}
                            onUpload={setEgitimYakaBackImage}
                            fileInputRef={egitimYakaBackFileInputRef}
                            title="Yaka Kartı Arka"
                            aspect="aspect-[240/360]"
                            isLocked={isLocked}
                            onLockedClick={() => handleLockedClick(egitimYakaBackFileInputRef)}
                          />
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-mono tracking-widest text-[#FF4E00] uppercase border border-white/5 flex items-center gap-1 select-none font-bold">
                            ARKA GÖRÜNÜM <span>⇅</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <button
                      onClick={() => setEgitimYakaFlipped(!egitimYakaFlipped)}
                      className="font-mono text-[10px] tracking-widest text-[#FF4E00] border border-[#FF4E00]/30 hover:bg-[#FF4E00]/10 px-5 py-2 rounded-xl transition-all uppercase font-bold cursor-pointer hover:shadow-[0_0_15px_rgba(255,78,0,0.2)]"
                    >
                      KARTI ÇEVİR (3D FLIP)
                    </button>
                  </div>

                  {/* Description text */}
                  <div className="lg:w-6/12 flex flex-col justify-center">
                    <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light mb-4">
                      Katılımcıların kendilerini akademinin vizyoner bir parçası olarak hissetmeleri için kişiselleştirilmiş yaka kartları tasarladım.
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                      Yapay zekâ ile oluşturulan özgün avatar görselleri sayesinde bu kartları sıradan kimliklerden çıkarıp saklanmak istenecek kişisel birer hatıraya dönüştürmeyi amaçladım.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="w-full h-[1px] bg-white/5 my-12" />

              {/* SECTION 06 - Veri-Nimet Yaka Kartı */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-8 relative z-10 text-left"
              >
                <div className="relative">
                  {/* Giant Transparent Number */}
                  <span className="absolute -left-4 -top-16 font-sans font-black text-[120px] md:text-[180px] text-white/[0.02] select-none leading-none pointer-events-none">
                    06
                  </span>
                  
                  <span className="font-mono text-[#FF4E00] text-[9px] tracking-[0.3em] font-bold uppercase mb-3 block relative z-10">
                    // ARCHITECHT ACADEMY
                  </span>
                  <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tight relative z-10">
                    Veri-Nimet Yaka Kartı
                  </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 mt-4">
                  {/* LEFT: Image Placeholder (400x255 landscape) */}
                  <div className="lg:w-6/12 w-full">
                    <div className="w-full max-w-[400px]">
                      <ImageUploadPlaceholder
                        image={egitimVeriNimetImage}
                        onUpload={setEgitimVeriNimetImage}
                        fileInputRef={egitimVeriNimetFileInputRef}
                        title="Veri-Nimet Yaka Kartı"
                        aspect="aspect-[400/255]"
                        isLocked={isLocked}
                        onLockedClick={() => handleLockedClick(egitimVeriNimetFileInputRef)}
                      />
                    </div>
                  </div>

                  {/* RIGHT: Description */}
                  <div className="lg:w-6/12 flex flex-col justify-center">
                    <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light mb-4">
                      Eğitim programı kapsamında, katılımcıların veriye dayalı analitik düşünce ile insan odaklı bereketi ("nimet" felsefesini) bir arada kurgulayabilmeleri adına tasarladığım özgün bir yaka kartı deneyimi.
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                      Veri yollarını, fütüristik kodlama estetiğini ve canlandırıcı turuncu-mavi renk şemasını kartın görsel kompozisyonunun merkezine taşıyarak; eğitimi bir bilgi aktarımından öte bütüncül bir kurumsal kültür deneyimi olarak konumlandırmayı hedefledim.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {selectedProjectId === 'rd-techathon-2026' && (
            /* ==========================================
               R&D TECHATHON 2026 SECTIONS
               ========================================== */
            <>
              {/* SECTION 01: Tasarım Kimliği */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative"
              >
                {/* Subtle glowing nested triangle outlines background */}
                {renderNestedTrianglesBackground('#00F0FF')}

                <div className="lg:w-5/12 flex flex-col justify-center py-6 relative z-10">
                  <div className="flex items-center gap-4 mb-6 select-none">
                    <span className="font-sans font-black text-7xl sm:text-8xl text-[#00F0FF]/15 leading-none select-none">01</span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[8.5px] text-[#00F0FF] tracking-[0.3em] font-bold uppercase mb-1">// R&D TECHATHON 2026</span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="text-[#00F0FF] font-mono mr-1">//</span> Tasarım Kimliği
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                    Etkinliğin ana mottosu olan <strong className="font-semibold text-white/90">"Turning Ideas Into Impact"</strong> vizyonunu; yapay zekanın gücü ve takım çalışmasının dinamizmiyle birleştiren fütüristik bir görsel dil üzerine inşa ettik. Derin elektrik mavisi ve siber mor tonlarını, inovasyonun enerjisini temsil eden canlı turuncu ve neon piksellerle harmanlayarak, AR-GE ruhuna yakışır, teknolojik ve yüksek motivasyon barındıran bir kimlik kurguladık.
                  </p>
                </div>
                <div className="lg:w-7/12 relative z-10 w-full">
                  <ImageUploadPlaceholder 
                    image={rdSection1Image}
                    onUpload={setRdSection1Image}
                    fileInputRef={rdSection1FileInputRef}
                    title="Tasarım Kimliği"
                    aspect="aspect-[600/740]"
                    objectFit="contain"
                    isLocked={isLocked}
                    onLockedClick={() => handleLockedClick(rdSection1FileInputRef)}
                  />
                </div>
              </motion.div>

              {renderNeonDivider('#00F0FF')}

              {/* SECTION 02: Kişiselleştirilmiş Yaka Kartı */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16 relative"
              >
                {/* Subtle glowing nested triangle outlines background */}
                {renderNestedTrianglesBackground('#FF6B00')}

                <div className="lg:w-5/12 flex flex-col justify-center py-6 relative z-10">
                  <div className="flex items-center gap-4 mb-6 select-none">
                    <span className="font-sans font-black text-7xl sm:text-8xl text-[#00F0FF]/15 leading-none select-none">02</span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[8.5px] text-[#00F0FF] tracking-[0.3em] font-bold uppercase mb-1">// R&D TECHATHON 2026</span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="text-[#00F0FF] font-mono mr-1">//</span> Kişiselleştirilmiş Yaka Kartı
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                    Lansmanın teknoloji odaklı ruhunu katılımcılara hissettirmek adına, canlı renk geçişleri ve geometrik hatlara sahip yaka kartları tasarladım. Kartların üzerinde katılımcıların yapay zeka ile dönüştürülmüş özgün avatar görsellerine yer vererek, kimlik tasarımını standart birer yaka kartı olmaktan çıkarıp etkinliğin teknolojik konseptiyle doğrudan bütünleşen kişisel birer hatıraya dönüştürmeyi amaçladım.
                  </p>

                  {/* Slide controls for front/back yaka karti */}
                  <div className="flex items-center gap-4 mt-4 select-none">
                    <button 
                      onClick={() => setYakaKartiSide('front')}
                      className={`font-mono text-[9px] font-bold tracking-widest uppercase py-2.5 px-5 rounded-xl border transition-all duration-300 ${
                        yakaKartiSide === 'front' 
                          ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_15px_rgba(0,240,255,0.15)]' 
                          : 'border-white/10 text-white/40 hover:text-white/85 hover:border-white/20'
                      }`}
                    >
                      Ön Yüz (Front)
                    </button>
                    <button 
                      onClick={() => setYakaKartiSide('back')}
                      className={`font-mono text-[9px] font-bold tracking-widest uppercase py-2.5 px-5 rounded-xl border transition-all duration-300 ${
                        yakaKartiSide === 'back' 
                          ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_15px_rgba(0,240,255,0.15)]' 
                          : 'border-white/10 text-white/40 hover:text-white/85 hover:border-white/20'
                      }`}
                    >
                      Arka Yüz (Back)
                    </button>
                  </div>
                </div>

                <div className="lg:w-7/12 flex flex-col items-center justify-center relative z-10 w-full">
                  <div className="w-full max-w-[340px] aspect-[153/218] relative">
                    <ImageUploadPlaceholder 
                      image={yakaKartiSide === 'front' ? rdYakaKartiFrontImage : rdYakaKartiBackImage}
                      onUpload={yakaKartiSide === 'front' ? setRdYakaKartiFrontImage : setRdYakaKartiBackImage}
                      fileInputRef={yakaKartiSide === 'front' ? rdYakaKartiFrontFileInputRef : rdYakaKartiBackFileInputRef}
                      title={`Yaka Kartı ${yakaKartiSide === 'front' ? 'Ön' : 'Arka'}`}
                      aspect="aspect-[153/218]"
                      objectFit="contain"
                      isLocked={isLocked}
                      onLockedClick={() => handleLockedClick(yakaKartiSide === 'front' ? rdYakaKartiFrontFileInputRef : rdYakaKartiBackFileInputRef)}
                    />
                  </div>
                </div>
              </motion.div>

              {renderNeonDivider('#00F0FF')}

              {/* SECTION 03: Yarışmacı Videoları */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative"
              >
                {/* Subtle glowing nested triangle outlines background */}
                {renderNestedTrianglesBackground('#00F0FF')}

                <div className="lg:w-5/12 flex flex-col justify-center py-6 relative z-10">
                  <div className="flex items-center gap-4 mb-6 select-none">
                    <span className="font-sans font-black text-7xl sm:text-8xl text-[#00F0FF]/15 leading-none select-none">03</span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[8.5px] text-[#00F0FF] tracking-[0.3em] font-bold uppercase mb-1">// R&D TECHATHON 2026</span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="text-[#00F0FF] font-mono mr-1">//</span> Yarışmacı Videoları
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                    Yarışmacı ekipler için hazırlanan yapay zeka destekli tanıtım videoları, projenin hikayesini kısa sürede etkili biçimde aktarırken etkinliğin dijital atmosferini güçlendiren dinamik içerikler olarak tasarlandı.
                  </p>
                </div>

                <div className="lg:w-7/12 relative z-10 w-full">
                  <div className="w-full aspect-[16/9] rounded-2xl border border-white/5 bg-white/[0.015] overflow-hidden group relative flex flex-col items-center justify-center">
                    <input 
                      type="file" 
                      ref={rdVideoFileInputRef} 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              setRdVideoUrl(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                      accept="video/*" 
                      className="hidden" 
                    />
                    
                    {rdVideoUrl ? (
                      <div className="w-full h-full relative">
                        <video 
                          src={rdVideoUrl} 
                          controls 
                          className="w-full h-full object-cover rounded-2xl" 
                        />
                        {!isLocked && (
                          <div 
                            onClick={() => rdVideoFileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 z-20 flex flex-col items-center justify-center gap-3 cursor-pointer"
                          >
                            <div className="w-12 h-12 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/5 flex items-center justify-center text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.35)]">
                              <Upload className="w-4 h-4" />
                            </div>
                            <span className="font-mono text-[9px] text-[#00F0FF] tracking-[0.3em] font-bold uppercase">// VİDEOYU DEĞİŞTİR</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div 
                        onClick={() => !isLocked && rdVideoFileInputRef.current?.click()}
                        className={`w-full h-full flex flex-col items-center justify-center gap-4 p-8 text-center cursor-pointer hover:bg-white/[0.03] transition-all duration-300`}
                      >
                        <div className="w-16 h-16 rounded-full border border-[#00F0FF]/25 bg-[#00F0FF]/5 flex items-center justify-center text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                          <Play className="w-6 h-6 ml-1" />
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-sm text-white/90">Yarışmacı Tanıtım Videosu</h4>
                          <p className="font-sans text-xs text-white/45 mt-1 max-w-xs mx-auto">Tıklayarak video yükleyin (16:9 oran, mp4 formatı önerilir)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {renderNeonDivider('#00F0FF')}

              {/* SECTION 04: Sticker Seti */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16 relative"
              >
                {/* Subtle glowing nested triangle outlines background */}
                {renderNestedTrianglesBackground('#00F0FF')}

                <div className="lg:w-5/12 flex flex-col justify-center py-6 relative z-10">
                  <div className="flex items-center gap-4 mb-6 select-none">
                    <span className="font-sans font-black text-7xl sm:text-8xl text-[#00F0FF]/15 leading-none select-none">04</span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[8.5px] text-[#00F0FF] tracking-[0.3em] font-bold uppercase mb-1">// R&D TECHATHON 2026</span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="text-[#00F0FF] font-mono mr-1">//</span> Sticker Seti
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                    Teknoloji ve yazılım dünyasının içgörülerinden (Data Speaks We Build, Everything Is Under Ctrl vb.) ilham alan eğlenceli ve dinamik bir sticker seti kurguladım. Kod pencereleri, uyarı tabelaları ve post-it formlarından ilham alan bu tasarımlarla, katılımcıların günlük iş akışlarındaki mizahı ve Techathon heyecanını etkinlik sonrasında da yaşamaya devam etmelerini hedefledim.
                  </p>
                </div>

                <div className="lg:w-7/12 relative z-10 w-full">
                  <ImageUploadPlaceholder 
                    image={rdStickerImage}
                    onUpload={setRdStickerImage}
                    fileInputRef={rdStickerFileInputRef}
                    title="Sticker Seti"
                    aspect="aspect-[330/470]"
                    objectFit="contain"
                    isLocked={isLocked}
                    onLockedClick={() => handleLockedClick(rdStickerFileInputRef)}
                  />
                </div>
              </motion.div>

              {renderNeonDivider('#00F0FF')}

              {/* SECTION 05: Tişört Tasarımı */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative"
              >
                <div className="lg:w-5/12 flex flex-col justify-center py-6 relative z-10">
                  <div className="flex items-center gap-4 mb-6 select-none">
                    <span className="font-sans font-black text-7xl sm:text-8xl text-[#00F0FF]/15 leading-none select-none">05</span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[8.5px] text-[#00F0FF] tracking-[0.3em] font-bold uppercase mb-1">// R&D TECHATHON 2026</span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="text-[#00F0FF] font-mono mr-1">//</span> Tişört Tasarımı
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                    Tişörtün ön yüzünde Techathon’un soyut ve dijital desenlerini kullanırken, arka yüzünde veri hiyerarşisini ve "Innovation" vizyonunu simgeleyen teknik şemalar ve ikonografik bir yerleşim tercih ettim. Amacım, hem etkinlik esnasında ekiplerin bir bütün olarak görünmesini sağlamak hem de etkinlik sonrasında günlük hayatta da kullanılabilecek estetik ve zamansız bir ürün ortaya koymaktı.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase block mb-2">// ÖN TASARIM</span>
                      <ImageUploadPlaceholder 
                        image={rdTshirtFrontImage}
                        onUpload={setRdTshirtFrontImage}
                        fileInputRef={rdTshirtFrontFileInputRef}
                        title="Tişört Ön Tasarım"
                        aspect="aspect-[1/1]"
                        objectFit="contain"
                        isLocked={isLocked}
                        onLockedClick={() => handleLockedClick(rdTshirtFrontFileInputRef)}
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase block mb-2">// ARKA TASARIM</span>
                      <ImageUploadPlaceholder 
                        image={rdTshirtBackImage}
                        onUpload={setRdTshirtBackImage}
                        fileInputRef={rdTshirtBackFileInputRef}
                        title="Tişört Arka Tasarım"
                        aspect="aspect-[1/1]"
                        objectFit="contain"
                        isLocked={isLocked}
                        onLockedClick={() => handleLockedClick(rdTshirtBackFileInputRef)}
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:w-7/12 relative z-10 w-full flex flex-col items-center">
                  <span className="font-mono text-[8px] tracking-[0.2em] text-[#00F0FF] uppercase mb-3 block">// İNTERAKTİF 3D MODEL ÖNİZLEME (Sürükle)</span>
                  <div className="w-full aspect-[4/3] rounded-2xl border border-white/5 bg-black/40 overflow-hidden relative shadow-2xl">
                    <RdTshirt3DViewer frontImage={rdTshirtFrontImage} backImage={rdTshirtBackImage} />
                  </div>
                </div>
              </motion.div>

              {renderNeonDivider('#00F0FF')}

              {/* SECTION 06: Yönlendirmeler */}
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative"
              >
                {/* Subtle glowing nested triangle outlines background */}
                {renderNestedTrianglesBackground('#00F0FF')}

                <div className="lg:w-5/12 flex flex-col justify-center py-6 relative z-10">
                  <div className="flex items-center gap-4 mb-6 select-none">
                    <span className="font-sans font-black text-7xl sm:text-8xl text-[#00F0FF]/15 leading-none select-none">06</span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[8.5px] text-[#00F0FF] tracking-[0.3em] font-bold uppercase mb-1">// R&D TECHATHON 2026</span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="text-[#00F0FF] font-mono mr-1">//</span> Yönlendirmeler
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6">
                    Yemek ve fuaye alanları gibi farklı fiziksel noktalarda kullanılmak üzere, alanın enerjisini yükselten dikey pano tasarımları kurguladım. "Enjoy Your Meal!" ve "Where Ideas Take Root and Grow" gibi motive edici mesajları neon ışık çizgileri ve derin perspektif etkileriyle destekleyerek mekan içindeki atmosferi yalnızca yönlendiren değil, deneyimi güçlendiren bir organizasyon öğesine dönüştürmeyi amaçladım.
                  </p>
                </div>

                <div className="lg:w-7/12 relative z-10 w-full grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase block mb-2 text-center">// DİKEY PANO 1</span>
                    <ImageUploadPlaceholder 
                      image={rdDirection1Image}
                      onUpload={setRdDirection1Image}
                      fileInputRef={rdDirection1FileInputRef}
                      title="Dikey Pano 1"
                      aspect="aspect-[180/520]"
                      objectFit="contain"
                      isLocked={isLocked}
                      onLockedClick={() => handleLockedClick(rdDirection1FileInputRef)}
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase block mb-2 text-center">// DİKEY PANO 2</span>
                    <ImageUploadPlaceholder 
                      image={rdDirection2Image}
                      onUpload={setRdDirection2Image}
                      fileInputRef={rdDirection2FileInputRef}
                      title="Dikey Pano 2"
                      aspect="aspect-[180/520]"
                      objectFit="contain"
                      isLocked={isLocked}
                      onLockedClick={() => handleLockedClick(rdDirection2FileInputRef)}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
              </div>

              <div className="max-w-6xl mx-auto border-t border-white/5 pt-16 mt-20 text-center relative z-10 flex flex-col items-center gap-6">
                <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[#00F0FF] hover:bg-[#00F0FF]/5 font-bold font-mono text-[9px] py-3.5 px-8 rounded-xl uppercase"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Başa Dön</span>
                </motion.button>
              </div>
            </div>
          </div>
            );
}

            return null;
}