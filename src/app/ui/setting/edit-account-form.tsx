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

	const loggedInUser = useAppSelector(state => state.user.user);
	const router = useRouter();

	const dispatch = useAppDispatch();

	const [previewPic, setPreviewPic] = useState(() => loggedInUser?.profileUrl ? loggedInUser?.profileUrl : "/default-profile-2.png");
	const [showSubmitPopup, setShowSubmitPopup] = useState(false);

	type formSchema = yup.InferType<typeof accountSchema>;

	const initialValues = {
		displayName: loggedInUser?.displayName,
		firstName: loggedInUser?.firstName,
		lastName: loggedInUser?.lastName,
		birthDate: (loggedInUser?.birthDate as string).split(`T`)[0],
		description: undefined,
		phone: loggedInUser?.phone,
		email: loggedInUser?.email,
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
						<Form className="space-y-4" autoComplete="off">
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

								<input
									type="file"
									name="profilePic"
									accept="image/*"
									onChange={(event) => {
										const file = event.target.files?.[0];
										if (file) {
											setFieldValue("profilePic", file);

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
									className="mt-2 rounded p-3 text-sm font-bold"
								/>
							</div>
							<AccountFormikInput label="Display Name" type="text" name="displayName"
								errors={errors.displayName} touched={touched.displayName} />

							<AccountFormikInput label="First Name" type="text" name="firstName"
								errors={errors.firstName} touched={touched.firstName} />

							<AccountFormikInput label="Last Name" type="text" name="lastName"
								errors={errors.lastName} touched={touched.lastName} />

							<AccountFormikInput label="Birth Date" type="date" name="birthDate"
								errors={errors.birthDate} touched={touched.birthDate} />

							<AccountFormikInput label="Phone Number" type="tel" name="phone"
								errors={errors.phone} touched={touched.phone} />

							<AccountFormikInput label="Email" type="email" name="email"
								errors={errors.email} touched={touched.email} />
							{/* <AccountFormikInput label="Description" type="text" name="description"
								errors={errors.description} touched={touched.description} /> */}

							<div className="flex items-center justify-center">
								<button
									type="submit"
									disabled={isSubmitting}
									className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${isSubmitting
										? "cursor-not-allowed bg-gray-400"
										: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
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
