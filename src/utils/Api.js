export default class Api {
  constructor(options) {
    // тело конструктора
    this.baseUrl = options.baseUrl || '';
    this.headers = {
      authorization: options.accessToken,
      'Content-Type': 'application/json'
    };
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // другие методы работы с API
}

