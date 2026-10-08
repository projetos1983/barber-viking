import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronDown, Sliders } from 'lucide-react';
import { FAQS } from '../data/barberData';
import { ScrollReveal } from './ScrollReveal';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);
  const [allowMultiple, setAllowMultiple] = useState<boolean>(true);
  const shouldReduceMotion = useReducedMotion();

  const toggleFaq = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-36 bg-[#0a0b0e] relative border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Section Header */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-16">
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#c5a059] font-mono mb-3 sm:mb-4">
              <span className="text-neutral-500">[ 08 ]</span>
              <span>INFORMAÇÕES & PROTOCOLOS</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight mb-4 sm:mb-5">
              DÚVIDAS FREQUENTES
            </h2>
            <p className="text-neutral-400 text-xs sm:text-base max-w-xl mx-auto font-light leading-relaxed">
              Transparência em relação a agendamentos, formas de pagamento, tempos de sessão e produtos utilizados.
            </p>

            {/* Interactive Mode Toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setAllowMultiple(!allowMultiple)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-900 border border-white/10 hover:border-[#c5a059]/40 text-[11px] font-mono text-neutral-300 transition-colors cursor-pointer"
              >
                <Sliders className="w-3 h-3 text-[#c5a059]" />
                <span>Modo: {allowMultiple ? 'Múltiplas abertas' : 'Uma por vez'}</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Accordion List with AnimatePresence */}
        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <ScrollReveal key={faq.id} delay={index * 0.06}>
                <div
                  className={`border rounded-sm overflow-hidden transition-colors duration-300 ${
                    isOpen
                      ? 'bg-[#12141a] border-[#c5a059]/50 shadow-[0_10px_25px_rgba(0,0,0,0.5)]'
                      : 'bg-[#0e1014] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full py-4 sm:py-6 px-4 sm:px-8 flex items-center justify-between text-left focus:outline-none cursor-pointer min-h-[54px]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 pr-3">
                      <span className={`font-mono text-xs transition-colors ${
                        isOpen ? 'text-[#c5a059] font-bold' : 'text-neutral-500'
                      }`}>
                        0{index + 1}
                      </span>
                      <span className={`font-heading text-xs sm:text-lg font-bold uppercase tracking-wide transition-colors ${
                        isOpen ? 'text-[#c5a059]' : 'text-white'
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    {/* Smooth Spinning Chevron Icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 25 }}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-sm flex items-center justify-center shrink-0 border transition-colors ${
                        isOpen
                          ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]'
                          : 'bg-neutral-900 border-white/10 text-neutral-400'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-8 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.06] font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Support Callout */}
        <div className="mt-10 sm:mt-14 text-center text-[11px] sm:text-xs text-neutral-400 font-mono">
          Outras dúvidas sobre horários ou eventos? WhatsApp:{' '}
          <a
            href="https://wa.me/5511987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c5a059] hover:underline font-semibold"
          >
            (11) 98765-4321
          </a>
        </div>

      </div>
    </section>
  );
};
