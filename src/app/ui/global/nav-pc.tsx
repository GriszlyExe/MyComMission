'use client'

import { LogOutIcon } from "lucide-react";
import NavLinks from "./nav-links";
import Search from "./search";
import Link from "next/link";
import { UserAccountIcon } from "hugeicons-react";
import { useAppSelector } from "@/stores/hook";
import { useRouter } from "next/navigation";

export default function NavPc() {
    const userId = useAppSelector((state) => state.user.user!.userId);
	const router = useRouter();

	const logout = async () => {

		try {
			router.push("/");
		} catch (err) {
			console.error(err);
		}
		
	};

    return(
        <>
            <div className="grid h-16 grid-cols-3 items-center">
                {/* Search Column */}
				<div className="flex justify-start px-10 text-xl font-bold">
					MyCommission
				</div>

                {/* Navigation Links Column */}
                <div className="flex justify-center">
                    <NavLinks />
                </div>

                {/* User Account Icon Column */}
                <div className="flex justify-end pr-2">
                    {/* Profile */}
                    <Link
                        href={`/profile/${userId}`}
                        className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-secondary hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
                    >
                        <UserAccountIcon className="w-6" />
                        <p className="block">Account</p>
                    </Link>

                    {/* Logout */}
                    <button
                        className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-secondary hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
                        onClick={logout}
                    >
                        <LogOutIcon className="w-6" />
                        <p className="block">Logout</p>
                    </button>
                </div>
            </div>
        </>
    )
}