export default class Card {
    constructor({item, handleCardClick}, cardSelector) {
    this._title = item.name
    this._link = item.link
    this._handleCardClick = handleCardClick
    this._cardSelector = cardSelector
  }
  //получаем шаблон разметки карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true)
    return cardElement
  }

  //удаление карточки
  _handleDeleteCard () {
    this._element.remove();
    this._element = null
  }

  //лайк карточки
  _toggleLike() {
    this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button-active')
  }

  //накладываем обработчики
  _addTaskListeners() {
    this._element.querySelector('.cards__delete-button').addEventListener('click', () => this._handleDeleteCard());
    this._element.querySelector('.cards__like-button').addEventListener('click', () => this._toggleLike());
    this._element.querySelector('.cards__image').addEventListener('click', () => this._handleCardClick(this._title, this._link));
  }
  //создаем карточку
  generateCard() {
    this._element = this._getTemplate()
    const imageContainer = this._element.querySelector('.cards__image')
    this._element.querySelector('.cards__title').textContent = this._title
    imageContainer.src = this._link
    imageContainer.alt = this._title
    this._addTaskListeners()
    return this._element
  }
}