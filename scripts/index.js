import { initialCardsData } from './initial-cards-data.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

/* places */
const placesContainer = document.querySelector('.places__list');
const cardTemplateSelector = '#card-template';

/* popup*/
const popupElms = document.querySelectorAll('.popup');

/* profile */
const profilePopupElm = document.querySelector('.popup_name_profile-edit');
const profileElm = document.querySelector('.profile');
const profileNameElm = profileElm.querySelector('.profile__title');
const profileAboutElm = profileElm.querySelector('.profile__description');
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

/* validation options */
const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

/* load initial cards */
const openPlacePreviewPopup = (cardData) => {
  placePreviewImageElm.setAttribute('src', cardData.link);
  placePreviewImageElm.setAttribute('alt', cardData.name);
  placePreviewCaptionElm.textContent = cardData.name;
  showPopup(placePreviewPopupElm);
}

const createCard = function(data) {
  return new Card({ ...data, openPreviewPopup: openPlacePreviewPopup }, cardTemplateSelector).generateCard();
}

initialCardsData.map((item) => {
  placesContainer.append(createCard(item));
});

/*profile */
const profileFormValidator = new FormValidator(validationOptions, profileForm);
const newPlaceFormValidator = new FormValidator(validationOptions, newPlaceForm);
const resetProfileForm = () => {
  profileNameInput.value = profileNameElm.textContent;
  profileAboutInput.value = profileAboutElm.textContent;
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

const updateProfile = (profileData) => {
  profileNameElm.textContent = profileData.name;
  profileAboutElm.textContent = profileData.about;
}

const handleProfileSubmitted = (evt) => {
  evt.preventDefault();
  updateProfile({ name: evt.target.elements.name.value, about: evt.target.elements.about.value });
  closePopup(profilePopupElm);
}

const handleNewPlaceSubmitted = (evt) => {
  evt.preventDefault();
  const newPlaceElm =
    createCard({ name: evt.target.elements.title.value, link: evt.target.elements.url.value});

  placesContainer.prepend(newPlaceElm);
  closePopup(newPlacePopupElm);
}

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
profileForm.addEventListener('submit', handleProfileSubmitted);
newPlaceForm.addEventListener('submit', handleNewPlaceSubmitted);
