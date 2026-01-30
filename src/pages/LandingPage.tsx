import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Zap, 
  Shield, 
  ArrowRight, 
  Layout, 
  Sparkles,
  Github,
  Twitter,
  History
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/10">
      {/* Navigation */}
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

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          {/* Animated Background Gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 dark:opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[120px] animate-pulse" />
            <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-500 blur-[120px] opacity-60" />
            <div className="absolute top-[40%] left-[20%] w-[25%] h-[25%] rounded-full bg-pink-500 blur-[120px] opacity-40 animate-bounce" style={{ animationDuration: '10s' }} />
          </div>

          <div className="container mx-auto px-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                New Architecture v2.0 is live
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-[1.1]">
                지능형 대화의 <br /> <span className="text-primary italic">새로운 은하계</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Milkyway AI와 함께 당신의 아이디어를 현실로 만드세요. 
                가장 고도화된 모델들을 하나의 아름다운 인터페이스에서 경험할 수 있습니다.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/chat">
                  <Button size="lg" className="h-14 px-10 text-lg rounded-full group shadow-lg shadow-primary/20">
                    지금 바로 대화하기
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full">
                  데모 보기
                </Button>
              </div>
            </motion.div>

            {/* App Preview Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 max-w-6xl mx-auto relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <div className="rounded-2xl border bg-card shadow-2xl overflow-hidden aspect-[16/9] relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-muted/50 border-b flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                {/* Mockup Content */}
                <div className="pt-8 h-full flex flex-col items-center justify-center gap-4 opacity-40 select-none grayscale">
                   <div className="w-[80%] h-8 bg-muted rounded-md animate-pulse" />
                   <div className="w-[60%] h-8 bg-muted rounded-md animate-pulse" />
                   <div className="w-[70%] h-8 bg-muted rounded-md animate-pulse" />
                   <div className="mt-8">
                     <Sparkles className="w-16 h-16 text-primary/20" />
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">스마트한 기능, 탁월한 경험</h2>
              <p className="text-muted-foreground text-lg">
                단순한 채팅을 너머 생산성을 극대화하는 도구들을 제공합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl border bg-background hover:border-primary/50 transition-all shadow-sm flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
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
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary h-6 w-6" />
              <span className="font-bold text-xl">Milkyway AI</span>
            </div>
            <div className="flex items-center gap-6 text-muted-foreground text-sm">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">License</a>
              <div className="flex items-center gap-4 ml-4">
                <Github className="h-5 w-5 cursor-pointer hover:text-foreground" />
                <Twitter className="h-5 w-5 cursor-pointer hover:text-foreground" />
              </div>
            </div>
          </div>
          <div className="text-center mt-12 text-sm text-muted-foreground">
            © 2026 Milkyway AI Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "다차원적 대화 모델",
    description: "GPT-4, Claude 3 등 세계 최고의 언어 모델들을 한 곳에서 자유롭게 전환하며 대화할 수 있습니다.",
    icon: MessageSquare
  },
  {
    title: "번개처럼 빠른 응답",
    description: "최적화된 인프라를 통해 지연 시간 없는 즉각적인 피드백과 부드러운 스트리밍 인터페이스를 제공합니다.",
    icon: Zap
  },
  {
    title: "시각적 우수성",
    description: "현대적이고 직관적인 다크 모드 기반 UI로 장시간 사용에도 눈이 편안하며 몰입감을 높여줍니다.",
    icon: Layout
  },
  {
    title: "철저한 프라이버시",
    description: "사용자의 모든 대화는 암호화되어 안전하게 보호되며, 데이터 보안을 최우선으로 생각합니다.",
    icon: Shield
  },
  {
    title: "무한한 확장성",
    description: "플러그인과 커스텀 명령어를 통해 당신의 요구사항에 딱 맞는 고유한 AI 도우미로 진화시킵니다.",
    icon: Sparkles
  },
  {
    title: "스마트 히스토리",
    description: "과거의 모든 지식을 체계적으로 분류하고 태그하여 필요할 때 언제든 다시 꺼내볼 수 있습니다.",
    icon: History
  }
];
