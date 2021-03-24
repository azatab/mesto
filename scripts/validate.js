const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const allInputsEmpty = (inputList) => {
  for (index in inputList) {
    if (inputList[index].value.length > 0) {
      return false;
    }
  }
  return true;
};

const toggleButtonState = (inputList, buttonElement, {...rest}) => {
  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
    buttonElement.classList.add(rest.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else { 
    buttonElement.classList.remove(rest.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  } 
};

const checkInputValidity = (formElement, inputElement, {...rest}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};
const searchErrorElement = (formElement, inputElement) => {
  return formElement.querySelector(`.${inputElement.id}-error`);
};

const showInputError = (formElement, inputElement, errorMessage, {...rest}) => {
  const errorElement = searchErrorElement(formElement, inputElement);
  inputElement.classList.add(rest.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(rest.errorClass);
};

const hideInputError = (formElement, inputElement, {...rest}) => {
  const errorElement = searchErrorElement(formElement, inputElement);
  inputElement.classList.remove(rest.inputErrorClass);
  errorElement.classList.remove(rest.errorClass);
  errorElement.textContent = '';
};

const setInputListeners = (formElement, {...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
  const buttonElement = formElement.querySelector(rest.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

const enableValidation = ({...rest}) => {
  const formList = Array.from(document.querySelectorAll(rest.formSelector));
  console.log(formList);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {evt.preventDefault()});
    setInputListeners(formElement, rest);
  });
};

enableValidation(validationObject);