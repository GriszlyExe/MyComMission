export default function UserWidgetSmall() {
	const isBanned = true;
	return (
		<tr>
			<td>
				<div className="flex items-center gap-3">
					<div>
						<div className="font-bold">Hart Hagerty</div>
						<div className="text-sm opacity-50">Hart@gmail.com</div>
					</div>
				</div>
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
