import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._form = popupSelector.querySelector('.form')
    this._submitButton = this._form.querySelector('.form__save')
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input')
    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value)
    console.log(this._formValues)
    return this._formValues
  }

  _formSubmit(event) {
    event.preventDefault()
    this._handleFormSubmit(this._getInputValues(), this._submitButton)
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