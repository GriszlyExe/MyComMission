import { Download } from "lucide-react";
import React, { useState } from "react";
import { states } from "./commissionState";
import "daisyui";
// import { acceptArtwork, rejectArtwork } from '@/service/commissionService';
import { useAppSelector } from "@/stores/hook";

/* data model */
import { Message } from "@/common/model";
import { acceptArtwork } from "@/service/commissionService";

export default function ArtworkInChat({ message }: { message: Message }) {
	// const artistId = useAppSelector((state) => {
	// 	if (state.chat.activeRoom?.user2) {
	// 		return state.chat.activeRoom.user2.userId;
	// 	}
	// 	return null;
	// });
	// console.log(message);
	const customerId = useAppSelector((state) => {
		if (state.chat.activeRoom?.latestCommission) {
			return state.chat.activeRoom.latestCommission.customerId;
		}
		return null;
	});
	const userId = useAppSelector((state) => state.user.user?.userId);
	// const isArtist = artistId === userId;
	const isCustomer = customerId === userId;
	const isShipped = useAppSelector(state => {
		const latestCommission = state.chat.activeRoom!.latestCommission;
		return latestCommission && (latestCommission.state === states.artwork_shipped);
	});

	const latestCommission = useAppSelector((state) => {
		if (state.chat.activeRoom?.latestCommission) {
			return state.chat.activeRoom.latestCommission;
		}
		return null;
	});

	if (!latestCommission) {
		return null;
	}

	const acceptArtworkId = `accept-artwork-model-${latestCommission?.commissionId}`;
	const handleAcceptArtwork = async () => {
		try {
			await acceptArtwork(latestCommission.commissionId, { customerId });
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="flex flex-col items-center gap-4 rounded-md bg-white">
			{/* <h1 className='font-bold text-lg text-white'>Artwork</h1> */}
			<div className="card md:w-96 bg-base-100 shadow-md border border-secondary">
				<figure>
					<img
						src={message.content}
						alt="Shoes"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						Card Title
						{/* <div className="badge badge-secondary">NEW</div> */}
					</h2>
					<p>
						A card component has a figure, a body part, and inside
						body there are title and actions parts
					</p>
					{isCustomer && isShipped && <div className="card-actions justify-end">
						{/* @ts-ignore */}
						<div className="badge badge-outline" onClick={() => document.getElementById(acceptArtworkId)!.show()}>Accept</div>
						<div className="badge badge-outline">Reject</div>
					</div>}
				</div>
			</div>			
			<dialog
				id={acceptArtworkId}
				className="modal modal-bottom sm:modal-middle bg-black bg-opacity-50"
			>
				<div className="modal-box">
					<h1 className="flex justify-center text-xl font-bold">
						Do you want to accept this artwork?
					</h1>
					<div className="shadow-sm-white m-auto flex w-full max-w-lg flex-row justify-center gap-x-3 rounded-md bg-white p-6">
						<button
							className="flex min-w-40 justify-center rounded bg-gradient-to-r from-primary-content to-secondary-content px-4 py-3 text-white hover:from-base-200 hover:to-base-300"
							type="button"
							onClick={() => handleAcceptArtwork()}
						>
							Accept
						</button>
						<button
							className="flex min-w-40 justify-center rounded bg-gradient-to-r from-primary-content to-secondary-content px-4 py-3 text-white hover:from-base-200 hover:to-base-300"
							type="button"
							onClick={() =>
								// @ts-ignore
								document.getElementById(acceptArtworkId)?.close()
							}
						>
							Cancel
						</button>
					</div>
				</div>
			</dialog>
		</div>
	);
}
