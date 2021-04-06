import {validationObject} from './constants.js'

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
  
  _allInputsEmpty = (inputList) => {
    for (let index in inputList) {
      if (inputList[index].value.length > 0) {
        return false;
      }
    }
    return true;
  };

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList) || this._allInputsEmpty(inputList)) {
      this._button.classList.add(this._data.inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    } else { 
      this._button.classList.remove(this._data.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    } 
  }

  _searchErrorElement = (formElement, inputElement) => {
    return formElement.querySelector(`.${inputElement.id}-error`);
  };

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = this._searchErrorElement(formElement, inputElement);
    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  };
  
  _hideInputError = (formElement, inputElement) => {
    const errorElement = this._searchErrorElement(formElement, inputElement);
    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setInputListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._form, inputElement);
        this._toggleButtonState(this._inputList);
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {evt.preventDefault()})
    this._setInputListeners();
  }
}
