class ParkingLot {
	maxSlots = 10;

	occupiedSlots = [];
	availableSlots = [];

	constructor() {
		const localOccupied = localStorage.getItem("occupiedSlots");
		const localAvailable = localStorage.getItem("availableSlots");

		if (localOccupied) this.occupiedSlots = JSON.parse(localOccupied);
		if (localAvailable) this.availableSlots = JSON.parse(localAvailable);

		if (!localAvailable || !localOccupied) {
			this.occupiedSlots = [];
			this.availableSlots = [];
			for (let i = 0; i < this.maxSlots; i++) {
				this.availableSlots.push(i);
			}
			this.updateLocaStorage();
		}
	}

	updateLocaStorage() {
		localStorage.setItem("availableSlots", JSON.stringify(this.availableSlots));
		localStorage.setItem("occupiedSlots", JSON.stringify(this.occupiedSlots));
	}

	emptySlot(idx) {
		if (this.occupiedSlots.length <= idx) return { error: "Invalid index passed to delete." };
		const slot = this.occupiedSlots[idx];

		this.occupiedSlots.splice(idx, 1);
		this.availableSlots.push(slot.slotId);

		this.updateLocaStorage();
	}

	findCar(regNo) {
		const pattern = /[A-Za-z]{2}[0-9]{8}/;
		if (!pattern.exec(regNo)) return { error: "Invalid car registration number", status: 400 };
		
		const idx = this.occupiedSlots.findIndex((sl) => sl.regNo === regNo.toUpperCase());
		if (idx >= 0) {
			const slotId = this.occupiedSlots[idx].slotId;
			this.emptySlot(idx);
			return { idx, slotId, status: 200 };
		} else return { idx: -1, slotId: -1, status: 404 };
	}

	parkCar(regNo) {
		const pattern = /[A-Za-z]{2}[0-9]{8}/;
		if (!pattern.exec(regNo)) return { error: "Invalid car registration number", status: 400 };

		const already = this.occupiedSlots.find((sl) => sl.regNo === regNo.toUpperCase());
		if (already) return { error: "Car already parked!", status: 400 };

		if (this.availableSlots.length === 0) {
			return { error: "No slot available.", status: 404 };
		}

		const allotedSlot = this.availableSlots.pop();
		this.occupiedSlots.push({ slotId: allotedSlot, regNo: regNo.toUpperCase() });

		this.updateLocaStorage();
		return { message: `Your car is parked at slot no: ${allotedSlot}`, status: 200 };
	}

	listAll() {
		return this.occupiedSlots.sort((a, b) => a.slotId - b.slotId);
	}

	listRecent() {
		return this.occupiedSlots.slice(-3).reverse();
	}

	reset() {
		this.occupiedSlots = [];
		this.availableSlots = [];
		for (let i = 0; i < this.maxSlots; i++) {
			this.availableSlots.push(i);
		}
		this.updateLocaStorage();
	}
}

export default ParkingLot;
