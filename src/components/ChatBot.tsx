"use client";
import { useState, useEffect } from "react";
import { CopyIcon, RefreshCcwIcon, InfoIcon } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Loader } from "@/components/ai-elements/loader";
import { useChat } from "@/hooks/useChat";
import type { ChatMetadata } from "@/features/chat/types";

interface ChatBotProps {
  onMetadataUpdate?: (metadata: ChatMetadata) => void;
}

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

// Metadata display component
const MetadataDisplay = ({ metadata }: { metadata: ChatMetadata | null }) => {
  if (!metadata) return null;
  
  const usage = metadata.usage_metadata;
  
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      {metadata.model_used && (
        <span className="bg-muted px-2 py-0.5 rounded">
          {metadata.model_used}
        </span>
      )}
      {usage?.total_token_count && (
        <span>
          Tokens: {usage.total_token_count.toLocaleString()}
        </span>
      )}
      {metadata.finish_reason && (
        <span className={
          metadata.finish_reason.includes("STOP") 
            ? "text-green-400" 
            : "text-yellow-400"
        }>
          {metadata.finish_reason.replace("FinishReason.", "")}
        </span>
      )}
    </div>
  );
};

const ChatBot = ({ onMetadataUpdate }: ChatBotProps) => {
  const [input, setInput] = useState("");
  const { 
    messages, 
    status, 
    currentResponse, 
    currentMetadata,
    sendMessage,
    clearMessages,
  } = useChat();

  // Notify parent when metadata changes
  useEffect(() => {
    if (onMetadataUpdate && currentMetadata) {
      onMetadataUpdate(currentMetadata);
    }
  }, [currentMetadata, onMetadataUpdate]);

  const handleSubmit = (message: { text?: string }) => {
    const text = message.text || input;
    if (!text.trim()) return;
    
    sendMessage(text);
    setInput("");
  };

  // Map our status to the expected format
  const getSubmitStatus = () => {
    switch (status) {
      case 'thinking': return 'submitted';
      case 'generating': return 'streaming';
      case 'streaming': return 'streaming';
      default: return 'ready';
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <StatusBadge status={status} />
        <MetadataDisplay metadata={currentMetadata} />
      </div>

      <Conversation className="flex-1 min-h-0 overflow-hidden">
        <ConversationContent>
          {messages.map((message) => (
            <div key={message.id}>
              {/* Show reasoning/thought if available */}
              {message.role === "assistant" && message.metadata?.thought && (
                <Reasoning className="w-full" isStreaming={false}>
                  <ReasoningTrigger />
                  <ReasoningContent>{message.metadata.thought}</ReasoningContent>
                </Reasoning>
              )}
              
              <Message from={message.role}>
                <MessageContent>
                  <MessageResponse>{message.content}</MessageResponse>
                </MessageContent>
                {message.role === "assistant" && (
                  <MessageActions className="">
                    <MessageAction
                      onClick={() => navigator.clipboard.writeText(message.content)}
                      label="Copy"
                      tooltip="Copy message"
                    >
                      <CopyIcon className="size-3" />
                    </MessageAction>
                    {message.metadata?.usage_metadata && (
                      <MessageAction
                        onClick={() => {
                          const usage = message.metadata?.usage_metadata;
                          alert(`Tokens Used:\n- Prompt: ${usage?.prompt_token_count}\n- Response: ${usage?.candidates_token_count}\n- Total: ${usage?.total_token_count}`);
                        }}
                        label="Info"
                        tooltip="Show token usage"
                      >
                        <InfoIcon className="size-3" />
                      </MessageAction>
                    )}
                  </MessageActions>
                )}
              </Message>
            </div>
          ))}

          {/* Show status-specific loader */}
          {status === 'thinking' && (
            <Loader variant="thinking" className="" />
          )}
          
          {status === 'generating' && (
            <Loader variant="generating" className="" />
          )}
          
          {status === 'streaming' && currentResponse && (
            <Message from="assistant">
              <MessageContent>
                <MessageResponse>{currentResponse}</MessageResponse>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="flex-shrink-0 border-t">
        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4"
        >
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e: any) => setInput(e.target.value)}
              value={input}
              placeholder="메시지를 입력하세요..."
              onKeyDown={(e: any) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit({ text: input });
                }
              }}
              className=""
            />
          </PromptInputBody>
          <PromptInputFooter className="">
            <PromptInputTools>
              <PromptInputButton
                variant="ghost"
                onClick={clearMessages}
                disabled={messages.length === 0}
                label="Clear"
                tooltip="Clear conversation"
              >
                <RefreshCcwIcon size={16} />
                <span>Clear</span>
              </PromptInputButton>
              <span className="text-xs text-muted-foreground ml-2">
                Gemini 2.5 Flash-Lite
              </span>
            </PromptInputTools>
            <PromptInputSubmit 
              disabled={!input.trim() && status === 'idle'} 
              status={getSubmitStatus()} 
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatBot;
