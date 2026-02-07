import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { products } from "@/data/products";

export function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);

  return (
    <section id="new-arrivals" className="py-12 sm:py-16 lg:py-20 bg-off-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8 sm:mb-12"
        >
          <h2 className="font-playfair text-xl sm:text-2xl lg:text-3xl tracking-[0.08em] sm:tracking-[0.1em] text-dark-text">
            NEW ARRIVALS
          </h2>

          {/* Navigation Arrows */}
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-muted-taupe flex items-center justify-center hover:bg-deep-rose hover:border-deep-rose hover:text-white transition-all"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-muted-taupe flex items-center justify-center hover:bg-deep-rose hover:border-deep-rose hover:text-white transition-all"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {newArrivals.map((product, index) => (
            <div
              key={product.id}
              className="flex-none w-[240px] sm:w-[280px] lg:w-[300px] snap-start"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
