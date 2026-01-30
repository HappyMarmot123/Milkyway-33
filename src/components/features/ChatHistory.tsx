import { useState } from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatHistory({ conversations = [], onSelect, onDelete, onRename }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleRename = (id, currentName) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleSaveRename = (id) => {
    if (onRename && editName.trim()) {
      onRename(id, editName.trim());
    }
    setEditingId(null);
    setEditName("");
  };

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        대화 히스토리가 없습니다.
      </div>
    );
  }

  return (
    <SidebarMenu>
      {conversations.map((conversation) => (
        <SidebarMenuItem key={conversation.id}>
          <div className="group flex items-center gap-2">
            {editingId === conversation.id ? (
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleSaveRename(conversation.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveRename(conversation.id);
                    } else if (e.key === "Escape") {
                      setEditingId(null);
                      setEditName("");
                    }
                  }}
                  className="flex-1 px-2 py-1 text-sm border rounded"
                  autoFocus
                />
              </div>
            ) : (
              <>
                <SidebarMenuButton
                  onClick={() => onSelect?.(conversation.id)}
                  className="flex-1 justify-start"
                >
                  {conversation.title || "제목 없음"}
                </SidebarMenuButton>
                <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleRename(conversation.id, conversation.title)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onDelete?.(conversation.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

