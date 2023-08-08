import { parkingLot } from "./config.js";

describe("Slot", () => {
	beforeEach(() => {
		parkingLot.reset();
	});

	const tester = {
		asymmetricMatch: function (value) {
			return value.slotId !== null && value.slotId !== undefined;
		},
	};

	it("should not pickup from empty lot", () => {
		expect(parkingLot.findCar("XX11111111")).not.toEqual(tester);
	});

	it("should not add more than 10 cars", () => {
		const slotTester = {
			asymmetricMatch: function (value) {
				return value.error === "No slot available.";
			},
		};

		parkingLot.parkCar("XX11111110");
		parkingLot.parkCar("XX11111111");
		parkingLot.parkCar("XX11111112");
		parkingLot.parkCar("XX11111113");
		parkingLot.parkCar("XX11111114");
		parkingLot.parkCar("XX11111115");
		parkingLot.parkCar("XX11111116");
		parkingLot.parkCar("XX11111117");
		parkingLot.parkCar("XX11111118");
		parkingLot.parkCar("XX11111119");

		expect(parkingLot.parkCar("XX11111120")).toEqual(slotTester);
	});
});
