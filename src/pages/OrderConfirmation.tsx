import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Calendar } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";

export function OrderConfirmation() {
    const navigate = useNavigate();
    const { items, getTotalPrice, clearCart } = useCartStore();

    useEffect(() => {
        // Clear cart after order is placed
        if (items.length > 0) {
            setTimeout(() => {
                clearCart();
            }, 1000);
        }
    }, [items.length, clearCart]);

    const orderNumber = `AL${Date.now().toString().slice(-8)}`;
    const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 0,
        })
            .format(price)
            .replace("BDT", "৳");
    };

    const subtotal = getTotalPrice();
    const shipping = subtotal > 5000 ? 0 : 100;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-off-white flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full bg-white p-8 sm:p-12"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="flex justify-center mb-6"
                >
                    <div className="relative">
                        <CheckCircle2 className="w-20 h-20 text-deep-rose" />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="absolute inset-0 rounded-full border-4 border-deep-rose"
                        />
                    </div>
                </motion.div>

                {/* Thank You Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <h1 className="font-playfair text-3xl sm:text-4xl text-dark-text mb-3">
                        Thank You for Your Order!
                    </h1>
                    <p className="text-medium-text">
                        We've received your order and will send you a confirmation email shortly.
                    </p>
                </motion.div>

                {/* Order Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-blush p-6 mb-8"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <Package className="w-5 h-5 text-deep-rose mt-1" />
                            <div>
                                <p className="text-xs uppercase tracking-wider text-medium-text mb-1">Order Number</p>
                                <p className="text-lg font-medium text-dark-text">{orderNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-deep-rose mt-1" />
                            <div>
                                <p className="text-xs uppercase tracking-wider text-medium-text mb-1">
                                    Estimated Delivery
                                </p>
                                <p className="text-lg font-medium text-dark-text">{estimatedDelivery}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                >
                    <h2 className="text-xl font-playfair text-dark-text mb-4">Order Summary</h2>
                    <div className="space-y-3 mb-4">
                        {items.map((item) => (
                            <div key={item.product.id} className="flex justify-between text-sm">
                                <span className="text-medium-text">
                                    {item.product.name} × {item.quantity}
                                </span>
                                <span className="text-dark-text">
                                    {formatPrice(item.product.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-soft-pink">
                        <div className="flex justify-between text-sm">
                            <span className="text-medium-text">Subtotal</span>
                            <span className="text-dark-text">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-medium-text">Shipping</span>
                            <span className="text-dark-text">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-soft-pink mt-3">
                        <span className="font-medium text-dark-text">Total Paid</span>
                        <span className="text-2xl text-deep-rose font-medium">{formatPrice(total)}</span>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3"
                >
                    <button onClick={() => navigate("/")} className="btn-primary flex-1">
                        Continue Shopping
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="btn-secondary flex-1"
                    >
                        View Orders
                    </button>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 pt-6 border-t border-soft-pink text-center"
                >
                    <p className="text-sm text-medium-text">
                        Questions about your order? Contact us at{" "}
                        <a href="mailto:support@alisha.com" className="text-deep-rose hover:underline">
                            support@alisha.com
                        </a>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
