import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router-dom";

export function CartSidebar() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  

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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setCartOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-off-white z-50 shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-soft-pink">
              <h2 className="font-playfair text-xl tracking-[0.1em]">YOUR CART</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:text-deep-rose transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-taupe mb-4" />
                  <p className="text-lg text-medium-text mb-2">YOUR CART IS EMPTY</p>
                  <p className="text-sm text-light-text">
                    Discover our beautiful collection of sarees
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="btn-primary mt-6"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 pb-6 border-b border-soft-pink"
                    >
                      {/* Product Image */}
                      <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-sm uppercase tracking-wide text-dark-text mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-medium-text mb-3">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-muted-taupe">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-soft-pink transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-soft-pink transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-xs text-light-text hover:text-deep-rose underline transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-soft-pink bg-blush/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm uppercase tracking-wide">Subtotal</span>
                  <span className="font-playfair text-lg">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <p className="text-xs text-light-text mb-4">
                  Shipping and taxes calculated at checkout
                </p>
                <Link to="/checkout">
                <button className="w-full bg-dark-text text-white py-4 text-xs uppercase tracking-[0.15em] hover:bg-deep-rose transition-colors"
          
                >
                  CHECKOUT
                </button>
                </Link>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full mt-3 border border-dark-text text-dark-text py-4 text-xs uppercase tracking-[0.15em] hover:bg-dark-text hover:text-white transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
