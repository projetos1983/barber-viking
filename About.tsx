import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Scissors, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { BARBERS } from '../data/barberData';
import { ScrollReveal } from './ScrollReveal';

interface AboutProps {
  onOpenBooking: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenBooking }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="sobre" className="py-20 sm:py-28 lg:py-36 bg-[#0a0b0e] relative overflow-hidden border-b border-white/[0.08]">
      
      {/* Background Architectural Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-[#c5a059]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Editorial Chapter Header with Scroll Reveal */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-14 sm:mb-20 border-b border-white/[0.08] pb-8 sm:pb-12">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#c5a059] font-mono mb-3 sm:mb-4">
                <span className="text-neutral-500">[ 02 ]</span>
                <span>HISTÓRIA & PRINCÍPIOS FUNDADORES</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-[1.08] sm:leading-[1.05]">
                ONDE A TRADIÇÃO CLÁSSICA <br />
                <span className="text-gold-gradient font-editorial italic font-normal lowercase tracking-normal">
                  encontra a postura moderna.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="text-neutral-400 text-xs sm:text-base leading-relaxed">
                Resgatamos o ritual das antigas barbearias nórdicas e europeias para o homem que entende que o corte não é vaidade superficial — é autoafirmação e presença.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Asymmetrical Editorial Composition with Parallax Entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-28">
          
          {/* Left: Magazine-style imagery with layered frame */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="left" distance={40}>
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-neutral-950 group">
                <motion.img
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80"
                  alt="Interior intimista da Viking Barber"
                  className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover filter contrast-115 brightness-90 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-85 pointer-events-none" />
                
                {/* Bottom Editorial Caption */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-6 bg-neutral-950/90 backdrop-blur-md border border-white/10 rounded-sm">
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-[#c5a059] uppercase mb-1">
                    <span>ATELIER JARDINS</span>
                    <span>EST. 2012</span>
                  </div>
                  <p className="text-[11px] sm:text-xs md:text-sm text-neutral-200 font-light leading-relaxed">
                    Couro envelhecido, iluminação âmbar calculada e silêncio produtivo. O santuário ideal entre compromissos.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Thoughtful Typography & Architectural Values */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <ScrollReveal direction="right" distance={40} delay={0.15}>
              <span className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-[#c5a059] mb-2 sm:mb-3 block">
                FILOSOFIA DE TRABALHO
              </span>
              <h3 className="font-heading text-xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight mb-4 sm:mb-6 leading-snug">
                NÃO SEGUIMOS TENDÊNCIAS EFÊMERAS. <br />
                <span className="text-[#c5a059]">ESCULPIMOS ESTRUTURAS.</span>
              </h3>

              <p className="text-neutral-300 leading-relaxed text-xs sm:text-base mb-4 sm:mb-6 font-normal">
                A maioria das barbearias trata o corte como linha de montagem acelerada. Na Viking Barber, cada atendimento inicia com uma avaliação personalizada de linhas de mandíbula, padrão de crescimento e rotina profissional.
              </p>

              <p className="text-neutral-400 leading-relaxed text-xs sm:text-sm mb-6 sm:mb-10">
                O resultado é um formato harmônico que dura muito além do dia do corte, mantendo o alinhamento e a elegância mesmo durante o crescimento natural dos fios.
              </p>

              {/* Two Distinct Pillars with Hairline borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 pt-5 sm:pt-6 border-t border-white/[0.08]">
                <div className="p-3.5 sm:p-4 bg-neutral-900/60 border border-white/5 rounded-sm hover:border-[#c5a059]/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#c5a059]">
                    <Scissors className="w-4 h-4 shrink-0" />
                    <span className="font-heading text-xs font-bold text-white uppercase tracking-wider">Aço Alemão Forjado</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                    Tesouras ergonômicas com afiação a laser para mechas sem quebra ou fricção.
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 bg-neutral-900/60 border border-white/5 rounded-sm hover:border-[#c5a059]/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#c5a059]">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span className="font-heading text-xs font-bold text-white uppercase tracking-wider">Autoclave Hospitalar</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                    Lâminas 100% descartáveis e esterilização de grau clínico em cada instrumento.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Master Barbers Editorial Ledger */}
        <div className="pt-8 sm:pt-12 border-t border-white/[0.08]">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
              <div>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] block mb-1 sm:mb-2">
                  A BANCADA DE MESTRES
                </span>
                <h3 className="font-heading text-xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight">
                  ESPECIALISTAS DEDICADOS AO SEU VISUAL
                </h3>
              </div>
              <p className="text-xs text-neutral-400 max-w-sm font-sans">
                Cada profissional carrega anos de aperfeiçoamento contínuo em academias internacionais.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            {BARBERS.map((barber, index) => (
              <ScrollReveal key={barber.id} delay={index * 0.1}>
                <motion.div 
                  whileHover={shouldReduceMotion ? {} : { y: -6 }}
                  className="group relative bg-[#0e1014] border border-white/[0.07] hover:border-[#c5a059]/50 rounded-sm p-4 sm:p-6 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4 sm:mb-5 bg-neutral-900 border border-white/5">
                      <img 
                        src={barber.image} 
                        alt={barber.name} 
                        className="w-full h-full object-cover filter grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-70 pointer-events-none" />
                      <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 text-[10px] font-mono text-neutral-400 bg-neutral-950/80 px-2 py-0.5 rounded-sm border border-white/10">
                        0{index + 1}
                      </span>
                    </div>

                    <h4 className="font-heading text-base sm:text-lg font-bold text-white uppercase group-hover:text-[#c5a059] transition-colors">
                      {barber.name}
                    </h4>
                    <div className="text-xs text-[#c5a059] font-medium tracking-wider mb-2">
                      {barber.role}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {barber.specialty}
                    </p>
                  </div>

                  <div className="pt-3.5 sm:pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-mono text-[11px]">{barber.experience}</span>
                    <button 
                      onClick={onOpenBooking}
                      className="inline-flex items-center gap-1 text-[#c5a059] hover:text-white font-semibold text-xs tracking-wider uppercase transition-colors p-1"
                    >
                      <span>Agendar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
