"use client";
import Link from "next/link";
import { ReactNode } from "react";


interface ButtonProps {
    children: ReactNode;
    href: string
}
export const SettingButton = ({ children, href }: ButtonProps) => {
    // return (

    //     <button className="flex items-center gap-3 w-full px-4 py-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
    //         onClick={onClick}
    //         >
    //         {children}
    //     </button>)
    return (
        <Link className="flex items-center gap-3 w-full px-4 py-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            href={href}> {children}
        </Link>
    )
}