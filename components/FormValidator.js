export class FormValidator {
  constructor(options, formElement) {
    this._options = options || {}; // to do: define defaults
    this._formElement = formElement;
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    var self = this;
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        self._checkInputValidity(inputElement);
        self._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._options.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._options.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    })
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._options.errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._options.inputErrorClass);
    errorElement.classList.remove(this._options.errorClass);
    errorElement.textContent = '';
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._options.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (!this.checkFormIsValid()) {
          evt.stopImmediatePropagation();
        }
      });

     this._setEventListeners();
    });
  }

  checkFormIsValid() {
    const formInputs = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    return !hasInvalidInput(formInputs);
  }

  clearFormValidation = () => {
    const formInputs = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
    formInputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState(formInputs, buttonElement);
  }
}
