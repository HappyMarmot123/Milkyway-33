import { RadioGroup, RadioGroupItem } from "./radio-group";

export default {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <label htmlFor="option1" className="text-sm">옵션 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">옵션 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">옵션 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal = {
  render: () => (
    <RadioGroup defaultValue="option1" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="h-option1" />
        <Label htmlFor="h-option1">옵션 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="h-option2" />
        <Label htmlFor="h-option2">옵션 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="h-option3" />
        <Label htmlFor="h-option3">옵션 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled = {
  render: () => (
    <RadioGroup defaultValue="option1" disabled>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="d-option1" />
        <Label htmlFor="d-option1">옵션 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="d-option2" />
        <Label htmlFor="d-option2">옵션 2</Label>
      </div>
    </RadioGroup>
  ),
};

