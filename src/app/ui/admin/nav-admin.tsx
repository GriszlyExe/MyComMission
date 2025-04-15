"use client";

import AdminNavPc from "./admin-pc";
import AdminNavMobile from "./admin-mobile";

export default function AdminNav() {

	return (
		<>
			<div className="md:hidden mx-auto shadow-md">
				<AdminNavMobile />
			</div>
			<div className="shadow-md hidden md:block">
				<AdminNavPc />
			</div>
		</>
	);
}
