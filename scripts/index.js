/* See the proper code (attempt to separate somehow data, services and view components) within the separate brach feature/js-components
This one is my next attempt to guess how to pass the task.
*/
/* internal component variables made global due to:
Все DOM элементы нужно один раз найти при помощи метода document.querySelector и записать в переменные в начале файла, а затем использовать эти переменные в тех функциях, где они нужны.
*/
const popupElm = document.querySelector(".popup");
const popupBtnClose = popupElm.querySelector(".popup__btn-close");
const profileElm = document.querySelector(".profile");
const profileBtnEdit = profileElm.querySelector(".profile__btn-edit");
const profileNameElm = profileElm.querySelector(".profile__title");
const profileJobElm = profileElm.querySelector(".profile__description");
const profileForm = document.querySelector(".form");
const profileNameInput = document.querySelector(".form__item_el_name");
const profileJobInput = document.querySelector(".form__item_el_job");

/* The mixture of popup and profile component logic (no incapsulation) is only per request:
функция открытия попап (в класс должен добавиться модификатор).
В ней же текстовые значения профайла записываются в значения инпутов */
function openPopup() {
  popupElm.classList.add("popup_opened");
  // todo: register event listener for close event and escape here
  // bad code - has nothing to do with popup
  profileNameInput.value = profileNameElm.textContent;
  profileJobInput.value = profileJobElm.textContent;
}

function closePopup() {
  popupElm.classList.remove("popup_opened");
  // todo: unsubscribe document from event listener for close event and escape here
}

popupBtnClose.addEventListener("click", closePopup);

function updateProfile(name, job) {
  profileNameElm.textContent = name;
  profileJobElm.textContent = job;
}

function onProfileSubmitted(evt) {
  evt.preventDefault();
  updateProfile(profileNameInput.value, profileJobInput.value);
  closePopup();
}

profileBtnEdit.addEventListener("click", openPopup);
profileForm.addEventListener("submit", onProfileSubmitted);
