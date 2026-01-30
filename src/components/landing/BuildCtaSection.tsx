import { Link } from "react-router-dom";
import ScrambledText from "@/components/ui/ScrambledText";
import StarBorder from "@/components/ui/StarBorder";

interface BuildCtaSectionProps {
  title?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function BuildCtaSection({
  title = "So, what are we building?",
  buttonText = "Start building",
  buttonHref = "/chat"
}: BuildCtaSectionProps) {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=2107&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradients - All sides */}
      <div className="absolute inset-y-0 left-0 w-1/3 z-10" style={{ background: 'linear-gradient(to right, rgba(15, 15, 17), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-1/3 z-10" style={{ background: 'linear-gradient(to left, rgba(15, 15, 17), transparent)' }} />
      <div className="absolute top-0 left-0 right-0 h-32 z-10" style={{ background: 'linear-gradient(to bottom, rgba(15, 15, 17), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10" style={{ background: 'linear-gradient(to top, rgba(15, 15, 17), transparent)' }} />

      {/* Overlay to darken image slightly for text readability */}
      <div className="absolute inset-0 bg-[#0F0F11]/40 z-0" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 flex flex-col items-center gap-10">
        <ScrambledText 
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-[1.1] font-sans"
          radius={80}
          duration={600}
          speed={40}
        >
          {title}
        </ScrambledText>
        
        <Link to={buttonHref}>
          <StarBorder
            as="span"
            color="#ff6b35"
            speed="3s"
            className="cursor-pointer"
          >
            {buttonText}
          </StarBorder>
        </Link>
      </div>
    </section>
  );
}
