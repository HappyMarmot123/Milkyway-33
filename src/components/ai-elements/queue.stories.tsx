import {
  Queue,
  QueueList,
  QueueItem,
  QueueItemIndicator,
  QueueItemContent,
  QueueSection,
  QueueSectionTrigger,
  QueueSectionLabel,
  QueueSectionContent,
} from "./queue";

export default {
  title: "AI Elements/Queue",
  component: Queue,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Queue>
      <QueueList>
        <QueueItem>
          <QueueItemIndicator completed={false} />
          <QueueItemContent>처리 중인 작업</QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator completed={false} />
          <QueueItemContent>대기 중인 작업</QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator completed={true} />
          <QueueItemContent>완료된 작업</QueueItemContent>
        </QueueItem>
      </QueueList>
    </Queue>
  ),
};

export const WithSections = {
  render: () => (
    <Queue>
      <QueueSection>
        <QueueSectionTrigger>
          <QueueSectionLabel count={2} label="진행 중" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            <QueueItem>
              <QueueItemIndicator completed={false} />
              <QueueItemContent>작업 1</QueueItemContent>
            </QueueItem>
            <QueueItem>
              <QueueItemIndicator completed={false} />
              <QueueItemContent>작업 2</QueueItemContent>
            </QueueItem>
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
      <QueueSection>
        <QueueSectionTrigger>
          <QueueSectionLabel count={1} label="완료" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            <QueueItem>
              <QueueItemIndicator completed={true} />
              <QueueItemContent>완료된 작업</QueueItemContent>
            </QueueItem>
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
    </Queue>
  ),
};

