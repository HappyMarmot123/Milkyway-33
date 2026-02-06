import { dexieInit } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';

const CONFIG_KEY = 'default_config';

export function useChatStorage(conversationId?: string) {
  const db = dexieInit();
  
  // Get all conversations (for sidebar)
  const conversations = useLiveQuery(
    () => db.conversations.orderBy('updatedAt').reverse().toArray(),
    []
  );

  // Get messages for a specific conversation
  const messages = useLiveQuery(
    () => {
      if (!conversationId) return [];
      return db.messages.where('conversationId').equals(conversationId).sortBy('timestamp');
    },
    [conversationId]
  );

  const settings = useLiveQuery(
    async () => {
      const result = await db.configs.get(CONFIG_KEY);
      return result?.config;
    },
    []
  );

  return {
    conversations: conversations || [],
    messages: messages || [],
    settings,
    isLoading: conversations === undefined || messages === undefined,
  };
}
