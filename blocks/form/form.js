export function FormComponent(options) {
  // todo: move selectors from ctor
  let _formElement = document.querySelector('.form');
  let _nameInput = _formElement.querySelector('.form__item_el_name');
  let _jobInput = _formElement.querySelector('.form__item_el_job');

  let self = this; // old style aka in jquery

  this.setPersonData = (person) => {
    _nameInput.value = person.Name;
    _jobInput.value = person.Job;
  }

  this.onSubmit =
    (typeof options?.submitCallback === 'function') ?
      options.submitCallback :
      (person) => { };

  // Обработчик «отправки» формы, хотя пока
  // она никуда отправляться не будет
  function formSubmitHandler(evt) {
    evt.preventDefault();
    self.onSubmit({Name: _nameInput.value, Job: _jobInput.value});
  }

  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  _formElement.addEventListener('submit', formSubmitHandler);
}
