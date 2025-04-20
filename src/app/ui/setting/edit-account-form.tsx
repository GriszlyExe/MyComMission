"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useState } from "react";
import { accountSchema } from "@/common/Schemas";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateUser } from "@/service/userService";

/* redux */
import { useAppSelector, useAppDispatch } from "@/stores/hook";
import { setUser } from "@/stores/features/userSlice";
import AccountFormikInput from "./account-formik-input";

export default function EditAccountForm() {
	const loggedInUser = useAppSelector((state) => state.user.user);
	const router = useRouter();

	const dispatch = useAppDispatch();

	const [previewPic, setPreviewPic] = useState(() =>
		loggedInUser?.profileUrl
			? loggedInUser?.profileUrl
			: "/default-profile-2.png",
	);
	const [showSubmitPopup, setShowSubmitPopup] = useState(false);

	type formSchema = yup.InferType<typeof accountSchema>;

	const initialValues = {
		displayName: loggedInUser?.displayName,
		firstName: loggedInUser?.firstName,
		lastName: loggedInUser?.lastName,
		birthDate: (loggedInUser?.birthDate as string).split(`T`)[0],
		phone: loggedInUser?.phone,
		email: loggedInUser?.email,
		description: loggedInUser?.description,
		location: loggedInUser?.location,
	};

	const handleSubmit = async (
		values: formSchema,
		actions: FormikHelpers<formSchema>,
	) => {
		try {
			const { profilePic, ...others } = values;
			const data = {
				...others,
				userId: loggedInUser?.userId,
			};

			const formData = new FormData();

			if (profilePic) {
				formData.append("picture", profilePic);
			}

			const { user } = await updateUser({
				user: data,
				picture: formData,
			});

			dispatch(setUser(user));
			setShowSubmitPopup(true);
			setTimeout(() => {
				setShowSubmitPopup(false);
			}, 3000);

			// router.refresh();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="m-auto w-full max-w-lg rounded-md bg-white p-6 shadow-sm">
				<Formik
					initialValues={initialValues}
					validationSchema={accountSchema}
					onSubmit={handleSubmit as any}
				>
					{({ isSubmitting, errors, touched, setFieldValue }) => (
						<Form className="space-y-2" autoComplete="off">
							<div className="flex flex-col items-center">
								<label className="mb-2 block text-sm font-bold text-gray-700">
									Profile Picture
								</label>
								<div className="h-24 w-24 overflow-hidden rounded-full border border-gray-300">
									<img
										src={
											previewPic ||
											"/default-profile-2.png"
										}
										alt="Profile"
										className="h-full w-full overflow-hidden rounded-full border border-gray-300 object-cover"
										width={100}
										height={100}
									/>
								</div>
								<fieldset className="fieldset flex flex-col">
									<legend className="fieldset-legend font-semibold">
										Pick a file
									</legend>
									<input
										type="file"
										name="profilePic"
										accept="image/*"
										onChange={(event) => {
											const file =
												event.target.files?.[0];
											if (file) {
												setFieldValue(
													"profilePic",
													file,
												);

												// Generate preview URL
												const reader = new FileReader();
												reader.onloadend = () => {
													if (
														typeof reader.result ===
														"string"
													) {
														setPreviewPic(
															reader.result,
														);
													}
												};
												reader.readAsDataURL(file);
											}
										}}
										className="file-input file-input-primary ml-0 max-h-10 max-w-60 pl-0"
									/>
									<label className="fieldset-label font-semibold">
										Max size 2MB
									</label>
								</fieldset>
							</div>
							<AccountFormikInput
								label="Display Name"
								type="text"
								name="displayName"
								errors={errors.displayName}
								touched={touched.displayName}
							/>
							<div className="flex flex-col justify-between md:flex-row md:gap-3">
								{/* Desktop Version - Visible only on desktop */}
								<div className="hidden w-full flex-col gap-2 md:flex md:w-1/2">
									<AccountFormikInput
										label="First Name"
										type="text"
										name="firstName"
										errors={errors.firstName}
										touched={touched.firstName}
									/>
									<AccountFormikInput
										label="Birth Date"
										type="date"
										name="birthDate"
										errors={errors.birthDate}
										touched={touched.birthDate}
									/>
								</div>
								<div className="hidden w-full flex-col gap-2 md:flex md:w-1/2">
									<AccountFormikInput
										label="Last Name"
										type="text"
										name="lastName"
										errors={errors.lastName}
										touched={touched.lastName}
									/>
									<AccountFormikInput
										label="Phone Number"
										type="tel"
										name="phone"
										errors={errors.phone}
										touched={touched.phone}
									/>
								</div>

								{/* Mobile Version - Visible only on mobile */}
								<div className="flex w-full flex-col gap-2 md:hidden">
									<AccountFormikInput
										label="First Name"
										type="text"
										name="firstName"
										errors={errors.firstName}
										touched={touched.firstName}
									/>
									<AccountFormikInput
										label="Last Name"
										type="text"
										name="lastName"
										errors={errors.lastName}
										touched={touched.lastName}
									/>
								</div>
								<div className="flex w-full flex-col gap-2 md:hidden">
									<AccountFormikInput
										label="Birth Date"
										type="date"
										name="birthDateMobile"
										errors={errors.birthDate}
										touched={touched.birthDate}
									/>
									<AccountFormikInput
										label="Phone Number"
										type="tel"
										name="phoneMobile"
										errors={errors.phone}
										touched={touched.phone}
									/>
								</div>
							</div>

							<AccountFormikInput
								label="Email"
								type="email"
								name="email"
								errors={errors.email}
								touched={touched.email}
							/>

							<AccountFormikInput
								label="Description"
								type="text"
								name="description"
								errors={errors.description}
								touched={touched.description}
							/>
							<AccountFormikInput
								label="Location"
								type="text"
								name="location"
								errors={errors.location}
								touched={touched.location}
							/>

							<div className="flex items-center justify-center">
								<button
									type="submit"
									disabled={isSubmitting}
									className={`mt-2 w-3/4 md:w-1/2 rounded px-4 py-3 text-white focus:outline-none ${
										isSubmitting
											? "cursor-not-allowed bg-gray-400"
											: "bg-gradient-to-r from-primary-content to-secondary-content hover:from-base-200 hover:to-base-300"
									}`}
								>
									Save Changes
								</button>
							</div>
							{showSubmitPopup && (
								<div className="fixed bottom-5 right-5 rounded bg-green-500 px-4 py-2 text-white shadow-lg">
									Changes have been saved successfully!
								</div>
							)}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
