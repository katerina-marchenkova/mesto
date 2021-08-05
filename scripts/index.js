/* See the proper code (attempt to separate somehow data, services and view components) within the separate brach feature/js-components
This one is my next attempt to guess how to pass the task.
*/
/* defined constant selectors */
const selectors = {
  popup: ".popup",
  popupBtnClose: ".popup__btn-close",
  profile: ".profile",
  profileBtnEdit: ".profile__btn-edit",
  profileName: ".profile__title",
  profileJob: ".profile__description",
  profileForm: ".form",
  profileNameInput: ".form__item_el_name",
  profileJobInput: ".form__item_el_job"
}

/* defined constant styles */
const cssClasses = {
  popupOpened: "popup_opened"
}

/* internal component variables made global due to:
Все DOM элементы нужно один раз найти при помощи метода document.querySelector и записать в переменные в начале файла, а затем использовать эти переменные в тех функциях, где они нужны.
*/
const popupElm = document.querySelector(selectors.popup);
const popupBtnClose = popupElm.querySelector(selectors.popupBtnClose);
const profileElm = document.querySelector(selectors.profile);
const profileBtnEdit = profileElm.querySelector(selectors.profileBtnEdit);
const profileNameElm = profileElm.querySelector(selectors.profileName);
const profileJobElm = profileElm.querySelector(selectors.profileJob);
const profileForm = document.querySelector(selectors.profileForm);
const profileNameInput = document.querySelector(selectors.profileNameInput);
const profileJobInput = document.querySelector(selectors.profileJobInput);

/* The mixture of popup and profile component logic (no incapsulation) is only per request:
функция открытия попап (в класс должен добавиться модификатор).
В ней же текстовые значения профайла записываются в значения инпутов */
function openPopup() {
  popupElm.classList.add(cssClasses.popupOpened);
  // todo: register event listener for close event and escape here
  // bad code - has nothing to do with popup
  profileNameInput.value = profileNameElm.textContent.trim(); // or use the innerText
  profileJobInput.value = profileJobElm.textContent.trim();
}

function closePopup() {
  popupElm.classList.remove(cssClasses.popupOpened);
  // todo: unsubscribe document from event listener for close event and escape here
}

popupBtnClose.addEventListener("click", closePopup);

function updateProfile(name, job) {
  profileNameElm.textContent = name;
  profileJobElm.textContent = job;
}

profileBtnEdit.addEventListener("click", openPopup);
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  updateProfile(profileNameInput.value.trim(), profileJobInput.value.trim()); // form value? this.value.Name
  closePopup();
});
