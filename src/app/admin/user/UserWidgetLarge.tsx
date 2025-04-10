export default function UserWidgetLarge() {
	const isBanned = false;
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
					</div>
				</div>
			</td>
			<td>
				Hart@gmail.com
				<br />
			</td>
			<td>
				{isBanned ? (
					<button className="btn btn-sm border-none bg-success text-white hover:bg-green-800">
						Unban
					</button>
				) : (
					<button className="btn btn-sm border-none bg-error text-white hover:bg-pink-800">
						Ban
					</button>
				)}
			</td>
		</tr>
	);
}
