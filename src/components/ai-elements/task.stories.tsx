import {
  Task,
  TaskTrigger,
  TaskItem,
  TaskContent,
} from "./task";

export default {
  title: "AI Elements/Task",
  component: Task,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Task>
      <TaskTrigger title="작업 제목">
        <TaskContent>
          <TaskItem>작업 설명이 여기에 표시됩니다.</TaskItem>
          <TaskItem>추가 작업 항목입니다.</TaskItem>
        </TaskContent>
      </TaskTrigger>
    </Task>
  ),
};

export const Closed = {
  render: () => (
    <Task defaultOpen={false}>
      <TaskTrigger title="접혀있는 작업">
        <TaskContent>
          <TaskItem>이 작업은 기본적으로 접혀있습니다.</TaskItem>
        </TaskContent>
      </TaskTrigger>
    </Task>
  ),
};

export const MultipleTasks = {
  render: () => (
    <div className="space-y-2">
      <Task>
        <TaskTrigger title="작업 1">
          <TaskContent>
            <TaskItem>첫 번째 작업 항목</TaskItem>
          </TaskContent>
        </TaskTrigger>
      </Task>
      <Task>
        <TaskTrigger title="작업 2">
          <TaskContent>
            <TaskItem>두 번째 작업 항목</TaskItem>
          </TaskContent>
        </TaskTrigger>
      </Task>
    </div>
  ),
};

