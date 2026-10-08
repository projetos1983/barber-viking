import React from 'react';
import { MessageSquare } from 'lucide-react';
import { BARBERSHOP_INFO } from '../data/barberData';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${BARBERSHOP_INFO.whatsappNumber}?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Viking%20Barber%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20ou%20agendar%20um%20hor%C3%A1rio.`;

  return (
    <aside aria-label="Atendimento via WhatsApp" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp da Viking Barber"
        className="group relative flex items-center gap-2.5 sm:gap-3 bg-[#17181d] hover:bg-[#1f2127] text-white border border-[#c5a059]/40 hover:border-[#c5a059] p-3 sm:px-4 sm:py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-black shrink-0 shadow-md">
          <MessageSquare className="w-4 h-4 fill-white text-white" />
        </div>
        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[10px] text-[#c5a059] uppercase tracking-wider font-semibold">
            Recepção Online
          </span>
          <span className="text-xs text-white font-medium">
            Agendar no WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
};
