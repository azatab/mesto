import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._button = this._popup.querySelector('.form__save')
    this._form = this._popup.querySelector('.form')
  }

  SubmitActionHandler(data) {
    this._handleSubmit = data  
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._button.textContent = 'Удаление...'
      this._handleSubmit()
    })
  }
}