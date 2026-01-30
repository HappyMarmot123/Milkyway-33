import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">Milkyway AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/chat">
            <Button variant="ghost" className="hidden sm:inline-flex">로그인</Button>
          </Link>
          <Link to="/chat">
            <Button className="rounded-full px-6">시작하기</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
