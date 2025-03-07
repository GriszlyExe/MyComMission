import Link from "next/link";
import { Review, User } from "@/common/model";
import { getUserInfo } from "@/service/userService";
import { useState } from "react";
import { useEffect } from "react";

interface ReviewProps {
	review: Review;
}

export default function ReviewWidget( { review }: ReviewProps ) {
	const uniqueId = Math.random().toString(36).substring(7);
	const [user, setUser] = useState<{ displayName: string; profileUrl: string } | null>(null);
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	console.log(review)

	useEffect(() => {
        getUserInfo(review.reviewerId).then(setUser);
    }, [review.reviewerId]);
	
	return (
		<div className="card w-full border-2 border-primary bg-white p-4">
			{/* Review Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<div className="aspect-square">
						{/* <img
								src={user ? user.profileUrl : "/default-profile-2.png"}
								alt="User Avatar"
								width={50}
								height={50}
								className="h-full overflow-hidden rounded-full object-cover"
							/> */}
						<img
							src={ user ? user.profileUrl : "/avatar.png"}
							alt="User Avatar"
							width={50}
							height={50}
							className="h-full overflow-hidden rounded-full object-cover"
						/>
					</div>
					<div>
						{/* <Link href={`/profile/${post.artistId}`}>
								<p className="font-semibold">
									{user ? user.displayName : "display name"}
								</p>
							</Link> */}
						<Link href="#">
							<p className="font-semibold">{user?.displayName}</p>
						</Link>
						<p className="text-xs text-gray-500">{`${new Date(review.createdAt).getDate()} ${month[new Date(review.createdAt).getMonth()]} ${new Date(review.createdAt).getFullYear()}`}</p>
					</div>
				</div>
			</div>

			{/* Review Content */}
			{/* <p className="mt-2 text-gray-800">{post.postDescription}</p> */}
			<div className="rating rating-half rating-sm mt-2">
				<div className="flex flex-row gap-2 items-center">
					<div className="rating rating-half rating-sm">
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-1 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked={review.rating === 0.5}
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-2 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked={review.rating === 1}
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-1 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked={review.rating === 1.5}
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-2 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked={review.rating === 2}
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-1 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked={review.rating === 2.5}
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-2 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked={review.rating === 3}
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-1 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked={review.rating === 3.5}
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-2 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked={review.rating === 4}
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-1 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked={review.rating === 4.5}
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-2 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked={review.rating === 5}
						/>
					</div>
                    <p className="text-gray-800 text-sm">{review.rating} out of 5 stars</p>
				</div>
			</div>
			<p className="mt-2 text-gray-800">
				{review.description}
			</p>
		</div>
	);
}
