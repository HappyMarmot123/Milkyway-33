import { useState, useEffect } from "react";
import { ModelSettings } from "@/components/features/ModelSettings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TokenUsage } from "@/components/features/TokenUsage";
import { chatRepository } from "@/services/chatRepository";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export function SettingsPage() {
  const [model, setModel] = useState("gemini-2.5-flash-lite");
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 2000,
    topP: 1.0,
    frequencyPenalty: 0,
    presencePenalty: 0,
    stream: true,
  });

  // Token usage from IndexDB
  const [tokenUsage, setTokenUsage] = useState({ inputTokens: 0, outputTokens: 0 });

  useEffect(() => {
    loadTokenUsage();
  }, []);

  const loadTokenUsage = async () => {
    const usage = await chatRepository.getTotalTokenUsage();
    setTokenUsage(usage);
  };

  const handleResetTokenUsage = async () => {
    await chatRepository.resetTokenUsage();
    setTokenUsage({ inputTokens: 0, outputTokens: 0 });
  };

  return (
    <main aria-label="settings-page" className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="space-y-4 sm:space-y-6">
        <header aria-label="page-header">
          <h1 className="text-2xl sm:text-3xl font-bold">설정</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            모델, 테마 및 애플리케이션 설정을 관리하세요.
          </p>
        </header>

        <Separator />

        <section aria-label="token-usage-section">
           <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base sm:text-lg">총 토큰 사용량</CardTitle>
                  <CardDescription className="text-sm">
                    전체 대화에서 사용된 토큰 통계입니다.
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetTokenUsage}
                  className="gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  초기화
                </Button>
              </div>
            </CardHeader>
            <CardContent>
               <TokenUsage
                  usage={tokenUsage}
                  maxTokens={1000000}
                  modelId={model}
                />
            </CardContent>
          </Card>
        </section>

        <section aria-label="model-settings-section">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">모델 선택</CardTitle>
              <CardDescription className="text-sm">
                사용할 기본 모델을 선택하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite</SelectItem>
                  <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                  <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </section>

        <section aria-label="advanced-settings-section">
          <ModelSettings
            model={model}
            settings={settings}
            onChange={setSettings}
          />
        </section>
      </div>
    </main>
  );
}
