import { useState, useEffect } from "react";
import { X, Plus, Trash2, Save } from "lucide-react";
import { ChatPromptConfig, ChatMessageExample } from "@/features/chat/types";

interface PromptConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ChatPromptConfig;
  onSave: (config: ChatPromptConfig) => void;
}

export const PromptConfigModal = ({
  isOpen,
  onClose,
  config,
  onSave,
}: PromptConfigModalProps) => {
  const [systemInstruction, setSystemInstruction] = useState("");
  const [examples, setExamples] = useState<ChatMessageExample[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSystemInstruction(config.systemInstruction || "");
      setExamples(config.examples || []);
    }
  }, [isOpen, config]);

  const handleSave = () => {
    onSave({
      systemInstruction,
      examples: examples.filter((ex) => ex.input.trim() || ex.output.trim()),
    });
    onClose();
  };

  const addExample = () => {
    setExamples([...examples, { input: "", output: "" }]);
  };

  const removeExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index));
  };

  const updateExample = (
    index: number,
    field: keyof ChatMessageExample,
    value: string
  ) => {
    const newExamples = [...examples];
    newExamples[index] = { ...newExamples[index], [field]: value };
    setExamples(newExamples);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-background border rounded-lg shadow-lg flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Prompt Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* System Instruction */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              System Instruction
            </label>
            <p className="text-xs text-muted-foreground">
              Define the persona, role, or specific rules the model should follow.
            </p>
            <textarea
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              placeholder="e.g. You are a helpful coding assistant. You should answer in Korean."
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="border-t" />

          {/* Few-shot Examples */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none">
                  Few-shot Examples
                </label>
                <p className="text-xs text-muted-foreground">
                  Provide examples to guide the model's behavior and output format.
                </p>
              </div>
              <button
                onClick={addExample}
                className="inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
              >
                <Plus size={14} />
                Add Example
              </button>
            </div>

            <div className="space-y-4">
              {examples.map((example, index) => (
                <div
                  key={index}
                  className="group relative grid gap-4 p-4 border rounded-md bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <button
                    onClick={() => removeExample(index)}
                    className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-red-500 rounded-md hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                  
                  <div className="grid gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      User Input
                    </label>
                    <textarea
                      value={example.input}
                      onChange={(e) => updateExample(index, "input", e.target.value)}
                      placeholder="User's question or input"
                      className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Model Response
                    </label>
                    <textarea
                      value={example.output}
                      onChange={(e) => updateExample(index, "output", e.target.value)}
                      placeholder="Expected model response"
                      className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              ))}
              
              {examples.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-md">
                  No examples added. Click "Add Example" to start.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t bg-muted/10">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
