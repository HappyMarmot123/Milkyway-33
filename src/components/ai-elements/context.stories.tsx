import {
  Context,
  ContextTrigger,
  ContextContent,
  ContextContentHeader,
  ContextContentBody,
  ContextContentFooter,
  ContextInputUsage,
  ContextOutputUsage,
} from "./context";

export default {
  title: "AI Elements/Context",
  component: Context,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Context usedTokens={5000} maxTokens={10000} modelId="gpt-4">
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
      </ContextContent>
    </Context>
  ),
};

export const WithUsageDetails = {
  render: () => (
    <Context
      usedTokens={7500}
      maxTokens={10000}
      modelId="gpt-4"
      usage={{
        inputTokens: 3000,
        outputTokens: 4500,
      }}
    >
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody>
          <ContextInputUsage />
          <ContextOutputUsage />
        </ContextContentBody>
        <ContextContentFooter />
      </ContextContent>
    </Context>
  ),
};

export const HighUsage = {
  render: () => (
    <Context usedTokens={9500} maxTokens={10000} modelId="gpt-4">
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
      </ContextContent>
    </Context>
  ),
};

export const LowUsage = {
  render: () => (
    <Context usedTokens={500} maxTokens={10000} modelId="gpt-4">
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
      </ContextContent>
    </Context>
  ),
};

