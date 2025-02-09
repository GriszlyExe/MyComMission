"use client";

import { twoFactorCode } from "@/common/Schemas";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { TwoFactorAccessIcon } from "hugeicons-react";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { ToggleSwitch } from "./button";
import { enable2Fa1, enable2Fa2 } from "@/service/userService";
import { maskEmail } from "@/utils/helper";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { toggle2Fa } from "@/states/features/userSlice";

type FormSchema = yup.InferType<typeof twoFactorCode>;

export default function TwoFactorForm() {
    
	const dispatch = useAppDispatch();
	const enabled = useAppSelector((state) => state.user.user!.enabled2FA);
	const [open2faForm, setOpen2faForm] = useState<boolean>(false);

	const email = useAppSelector((state) => state.user.user!.email);
	const userId = useAppSelector((state) => state.user.user!.userId);
	const maskedEmail = maskEmail(email);

	const handleSubmit = async (
		values: FormSchema,
		actions: FormikHelpers<FormSchema>,
	) => {
		try {

            const { code } = values;
            await enable2Fa2(email, code);
            setOpen2faForm(false);
            dispatch(toggle2Fa());

		} catch (err) {

        }
	};

	const getEmail = async () => {
		await enable2Fa1(userId);
	};

	useEffect(() => {
        if (open2faForm) {
            getEmail();
        }
    }, [open2faForm]);

	return (
		<div>
			<div className="flex w-full items-center gap-3 rounded-lg border bg-white px-4 py-4 text-gray-700">
				<div className="flex w-full items-center gap-3">
					<TwoFactorAccessIcon className="h-6 w-6 text-gray-600" />

					<span className="flex-grow text-sm font-medium">
						Two-factor authentication
					</span>
					<div className="flex">
						<ToggleSwitch
							onToggle={() => {
								if (enabled) dispatch(toggle2Fa());
								else if (!enabled) setOpen2faForm(true);
							}}
							isOn={enabled}
						/>
					</div>
				</div>
			</div>
			{open2faForm && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="m-auto w-full max-w-lg rounded-md bg-white p-6 shadow-sm">
						<h1 className="mb-6 text-center text-3xl font-bold">
							<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
								Check your email
							</span>
						</h1>
						<p className="mb-4 text-center">
							Enter the code that we sent to {maskedEmail}
						</p>
						<Formik
							initialValues={{
								code: "",
							}}
							validationSchema={twoFactorCode}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting, errors, touched }) => (
								<Form className="space-y-3" autoComplete="off">
									<div className="relative flex flex-col justify-between gap-3">
										{/* <label className="mb-2 block text-sm font-bold text-gray-700">
                                        Old Password
                                    </label> */}
										<div className="relative">
											<Field
												type="text"
												name="code"
												placeholder="code"
												required
												className={`input input-bordered w-full pr-10 ${
													errors.code && touched.code
														? "input-error"
														: "input-primary"
												}`}
											/>
											<ErrorMessage
												name="code"
												component="p"
												className="text-xs text-red-500"
											/>
										</div>
									</div>

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
											onClick={() =>
												setOpen2faForm(false)
											}
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
