import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, User, Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { navItems } from "@/data/products";

interface HeaderProps {
  onSearchClick: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const cartItemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={`sticky top-0 z-50 bg-off-white transition-all duration-300 ${isScrolled ? "shadow-sm border-b border-soft-pink" : ""
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-20">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-1.5 sm:p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.slice(0, 3).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-nav uppercase text-dark-text hover:text-deep-rose transition-colors link-underline py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Logo */}
          <a href="/" className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Lotus Icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 28 28"
                fill="none"
                className="text-deep-rose sm:w-7 sm:h-7"
              >
                <path
                  d="M14 2C14 2 16 6 16 10C16 14 14 18 14 18C14 18 12 14 12 10C12 6 14 2 14 2Z"
                  fill="currentColor"
                  fillOpacity="0.3"
                />
                <path
                  d="M14 18C14 18 10 16 6 12C2 8 2 4 2 4C2 4 6 4 10 8C14 12 14 18 14 18Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                />
                <path
                  d="M14 18C14 18 18 16 22 12C26 8 26 4 26 4C26 4 22 4 18 8C14 12 14 18 14 18Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                />
                <path
                  d="M14 18C14 18 8 20 4 18C0 16 0 12 0 12C0 12 4 12 8 14C12 16 14 18 14 18Z"
                  fill="currentColor"
                  fillOpacity="0.4"
                />
                <path
                  d="M14 18C14 18 20 20 24 18C28 16 28 12 28 12C28 12 24 12 20 14C16 16 14 18 14 18Z"
                  fill="currentColor"
                  fillOpacity="0.4"
                />
                <circle cx="14" cy="14" r="3" fill="currentColor" />
              </svg>
              <span className="font-playfair text-lg sm:text-2xl tracking-[0.1em] text-dark-text">
                ALISHA
              </span>
            </div>
            <span className="font-bengali text-xs sm:text-sm text-deep-rose tracking-wide">
              আঁচল
            </span>
          </a>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            <nav className="hidden lg:flex items-center space-x-8 mr-4">
              {navItems.slice(3).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-nav uppercase text-dark-text hover:text-deep-rose transition-colors link-underline py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button className="p-1.5 sm:p-2 hover:text-deep-rose transition-colors hidden sm:block">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-1.5 sm:p-2 hover:text-deep-rose transition-colors hidden sm:block">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              className="p-1.5 sm:p-2 hover:text-deep-rose transition-colors"
              onClick={onSearchClick}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              className="p-1.5 sm:p-2 hover:text-deep-rose transition-colors relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 bg-deep-rose text-white text-[10px] flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-off-white border-t border-soft-pink"
          >
            <nav className="flex flex-col py-4 px-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-3 text-nav uppercase text-dark-text hover:text-deep-rose transition-colors border-b border-soft-pink/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
