import { useLocation } from "react-router-dom";
import { useChatContext } from "@/contexts/ChatContext";

const PAGE_TITLES: Record<string, string> = {
  "/chat": "대화",
  "/settings": "설정",
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { label: string; color: string }> = {
    thinking: { label: "🧠 Thinking", color: "bg-purple-500/20 text-purple-300" },
    generating: { label: "✍️ Generating", color: "bg-blue-500/20 text-blue-300" },
    streaming: { label: "📝 Streaming", color: "bg-green-500/20 text-green-300" },
    idle: { label: "Ready", color: "bg-gray-500/20 text-gray-400" },
  };
  
  const config = statusConfig[status] || statusConfig.idle;
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>
      {config.label}
    </span>
  );
};

export function Header() {
  const location = useLocation();
  const { status } = useChatContext();
  const pageTitle = PAGE_TITLES[location.pathname] || "LLM Chat";

  return (
    <header className="flex h-14 sm:h-16 shrink-0 items-center justify-between gap-2 sm:gap-4 border-b px-3 sm:px-4 bg-muted/30">
      <div className="flex-1 min-w-0">
        <h1 className="text-base sm:text-lg font-semibold truncate">
          {pageTitle}
        </h1>
      </div>
      
      {/* Status Badge - Right side */}
      {location.pathname === "/chat" && (
        <StatusBadge status={status} />
      )}
    </header>
  );
}
