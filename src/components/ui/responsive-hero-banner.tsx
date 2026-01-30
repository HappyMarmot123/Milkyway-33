"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { useShinyText } from '@/hooks/useShinyText';

interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

interface Partner {
    logoUrl: string;
    href: string;
}

interface ResponsiveHeroBannerProps {
    logoUrl?: string;
    backgroundImageUrl?: string;
    navLinks?: NavLink[];
    ctaButtonText?: string;
    ctaButtonHref?: string;
    badgeLabel?: string;
    badgeText?: string;
    title?: string;
    titleLine2?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    partnersTitle?: string;
    partners?: Partner[];
}

// Shiny Title Component with gradient shine effect
function ShinyTitle({ title, titleLine2 }: { title: string; titleLine2: string }) {
    const { style, backgroundPosition, handlers } = useShinyText({
        speed: 3,
        color: 'rgba(255, 255, 255, 0.85)',
        shineColor: '#ff6b35', // Warm orange accent
        spread: 90,
        yoyo: true,
        pauseOnHover: true
    });

    return (
        <motion.h1
            className="text-7xl tracking-tight font-black uppercase animate-[fadeSlideIn_0.6s_ease-out_0.1s_forwards]"
            style={{ 
                fontFamily: '"Outfit", system-ui, sans-serif',
                ...style,
                backgroundPosition 
            }}
            {...handlers}
        >
            {title}
            <br />
            {titleLine2}
        </motion.h1>
    );
}

const ResponsiveHeroBanner = ({
    logoUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/febf2421-4a9a-42d6-871d-ff4f9518021c_1600w.png",
    backgroundImageUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
    navLinks = [
        { label: "Home", href: "#", isActive: true },
        { label: "Missions", href: "#" },
        { label: "Destinations", href: "#" },
        { label: "Technology", href: "#" },
        { label: "Book Flight", href: "#" }
    ],
    ctaButtonText = "Reserve Seat",
    ctaButtonHref = "#",
    badgeLabel = "New",
    badgeText = "First Commercial Flight to Mars 2026",
    title = "Journey Beyond Earth",
    titleLine2 = "Into the Cosmos",
    description = "Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable.",
    primaryButtonText = "Book Your Journey",
    primaryButtonHref = "#",
    secondaryButtonText = "Watch Launch",
    secondaryButtonHref = "#",
    partnersTitle = "Partnering with leading space agencies worldwide",
    partners = [
        { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f7466370-2832-4fdd-84c2-0932bb0dd850_800w.png", href: "#" },
        { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0a9a71ec-268b-4689-a510-56f57e9d4f13_1600w.png", href: "#" },
        { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a9ed4369-748a-49f8-9995-55d6c876bbff_1600w.png", href: "#" },
        { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0d8966a4-8525-4e11-9d5d-2d7390b2c798_1600w.png", href: "#" },
        { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2ed33c8b-b8b2-4176-967f-3d785fed07d8_1600w.png", href: "#" }
    ]
}: ResponsiveHeroBannerProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section>
            <img
                src={backgroundImageUrl}
                alt=""
                className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />
            <header className="z-10 xl:top-4 relative">
                <div className="mx-6">
                </div>
            </header>
            <div className="z-10 relative">
                <div className="max-w-7xl mx-auto lg:pt-[18rem] px-6">
                    <div className="max-w-4xl text-left">
                        <motion.h1
                            className="text-6xl md:text-7xl lg:text-8xl tracking-tight font-extrabold pb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-[0.9] font-sans"
                        >
                            {title}
                            <br />
                            <span>{titleLine2}</span>
                        </motion.h1>

                        <p
                            className="text-base sm:text-lg md:text-xl animate-[fadeSlideIn_0.6s_ease-out_0.2s_forwards] opacity-0 text-white/70 max-w-xl mt-8 leading-relaxed font-sans">
                            {description}
                        </p>

                        <div
                            className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-start animate-[fadeSlideIn_0.6s_ease-out_0.3s_forwards] opacity-0">
                            <a
                                href={primaryButtonHref}
                                className="inline-flex items-center gap-2 hover:bg-white/15 text-sm font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full py-3 px-5 font-sans transition-colors">
                                {primaryButtonText}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                            <a
                                href={secondaryButtonHref}
                                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/90 hover:text-white font-sans transition-colors">
                                {secondaryButtonText}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4">
                                    <path
                                        d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { ResponsiveHeroBanner };
export default ResponsiveHeroBanner;
