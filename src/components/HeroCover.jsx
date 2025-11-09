import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroCover() {
  return (
    <section className="relative h-[50vh] min-h-[340px] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlay to improve text contrast without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

      <div className="relative mx-auto flex h-full max-w-6xl items-end px-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-white"
        >
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Hibi No ToDo's
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
            A clean, minimalist to‑do app for focused days. Add, prioritize, and
            complete tasks with ease.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
