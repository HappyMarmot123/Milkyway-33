import { useState, useCallback } from 'react';
import { streamChat } from '@/api/chat';
import type { 
  ChatMessage, 
  ChatMetadata, 
  ChatState
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
  });

  const setStatus = useCallback((status: ChatState['status']) => {
    setState(prev => ({ ...prev, status }));
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

      for await (const event of streamChat(content)) {
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
  }, [state.status, setStatus]);

  const clearMessages = useCallback(() => {
    setState({
      status: 'idle',
      messages: [],
      currentResponse: '',
      currentMetadata: null,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  return {
    // State
    status: state.status,
    messages: state.messages,
    currentResponse: state.currentResponse,
    currentMetadata: state.currentMetadata,
    error: state.error,
    isLoading: state.status !== 'idle',
    
    // Actions
    sendMessage,
    clearMessages,
    clearError,
    setError, // Exposed for external use/testing
  };
}
