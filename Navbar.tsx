import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Scissors, Menu, X, Calendar, Phone, Clock, MapPin, HardDrive, ArrowRight, Download } from 'lucide-react';
import { BARBERSHOP_INFO } from '../data/barberData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenDrive: () => void;
  onOpenDownload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenDrive, onOpenDownload }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Sobre', href: '#sobre', index: '01' },
    { label: 'Serviços', href: '#servicos', index: '02' },
    { label: 'Experiência', href: '#experiencia', index: '03' },
    { label: 'Galeria', href: '#galeria', index: '04' },
    { label: 'Depoimentos', href: '#depoimentos', index: '05' },
    { label: 'FAQ', href: '#faq', index: '06' },
    { label: 'Contato', href: '#contato', index: '07' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#0e1014] border-b border-white/5 text-xs text-neutral-400 py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              {BARBERSHOP_INFO.hoursWeekday}
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
              Jardins, São Paulo
            </span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => onOpenDownload ? onOpenDownload() : window.open('/viking-barber.zip', '_blank')}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-[#c5a059] transition-colors cursor-pointer"
              title="Baixar código fonte completo em arquivo ZIP"
            >
              <Download className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Baixar ZIP</span>
            </button>
            <span className="text-neutral-600">|</span>
            <button
              onClick={onOpenDrive}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-[#c5a059] transition-colors cursor-pointer"
            >
              <HardDrive className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Viking Drive (Área VIP)</span>
            </button>
            <span className="text-neutral-600">|</span>
            <a 
              href={`https://wa.me/${BARBERSHOP_INFO.whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#c5a059] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
              {BARBERSHOP_INFO.whatsappDisplay}
            </a>
            <span className="text-neutral-600">|</span>
            <span className="text-[#c5a059] tracking-wider font-medium text-[11px] uppercase">
              Chopp gelado cortesia
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-400 ${
          isScrolled 
            ? 'bg-[#08090b]/95 backdrop-blur-md shadow-2xl py-2.5 sm:py-3 border-b border-white/[0.08]' 
            : 'bg-[#08090b]/75 backdrop-blur-sm py-3.5 sm:py-4 border-b border-white/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Logo with micro-interaction */}
          <motion.a 
            href="#" 
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-br from-[#1c1e24] to-[#121316] border border-[#c5a059]/40 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-[#c5a059] shrink-0">
              <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a059] transition-transform duration-500 group-hover:rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-2xl font-bold tracking-[0.16em] sm:tracking-[0.18em] text-white uppercase group-hover:text-[#c5a059] transition-colors leading-none">
                VIKING BARBER
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-sans mt-0.5 sm:mt-1">
                Atelier Masculino
              </span>
            </div>
          </motion.a>

          {/* Desktop Links with Smooth Expanding Underline */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs xl:text-sm font-medium text-neutral-300 hover:text-[#c5a059] tracking-wider transition-colors uppercase relative py-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c5a059] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-2.5 sm:gap-3">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={onOpenDrive}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm bg-neutral-900 border border-white/10 hover:border-[#c5a059]/50 text-neutral-300 hover:text-white font-medium text-xs tracking-wider uppercase transition-all cursor-pointer"
              title="Acessar seus comprovantes no Google Drive"
            >
              <HardDrive className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Drive VIP</span>
            </motion.button>

            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              onClick={onOpenBooking}
              className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-sm bg-gradient-to-r from-[#dfc282] via-[#c5a059] to-[#a6823b] text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(197,160,89,0.35)] hover:shadow-[0_0_35px_rgba(197,160,89,0.55)] transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-neutral-950" />
              <span>AGENDAR</span>
            </motion.button>
          </div>

          {/* Mobile Right Controls: Fast Call + Animated Burger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-2 rounded-sm bg-gradient-to-r from-[#dfc282] to-[#c5a059] text-neutral-950 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-200 hover:text-white rounded bg-neutral-900/60 border border-white/10 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#c5a059]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Fullscreen Animated Drawer with Staggered Links */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 top-[60px] bottom-0 z-50 bg-[#08090b]/98 backdrop-blur-2xl border-t border-white/10 px-6 py-6 overflow-y-auto flex flex-col justify-between"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] tracking-widest text-[#c5a059] uppercase mb-2">
                  Navegação Principal
                </span>

                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={shouldReduceMotion ? { opacity: 1 } : { x: -25, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-heading font-semibold text-neutral-100 hover:text-[#c5a059] tracking-wider py-3 border-b border-white/5 uppercase flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#c5a059]">{link.index}</span>
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-600" />
                  </motion.a>
                ))}
              </div>

              {/* Mobile Actions Container */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-3"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm bg-gradient-to-r from-[#dfc282] to-[#c5a059] text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  AGENDAR HORÁRIO AGORA
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDrive();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-[#121316] border border-white/15 text-neutral-200 font-semibold text-xs tracking-wider uppercase"
                >
                  <HardDrive className="w-4 h-4 text-[#c5a059]" />
                  Viking Drive (Comprovantes & VIP)
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenDownload) {
                      onOpenDownload();
                    } else {
                      window.open('/viking-barber.zip', '_blank');
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-neutral-900 border border-[#c5a059]/40 text-[#c5a059] hover:text-white font-semibold text-xs tracking-wider uppercase cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Baixar Código Fonte (ZIP)
                </button>

                <div className="pt-2 text-center text-xs text-neutral-400 space-y-1">
                  <p>Jardins · Av. dos Vikings, 1080</p>
                  <a
                    href={`https://wa.me/${BARBERSHOP_INFO.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c5a059] hover:underline font-mono"
                  >
                    WhatsApp: {BARBERSHOP_INFO.whatsappDisplay}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
