export default class Card {
    constructor({item, handleCardClick, handleDeleteClick, handleLikeClick, handleDeleteLike, userId}, cardSelector) {
    this._title = item.name
    this._link = item.link
    this._cardId = item.id
    this._item = item
    this._handleCardClick = handleCardClick
    this._handleDeleteClick = handleDeleteClick
    this._cardSelector = cardSelector
    this._handleLikeClick = handleLikeClick
    this._handleDeleteLike = handleDeleteLike
    this._likes = item.likes
    this._userId = userId
  }
  //получаем шаблон разметки карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true)
    return cardElement
  }

  //удаление карточки
  deleteCard () {
    this._element.remove();
    this._element = null
  }

  //лайк карточки
  _toggleLike() {
    this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button-active')
  }

  setLikeCount(item) {
    this._element.querySelector('.cards__like-counter').textContent = item.likes.length
  }

  _like(item) {
    this._toggleLike()
    this._handleLikeClick(item)
  }

  _dislike(item) {
    this._toggleLike()
    this._handleDeleteLike(item)
  }

  //накладываем обработчики
  _addTaskListeners() {
    this._element.querySelector('.cards__delete-button').addEventListener('click', () => this._handleDeleteClick(this._userId));

    this._element.querySelector('.cards__like-button').addEventListener('click', () => {
      if (this._element.querySelector('.cards__like-button').classList.contains('cards__like-button-active')) {
        this._dislike(this._item)
      } else {
        this._like(this._item)
      }
    });

    this._element.querySelector('.cards__image').addEventListener('click', () => this._handleCardClick(this._title, this._link));
  }
  //создаем карточку
  generateCard() {
    this._element = this._getTemplate()
    const imageContainer = this._element.querySelector('.cards__image')
    this._element.querySelector('.cards__title').textContent = this._title
    imageContainer.src = this._link
    imageContainer.alt = this._title

    if (this._item.owner._id === this._userId) {
      this._element.querySelector('.cards__delete-button').style.display = 'block'
    } else {
      this._element.querySelector('.cards__delete-button').style.display = 'none'
    }
    //this._element.querySelector

    this.setLikeCount(this._item)
    this._addTaskListeners()
    return this._element
  }
}