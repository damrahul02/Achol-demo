import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-[500px] sm:h-[600px] md:h-[calc(100vh-116px)] md:min-h-[600px] overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0">
        <img
          src="/products/hero-blue-saree.jpg"
          alt="Alisha Anchal Collection"
          className="w-full h-full object-cover object-[center_30%] ken-burns"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        {/* Collection Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4"
        >
          NEW COLLECTION 2026
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-[0.08em] sm:tracking-[0.1em] mb-6 sm:mb-8 max-w-4xl"
        >
          ELEGANCE REDEFINED
        </motion.h1>

        {/* CTA Button */}
        <motion.a
          href="#shop"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-[var(--off-white)] text-[var(--dark-text)] px-6 sm:px-10 py-3 sm:py-4 text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[var(--deep-rose)] hover:text-[var(--off-white)]"
        >
          SHOP NOW
        </motion.a>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
