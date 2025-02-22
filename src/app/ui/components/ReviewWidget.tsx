import Link from "next/link";

export default function ReviewWidget() {
	const uniqueId = Math.random().toString(36).substring(7);

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
							src="/avatar.png"
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
							<p className="font-semibold">Display Name</p>
						</Link>
						<p className="text-xs text-gray-500">{`February`}</p>
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
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-2 mask-star-2 bg-yellow-400"
							disabled
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-1 mask-star-2 bg-yellow-400"
							disabled
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-2 mask-star-2 bg-yellow-400"
							disabled
							defaultChecked
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-1 mask-star-2 bg-yellow-400"
							disabled
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-2 mask-star-2 bg-yellow-400"
							disabled
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-1 mask-star-2 bg-yellow-400"
							disabled
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-2 mask-star-2 bg-yellow-400"
							disabled
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-1 mask-star-2 bg-yellow-400"
							disabled
						/>
						<input
							type="radio"
							name={`rating-${uniqueId}`}
							className="mask mask-half-2 mask-star-2 bg-yellow-400"
							disabled
						/>
					</div>
                    <p className="text-gray-800 text-sm">2.0 out of 5 stars</p>
				</div>
			</div>
			<p className="mt-2 text-gray-800">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Accusamus nulla repellendus eos? Velit, dolorem voluptate
				deleniti saepe possimus aliquam molestias a rem laudantium odit
				suscipit quaerat quidem odio? Inventore, magni.
			</p>
		</div>
	);
}
