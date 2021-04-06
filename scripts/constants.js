export const initialCards = [
  {name: 'Гора Эльбрус', link: './images/elbrus2.jpg'},
  {name: 'Уральские горы', link: './images/ural-mnts.jpg'},
  {name: 'Уфа', link: './images/ufa.jpg'},
  {name: 'Карачаево-Черкессия', link: './images/elbrus3.jpg'},
  {name: 'Памятник Салавату Юлаеву', link: './images/ufa.jpg'},
  {name: 'Уральские горы', link: './images/ural-mnts.jpg'}
];

export const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const editProfileButton = document.querySelector('#profile-edit');
export const addButton = document.querySelector('.profile__add-button');
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const popupImage = document.querySelector('.popup-image');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const inputName = document.querySelector('#input-name');
export const inputJob = document.querySelector('#input-job');
export const inputPlaceName = document.querySelector('#input-place-name');
export const inputImageLink = document.querySelector('#input-image-link');
export const formEditElement = document.querySelector('.edit-form');
export const formAddElement = document.querySelector('.add-form');
export const templateCard = document.querySelector('.template-card');
export const cardsContainer = document.querySelector('.cards__list');
export const image = document.querySelector('.popup-image__photo');
export const caption = document.querySelector('.popup-image__figcaption');
export const ESC_KEYCODE = 27;