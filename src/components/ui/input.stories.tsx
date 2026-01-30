import { Input } from "./input";

export default {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
};

export const Default = {
  render: () => <Input placeholder="입력하세요..." />,
};

export const Types = {
  render: () => (
    <div className="space-y-4 w-64">
      <Input type="text" placeholder="텍스트 입력" />
      <Input type="email" placeholder="이메일 입력" />
      <Input type="password" placeholder="비밀번호 입력" />
      <Input type="number" placeholder="숫자 입력" />
    </div>
  ),
};

export const Disabled = {
  render: () => <Input placeholder="비활성화된 입력" disabled />,
};

export const WithValue = {
  render: () => <Input defaultValue="기본 값" />,
};

