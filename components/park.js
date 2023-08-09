class Park extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <main id="park" class="component bg-white rounded-4 shadow-lg p-4">
      <h4 class="head fs-3 fw-bold pb-2 border-bottom">
        Park your car here !
      </h4>
      <form id="park_form" class="d-flex gap-2 justify-content-evenly mt-5">
        <input autofocus class="flex-grow-1 px-2 py-1 rounded-2 border-1" type="text" name="registration" id="registration" placeholder="Car's Registration Number..." required>
        <button type="submit" class="btn btn-primary flex-grow-1">Park</button>
      </form>
      <h3 id="park_msg" class="mt-5 status"></h3>
    </main>
    `
  };
}

if('customElements' in window) {
  customElements.define('park-element', Park);
}