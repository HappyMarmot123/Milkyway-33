import { useState } from "react";
import { ChatHistory } from "@/components/features/ChatHistory";
import { ConversationExport } from "@/components/features/ConversationExport";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Trash2 } from "lucide-react";

export function HistoryPage() {
  const [conversations, setConversations] = useState([
    {
      id: "1",
      title: "React 질문",
      createdAt: new Date().toISOString(),
      messages: [],
    },
    {
      id: "2",
      title: "Python 학습",
      createdAt: new Date().toISOString(),
      messages: [],
    },
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  const handleDelete = (id) => {
    setConversations(conversations.filter((c) => c.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleRename = (id, newTitle) => {
    setConversations(
      conversations.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
  };

  return (
    <main aria-label="history-page" className="container mx-auto p-4 sm:p-6 max-w-6xl">
      <div className="space-y-4 sm:space-y-6">
        <header aria-label="page-header">
          <h1 className="text-2xl sm:text-3xl font-bold">대화 히스토리</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            이전 대화를 검색하고 관리하세요.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <nav aria-label="history-navigation" className="md:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">대화 목록</CardTitle>
                <CardDescription className="text-sm">
                  {filteredConversations.length}개의 대화
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChatHistory
                  conversations={filteredConversations}
                  onSelect={setSelectedId}
                  onDelete={handleDelete}
                  onRename={handleRename}
                />
              </CardContent>
            </Card>
          </nav>

          <article aria-label="conversation-detail" className="md:col-span-1 lg:col-span-2">
            {selectedConversation ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedConversation.title}</CardTitle>
                      <CardDescription>
                        {new Date(selectedConversation.createdAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <ConversationExport conversation={selectedConversation} />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(selectedConversation.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        삭제
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedConversation.messages?.length > 0 ? (
                      selectedConversation.messages.map((msg, idx) => (
                        <article
                          aria-label="message-item"
                          key={idx}
                          className={`p-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-secondary ml-auto max-w-[80%]"
                              : "bg-muted"
                          }`}
                        >
                          <div className="text-sm font-medium mb-1">
                            {msg.role === "user" ? "사용자" : "어시스턴트"}
                          </div>
                          <div className="text-sm">{msg.content}</div>
                        </article>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        이 대화에는 메시지가 없습니다.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">
                    대화를 선택하여 내용을 확인하세요.
                  </p>
                </CardContent>
              </Card>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}

