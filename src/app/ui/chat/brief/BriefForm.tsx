"use client";
import "daisyui";
import { briefSchema } from "@/app/ui/chat/schemas/FormSchemas";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { FormikInput, FormikCheckbox, FormikFileInput } from "../FormikInput";
import {
	createCommission,
	getCommissionById,
} from "@/service/commissionService";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { io } from "socket.io-client";
import { createMessage } from "@/service/chatService";
import { useEffect, useState } from "react";
import { isCommissionEnded } from "../commissionState";
import { setLatestCommission } from "@/stores/features/commisionSlice";

interface ModalProps {
	id: string;
	refresh: boolean;
}

export const BriefForm = () => {
	const dispatch = useAppDispatch();
	const artistId = useAppSelector((state) => {
		if (state.chat.activeRoom?.user2) {
			return state.chat.activeRoom.user2.userId;
		}
		return null;
	});

	const loggedInUserId = useAppSelector((state) => state.user.user!.userId);
	const activeRoomId = useAppSelector((state) => {
		if (state.chat.activeRoom) {
			return state.chat.activeRoom.chatRoomId;
		}
		return null;
	});

	const latestCommission = useAppSelector(
		(state) => state.commission.latestComission,
	);

	type formSchema = yup.InferType<typeof briefSchema>;
	const initialValues: formSchema = useAppSelector((state) => {
		if (
			state.commission.latestComission &&
			state.commission.latestComission.state !== "FINISHED"
		) {
            const { commissionName, briefDescription, commercialUse, deadline, budget } = state.commission.latestComission;
			return { commissionName, briefDescription, commercialUse, deadline: new Date(deadline), budget };
		}

		return {
			commissionName: "",
			briefDescription: "",
			deadline: new Date(),
			budget: 500,
			commercialUse: false,
		};
	});

	const handleSubmit = async (
		values: formSchema,
		{ resetForm }: { resetForm: () => void }, // Accept resetForm from Formik
	) => {
		try {
			const { commission } = await createCommission({
				...values,
				artistId: artistId,
				customerId: loggedInUserId,
				chatRoomId: activeRoomId,
			});

			dispatch(setLatestCommission(commission));
			resetForm();

			// @ts-ignore
			document.getElementById("brief-form").close();
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div>
			<dialog
				id="brief-form"
				className="modal modal-bottom sm:modal-middle"
			>
				<div className="modal-box">
					{/* <div className="flex min-h-screen items-center justify-center"> */}
					<div className="m-auto w-full max-w-lg rounded-md bg-white p-2">
						<h1 className="flex justify-center text-3xl font-bold">
							Brief
						</h1>
						<Formik
							initialValues={initialValues}
							validationSchema={briefSchema}
							enableReinitialize={true}
							onSubmit={(values, { resetForm }) =>
								handleSubmit(values, { resetForm })
							}
						>
							{({
								isSubmitting,
								errors,
								touched,
								resetForm,
								setFieldValue,
							}) => (
								<Form className="space-y-4" autoComplete="off">
									<FormikInput
										label="Name"
										type="text"
										name="commissionName"
										errors={errors.commissionName}
										touched={touched.commissionName}
										placeholder="Name of your artwork"
									/>
									<FormikInput
										label="Details"
										type="textarea"
										name="briefDescription"
										errors={errors.briefDescription}
										touched={touched.briefDescription}
										placeholder="what do you want your artwork to be?"
									/>
									<FormikInput
										label="deadline"
										type="date"
										name="deadline"
                                        // @ts-ignore
										errors={errors.deadline}
                                        // @ts-ignore
										touched={touched.deadline}
										placeholder="Deadline of your artwork."
									/>
									<FormikInput
										label="Price"
										type="number"
										name="budget"
										errors={errors.budget}
										touched={touched.budget}
										placeholder="Price of your artwork (THB)"
									/>
									<FormikCheckbox
										label=""
										name="commercialUse"
										errors={errors.commercialUse}
										touched={touched.commercialUse}
									/>
									{/* <FormikFileInput label="Draft" name="file" setFieldValue={setFieldValue} /> */}
									<div className="flex items-center justify-center gap-2">
										<button
											type="submit"
											disabled={isSubmitting}
											className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${
												isSubmitting
													? "cursor-not-allowed bg-gray-400"
													: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
											}`}
										>
											Send
										</button>

										<button
											className="w-1/2 rounded bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 text-white hover:from-blue-700 hover:to-purple-700"
											type="button"
											onClick={() => {
												resetForm();
												// @ts-ignore
												document.getElementById("brief-form").close();
											}}
										>
											Cancel
										</button>
									</div>
								</Form>
							)}
						</Formik>
						{/* </div> */}
					</div>
				</div>
			</dialog>
		</div>
	);
};
