export function ProfileComponent (options) {
  // todo: move selectors from ctor
  let _profile = document.querySelector('.profile');
  let _btnEdit = _profile.querySelector('.profile__btn-edit');
  let _title = _profile.querySelector('.profile__title');
  let _description = _profile.querySelector('.profile__description');

  let self = this; // old style aka in jquery

  this.setTitle = (personName) => {
    _title.textContent = personName;
  }

  this.setDescription = (personEntitlement) => {
    _description.textContent = personEntitlement;
  }

  this.onEdit =
    (typeof options?.editCallback === 'function') ?
      options.editCallback :
      () => {} ;

  function init() {
    _btnEdit.addEventListener('click', self.onEdit);
  }

  init();
}
