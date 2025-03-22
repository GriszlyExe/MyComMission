import { User } from "@/common/model";
import { getSuggestedArtist } from "@/service/userService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdStarRate } from "react-icons/md";

const SuggestedArtistWidget = ({ artist }: { artist: User }) => {
	return (
		<div className="flex flex-row items-center bg-slate-100 p-1 transition-transform duration-300 hover:scale-105">
			{/* User profile */}
			<div className="">
				<div className="aspect-square w-16 overflow-hidden rounded-full p-[4px]">
					<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
						<img
							src={
								artist.profileUrl
									? artist.profileUrl
									: "./default-profile-2.png"
							}
							alt=""
							width={60}
							height={60}
							className="h-full w-full overflow-hidden rounded-full object-cover"
						/>
					</div>
				</div>
			</div>
			{/* Username */}
			<div className="flex w-full flex-col justify-center p-2">
					<span className="flex flex-row gap-1">
				<Link
					href={`/profile/${artist.userId}`}
				>
						<p className="hover:underline text-base font-semibold">
							{artist.displayName}
						</p>
				</Link>
						<MdStarRate className="text-xl text-yellow-400" />
						{artist.artistRate.toFixed(2)} / 5.00
					</span>
				<span className="text-base">{artist.description}</span>
			</div>
		</div>
	);
};

const SuggestedBar = () => {
	const [artists, setArtists] = useState<User[]>([]);

	useEffect(() => {
		const fetchSuggestedArtists = async () => {
			const results = await getSuggestedArtist(5);
			console.log(results);
			setArtists(results);
		};

		fetchSuggestedArtists();
	}, []);

	return (
		<div className="flex flex-col gap-3 rounded-lg bg-white p-3">
			{artists &&
				artists.map((artist) => {
					return (
						<SuggestedArtistWidget
							artist={artist}
							key={`suggested-artist-${artist.userId}`}
						/>
					);
				})}
		</div>
	);
};

export default SuggestedBar;
