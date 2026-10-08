import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface AnimatedWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export const AnimatedWords: React.FC<AnimatedWordsProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  highlightWords = [],
  highlightClassName = 'text-gold-gradient'
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: '110%',
      scale: 0.92,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: '0%',
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] ${className}`}
    >
      {words.map((word, i) => {
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
        const isHighlight = highlightWords.some(
          h => h.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden py-0.5 align-top">
            <motion.span
              variants={wordVariants}
              className={`inline-block will-change-transform origin-bottom-left ${wordClassName} ${
                isHighlight ? highlightClassName : ''
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};
