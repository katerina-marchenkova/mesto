export default class UserInfo {
  constructor({ nameElmSelector, aboutElmSelector, avatarElmSelector }) {
    this._nameElmSelector = nameElmSelector;
    this._aboutElmSelector = aboutElmSelector;
    this._avatarElmSelector = avatarElmSelector;
    this._nameElement = document.querySelector(this._nameElmSelector);
    this._aboutElement = document.querySelector(this._aboutElmSelector);
    this._avatarElement = document.querySelector(this._avatarElmSelector);
  }

  getUserInfo() {
    return { name: this._nameElement.textContent, about: this._aboutElement.textContent, avatar: this._avatarElement.src };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
    this._avatarElement.src = data.avatar;
  }
}
