export class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.liked || false;
    this._handleCardClick = handleCardClick || {};
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    this._deleteButton.addEventListener('click', () => this._handleRemoveClick());

    this._imgElement.addEventListener('click', () => {
      this._handlePreviewClick();
    });
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _handleRemoveClick() {
    this._element.remove();
  }

  _handlePreviewClick() {
    if (typeof this._handleCardClick === 'function') {
      this._handleCardClick({ link: this._link, name: this._name });
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imgElement = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like');
    this._deleteButton = this._element.querySelector('.card__btn-delete_place_card');
    this._setEventListeners();

    this._imgElement.setAttribute('src', this._link);
    this._imgElement.setAttribute('alt', this._name);
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}
