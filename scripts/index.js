let editProfileButton = document.querySelector('#profile-edit')
let closePopupButton = document.querySelector('.popup__close')
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
//let saveButton = document.querySelector('.popup__save');
let inputName = document.querySelector('#input-name');
let inputJob = document.querySelector('#input-job');
let formElement = document.querySelector('.form');

function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent =  inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupEdit();
}

function showPopupEdit () {
  popup.classList.add('popup_is-opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function closePopupEdit () {
  popup.classList.remove('popup_is-opened');
}

editProfileButton.addEventListener('click', showPopupEdit);
closePopupButton.addEventListener('click', closePopupEdit);
formElement.addEventListener('submit', formSubmitHandler); 