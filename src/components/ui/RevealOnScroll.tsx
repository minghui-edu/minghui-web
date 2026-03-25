'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * 元素進入視窗時淡入 + 向上滑入，只觸發一次。
 * 用於頁面中段以下的 section 內容（非 Hero）。
 */
export function RevealOnScroll({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
