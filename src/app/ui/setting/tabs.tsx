"use client";

import { ReactNode } from "react";


interface TabsProps {
    defaultValue: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
    className?: string;
  }
  export const Tabs = ({ children, className = "", onValueChange }: TabsProps) => {
    return <div className={`w-full ${className}`}>{children}</div>;
  };
  
  interface TabsListProps {
    children: ReactNode;
    className?: string;
  }
  export const TabsList = ({ children, className = "" }: TabsListProps) => {
    return <div className={`flex justify-between mb-4 ${className}`}>{children}</div>;
  };
  
  interface TabsTriggerProps {
    value: string;
    children: ReactNode;
  }
  export const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
    return <button className="px-4 py-2 border rounded" onClick={() => console.log(value)}>{children}</button>;
  };
  
  interface TabsContentProps {
    value: string;
    children: ReactNode;
  }
  export const TabsContent = ({ children }: TabsContentProps) => {
    return <div className="p-4 border rounded">{children}</div>;
  };
  