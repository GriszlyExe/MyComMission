"use client"

import { LogOutIcon } from "lucide-react";
import NavLinks from "./nav-links";
import Search from "./search";
import Link from "next/link";
import { UserAccountIcon } from "hugeicons-react";
import { useAppDispatch } from "@/states/hook";
import { resetState } from "@/states/store";
import { clearAuthToken } from "@/service/authService";
import { useRouter } from "next/navigation";

export default function TopNav() {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    
    try {
      router.push("/");
      await clearAuthToken();
      dispatch(resetState());
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mx-auto shadow-md">
      <div className="grid grid-cols-3 items-center h-16">
        {/* Search Column */}
        <div className="flex justify-start px-5">
          <Search placeholder="Search..." />
        </div>

        {/* Navigation Links Column */}
        <div className="flex justify-center">
          <NavLinks />
        </div>

        {/* User Account Icon Column */}
        <div className="flex justify-end pr-4">
          {/* Profile */}
          <Link
            href={"/profile/1"}
            className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:py-2 md:px-3"
          >
            <UserAccountIcon className="w-6"/>
            <p className="block">Account</p>
          </Link>

          {/* Logout */}
          <button
            className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:py-2 md:px-3"
            onClick={logout}
          >
            <LogOutIcon className="w-6"/>
            <p className="block">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}
