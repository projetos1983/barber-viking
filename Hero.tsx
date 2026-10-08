import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { Calendar, ArrowRight, Shield, Sparkles, ChevronDown } from 'lucide-react';
import { ScrollWordReveal } from './ScrollWordReveal';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress linked directly to container (0.0 to 1.0 across ~320vh - 350vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring smoothing for luxurious cinematic momentum (scrub)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 28,
    restDelta: 0.0001,
  });

  // =========================================================================
  // CAMERA TRANSFORMS ACROSS THE 8 CONTINUOUS SCENES
  // =========================================================================

  // CENA 1, 2, 3: IMAGE 1 (O Ofício Ancestral)
  // Escala inicial 1.15 -> 1.00 com aproximação, pan horizontal e vertical suave
  const img1Scale = useTransform(smoothProgress, [0, 0.35, 0.52], [1.15, 1.0, 0.94]);
  const img1X = useTransform(smoothProgress, [0, 0.35], ['0%', '-4%']);
  const img1Y = useTransform(smoothProgress, [0, 0.35], ['0%', '3%']);
  const img1Opacity = useTransform(smoothProgress, [0, 0.32, 0.48], [1, 1, 0]);
  const img1Blur = useTransform(smoothProgress, [0, 0.07], ['blur(6px)', 'blur(0px)']);

  // CENA 4, 5, 6: IMAGE 2 (O Ritual da Navalha & Toalha Quente)
  // Entra aos ~35%, escala 1.14 -> 1.00 com pan em sentido oposto para profundidade
  const img2Scale = useTransform(smoothProgress, [0.32, 0.52, 0.72], [1.15, 1.0, 0.95]);
  const img2X = useTransform(smoothProgress, [0.32, 0.7], ['4%', '-2.5%']);
  const img2Y = useTransform(smoothProgress, [0.32, 0.7], ['-2.5%', '2.5%']);
  const img2Opacity = useTransform(smoothProgress, [0.32, 0.42, 0.62, 0.75], [0, 1, 1, 0]);

  // CENA 7, 8: IMAGE 3 (A Presença & Postura Finalizada)
  // Entra aos ~68%, zoom suave 1.15 -> 1.01 com movimento lateral, dominando até o final
  const img3Scale = useTransform(smoothProgress, [0.65, 0.88, 1], [1.15, 1.02, 1.0]);
  const img3X = useTransform(smoothProgress, [0.65, 1], ['-3%', '0%']);
  const img3Y = useTransform(smoothProgress, [0.65, 1], ['2.5%', '0%']);
  const img3Opacity = useTransform(smoothProgress, [0.65, 0.76, 1], [0, 1, 1]);

  // NARRATIVE PARAGRAPHS & ACCESSORIES FADE/Y
  // Subtitle 1 (Scenes 1 & 2)
  const sub1Opacity = useTransform(smoothProgress, [0.04, 0.12, 0.22, 0.30], [0, 1, 1, 0]);
  const sub1Y = useTransform(smoothProgress, [0.04, 0.12, 0.22, 0.30], ['20px', '0px', '0px', '-25px']);

  // Subtitle 2 (Scenes 5 & 6)
  const sub2Opacity = useTransform(smoothProgress, [0.42, 0.48, 0.58, 0.66], [0, 1, 1, 0]);
  const sub2Y = useTransform(smoothProgress, [0.42, 0.48, 0.58, 0.66], ['25px', '0px', '0px', '-25px']);

  // Subtitle 3 & CTA (Scenes 7 & 8)
  const sub3Opacity = useTransform(smoothProgress, [0.74, 0.82, 1], [0, 1, 1]);
  const sub3Y = useTransform(smoothProgress, [0.74, 0.82, 1], ['25px', '0px', '0px']);

  // PARALLAX DEPTH LAYERS
  const bgGlowY = useTransform(smoothProgress, [0, 1], ['0%', '40%']);
  const runicLayerY = useTransform(smoothProgress, [0, 1], ['0%', '-50%']);
  const reticleY = useTransform(smoothProgress, [0, 1], ['0%', '15%']);

  // SCROLL ONBOARDING CUE FADE
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  // HUD TIMELINE TRACKER
  const hudProgressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const scene1LabelOpacity = useTransform(smoothProgress, [0, 0.32, 0.36], [1, 1, 0]);
  const scene2LabelOpacity = useTransform(smoothProgress, [0.32, 0.36, 0.68, 0.72], [0, 1, 1, 0]);
  const scene3LabelOpacity = useTransform(smoothProgress, [0.68, 0.72, 1], [0, 1, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[330vh] sm:h-[360vh] bg-[#07080a] text-white selection:bg-[#c5a059] selection:text-black"
    >
      {/* Pinned Viewport Screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Layer 1: Ambient Background Parallax Glow */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: bgGlowY }}
          className="absolute inset-0 pointer-events-none will-change-transform z-0"
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[1000px] h-[450px] sm:h-[700px] bg-[#c5a059]/[0.08] rounded-full blur-[160px] sm:blur-[220px]" />
          <div className="absolute bottom-10 left-10 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-neutral-900/60 rounded-full blur-[150px]" />
        </motion.div>

        {/* Layer 2: Floating Parallax Runic Accents */}
        {!shouldReduceMotion && (
          <motion.div
            style={{ y: runicLayerY }}
            className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 hidden md:block"
          >
            <div className="absolute top-28 right-[14%] text-[#c5a059]/15 font-mono text-3xl font-light">
              ᛏ
            </div>
            <div className="absolute top-1/2 left-[6%] text-[#c5a059]/10 font-mono text-2xl font-light">
              ✧
            </div>
            <div className="absolute bottom-32 right-[8%] text-[#c5a059]/15 font-mono text-2xl font-light">
              ᛟ
            </div>
          </motion.div>
        )}

        {/* Layer 3: Architectural Cinema HUD & Viewport Mask Framing */}
        <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
          
          {/* Top HUD Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse shrink-0" />
              <span className="text-white font-medium">VIKING BARBER · CINEMATIC SCROLL</span>
              <span className="text-neutral-600 hidden sm:inline">/</span>
              <span className="hidden sm:inline">JARDINS, SÃO PAULO</span>
            </div>

            <motion.div
              style={shouldReduceMotion ? {} : { y: reticleY }}
              className="flex items-center gap-4 text-neutral-500"
            >
              <span className="hidden md:inline">23°33'54"S 46°39'57"W</span>
              <span className="text-[#c5a059] font-medium hidden sm:inline">LENS 50mm T1.5 // ANAMORPHIC</span>
              <span className="text-neutral-400 bg-neutral-900/80 border border-white/10 px-2 py-0.5 rounded-sm">
                4K HDR
              </span>
            </motion.div>
          </div>

          {/* Corner Viewport Framing Reticles */}
          <div className="relative w-full h-full pointer-events-none">
            <span className="absolute top-2 left-2 text-white/20 font-mono text-xs select-none">┌</span>
            <span className="absolute top-2 right-2 text-white/20 font-mono text-xs select-none">┐</span>
            <span className="absolute bottom-2 left-2 text-white/20 font-mono text-xs select-none">└</span>
            <span className="absolute bottom-2 right-2 text-white/20 font-mono text-xs select-none">┘</span>
          </div>

          {/* Bottom HUD Timeline & Scene Tracker */}
          <div className="border-t border-white/[0.08] pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-3 sm:gap-6 tracking-widest uppercase">
              <div className="relative h-4 w-44 sm:w-48 overflow-hidden">
                <motion.span style={{ opacity: scene1LabelOpacity }} className="absolute inset-0 text-[#c5a059] font-semibold truncate">
                  CENA 01 // O OFÍCIO
                </motion.span>
                <motion.span style={{ opacity: scene2LabelOpacity }} className="absolute inset-0 text-[#c5a059] font-semibold truncate">
                  CENA 02 // O RITUAL
                </motion.span>
                <motion.span style={{ opacity: scene3LabelOpacity }} className="absolute inset-0 text-[#c5a059] font-semibold truncate">
                  CENA 03 // A PRESENÇA
                </motion.span>
              </div>
              <span className="text-neutral-600 hidden sm:inline">·</span>
              <span className="hidden sm:inline">OFÍCIO ANCESTRAL & POSTURA MODERNA</span>
            </div>

            {/* Scrub Progress Bar Indicator */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-[10px] text-neutral-500">PROCESSO</span>
              <div className="w-24 sm:w-36 h-[2px] bg-neutral-800 rounded-full overflow-hidden relative">
                <motion.div
                  style={{ width: hudProgressWidth }}
                  className="h-full bg-gradient-to-r from-[#dfc282] to-[#c5a059]"
                />
              </div>
              <span className="text-neutral-400">2026 ED.</span>
            </div>
          </div>
        </div>

        {/* Layer 4: Cinematic Main Camera Visual Centerpiece */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-8 lg:p-12">
          <div className="relative w-full h-full max-w-7xl max-h-[85vh] rounded-sm overflow-hidden border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-neutral-950">
            
            {/* Cinematic Image 1: The Master Barber Craft (Scenes 1, 2, 3) */}
            <motion.div
              style={
                shouldReduceMotion
                  ? { opacity: img1Opacity }
                  : {
                      scale: img1Scale,
                      x: img1X,
                      y: img1Y,
                      opacity: img1Opacity,
                      filter: img1Blur,
                    }
              }
              className="absolute inset-0 will-change-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1800&q=85"
                alt="Mestre Barbeiro em atendimento clássico na Viking Barber"
                className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-115 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />
            </motion.div>

            {/* Cinematic Image 2: The Hot Towel & Razor Ritual (Scenes 4, 5, 6) */}
            <motion.div
              style={
                shouldReduceMotion
                  ? { opacity: img2Opacity }
                  : {
                      scale: img2Scale,
                      x: img2X,
                      y: img2Y,
                      opacity: img2Opacity,
                    }
              }
              className="absolute inset-0 will-change-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1800&q=85"
                alt="Ritual de barboterapia clássica com toalha aquecida e navalha cirúrgica"
                className="w-full h-full object-cover object-center filter contrast-120 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />
            </motion.div>

            {/* Cinematic Image 3: The Confident Masterpiece Finish (Scenes 7, 8) */}
            <motion.div
              style={
                shouldReduceMotion
                  ? { opacity: img3Opacity }
                  : {
                      scale: img3Scale,
                      x: img3X,
                      y: img3Y,
                      opacity: img3Opacity,
                    }
              }
              className="absolute inset-0 will-change-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1800&q=85"
                alt="Postura impecável e acabamento visagista finalizado na bancada Viking"
                className="w-full h-full object-cover object-center filter contrast-115 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />
            </motion.div>

            {/* Subtle Vignette Frame Overlay */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] pointer-events-none" />

            {/* Live Camera Stamp Tag */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 font-mono text-[9px] sm:text-[10px] tracking-widest text-[#c5a059] bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10 uppercase z-20">
              REC ● LIVE PERSPECTIVE
            </div>

            {/* ========================================================
                TEXT NARRATIVE STAGES WITH WORD-BY-WORD HORIZON MASKING
               ======================================================== */}

            {/* STAGE 1: CENA 1 & 2 (0% a ~35%) - O OFÍCIO */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-12 lg:p-16 max-w-3xl pointer-events-none">
              {/* Scene Badge */}
              <motion.div
                style={{ opacity: sub1Opacity, y: sub1Y }}
                className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a059] mb-3 sm:mb-4"
              >
                <span className="text-neutral-400 font-mono">[ CENA 01 // O OFÍCIO ]</span>
                <span>Barbearia Clássica de Alto Padrão</span>
              </motion.div>

              {/* Title 1: Scroll-Linked Word-by-Word Masked Reveal */}
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.04] sm:leading-[0.98] mb-4 sm:mb-6">
                <ScrollWordReveal
                  text="ESTILO NÃO SE CORTA. SE CONSTRÓI."
                  progress={smoothProgress}
                  inStart={0.0}
                  inEnd={0.16}
                  outStart={0.24}
                  outEnd={0.34}
                  highlightWords={['CONSTRÓI.', 'SE']}
                />
              </h1>

              {/* Small Complementary Subtitle */}
              <motion.p
                style={{ opacity: sub1Opacity, y: sub1Y }}
                className="text-xs sm:text-base lg:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl mb-6"
              >
                Barbearia clássica para homens que valorizam presença, estilo e personalidade.
              </motion.p>

              {/* Live Availability Status Pill */}
              <motion.div
                style={{ opacity: sub1Opacity, y: sub1Y }}
                className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-300 font-mono bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-sm w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[#c5a059] font-medium">Bancada Jardins:</span>
                <span className="text-neutral-300">Horários abertos para hoje · Confirmação em 2 min</span>
              </motion.div>
            </div>

            {/* STAGE 2: CENA 4, 5 & 6 (~35% a ~68%) - O RITUAL */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-12 lg:p-16 max-w-3xl pointer-events-none">
              {/* Scene Badge */}
              <motion.div
                style={{ opacity: sub2Opacity, y: sub2Y }}
                className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a059] mb-3 sm:mb-4"
              >
                <span className="text-neutral-400 font-mono">[ CENA 02 // O RITUAL ANCESTRAL ]</span>
                <span>Alinhamento & Navalha Livre</span>
              </motion.div>

              {/* Title 2: Scroll-Linked Word-by-Word Masked Reveal */}
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.04] sm:leading-[0.98] mb-4 sm:mb-6">
                <ScrollWordReveal
                  text="A PRECISÃO DA LÂMINA LIVRE."
                  progress={smoothProgress}
                  inStart={0.36}
                  inEnd={0.48}
                  outStart={0.60}
                  outEnd={0.70}
                  highlightWords={['LÂMINA', 'LIVRE.']}
                />
              </h2>

              {/* Narrative Subtitle */}
              <motion.p
                style={{ opacity: sub2Opacity, y: sub2Y }}
                className="text-xs sm:text-base lg:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl mb-6"
              >
                Toalha quente vaporizada em eucalipto, espuma cremosa e o tempo que desacelera para restabelecer sua postura com conforto absoluto.
              </motion.p>

              {/* Pillars Box */}
              <motion.div
                style={{ opacity: sub2Opacity, y: sub2Y }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md text-xs font-mono text-neutral-300"
              >
                <div className="p-2.5 bg-black/60 backdrop-blur-md rounded-sm border border-white/10 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span>Aço Alemão 100% Esterilizado</span>
                </div>
                <div className="p-2.5 bg-black/60 backdrop-blur-md rounded-sm border border-white/10 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span>Visagismo Facial Sob Medida</span>
                </div>
              </motion.div>
            </div>

            {/* STAGE 3: CENA 7 & 8 (~70% a 100%) - A PRESENÇA FINAL & CTA */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-12 lg:p-16 max-w-3xl pointer-events-none">
              {/* Scene Badge */}
              <motion.div
                style={{ opacity: sub3Opacity, y: sub3Y }}
                className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a059] mb-3 sm:mb-4"
              >
                <span className="text-neutral-400 font-mono">[ CENA 03 // A PRESENÇA FINAL ]</span>
                <span>O Padrão Que Marca Território</span>
              </motion.div>

              {/* Title 3: Scroll-Linked Word-by-Word Masked Reveal */}
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.04] sm:leading-[0.98] mb-4 sm:mb-6">
                <ScrollWordReveal
                  text="SUA IMAGEM É A SUA MAIOR ASSINATURA."
                  progress={smoothProgress}
                  inStart={0.72}
                  inEnd={0.84}
                  highlightWords={['MAIOR', 'ASSINATURA.']}
                />
              </h2>

              {/* Subtitle */}
              <motion.p
                style={{ opacity: sub3Opacity, y: sub3Y }}
                className="text-xs sm:text-base lg:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl mb-6 sm:mb-8"
              >
                Corte estruturado no visagismo anatômico. Alinhamento milimétrico que dura muito além da cadeira da barbearia.
              </motion.p>

              {/* CTAs with Microinteractions */}
              <motion.div
                style={{ opacity: sub3Opacity, y: sub3Y }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-5 pointer-events-auto"
              >
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.025, y: -1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  onClick={onOpenBooking}
                  className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm bg-gradient-to-r from-[#dfc282] via-[#c5a059] to-[#a6823b] text-neutral-950 font-bold text-xs tracking-[0.14em] uppercase shadow-[0_0_35px_rgba(197,160,89,0.35)] hover:shadow-[0_0_55px_rgba(197,160,89,0.6)] transition-all cursor-pointer min-h-[48px] overflow-hidden"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                  <Calendar className="w-4 h-4 text-neutral-950 transition-transform group-hover:scale-110 shrink-0" />
                  <span className="relative z-10">AGENDAR HORÁRIO</span>
                </motion.button>

                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  onClick={onExploreServices}
                  className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm bg-black/70 backdrop-blur-md border border-white/20 hover:border-[#c5a059] text-white font-medium text-xs tracking-[0.14em] uppercase hover:bg-neutral-800/80 transition-all group cursor-pointer min-h-[48px]"
                >
                  <span>CONHECER SERVIÇOS</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c5a059] transition-transform group-hover:translate-x-1.5 shrink-0" />
                </motion.button>
              </motion.div>

              {/* Reassurance pills */}
              <motion.div
                style={{ opacity: sub3Opacity }}
                className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] sm:text-[11px] text-neutral-400 font-mono"
              >
                <span className="flex items-center gap-1">
                  <span className="text-[#c5a059]">✓</span> Valet gratuito no local
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#c5a059]">✓</span> Chopp artesanal incluso
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#c5a059]">✓</span> Sem pagamento prévio
                </span>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Initial Scroll Cue (Fades out smoothly during the first 8% of scrolling) */}
        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1.5 text-center"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#c5a059] animate-pulse">
            ROLE PARA CONTROLAR A CÂMERA
          </span>
          <ChevronDown className="w-4 h-4 text-neutral-400 animate-bounce" />
        </motion.div>

        {/* Scene 8: Seamless Bottom Vignette Gradient into rest of page */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none z-30" />

      </div>
    </section>
  );
};
