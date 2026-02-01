import { useState, useCallback } from 'react';
import { streamChat } from '@/api/chat';
import type { 
  ChatMessage, 
  ChatMetadata, 
  ChatState,
  ChatPromptConfig
} from '@/features/chat/types';

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function useChat() {
  const [state, setState] = useState<ChatState>({
    status: 'idle',
    messages: [],
    currentResponse: '',
    currentMetadata: null,
    error: null,
    promptConfig: {
      systemInstruction: '',
      examples: []
    }
  });

  const setStatus = useCallback((status: ChatState['status']) => {
    setState(prev => ({ ...prev, status }));
  }, []);

  const setPromptConfig = useCallback((config: Partial<ChatPromptConfig>) => {
    setState(prev => ({
      ...prev,
      promptConfig: { ...prev.promptConfig, ...config }
    }));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || state.status !== 'idle') return;

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      currentResponse: '',
      currentMetadata: null,
      error: null,
    }));

    try {
      let fullResponse = '';
      let metadata: ChatMetadata = {};

      for await (const event of streamChat(content, state.promptConfig)) {
        switch (event.status) {
          case 'thinking':
            setStatus('thinking');
            if (event.model) {
              metadata.model_used = event.model;
            }
            break;

          case 'generating':
            setStatus('generating');
            break;

          case 'streaming':
            setStatus('streaming');
            if (event.chunk) {
              fullResponse += event.chunk;
              setState(prev => ({
                ...prev,
                status: 'streaming',
                currentResponse: fullResponse,
              }));
            }
            break;

          case 'complete':
            metadata = {
              model_used: event.model_used,
              thought: event.thought,
              finish_reason: event.finish_reason,
              safety_ratings: event.safety_ratings,
              usage_metadata: event.usage_metadata,
            };

            // Add assistant message
            const assistantMessage: ChatMessage = {
              id: generateId(),
              role: 'assistant',
              content: fullResponse || event.response || '',
              timestamp: new Date(),
              metadata,
            };

            setState(prev => ({
              ...prev,
              status: 'idle',
              messages: [...prev.messages, assistantMessage],
              currentResponse: '',
              currentMetadata: metadata,
            }));
            break;

          case 'error':
            setState(prev => ({
              ...prev,
              status: 'idle',
              error: event.message || 'An error occurred',
            }));
            break;
        }
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        status: 'idle',
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  }, [state.status, state.promptConfig, setStatus]);

  const clearMessages = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: 'idle',
      messages: [],
      currentResponse: '',
      currentMetadata: null,
      error: null,
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const regenerateLastResponse = useCallback(() => {
    if (state.status !== 'idle' || state.messages.length === 0) return;

    // Find the last user message manually
    let lastUserMessageIndex = -1;
    for (let i = state.messages.length - 1; i >= 0; i--) {
      if (state.messages[i].role === 'user') {
        lastUserMessageIndex = i;
        break;
      }
    }
    if (lastUserMessageIndex === -1) return;

    const lastUserMessage = state.messages[lastUserMessageIndex];
    if (!lastUserMessage) return;

    // Let's optimize: We want to keep the conversation history EXCEPT the last exchange.
    const messagesToKeep = state.messages.slice(0, lastUserMessageIndex);

    setState(prev => ({
      ...prev,
      messages: messagesToKeep,
      currentResponse: '',
      currentMetadata: null,
      error: null,
    }));

    // Trigger sending the message again
    sendMessage(lastUserMessage.content);

  }, [state.messages, state.status, sendMessage]);

  return {
    // State
    status: state.status,
    messages: state.messages,
    currentResponse: state.currentResponse,
    currentMetadata: state.currentMetadata,
    error: state.error,
    isLoading: state.status !== 'idle',
    promptConfig: state.promptConfig,
    
    // Actions
    sendMessage,
    regenerateLastResponse, // Exposed for external use
    clearMessages,
    clearError,
    setError,
    setPromptConfig,
  };
};
