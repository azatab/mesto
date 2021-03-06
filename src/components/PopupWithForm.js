import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._form = this._popup.querySelector('.form')
    this._submitButton = this._form.querySelector('.form__save')
    this._submitButtonText = this._submitButton.textContent
    this._inputList = this._form.querySelectorAll('.form__input')
  }

  toggleLoadingMsg(state, buttonText = 'Сохранение...') {
    if (state) {
      this._submitButton.textContent = buttonText
    } else {
      this._submitButton.textContent = this._submitButtonText
    }
  }

  getInputValues() {
    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value)
    return this._formValues
  }

  _formSubmit(event) {
    event.preventDefault()
    this._handleFormSubmit(this.getInputValues())
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._formSubmit.bind(this))
  }

  close() {
    super.close()
    this._form.reset()
  }
}