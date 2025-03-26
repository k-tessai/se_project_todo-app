class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    console.log(this._popupElement);
    open();
    close();
  }

  _handleEscapeClose() {}

  setEventListeners() {
    addEventListener("click", () => {});
  }
}

export default Popup;
