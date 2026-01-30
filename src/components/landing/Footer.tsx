import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Globe,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

export function Footer() {
  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={18} />, label: "Twitter", href: "#" },
    { icon: <Globe size={18} />, label: "Website", href: "#" },
  ];

  return (
    <motion.footer 
      className="bg-[#0F0F11]/50 relative h-fit overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.9, once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Text hover effect */}
      <div className="flex items-center justify-center h-[12rem] md:h-[16rem] pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          <TextHoverEffect text="MILKYWAY" className="z-50" />
        </div>
      </div>

      <FooterBackgroundGradient />
    </motion.footer>
  );
}
