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

const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/* popup functionality */
const showPopup = (popupElm) => {
  popupElm.classList.remove('popup_hidden');
  popupElm.classList.remove('fade-out');
  popupElm.classList.add('fade-in');
}

const closePopup = (popupElm) => {
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
const openPlacePreviewPopup = (titleValue, imageLinkValue) => {
  placePreviewImageElm.setAttribute('src', imageLinkValue);
  placePreviewImageElm.setAttribute('alt', titleValue);
  placePreviewCaptionElm.textContent = titleValue;
  showPopup(placePreviewPopupElm);
}

const buildPlaceCard = (titleValue, imageLinkValue) => {
  const cardTemplate = cardTemplateElm.content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const imgElement = cardElement.querySelector('.card__image');
  imgElement.setAttribute('src', imageLinkValue);
  imgElement.setAttribute('alt', titleValue);
  cardElement.querySelector('.card__title').textContent = titleValue;
  cardElement.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('card__like')) {
      evt.target.classList.toggle('card__like_active');
    }

    if (evt.target.classList.contains('card__btn-delete_place_card')) {
      cardElement.remove();
    }

    if (evt.target.classList.contains('card__image')) {
      openPlacePreviewPopup(titleValue, imageLinkValue);
    }
  });

  return cardElement;
}

initialCards.map((item) => {
  const placeElement = buildPlaceCard(item.name, item.link);
  placesContainer.append(placeElement);
});

/*profile */
const resetProfileForm = () => {
  profileNameInput.value = profileNameElm.textContent;
  profileAboutInput.value = profileAboutElm.textContent;
  clearFormValidation(validationOptions, profileForm);
}

const resetNewPlaceForm = () => {
  newPlaceForm.reset();
  clearFormValidation(validationOptions, newPlaceForm);
}

profileElm.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('profile__btn-edit')) {
    resetProfileForm();
    showPopup(profilePopupElm);
  }

  if (evt.target.classList.contains('profile__btn-add')) {
    resetNewPlaceForm();
    showPopup(newPlacePopupElm);
  }
});

const updateProfile = (name, about) => {
  profileNameElm.textContent = name;
  profileAboutElm.textContent = about;
}

const onProfileSubmitted  = (evt) => {
  evt.preventDefault();
  if(!evt.target.elements.name.validity.valid || !evt.target.elements.about.validity.valid) {
    return;
  }

  updateProfile(evt.target.elements.name.value, evt.target.elements.about.value);
  closePopup(evt.target.closest('.popup'));
}

const onNewPlaceSubmitted = (evt) => {
  evt.preventDefault();
  if(!evt.target.elements.title.validity.valid || !evt.target.elements.url.validity.valid) {
    return;
  }

  const newPlaceElm = buildPlaceCard(evt.target.elements.title.value, evt.target.elements.url.value);
  placesContainer.prepend(newPlaceElm);
  closePopup(evt.target.closest('.popup'));
}

profileForm.addEventListener('submit', onProfileSubmitted);
newPlaceForm.addEventListener('submit', onNewPlaceSubmitted);

enableValidation(validationOptions);
