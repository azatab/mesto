import Popup from "./Popup.js";

export default class PopupWothConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popup = document.querySelector('.popup-confirm-delete')
    this._button = this._popup.querySelector('.form__save')
  }

  setSubmitAction(data) {
    this._handleSubmit = data
  }

  setEventListeners() {
    this._button.addEventListener('click', (evt) => {
      evt.preventDefault()
      this._handleSubmit()
    })
    super.setEventListeners;
  }

  open() {
    super.open()
  }

  close() {
    super.close()
  }
}