"use client";
import { Loader2Icon, BrainIcon, PenToolIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  variant?: 'default' | 'thinking' | 'generating';
  message?: string;
}

const variantConfig = {
  default: {
    icon: Loader2Icon,
    text: "Loading...",
    color: "text-muted-foreground",
  },
  thinking: {
    icon: BrainIcon,
    text: "Thinking...",
    color: "text-purple-400",
  },
  generating: {
    icon: PenToolIcon,
    text: "Generating response...",
    color: "text-blue-400",
  },
};

export const Loader = ({ 
  className, 
  variant = 'default',
  message,
  ...props 
}: LoaderProps) => {
  const config = variantConfig[variant];
  const Icon = config.icon;
  const displayText = message || config.text;

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-4",
        className
      )}
      {...props}
    >
      <Icon className={cn("size-4 animate-spin", config.color)} />
      <span className={cn("text-sm", config.color)}>{displayText}</span>
    </div>
  );
};
