export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._popupCloseButton = this._popup.querySelector('.popup__close')
  }

  open() {
    this._popup.classList.add('popup_is-opened')
    document.addEventListener('keyup', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_is-opened')
    document.removeEventListener('keyup', this._handleEscClose)
  }

  _handleEscClose = (event) => {
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
    this._popup.addEventListener('click', (event) => this._handleMouseClickOutside(event))   
    this._popupCloseButton.addEventListener('click', () => this.close())
  }
}