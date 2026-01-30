import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationActions,
  ConfirmationAction,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
} from "./confirmation";
import { Button } from "@/components/ui/button";

export default {
  title: "AI Elements/Confirmation",
  component: Confirmation,
  tags: ["autodocs"],
};

export const ApprovalRequested = {
  render: () => (
    <Confirmation
      approval={{ approved: false }}
      state="approval-requested"
    >
      <ConfirmationTitle>정말 실행하시겠습니까?</ConfirmationTitle>
      <ConfirmationActions>
        <ConfirmationAction>승인</ConfirmationAction>
        <Button variant="outline" size="sm">
          거부
        </Button>
      </ConfirmationActions>
    </Confirmation>
  ),
};

export const Accepted = {
  render: () => (
    <Confirmation
      approval={{ approved: true }}
      state="approval-responded"
    >
      <ConfirmationTitle>작업이 승인되었습니다</ConfirmationTitle>
      <ConfirmationAccepted>
        <p className="text-sm text-muted-foreground">작업을 진행합니다...</p>
      </ConfirmationAccepted>
    </Confirmation>
  ),
};

export const Rejected = {
  render: () => (
    <Confirmation
      approval={{ approved: false }}
      state="approval-responded"
    >
      <ConfirmationTitle>작업이 거부되었습니다</ConfirmationTitle>
      <ConfirmationRejected>
        <p className="text-sm text-muted-foreground">작업을 취소합니다.</p>
      </ConfirmationRejected>
    </Confirmation>
  ),
};

