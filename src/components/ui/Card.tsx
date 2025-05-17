// src/components/ui/card.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={cn("rounded-lg border bg-white p-4 shadow", className)}>{children}</div>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn("mt-2", className)}>{children}</div>;
}
