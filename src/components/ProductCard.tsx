import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, toggleCart } = useCartStore();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toggleCart();
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3 sm:mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Image */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} - alternate view`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
              }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5 sm:gap-2">
          {product.isNew && (
            <span className="bg-deep-rose text-white text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-dark-text text-white text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1">
              Bestseller
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          onClick={handleAddToCart}
          className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-off-white text-dark-text py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] hover:bg-deep-rose hover:text-off-white transition-colors"
        >
          ADD TO CART
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-[11px] sm:text-product uppercase text-dark-text mb-1 group-hover:text-deep-rose transition-colors tracking-[0.08em] sm:tracking-normal">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-medium-text">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
}
