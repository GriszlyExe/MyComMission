import Link from "next/link";
import UserWidget from "./UserWidget";

export default function ShowUsername() {

    // Function for fetch username

	return (
		<div>
            {/* Use function in here */}
			<UserWidget />
			<UserWidget />
		</div>
	);
}
