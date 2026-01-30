"use client";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

export const Loader = ({ className, ...props }) => (
  <div
    className={cn("flex items-center justify-center p-4", className)}
    {...props}
  >
    <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
  </div>
);
