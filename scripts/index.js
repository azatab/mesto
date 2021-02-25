let editProfileButton = document.querySelector('#profile-edit')
let closePopupButton = document.querySelector('#popup-close')
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.profile__name');
let jobInput = document.querySelector('.profile__job');
let saveButton = document.querySelector('#save');

function formSubmitHandler (event) {
  event.preventDefault();
  nameInput.textContent =  document.querySelector('#input-name').value;
  jobInput.textContent = document.querySelector('#input-job').value;
  closePopupEdit();
}

function showPopupEdit () {
  popup.classList.add('popup_is-opened');
  document.querySelector('#input-name').value = nameInput.textContent;
  document.querySelector('#input-job').value = jobInput.textContent;
}

function closePopupEdit () {
  popup.classList.remove('popup_is-opened');
}

editProfileButton.addEventListener('click', showPopupEdit);
closePopupButton.addEventListener('click', closePopupEdit);
saveButton.addEventListener('click', formSubmitHandler); 