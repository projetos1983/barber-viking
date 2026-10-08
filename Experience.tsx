import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Wine, Flame, Armchair, Compass, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../data/barberData';
import { ScrollReveal } from './ScrollReveal';

interface ExperienceProps {
  onOpenBooking: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenBooking }) => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const icons = [
    <Wine className="w-5 h-5 text-[#c5a059]" key="wine" />,
    <Flame className="w-5 h-5 text-[#c5a059]" key="flame" />,
    <Armchair className="w-5 h-5 text-[#c5a059]" key="armchair" />,
    <Compass className="w-5 h-5 text-[#c5a059]" key="compass" />
  ];

  return (
    <section id="experiencia" className="py-20 sm:py-28 lg:py-36 bg-[#0a0b0e] relative overflow-hidden border-b border-white/[0.08]">
      
      {/* Background Subtle Radial Lighting */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-[#c5a059]/[0.035] rounded-full blur-[150px] sm:blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-14 sm:mb-20 border-b border-white/[0.08] pb-8 sm:pb-12">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#c5a059] font-mono mb-3 sm:mb-4">
                <span className="text-neutral-500">[ 04 ]</span>
                <span>HOSPITALIDADE & SENSORIALIDADE</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-[1.08] sm:leading-[1.05]">
                O TEMPO DESACELERA. <br />
                <span className="text-gold-gradient font-editorial italic font-normal lowercase tracking-normal">
                  o homem se restabelece.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="text-neutral-400 text-xs sm:text-base leading-relaxed">
                Criamos uma atmosfera onde cada estímulo — do aroma fresco de eucalipto à acústica selecionada — foi refinado para proporcionar descompressão total.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Architectural Experience Columns with Interactive Focus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-14 sm:mb-20">
          {EXPERIENCES.map((exp, index) => {
            const isSelected = activePillar === index;

            return (
              <ScrollReveal key={exp.title} delay={index * 0.1}>
                <motion.div
                  onMouseEnter={() => setActivePillar(index)}
                  onClick={() => setActivePillar(index)}
                  whileHover={shouldReduceMotion ? {} : { y: -5 }}
                  className={`border p-5 sm:p-8 rounded-sm relative group transition-all duration-400 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#13151b] border-[#c5a059] shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
                      : 'bg-[#0e1014] border-white/[0.08] hover:border-[#c5a059]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5 sm:mb-8">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-sm border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#c5a059]/20 border-[#c5a059]' : 'bg-neutral-900 border-white/10'
                      }`}>
                        {icons[index % icons.length]}
                      </div>
                      <span className={`font-mono text-xs transition-colors ${
                        isSelected ? 'text-[#c5a059] font-bold' : 'text-neutral-600'
                      }`}>
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className={`font-heading text-base sm:text-lg font-bold uppercase mb-2 sm:mb-3 transition-colors leading-snug ${
                      isSelected ? 'text-[#c5a059]' : 'text-white'
                    }`}>
                      {exp.title}
                    </h3>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-8 pt-3.5 sm:pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#c5a059] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                    <span>Padrão Viking</span>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Immersive Panoramic Story Panel with Reveal */}
        <ScrollReveal delay={0.25}>
          <div className="relative rounded-sm overflow-hidden border border-white/10 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 z-10">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#c5a059] block mb-2 sm:mb-3">
                  TERAPIA DA NAVALHA // RITUAL
                </span>
                <h3 className="font-heading text-xl sm:text-4xl lg:text-5xl font-bold text-white uppercase mb-4 sm:mb-6 leading-tight">
                  VAPORIZAÇÃO DE EUCALIPTO & <br />
                  <span className="text-[#c5a059]">MASSAGEM REVITALIZANTE.</span>
                </h3>
                <p className="text-neutral-300 text-xs sm:text-base leading-relaxed mb-6 sm:mb-10 max-w-xl font-light">
                  Antes da lâmina tocar a pele, toalhas aquecidas em caldeiras aromáticas abrem os poros e amolecem as fibras dos pelos. Após o barbear cirúrgico, loções botânicas e toalha fria fecham os poros, selando a hidratação e evitando qualquer irritação.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    onClick={onOpenBooking}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm bg-gradient-to-r from-[#dfc282] via-[#c5a059] to-[#a6823b] text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-[0_0_30px_rgba(197,160,89,0.35)] transition-all cursor-pointer text-center min-h-[48px] flex items-center justify-center"
                  >
                    Experimentar o Ritual
                  </motion.button>
                  <div className="text-[11px] sm:text-xs text-neutral-400 font-mono flex items-center gap-2">
                    <span className="text-[#c5a059]">✦</span>
                    <span>Estacionamento com manobrista gratuito</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 h-[240px] sm:h-[340px] lg:h-[500px] relative overflow-hidden group">
                <motion.img
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1000&q=80"
                  alt="Ritual clássico da toalha quente na Viking Barber"
                  className="w-full h-full object-cover filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
