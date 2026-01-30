import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLocation } from "react-router-dom";

const PAGE_TITLES = {
  "/chat": "대화",
  "/history": "히스토리",
  "/settings": "설정",
};

export function Header() {
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || "LLM Chat";

  return (
    <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 sm:gap-4 border-b px-3 sm:px-4">
      <SidebarTrigger className="-ml-1" />

      <div className="flex-1 min-w-0">
        <h1 className="text-base sm:text-lg font-semibold truncate">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}

