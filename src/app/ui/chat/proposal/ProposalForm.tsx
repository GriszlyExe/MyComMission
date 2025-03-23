import { Form, Formik } from "formik";
import React from "react";

/* form schema */
import { proposalSchema } from "@/app/ui/chat/schemas/FormSchemas";

/* Formik + yup */
import { FormikInput } from "../FormikInput";
import * as yup from "yup";
import { acceptBrief } from "@/service/commissionService";
import { useAppSelector } from "@/stores/hook";

const ProposalForm = () => {

	const commissionId = useAppSelector(state => state.commission.latestComission?.commissionId);
	const artistId = useAppSelector(state => state.commission.latestComission?.artistId);
	const loggedInUserId = useAppSelector(state => state.user.user!.userId);

	if (artistId !== loggedInUserId) {
		console.log(`${artistId} ${loggedInUserId}`);
		throw new Error("Not the artist for the commission");
	}
	
	type formSchema = yup.InferType<typeof proposalSchema>;

	const initialValues: formSchema = {
		expectedDate: new Date(),
		proposalPrice: "",
	};

	const handleSubmit = async (values: formSchema, { resetForm }: any) => {
		try {
			await acceptBrief(commissionId, {
				...values,
				artistId,
			});
			resetForm();
			// @ts-ignore
			document.getElementById(`proposal-form-${commissionId}`).close();
			// @ts-ignore
			document.getElementById(`commission-modal-${commissionId}`).close();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<dialog id={`proposal-form-${commissionId}`} className="modal">
			<div className="modal-box">
				<h3 className="text-xl font-bold">Proposal</h3>
				<Formik
					initialValues={initialValues}
					validationSchema={proposalSchema}
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
								label="expectedDate"
								type="date"
								name="expectedDate"
								errors={errors.expectedDate}
								touched={touched.expectedDate}
								placeholder="Expected finish date of your artwork."
							/>
							<FormikInput
								label="Price"
								type="number"
								name="proposalPrice"
								errors={errors.proposalPrice}
								touched={touched.proposalPrice}
								placeholder="Price of your artwork (THB)"
							/>
							{/* <FormikFileInput label="Draft" name="file" setFieldValue={setFieldValue} /> */}
							<div className="flex items-center justify-center gap-2">
								<button
									type="submit"
									disabled={isSubmitting}
									className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${
										isSubmitting
											? "cursor-not-allowed bg-gray-400"
											: "bg-gradient-to-r from-primary-content to-secondary-content hover:from-base-200 hover:to-base-300"
									}`}
								>
									Send
								</button>
								<button
									className="w-1/2 rounded bg-gradient-to-r from-primary-content to-secondary-content px-4 py-3 text-white hover:from-base-200 hover:to-base-300"
									type="button"
									onClick={() => {
										resetForm();
                                        // @ts-ignore
										document.getElementById(`proposal-form-${commissionId}`).close();
									}}
								>
									Cancel
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</dialog>
	);
};

export default ProposalForm;
