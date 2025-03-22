import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { getPostByUserId } from "@/service/postService";
import {
	setLoggedInUserPosts,
	setPagePosts,
} from "@/stores/features/postSlice";
import { useParams } from "next/navigation";
import UnboostedPostWidget from "../components/unboostedPostWidget";
import PlanSelectModal from "./plan-select-modal";

interface ModalProps {
	modalId: string;
}

export default function BoostModal({ modalId }: ModalProps) {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.post.pagePosts);
	const sortedPosts = [...posts].sort(
		(post1, post2) =>
			new Date(post2.createdAt).getTime() -
			new Date(post1.createdAt).getTime(),
	);
	const loggedInUser = useAppSelector((state) => state.user.user!);
	const { id } = useParams();

	// State to track selected post IDs
	const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
	const [selectAll, setSelectAll] = useState(false);
	const selectAllText = selectAll ? "Clear All" : "Select All";
	useEffect(() => {
		getPostByUserId(loggedInUser.userId).then(({ posts }) => {
			if (id && id === loggedInUser.userId) {
				dispatch(setLoggedInUserPosts(posts));
			}
			dispatch(setPagePosts(posts));
		});
	}, []);

	// Function to handle checkbox selection
	const handleSelectPost = (postId: string, isChecked: boolean) => {
		setSelectedPosts((prev) =>
			isChecked ? [...prev, postId] : prev.filter((id) => id !== postId),
		);
	};

	// Function to handle "Select All" toggle
	const handleSelectAll = () => {
		if (selectAll) {
			setSelectedPosts([]); // Deselect all
		} else {
			const allUnboostedIds = posts
				// .filter((post) => !post.isBoosted)
				.filter((post) => new Date(post.boostExpiredDate) < new Date())
				.map((post) => post.postId);
			setSelectedPosts(allUnboostedIds);
		}
		setSelectAll(!selectAll);
	};

	// Function to handle "Boost" button click
	const handleBoost = () => {
		setSelectAll(false);
		console.log("Boosting posts:", selectedPosts);

		// Auto-close modal
		(document.getElementById(modalId) as HTMLDialogElement)?.close();
		(
			document.getElementById("selectBoostingPlan") as HTMLDialogElement
		)?.showModal();
		// Get all elements with the ID 'selectBoostingPlan'
		const modals = document.querySelectorAll("#selectBoostingPlan");

		// Log all the selected elements to the console for debugging
		console.log("All selectBoostingPlan modals:", modals);
	};

	return (
		<div>
			<dialog id={modalId} className="modal">
				<div className="modal-box h-[80vh] w-11/12 max-w-5xl">
					{/* Select All Checkbox */}

					<div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white">
						<h1>{selectedPosts.length} Posts Selected</h1>
						<button
							className="flex cursor-pointer items-center justify-end rounded-2xl p-4 hover:bg-gray-300"
							type="button"
							onClick={handleSelectAll}
						>
							<div
								className="flex items-center gap-2"
								// checked={selectAll}
							/>
							{selectAllText}
						</button>
					</div>

					{/* Scrollable Post Container */}
					<div className="mt-1 max-h-[460px] overflow-y-auto overflow-x-hidden scrollbar-hidden">
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
							{posts
								// filter only unboosted posts
								.filter(
									(post) =>
										new Date(post.boostExpiredDate) <
										new Date(),
								)
								.sort(
									(post1, post2) =>
										new Date(post2.createdAt).getTime() -
										new Date(post1.createdAt).getTime(),
								)
								.map((post) => (
									<UnboostedPostWidget
										key={post.postId}
										post={post}
										user={loggedInUser}
										onSelect={handleSelectPost}
										isChecked={selectedPosts.includes(
											post.postId,
										)}
									/>
								))}
						</div>
					</div>

					{/* Boost Button */}
					<div className="sticky bottom-0 z-10 mt-4 flex justify-end border-t bg-white p-4">
						<button
							className="min-w-24 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
							onClick={handleBoost}
							disabled={selectedPosts.length === 0} // Disable if no selection
						>
							Next
						</button>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
			<PlanSelectModal
				modalId="selectBoostingPlan"
				selectedPosts={selectedPosts}
			/>
		</div>
	);
}
