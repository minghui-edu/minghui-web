'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * 掛載時淡入 + 向上滑入。
 * 用於 Hero 區段的各個文字元素，依 delay 錯開時間產生 stagger 效果。
 */
export function FadeIn({
  children,
  delay = 0,
  y = 18,
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
