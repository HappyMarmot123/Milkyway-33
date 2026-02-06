import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  Settings,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useChatContext } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AppSidebar() {
  const location = useLocation();
  const { 
    conversations, 
    currentConversationId, 
    createNewConversation, 
    switchConversation,
    deleteConversation,
    renameConversation,
  } = useChatContext();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Get recent conversations (up to 10 for sidebar display)
  const recentConversations = conversations.slice(0, 10);

  const handleNewChat = async () => {
    await createNewConversation();
  };

  const handleConversationClick = (conversationId: string) => {
    if (editingId !== conversationId) {
      switchConversation(conversationId);
    }
  };

  const handleRenameStart = (conv: { id: string; title: string }) => {
    setEditingId(conv.id);
    setEditingTitle(conv.title);
  };

  const handleRenameSubmit = async () => {
    if (editingId && editingTitle.trim()) {
      await renameConversation(editingId, editingTitle.trim());
    }
    setEditingId(null);
    setEditingTitle("");
  };

  const handleRenameCancel = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleDelete = async (conversationId: string) => {
    await deleteConversation(conversationId);
  };

  return (
    <section aria-label="app-sidebar">
      <Sidebar>
        {/* Header: Logo + Trigger */}
        <SidebarHeader className="flex flex-row items-center justify-between p-6">
          <span className="font-bold text-lg tracking-tight text-foreground">
            Milkyway AI
          </span>
          <SidebarTrigger />
        </SidebarHeader>

        <SidebarContent className="p-2 gap-4">
          {/* New Chat Button */}
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="group flex items-center hover:!bg-muted transition-colors rounded-xl px-2">
                  <SidebarMenuButton
                    size="lg"
                    onClick={handleNewChat}
                    className="flex-1 h-10 !bg-transparent cursor-pointer"
                  >
                    <div className="flex items-center gap-3 font-medium">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Plus className="h-4 w-4" />
                      </div>
                      <span>새 대화</span>
                    </div>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {/* Recent Conversations Section */}
          <SidebarGroup className="flex-1 min-h-0">
            <SidebarGroupLabel className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              최근 대화
            </SidebarGroupLabel>
            <SidebarGroupContent className="h-full">
              <SidebarMenu className="gap-1">
                {recentConversations.length > 0 ? (
                  recentConversations.map((conv) => (
                    <SidebarMenuItem key={conv.id} className="group">
                      {editingId === conv.id ? (
                        <div className="flex items-center gap-2 px-2 py-1">
                          <Input
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleRenameSubmit();
                              if (e.key === "Escape") handleRenameCancel();
                            }}
                            onBlur={handleRenameSubmit}
                            className="h-7 text-sm"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <div className="group flex items-center hover:!bg-muted transition-colors rounded-4xl px-2">
                          <SidebarMenuButton
                            isActive={currentConversationId === conv.id}
                            onClick={() => handleConversationClick(conv.id)}
                            className="flex-1 h-9 !bg-transparent min-w-0 overflow-hidden"
                          >
                            <div className="flex items-center gap-3 min-w-0 w-full">
                              <MessageSquare className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              <span className="text-sm truncate flex-1 text-left">
                                {conv.title}
                              </span>
                            </div>
                          </SidebarMenuButton>
                          
                          {/* Action Menu */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-all shrink-0 !bg-transparent hover:!bg-gray-700"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem onClick={() => handleRenameStart(conv)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                이름 변경
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(conv.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                삭제
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </SidebarMenuItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    대화 내역이 없습니다
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Footer - Settings only */}
          <div className="mt-auto pb-4 px-2">
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/settings"}
                  className="h-10 px-3 bg-transparent hover:bg-sidebar-accent/50 transition-colors rounded-lg"
                >
                  <Link to="/settings" className="flex items-center gap-3">
                    <Settings className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    <span className="text-sm font-medium">설정</span>
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
