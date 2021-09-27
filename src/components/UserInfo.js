export default class UserInfo {
  constructor({ nameElmSelector, aboutElmSelector }) {
    this._nameElmSelector = nameElmSelector;
    this._aboutElmSelector = aboutElmSelector;
    this._nameElement = document.querySelector(this._nameElmSelector);
    this._aboutElement = document.querySelector(this._aboutElmSelector);
  }

  getUserInfo() {
    return { name: this._nameElement.textContent, about: this._aboutElement.textContent };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
  }
}
