import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Heart, Share2, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { ProductCard } from "@/components/ProductCard";

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem, toggleCart } = useCartStore();

    const product = products.find((p) => p.id === id);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("M");

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-playfair text-dark-text mb-4">Product not found</h2>
                    <button onClick={() => navigate("/")} className="btn-primary">
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    const images = [product.image, product.hoverImage].filter(Boolean) as string[];
    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
        toggleCart();
    };

    const handleBuyNow = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
        navigate("/checkout");
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
        <div className="min-h-screen bg-off-white">
            {/* Breadcrumb */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-6">
                <div className="flex items-center gap-2 text-sm text-medium-text">
                    <button onClick={() => navigate("/")} className="hover:text-deep-rose transition-colors">
                        Home
                    </button>
                    <span>/</span>
                    <button onClick={() => navigate("/")} className="hover:text-deep-rose transition-colors">
                        Shop
                    </button>
                    <span>/</span>
                    <span className="text-dark-text">{product.name}</span>
                </div>
            </div>

            {/* Product Section */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image Gallery */}
                    <div>
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4"
                        >
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover object-top"
                            />
                            {product.isNew && (
                                <span className="absolute top-4 left-4 bg-deep-rose text-white text-xs uppercase tracking-wider px-3 py-1">
                                    New
                                </span>
                            )}
                        </motion.div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-3">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-[3/4] w-20 sm:w-24 overflow-hidden transition-all ${selectedImage === index ? "ring-2 ring-deep-rose" : "opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="lg:pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Back Button */}
                            <button
                                onClick={() => navigate("/")}
                                className="flex items-center gap-2 text-sm text-medium-text hover:text-deep-rose transition-colors mb-6 lg:hidden"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back to Shop
                            </button>

                            {/* Product Name */}
                            <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-dark-text mb-3">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-2xl sm:text-3xl text-deep-rose font-medium">
                                    {formatPrice(product.price)}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-lg text-medium-text line-through">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-deep-rose">★</span>
                                    ))}
                                </div>
                                <span className="text-sm text-medium-text">(24 reviews)</span>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <p className="text-medium-text leading-relaxed mb-8">
                                    {product.description}
                                </p>
                            )}

                            {/* Size Selection */}
                            <div className="mb-6">
                                <label className="block text-sm uppercase tracking-wider text-dark-text mb-3">
                                    Size
                                </label>
                                <div className="flex gap-2">
                                    {["S", "M", "L", "XL"].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSize(s)}
                                            className={`w-12 h-12 border transition-all ${size === s
                                                    ? "border-deep-rose bg-deep-rose text-white"
                                                    : "border-muted-taupe hover:border-deep-rose"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-8">
                                <label className="block text-sm uppercase tracking-wider text-dark-text mb-3">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-muted-taupe">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-3 hover:bg-blush transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-6 text-lg">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-3 hover:bg-blush transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <button onClick={handleAddToCart} className="btn-secondary flex-1">
                                    ADD TO CART
                                </button>
                                <button onClick={handleBuyNow} className="btn-primary flex-1">
                                    BUY NOW
                                </button>
                            </div>

                            {/* Additional Actions */}
                            <div className="flex items-center gap-4 pb-6 border-b border-soft-pink">
                                <button className="flex items-center gap-2 text-sm text-medium-text hover:text-deep-rose transition-colors">
                                    <Heart className="w-4 h-4" />
                                    Add to Wishlist
                                </button>
                                <button className="flex items-center gap-2 text-sm text-medium-text hover:text-deep-rose transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>

                            {/* Product Details */}
                            <div className="mt-6 space-y-4">
                                <div>
                                    <h3 className="text-sm uppercase tracking-wider text-dark-text mb-2">Category</h3>
                                    <p className="text-medium-text">{product.category}</p>
                                </div>
                                {product.material && (
                                    <div>
                                        <h3 className="text-sm uppercase tracking-wider text-dark-text mb-2">Material</h3>
                                        <p className="text-medium-text">{product.material}</p>
                                    </div>
                                )}
                                {product.care && (
                                    <div>
                                        <h3 className="text-sm uppercase tracking-wider text-dark-text mb-2">Care Instructions</h3>
                                        <p className="text-medium-text">{product.care}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16 sm:mt-24">
                        <h2 className="font-playfair text-2xl sm:text-3xl text-dark-text text-center mb-12">
                            YOU MAY ALSO LIKE
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.map((p, index) => (
                                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)}>
                                    <ProductCard product={p} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
