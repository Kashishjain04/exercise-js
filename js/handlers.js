import { parkingLot } from "./index.js";

function activatePage(btn_el) {
	const id = btn_el.id.slice(0, -4);

	const component = document.getElementById(id);
	const allComponents = document.getElementsByClassName("component");
	for (let i = 0; i < allComponents.length; i++) allComponents[i].classList.add("d-none");
	component.classList.remove("d-none");

	const allBtns = document.getElementsByClassName("nav_btn");
	for (let i = 0; i < allBtns.length; i++) allBtns[i].classList.remove("active");
	const activeBtn = document.getElementById(`${id}_btn`);
	activeBtn.classList.add("active");
}

function parkCar(e) {
	e.preventDefault();
	const regNo = e.target.elements.registration.value;
	const res = parkingLot.parkCar(regNo);

	const msgContainer = document.getElementById("park_msg");
	if (res.error) {
		msgContainer.innerText = `Error: ${res.error}`;
	} else {
		msgContainer.innerText = `Your car is parked at slot no: ${res.slotId}`;
	}
	listRecents();
	listAll();
}

function pickupCar(e) {
	e.preventDefault();
	const regNo = e.target.elements.registration.value;
	const res = parkingLot.findCar(regNo);

	const msgContainer = document.getElementById("pickup_msg");
	if (res.slotId < 0) {
		msgContainer.innerText = "Car not found!";
	} else {
		msgContainer.innerText = `Take your car from slot: ${res.slotId}`;
	}
	listRecents();
	listAll();
}

function listRecents() {
	const tableBody = document.getElementById("recent_body");
	tableBody.innerHTML = "";
	const recents = parkingLot.listRecent();
	if (recents.length === 0) {
		return (tableBody.innerHTML = `<tr><td colspan="2"><h4>No cars parked recently.</h4></td></tr>`);
	}
	recents.forEach((item) => {
		const tr = document.createElement("tr");
		const td1 = document.createElement("td");
		const td2 = document.createElement("td");
		td1.innerText = item.slotId;
		td2.innerText = item.regNo;
		tr.appendChild(td1);
		tr.appendChild(td2);
		tableBody.appendChild(tr);
	});
}

function listAll() {
	const tableBody = document.getElementById("all_body");
	tableBody.innerHTML = "";
	const all = parkingLot.listAll();
	if (all.length === 0) {
		return (tableBody.innerHTML = `<tr><td colspan="2"><h4>No cars parked here.</h4></td></tr>`);
	}
	all.forEach((item) => {
		const tr = document.createElement("tr");
		const td1 = document.createElement("td");
		const td2 = document.createElement("td");
		td1.innerText = item.slotId;
		td2.innerText = item.regNo;
		tr.appendChild(td1);
		tr.appendChild(td2);
		tableBody.appendChild(tr);
	});
}

export { activatePage, parkCar, pickupCar, listRecents, listAll };
