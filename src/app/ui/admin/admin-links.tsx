"use client";

import {
	UserListIcon,
	RepositoryIcon,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{ name: "Users", href: "/admin/user", icon: UserListIcon },
	{ name: "Reports", href: "/admin/report", icon: RepositoryIcon },
];

export default function AdminLinks() {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Link
						key={link.name}
						href={link.href}
						prefetch={true}
						className={clsx(
							"flex flex-row h-[64px] items-center justify-around p-3 text-sm font-medium hover:bg-secondary \
								hover:text-accent md:px-3 md:py-2 md:min-w-[90px]",
							{
								"bg-primary text-secondary":
									pathname === link.href,
							},
						)}
					>
						<LinkIcon className="w-6" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
