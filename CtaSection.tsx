import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MessageSquare, Calendar, Shield } from 'lucide-react';
import { BARBERSHOP_INFO } from '../data/barberData';

interface CtaSectionProps {
  onOpenBooking: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${BARBERSHOP_INFO.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio%20na%20Viking%20Barber.`;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#08090b] relative overflow-hidden border-b border-white/[0.08]">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] sm:w-[850px] h-[300px] sm:h-[450px] bg-[#c5a059]/[0.07] rounded-full blur-[140px] sm:blur-[190px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="relative rounded-sm bg-gradient-to-b from-[#14161c] to-[#0c0d10] border border-[#c5a059]/40 p-6 sm:p-14 lg:p-20 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
          
          {/* 1. Crest Badge Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-sm bg-neutral-900 border border-[#c5a059]/30 text-[11px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] uppercase mb-6 sm:mb-8"
          >
            <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>RESERVA DE POLTRONA VIP</span>
          </motion.div>

          {/* 2. Headline Reveal (Title appears first) */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white uppercase tracking-tight mb-5 sm:mb-8 leading-[1.05] break-words"
          >
            SEU PRÓXIMO VISUAL <br />
            <span className="text-gold-gradient font-editorial italic font-normal lowercase tracking-normal">
              começa aqui.
            </span>
          </motion.h2>

          {/* 3. Subtitle Reveal (Appears right after title) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light"
          >
            Não deixe sua imagem para a última hora. Garanta seu momento na bancada de nossos mestres com pontualidade e o melhor chopp da capital.
          </motion.p>

          {/* 4. Buttons Reveal (Appears last with discrete continuous micro-interaction) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 max-w-lg mx-auto mb-8"
          >
            {/* Primary Requested Button: AGENDAR PELO WHATSAPP with continuous discrete pulse microinteraction */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      boxShadow: [
                        '0 0 20px rgba(197, 160, 89, 0.25)',
                        '0 0 35px rgba(197, 160, 89, 0.5)',
                        '0 0 20px rgba(197, 160, 89, 0.25)',
                      ],
                    }
              }
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-9 py-4 rounded-sm bg-gradient-to-r from-[#dfc282] via-[#c5a059] to-[#b3893c] text-neutral-950 font-bold text-xs tracking-[0.14em] sm:tracking-[0.16em] uppercase transition-all active:scale-95 cursor-pointer min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4 fill-neutral-950 shrink-0" />
              <span>AGENDAR PELO WHATSAPP</span>
            </motion.a>

            {/* Secondary direct online appointment */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 rounded-sm bg-neutral-900 border border-white/15 hover:border-[#c5a059] text-white font-medium text-xs tracking-[0.14em] sm:tracking-[0.16em] uppercase hover:bg-neutral-800 transition-all cursor-pointer min-h-[48px]"
            >
              <Calendar className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>AGENDAMENTO ONLINE</span>
            </motion.button>
          </motion.div>

          {/* Contact note */}
          <div className="text-[11px] sm:text-xs text-neutral-400 font-mono">
            Recepção telefônica direta:{' '}
            <a href="tel:1132894400" className="text-white hover:text-[#c5a059] transition-colors font-sans underline underline-offset-4">
              {BARBERSHOP_INFO.phone}
            </a>
            {' '}· Jardins, SP
          </div>

        </div>
      </div>
    </section>
  );
};
