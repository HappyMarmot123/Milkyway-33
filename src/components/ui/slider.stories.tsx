import { Slider } from "./slider";

export default {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
};

export const Default = {
  render: () => <Slider defaultValue={[50]} max={100} step={1} />,
};

export const Range = {
  render: () => <Slider defaultValue={[20, 80]} max={100} step={1} />,
};

export const WithSteps = {
  render: () => <Slider defaultValue={[50]} max={100} step={10} />,
};

export const Disabled = {
  render: () => <Slider defaultValue={[50]} max={100} disabled />,
};

