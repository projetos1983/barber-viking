import React, { useState, useEffect } from 'react';
import { Calendar, MessageSquare, Clock } from 'lucide-react';
import { BARBERSHOP_INFO } from '../data/barberData';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past the initial hero section (~350px)
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside aria-label="Ações rápidas de agendamento" className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#08090b]/95 backdrop-blur-lg border-t border-[#c5a059]/30 p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.85)] animate-in fade-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* WhatsApp Quick Icon */}
        <a
          href={`https://wa.me/${BARBERSHOP_INFO.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20verificar%20os%20hor%C3%A1rios%20dispon%C3%ADveis%20para%20hoje%20na%20Viking%20Barber.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-sm bg-[#17181d] border border-white/10 hover:border-[#c5a059] flex items-center justify-center text-white shrink-0 active:scale-95 transition-all"
          aria-label="Agendar via WhatsApp"
        >
          <MessageSquare className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
        </a>

        {/* Main Sticky Booking Trigger */}
        <button
          onClick={onOpenBooking}
          className="flex-1 h-12 px-4 rounded-sm bg-gradient-to-r from-[#dfc282] via-[#c5a059] to-[#a6823b] text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-between shadow-[0_0_20px_rgba(197,160,89,0.3)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-950 shrink-0" />
            <span className="font-heading font-extrabold text-[11px] sm:text-xs">AGENDAR HORÁRIO</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-900 bg-black/10 px-2 py-0.5 rounded font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
            <span>Vagas Hoje</span>
          </div>
        </button>

      </div>
    </aside>
  );
};
