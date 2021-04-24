import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._form = popupSelector.querySelector('.form')
    this._submitButton = this._form.querySelector('.form__save')
    this._inputList = this._form.querySelectorAll('.form__input')
  }

  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value)
    return this._formValues
  }

  _formSubmit(event) {
    event.preventDefault()
    this._handleFormSubmit(this._getInputValues())
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