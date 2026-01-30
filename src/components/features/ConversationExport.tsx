import { Button } from "@/components/ui/button";
import { Download, FileText, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function ConversationExport({ conversation }) {
  const exportToJSON = () => {
    const dataStr = JSON.stringify(conversation, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `conversation-${conversation.id || Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToMarkdown = () => {
    let markdown = `# ${conversation.title || "대화"}\n\n`;
    markdown += `**날짜**: ${new Date(conversation.createdAt || Date.now()).toLocaleString()}\n\n`;
    markdown += "---\n\n";

    conversation.messages?.forEach((message) => {
      const role = message.role === "user" ? "사용자" : "어시스턴트";
      markdown += `## ${role}\n\n`;
      markdown += `${message.content}\n\n`;
      markdown += "---\n\n";
    });

    const dataBlob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `conversation-${conversation.id || Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const text = JSON.stringify(conversation, null, 2);
    navigator.clipboard.writeText(text);
  };

  if (!conversation) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          내보내기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>대화 내보내기</DialogTitle>
          <DialogDescription>
            대화를 다양한 형식으로 내보낼 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={exportToJSON} variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              JSON
            </Button>
            <Button onClick={exportToMarkdown} variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Markdown
            </Button>
            <Button onClick={copyToClipboard} variant="outline" className="flex-1">
              <Copy className="h-4 w-4 mr-2" />
              복사
            </Button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">미리보기</label>
            <Textarea
              value={JSON.stringify(conversation, null, 2)}
              readOnly
              className="h-32 font-mono text-xs"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

