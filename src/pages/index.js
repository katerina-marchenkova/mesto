import '../pages/index.css';
import {
  validationOptions,
  placesListSelector,
  cardTemplateSelector,
  profileNameElmSelector,
  profileAboutElmSelector,
  placePreviewPopupSelector,
  profilePopupSelector,
  newPlacePopupSelector,
  confirmPopupSelector,
  changeAvatarPopupSelector,
  profileAvatarElmSelector,
  confirmItemIdElementSelector
} from '../utils/constants.js';

import Api from '../utils/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  accessToken: '009c9948-300a-40d1-aa2d-1eaf93669a9a'
});

/* profile */
const profileElm = document.querySelector('.profile');
const profileForm = document.forms.profile;
const newPlaceForm = document.forms.place;
const changeAvatarForm = document.forms.avatar;

const userInfoElement = new UserInfo({ nameElmSelector: profileNameElmSelector, aboutElmSelector: profileAboutElmSelector, avatarElmSelector: profileAvatarElmSelector });
const placePreviewPopupElement = new PopupWithImage(placePreviewPopupSelector);

let checkIsCurrentUserId = function (userId) {
  return false;
}

const confirmPopupElement = new PopupWithConfirm({
  selector: confirmPopupSelector,
  confirmItemIdElementSelector: confirmItemIdElementSelector,
  handleFormSubmit: (formData) => {
    api.deleteCard(formData.itemId)
      .then(() => true /* deleted */)
      .then((success) => {
        if (success) {
          confirmPopupElement.complete();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        confirmPopupElement.close();
      });
  }
});

const createCardElement = function (data) {
  const card = new Card({
    data: data,
    checkIsCurrentUserIdFunc: checkIsCurrentUserId,
    handleCardDelete: (cardId) => {
      confirmPopupElement.open(cardId, card.removeCard.bind(card));
    },
    handleCardClick: () => { placePreviewPopupElement.open(data); },
    handleLike: (cardId) => { api.addLike(cardId).then((data) => card.recalculateLikes(data.likes)).catch((err) => console.log(err)); },
    handleDislike: (cardId) => { api.removeLike(cardId).then((data) => card.recalculateLikes(data.likes)).catch((err) => console.log(err)); }
  }, cardTemplateSelector);

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

const changeAvatarPopupElement = new PopupWithForm({
  selector: changeAvatarPopupSelector,
  handleFormSubmit: (formData) => {
    api.updateAvatar(formData)
      .then((profileData) => {
        userInfoElement.setUserInfo(profileData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        changeAvatarPopupElement.close();
      });
  }
});

/*profile */
const profileFormValidator = new FormValidator(validationOptions, profileForm);
const newPlaceFormValidator = new FormValidator(validationOptions, newPlaceForm);
const changeAvatarFormValidator = new FormValidator(validationOptions, changeAvatarForm);
const resetProfileForm = () => {
  const userInfo = userInfoElement.getUserInfo();
  profileForm.elements.name.value = userInfo.name;
  profileForm.elements.about.value = userInfo.about;
  profileFormValidator.clearFormValidation();
}

const resetNewPlaceForm = () => {
  newPlaceFormValidator.clearFormValidation();
}

const resetChangeAvatarForm = () => {
  changeAvatarFormValidator.clearFormValidation();
}

profileElm.querySelector('.profile__btn-edit').addEventListener('click', function (evt) {
  resetProfileForm();
  profilePopupElement.open();
});

profileElm.querySelector('.profile__btn-add').addEventListener('click', function (evt) {
  resetNewPlaceForm();
  newPlacePopupElement.open();
});

profileElm.querySelector('.profile__btn-edit-avatar').addEventListener('click', function (evt) {
  resetChangeAvatarForm();
  changeAvatarPopupElement.open();
});

placesList.renderItems();

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

api.getProfile()
  .then((profileData) => {
    checkIsCurrentUserId = function (userId) {
      return userId === profileData._id;
    };

    userInfoElement.setUserInfo(profileData);
    api.getInitialCards()
      .then((cardsData) => {
        cardsData.forEach((card) => placesList.addItem(createCardElement(card)));
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
