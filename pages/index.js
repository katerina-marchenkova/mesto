import { PopupComponent } from "../blocks/popup/popup.js";
import { ProfileComponent } from "../blocks/profile/profile.js";

/*todo: I need move the data to a separate class ?? how to support BEM*/
function Person() {
  this.name = "Жак-Ив Кусто";
  this.entitlement = "Исследователь okeaнa";
}

/*todo: I need move the service class to a separate class ?? how to support BEM*/
function PersonDataService() {
  let _current = new Person();

  this.getCurrent = function() {
    return _current;
  }
}

/* Index Page Component*/
let personDataService = new PersonDataService();

let popup = new PopupComponent();
let profile = new ProfileComponent(
  {editCallback: () => {
  popup.open();
}});


