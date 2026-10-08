import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Scissors, Flame, Sparkles, Shield, Baby, Eye, Clock, ArrowUpRight, Check, Star } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/barberData';
import { ScrollReveal } from './ScrollReveal';

interface ServicesSectionProps {
  onSelectServiceToBook: (service: ServiceItem) => void;
}

// Visual backgrounds for reactive hover/tap states
const SERVICE_IMAGES: Record<string, string> = {
  'corte-masculino': 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
  'corte-barba': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80',
  'barba-terapia': 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80',
  'degrade-fade': 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80',
  'corte-infantil': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
  'sobrancelha-navalha': 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
};

const SERVICE_INCLUDES: Record<string, string[]> = {
  'corte-masculino': ['Lavagem com mentol', 'Visagismo facial', 'Finalização pomada premium'],
  'corte-barba': ['Corte com tesoura & máquina', 'Toalha quente aromática', 'Alinhamento na navalha', 'Bálsamo e óleo nutritivo'],
  'barba-terapia': ['Toalha vaporizada de eucalipto', 'Espuma cremosa quente', 'Navalhete cirúrgico', 'Massagem facial relaxante'],
  'degrade-fade': ['Fade milimétrico zero a topo', 'Linhas de contorno navalhadas', 'Texturização moderna'],
  'corte-infantil': ['Paciência e técnica lúdica', 'Ambiente confortável', 'Acabamento suave'],
  'sobrancelha-navalha': ['Simetria facial anatômica', 'Limpeza na lâmina livre', 'Sem dor ou vermelhidão'],
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>('corte-barba');
  const shouldReduceMotion = useReducedMotion();

  const renderIcon = (name: ServiceItem['iconName']) => {
    switch (name) {
      case 'scissors':
        return <Scissors className="w-5 h-5 text-[#c5a059]" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-[#c5a059]" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-[#c5a059]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#c5a059]" />;
      case 'baby':
        return <Baby className="w-5 h-5 text-[#c5a059]" />;
      case 'eye':
        return <Eye className="w-5 h-5 text-[#c5a059]" />;
      default:
        return <Scissors className="w-5 h-5 text-[#c5a059]" />;
    }
  };

  const flagshipService = SERVICES.find(s => s.id === 'corte-barba') || SERVICES[1];
  const standardServices = SERVICES.filter(s => s.id !== 'corte-barba');

  return (
    <section id="servicos" className="py-20 sm:py-28 lg:py-36 bg-[#08090b] relative border-b border-white/[0.08]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#c5a059]/[0.035] rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header with Stagger Reveal */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-12 sm:mb-16 border-b border-white/[0.08] pb-8 sm:pb-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#c5a059] font-mono mb-3 sm:mb-4">
                <span className="text-neutral-500">[ 03 ]</span>
                <span>MENU DE OFÍCIO & PRECISÃO INTERATIVA</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight">
                CARDÁPIO DE RITUAIS
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Passe o mouse ou toque nos cards para explorar os detalhes de cada ritual. Todas as sessões contemplam lavagem e chopp cortesia.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Flagship Service Banner (Combo Viking) with Dynamic Interactive Reactivity */}
        <ScrollReveal delay={0.15}>
          <div
            onClick={() => setActiveCardId('corte-barba')}
            className={`mb-10 sm:mb-12 rounded-sm border p-5 sm:p-10 lg:p-12 relative overflow-hidden transition-all duration-500 cursor-pointer ${
              activeCardId === 'corte-barba'
                ? 'border-[#c5a059] shadow-[0_20px_60px_rgba(197,160,89,0.18)] bg-[#12141a]'
                : 'border-[#c5a059]/30 bg-[#0f1014] hover:border-[#c5a059]/60'
            }`}
          >
            {/* Background Image Reactive Fade */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={SERVICE_IMAGES['corte-barba']}
                alt="Combo Viking"
                className={`w-full h-full object-cover filter brightness-[0.22] contrast-125 transition-transform duration-1000 ease-out ${
                  activeCardId === 'corte-barba' ? 'scale-105 opacity-60' : 'scale-100 opacity-25'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0e] via-[#0a0b0e]/85 to-[#0a0b0e]/70" />
            </div>

            {/* Star Signature Badge */}
            <div className="sm:absolute sm:top-4 sm:right-6 text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] uppercase font-bold flex items-center gap-2 mb-4 sm:mb-0 relative z-10">
              <Star className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059] shrink-0" />
              <span>ASSINATURA DA CASA · EXPERIÊNCIA COMPLETA</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <div className="flex items-start sm:items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm bg-neutral-900 border border-[#c5a059]/50 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#c5a059]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                      {flagshipService.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-400 font-mono mt-0.5">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c5a059]" />
                      <span>Duração: {flagshipService.duration}</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="text-[#c5a059]">Ritual mais procurado</span>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-300 text-xs sm:text-base leading-relaxed max-w-2xl mb-5 sm:mb-6 font-light">
                  {flagshipService.description}
                </p>

                {/* Expanded Interactive Detail Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs text-neutral-300 max-w-2xl">
                  {SERVICE_INCLUDES['corte-barba'].map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-neutral-950/60 rounded border border-white/5">
                      <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-end justify-between gap-4 sm:gap-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 sm:pt-6 lg:pt-0 lg:pl-8">
                <div className="flex items-baseline justify-between sm:block">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">Valor Total</span>
                  <span className="font-heading text-3xl sm:text-5xl font-extrabold text-[#c5a059] tracking-tight drop-shadow-[0_2px_15px_rgba(197,160,89,0.3)]">
                    {flagshipService.price}
                  </span>
                </div>

                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectServiceToBook(flagshipService);
                  }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm bg-gradient-to-r from-[#dfc282] via-[#c5a059] to-[#b3893c] text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(197,160,89,0.3)] hover:shadow-[0_0_40px_rgba(197,160,89,0.55)] transition-all cursor-pointer min-h-[48px] flex items-center justify-center"
                >
                  Agendar Ritual Completo
                </motion.button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 5 Distinct Responsive & Reactive Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {standardServices.map((service, index) => {
            const isActive = activeCardId === service.id;
            const bgImage = SERVICE_IMAGES[service.id];
            const includes = SERVICE_INCLUDES[service.id] || [];

            return (
              <ScrollReveal key={service.id} delay={index * 0.08}>
                <div
                  onMouseEnter={() => setActiveCardId(service.id)}
                  onClick={() => setActiveCardId(service.id)}
                  className={`group relative rounded-sm p-5 sm:p-7 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer border ${
                    isActive
                      ? 'border-[#c5a059] bg-[#12141a] shadow-[0_15px_40px_rgba(0,0,0,0.85)] scale-[1.01]'
                      : 'border-white/[0.08] bg-[#0e1014] hover:border-white/20'
                  }`}
                >
                  {/* Reactive Background Image Fade on hover/tap */}
                  {bgImage && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <img
                        src={bgImage}
                        alt={service.name}
                        className={`w-full h-full object-cover filter brightness-[0.25] contrast-125 transition-all duration-700 ${
                          isActive ? 'opacity-55 scale-105' : 'opacity-15 scale-100'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-[#0e1014]/90 to-[#0e1014]/75" />
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Header with Icon, Index and Duration */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-sm border flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#c5a059]/20 border-[#c5a059]' : 'bg-neutral-900 border-white/10'
                      }`}>
                        {renderIcon(service.iconName)}
                      </div>
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="font-mono text-[10px] text-neutral-500">
                          0{index + 2}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] sm:text-xs text-neutral-400 font-mono">
                          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className={`font-heading text-base sm:text-lg font-bold uppercase mb-2.5 sm:mb-3 transition-colors ${
                      isActive ? 'text-[#c5a059]' : 'text-white'
                    }`}>
                      {service.name}
                    </h3>

                    {/* Service Description */}
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                      {service.description}
                    </p>

                    {/* Reactive Animated Detail Drawer (Revealed on active state or hover) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="overflow-hidden mb-4 pt-2 border-t border-white/10"
                        >
                          <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider block mb-1.5">
                            O que está incluso:
                          </span>
                          <div className="space-y-1">
                            {includes.map((item, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                                <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Price and Trigger */}
                  <div className="pt-4 sm:pt-5 border-t border-white/[0.08] flex items-center justify-between mt-auto relative z-10">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">Sessão</span>
                      <span className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {service.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectServiceToBook(service);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer min-h-[44px] ${
                        isActive
                          ? 'bg-[#c5a059] text-black shadow-md font-bold'
                          : 'bg-neutral-900 border border-neutral-700/80 text-white hover:border-[#c5a059]'
                      }`}
                    >
                      <span>Agendar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CRO: Risk Reversal Guarantee Card */}
        <ScrollReveal delay={0.2}>
          <div className="mt-8 p-5 sm:p-6 rounded-sm bg-gradient-to-r from-[#171920] to-[#111216] border border-[#c5a059]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-sm bg-[#c5a059]/20 border border-[#c5a059]/50 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Shield className="w-5 h-5 text-[#c5a059]" />
              </div>
              <div>
                <h4 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                  Garantia de Satisfação Viking de 7 Dias
                </h4>
                <p className="text-xs text-neutral-300 mt-1 max-w-2xl leading-relaxed">
                  Se o alinhamento ou caimento do corte não ficar 100% impecável, você tem retorno gratuito para refinamento fino na bancada com nossos mestres.
                </p>
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#c5a059] uppercase tracking-wider font-semibold whitespace-nowrap bg-black/40 px-3 py-1.5 rounded-sm border border-white/5">
              Risco Zero para Você
            </span>
          </div>
        </ScrollReveal>

        {/* Bespoke VIP Note */}
        <ScrollReveal delay={0.25}>
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-sm bg-[#101115] border border-white/[0.08] flex flex-col md:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-start sm:items-center gap-3 text-left">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Flame className="w-4 h-4 text-[#c5a059]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider font-heading">
                  Dia do Noivo & Assinatura Corporativa
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                  Fechamos o lounge com charutaria, chopp liberado e fotógrafo para grupos exclusivos.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/5511987654321?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20pacotes%20exclusivos%20para%20o%20Dia%20do%20Noivo%20ou%20grupos."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-4 sm:px-5 py-2.5 rounded-sm bg-neutral-900 border border-[#c5a059]/40 text-[#c5a059] hover:bg-[#c5a059] hover:text-black font-semibold text-xs tracking-wider uppercase transition-all whitespace-nowrap min-h-[44px] flex items-center justify-center"
            >
              Consultar via Recepção →
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
