const initialCards = [
  {name: 'Гора Эльбрус', link: './images/elbrus2.jpg'},
  {name: 'Уральские горы', link: './images/ural-mnts.jpg'},
  {name: 'Уфа', link: './images/ufa.jpg'},
  {name: 'Карачаево-Черкессия', link: './images/elbrus3.jpg'},
  {name: 'Памятник Салавату Юлаеву', link: './images/ufa.jpg'},
  {name: 'Уральские горы', link: './images/ural-mnts.jpg'}
];

let editProfileButton = document.querySelector('#profile-edit');
let addButton = document.querySelector('.profile__add-button');
let popupEdit = document.querySelector('.popup-edit');
let popupAdd = document.querySelector('.popup-add');
let popupImage = document.querySelector('.popup-image');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let inputName = document.querySelector('#input-name');
let inputJob = document.querySelector('#input-job');
let inputPlaceName = document.querySelector('#input-place-name');
let inputImageLink = document.querySelector('#input-image-link');
let formEditElement = document.querySelector('.edit-form');
let formAddElement = document.querySelector('.add-form');
const templateCard = document.querySelector('.template-card');
const cardsContainer = document.querySelector('.cards__list');

function editFormSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent =  inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(event);
}

function addFormSubmitHandler (event) {
  event.preventDefault();
  const inputPlace = inputPlaceName.value;
  const inputLink = inputImageLink.value;
  const newPlace = createCardDomNode({name: inputPlace, link: inputLink});
  cardsContainer.prepend(newPlace);
  closePopup(event);
}

function showPopupEdit () {
  popupEdit.classList.add('popup_is-opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function showPopupAdd () {
  popupAdd.classList.add('popup_is-opened');
}

function closePopup (evt) {
  const currentPopup = evt.target.closest('.popup');
  currentPopup.classList.remove('popup_is-opened');
}

function toggleLike (evt) {
  evt.target.classList.toggle('cards__like-button-active');
}

function deleteCardHandler(evt) {
  const target = evt.target;
  const currentCard = target.closest('.cards__item');
  currentCard.remove();
}

function exploreImage(evt) {
  popupImage.classList.add('popup_is-opened');
  const image = document.querySelector('.popup-image__photo');
  const caption = document.querySelector('.popup-image__figcaption');
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent = evt.target.alt;
}

function addTaskListeners(task) {
  const deleteButton = task.querySelector('.cards__delete-button');
  deleteButton.addEventListener('click', deleteCardHandler);
  const likeButton = task.querySelector('.cards__like-button');
  likeButton.addEventListener('click', toggleLike);
  const image = task.querySelector('.cards__image');
  image.addEventListener('click', exploreImage);
}

function createCardDomNode(item) {
  const newCard = templateCard.content.cloneNode(true);
  const title = newCard.querySelector('.cards__title');
  const image = newCard.querySelector('.cards__image');
  title.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;
  addTaskListeners(newCard);
  return newCard;
}

function renderInitialCards() {
  const result = initialCards.map(function(item) {
    const newCard = createCardDomNode(item);
    addTaskListeners(newCard);
    return newCard;
  });
  cardsContainer.append(...result);
}
renderInitialCards();

editProfileButton.addEventListener('click', showPopupEdit);

addButton.addEventListener('click', showPopupAdd);
formEditElement.addEventListener('submit', editFormSubmitHandler);
formAddElement.addEventListener('submit', addFormSubmitHandler);

const closePopupButton = document.querySelectorAll('.popup__close');
closePopupButton.forEach(function(entry) {
  entry.addEventListener('click', closePopup);
});
