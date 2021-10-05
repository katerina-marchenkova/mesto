import '../pages/index.css';
import {
  validationOptions,
  placesListSelector,
  cardTemplateSelector,
  profileNameElmSelector,
  profileAboutElmSelector,
  placePreviewPopupSelector,
  profilePopupSelector,
  newPlacePopupSelector
} from '../utils/constants.js';

import Api from '../utils/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  accessToken: '009c9948-300a-40d1-aa2d-1eaf93669a9a'
});

/* profile */
const profileElm = document.querySelector('.profile');
const profileForm = document.forms.profile;

/* new place*/
const newPlaceForm = document.forms.place;

const userInfoElement = new UserInfo({ nameElmSelector: profileNameElmSelector, aboutElmSelector: profileAboutElmSelector });
const placePreviewPopupElement = new PopupWithImage(placePreviewPopupSelector);

const createCardElement = function (data) {
  const card = new Card({ data: data, handleCardClick: () => { placePreviewPopupElement.open(data); } }, cardTemplateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

const placesList = new Section({
  renderer: (item) => {
    const cardElement = createCardElement(item);
    placesList.addItem(cardElement);
  }
}, placesListSelector);

const newPlacePopupElement = new PopupWithForm({
  selector: newPlacePopupSelector, handleFormSubmit: (formData) => {
    api.addCard({ name: formData.title, link: formData.url })
      .then((cardData) => {
        const cardElement = createCardElement(cardData);
        placesList.prependItem(cardElement);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        newPlacePopupElement.close();
      });
  }
});

const profilePopupElement = new PopupWithForm({
  selector: profilePopupSelector,
  handleFormSubmit: (formData) => {
    api.updateProfile(formData)
      .then((profileData) => {
        userInfoElement.setUserInfo(profileData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        profilePopupElement.close();
      });
  }
});

/*profile */
const profileFormValidator = new FormValidator(validationOptions, profileForm);
const newPlaceFormValidator = new FormValidator(validationOptions, newPlaceForm);
const resetProfileForm = () => {
  const userInfo = userInfoElement.getUserInfo();
  profileForm.elements.name.value = userInfo.name;
  profileForm.elements.about.value = userInfo.about;
  profileFormValidator.clearFormValidation();
}

const resetNewPlaceForm = () => {
  newPlaceFormValidator.clearFormValidation();
}

profileElm.querySelector('.profile__btn-edit').addEventListener('click', function (evt) {
  resetProfileForm();
  profilePopupElement.open();
});

profileElm.querySelector('.profile__btn-add').addEventListener('click', function (evt) {
  resetNewPlaceForm();
  newPlacePopupElement.open();
});

placesList.renderItems();

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

api.getProfile()
  .then((profileData) => {
    userInfoElement.setUserInfo(profileData);
  })
  .catch((err) => console.log(err));

api.getInitialCards()
  .then((cardsData) => {
    cardsData.forEach((card) => placesList.addItem(createCardElement(card)));
  })
  .catch((err) => console.log(err));
