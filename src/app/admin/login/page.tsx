"use client";

import AdminLoginForm from "@/app/(auth)/AdminLoginForm";
import { useState } from "react";

export default function AdminLogin() {
	const [showLogin, setShowLogin] = useState<boolean>(true);
	const [email, setEmail] = useState<string>("");
	const toggleShowLogin = () => {
		setShowLogin((prev) => !prev);
	};
	return (
		<>
			<AdminLoginForm
				toggleShowLogin={toggleShowLogin}
				setEmail={setEmail}
			/>
		</>
	);
}
