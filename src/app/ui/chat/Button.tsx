import { ReactNode } from "react";



interface ButtonProp {
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const OptionButton = ({ children, onClick }: ButtonProp) => {
    return (
        <button className="flex flex-row items-center p-2 gap-x-3 hover:bg-gray-200 rounded min-w-40" onClick={onClick}>
            {children}
        </button>
    )
}