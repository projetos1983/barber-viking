import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MapPin, Navigation, Car, Clock, Phone } from 'lucide-react';
import { BARBERSHOP_INFO } from '../data/barberData';
import { ScrollReveal } from './ScrollReveal';

export const LocationCard: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const wazeUrl = `https://waze.com/ul?q=Av+dos+Vikings+1080+Jardins+Sao+Paulo`;
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=Av+dos+Vikings+1080+Jardins+Sao+Paulo`;

  return (
    <section className="py-16 sm:py-24 bg-[#08090b] relative border-b border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <ScrollReveal>
          <div className="rounded-sm bg-gradient-to-r from-[#121316] to-[#0e0f12] border border-white/10 hover:border-[#c5a059]/40 transition-colors p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Location Info */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] mb-3">
                  <MapPin className="w-4 h-4 text-[#c5a059]" />
                  <span>LOCALIZAÇÃO PRIVILEGIADA // JARDINS</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-4">
                  FÁCIL ACESSO COM MANOBRISTA CORTESIA
                </h3>

                <p className="text-neutral-300 text-xs sm:text-base leading-relaxed mb-6 font-light max-w-xl">
                  Situada no coração dos Jardins, nossa estrutura conta com estacionamento privativo e equipe de manobristas dedicada para você chegar, entregar a chave e relaxar sem se preocupar com trânsito ou vagas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300 mb-8">
                  <div className="flex items-center gap-2.5 p-3 rounded-sm bg-neutral-900/80 border border-white/5 hover:border-white/15 transition-colors">
                    <Car className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>Valet & Seguro 100% gratuito</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-sm bg-neutral-900/80 border border-white/5 hover:border-white/15 transition-colors">
                    <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>Próximo à Av. Paulista & Oscar Freire</span>
                  </div>
                </div>

                {/* Navigation Action Buttons with micro-interactions */}
                <div className="flex flex-wrap items-center gap-3">
                  <motion.a
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    href={gmapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-neutral-900 hover:bg-neutral-800 border border-white/15 hover:border-[#c5a059] text-white text-xs font-mono uppercase tracking-wider transition-all min-h-[44px]"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Abrir no Google Maps</span>
                  </motion.a>

                  <motion.a
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    href={wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-neutral-900 hover:bg-neutral-800 border border-white/15 hover:border-[#c5a059] text-white text-xs font-mono uppercase tracking-wider transition-all min-h-[44px]"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Navegar pelo Waze</span>
                  </motion.a>
                </div>
              </div>

              {/* Right Interactive Card: Live Status & Fast Contacts */}
              <div className="lg:col-span-5 bg-[#17181e] border border-[#c5a059]/30 rounded-sm p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                        Atendimento Aberto Agora
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Até 20:00
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div>
                      <span className="text-neutral-500 font-mono uppercase text-[10px] block">Endereço Oficial</span>
                      <span className="text-white font-medium text-sm block mt-0.5">{BARBERSHOP_INFO.address}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 font-mono uppercase text-[10px] block">Contato da Recepção</span>
                      <span className="text-white font-mono text-sm block mt-0.5">{BARBERSHOP_INFO.phone}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 font-mono uppercase text-[10px] block">Tempo Médio de Espera com Hora Marcada</span>
                      <span className="text-[#c5a059] font-semibold block mt-0.5">Zero minutos · Pontualidade rigorosa</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <motion.a
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    href={`https://wa.me/${BARBERSHOP_INFO.whatsappNumber}?text=Ol%C3%A1!%20Estou%20a%20caminho%20da%20Viking%20Barber.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#dfc282] to-[#c5a059] text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md min-h-[44px]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Falar com Concierge no WhatsApp</span>
                  </motion.a>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
