import {initialCards, editProfileButton, addButton, popupEdit, popupAdd, profileName, profileJob, inputName, inputJob, inputPlaceName, inputImageLink, formAddElement, formEditElement, templateCard, cardsContainer, ESC_KEYCODE, validationObject} from './constants.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'


function handleEditFormSubmit (event) {
  event.preventDefault();
  profileName.textContent =  inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(event.target.closest('.popup'));
}

function handleAddFormSubmit (event) {
  event.preventDefault();
  const inputPlace = inputPlaceName.value;
  const inputLink = inputImageLink.value;
  const newPlace = new Card({name: inputPlace, link: inputLink}, templateCard)
  const cardElement = newPlace.generateCard()
  cardsContainer.prepend(cardElement)
  closePopup(event.target.closest('.popup'));
  formAddElement.reset();
}

function openProfilePopup () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEdit);
}

const findActivePopup = () => {
  return document.querySelector('.popup_is-opened');
}

const handleEscUp = (event) => {
  if (event.which === ESC_KEYCODE) {
    closePopup(findActivePopup());
  }
};

const handleMouseClickOutside = (event) => {
  if (event.target.matches('.popup_is-opened')) {
  closePopup(findActivePopup());
  }
};

export function openPopup (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscUp);
  document.addEventListener('click', handleMouseClickOutside);
}

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscUp);
  document.removeEventListener('click', handleMouseClickOutside);
}

const renderInitialCards = () => {
  initialCards.forEach(item => {
    const card = new Card(item, templateCard)
    const cardElement = card.generateCard()
    cardsContainer.append(cardElement)
  }) 
}
renderInitialCards();


editProfileButton.addEventListener('click', () => {
  openProfilePopup();
  const validatorTest = new FormValidator(validationObject, popupEdit).enableValidation()
});

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  const validatorTest = new FormValidator(validationObject, popupAdd).enableValidation()
});

formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);

const closePopupButton = document.querySelectorAll('.popup__close');
closePopupButton.forEach(function(entry) {
  const popup = entry.closest('.popup');
  entry.addEventListener('click', () => closePopup(popup));
});