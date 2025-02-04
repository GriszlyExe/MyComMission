"use client";

import { ReactNode } from "react";

// Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
}
export const Card = ({ children, className = "" }: CardProps) => {
  return <div className={`border rounded-lg p-4 shadow-sm ${className}`}>{children}</div>;
};

export const CardContent = ({ children, className = "" }: CardProps) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
