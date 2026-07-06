import { useState } from 'react';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import FeaturedProject from './components/FeaturedProject';
import SelectedWorks from './components/SelectedWorks';
import Journey from './components/Journey';
import Contact from './components/Contact';
import CategoryView from './components/CategoryView';

export default function App() {
  const [currentView, setCurrentView] = useState<{ type: 'home' } | { type: 'category'; id: string }>({ type: 'home' });

  const handleNavigateHomeWithAnchor = (anchor: string) => {
    setCurrentView({ type: 'home' });
    setTimeout(() => {
      const element = document.querySelector(anchor);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  const isCategory = currentView.type === 'category';

  return (
    <div className={`relative min-h-screen bg-[#070707] text-white overflow-hidden ${
      isCategory ? 'selection:bg-[#00F0FF] selection:text-black' : 'selection:bg-[#FF4E20] selection:text-white'
    }`}>
      {/* Premium Luxury Background Paper-Grain Texture overlay */}
      <div className="paper-grain" />

      {/* Advanced Custom Cursor for Desktop (with screen-wide mouse spotlight) */}
      <CustomCursor />

      {/* Floating Header Navigation and Clock Status Widget */}
      <Header 
        isCategoryView={isCategory} 
        onNavigateHomeWithAnchor={handleNavigateHomeWithAnchor} 
      />

      {/* Cinematic Fullscreen Exhibition Sequence */}
      <main>
        {currentView.type === 'home' ? (
          <>
            {/* ROOM 01: THE HERO / HOME */}
            <Hero />

            {/* ROOM 02: THE JOURNEY */}
            <Journey />

            {/* ROOM 03: SELECTED WORKS */}
            <SelectedWorks onCategorySelect={(id) => {
              setCurrentView({ type: 'category', id });
            }} />

            {/* ROOM 04: FEATURED AI PROJECT */}
            <FeaturedProject />

            {/* ELEGANT CHAPTER TRANSITION */}
            <Manifesto />

            {/* ROOM 05: CONTACT */}
            <Contact />
          </>
        ) : (
          <CategoryView 
            categoryId={currentView.id} 
            onBack={() => {
              setCurrentView({ type: 'home' });
              // Scroll to the Works section immediately so the user returns right where they left off
              setTimeout(() => {
                const element = document.getElementById('selected-works');
                if (element) {
                  const offset = 80;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = element.getBoundingClientRect().top;
                  window.scrollTo({
                    top: elementRect - bodyRect - offset,
                    behavior: 'instant' as any
                  });
                }
              }, 50);
            }} 
          />
        )}
      </main>
    </div>
  );
}
