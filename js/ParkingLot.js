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
		const idx = this.occupiedSlots.findIndex((sl) => sl.regNo === regNo.toUpperCase());
		if (idx >= 0) {
			const slotId = this.occupiedSlots[idx].slotId;
			this.emptySlot(idx);
			return { idx, slotId };
		} else return { idx: null, slotId: null };
	}

	parkCar(regNo) {
		const already = this.occupiedSlots.find((sl) => sl.regNo === regNo.toUpperCase());
		if (already) return { error: "Car already parked!" };

		if (this.availableSlots.length === 0) {
			return { error: "No slot available." };
		}

		const allotedSlot = this.availableSlots.pop();
		this.occupiedSlots.push({ slotId: allotedSlot, regNo: regNo.toUpperCase(), parkedOn: Date.now() });

		this.updateLocaStorage();
		return { slotId: allotedSlot };
	}

	listAll() {
		return this.occupiedSlots.sort((a, b) => a.parkedOn - b.parkedOn);
	}

	listRecent() {
		return this.occupiedSlots.sort((a, b) => b.parkedOn - a.parkedOn).slice(0,3);
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

// -1
