import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(selector) {
    super(selector);
    this._imageElm = this._element.querySelector('.place-preview__image');
    this._captionElm = this._element.querySelector('.place-preview__caption');
  }

  open(data) {
    this._imageElm.setAttribute('src', data.link);
    this._imageElm.setAttribute('alt', data.name);
    this._captionElm.textContent = data.name;
    super.open();
  }
}
