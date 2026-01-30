import { Shimmer } from "./shimmer";

export default {
  title: "AI Elements/Shimmer",
  component: Shimmer,
  tags: ["autodocs"],
};

export const Default = {
  render: () => <Shimmer>로딩 중인 텍스트 애니메이션</Shimmer>,
};

export const LongText = {
  render: () => (
    <Shimmer>
      이것은 더 긴 텍스트 예시입니다. Shimmer 애니메이션이 텍스트 길이에 따라
      동적으로 조정됩니다.
    </Shimmer>
  ),
};

export const CustomDuration = {
  render: () => (
    <Shimmer duration={1}>
      빠른 애니메이션 (1초)
    </Shimmer>
  ),
};

export const AsHeading = {
  render: () => (
    <Shimmer as="h2">
      제목으로 사용되는 Shimmer
    </Shimmer>
  ),
};

