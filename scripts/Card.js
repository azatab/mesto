import {openPopup} from './index.js'
const popupImage = document.querySelector('.popup-image');
const image = document.querySelector('.popup-image__photo');
const caption = document.querySelector('.popup-image__figcaption');

export class Card {
  constructor(data, template) {
    this._title = data.name
    this._link = data.link
    this._template = template
  }
  //получаем шаблон разметки карточки
  _getTemplate() {
    const cardElement = this._template.content.querySelector('.cards__item').cloneNode(true)
    return cardElement
  }

  //удаление карточки
  _handleDeleteCard () {
    this._element.remove();
    this._element = null
  }

  //лайк карточки
  _toggleLike() {
    this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button-active');
  }

  //открытие попапа с увеличенным изображением
  _exploreImage(event) {
    image.src = event.target.src;
    image.alt = event.target.alt;
    caption.textContent = event.target.alt;
    openPopup(popupImage);
  }

  //накладываем обработчики
  _addTaskListeners() {
    this._element.querySelector('.cards__delete-button').addEventListener('click', () => this._handleDeleteCard());
    this._element.querySelector('.cards__like-button').addEventListener('click', () => this._toggleLike());
    this._element.querySelector('.cards__image').addEventListener('click', this._exploreImage);
  }
  //создаем карточку
  generateCard() {
    this._element = this._getTemplate()
    this._element.querySelector('.cards__title').textContent = this._title
    this._element.querySelector('.cards__image').src = this._link
    this._element.querySelector('.cards__image').alt = this._title
    this._addTaskListeners()
    return this._element
  }
}