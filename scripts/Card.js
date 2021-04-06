import {image, caption, popupImage} from './constants.js'
import {openPopup} from './index.js'

export class Card {
  constructor(data, template) {
    this._title = data.name
    this._link = data.link
    this._template = template
    this._getTemplate()
  }
  //получаем шаблон разметки карточки
  _getTemplate() {
    const cardElement = this._template.content.cloneNode(true)
    return cardElement
    console.log(cardElement)
  }

  //удаление карточки
  _deleteCard(event) {
    event.target.removeEventListener('click', this.remove)
    event.target.closest('.cards__item').remove()
  }

  //лайк карточки
  _toggleLike(event) {
    event.target.classList.toggle('cards__like-button-active');
  }

  //открытие попапа с увеличенным изображением
  _exploreImage(event) {
    openPopup(popupImage);
    image.src = event.target.src;
    image.alt = event.target.alt;
    caption.textContent = event.target.alt;
  }

  //накладываем обработчики
  _addTaskListeners() {
    const deleteButton = this._element.querySelector('.cards__delete-button')
    deleteButton.addEventListener('click', this._deleteCard);
    const likeButton = this._element.querySelector('.cards__like-button');
    likeButton.addEventListener('click', this._toggleLike);
    const image = this._element.querySelector('.cards__image');
    image.addEventListener('click', this._exploreImage);
  }
  //создаем карточку
  generateCard() {
    this._element = this._getTemplate()
    this._addTaskListeners()
    this._element.querySelector('.cards__title').textContent = this._title
    this._element.querySelector('.cards__image').src = this._link
    this._element.querySelector('.cards__image').alt = this._title
    return this._element
  }
}