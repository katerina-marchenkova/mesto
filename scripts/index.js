/* See the proper code (attempt to separate somehow data, services and view components) within the separate brach feature/js-components
This one is my next attempt to guess how to pass the task.
*/
/* internal component variables made global due to:
Все DOM элементы нужно один раз найти при помощи метода document.querySelector и записать в переменные в начале файла, а затем использовать эти переменные в тех функциях, где они нужны.
*/
/* places */
const placesContainer = document.querySelector('.places__list');
const cardTemplateElm = document.querySelector('#card-template')

/* popup*/
const popupElmsAll = document.querySelectorAll('.popup');
const popupContainersAll = document.querySelectorAll('.popup__container');

/* profile */
const profilePopupElm = document.querySelector('.popup_name_profile-edit');
const profileElm = document.querySelector('.profile');
const profileBtnEdit = profileElm.querySelector('.profile__btn-edit');
const profileBtnAddPlace = profileElm.querySelector('.profile__btn-add');
const profileNameElm = profileElm.querySelector('.profile__title');
const profileAboutElm = profileElm.querySelector('.profile__description');
const profileForm = document.forms.profile;
const profileNameInput = profileForm.elements.name;
const profileAboutInput = profileForm.elements.about;

/* new place*/
const newPlacePopupElm = document.querySelector('.popup_name_new-place');
const newPlaceForm = document.forms.place;
const placeTitleInput = newPlaceForm.elements.title;
const placeUrlInput = newPlaceForm.elements.url;

/* place preview */
const placePreviewPopupElm = document.querySelector('.popup_name_place-preview');
const placePreviewImageElm = placePreviewPopupElm.querySelector('.place-preview__image');
const placePreviewCaptionElm = placePreviewPopupElm.querySelector('.place-preview__caption');

/* popup functionality */
const showPopup = function (popupElm) {
  popupElm.classList.remove('popup_hidden');
  popupElm.classList.remove('fade-out');
  popupElm.classList.add('fade-in');
}

const closePopup = function (popupElm) {
  popupElm.classList.remove('fade-in');
  popupElm.classList.add('fade-out');
}

popupElmsAll.forEach(elm => {
  elm.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__btn-close') || evt.target.classList.contains('popup')) {
      closePopup(evt.currentTarget);
    }
  });
})

/* load initial cards */
const buildPlaceCard = function (titleValue, imageLinkValue) {
  const cardTemplate = cardTemplateElm.content;
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

  imgElement.addEventListener('click', () => openPlacePreviewPopup(titleValue, imageLinkValue));

  return cardElement;
}

initialCards.map((item) => {
  const placeElement = buildPlaceCard(item.name, item.link);
  placesContainer.append(placeElement);
});


/* The mixture of popup and profile component logic (no incapsulation) is only per request:
функция открытия попап (в класс должен добавиться модификатор).
В ней же текстовые значения профайла записываются в значения инпутов */
function openEditProfilePopup() {
  profileNameInput.value = profileNameElm.textContent;
  profileAboutInput.value = profileAboutElm.textContent;

  showPopup(profilePopupElm);
}

function openNewPlacePopup() {
  newPlaceForm.reset();
  showPopup(newPlacePopupElm);
}

function openPlacePreviewPopup(titleValue, imageLinkValue) {
  placePreviewImageElm.setAttribute('src', imageLinkValue);
  placePreviewImageElm.setAttribute('alt', titleValue);
  placePreviewCaptionElm.textContent = titleValue;
  showPopup(placePreviewPopupElm);
}


function updateProfile(name, about) {
  profileNameElm.textContent = name;
  profileAboutElm.textContent = about;
}

function onProfileSubmitted(evt) {
  evt.preventDefault();
  updateProfile(profileNameInput.value, profileJobInput.value);
  closePopup(evt.target.closest('.popup'));
}

function onNewPlaceSubmitted(evt) {
  evt.preventDefault();
  const newPlaceElm = buildPlaceCard(evt.target.elements.title.value, evt.target.elements.url.value);
  placesContainer.prepend(newPlaceElm);
  closePopup(evt.target.closest('.popup'));
}

profileBtnEdit.addEventListener('click', openEditProfilePopup);
profileBtnAddPlace.addEventListener('click', openNewPlacePopup);

profileForm.addEventListener('submit', onProfileSubmitted);
newPlaceForm.addEventListener('submit', onNewPlaceSubmitted);
