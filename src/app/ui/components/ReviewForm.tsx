"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { createReview } from "@/service/reviewService";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/stores/hook";
import { addReview } from "@/stores/features/reviewSlice";
import { useState } from "react";

const reviewSchema = yup.object().shape({
	rating: yup.number().required("Rating is required"),
});

export default function ReviewForm() {
	const { id } = useParams();
	const dispatch = useAppDispatch()
	const [showSubmitReview, setShowSubmitReview] = useState(false);

	return (
		// <div className="card mx-4 border-2 rounded-md shadow-lg shadow-gray-400 border-none bg-white p-4">
		<div className="card mx-4 border-2 rounded-md shadow-md border-none bg-white p-4"> 
			<h1 className="mb-2 text-center text-lg font-bold">
				Rate the Artist
			</h1>
			<Formik
				initialValues={{ rating: "", review: "" }}
				validationSchema={reviewSchema}
				onSubmit={async (values, actions) => {
					let data = {
						revieweeId: id,
						rating: values.rating,
						description: values.review
					}
					const { review } = await createReview({ data })
					// console.log(review)
					dispatch(addReview(review));
					actions.resetForm();

					setShowSubmitReview(true);
					setTimeout(() => {
					  setShowSubmitReview(false);
					}, 3000);
				}}
			>
				{({ isSubmitting, setFieldValue, values }) => (
					<Form>
						<div className="m-auto flex w-full flex-col gap-2">
							<div className="flex flex-row gap-2">
								<h2>What's your rating </h2>
								<div className="rating rating-half rating-md">
									<Field
										type="radio"
										name="rating"
										className="rating-hidden hover:cursor-default"
										value={0}
										checked={Number(values.rating) == 0}
										onChange={() =>
											setFieldValue("rating", 0)
										}
										disabled
									/>
									{[
										0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5,
									].map((val) => (
										<Field
											key={val}
											type="radio"
											name="rating"
											className={`mask ${val % 1 === 0.5 ? "mask-half-1" : "mask-half-2"} mask-star-2 bg-yellow-400`}
											value={val}
											checked={
												Number(values.rating) == val
											}
											onChange={() =>
												setFieldValue("rating", val)
											}
										/>
									))}
								</div>
							</div>
							<ErrorMessage
								name="rating"
								component="p"
								className="text-xs text-error"
							/>
							<h2>Your Review:</h2>
							<Field
								as="textarea"
								name="review"
								className="h-32 w-full flex-grow resize-none rounded-md border pl-3 pt-2"
								placeholder="Share your thoughts about the artist..."
							/>
							<ErrorMessage
								name="review"
								component="p"
								className="text-xs text-error"
							/>
						</div>
						<div className="bottom-0 right-0 mt-4 flex justify-end">
							{	showSubmitReview && 
								<div className="toast z-30">
									<div className="alert bg-green-500 text-white border-none">
										<span>The review has been submitted</span>
									</div>
								</div>
							}
							<button
								type="submit"
								disabled={isSubmitting}
								className="rounded-md bg-primary px-4 py-2 text-white hover:bg-accent active:bg-black"
							>
								{isSubmitting ? "Submitting..." : "Submit"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
