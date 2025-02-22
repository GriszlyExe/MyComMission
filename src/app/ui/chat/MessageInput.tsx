import React, { useState } from "react";

const MessageInput = () => {
	const [message, setMessage] = useState<string>("");

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (message.trim()) {
			console.log("Message sent:", message);
			setMessage("");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-row items-center gap-2 border-t border-gray-200 p-2"
		>
			<input
				type="text"
				value={message}
				placeholder="Type your message..."
				onChange={(e) => setMessage(e.target.value)}
				className="input input-bordered input-primary w-full focus:ring-primary"
			/>
			<button
				type="submit"
				className="ml-3 rounded-md bg-primary px-8 py-3 text-white hover:bg-accent 
                            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
			>
				Send
			</button>
		</form>
	);
};

export default MessageInput;
