import {
  Message,
  MessageContent,
  MessageActions,
  MessageAction,
  MessageResponse,
  MessageAttachment,
  MessageAttachments,
} from "./message";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";

export default {
  title: "AI Elements/Message",
  component: Message,
  tags: ["autodocs"],
};

export const UserMessage = {
  render: () => (
    <Message from="user">
      <MessageContent>
        <MessageResponse>안녕하세요! 이것은 사용자 메시지입니다.</MessageResponse>
      </MessageContent>
    </Message>
  ),
};

export const AssistantMessage = {
  render: () => (
    <Message from="assistant">
      <MessageContent>
        <MessageResponse>안녕하세요! 이것은 AI 어시스턴트 메시지입니다.</MessageResponse>
      </MessageContent>
    </Message>
  ),
};

export const WithActions = {
  render: () => (
    <Message from="assistant">
      <MessageContent>
        <MessageResponse>이 메시지에는 액션 버튼이 있습니다.</MessageResponse>
      </MessageContent>
      <MessageActions>
        <MessageAction
          onClick={() => console.log("Retry")}
          label="Retry"
          tooltip="다시 시도"
        >
          <RefreshCcwIcon className="size-3" />
        </MessageAction>
        <MessageAction
          onClick={() => navigator.clipboard.writeText("복사된 텍스트")}
          label="Copy"
          tooltip="복사"
        >
          <CopyIcon className="size-3" />
        </MessageAction>
      </MessageActions>
    </Message>
  ),
};

export const WithAttachments = {
  render: () => (
    <Message from="user">
      <MessageAttachments>
        <MessageAttachment
          data={{
            filename: "image.jpg",
            url: "https://via.placeholder.com/100",
            mediaType: "image/jpeg",
          }}
        />
        <MessageAttachment
          data={{
            filename: "document.pdf",
            mediaType: "application/pdf",
          }}
        />
      </MessageAttachments>
      <MessageContent>
        <MessageResponse>첨부 파일이 있는 메시지입니다.</MessageResponse>
      </MessageContent>
    </Message>
  ),
};

