import Popup from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector: popupSelector });
  }
  _getInputValues() {}
}

export default PopupWithForm;
