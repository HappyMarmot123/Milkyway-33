import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  MessageSquare,
  Settings,
  History,
  Plus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();

  const mainItem = {
    title: "새 대화",
    icon: Plus,
    href: "/",
  };

  const navItems = [
    {
      title: "대화",
      icon: MessageSquare,
      href: "/chat",
    },
    {
      title: "히스토리",
      icon: History,
      href: "/history",
    },
  ];

  const footerItem = {
    title: "설정",
    icon: Settings,
    href: "/settings",
  };

  return (
    <section aria-label="app-sidebar">
      <Sidebar>
        <SidebarContent className="p-2 gap-4">
          <SidebarGroup>
            {/* Main Action - New Chat */}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  className="bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80 transition-colors shadow-sm ring-1 ring-slate-200 dark:ring-slate-800"
                >
                  <Link to={mainItem.href} className="flex items-center gap-3 font-medium">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background shadow-sm border border-slate-200 dark:border-slate-800 text-foreground">
                      <mainItem.icon className="h-5 w-5" />
                    </div>
                    <span>{mainItem.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              메뉴
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {navItems.map((item) => {
                  const isActive =
                    location.pathname === item.href ||
                    (item.href === "/chat" && location.pathname === "/");

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="h-10 px-3 hover:bg-sidebar-accent/50 transition-colors"
                      >
                        <Link to={item.href} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                          <span className="text-sm font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="mt-auto pb-4 px-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="h-10 px-3 hover:bg-sidebar-accent/50 transition-colors"
                >
                  <Link to={footerItem.href} className="flex items-center gap-3">
                    <footerItem.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    <span className="text-sm font-medium">{footerItem.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>
      </Sidebar>
    </section>
  );
}

