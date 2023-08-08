class Pickup extends HTMLElement {
	constructor() {
		super();

		this.innerHTML = `
    <main id="pickup" class="component bg-white rounded-4 shadow-lg p-4 d-none">
      <h4 class="head fs-3 fw-bold pb-2 border-bottom">
        Search your car ...
      </h4>
      <form id="pickup_form" class="d-flex gap-2 justify-content-evenly mt-5">
        <input autofocus class="flex-grow-1 px-2 py-1 rounded-2 border-1" type="text" name="registration" id="registration" placeholder="Car's Registration Number..." required pattern="[A-Za-z]{2}[1-9]{8}">
        <button class="btn btn-primary flex-grow-1">Search</button>
      </form>
      <h3 id="pickup_msg" class="mt-5 status"></h3>
    </main>
    `;
	}
}

if ("customElements" in window) {
	customElements.define("pickup-element", Pickup);
}
