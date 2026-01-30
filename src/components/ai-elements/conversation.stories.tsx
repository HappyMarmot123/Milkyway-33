import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "./conversation";
import { Message, MessageContent, MessageResponse } from "./message";

export default {
  title: "AI Elements/Conversation",
  component: Conversation,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <div className="h-[400px] border rounded-lg">
      <Conversation>
        <ConversationContent>
          <Message from="user">
            <MessageContent>
              <MessageResponse>안녕하세요!</MessageResponse>
            </MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>
              <MessageResponse>안녕하세요! 무엇을 도와드릴까요?</MessageResponse>
            </MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  ),
};

export const Empty = {
  render: () => (
    <div className="h-[400px] border rounded-lg">
      <Conversation>
        <ConversationContent>
          <ConversationEmptyState
            title="대화가 없습니다"
            description="새로운 대화를 시작해보세요"
          />
        </ConversationContent>
      </Conversation>
    </div>
  ),
};

export const WithCustomEmptyState = {
  render: () => (
    <div className="h-[400px] border rounded-lg">
      <Conversation>
        <ConversationContent>
          <ConversationEmptyState>
            <div className="space-y-2">
              <h3 className="font-semibold">시작하기</h3>
              <p className="text-sm text-muted-foreground">
                첫 메시지를 입력하여 대화를 시작하세요
              </p>
            </div>
          </ConversationEmptyState>
        </ConversationContent>
      </Conversation>
    </div>
  ),
};

