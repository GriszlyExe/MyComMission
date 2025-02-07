"use client";
import Link from "next/link";
import { ReactNode } from "react";


interface LinkProps {
    children: ReactNode;
    href: string
}
interface ButtonProp {
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const SettingButton = ({ children, href }: LinkProps) => {
    return (
        <Link className="flex items-center gap-3 w-full px-4 py-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            href={href}> {children}
        </Link>
    )
}
export const SettingButtonPopup = ({ children, onClick }: ButtonProp) => {

    return (
        <button className='flex items-center gap-3 w-full px-4 py-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition'
            onClick={onClick}> {children}
        </button>
    )
}


interface ToggleSwitchProps {
    isOn: boolean;
    onToggle: () => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
    return (
        <div
            className={`relative w-14 h-8 flex items-center  rounded-full p-1 cursor-pointer transition-colors ${isOn ? "bg-blue-500" : "bg-gray-300"
                }`}
            onClick={onToggle}
        >
            {/* Switch Button */}
            <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${isOn ? "translate-x-6" : "translate-x-0"
                    }`}
            ></div>
        </div>
    );
};