import { useState } from "react";
import { ModelSettings } from "@/components/features/ModelSettings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TokenUsage } from "@/components/features/TokenUsage";

export function SettingsPage() {
  const [model, setModel] = useState("gpt-4");
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 2000,
    topP: 1.0,
    frequencyPenalty: 0,
    presencePenalty: 0,
    stream: true,
  });

  // Mock data for Total Token Usage (since we don't have backend persistence yet)
  const totalUsage = {
    inputTokens: 15420,
    outputTokens: 8930,
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
              <CardTitle className="text-base sm:text-lg">총 토큰 사용량</CardTitle>
              <CardDescription className="text-sm">
                전체 대화에서 사용된 토큰 통계입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <TokenUsage
                  usage={totalUsage}
                  maxTokens={1000000} // Higher limit for total
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
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                  <SelectItem value="gemini">Gemini Pro</SelectItem>
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

        <section aria-label="app-settings-section">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">애플리케이션 설정</CardTitle>
              <CardDescription className="text-sm">
                추가 설정을 구성하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                추가 설정 옵션이 여기에 표시됩니다.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

