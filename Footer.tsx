import React from 'react';
import { Scissors, MapPin, Phone, Instagram, Clock, Mail, ArrowUp } from 'lucide-react';
import { BARBERSHOP_INFO } from '../data/barberData';

interface FooterProps {
  onOpenDownload?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contato" className="bg-[#050608] border-t border-white/10 pt-14 sm:pt-20 pb-8 sm:pb-12 text-neutral-400 relative overflow-hidden">
      
      {/* Background Architectural Brand Watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.025] font-heading text-[70px] sm:text-[180px] lg:text-[280px] font-extrabold text-white whitespace-nowrap leading-none tracking-tighter">
        VIKING BARBER
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 pb-12 sm:pb-16 border-b border-white/[0.08]">
          
          {/* Brand info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-neutral-900 border border-[#c5a059]/40 flex items-center justify-center shrink-0">
                <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a059]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-[0.18em] sm:tracking-[0.2em] text-white uppercase leading-none">
                  VIKING BARBER
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] font-mono text-[#c5a059] uppercase mt-0.5">
                  Atelier de Imagem Masculina
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 sm:mb-8 max-w-sm font-light">
              Desde 2012 resgatando a maestria do corte com tesoura, a precisão da navalha e a hospitalidade reservada dos clubes clássicos.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-sm bg-neutral-900/90 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#c5a059] hover:border-[#c5a059]/50 transition-all"
                aria-label="Instagram da Viking Barber"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${BARBERSHOP_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-sm bg-neutral-900/90 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#c5a059] hover:border-[#c5a059]/50 transition-all"
                aria-label="WhatsApp da Viking Barber"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${BARBERSHOP_INFO.email}`}
                className="w-11 h-11 rounded-sm bg-neutral-900/90 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#c5a059] hover:border-[#c5a059]/50 transition-all"
                aria-label="E-mail da Viking Barber"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Horários de Funcionamento */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] mb-4 sm:mb-6 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Horários da Bancada</span>
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-neutral-300">
              <li className="flex flex-col">
                <span className="text-neutral-500 font-mono text-xs">Terça a Sexta-feira</span>
                <span className="font-medium text-white">09:00 às 20:00</span>
              </li>
              <li className="flex flex-col">
                <span className="text-neutral-500 font-mono text-xs">Sábado</span>
                <span className="font-medium text-white">08:30 às 19:00</span>
              </li>
              <li className="flex flex-col text-neutral-500 pt-1 border-t border-white/5">
                <span className="font-mono text-[10px] sm:text-[11px]">Domingo e Segunda</span>
                <span>Recarga & Afiação das Lâminas</span>
              </li>
            </ul>
          </div>

          {/* Localização & Contato */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] mb-4 sm:mb-6 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Localização Jardins</span>
            </h4>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-neutral-300">
              <p className="leading-relaxed font-light">
                {BARBERSHOP_INFO.address}
              </p>
              <div className="pt-1 sm:pt-2 flex flex-col gap-2 font-mono text-xs">
                <a href={`tel:${BARBERSHOP_INFO.phone.replace(/\D/g,'')}`} className="hover:text-white transition-colors flex items-center gap-2 py-1">
                  <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{BARBERSHOP_INFO.phone}</span>
                </a>
                <a href={`https://wa.me/${BARBERSHOP_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 py-1">
                  <span className="text-[#c5a059]">WA:</span>
                  <span>{BARBERSHOP_INFO.whatsappDisplay}</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 py-1">
                  <Instagram className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{BARBERSHOP_INFO.instagram}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick links & Back to top */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a059] mb-4 sm:mb-6">
                Índice
              </h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs font-mono">
                <li><a href="#sobre" className="hover:text-white transition-colors py-0.5 block">/ 01 SOBRE</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors py-0.5 block">/ 02 SERVIÇOS</a></li>
                <li><a href="#experiencia" className="hover:text-white transition-colors py-0.5 block">/ 03 EXPERIÊNCIA</a></li>
                <li><a href="#galeria" className="hover:text-white transition-colors py-0.5 block">/ 04 GALERIA</a></li>
                <li><a href="#depoimentos" className="hover:text-white transition-colors py-0.5 block">/ 05 REPUTAÇÃO</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors py-0.5 block">/ 06 FAQ</a></li>
              </ul>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>TOPO DO ATELIER</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-neutral-500 font-mono text-center sm:text-left">
          <p>© {new Date().getFullYear()} Viking Barber Atelier. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenDownload ? onOpenDownload() : window.open('/viking-barber.zip', '_blank')}
              className="text-[#c5a059] hover:text-[#ecd599] transition-colors underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Baixar Projeto (ZIP)</span>
            </button>
            <span>·</span>
            <span>Privacidade & Termos</span>
            <span>·</span>
            <span className="text-neutral-400">Estilo não se corta. Se constrói.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
