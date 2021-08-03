import { PopupComponent } from "../blocks/popup/popup.js";
import { ProfileComponent } from "../blocks/profile/profile.js";
import { FormComponent } from "../blocks/form/form.js";

/*todo: I need move the data to a separate class ?? how to support BEM*/
function Person(name, job) {
  this.Name = name;
  this.Job = job;
}

/*todo: I need move the service class to a separate class ?? how to support BEM*/
function PersonDataService() {
  // todo: observable
  let _current = new Person("Жак-Ив Кусто", "Исследователь oкeaнa");
  this.getCurrent = function() {
    return _current;
  }

  this.updateCurrentPerson = function(name, job) {
    _current.Name = name;
    _current.Job = job;
    this.onPersonUpdated();
  }

  // todo: event emitter
  this.onPersonUpdated = () => {};
}

/*todo: Index Page Component*/
let personDataService = new PersonDataService();
personDataService.onPersonUpdated = () =>
{
  let current = personDataService.getCurrent();
  profile.setPersonData(current);
  form.setPersonData(current);
}

let popup = new PopupComponent();
// todo: personaldataservice inject to ctor of form and profile components
let form = new FormComponent({
  submitCallback:
    (person) => {
      personDataService.updateCurrentPerson(person.Name, person.Job);
      popup.close();
    }
  });

let profile = new ProfileComponent({
  editCallback: () => {
    popup.open();
    form.setPersonData(personDataService.getCurrent());
}});

profile.setPersonData(personDataService.getCurrent());
