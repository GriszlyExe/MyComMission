import ReviewForm from "./ReviewForm";
import ReviewWidget from "./ReviewWidget";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { useEffect } from "react";
import { getReviewByUserId } from "@/service/reviewService";
import {
	setLoggedInUserReviews,
	setPageReviews,
} from "@/stores/features/reviewSlice"
import { useParams } from "next/navigation";

export default function Review() {
	/* const reviews = await getReviewByUserId(id as string)
	console.log(reviews) */
	const dispatch = useAppDispatch();
	const reviews = useAppSelector((state) => state.review.pageReviews);
	const user = useAppSelector((state) => state.user.user)!;
	const { id } = useParams()

	useEffect(() => {
		getReviewByUserId(id as string).then(({ data }) => {
			console.log(data)
			if (id && id === user!.userId) {
				dispatch(setLoggedInUserReviews(data));
			}
			dispatch(setPageReviews(data));
		})
	}, []);

	return (
		<div className="flex flex-col gap-2 py-4">
            {user.userId !== id && <ReviewForm />}
			<div className="flex w-full flex-col items-center space-y-4 p-4">
				{reviews.map((review) => (
					<ReviewWidget key={`${review.reviewId}`} review={ review }/>	
				))}
			</div>
		</div>
	);
}
