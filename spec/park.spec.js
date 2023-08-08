import { parkingLot } from "./config.js";

describe("ParkingLot", () => {
	beforeEach(() => parkingLot.reset());

  const tester = {
		asymmetricMatch: function (value) {
			return value.slotId !== null && value.slotId !== undefined;
		},
	};

	it("should add new car to parking lot", () => {
		expect(parkingLot.parkCar("XX11111111")).toEqual(tester);
	});

	it("should remove already parked car from parking lot", () => {
		parkingLot.parkCar("XX11111111");

		expect(parkingLot.findCar("XX11111111")).toEqual(tester);
	});

	it("should not park already parked car", () => {
		parkingLot.parkCar("XX11111111");
		expect(parkingLot.parkCar("XX11111111")).not.toEqual(tester);
	});

	it("should not find non existent car in the lot", () => {
		expect(parkingLot.findCar("XX11111111")).not.toEqual(tester);
	});
});
