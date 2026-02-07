import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, CreditCard, Banknote } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function Checkout() {
    const navigate = useNavigate();
    const { items, getTotalPrice } = useCartStore();
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "bkash">("cod");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        postalCode: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            // Process payment (demo)
            navigate("/order-confirmation");
        }
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

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-off-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-playfair text-dark-text mb-4">Your cart is empty</h2>
                    <button onClick={() => navigate("/")} className="btn-primary">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    const subtotal = getTotalPrice();
    const shipping = subtotal > 5000 ? 0 : 100;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-off-white">
            {/* Header */}
            <div className="bg-white border-b border-soft-pink">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-sm text-medium-text hover:text-deep-rose transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Shop
                    </button>
                    <h1 className="font-playfair text-3xl sm:text-4xl text-dark-text mt-4">Checkout</h1>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 ${step >= 1 ? "text-deep-rose" : "text-medium-text"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-deep-rose text-white" : "bg-blush"
                                }`}>
                                1
                            </div>
                            <span className="hidden sm:inline text-sm uppercase tracking-wider">Shipping</span>
                        </div>
                        <div className="w-12 h-px bg-soft-pink" />
                        <div className={`flex items-center gap-2 ${step >= 2 ? "text-deep-rose" : "text-medium-text"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-deep-rose text-white" : "bg-blush"
                                }`}>
                                2
                            </div>
                            <span className="hidden sm:inline text-sm uppercase tracking-wider">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleSubmit}
                            className="bg-white p-6 sm:p-8"
                        >
                            {step === 1 ? (
                                <>
                                    <h2 className="text-xl font-playfair text-dark-text mb-6">Shipping Information</h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm uppercase tracking-wider text-dark-text mb-2">
                                                    First Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-muted-taupe focus:border-deep-rose focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm uppercase tracking-wider text-dark-text mb-2">
                                                    Last Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-muted-taupe focus:border-deep-rose focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm uppercase tracking-wider text-dark-text mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-muted-taupe focus:border-deep-rose focus:outline-none transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm uppercase tracking-wider text-dark-text mb-2">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-muted-taupe focus:border-deep-rose focus:outline-none transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm uppercase tracking-wider text-dark-text mb-2">
                                                Address *
                                            </label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                                rows={3}
                                                className="w-full px-4 py-3 border border-muted-taupe focus:border-deep-rose focus:outline-none transition-colors resize-none"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm uppercase tracking-wider text-dark-text mb-2">
                                                    City *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-muted-taupe focus:border-deep-rose focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm uppercase tracking-wider text-dark-text mb-2">
                                                    District *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="district"
                                                    value={formData.district}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-muted-taupe focus:border-deep-rose focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm uppercase tracking-wider text-dark-text mb-2">
                                                    Postal Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="postalCode"
                                                    value={formData.postalCode}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-muted-taupe focus:border-deep-rose focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn-primary w-full mt-8">
                                        Continue to Payment
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-playfair text-dark-text mb-6">Payment Method</h2>
                                    <div className="space-y-4 mb-8">
                                        {/* Cash on Delivery */}
                                        <label className="flex items-start gap-4 p-4 border border-muted-taupe cursor-pointer hover:border-deep-rose transition-colors">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                checked={paymentMethod === "cod"}
                                                onChange={() => setPaymentMethod("cod")}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Banknote className="w-5 h-5 text-deep-rose" />
                                                    <span className="font-medium text-dark-text">Cash on Delivery</span>
                                                </div>
                                                <p className="text-sm text-medium-text">Pay when you receive your order</p>
                                            </div>
                                        </label>

                                        {/* Card Payment */}
                                        <label className="flex items-start gap-4 p-4 border border-muted-taupe cursor-pointer hover:border-deep-rose transition-colors">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="card"
                                                checked={paymentMethod === "card"}
                                                onChange={() => setPaymentMethod("card")}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CreditCard className="w-5 h-5 text-deep-rose" />
                                                    <span className="font-medium text-dark-text">Credit / Debit Card</span>
                                                </div>
                                                <p className="text-sm text-medium-text">Demo payment (no actual charge)</p>
                                            </div>
                                        </label>

                                        {/* bKash */}
                                        <label className="flex items-start gap-4 p-4 border border-muted-taupe cursor-pointer hover:border-deep-rose transition-colors">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="bkash"
                                                checked={paymentMethod === "bkash"}
                                                onChange={() => setPaymentMethod("bkash")}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-dark-text">bKash</span>
                                                </div>
                                                <p className="text-sm text-medium-text">Demo payment (no actual charge)</p>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="btn-secondary flex-1"
                                        >
                                            Back
                                        </button>
                                        <button type="submit" className="btn-primary flex-1">
                                            Place Order
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 sticky top-6"
                        >
                            <h2 className="text-xl font-playfair text-dark-text mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-16 h-20 object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-sm text-dark-text line-clamp-2">{item.product.name}</h3>
                                            <p className="text-sm text-medium-text">Qty: {item.quantity}</p>
                                            <p className="text-sm text-deep-rose">{formatPrice(item.product.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 py-4 border-t border-soft-pink">
                                <div className="flex justify-between text-sm">
                                    <span className="text-medium-text">Subtotal</span>
                                    <span className="text-dark-text">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-medium-text">Shipping</span>
                                    <span className="text-dark-text">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                                </div>
                                {shipping === 0 && (
                                    <p className="text-xs text-deep-rose">Free shipping on orders over ৳5,000</p>
                                )}
                            </div>

                            <div className="flex justify-between py-4 border-t border-soft-pink">
                                <span className="font-medium text-dark-text">Total</span>
                                <span className="text-xl text-deep-rose font-medium">{formatPrice(total)}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
