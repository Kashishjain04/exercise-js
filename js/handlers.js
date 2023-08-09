import regNoVaildator from "../utils/regNoValidator.js";
import { parkCar, pickupCar } from "../utils/parkingFunctions.js";
import { listAll, listRecents } from "../utils/listFunctions.js";

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

function parkingHandler(e, type) {
	e.preventDefault();
	const regNo = e.target.elements.registration.value;
	const msgContainer = document.getElementById(`${type}_msg`);
	
	const isRegNoValid = regNoVaildator(regNo);
	if(isRegNoValid.error) return msgContainer.innerText = isRegNoValid.error;

	const response = type === "park" ? parkCar(regNo) : pickupCar(regNo);
	msgContainer.innerText = response;
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

export { activatePage, parkingHandler, listResults };
