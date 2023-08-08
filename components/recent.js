class Recent extends HTMLElement {
	constructor() {
		super();

		this.innerHTML = `
    <main id="recent" class="component bg-white rounded-4 shadow-lg p-4 d-none">
      <h4 class="head fs-3 fw-bold pb-2 border-bottom">Recent cars...</h4>
      <table class="mt-4 table table-sm">
        <thead>
          <tr>
            <th scope="col">Parking Slot</th>
            <th scope="col">Registration No.</th>
          </tr>
        </thead>
        <tbody id="recent_body">
        </tbody>
      </table>
    </main>
    `;
	}
}

if ("customElements" in window) {
	customElements.define("recent-cars", Recent);
}
