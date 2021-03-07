let editProfileButton = document.querySelector('#profile-edit')
let closePopupButton = document.querySelector('.popup__close')
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let inputName = document.querySelector('#input-name');
let inputJob = document.querySelector('#input-job');
let formElement = document.querySelector('.form');
let likeButton = document.querySelectorAll('.cards__like-button');

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

const toggleLike = (evt) => {
  evt.target.classList.toggle('cards__like-button-active');
}

editProfileButton.addEventListener('click', showPopupEdit);
closePopupButton.addEventListener('click', closePopupEdit);
formElement.addEventListener('submit', formSubmitHandler); 
likeButton.forEach(function (entry) {
  entry.addEventListener('click', toggleLike);
});
