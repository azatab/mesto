export class FormValidator {
  constructor(data, form) {
    this._form = form
    this._inputSelector = data.inputSelector
    this._button = this._form.querySelector(data.submitButtonSelector)
    this._data = data
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._button.classList.add(this._data.inactiveButtonClass);
      this._button.disabled = true
    } else { 
      this._button.classList.remove(this._data.inactiveButtonClass);
      this._button.disabled = false
    } 
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setInputListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {evt.preventDefault()})
    this._setInputListeners();
  }
}