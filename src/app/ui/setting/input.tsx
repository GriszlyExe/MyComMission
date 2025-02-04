'use client'
interface InputProps {
    type: string;
    placeholder?: string;
    className?: string;
  }
  export const Input = ({ type, placeholder, className = "" }: InputProps) => {
    return <input type={type} placeholder={placeholder} className={`border p-2 rounded w-full ${className}`} />;
  };