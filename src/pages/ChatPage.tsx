import { useState } from "react";
import ChatBot from "@/components/ChatBot";
import { TokenUsage } from "@/components/features/TokenUsage";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { ChatMetadata } from "@/features/chat/types";

export function ChatPage() {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [lastMetadata, setLastMetadata] = useState<ChatMetadata | null>(null);

  // Convert our metadata format to TokenUsage format
  const tokenUsage = lastMetadata?.usage_metadata ? {
    inputTokens: lastMetadata.usage_metadata.prompt_token_count || 0,
    outputTokens: lastMetadata.usage_metadata.candidates_token_count || 0,
  } : null;

  const handleMetadataUpdate = (metadata: ChatMetadata) => {
    setLastMetadata(metadata);
  };

  return (
    <main aria-label="chat-page" className="flex flex-col h-full bg-lightgray">
      <section aria-label="chat-interface" className="flex-1 overflow-hidden">
        <ChatBot onMetadataUpdate={handleMetadataUpdate} />
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
              {lastMetadata && (
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Model: {lastMetadata.model_used}</p>
                  {lastMetadata.finish_reason && (
                    <p>Finish: {lastMetadata.finish_reason}</p>
                  )}
                </div>
              )}
              {tokenUsage && (
                <TokenUsage
                  usage={tokenUsage}
                  maxTokens={1000000}
                  modelId="gemini-2.5-flash-lite"
                />
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </aside>

      {/* 데스크톱: 항상 표시 */}
      <aside 
        aria-label="chat-info-desktop" 
        className="hidden lg:block p-4 bg-muted/30"
      >
        <div className="flex items-center gap-4">
          {lastMetadata && (
            <div className="text-xs text-muted-foreground flex gap-4">
              <span>Model: {lastMetadata.model_used}</span>
              {lastMetadata.usage_metadata?.total_token_count && (
                <span>Tokens: {lastMetadata.usage_metadata.total_token_count.toLocaleString()}</span>
              )}
              {lastMetadata.finish_reason && (
                <span>Status: {lastMetadata.finish_reason}</span>
              )}
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}
