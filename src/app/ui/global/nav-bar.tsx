"use client";

import NavPc from "./nav-pc";
import NavMobile from "./nav-mobile";

export default function TopNav() {

	return (
		<>
			<div className="md:hidden mx-auto shadow-md">
				<NavMobile/>
			</div>
			<div className="hidden md:block">
				<NavPc/>
			</div>
		</>
	);
}
