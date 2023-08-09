import { parkingLot } from "./index.js";

function parkCar(regNo) {
	const res = parkingLot.parkCar(regNo);
	if (res.error) {
		return `Error: ${res.error}`;
	} else {
		return `Your car is parked at slot no: ${res.slotId}`;
	}
}

function pickupCar(regNo) {
	const res = parkingLot.findCar(regNo);
	if (res.slotId) {
		return `Take your car from slot: ${res.slotId}`;
	} else {
		return "Car not found!";
	}
}

export { parkCar, pickupCar };
