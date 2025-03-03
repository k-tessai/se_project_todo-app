class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  //implement all other methods

  // _checkInputValidity(inputElement) {
  //work through all errors
  // if (!inputElement.validity.valid) {
  //       showInputError(
  //         formElement,
  //         inputElement,
  //         inputElement.validationMessage,
  //         settings
  //       );
  //     } else {
  //       hideInputError(formElement, inputElement, settings);
  //     }
  //   }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(this._inputList, buttonElement, this);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formEl, inputElement, this);
        this._toggleButtonState(inputList, buttonElement, this);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
