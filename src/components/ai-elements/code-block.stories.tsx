import {
  CodeBlock,
  CodeBlockCopyButton,
} from "./code-block";

export default {
  title: "AI Elements/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <CodeBlock code="const hello = 'world';" language="javascript" />
  ),
};

export const WithLineNumbers = {
  render: () => (
    <CodeBlock
      code={`function greet(name) {
  return \`Hello, \${name}!\`;
}

greet('World');`}
      language="javascript"
      showLineNumbers={true}
    />
  ),
};

export const WithCopyButton = {
  render: () => (
    <CodeBlock code="const example = 'code';" language="javascript">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
};

export const Python = {
  render: () => (
    <CodeBlock
      code={`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`}
      language="python"
    />
  ),
};

export const JSON = {
  render: () => (
    <CodeBlock
      code={`{
  "name": "example",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  }
}`}
      language="json"
    />
  ),
};

