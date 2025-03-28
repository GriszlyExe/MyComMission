export default function UserWidgetForAdmin() {
	return (
		<tr>
			<td>
				<div className="flex items-center gap-3">
                    <div className="">
					<div className="aspect-square w-14 overflow-hidden rounded-full p-[4px]">
						<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
							<img
								src="/avatar.png"
								alt=""
								width={60}
								height={60}
								className="h-full w-full overflow-hidden rounded-full object-cover"
							/>
						</div>
					</div>
				</div>
					<div>
						<div className="font-bold">Hart Hagerty</div>
						<div className="text-sm opacity-50">United States</div>
					</div>
				</div>
			</td>
			<td>
				Hart@gmail.com
				<br />
				{/* <span className="badge badge-ghost badge-sm bg-gray-300">
					Desktop Support Technician
				</span> */}
			</td>
			<td>Good</td>
			<th>
				<button className="btn bg-pink-600 text-white btn-sm">Banned</button>
			</th>
		</tr>
	);
}
