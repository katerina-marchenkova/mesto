(()=>{"use strict";var e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var n=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseUrl=t.baseUrl||"",this.headers={authorization:t.accessToken,"Content-Type":"application/json"}}var n,r;return n=e,(r=[{key:"getProfile",value:function(){return fetch("".concat(this.baseUrl,"/users/me"),{headers:this.headers}).then(this._checkResponse)}},{key:"updateProfile",value:function(e){var t=e.name,n=e.about;return fetch("".concat(this.baseUrl,"/users/me"),{method:"PATCH",headers:this.headers,body:JSON.stringify({name:t,about:n})}).then(this._checkResponse)}},{key:"updateAvatar",value:function(e){var t=e.avatarUrl;return fetch("".concat(this.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this.headers,body:JSON.stringify({avatar:t})}).then(this._checkResponse)}},{key:"getInitialCards",value:function(){return fetch("".concat(this.baseUrl,"/cards"),{headers:this.headers}).then(this._checkResponse)}},{key:"addCard",value:function(e){var t=e.name,n=e.link;return fetch("".concat(this.baseUrl,"/cards"),{method:"POST",headers:this.headers,body:JSON.stringify({name:t,link:n})}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this.headers}).then(this._checkResponse)}},{key:"addLike",value:function(e){return fetch("".concat(this.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:this.headers}).then(this._checkResponse)}},{key:"removeLike",value:function(e){return fetch("".concat(this.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:this.headers}).then(this._checkResponse)}},{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}}])&&t(n.prototype,r),e}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t,n){var r,o=t.data,i=t.checkIsCurrentUserIdFunc,a=t.handleCardClick,c=t.handleCardDelete,l=t.handleLike,s=t.handleDislike;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._id=o._id,this._ownerId=(null===(r=o.owner)||void 0===r?void 0:r._id)||"",this._name=o.name,this._link=o.link,this._checkIsCurrentUserIdFunc=i||function(){return!1},this._likes=o.likes||[],this._canDelete=i(this._ownerId),this._handleCardClick=a||{},this._handleCardDelete=c||{},this._handleLike=l||{},this._handleDislike=s||{},this._cardSelector=n}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._likeButton.addEventListener("click",(function(t){e._handleLikeClick(t)})),this._deleteButton.addEventListener("click",(function(){return e._handleRemoveClick()})),this._imgElement.addEventListener("click",(function(){e._handlePreviewClick()}))}},{key:"_handleLikeClick",value:function(e){this._isLiked?"function"==typeof this._handleDislike&&this._handleDislike(this._id):"function"==typeof this._handleLike&&this._handleLike(this._id),e.target.classList.toggle("card__like_active")}},{key:"_handleRemoveClick",value:function(){"function"==typeof this._handleCardDelete?this._handleCardDelete(this._id):this._element.remove()}},{key:"_handlePreviewClick",value:function(){"function"==typeof this._handleCardClick&&this._handleCardClick({link:this._link,name:this._name})}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._imgElement=this._element.querySelector(".card__image"),this._likeButton=this._element.querySelector(".card__like"),this._likesNumberElement=this._element.querySelector(".card__likes-number"),this._deleteButton=this._element.querySelector(".card__btn-delete_place_card"),this.recalculateLikes(this._likes),this._setEventListeners(),this._imgElement.setAttribute("src",this._link),this._imgElement.setAttribute("alt",this._name),this._element.querySelector(".card__title").textContent=this._name,this._canDelete||this._deleteButton.remove(),this._element}},{key:"removeCard",value:function(){this._element.remove()}},{key:"recalculateLikes",value:function(e){var t=this;this._likes=e,this._isLiked=e.reduce((function(e,n){return e||t._checkIsCurrentUserIdFunc(n._id)}),!1),this._likesCount=e.length,this._isLiked?this._likeButton.classList.add("card__like_active"):this._likeButton.classList.remove("card__like_active"),this._likesNumberElement.textContent=this._likesCount}}])&&r(t.prototype,n),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=function(){function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),a(this,"_hasInvalidInput",(function(){return r._inputList.some((function(e){return!e.validity.valid}))})),a(this,"_hideInputError",(function(e){var t=r._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(r._options.inputErrorClass),t.classList.remove(r._options.errorClass),t.textContent=""})),a(this,"clearFormValidation",(function(){r._inputList.forEach((function(e){r._hideInputError(e)})),r._toggleButtonState()})),this._options=t||{},this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._options.inputSelector)),this._submitButton=this._formElement.querySelector(this._options.submitButtonSelector)}var t,n;return t=e,(n=[{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._submitButton.setAttribute("disabled",!0),this._submitButton.classList.add(this._options.inactiveButtonClass)):(this._submitButton.classList.remove(this._options.inactiveButtonClass),this._submitButton.removeAttribute("disabled"))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._options.inputErrorClass),n.textContent=t,n.classList.add(this._options.errorClass)}},{key:"enableValidation",value:function(){var e=this;this._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._formElement.checkValidity()||t.stopImmediatePropagation()})),this._setEventListeners()}}])&&i(t.prototype,n),e}();function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r||[],this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(e){var t=this;this.clear(),this._items=e||this._items,this._items.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.append(e)}},{key:"prependItem",value:function(e){this._container.prepend(e)}}])&&l(t.prototype,n),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=function(){function e(t){var n=t.nameElmSelector,r=t.aboutElmSelector,o=t.avatarElmSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElmSelector=n,this._aboutElmSelector=r,this._avatarElmSelector=o,this._nameElement=document.querySelector(this._nameElmSelector),this._aboutElement=document.querySelector(this._aboutElmSelector),this._avatarElement=document.querySelector(this._avatarElmSelector)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,about:this._aboutElement.textContent,avatar:this._avatarElement.src}}},{key:"setUserInfo",value:function(e){this._nameElement.textContent=e.name,this._aboutElement.textContent=e.about,this._avatarElement.src=e.avatar}}])&&u(t.prototype,n),e}();function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._selector=t,this._element=document.querySelector(this._selector),this._handleEscClose=this._handleEscClose.bind(this),this._handleClickClose=this._handleClickClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleClickClose",value:function(e){(e.target.classList.contains("popup__btn-close")||e.target.classList.contains("popup"))&&this.close()}},{key:"setEventListeners",value:function(){document.addEventListener("keydown",this._handleEscClose),this._element.addEventListener("click",this._handleClickClose)}},{key:"removeEventListeners",value:function(){document.removeEventListener("keydown",this._handleEscClose),this._element.removeEventListener("click",this._handleClickClose)}},{key:"open",value:function(){this._element.classList.add("popup_opened"),this.setEventListeners()}},{key:"close",value:function(){this.removeEventListeners(),this._element.classList.remove("popup_opened")}}])&&h(t.prototype,n),e}();function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t,n){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=b(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},m(e,t,n||e)}function y(e,t){return y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},y(e,t)}function v(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(r);if(o){var n=b(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return v(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._imageElm=t._element.querySelector(".place-preview__image"),t._captionElm=t._element.querySelector(".place-preview__caption"),t}return t=a,(n=[{key:"open",value:function(e){this._imageElm.setAttribute("src",e.link),this._imageElm.setAttribute("alt",e.name),this._captionElm.textContent=e.name,m(b(a.prototype),"open",this).call(this)}}])&&_(t.prototype,n),a}(p);function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e,t,n){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},S(e,t,n||e)}function C(e,t){return C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},C(e,t)}function w(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return L(e)}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function a(e){var t,n=e.selector,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,n))._handleFormSubmit=r,t._formElm=t._element.querySelector(".popup__form"),t._inputList=t._element.querySelectorAll(".popup__input"),t._handleSubmit=t._handleSubmit.bind(L(t)),t._submitButton=t._element.querySelector(".popup__button"),t}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"_handleSubmit",value:function(e){e.preventDefault(),this._submitBtnDefaultText=this._submitButton.textContent,this._submitButton.textContent="Сохранение...",this._submitButton.setAttribute("disabled",!0),this._handleFormSubmit(this._getInputValues())}},{key:"setEventListeners",value:function(){S(O(a.prototype),"setEventListeners",this).call(this),this._formElm.addEventListener("submit",this._handleSubmit)}},{key:"removeEventListeners",value:function(){S(O(a.prototype),"removeEventListeners",this).call(this),this._formElm.removeEventListener("submit",this._handleSubmit)}},{key:"close",value:function(){S(O(a.prototype),"close",this).call(this),this._submitButton.textContent=this._submitBtnDefaultText,this._submitButton.removeAttribute("disabled"),this._formElm.reset()}}])&&g(t.prototype,n),a}(p);function P(e){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(e)}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t,n){return R="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}},R(e,t,n||e)}function B(e,t){return B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},B(e,t)}function T(e,t){if(t&&("object"===P(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var D=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return T(this,e)});function a(e){var t,n=e.selector,r=e.confirmItemIdElementSelector,o=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,{selector:n,handleFormSubmit:o}))._confirmItemIdElement=t._element.querySelector(r),t}return t=a,(n=[{key:"open",value:function(e,t){this._confirmItemIdElement.value=e,this._handleSuccess=t,R(q(a.prototype),"open",this).call(this)}},{key:"complete",value:function(){"function"==typeof this._handleSuccess&&this._handleSuccess()}}])&&j(t.prototype,n),a}(I),U=new n({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-28",accessToken:"009c9948-300a-40d1-aa2d-1eaf93669a9a"}),x=document.querySelector(".profile"),F=document.forms.profile,V=document.forms.place,A=document.forms.avatar,N=new f({nameElmSelector:".profile__title",aboutElmSelector:".profile__description",avatarElmSelector:".profile__avatar"}),H=new k(".popup_name_place-preview"),J=function(e){return!1},M=new D({selector:".popup_name_confirm",confirmItemIdElementSelector:".popup__hidden-id-input",handleFormSubmit:function(e){U.deleteCard(e.itemId).then((function(){return!0})).then((function(e){e&&(M.complete(),M.close())})).catch((function(e){return console.log(e)}))}}),z=function(e){var t=new o({data:e,checkIsCurrentUserIdFunc:J,handleCardDelete:function(e){M.open(e,t.removeCard.bind(t))},handleCardClick:function(){H.open(e)},handleLike:function(e){U.addLike(e).then((function(e){return t.recalculateLikes(e.likes)})).catch((function(e){return console.log(e)}))},handleDislike:function(e){U.removeLike(e).then((function(e){return t.recalculateLikes(e.likes)})).catch((function(e){return console.log(e)}))}},"#card-template");return t.generateCard()},G=new s({renderer:function(e){var t=z(e);G.addItem(t)}},".places__list"),K=new I({selector:".popup_name_new-place",handleFormSubmit:function(e){U.addCard({name:e.title,link:e.url}).then((function(e){var t=z(e);G.prependItem(t),K.close()})).catch((function(e){return console.log(e)}))}}),Q=new I({selector:".popup_name_profile-edit",handleFormSubmit:function(e){U.updateProfile(e).then((function(e){N.setUserInfo(e),Q.close()})).catch((function(e){return console.log(e)}))}}),W=new I({selector:".popup_name_avatar-change",handleFormSubmit:function(e){U.updateAvatar(e).then((function(e){N.setUserInfo(e),W.close()})).catch((function(e){return console.log(e)}))}}),X=new c(e,F),Y=new c(e,V),Z=new c(e,A);x.querySelector(".profile__btn-edit").addEventListener("click",(function(e){var t;t=N.getUserInfo(),F.elements.name.value=t.name,F.elements.about.value=t.about,X.clearFormValidation(),Q.open()})),x.querySelector(".profile__btn-add").addEventListener("click",(function(e){Y.clearFormValidation(),K.open()})),x.querySelector(".profile__btn-edit-avatar").addEventListener("click",(function(e){Z.clearFormValidation(),W.open()})),X.enableValidation(),Y.enableValidation(),Z.enableValidation(),U.getProfile().then((function(e){J=function(t){return t===e._id},N.setUserInfo(e),U.getInitialCards().then((function(e){G.renderItems(e)})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}))})();