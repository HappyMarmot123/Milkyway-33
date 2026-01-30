import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from "./tool";

export default {
  title: "AI Elements/Tool",
  component: Tool,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Tool>
      <ToolHeader
        title="도구 이름"
        type="tool-example"
        state="output-available"
      />
      <ToolContent>
        <p className="p-4">도구 실행 결과가 여기에 표시됩니다.</p>
      </ToolContent>
    </Tool>
  ),
};

export const WithInput = {
  render: () => (
    <Tool>
      <ToolHeader
        title="검색 도구"
        type="tool-search"
        state="output-available"
      />
      <ToolContent>
        <ToolInput input={{ query: "React Storybook", limit: 10 }} />
        <ToolOutput output="검색 결과가 여기에 표시됩니다." />
      </ToolContent>
    </Tool>
  ),
};

export const Pending = {
  render: () => (
    <Tool>
      <ToolHeader
        title="대기 중인 도구"
        type="tool-example"
        state="input-streaming"
      />
      <ToolContent>
        <p className="p-4">도구가 실행을 기다리고 있습니다...</p>
      </ToolContent>
    </Tool>
  ),
};

export const Running = {
  render: () => (
    <Tool>
      <ToolHeader
        title="실행 중인 도구"
        type="tool-example"
        state="input-available"
      />
      <ToolContent>
        <p className="p-4">도구가 실행 중입니다...</p>
      </ToolContent>
    </Tool>
  ),
};

export const Error = {
  render: () => (
    <Tool>
      <ToolHeader
        title="오류가 발생한 도구"
        type="tool-example"
        state="output-error"
      />
      <ToolContent>
        <ToolOutput
          output={null}
          errorText="도구 실행 중 오류가 발생했습니다."
        />
      </ToolContent>
    </Tool>
  ),
};

