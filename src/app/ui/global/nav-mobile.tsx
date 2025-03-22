"use client";

import {
	Home01Icon,
	PaintBoardIcon,
	Settings01Icon,
	Chatting01Icon,
	Menu01Icon,
	UserAccountIcon,
} from "hugeicons-react";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAppSelector } from "@/states/hook";
import { useRouter } from "next/navigation";

export default function NavMobile() {
    const userId = useAppSelector((state) => state.user.user!.userId);
    const router = useRouter();
    const pathname = usePathname();

    const logout = async () => {
        try {
            router.push("/");
        } catch (err) {
            console.error(err);
        }
    };

    const links = [
        { name: "Home", href: "/home", icon: Home01Icon },
        { name: "Artist", href: "/user", icon: PaintBoardIcon },
        { name: "Chat", href: "/chat", icon: Chatting01Icon },
        { name: "Account", href: `/profile/${userId}`, icon: UserAccountIcon },
        { name: "Settings", href: "/home/setting", icon: Settings01Icon },
    ];

	return (
        <div className="grid grid-cols-3 items-center">
            <div className="flex px-10 text-md font-bold col-span-2 h-16 items-center">
                MyCommission
            </div>
            <div className="relative flex justify-end">
                <details className="relative">
                    <summary className="flex items-center px-8 py-2 w-full text-sm font-medium hover:bg-secondary hover:text-accent gap-x-1 cursor-pointer h-16">
                        <Menu01Icon className="scale-75" />
                        Menu    
                    </summary>
                    <ul className="absolute right-0 mt-2 w-28 bg-white shadow-lg mr-2 z-20">
                        {links.map((link) => {
                            const LinkIcon = link.icon;
                            return (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        prefetch={true}
                                        className={clsx(
                                            "z-20 flex flex-col items-center justify-center p-3 text-xs font-medium hover:bg-secondary hover:text-accent",
                                            {
                                                "bg-[#e0aaff] text-accent": pathname === link.href,
                                            },
                                        )}
                                    >
                                        <LinkIcon className="w-6 h-6" />
                                        <p>{link.name}</p>
                                    </Link>
                                </li>
                            );
                        })}
                        <li>
                            {/* Logout */}
                            <button
                                className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-secondary hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
                                onClick={logout}
                            >
                                <LogOutIcon className="w-6" />
                                <p className="block">Logout</p>
                            </button>
                        </li>
                    </ul>
                </details>
            </div>
        </div>
    );
}