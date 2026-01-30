import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-muted mb-4">
            <span className="text-4xl font-bold text-muted-foreground">404</span>
          </div>
          <CardTitle className="text-xl sm:text-2xl">
            페이지를 찾을 수 없습니다
          </CardTitle>
          <CardDescription>
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild variant="default" className="w-full">
            <Link to="/chat">
              <Home className="mr-2 h-4 w-4" />
              홈으로 돌아가기
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full"
            onClick={() => window.history.back()}
          >
            <button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              이전 페이지
            </button>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
