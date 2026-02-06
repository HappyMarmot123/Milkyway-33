import { dexieInit } from '@/lib/db';
import { ChatMessage, ChatPromptConfig, Conversation } from '@/features/chat/types';

const CONFIG_KEY = 'default_config';
const TOKEN_USAGE_KEY = 'total_usage';

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export const chatRepository = {
  // Conversations
  async createConversation(title?: string): Promise<Conversation> {
    const db = dexieInit();
    const now = new Date();
    const conversation: Conversation = {
      id: `conv_${generateId()}`,
      title: title || '새 대화',
      createdAt: now,
      updatedAt: now,
    };
    await db.conversations.put(conversation);
    return conversation;
  },

  async getConversation(id: string): Promise<Conversation | undefined> {
    const db = dexieInit();
    return await db.conversations.get(id);
  },

  async getAllConversations(): Promise<Conversation[]> {
    const db = dexieInit();
    return await db.conversations.orderBy('updatedAt').reverse().toArray();
  },

  async updateConversation(id: string, updates: Partial<Conversation>): Promise<void> {
    const db = dexieInit();
    await db.conversations.update(id, { ...updates, updatedAt: new Date() });
  },

  async deleteConversation(id: string): Promise<void> {
    const db = dexieInit();
    // Delete all messages in this conversation
    await db.messages.where('conversationId').equals(id).delete();
    // Delete the conversation
    await db.conversations.delete(id);
  },

  // Messages
  async saveMessage(message: ChatMessage): Promise<void> {
    const db = dexieInit();
    await db.messages.put(message);
    // Update conversation's updatedAt
    await db.conversations.update(message.conversationId, { updatedAt: new Date() });
  },

  async getMessagesByConversation(conversationId: string): Promise<ChatMessage[]> {
    const db = dexieInit();
    return await db.messages.where('conversationId').equals(conversationId).sortBy('timestamp');
  },

  async deleteMessages(ids: string[]): Promise<void> {
    const db = dexieInit();
    await db.messages.bulkDelete(ids);
  },

  async clearConversationMessages(conversationId: string): Promise<void> {
    const db = dexieInit();
    await db.messages.where('conversationId').equals(conversationId).delete();
  },

  // Settings
  async saveSettings(config: ChatPromptConfig): Promise<void> {
    const db = dexieInit();
    await db.configs.put({
      id: CONFIG_KEY,
      config,
      updatedAt: new Date(),
    });
  },

  async getSettings(): Promise<ChatPromptConfig | null> {
    const db = dexieInit();
    const result = await db.configs.get(CONFIG_KEY);
    return result ? result.config : null;
  },

  // Token Usage
  async addTokenUsage(inputTokens: number, outputTokens: number): Promise<void> {
    const db = dexieInit();
    const existing = await db.tokenUsage.get(TOKEN_USAGE_KEY);
    
    if (existing) {
      await db.tokenUsage.update(TOKEN_USAGE_KEY, {
        inputTokens: existing.inputTokens + inputTokens,
        outputTokens: existing.outputTokens + outputTokens,
        updatedAt: new Date(),
      });
    } else {
      await db.tokenUsage.put({
        id: TOKEN_USAGE_KEY,
        inputTokens,
        outputTokens,
        updatedAt: new Date(),
      });
    }
  },

  async getTotalTokenUsage(): Promise<{ inputTokens: number; outputTokens: number }> {
    const db = dexieInit();
    const result = await db.tokenUsage.get(TOKEN_USAGE_KEY);
    return result 
      ? { inputTokens: result.inputTokens, outputTokens: result.outputTokens }
      : { inputTokens: 0, outputTokens: 0 };
  },

  async resetTokenUsage(): Promise<void> {
    const db = dexieInit();
    await db.tokenUsage.delete(TOKEN_USAGE_KEY);
  },
};
