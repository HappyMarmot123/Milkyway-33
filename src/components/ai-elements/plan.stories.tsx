import {
  Plan,
  PlanHeader,
  PlanTitle,
  PlanDescription,
  PlanContent,
  PlanTrigger,
} from "./plan";

export default {
  title: "AI Elements/Plan",
  component: Plan,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Plan>
      <PlanHeader>
        <PlanTitle>작업 계획</PlanTitle>
        <PlanDescription>
          이 작업을 완료하기 위한 단계별 계획입니다.
        </PlanDescription>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <p>1. 첫 번째 단계 완료</p>
        <p>2. 두 번째 단계 진행 중</p>
        <p>3. 세 번째 단계 대기 중</p>
      </PlanContent>
    </Plan>
  ),
};

export const Closed = {
  render: () => (
    <Plan defaultOpen={false}>
      <PlanHeader>
        <PlanTitle>작업 계획</PlanTitle>
        <PlanDescription>
          접혀있는 계획입니다.
        </PlanDescription>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <p>1. 첫 번째 단계</p>
        <p>2. 두 번째 단계</p>
        <p>3. 세 번째 단계</p>
      </PlanContent>
    </Plan>
  ),
};

export const Streaming = {
  render: () => (
    <Plan isStreaming={true}>
      <PlanHeader>
        <PlanTitle>작업 계획 생성 중...</PlanTitle>
        <PlanDescription>
          계획을 생성하고 있습니다.
        </PlanDescription>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <p>계획이 생성되는 중입니다...</p>
      </PlanContent>
    </Plan>
  ),
};

