"use client";

import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import { clearAuthToken } from "@/service/authService";
import { resetState } from "@/stores/store";
import { useAppDispatch } from "@/stores/hook";

type Image = {
	id: number;
	src: string;
};

const ImageCard = ({ img }: { img: Image }) => {
	return (
		<div className="h-min w-full rounded-md">
			<div className="aspect-square rounded-lg bg-white p-1 shadow-lg">
				<img
					src={img.src}
					alt=""
					className="h-full w-full rounded-md object-cover hover:ring-8 hover:ring-white"
				/>
			</div>
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
			<div className="from- via- to- h-full bg-gradient-to-r from-primary-content via-neutral-900 to-secondary-content px-10">
				<div className="flex h-full flex-row">
					<div className="flex w-full flex-col gap-7 p-10 md:w-5/12">
						{/* */}
						{/* <div className="flex flex-col justify-center gap-7 bg-gradient-to-r
						 from-blue-500 to-purple-500 bg-clip-text p-5 text-transparent" */}
						<div
							className="flex flex-col justify-center gap-7 p-5 text-white shadow-lg"
							style={{
								textShadow: "initial",
							}}
						>

							{["Wealth", "Fame", "Power"].map(word => (
								<span className="text-7xl font-bold" key={`root-title-${word}`}>{word}</span>
							))}
							
						</div>
						<div className="rounded-2xl p-4 shadow-md backdrop-blur-md">
							<p className="text-left text-xl font-bold text-white">
								"You want my treasure? You can have it. I left
								everything I gathered together in one place, now
								you just have to find it". These words lured men
								to the Grand Line in pursuit of dreams greater
								than they'd ever dared to imagine. This is the
								time known as the great pirate era.
							</p>
						</div>

						<div>
							<Link
								href={`/login`}
								className="text-2xl font-bold"
							>
								<button className="w-full rounded-lg bg-white px-5 py-4 text-black hover:bg-accent hover:text-white md:w-1/3">
									Get started
								</button>
							</Link>
						</div>
					</div>
					<div className="hidden w-7/12 p-10 md:block">
						<Images sources={mocks} />
					</div>
				</div>
			</div>
		</>
	);
}
