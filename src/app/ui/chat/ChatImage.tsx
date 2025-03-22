"use client";

import { useState } from "react";
import ImageModal from "../components/ImageModal";
import { useAppSelector } from "@/stores/hook";
import { User } from "next-auth";
import { acceptArtwork, rejectArtwork } from "@/service/commissionService";

interface ChatImageProps {
    imageUrl: string;
}

export default function ChatImage({ imageUrl }: ChatImageProps) {

    const latestCommission = useAppSelector(state => {
        console.log(state)
        if (state.chat.activeRoom?.latestCommission) {
            return state.chat.activeRoom.latestCommission;
        }
        return null;
    });

    const [isOpen, setIsOpen] = useState(false);

    // Accept Action
    const handleAccept = async () => {
        try {
            console.log(" ccepted:", imageUrl);
            // Example: Send API request
            // await acceptImage(imageUrl);
            await acceptArtwork(latestCommission.commissionId);
            // alert("Image accepted!");
        } catch (error) {
            console.error("Error accepting image:", error);
        }
    };

    // Reject Action
    const handleReject = async () => {
        try {
            console.log("Rejected:", imageUrl);
            // Example: Send API request
            // await rejectImage(imageUrl);
            await rejectArtwork(latestCommission.commissionId);
            // alert("Image rejected!");
        } catch (error) {
            console.error("Error rejecting image:", error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            {/* Clickable Image */}
            <img
                src={imageUrl}
                alt="Chat Image"
                className="chat-bubble bg-accent text-white cursor-pointer max-w-xs rounded-lg"
                onClick={() => setIsOpen(true)}
            />

            {/* Accept & Reject Buttons */}
            <div className="flex items-center justify-center gap-2 w-full">
                <button
                    type="button"
                    onClick={handleAccept}
                    className="w-1/2 rounded px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                >
                    Accept
                </button>

                <button
                    type="button"
                    onClick={handleReject}
                    className="w-1/2 rounded px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                >
                    Reject
                </button>
            </div>

            {/* Image Modal */}
            {isOpen && <ImageModal imageSrc={imageUrl} onClose={() => setIsOpen(false)} />}
        </div>
    );
}