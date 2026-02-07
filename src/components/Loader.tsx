import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
    onLoadingComplete: () => void;
}

export function Loader({ onLoadingComplete }: LoaderProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500); // Wait for fade out
        }, 2500);

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blush via-soft-pink to-off-white"
        >
            <div className="flex flex-col items-center">
                {/* Lotus Icon Animation */}
                <motion.svg
                    width="80"
                    height="80"
                    viewBox="0 0 28 28"
                    fill="none"
                    className="text-deep-rose mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.path
                        d="M14 2C14 2 16 6 16 10C16 14 14 18 14 18C14 18 12 14 12 10C12 6 14 2 14 2Z"
                        fill="currentColor"
                        fillOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.path
                        d="M14 18C14 18 10 16 6 12C2 8 2 4 2 4C2 4 6 4 10 8C14 12 14 18 14 18Z"
                        fill="currentColor"
                        fillOpacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    />
                    <motion.path
                        d="M14 18C14 18 18 16 22 12C26 8 26 4 26 4C26 4 22 4 18 8C14 12 14 18 14 18Z"
                        fill="currentColor"
                        fillOpacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    />
                    <motion.path
                        d="M14 18C14 18 8 20 4 18C0 16 0 12 0 12C0 12 4 12 8 14C12 16 14 18 14 18Z"
                        fill="currentColor"
                        fillOpacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    />
                    <motion.path
                        d="M14 18C14 18 20 20 24 18C28 16 28 12 28 12C28 12 24 12 20 14C16 16 14 18 14 18Z"
                        fill="currentColor"
                        fillOpacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    />
                    <motion.circle
                        cx="14"
                        cy="14"
                        r="3"
                        fill="currentColor"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                    />
                </motion.svg>

                {/* Brand Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="font-playfair text-4xl sm:text-5xl tracking-[0.2em] text-deep-rose mb-2"
                >
                    ALISHA
                </motion.h1>

                {/* Bengali Text */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="font-bengali text-xl text-deep-rose/80"
                >
                    আঁচল
                </motion.p>

                {/* Loading Dots */}
                <motion.div
                    className="flex gap-2 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-deep-rose"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
