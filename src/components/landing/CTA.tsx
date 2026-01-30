import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-32 md:py-48 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10 leading-tight">
            지금 바로 당신의 은하계를 <br /> 탐험해 보세요
          </h2>
          <Link to="/chat" className="relative z-10 inline-block">
            <Button size="lg" variant="secondary" className="h-14 px-12 text-lg rounded-full font-bold shadow-xl">
              무료로 시작하기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
