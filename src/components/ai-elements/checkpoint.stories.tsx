import {
  Checkpoint,
  CheckpointIcon,
  CheckpointTrigger,
} from "./checkpoint";

export default {
  title: "AI Elements/Checkpoint",
  component: Checkpoint,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Checkpoint>
      <CheckpointIcon />
      <CheckpointTrigger tooltip="체크포인트로 돌아가기">
        체크포인트 1
      </CheckpointTrigger>
    </Checkpoint>
  ),
};

export const WithoutTooltip = {
  render: () => (
    <Checkpoint>
      <CheckpointIcon />
      <CheckpointTrigger>체크포인트 2</CheckpointTrigger>
    </Checkpoint>
  ),
};

export const CustomIcon = {
  render: () => (
    <Checkpoint>
      <CheckpointIcon>
        <span className="size-4">📍</span>
      </CheckpointIcon>
      <CheckpointTrigger tooltip="사용자 정의 아이콘">
        체크포인트 3
      </CheckpointTrigger>
    </Checkpoint>
  ),
};

