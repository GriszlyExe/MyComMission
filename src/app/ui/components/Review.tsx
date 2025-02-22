import ReviewForm from "./ReviewForm";
import ReviewWidget from "./ReviewWidget";

export default function Review( { userId }: { userId: string | undefined } ) {
	return (
		<div className="flex flex-col gap-2 py-4">
            <ReviewForm userId={userId}/>
			<div className="flex w-full flex-col items-center space-y-4 p-4">
				<ReviewWidget />
				<ReviewWidget />
				<ReviewWidget />
			</div>
		</div>
	);
}
