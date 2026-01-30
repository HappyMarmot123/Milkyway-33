import {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorList,
  ModelSelectorItem,
  ModelSelectorInput,
} from "./model-selector";
import { Button } from "@/components/ui/button";

export default {
  title: "AI Elements/ModelSelector",
  component: ModelSelector,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <ModelSelector>
      <ModelSelectorTrigger asChild>
        <Button variant="outline">모델 선택</Button>
      </ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput placeholder="모델 검색..." />
        <ModelSelectorList>
          <ModelSelectorItem value="gpt-4">GPT-4</ModelSelectorItem>
          <ModelSelectorItem value="gpt-3.5">GPT-3.5 Turbo</ModelSelectorItem>
          <ModelSelectorItem value="claude-3">Claude 3</ModelSelectorItem>
          <ModelSelectorItem value="gemini">Gemini Pro</ModelSelectorItem>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  ),
};

export const WithGroups = {
  render: () => (
    <ModelSelector>
      <ModelSelectorTrigger asChild>
        <Button variant="outline">모델 선택</Button>
      </ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput placeholder="모델 검색..." />
        <ModelSelectorList>
          <ModelSelectorItem value="gpt-4">GPT-4</ModelSelectorItem>
          <ModelSelectorItem value="gpt-3.5">GPT-3.5 Turbo</ModelSelectorItem>
          <ModelSelectorItem value="claude-3">Claude 3</ModelSelectorItem>
          <ModelSelectorItem value="gemini">Gemini Pro</ModelSelectorItem>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  ),
};

