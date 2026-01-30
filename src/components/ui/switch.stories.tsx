import { Switch } from "./switch";

export default {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
};

export const Default = {
  render: () => <Switch />,
};

export const Checked = {
  render: () => <Switch defaultChecked />,
};

export const WithLabel = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm">에어플레인 모드</label>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Switch disabled />
      <Switch disabled defaultChecked />
    </div>
  ),
};

