import { Loader } from "./loader";

export default {
  title: "AI Elements/Loader",
  component: Loader,
  tags: ["autodocs"],
};

export const Default = {
  render: () => <Loader />,
};

export const WithCustomClassName = {
  render: () => <Loader className="p-8" />,
};

