import Link from "next/link";

export default function SuggestedBar() {
	return (
		<div className="sticky top-20 hidden w-1/3 rounded-md bg-base-300 p-4 md:mx-4 md:block">
			<h2 className="text-xl font-bold">Suggested Artist</h2>
			<ul className="mt-4 space-y-2">
				<li>
					<div className="flex flex-row">
						{/* User profile */}
						<div>
							<div className="aspect-square w-16 overflow-hidden rounded-full bg-gradient-to-b from-violet-500 via-white to-blue-500 p-[4px]">
								<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
									<img
										src="/avatar.png"
										alt=""
										width={64}
										height={64}
										className="h-full w-full overflow-hidden rounded-full object-cover"
									/>
								</div>
							</div>
						</div>
						{/* Username */}
						<div className="m-auto mx-5 w-full">
							<Link href="#" className="hover:text-blue-500">
								<span className="text-base">Artist1</span>
							</Link>
						</div>
					</div>
				</li>
				<li>
					<div className="flex flex-row">
						{/* User profile */}
						<div>
							<div className="aspect-square w-16 overflow-hidden rounded-full bg-gradient-to-b from-violet-500 via-white to-blue-500 p-[4px]">
								<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
									<img
										src="/avatar.png"
										alt=""
										width={64}
										height={64}
										className="h-full w-full overflow-hidden rounded-full object-cover"
									/>
								</div>
							</div>
						</div>
						{/* Username */}
						<div className="m-auto mx-5 w-full">
							<Link href="#" className="hover:text-blue-500">
								<span className="text-base">Artist2</span>
							</Link>
						</div>
					</div>
				</li>
				<li>
					<div className="flex flex-row">
						{/* User profile */}
						<div>
							<div className="aspect-square w-16 overflow-hidden rounded-full bg-gradient-to-b from-violet-500 via-white to-blue-500 p-[4px]">
								<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
									<img
										src="/avatar.png"
										alt=""
										width={64}
										height={64}
										className="h-full w-full overflow-hidden rounded-full object-cover"
									/>
								</div>
							</div>
						</div>
						{/* Username */}
						<div className="m-auto mx-5 w-full">
							<Link href="#" className="hover:text-blue-500">
								<span className="text-base">Artist3</span>
							</Link>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
}
