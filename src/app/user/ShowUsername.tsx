"use client"

import UserWidget from "./UserWidget";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchDisplayname } from "@/service/userService";
import { User } from "@/common/model";

export default function ShowUsername() {

	// Function for fetch name
	const searchParams = useSearchParams().get('search');
	const [users, setUsers] = useState<Array<User>>([]);
	
	const fetchDisplayname = async () => {
		const fetchedUsers = await searchDisplayname(searchParams!);
		console.log(fetchedUsers);
		setUsers(fetchedUsers);
	}

	useEffect(() => {
		// console.log(searchParams);
		fetchDisplayname();
	}, [searchParams])

	return (
		<div>
            {/* Map users here */}
			{users && users.map((user) => (
				<UserWidget key={user.userId} userInfo={user}/>
			))}
		</div>
	);
}
