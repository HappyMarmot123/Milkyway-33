

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight text-foreground">Milkyway AI</span>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
        </div>
        <div className="flex items-center gap-3">

        </div>
      </div>
    </nav>
  );
}
