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

function executePattern(pattern, string){
	if(!pattern.exec(string)) return false;
	return true;
}

function regNoVaildator(regNo) {
	let pattern = /[A-Za-z]{2}[0-9]{8}/;
	if (executePattern(pattern, regNo)) return { success: true };
	// length -> 10
	pattern = /^.{10}$/;
	if(!executePattern(pattern, regNo)) return {error: "Length must be exactly 10 characters"};
	// no spaces permitted
	pattern = /.* .*/
	if(executePattern(pattern, regNo)) return {error: "Spaces are not permitted"};
	// no special character permitted
	pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
	if(executePattern(pattern, regNo)) return {error: "No special characters permitted"};
	// first 2 chars -> alphabets
	pattern = /[A-Za-z]{2}.{8}/
	if(!executePattern(pattern, regNo)) return {error: "First two spaces must me alphabet"};
	// no alphabet allowed in list 8 spaces
	pattern = /[A-Za-z]{2}([0-9]*[A-Za-z]+[0-9]*)/
	if(executePattern(pattern, regNo)) return {error: "Last 8 characters can not have alphabet"};
	else return {error: "Pattern mismatch"}
}

function parkingHandler(e, type) {
	e.preventDefault();
	const regNo = e.target.elements.registration.value;
	const msgContainer = document.getElementById(`${type}_msg`);
	
	const isRegNoValid = regNoVaildator(regNo);
	if(isRegNoValid.error) return msgContainer.innerText = isRegNoValid.error;

	const response = type === "park" ? parkCar(regNo) : pickupCar(regNo);
	msgContainer.innerText = response;
}

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

function listResults(type) {
	const tableBody = document.getElementById(`${type}_body`);
	tableBody.innerHTML = "";

	const result = type === "recents" ? listRecents() : listAll();

	if (result.error) {
		return (tableBody.innerHTML = `<tr><td colspan="2"><h4>${result.error}</h4></td></tr>`);
	}
	result.cars.forEach((item) => {
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

function listRecents() {
	const recents = parkingLot.listRecent();
	console.log(recents);
	if (recents.length === 0) {
		return { error: "No cars parked recently." };
	}
	return { cars: recents };
}

function listAll() {
	const all = parkingLot.listAll();
	if (all.length === 0) {
		return { error: "No cars parked here." };
	}
	return { cars: all };
}

export { activatePage, parkingHandler, listResults };
