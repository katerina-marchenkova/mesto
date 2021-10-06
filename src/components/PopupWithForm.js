import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElm = this._element.querySelector('.popup__form');
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._handleSubmit = this._handleSubmit.bind(this);
    this._submitButton = this._element.querySelector('.popup__button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submitBtnDefaultText = this._submitButton.textContent;
    this._submitButton.textContent = 'Сохранение...';
    this._submitButton.setAttribute('disabled', true);
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElm.addEventListener('submit', this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._formElm.removeEventListener('submit', this._handleSubmit);
  }

  close() {
    super.close();
    this._submitButton.textContent = this._submitBtnDefaultText;
    this._submitButton.setAttribute('disabled', false);
    this._formElm.reset();
  }
}
