import NavLinks from "./nav-links";
import Search from "./search";
import { UserAccountIcon } from "hugeicons-react";

export default function TopNav() {
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
        <div className="flex justify-end px-5">
          <UserAccountIcon className="cursor-pointer w-1/2"/>
        </div>
      </div>
    </div>
  );
}
