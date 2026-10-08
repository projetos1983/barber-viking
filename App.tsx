/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ServicesSection } from './components/ServicesSection';
import { Experience } from './components/Experience';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { LocationCard } from './components/LocationCard';
import { CtaSection } from './components/CtaSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { DriveModal } from './components/DriveModal';
import { DownloadModal } from './components/DownloadModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { StickyMobileBar } from './components/StickyMobileBar';
import { SectionDivider } from './components/SectionDivider';
import { ServiceItem } from './data/barberData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDriveOpen, setIsDriveOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenBooking = (service?: ServiceItem) => {
    setSelectedService(service || null);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(null);
  };

  const scrollToServices = () => {
    const el = document.getElementById('servicos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090b] text-[#e2e4e9] flex flex-col font-sans selection:bg-[#c5a059] selection:text-black relative bg-noise">
      {/* Scroll Progress Indicator (Premium Agency Touch) */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#c5a059] via-[#ecd599] to-[#c5a059] origin-left z-50 pointer-events-none shadow-[0_0_10px_rgba(197,160,89,0.6)]"
      />

      {/* Navigation */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenDrive={() => setIsDriveOpen(true)}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* Main Content Sections with Architectural Transitions */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onOpenBooking={() => handleOpenBooking()} 
          onExploreServices={scrollToServices} 
        />

        {/* Transition: Hero -> About */}
        <SectionDivider label="MANUAL DE OFÍCIO" badge="02" />

        {/* 1. Sobre a Barbearia */}
        <About onOpenBooking={() => handleOpenBooking()} />

        {/* Transition: About -> Services */}
        <SectionDivider label="RITUAIS DE BANCADA" badge="03" />

        {/* 2. Serviços */}
        <ServicesSection onSelectServiceToBook={(s) => handleOpenBooking(s)} />

        {/* Transition: Services -> Experience */}
        <SectionDivider label="HOSPITALIDADE & SENSORIA" badge="04" />

        {/* 3. Experiência */}
        <Experience onOpenBooking={() => handleOpenBooking()} />

        {/* Transition: Experience -> Gallery */}
        <SectionDivider label="PORTFÓLIO VISUAL" badge="05" />

        {/* 4. Galeria */}
        <Gallery />

        {/* Transition: Gallery -> Testimonials */}
        <SectionDivider label="CRÍTICA & CLIENTELA" badge="06" />

        {/* 5. Depoimentos */}
        <Testimonials />

        {/* Transition: Testimonials -> Location */}
        <SectionDivider label="ACESSO VIP JARDINS" badge="07" />

        {/* Localização & Acesso com Manobrista (CRO Booster) */}
        <LocationCard />

        {/* Transition: Location -> CTA */}
        <SectionDivider label="RESERVA EXCLUSIVA" badge="08" />

        {/* 6. CTA de Agendamento */}
        <CtaSection onOpenBooking={() => handleOpenBooking()} />

        {/* Transition: CTA -> FAQ */}
        <SectionDivider label="DÚVIDAS & REGRAS" badge="09" />

        {/* 7. FAQ */}
        <FaqSection />
      </main>

      {/* 8. Rodapé */}
      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />

      {/* Interactive Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
        initialService={selectedService} 
        onOpenDrive={() => setIsDriveOpen(true)}
      />

      {/* Google Drive Workspace Sync Modal */}
      <DriveModal
        isOpen={isDriveOpen}
        onClose={() => setIsDriveOpen(false)}
      />

      {/* Source Code Download Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Sticky Mobile Conversion Bar */}
      <StickyMobileBar onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
