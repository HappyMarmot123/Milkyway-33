import { useLocation } from "react-router-dom";
import { useChatContext } from "@/contexts/ChatContext";
import { Sparkles, Settings, MessageCircle } from "lucide-react";

const PAGE_CONFIG: Record<string, { title: string; icon: React.ReactNode }> = {
  "/chat": { title: "대화", icon: <MessageCircle className="h-5 w-5" /> },
  "/settings": { title: "설정", icon: <Settings className="h-5 w-5" /> },
};

// Animated status indicator with Gemini-style gradient
const StatusIndicator = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { label: string; gradient: string; pulse: boolean }> = {
    thinking: { 
      label: "생각하는 중...", 
      gradient: "from-purple-500 via-pink-500 to-indigo-500",
      pulse: true 
    },
    generating: { 
      label: "생성 중...", 
      gradient: "from-blue-500 via-cyan-400 to-teal-500",
      pulse: true 
    },
    streaming: { 
      label: "응답 중...", 
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      pulse: true 
    },
    idle: { 
      label: "준비됨", 
      gradient: "from-gray-400 to-gray-500",
      pulse: false 
    },
  };
  
  const config = statusConfig[status] || statusConfig.idle;
  
  return (
    <div className="flex items-center gap-2">
      {/* Animated gradient dot */}
      <div className="relative flex items-center justify-center">
        <div 
          className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${config.gradient} ${
            config.pulse ? "animate-pulse" : ""
          }`}
        />
        {config.pulse && (
          <div 
            className={`absolute h-4 w-4 rounded-full bg-gradient-to-r ${config.gradient} opacity-30 animate-ping`}
          />
        )}
      </div>
      <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
        {config.label}
      </span>
    </div>
  );
};

export function Header() {
  const location = useLocation();
  const { status } = useChatContext();
  const pageConfig = PAGE_CONFIG[location.pathname] || { title: "LLM Chat", icon: <Sparkles className="h-5 w-5" /> };

  return (
    <header className="relative flex h-14 shrink-0 items-center justify-between gap-4 px-4 sm:px-6 bg-gradient-to-r from-bg-100/80 via-bg-100/60 to-bg-100/80 backdrop-blur-xl border-b border-white/5">
      {/* Subtle animated gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Left: Page title with icon */}
      <div className="flex items-center gap-3">
        <h1 className="font-semibold text-foreground/90 leading-tight">
          {pageConfig.title}
        </h1>
      </div>

      {/* Right: Status indicator */}
      <div className="flex items-center gap-3">
        {location.pathname === "/chat" && (
          <StatusIndicator status={status} />
        )}
      </div>
    </header>
  );
}
