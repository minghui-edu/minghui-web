'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Hero 背景視差層。
 * 包住所有 absolute 背景元素，讓它們以較慢速度滾動，產生深度感。
 * speed: 背景移動速度相對於正常滾動的比例（0.35 = 背景以 35% 速度移動）
 */
export function ParallaxBg({ children, speed = 0.35 }: { children: React.ReactNode; speed?: number }) {
  const shouldReduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, shouldReduce ? 0 : 700 * speed]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ y }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
