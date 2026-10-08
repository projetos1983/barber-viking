import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

interface ScrollWordRevealProps {
  text: string;
  progress: MotionValue<number>;
  inStart: number;
  inEnd: number;
  outStart?: number;
  outEnd?: number;
  highlightWords?: string[];
  className?: string;
  wordClassName?: string;
}

export const ScrollWordReveal: React.FC<ScrollWordRevealProps> = ({
  text,
  progress,
  inStart,
  inEnd,
  outStart = 1,
  outEnd = 1.05,
  highlightWords = [],
  className = '',
  wordClassName = '',
}) => {
  const words = text.split(' ');
  const total = Math.max(words.length, 1);

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.08em] ${className}`}>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
        const isHighlight = highlightWords.some(
          h => h.toLowerCase() === cleanWord.toLowerCase()
        );

        // Stagger in windows
        const wordInStart = inStart + (i / total) * (inEnd - inStart) * 0.65;
        const wordInEnd = wordInStart + (inEnd - inStart) * 0.45;

        // Stagger out windows
        const hasOut = outStart < 1;
        const wordOutStart = outStart + (i / total) * (outEnd - outStart) * 0.6;
        const wordOutEnd = wordOutStart + (outEnd - outStart) * 0.45;

        // Smooth scroll scrub transforms with explicit clamp
        const y = useTransform(
          progress,
          hasOut
            ? [wordInStart, wordInEnd, wordOutStart, wordOutEnd]
            : [wordInStart, wordInEnd],
          hasOut
            ? ['110%', '0%', '0%', '-110%']
            : ['110%', '0%'],
          { clamp: true }
        );

        const opacity = useTransform(
          progress,
          hasOut
            ? [wordInStart, wordInEnd, wordOutStart, wordOutEnd]
            : [wordInStart, wordInEnd],
          hasOut
            ? [0, 1, 1, 0]
            : [0, 1],
          { clamp: true }
        );

        const filter = useTransform(
          progress,
          hasOut
            ? [wordInStart, wordInEnd, wordOutStart, wordOutEnd]
            : [wordInStart, wordInEnd],
          hasOut
            ? ['blur(5px)', 'blur(0px)', 'blur(0px)', 'blur(5px)']
            : ['blur(5px)', 'blur(0px)'],
          { clamp: true }
        );

        const scale = useTransform(
          progress,
          hasOut
            ? [wordInStart, wordInEnd, wordOutStart, wordOutEnd]
            : [wordInStart, wordInEnd],
          hasOut
            ? [0.92, 1, 1, 0.95]
            : [0.92, 1],
          { clamp: true }
        );

        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden py-0.5 align-top">
            <motion.span
              style={{ y, opacity, filter, scale }}
              className={`inline-block will-change-transform origin-bottom-left ${wordClassName} ${
                isHighlight
                  ? 'text-gold-gradient drop-shadow-[0_4px_30px_rgba(197,160,89,0.4)]'
                  : 'text-white'
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};
