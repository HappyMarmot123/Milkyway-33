import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
  ChainOfThoughtContent,
  ChainOfThoughtSearchResults,
  ChainOfThoughtSearchResult,
} from "./chain-of-thought";

export default {
  title: "AI Elements/ChainOfThought",
  component: ChainOfThought,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <ChainOfThought>
      <ChainOfThoughtHeader>사고 과정</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep
          label="문제 분석"
          description="사용자의 요구사항을 분석합니다"
          status="complete"
        />
        <ChainOfThoughtStep
          label="해결책 탐색"
          description="가능한 해결책들을 탐색합니다"
          status="active"
        />
        <ChainOfThoughtStep
          label="최종 결정"
          description="최적의 해결책을 선택합니다"
          status="pending"
        />
      </ChainOfThoughtContent>
    </ChainOfThought>
  ),
};

export const Closed = {
  render: () => (
    <ChainOfThought defaultOpen={false}>
      <ChainOfThoughtHeader>사고 과정</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep
          label="문제 분석"
          description="사용자의 요구사항을 분석합니다"
          status="complete"
        />
        <ChainOfThoughtStep
          label="해결책 탐색"
          description="가능한 해결책들을 탐색합니다"
          status="active"
        />
      </ChainOfThoughtContent>
    </ChainOfThought>
  ),
};

export const WithSearchResults = {
  render: () => (
    <ChainOfThought>
      <ChainOfThoughtHeader>검색 결과</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep
          label="검색 수행"
          description="관련 정보를 검색합니다"
          status="complete"
        >
          <ChainOfThoughtSearchResults>
            <ChainOfThoughtSearchResult>React</ChainOfThoughtSearchResult>
            <ChainOfThoughtSearchResult>Storybook</ChainOfThoughtSearchResult>
            <ChainOfThoughtSearchResult>Vite</ChainOfThoughtSearchResult>
          </ChainOfThoughtSearchResults>
        </ChainOfThoughtStep>
        <ChainOfThoughtStep
          label="결과 분석"
          description="검색 결과를 분석합니다"
          status="active"
        />
      </ChainOfThoughtContent>
    </ChainOfThought>
  ),
};
