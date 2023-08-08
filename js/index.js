import ParkingLot from "./ParkingLot.js";
import { activatePage, listAll, listRecents, parkCar, pickupCar } from "./handlers.js";

const parkingLot = new ParkingLot();

window.onload = () => {
	const allBtns = document.getElementsByClassName("nav_btn");
	for (let i = 0; i < allBtns.length; i++)
		allBtns[i].addEventListener("click", () => activatePage(allBtns[i]));

	document.getElementById("park_form")?.addEventListener("submit", parkCar);
	document.getElementById("pickup_form")?.addEventListener("submit", pickupCar);

	listRecents();
	listAll();
};

export { parkingLot };
