import { useState } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCarousel } from "@/components/ProductCarousel";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { CartSidebar } from "@/components/CartSidebar";
import { SearchOverlay } from "@/components/SearchOverlay";
import { Footer } from "@/components/Footer";

export function HomePage() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="min-h-screen bg-off-white">
            {/* Announcement Bar */}
            <AnnouncementBar />

            {/* Header */}
            <Header onSearchClick={() => setIsSearchOpen(true)} />

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <Hero />

                {/* New Arrivals Carousel */}
                <ProductCarousel />

                {/* Category Discovery */}
                <CategoryGrid />

                {/* Product Grid */}
                <ProductGrid />
            </main>

            {/* Footer */}
            <Footer />

            {/* Cart Sidebar */}
            <CartSidebar />

            {/* Search Overlay */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
}
