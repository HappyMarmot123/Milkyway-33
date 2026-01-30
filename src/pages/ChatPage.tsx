import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import ChatBot from "@/components/ChatBot";
import { TokenUsage } from "@/components/features/TokenUsage";
import { ConversationExport } from "@/components/features/ConversationExport";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function ChatPage() {
  const [model, setModel] = useState("openai/gpt-4o");
  const { messages, status } = useChat();
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  // 토큰 사용량 계산 (메시지 텍스트 길이 기반 추정)
  const calculateTokens = (text) => {
    // 대략적인 추정: 1 토큰 ≈ 4자 (한글/영문 혼합)
    return Math.ceil(text.length / 4);
  };

  const totalUsage = messages.reduce(
    (acc, msg) => {
      const text = msg.parts?.find((p) => p.type === "text")?.text || "";
      const tokens = calculateTokens(text);

      if (msg.role === "user") {
        return { ...acc, inputTokens: acc.inputTokens + tokens };
      } else {
        return { ...acc, outputTokens: acc.outputTokens + tokens };
      }
    },
    { inputTokens: 0, outputTokens: 0 }
  );

  const currentConversation = {
    id: "current",
    title: "현재 대화",
    createdAt: new Date().toISOString(),
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.parts?.find((p) => p.type === "text")?.text || "",
    })),
  };

  return (
    <main aria-label="chat-page" className="flex flex-col h-full">
      <section aria-label="chat-interface" className="flex-1 overflow-hidden">
        <ChatBot />
      </section>

      <Separator />

      {/* 모바일: 접을 수 있는 패널 */}
      <aside aria-label="chat-info-mobile" className="lg:hidden bg-muted/50">
        <Collapsible open={isInfoExpanded} onOpenChange={setIsInfoExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between px-4 py-3 h-auto"
            >
              <span className="text-sm font-semibold">대화 정보</span>
              {isInfoExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <ConversationExport conversation={currentConversation} />
              </div>
              <TokenUsage
                usage={totalUsage}
                maxTokens={100000}
                modelId={model}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </aside>


    </main>
  );
}

