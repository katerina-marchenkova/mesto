export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._element = document.querySelector(this._selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup__btn-close') || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._element.addEventListener('click', this._handleClickClose);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._element.removeEventListener('click', this._handleClickClose);
  }

  open() {
    this._element.classList.add('popup_opened');
    this.setEventListeners();

  }

  close() {
    this.removeEventListeners();
    this._element.classList.remove('popup_opened');
  }
}
