//import {popupCloseButton} from '../utils/constants.js'

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
    this._popupCloseButton = this._popupSelector.querySelector('.popup__close')
  }

  open() {
    this._popupSelector.classList.add('popup_is-opened')
    
  }

  close() {
    this._popupSelector.classList.remove('popup_is-opened')
    document.removeEventListener('keyup', this._handleEscClose)
    document.removeEventListener('click', this._handleMouseClickOutside)
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  _handleMouseClickOutside(event) {
    if (event.target.matches('.popup_is-opened')) {
      this.close()
      }
  }

  setEventListeners() {
    document.addEventListener('keyup', (event) => this._handleEscClose(event))
    document.addEventListener('click', (event) => this._handleMouseClickOutside(event))   
    this._popupCloseButton.addEventListener('click', () => this.close())
  }
}