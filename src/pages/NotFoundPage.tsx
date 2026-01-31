import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FuzzyText from "@/components/ui/FuzzyText";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black gap-8">
      <div className="flex flex-col items-center justify-center">
        <FuzzyText 
          baseIntensity={0.15} 
          hoverIntensity={0.5} 
          enableHover={true}
          fontSize="clamp(8rem, 20vw, 20rem)"
          fontWeight={900}
          color="#ffffff"
        >
          404
        </FuzzyText>
        <p className="text-muted-foreground mt-4 text-xl">
          Page not found
        </p>
      </div>

      <Button 
        onClick={() => navigate("/")}
        variant="outline"
        size="lg"
        className="rounded-full px-8 py-6 text-lg hover:bg-white/10 transition-all duration-300"
      >
        Go Home
      </Button>
    </div>
  );
}
