import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { products } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section id="shop" className="py-12 sm:py-16 lg:py-20 bg-off-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-playfair text-xl sm:text-2xl lg:text-3xl tracking-[0.08em] sm:tracking-[0.1em] text-dark-text mb-3 sm:mb-4">
            TRANSEASONAL
          </h2>
          <p className="text-sm sm:text-base text-medium-text max-w-2xl mx-auto px-4">
            Discover our curated collection of timeless sarees, crafted with
            traditional techniques and contemporary elegance.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
          {displayedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <a href="#shop" className="border border-[var(--dark-text)] bg-transparent text-[var(--dark-text)] px-6 sm:px-10 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] transition-all duration-300 hover:bg-[var(--dark-text)] hover:text-[var(--off-white)] inline-block">
            VIEW ALL PRODUCTS
          </a>
        </motion.div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-muted-taupe disabled:opacity-50 disabled:cursor-not-allowed hover:bg-deep-rose hover:border-deep-rose hover:text-white transition-all"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm transition-all ${currentPage === page
                  ? "bg-dark-text text-white"
                  : "border border-muted-taupe hover:bg-deep-rose hover:border-deep-rose hover:text-white"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-muted-taupe disabled:opacity-50 disabled:cursor-not-allowed hover:bg-deep-rose hover:border-deep-rose hover:text-white transition-all"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
