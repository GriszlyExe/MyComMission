"use client";

interface ImageModalProps {
	imageSrc: string;
	onClose: () => void;
}

export default function ImageModal({ imageSrc, onClose }: ImageModalProps) {
    console.log(imageSrc)
	return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="relative max-w-full max-h-full overflow-hidden"
                // onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
            >
                <img
                    src={imageSrc}
                    alt="Full-size"
                    className="rounded-lg w-auto max-w-full max-h-[90vh] object-contain"
                />
                {/* <button
                    className="absolute top-2 right-2 text-white text-xl bg-black rounded-full p-2"
                    onClick={onClose}
                >
                    X
                </button> */}
            </div>
        </div>
		// <dialog className="modal open">
		// 	<div className="modal-box w-11/12 max-w-3xl fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
		// 		<img src={imageSrc} alt="Full Image" className="w-full h-auto rounded-lg" />
		// 	</div>
		// 	<form method="dialog" className="modal-backdrop">
		// 		<button onClick={onClose}>close</button>
		// 	</form>
		// </dialog>
	);
}
