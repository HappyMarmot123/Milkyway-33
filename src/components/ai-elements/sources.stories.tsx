import {
  Sources,
  SourcesTrigger,
  SourcesContent,
  Source,
} from "./sources";

export default {
  title: "AI Elements/Sources",
  component: Sources,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Sources>
      <SourcesTrigger count={2} />
      <SourcesContent>
        <Source
          href="https://example.com/doc1"
          title="예시 문서 1"
        />
        <Source
          href="https://example.com/doc2"
          title="예시 문서 2"
        />
      </SourcesContent>
    </Sources>
  ),
};

export const Closed = {
  render: () => (
    <Sources defaultOpen={false}>
      <SourcesTrigger count={3} />
      <SourcesContent>
        <Source href="https://example.com/doc1" title="문서 1" />
        <Source href="https://example.com/doc2" title="문서 2" />
        <Source href="https://example.com/doc3" title="문서 3" />
      </SourcesContent>
    </Sources>
  ),
};

export const SingleSource = {
  render: () => (
    <Sources>
      <SourcesTrigger count={1} />
      <SourcesContent>
        <Source
          href="https://example.com/doc1"
          title="단일 문서"
        />
      </SourcesContent>
    </Sources>
  ),
};

export const ManySources = {
  render: () => (
    <Sources>
      <SourcesTrigger count={5} />
      <SourcesContent>
        <Source href="https://example.com/doc1" title="문서 1" />
        <Source href="https://example.com/doc2" title="문서 2" />
        <Source href="https://example.com/doc3" title="문서 3" />
        <Source href="https://example.com/doc4" title="문서 4" />
        <Source href="https://example.com/doc5" title="문서 5" />
      </SourcesContent>
    </Sources>
  ),
};

