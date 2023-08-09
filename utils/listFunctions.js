import { parkingLot } from "../js/index.js";

function listRecents() {
	const recents = parkingLot.listRecent();
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
