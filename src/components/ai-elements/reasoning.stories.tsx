import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "./reasoning";

export default {
  title: "AI Elements/Reasoning",
  component: Reasoning,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Reasoning>
      <ReasoningTrigger />
      <ReasoningContent>
        <p>첫 번째 추론 단계입니다.</p>
        <p>두 번째 추론 단계입니다.</p>
        <p>세 번째 추론 단계입니다.</p>
      </ReasoningContent>
    </Reasoning>
  ),
};

export const Closed = {
  render: () => (
    <Reasoning defaultOpen={false}>
      <ReasoningTrigger />
      <ReasoningContent>
        <p>접혀있는 추론 내용입니다.</p>
      </ReasoningContent>
    </Reasoning>
  ),
};

export const Streaming = {
  render: () => (
    <Reasoning isStreaming={true}>
      <ReasoningTrigger />
      <ReasoningContent>
        <p>추론이 진행 중입니다...</p>
      </ReasoningContent>
    </Reasoning>
  ),
};

