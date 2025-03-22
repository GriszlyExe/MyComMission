"use client";

import { changePasswordSchema } from "@/common/Schemas";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { ResetPasswordIcon } from "hugeicons-react";
import React, { useState } from "react";
import * as yup from "yup";
import { SettingButtonPopup } from "./button";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { changePassword } from "@/service/userService";
import { useAppSelector } from "@/stores/hook";

export default function ChangePasswordForm() {
	const userId = useAppSelector((state) => state.user.user!.userId);
	const [errorMessage, setErrorMessage] = useState<boolean>(false);
	const [openChangePassword, setOpenChangePassword] = useState(false);
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setshowConfirmPassword] = useState(false);

	const togglePassword = (
		setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
	) => {
		setShowPassword((prev) => !prev);
	};

	type FormSchema = yup.InferType<typeof changePasswordSchema>;

	const handleSubmit = async (
		values: FormSchema,
		actions: FormikHelpers<FormSchema>,
	) => {
		try {
			const { oldPassword, newPassword } = values;
			await changePassword({ userId, oldPassword, newPassword });
			actions.resetForm();
			setOpenChangePassword(false);
		} catch (err) {
			setErrorMessage(true);
		}
	};

	return (
		<div>
			<SettingButtonPopup onClick={() => setOpenChangePassword(true)}>
				<ResetPasswordIcon className="h-6 w-6 text-gray-600" />
				<span className="text-sm font-medium">Change Password</span>
			</SettingButtonPopup>
			{openChangePassword && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="m-auto w-full max-w-lg rounded-md bg-white p-6 shadow-sm">
						<h1 className="mb-6 text-center text-3xl font-bold">
							<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
								Change Password
							</span>
						</h1>
						<Formik
							initialValues={{
								oldPassword: "",
								newPassword: "",
								confirmPassword: "",
							}}
							validationSchema={changePasswordSchema}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting, errors, touched }) => (
								<Form className="space-y-3" autoComplete="off">
									<div>
										<label className="mb-2 block text-sm font-bold text-gray-700">
											Old Password
										</label>
										<div className="relative">
											<Field
												type={
													showOldPassword
														? "text"
														: "password"
												}
												name="oldPassword"
												required
												className={`input input-bordered w-full pr-10 ${
													errors.oldPassword &&
													touched.oldPassword
														? "input-error"
														: "input-primary"
												}`}
											/>
											<button
												type="button"
												onClick={() =>
													togglePassword(
														setShowOldPassword,
													)
												}
												className="absolute right-3 top-1/2 -translate-y-1/2 transform"
											>
												{showOldPassword ? (
													<FaEyeSlash />
												) : (
													<FaEye />
												)}
											</button>
										</div>
										<ErrorMessage
											name="oldPassword"
											component="p"
											className="text-xs text-red-500"
										/>
									</div>
									<div className="relative flex flex-col justify-between">
										<label className="mb-2 block text-sm font-bold text-gray-700">
											New Password
										</label>
										<div className="relative">
											<Field
												type={
													showNewPassword
														? "text"
														: "password"
												}
												name="newPassword"
												required
												className={`input input-bordered w-full pr-10 ${
													errors.newPassword &&
													touched.newPassword
														? "input-error"
														: "input-primary"
												}`}
											/>
											<button
												type="button"
												onClick={() =>
													togglePassword(
														setShowNewPassword,
													)
												}
												className="absolute right-3 top-1/2 -translate-y-1/2 transform"
											>
												{showNewPassword ? (
													<FaEyeSlash />
												) : (
													<FaEye />
												)}
											</button>
										</div>
										<ErrorMessage
											name="newPassword"
											component="p"
											className="text-xs text-red-500"
										/>
									</div>
									<div className="relative flex flex-col justify-between">
										<label className="mb-2 block text-sm font-bold text-gray-700">
											Confirm Password
										</label>
										<div className="relative">
											<Field
												type={
													showConfirmPassword
														? "text"
														: "password"
												}
												name="confirmPassword"
												required
												className={`input input-bordered w-full pr-10 ${
													errors.confirmPassword &&
													touched.confirmPassword
														? "input-error"
														: "input-primary"
												}`}
											/>
											<button
												type="button"
												onClick={() =>
													togglePassword(
														setshowConfirmPassword,
													)
												}
												className="absolute right-3 top-1/2 -translate-y-1/2 transform"
											>
												{showConfirmPassword ? (
													<FaEyeSlash />
												) : (
													<FaEye />
												)}
											</button>
										</div>
										<ErrorMessage
											name="confirmPassword"
											component="p"
											className="text-xs text-red-500"
										/>
									</div>
									{errorMessage && (
										<div className="mt-1">
											<span className="font-bold text-error">
												Old password is incorrect
											</span>
										</div>
									)}
									<div className="flex gap-3">
										<button
											type="submit"
											disabled={isSubmitting}
											className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${
												isSubmitting
													? "cursor-not-allowed bg-gray-400"
													: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
											}`}
										>
											Submit
										</button>
										<button
											type="button"
											onClick={() => {
												setOpenChangePassword(false);
												setErrorMessage(false);
											}}
											className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${
												isSubmitting
													? "cursor-not-allowed bg-gray-400"
													: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
											}`}
										>
											Cancel
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			)}
		</div>
	);
}
