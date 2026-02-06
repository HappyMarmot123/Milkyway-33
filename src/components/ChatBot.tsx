import { useState, useEffect } from "react";
import { RefreshCcwIcon, Settings2 } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
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
import { ErrorModal } from "@/components/features/ErrorModal";
import { ResponseActionContainer } from "@/components/features/ResponseActionContainer";
import { PromptConfigModal } from "@/components/features/PromptConfigModal";
import { useChatContext } from "@/contexts/ChatContext";
import type { ChatMetadata } from "@/features/chat/types";

interface ChatBotProps {
  onMetadataUpdate?: (metadata: ChatMetadata) => void;
}

const ChatBot = ({ onMetadataUpdate }: ChatBotProps) => {
  const [input, setInput] = useState("");
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const { 
    messages, 
    status, 
    currentResponse, 
    currentMetadata,
    sendMessage,
    regenerateLastResponse,
    clearMessages,
    error,
    clearError,
    setError,
    promptConfig,
    setPromptConfig,
  } = useChatContext();

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
      <Conversation className="flex-1 min-h-0 overflow-hidden">
        <ConversationContent>
          {messages.map((message, index) => (
            <div key={message.id}>
              {/* Show reasoning/thought if available */}
              {message.role === "assistant" && message.metadata?.thought && (
                <Reasoning className="w-full" isStreaming={false}>
                  <ReasoningTrigger />
                  <ReasoningContent>{message.metadata.thought}</ReasoningContent>
                </Reasoning>
              )}
              
              <Message from={message.role} className="">
                <MessageContent>
                  <MessageResponse>{message.content}</MessageResponse>
                </MessageContent>
                {message.role === "assistant" && (
                  <ResponseActionContainer 
                    content={message.content}
                    onRegenerate={() => {
                      if (index === messages.length - 1) {
                         regenerateLastResponse();
                      }
                    }}
                  />
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
            <Message from="assistant" className="">
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
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
              value={input}
              placeholder="메시지를 입력하세요..."
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

              <div className="w-px h-4 bg-border mx-1" />

              <PromptInputButton
                variant="ghost"
                size="sm"
                onClick={() => setIsConfigOpen(true)}
                label="Prompt Settings"
                tooltip="Configure System Instruction & Few-shot"
                className={promptConfig.systemInstruction || (promptConfig.examples?.length || 0) > 0 ? "text-primary/80" : ""}
              >
                <Settings2 size={16} />
                <span>Settings</span>
              </PromptInputButton>

              <span className="text-xs text-muted-foreground ml-2">
                Gemini 2.5 Flash-Lite
              </span>
            </PromptInputTools>
            
            {/* DEV: Error Simulation Buttons (Restore for testing) */}
            <div className="flex gap-2 mr-4 opacity-80 hover:opacity-100 transition-opacity">
               <button 
                 onClick={() => setError("429 RESOURCE_EXHAUSTED: Quota exceeded test")}
                 className="text-[10px] bg-red-500/30 text-red-400 border border-red-500/50 px-2 py-1 rounded hover:bg-red-500/50 transition-colors"
                 title="Simulate 429 Error"
               >
                 Err 429
               </button>
               <button 
                 onClick={() => setError("500 INTERNAL_SERVER_ERROR test")}
                 className="text-[10px] bg-orange-500/30 text-orange-400 border border-orange-500/50 px-2 py-1 rounded hover:bg-orange-500/50 transition-colors"
                 title="Simulate 500 Error"
               >
                 Err 500
               </button>
            </div>
            
            <PromptInputSubmit 
              disabled={!input.trim() && status === 'idle'} 
              status={getSubmitStatus()} 
            />
          </PromptInputFooter>
        </PromptInput>
      </div>

      <ErrorModal 
        error={error} 
        onClose={clearError}
        onRetry={() => {
          clearError();
        }}
      />

      <PromptConfigModal 
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={promptConfig}
        onSave={(newConfig) => setPromptConfig(newConfig)}
      />
    </div>
  );
};

export default ChatBot;
