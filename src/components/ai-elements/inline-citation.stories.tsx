import {
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationSource,
} from "./inline-citation";

export default {
  title: "AI Elements/InlineCitation",
  component: InlineCitation,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <p>
      이것은{" "}
      <InlineCitation>
        <InlineCitationText>인라인 인용</InlineCitationText>
      </InlineCitation>{" "}
      예시입니다.
    </p>
  ),
};

export const WithHoverCard = {
  render: () => (
    <p>
      이것은{" "}
      <InlineCitationCard>
        <InlineCitation>
          <InlineCitationText>인라인 인용</InlineCitationText>
          <InlineCitationCardTrigger sources={["https://example.com"]} />
        </InlineCitation>
        <InlineCitationCardBody>
          <InlineCitationSource
            title="예시 문서"
            url="https://example.com"
            description="이것은 예시 문서입니다."
          />
        </InlineCitationCardBody>
      </InlineCitationCard>{" "}
      예시입니다.
    </p>
  ),
};

export const WithMultipleSources = {
  render: () => (
    <p>
      이것은{" "}
      <InlineCitationCard>
        <InlineCitation>
          <InlineCitationText>다중 소스 인용</InlineCitationText>
          <InlineCitationCardTrigger
            sources={[
              "https://example.com",
              "https://example2.com",
              "https://example3.com",
            ]}
          />
        </InlineCitation>
        <InlineCitationCardBody>
          <InlineCitationCarousel>
            <InlineCitationCarouselContent>
              <InlineCitationCarouselItem>
                <InlineCitationSource
                  title="예시 문서 1"
                  url="https://example.com"
                />
              </InlineCitationCarouselItem>
              <InlineCitationCarouselItem>
                <InlineCitationSource
                  title="예시 문서 2"
                  url="https://example2.com"
                />
              </InlineCitationCarouselItem>
              <InlineCitationCarouselItem>
                <InlineCitationSource
                  title="예시 문서 3"
                  url="https://example3.com"
                />
              </InlineCitationCarouselItem>
            </InlineCitationCarouselContent>
          </InlineCitationCarousel>
        </InlineCitationCardBody>
      </InlineCitationCard>{" "}
      예시입니다.
    </p>
  ),
};

