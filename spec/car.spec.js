import { parkingLot } from "./config.js";
import regNoVaildator from "../utils/regNoValidator.js";

describe("Registration Number", () => {
	beforeEach(() => parkingLot.reset());

	const tester = {
		asymmetricMatch: function (value, requiredError) {
			return value.error === requiredError;
		},
	};

	describe("to be valid", () => {
		it("should have 2 alphabets followed by 8 digits", () => {
			expect(regNoVaildator("XX11111111")).toEqual({ success: true });
		});
	});

	describe("to be invalid", () => {
		it("should be less or more than 10 characters long", () => {
			expect(regNoVaildator("AB1234")).toEqual({ error: "Length must be exactly 10 characters" });
		});

		it("should contain spaces", () => {
			expect(regNoVaildator("AB 123 456")).toEqual({error: "Spaces are not permitted"});
		})

		it("should have some special characters", () => {
			expect(regNoVaildator("AB127#@149")).toEqual({error: "No special characters permitted"});
		});

		it("should have anything other than alphabet at first 2 places", () => {
			expect(regNoVaildator("4B11111111")).toEqual({error: "First two spaces must me alphabet"});
		});

		it("should have alphabet in last 8 spaces", () => {
			expect(regNoVaildator("AB123ab123")).toEqual({error: "Last 8 characters can not have alphabet"});
		});
	});
});
