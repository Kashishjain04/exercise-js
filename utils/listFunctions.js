import { parkingLot } from "./index.js";

function listRecents() {
	const recents = parkingLot.listRecent();
	console.log(recents);
	if (recents.length === 0) {
		return { error: "No cars parked recently." };
	}
	return { cars: recents };
}

function listAll() {
	const all = parkingLot.listAll();
	if (all.length === 0) {
		return { error: "No cars parked here." };
	}
	return { cars: all };
}

export { listAll, listRecents };
