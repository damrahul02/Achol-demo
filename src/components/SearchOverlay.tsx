import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { products } from "@/data/products";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("BDT", "৳");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-off-white/98 z-50"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:text-deep-rose transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Search Content */}
          <div className="h-full flex flex-col pt-20 pb-10 px-4 sm:px-6 lg:px-20">
            {/* Search Input */}
            <div className="max-w-3xl mx-auto w-full mb-12">
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-taupe" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent border-b-2 border-dark-text py-4 pl-10 pr-4 text-2xl sm:text-4xl font-playfair placeholder:text-muted-taupe focus:outline-none focus:border-deep-rose transition-colors"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
              {searchQuery && (
                <>
                  <p className="text-sm text-light-text mb-6">
                    {filteredProducts.length} results for "{searchQuery}"
                  </p>

                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                        <a
                          key={product.id}
                          href={`#product-${product.id}`}
                          onClick={onClose}
                          className="group"
                        >
                          <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <h3 className="text-sm uppercase tracking-wide text-dark-text group-hover:text-deep-rose transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-medium-text">
                            {formatPrice(product.price)}
                          </p>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-medium-text">
                        No products found
                      </p>
                      <p className="text-sm text-light-text mt-2">
                        Try searching for something else
                      </p>
                    </div>
                  )}
                </>
              )}

              {!searchQuery && (
                <div className="text-center py-12">
                  <p className="text-light-text">
                    Start typing to search our collection
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {["Banarasi", "Jamdani", "Kantha", "Silk"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-4 py-2 border border-muted-taupe text-sm hover:bg-deep-rose hover:border-deep-rose hover:text-white transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
