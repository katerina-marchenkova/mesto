/* See the proper code (attempt to separate somehow data, services and view components) within the separate brach feature/js-components
This one is my next attempt to guess how to pass the task.
*/
/* internal component variables made global due to:
Все DOM элементы нужно один раз найти при помощи метода document.querySelector и записать в переменные в начале файла, а затем использовать эти переменные в тех функциях, где они нужны.
*/
const profilePopupElm = document.querySelector('.popup_name_profile-edit');
const profileElm = document.querySelector('.profile');
const profileBtnEdit = profileElm.querySelector('.profile__btn-edit');
const profileBtnAddPlace = profileElm.querySelector('.profile__btn-add');
const profileNameElm = profileElm.querySelector('.profile__title');
const profileJobElm = profileElm.querySelector('.profile__description');
const profileForm = document.querySelector('.form_name_profile-edit');
const profileNameInput = document.querySelector('.form__item_el_name');
const profileJobInput = document.querySelector('.form__item_el_job');
const placesContainer = document.querySelector('.places__list');
const newPlacePopupElm = document.querySelector('.popup_name_new-place');
const popupAllBtnClose = document.querySelectorAll('.popup__btn-close');
const newPlaceForm = document.querySelector('.form_name_new-place');
const placeTitleInput = document.querySelector('.form__item_el_title');
const placeUrlInput = document.querySelector('.form__item_el_url');
const placePreviewPopupElm = document.querySelector('.popup_name_place-preview');
const placePreviewImageElm = placePreviewPopupElm.querySelector('.place-preview__image');
const placePreviewCaptionElm = placePreviewPopupElm.querySelector('.place-preview__caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const buildPlaceCard = function(titleValue, imageLinkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const imgElement = cardElement.querySelector('.card__image');
  imgElement.setAttribute('src', imageLinkValue);
  imgElement.setAttribute('alt', titleValue);
  cardElement.querySelector('.card__title').textContent = titleValue;
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });

  cardElement.querySelector('.card__btn-delete_place_card').addEventListener('click', function (evt) {
    const cardToRemove = evt.target.closest('.card')
    cardToRemove.remove();
  });

  cardElement.addEventListener('click', () => openPlacePreviewPopup(titleValue, imageLinkValue));

  return cardElement;
}

initialCards.map((item) => {
  const placeElement = buildPlaceCard(item.name, item.link);
  placesContainer.append(placeElement);
});

function showPopup(popupElm) {
  popupElm.classList.remove("fade-out");
  popupElm.classList.add("fade-in");
  popupElm.classList.add("popup_opened");
}

/* The mixture of popup and profile component logic (no incapsulation) is only per request:
функция открытия попап (в класс должен добавиться модификатор).
В ней же текстовые значения профайла записываются в значения инпутов */
function openEditProfilePopup() {
  // todo: register event listener for close event and escape here
  // bad code - has nothing to do with popup
  profileNameInput.value = profileNameElm.textContent;
  profileJobInput.value = profileJobElm.textContent;

  showPopup(profilePopupElm);
}

function openNewPlacePopup() {
  placeTitleInput.value = '';
  placeUrlInput.value = '';
  showPopup(newPlacePopupElm);
}

function openPlacePreviewPopup(titleValue, imageLinkValue) {
  placePreviewImageElm.setAttribute('src', imageLinkValue);
  placePreviewImageElm.setAttribute('alt', titleValue);
  placePreviewCaptionElm.textContent = titleValue;
  showPopup(placePreviewPopupElm);
}

function closePopup(evt) {
  const parentPopupElm = evt.target.closest('.popup');
  parentPopupElm.classList.remove("fade-in");
  parentPopupElm.classList.add("fade-out");
}

popupAllBtnClose.forEach((btn) => {
  btn.addEventListener("click", closePopup);
});

function updateProfile(name, job) {
  profileNameElm.textContent = name;
  profileJobElm.textContent = job;
}

function onProfileSubmitted(evt) {
  evt.preventDefault();
  updateProfile(profileNameInput.value, profileJobInput.value);
  closePopup(evt);
}

function onNewPlaceSubmitted(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const newPlaceElm = buildPlaceCard(formData.get('Title'), formData.get('Url'));
  placesContainer.prepend(newPlaceElm);
  closePopup(evt);
}

profileBtnEdit.addEventListener("click", openEditProfilePopup);
profileBtnAddPlace.addEventListener('click', openNewPlacePopup);

profileForm.addEventListener("submit", onProfileSubmitted);
newPlaceForm.addEventListener("submit", onNewPlaceSubmitted);
