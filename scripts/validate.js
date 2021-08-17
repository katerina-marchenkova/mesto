const showInputError = (options, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
};

const hideInputError = (options, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (options, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(options, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(options, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (options, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(options.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const checkFormIsValid = (options, formElement) => {
  const formInputs = Array.from(formElement.querySelectorAll(options.inputSelector));
  return !hasInvalidInput(formInputs);
};

const clearFormValidation = (options, formElement) => {
  const formInputs = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  formInputs.forEach((inputElement) => {
    hideInputError(options, formElement, inputElement);
  });

  toggleButtonState(options, formInputs, buttonElement);
};

const setEventListeners = (options, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(options, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(options, formElement, inputElement);
      toggleButtonState(options, inputList, buttonElement);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      if (!checkFormIsValid(options, formElement)) {
        evt.stopImmediatePropagation();
      }
    });

    setEventListeners(options, formElement);
  });
};
