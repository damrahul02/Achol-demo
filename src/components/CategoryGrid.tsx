import { motion } from "framer-motion";
import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <section id="collections" className="py-12 sm:py-16 lg:py-20 bg-off-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-playfair text-xl sm:text-2xl lg:text-3xl tracking-[0.1em] sm:tracking-[0.15em] text-dark-text text-center mb-8 sm:mb-12"
        >
          DISCOVER
        </motion.h2>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="category-card relative h-[280px] sm:h-[400px] lg:h-[500px] overflow-hidden group"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-sm sm:text-base lg:text-lg uppercase tracking-[0.1em] sm:tracking-[0.15em] mb-0.5 sm:mb-1">
                  {category.name}
                </h3>
                <span className="font-bengali text-xs sm:text-sm opacity-80">
                  {category.nameBn}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
