export default class Api {
  constructor(config) {
    this._url = config.url
    this._headers = config.headers
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json()
    } else return Promise.reject(`Произошла ошибка - ${res.status}`)
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleServerResponse)
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
      method: 'GET'
    }).then(this._handleServerResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    }).then(this._handleServerResponse)
  }

  loadCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.place,
        link: data.link
      })
    }).then(this._handleServerResponse)
  }
  
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  putLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }
}