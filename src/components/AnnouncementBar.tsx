import { motion } from "framer-motion";

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-blush h-8 sm:h-9 flex items-center overflow-hidden"
    >
      <div className="marquee whitespace-nowrap flex">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-dark-text mx-4 sm:mx-8"
          >
            JUST LANDED • NEW COLLECTION 2026 • FREE SHIPPING ON ORDERS OVER ৳5000
          </span>
        ))}
      </div>
    </motion.div>
  );
}
