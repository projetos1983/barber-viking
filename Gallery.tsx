import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Maximize2, X, ArrowUpRight } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/barberData';
import { ScrollReveal } from './ScrollReveal';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'cortes' | 'barba' | 'ambiente' | 'detalhes'>('todos');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredItems = activeCategory === 'todos' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'cortes', label: 'Cortes' },
    { id: 'barba', label: 'Barba' },
    { id: 'ambiente', label: 'Ambiente' },
    { id: 'detalhes', label: 'Detalhes' },
  ];

  return (
    <section id="galeria" className="py-20 sm:py-28 lg:py-36 bg-[#08090b] relative border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Stagger Reveal */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-16 border-b border-white/[0.08] pb-6 sm:pb-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#c5a059] font-mono mb-3 sm:mb-4">
                <span className="text-neutral-500">[ 05 ]</span>
                <span>PORTFÓLIO VISUAL EXCLUSIVO</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight">
                OBRAS DE BANCADA
              </h2>
            </div>

            {/* Filter Buttons with Animated layoutId Indicator */}
            <div className="lg:col-span-5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 lg:justify-end no-scrollbar">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`relative px-3.5 sm:px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors rounded-sm shrink-0 cursor-pointer min-h-[40px] ${
                      isActive ? 'text-black font-bold' : 'text-neutral-400 hover:text-white bg-neutral-900/60'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeGalleryTab"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 bg-[#c5a059] rounded-sm -z-0 shadow-md"
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Gallery Dynamic Layout with Animated Layout Transitions */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isWide = index === 0 || index === 3;
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  className={`group relative rounded-sm overflow-hidden bg-neutral-950 border border-white/[0.08] hover:border-[#c5a059]/60 cursor-pointer transition-colors shadow-lg ${
                    isWide ? 'h-[340px] sm:h-[440px]' : 'h-[300px] sm:h-[380px]'
                  }`}
                >
                  <motion.img
                    whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.88] contrast-110 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />
                  
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Corner Index */}
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 font-mono text-[9px] sm:text-[10px] text-neutral-400 bg-neutral-950/85 px-2 py-0.5 sm:py-1 rounded-sm border border-white/10">
                    0{item.id} // {item.category.toUpperCase()}
                  </div>

                  {/* Hover Reveal Action Icon */}
                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-neutral-950/80 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-105">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059]" />
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <h3 className="font-heading text-base sm:text-xl font-bold text-white uppercase mb-1 group-hover:text-[#c5a059] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-300 line-clamp-2 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative max-w-4xl w-full bg-[#121316] border border-[#c5a059]/40 rounded-sm overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button with large touch target */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-20 w-10 h-10 rounded-sm bg-black/80 border border-white/20 text-white flex items-center justify-center hover:text-[#c5a059] hover:border-[#c5a059] transition-all cursor-pointer"
                aria-label="Fechar visualização"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-hidden bg-black flex items-center justify-center max-h-[50vh] sm:max-h-[65vh]">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="max-h-[50vh] sm:max-h-[65vh] w-full object-contain"
                />
              </div>

              <div className="p-4 sm:p-6 bg-[#121316] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#c5a059] uppercase block mb-1">
                    CATEGORIA: {selectedItem.category.toUpperCase()}
                  </span>
                  <h3 className="font-heading text-lg sm:text-2xl font-bold text-white uppercase">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-0.5 sm:mt-1 max-w-xl">
                    {selectedItem.description}
                  </p>
                </div>

                <a
                  href="https://wa.me/5511987654321?text=Ol%C3%A1!%20Gostaria%20de%20um%20corte%20semelhante%20ao%20da%20galeria."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-5 py-3 bg-gradient-to-r from-[#dfc282] to-[#c5a059] text-black text-xs font-bold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap min-h-[44px] flex items-center justify-center shadow-md hover:brightness-105 active:scale-95"
                >
                  Solicitar Este Estilo →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
