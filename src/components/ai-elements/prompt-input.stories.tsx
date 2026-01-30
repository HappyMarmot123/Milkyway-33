import {
  PromptInput,
  PromptInputHeader,
  PromptInputAttachments,
  PromptInputAttachment,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputActionMenu,
  PromptInputActionMenuTrigger,
  PromptInputActionMenuContent,
  PromptInputActionAddAttachments,
  PromptInputSubmit,
  PromptInputSelect,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputButton,
} from "./prompt-input";
import { GlobeIcon } from "lucide-react";

export default {
  title: "AI Elements/PromptInput",
  component: PromptInput,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <div className="w-full max-w-2xl">
      <PromptInput onSubmit={(value) => console.log("Submitted:", value)}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="메시지를 입력하세요..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>
          </PromptInputTools>
          <PromptInputSubmit />
        </PromptInputFooter>
      </PromptInput>
    </div>
  ),
};

export const WithAttachments = {
  render: () => (
    <div className="w-full max-w-2xl">
      <PromptInput onSubmit={(value) => console.log("Submitted:", value)}>
        <PromptInputHeader>
          <PromptInputAttachments>
            {(attachment) => (
              <PromptInputAttachment data={attachment} />
            )}
          </PromptInputAttachments>
        </PromptInputHeader>
        <PromptInputBody>
          <PromptInputTextarea placeholder="메시지를 입력하세요..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>
          </PromptInputTools>
          <PromptInputSubmit />
        </PromptInputFooter>
      </PromptInput>
    </div>
  ),
};

export const WithModelSelector = {
  render: () => (
    <div className="w-full max-w-2xl">
      <PromptInput onSubmit={(value) => console.log("Submitted:", value)}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="메시지를 입력하세요..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputButton variant="ghost">
              <GlobeIcon size={16} />
              <span>Search</span>
            </PromptInputButton>
            <PromptInputSelect defaultValue="gpt-4">
              <PromptInputSelectTrigger>
                <PromptInputSelectValue />
              </PromptInputSelectTrigger>
              <PromptInputSelectContent>
                <PromptInputSelectItem value="gpt-4">GPT-4</PromptInputSelectItem>
                <PromptInputSelectItem value="gpt-3.5">GPT-3.5</PromptInputSelectItem>
                <PromptInputSelectItem value="claude">Claude</PromptInputSelectItem>
              </PromptInputSelectContent>
            </PromptInputSelect>
          </PromptInputTools>
          <PromptInputSubmit />
        </PromptInputFooter>
      </PromptInput>
    </div>
  ),
};

