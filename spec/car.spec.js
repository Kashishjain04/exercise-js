import { parkingLot } from "./config.js";

describe("Registration Number", () => {
	beforeEach(() => parkingLot.reset());

	const tester = {
		asymmetricMatch: function (value) {
			return value.slotId !== null && value.slotId !== undefined;
		},
	};

	it("should have 2 alphabets followed by 8 digits", () => {
		expect(parkingLot.parkCar("XX11111111")).toEqual(tester);
	});

	it("should not be more or less than 10 characters long", () => {
		expect(parkingLot.parkCar("AB1234")).not.toEqual(tester);
	});

	it("should not have anything other than alphabet at first 2 places", () => {
		expect(parkingLot.parkCar("4#11111111")).not.toEqual(tester);
	});

	it("should not have any special characters", () => {
		expect(parkingLot.parkCar("AB127#@149")).not.toEqual(tester);
	});

	it("should not have any spaces", () => {
		expect(parkingLot.parkCar("AB 127 1149")).not.toEqual(tester);
	});
});
