import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/barberData';
import { ScrollReveal } from './ScrollReveal';

export const Testimonials: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="depoimentos" className="py-20 sm:py-28 lg:py-36 bg-[#0a0b0e] relative border-b border-white/[0.08] overflow-hidden">
      
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#c5a059]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Editorial Section Header with Scroll Reveal */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-14 sm:mb-20 border-b border-white/[0.08] pb-8 sm:pb-12">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#c5a059] font-mono mb-3 sm:mb-4">
                <span className="text-neutral-500">[ 06 ]</span>
                <span>AVALIAÇÕES & CRÍTICA</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-[1.08] sm:leading-[1.05]">
                A PALAVRA DE QUEM <br />
                <span className="text-gold-gradient font-editorial italic font-normal lowercase tracking-normal">
                  não abre mão da excelência.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#c5a059] fill-[#c5a059]" />
                ))}
                <span className="font-heading font-bold text-white text-base ml-1.5 sm:ml-2">4.9 de 5.0</span>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Mais de 1.400 clientes recorrentes avaliam nosso atendimento nos Jardins como referência absoluta.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonials Cards Grid with Staggered Entrance & Interactive Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((test, index) => (
            <ScrollReveal key={test.id} delay={index * 0.12} direction="up" distance={30}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.3 } }}
                className="bg-[#0e1014] border border-white/[0.08] hover:border-[#c5a059]/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)] rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-colors duration-400 relative group h-full"
              >
                {/* Decorative Quote Watermark */}
                <div className="absolute top-4 right-4 text-white/[0.03] group-hover:text-[#c5a059]/[0.08] transition-colors pointer-events-none">
                  <Quote className="w-16 h-16" />
                </div>

                <div className="relative z-10">
                  {/* Header Rating & Index */}
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]" />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-neutral-600 group-hover:text-[#c5a059] transition-colors">
                      TESTEMUNHO 0{index + 1}
                    </span>
                  </div>

                  {/* Comment quote */}
                  <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 font-normal font-sans">
                    "{test.comment}"
                  </p>
                </div>

                {/* Author footer */}
                <div className="pt-4 sm:pt-6 border-t border-white/[0.07] flex items-center gap-3.5 sm:gap-4 relative z-10">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm object-cover border border-[#c5a059]/40 filter grayscale contrast-110 shrink-0 group-hover:border-[#c5a059] group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading text-xs sm:text-sm font-bold text-white uppercase tracking-wide group-hover:text-[#c5a059] transition-colors">
                        {test.name}
                      </h4>
                      <CheckCircle className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-neutral-400 font-mono">
                      {test.role}
                    </p>
                  </div>
                </div>

              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
