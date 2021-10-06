import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirm extends PopupWithForm {
  constructor({ selector, confirmItemIdElementSelector, handleFormSubmit }) {
    super({selector, handleFormSubmit});
    this._confirmItemIdElement = this._element.querySelector(confirmItemIdElementSelector);
  }

  open(itemId, handleSuccess) {
    this._confirmItemIdElement.value = itemId;
    this._handleSuccess = handleSuccess;
    super.open();
  }

  complete() {
    if (typeof this._handleSuccess === 'function')
    {
      this._handleSuccess();
    }
  }
}
