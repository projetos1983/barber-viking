import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SectionDividerProps {
  label?: string;
  badge?: string;
  variant?: 'line' | 'diamond' | 'gradient';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  badge,
  variant = 'line',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full py-4 overflow-hidden pointer-events-none select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Animated Expanding Hairline Left */}
        <motion.div
          initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-[1px] flex-1 origin-left bg-gradient-to-r from-transparent via-[#c5a059]/30 to-[#c5a059]/60"
        />

        {/* Center Decorative Anchor */}
        <motion.div
          initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-3 shrink-0"
        >
          <span className="w-1.5 h-1.5 rotate-45 border border-[#c5a059] bg-neutral-900" />
          {label && (
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              {label}
            </span>
          )}
          {badge && (
            <span className="font-mono text-[9px] text-[#c5a059] border border-[#c5a059]/30 px-1.5 py-0.5 rounded-sm">
              {badge}
            </span>
          )}
          <span className="w-1.5 h-1.5 rotate-45 border border-[#c5a059] bg-neutral-900" />
        </motion.div>

        {/* Animated Expanding Hairline Right */}
        <motion.div
          initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-[1px] flex-1 origin-right bg-gradient-to-l from-transparent via-[#c5a059]/30 to-[#c5a059]/60"
        />

      </div>
    </div>
  );
};
