import { Checkbox } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export const Default = {
  render: () => <Checkbox />,
};

export const Checked = {
  render: () => <Checkbox defaultChecked />,
};

export const WithLabel = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm">이용약관에 동의합니다</label>
    </div>
  ),
};

export const Multiple = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" />
        <Label htmlFor="option1">옵션 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" defaultChecked />
        <Label htmlFor="option2">옵션 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" />
        <Label htmlFor="option3">옵션 3</Label>
      </div>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox disabled />
        <Label>비활성화됨</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox disabled defaultChecked />
        <Label>비활성화됨 (체크됨)</Label>
      </div>
    </div>
  ),
};

