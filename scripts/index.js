/* constant component selectors */
const popupSelector = ".popup";
const personInfoSelector = ".profile";
const personFormSelector = ".form";

/*todo: I need move the data to a separate class file?? how to support BEM*/
class Person {
  constructor(name, job) {
    this.Name = name;
    this.Job = job;
  }
}

/*todo: I need move the service class to a separate file ?? how to support BEM*/
class PersonDataService {
  constructor() {
    // todo: observable
    this._current = new Person("Жак-Ив Кусто", "Исследователь oкeaнa");
  }

  getCurrent() {
    return this._current;
  }

  updateCurrent(name, job) {
    this._current.Name = name;
    this._current.Job = job;
    this.onPersonUpdated();
  }

  // todo: event emitter
  onPersonUpdated = () => { };
}

/* popup component initial code */
class PopupComponent {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._btnClose = this._popup.querySelector(".popup__btn-close");
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  init() {
    let self = this;
    this._btnClose.addEventListener("click", () => { self.close() });
  }
}

class ProfileComponent {
  // todo: consider injecting PersonDataService and move selectors to init
  constructor(selector) {
    this._profile = document.querySelector(selector);
    this._btnEdit = this._profile.querySelector(".profile__btn-edit");
    this._title = this._profile.querySelector(".profile__title");
    this._description = this._profile.querySelector(".profile__description");
  }

  setPersonData(person) {
    this._title.textContent = person.Name;
    this._description.textContent = person.Job;
  }

  init(options) {
    if (typeof options?.editCallback === "function") {
      this._btnEdit.addEventListener("click", options.editCallback);
    }
  }
}

class PersonFormComponent {
  // todo: consider injecting PersonDataService and move selectors to init
  constructor(selector) {
    this._formElement = document.querySelector(".form");
    this._nameInput = this._formElement.querySelector(".form__item_el_name");
    this._jobInput = this._formElement.querySelector(".form__item_el_job");
  }

  setPersonData(person) {
    this._nameInput.value = person.Name;
    this._jobInput.value = person.Job;
  }

  init(options) {
    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
    let self = this;
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (typeof options?.submitCallback === "function") {
          options.submitCallback({ Name: self._nameInput.value, Job: self._jobInput.value });
      }
    });
  }
}

/*todo: Index Page Component*/
let personDataService = new PersonDataService();
personDataService.onPersonUpdated = () => {
  let person = personDataService.getCurrent();
  profile.setPersonData(person);
  form.setPersonData(person);
}

let popup = new PopupComponent(popupSelector);
popup.init();
// todo: personaldataservice inject to ctor of form and profile components
let form = new PersonFormComponent(personFormSelector);
form.init({
  submitCallback:
    (person) => {
      personDataService.updateCurrent(person.Name, person.Job);
      popup.close();
    }
});

let profile = new ProfileComponent(personInfoSelector)
profile.init({
  editCallback: () => {
    popup.open();
    form.setPersonData(personDataService.getCurrent());
  }
});

// load current person data to display in view
profile.setPersonData(personDataService.getCurrent());
