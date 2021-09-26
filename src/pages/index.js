import '../pages/index.css';
import {
  validationOptions,
  placesListSelector,
  cardTemplateSelector,
  profileNameElmSelector,
  profileAboutElmSelector
} from '../utils/constants.js';

import { initialCardsData } from '../utils/initial-cards-data.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

/* popup*/
const popupElms = document.querySelectorAll('.popup');

/* profile */
const profilePopupElm = document.querySelector('.popup_name_profile-edit');
const profileElm = document.querySelector('.profile');
const profileForm = document.forms.profile;
const profileNameInput = profileForm.elements.name;
const profileAboutInput = profileForm.elements.about;

/* new place*/
const newPlacePopupElm = document.querySelector('.popup_name_new-place');
const newPlaceForm = document.forms.place;

/* place preview */
const placePreviewPopupElm = document.querySelector('.popup_name_place-preview');
const placePreviewImageElm = placePreviewPopupElm.querySelector('.place-preview__image');
const placePreviewCaptionElm = placePreviewPopupElm.querySelector('.place-preview__caption');

const userInfoElement = new UserInfo({nameElmSelector: profileNameElmSelector, aboutElmSelector: profileAboutElmSelector})

const createCardElement = function (data) {
  const card = new Card({ data: data, handleCardClick: openPlacePreviewPopup }, cardTemplateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

const placesList = new Section({
  items: initialCardsData,
  renderer: (item) => {
    const cardElement = createCardElement(item);
    placesList.addItem(cardElement);
  }
}, placesListSelector);

/* popup functionality */

const listenKeydownClose = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const closePopup = (popupElm) => {
  document.removeEventListener('keydown', listenKeydownClose);
  popupElm.classList.remove('popup_opened');
}

const showPopup = (popupElm) => {
  popupElm.classList.add('popup_opened');
  document.addEventListener('keydown', listenKeydownClose);
}

popupElms.forEach(elm => {
  elm.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__btn-close') || evt.target.classList.contains('popup')) {
      closePopup(evt.currentTarget);
    }
  });
})

const openPlacePreviewPopup = (cardData) => {
  placePreviewImageElm.setAttribute('src', cardData.link);
  placePreviewImageElm.setAttribute('alt', cardData.name);
  placePreviewCaptionElm.textContent = cardData.name;
  showPopup(placePreviewPopupElm);
}

/*profile */
const profileFormValidator = new FormValidator(validationOptions, profileForm);
const newPlaceFormValidator = new FormValidator(validationOptions, newPlaceForm);
const resetProfileForm = () => {
  const userInfo = userInfoElement.getUserInfo();
  profileNameInput.value = userInfo.name;
  profileAboutInput.value = userInfo.about;
  profileFormValidator.clearFormValidation();
}

const resetNewPlaceForm = () => {
  newPlaceForm.reset();
  newPlaceFormValidator.clearFormValidation();
}

profileElm.querySelector('.profile__btn-edit').addEventListener('click', function (evt) {
  resetProfileForm();
  showPopup(profilePopupElm);
});


profileElm.querySelector('.profile__btn-add').addEventListener('click', function (evt) {
  resetNewPlaceForm();
  showPopup(newPlacePopupElm);
});

const handleProfileSubmitted = (evt) => {
  evt.preventDefault();
  userInfoElement.setUserInfo({ name: evt.target.elements.name.value, about: evt.target.elements.about.value });
  closePopup(profilePopupElm);
}

const handleNewPlaceSubmitted = (evt) => {
  evt.preventDefault();
  const cardElement = createCardElement({ name: evt.target.elements.title.value, link: evt.target.elements.url.value });
  placesList.addItem(cardElement);
  closePopup(newPlacePopupElm);
}

placesList.renderItems();

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
profileForm.addEventListener('submit', handleProfileSubmitted);
newPlaceForm.addEventListener('submit', handleNewPlaceSubmitted);
