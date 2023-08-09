import ParkingLot from "./ParkingLot.js";
import { activatePage, listResults, parkingHandler } from "./handlers.js";

const parkingLot = new ParkingLot();

window.onload = () => {
	const allBtns = document.getElementsByClassName("nav_btn");
	for (let i = 0; i < allBtns.length; i++)
		allBtns[i].addEventListener("click", () => activatePage(allBtns[i]));

	document.getElementById("park_form")?.addEventListener("submit", (event) => parkingHandler(event, "park"));
	document.getElementById("pickup_form")?.addEventListener("submit", (event) => parkingHandler(event, "pickup"));
	
	document.getElementById("recent_btn")?.addEventListener("click", () => listResults("recents"));
	document.getElementById("all_btn")?.addEventListener("click", () => listResults("all"));
};

export { parkingLot };
