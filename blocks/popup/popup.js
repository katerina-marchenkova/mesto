export function PopupComponent () {
    // todo: move selectors from ctor
    let _popup = document.querySelector('.popup');
    let _btnClose = _popup.querySelector('.popup__btn_close');

    let self = this; // old style aka in jquery

    this.open = () => {
      _popup.classList.add("popup_opened");
    }

    this.close = () => {
      _popup.classList.remove("popup_opened");
    }

    function init() {
      _btnClose.addEventListener('click', self.close);
    }

    init();
}
