"use client";

import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import { clearAuthToken } from "@/service/authService";
import { resetState } from "@/states/store";
import { useAppDispatch } from "@/states/hook";

type Image = {
	id: number;
	src: string;
};

const ImageCard = ({ img }: { img: Image }) => {
	return (
		<div className="h-min w-full rounded-md">
			<img src={img.src} alt="" className="rounded-md" />
		</div>
	);
};

const Images = ({ sources }: { sources: Array<Array<Image>> }) => {
	return (
		<div className="flex h-full w-full flex-col">
			{sources.map((row, idx) => (
				<div className="flex h-full w-full gap-4" key={`row-${idx}`}>
					{row.map((img) => (
						<ImageCard key={img.id} img={img} />
					))}
				</div>
			))}
		</div>
	);
};

export default function Home() {
	const dispatch = useAppDispatch();
	let mocks: Array<Array<Image>> = [];

	const tmp = Array(12)
		.fill({
			id: 1,
			src: `/avatar.png`,
		})
		.map((val, idx) => {
			return { id: idx + 1, src: `${idx + 1}.png` };
		});

	// console.log(`Number of images: ${tmp.length}`);
	// console.log(tmp);

	while (tmp.length) {
		mocks.push(tmp.splice(0, 4));
	}

	useEffect(() => {
		clearAuthToken();
		dispatch(resetState());
	}, []);

	return (
		<>
			<Head>
				<title>MyCommission</title>
			</Head>
			<div className="h-full bg-[#2F2F2F] p-10">
				<div className="flex h-full flex-row">
					<div className="flex w-5/12 flex-col gap-7 p-10">
						{/* */}
						<div className="flex flex-col justify-center gap-7 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text p-5 text-transparent">
							{/* <span className="text-8xl font-bold text-[#6BDFDA]"> */}
							<span className="text-7xl font-bold">Design</span>
							<span className="text-7xl font-bold">
								{/* <h1 className="text-8xl font-bold text-[#9AD7F3]"> */}
								Create
							</span>
							{/* <h1 className="text-8xl font-bold text-[#FEC3C7]"> */}
							<span className="text-7xl font-bold">Inspire</span>
						</div>

						<div className="">
							<p className="text-left text-2xl text-white">
								Fusce pretium porttitor eleifend. Fusce interdum
								elit id erat mattis viverra. Morbi scelerisque
								hendrerit mauris sed consequat. Vestibulum ante
								ipsum primis in faucibus orci luctus et ultrices
								posuere cubilia curae;
							</p>
						</div>

						<div>
							<button className="w-1/3 rounded-lg bg-white px-5 py-4">
								<Link
									href={`/login`}
									className="text-2xl font-bold"
								>
									Get started
								</Link>
							</button>
						</div>
					</div>
					<div className="w-7/12 p-10">
						<Images sources={mocks} />
					</div>
				</div>
			</div>
		</>
	);
}
