export default function Tile({title, image, ticketUrlInfo}) {
	const isSoldOut = !ticketUrlInfo.length;
	let bookingUrl = "";
	if(!isSoldOut) {
		bookingUrl = ticketUrlInfo.find(({url}) => url.includes("tktsonline.seetickets.com")) ||
			ticketUrlInfo.find(({url}) => url.includes("officiallondontheatre.seetickets.com"));
	}

	return (
		<div className={"tile"+(isSoldOut ? " disabled" : "")}>
			<img src={image} alt={title+" cover image"} />
			<h1>{title}</h1>
			{ !isSoldOut ?
				<button onClick={() => bookingUrl && window.open(bookingUrl.url)}>Book Now</button> :
				<p><b>SOLD OUT</b></p>
			}
		</div>
	);
}