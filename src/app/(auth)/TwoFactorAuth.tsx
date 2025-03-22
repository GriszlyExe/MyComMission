"use client";
import { useState, useRef, useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { check2FA, sendEmail } from "@/service/authService";
import { useAppDispatch } from "@/stores/hook";
import { setUser } from "@/stores/features/userSlice";

export default function TwoFactorAuthPage({ email }: { email: string }) {

	const [countdown, setCountdown] = useState(0);
	const [isResendDisabled, setIsResendDisabled] = useState(false);
	const [code, setCode] = useState(Array(6).fill(""));
	const [error, setError] = useState("");
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const router = useRouter();
	const dispatch = useAppDispatch();

	const startCooldown = () => {
		setIsResendDisabled(true);
		setCountdown(60);
	};

	useEffect(() => {
		if (countdown > 0) {
			const timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else {
			setIsResendDisabled(false);
		}
	}, [countdown]);

	const validateCode = (codeArray: string[]) => {
		const codeString = codeArray.join("");
		const regex = /^[0-9]{6}$/;
		return regex.test(codeString);
	};

	const handleChange = (value: string, index: number) => {
		const newValue = value;
		if (!/^[0-9]$/.test(newValue) && newValue !== "") return;

		const newCode = [...code];
		newCode[index] = newValue;
		setCode(newCode);

		if (newValue !== "" && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}

		if (newCode.every((val) => val !== "")) {
			if (!validateCode(newCode)) {
				setError("Code must contain exactly 6 digits.");
			} else {
				setError("");
			}
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number,
	) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		} else if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		} else if (e.key === "ArrowRight" && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handlePaste = (
		e: React.ClipboardEvent<HTMLInputElement>,
		index: number,
	) => {
		e.preventDefault();
		const clipboardData = e.clipboardData.getData("Text").trim();
		if (!/^[0-9]+$/.test(clipboardData)) return;

		const newCode = [...code];
		let pos = index;
		for (let i = 0; i < clipboardData.length && pos < 6; i++) {
			newCode[pos] = clipboardData[i];
			pos++;
		}
		setCode(newCode);

		if (newCode.every((val) => val !== "")) {
			if (!validateCode(newCode)) {
				setError("Code must contain exactly 6 digits.");
			} else {
				setError("");
			}
		}
	};

	const handleContinue = async () => {
		if (validateCode(code)) {
			const token = code.join("");
			// console.log("Valid code:", token);
			// console.log("email :", queryEmail);

			// if (!queryEmail) {
			// 	router.push("../login");
			// }

			try {
				const { user } = await check2FA({ email, token });
				dispatch(setUser(user));
				router.push("/home");
			} catch (error) {
				console.error("Error verifying code:", error);
			}
		}
	};

	const handleResend = () => {
		console.log("Resending code...");
		startCooldown();
		// Add resend logic here
		sendEmail(email);
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
				<div className="text-center">
					<h2 className="mb-4 text-2xl font-bold">
						Two-Factor Authentication
					</h2>
				</div>

				<div className="flex justify-center">
					<Image
						src="/2fa.png"
						alt="Verification"
						width={120}
						height={80}
					/>
				</div>

				<div className="text-center">
					<p className="mb-8 text-gray-600">
						We sent a verification code to your email.
						<br />
						Please enter the code in the field below.
					</p>
				</div>

				<div className="flex justify-center gap-2">
					{[...Array(6)].map((_, index) => (
						<input
							key={index}
							ref={(el) => {
								inputRefs.current[index] = el;
							}}
							type="text"
							maxLength={1}
							value={code[index]}
							onChange={(e) =>
								handleChange(e.target.value, index)
							}
							onKeyDown={(e) => handleKeyDown(e, index)}
							onPaste={(e) => handlePaste(e, index)}
							onFocus={(e) => e.target.select()}
							className="h-12 w-12 rounded-lg border-2 border-gray-300 text-center text-2xl focus:border-purple-600 focus:outline-none"
						/>
					))}
				</div>

				{error && (
					<p className="mt-2 text-center text-sm text-error">
						{error}
					</p>
				)}

				<button
					onClick={handleContinue}
					className="mt-6 w-full rounded-lg bg-purple-600 py-3 text-white transition-colors hover:bg-purple-700"
				>
					Continue
				</button>

				<div className="mt-4 text-center">
					<span className="text-gray-600">Didn't receive? </span>
					<button
						onClick={handleResend}
						disabled={isResendDisabled}
						className={`${
							isResendDisabled
								? "cursor-not-allowed text-gray-400"
								: "text-blue-600 hover:text-blue-800"
						} font-medium focus:outline-none`}
					>
						{isResendDisabled
							? `Resend code (${countdown}s)`
							: "Resend code"}
					</button>
				</div>
			</div>
		</div>
	);
}
