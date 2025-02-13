"use client"

import LoginForm from "@/app/(auth)/LoginForm";
import TwoFactorAuth from "@/app/(auth)/TwoFactorAuth";
import { useState } from "react";

export default function LoginPage() {
	const [showLogin, setShowLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const toggleShowLogin = () => {
        setShowLogin(prev => !prev);
    }
	return <>{showLogin ? <LoginForm toggleShowLogin={toggleShowLogin} setEmail={setEmail}/> : <TwoFactorAuth email={email}/>}</>;
}
