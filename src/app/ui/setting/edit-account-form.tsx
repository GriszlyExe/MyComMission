"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useState } from "react";
import { accountSchema } from "@/common/Schemas";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateUser } from "@/service/userService";

/* redux */
import { useAppSelector, useAppDispatch } from "@/states/hook";
import { setUser } from "@/states/features/userSlice";

export default function EditAccountForm() {
	
	const loggedInUser = useAppSelector(state => state.user.user);
	const router = useRouter();

	const dispatch = useAppDispatch();

	const [previewPic, setPreviewPic] = useState(() => loggedInUser?.profileUrl ? loggedInUser?.profileUrl : "/default-profile-2.png");
	const [showSubmitPopup] = useState(false);

	type formSchema = yup.InferType<typeof accountSchema>;

	const initialValues = {
		displayName: loggedInUser?.displayName,
		firstName: loggedInUser?.firstName,
		lastName: loggedInUser?.lastName,
		birthDate: (loggedInUser?.birthDate as string).split(`T`)[0],
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

			dispatch(setUser({ user }));

			router.refresh();
			
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
							<div>
								<label className="mb-2 block text-sm font-bold text-gray-700">
									Display Name
								</label>
								<Field
									type="text"
									name="displayName"
									required
									className={`input input-bordered w-full ${
										errors.displayName &&
										touched.displayName
											? "input-error"
											: "input-primary"
									}`}
								/>
								<ErrorMessage
									name="displayName"
									component="p"
									className="text-xs text-error"
								/>
							</div>
							<div>
								<label className="mb-2 block text-sm font-bold text-gray-700">
									Firstname
								</label>
								<Field
									type="text"
									name="firstName"
									required
									className={`input input-bordered w-full ${
										errors.firstName && touched.firstName
											? "input-error"
											: "input-primary"
									}`}
								/>
								<ErrorMessage
									name="firstName"
									component="p"
									className="text-xs text-red-500"
								/>
							</div>
							<div>
								<label className="mb-2 block text-sm font-bold text-gray-700">
									Lastname
								</label>
								<Field
									type="text"
									name="lastName"
									required
									className={`input input-bordered w-full ${
										errors.lastName && touched.lastName
											? "input-error"
											: "input-primary"
									}`}
								/>
								<ErrorMessage
									name="lastName"
									component="p"
									className="text-xs text-red-500"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-bold text-gray-700">
									Birth Date
								</label>
								<Field
									type="date"
									name="birthDate"
									required
									className={`input input-bordered w-full ${
										errors.birthDate && touched.birthDate
											? "input-error"
											: "input-primary"
									}`}
								/>
								<ErrorMessage
									name="birthDate"
									component="p"
									className="text-xs text-red-500"
								/>
							</div>
							<div>
								<label className="mb-2 block text-sm font-bold text-gray-700">
									Phone Number
								</label>
								<Field
									type="tel"
									name="phone"
									required
									className={`input input-bordered w-full ${
										errors.phone && touched.phone
											? "input-error"
											: "input-primary"
									}`}
								/>
								<ErrorMessage
									name="phone"
									component="p"
									className="text-xs text-red-500"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-bold text-gray-700">
									Email
								</label>
								<Field
									type="email"
									name="email"
									required
									className={`input input-bordered w-full ${
										errors.email && touched.email
											? "input-error"
											: "input-primary"
									}`}
								/>
								<ErrorMessage
									name="email"
									component="p"
									className="text-xs text-red-500"
								/>
							</div>
							<div className="flex items-center justify-center">
								<button
									type="submit"
									disabled={isSubmitting}
									className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${
										isSubmitting
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
