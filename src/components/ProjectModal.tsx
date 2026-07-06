import { motion } from 'motion/react';
import { Project } from '../types';
import { X, ArrowUpRight, Compass, Calendar, Layers, Award } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <motion.div
      id="project-case-study-modal"
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#090909]/95 backdrop-blur-md flex justify-center items-start py-12 px-6 md:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-5xl w-full bg-[#121212] text-white rounded-3xl p-8 md:p-12 border border-white/5 relative shadow-[0_30px_70px_rgba(0,0,0,0.8)] mt-4">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 bg-[#FF4E20] text-white hover:bg-white hover:text-black rounded-full transition-all focus:outline-none hover:rotate-90 duration-300 cursor-pointer"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Metadata */}
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-6">
          <span className="font-mono text-xs text-[#FF4E20] font-bold">
            [ CASE STUDY // {project.id.toUpperCase()} ]
          </span>
          <span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span>
          <span className="font-mono text-xs text-white/50">
            YEAR: {project.year}
          </span>
        </div>

        {/* Title Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8">
            <h3 className="font-serif text-4xl md:text-5xl font-light italic text-white leading-none">
              {project.title}
            </h3>
            <p className="font-mono text-xs uppercase tracking-widest text-[#FF4E20] mt-3 font-semibold">
              {project.category}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end text-left lg:text-right">
            <span className="font-mono text-[10px] text-white/40">CLIENT:</span>
            <span className="font-sans text-sm font-medium text-white/90">{project.client}</span>
            <span className="font-mono text-[10px] text-white/40 mt-2">ROLE:</span>
            <span className="font-sans text-sm font-medium text-white/90">{project.role}</span>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="rounded-2xl overflow-hidden aspect-video relative border border-white/10 mb-12 shadow-inner bg-black">
          <img 
            src={project.image} 
            alt={project.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF4E20]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/80">
              High-Fidelity Project Asset
            </span>
          </div>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-10">
          
          {/* Left Block */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] text-[#FF4E20] font-bold block mb-2 uppercase tracking-widest">
                // Strategic Problem
              </span>
              <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed font-light">
                {project.details.problem}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[#FF4E20] font-bold block mb-2 uppercase tracking-widest">
                // Conceptual Philosophy
              </span>
              <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed font-light italic">
                "{project.details.concept}"
              </p>
            </div>
          </div>

          {/* Right Block */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] text-[#FF4E20] font-bold block mb-2 uppercase tracking-widest">
                // Design Solution
              </span>
              <p className="font-sans text-xs text-white/70 leading-relaxed font-light mb-4">
                {project.details.solution}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[#FF4E20] font-bold block mb-3 uppercase tracking-widest">
                // System Artifacts
              </span>
              <ul className="flex flex-col gap-2.5">
                {project.details.features.map((feat, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E20] mt-1.5 shrink-0" />
                    <span className="font-sans text-xs text-white/70 leading-normal">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Footer Meta */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 font-mono text-[10px]">
          <span>NEZİHA ŞİMŞEK © 2026 // ALL RIGHTS RESERVED</span>
          <button 
            onClick={onClose}
            className="flex items-center gap-1 hover:text-[#FF4E20] transition-colors font-mono cursor-pointer"
          >
            Close Case Study [x]
          </button>
        </div>

      </div>
    </motion.div>
  );
}
