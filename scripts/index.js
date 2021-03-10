const initialCards = [
  {name: 'Гора Эльбрус', link: './images/elbrus2.jpg'},
  {name: 'Уральские горы', link: './images/ural-mnts.jpg'},
  {name: 'Уфа', link: './images/ufa.jpg'},
  {name: 'Карачаево-Черкессия', link: './images/elbrus3.jpg'},
  {name: 'Памятник Салавату Юлаеву', link: './images/ufa.jpg'},
  {name: 'Уральские горы', link: './images/ural-mnts.jpg'}
];

const editProfileButton = document.querySelector('#profile-edit');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-image');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = document.querySelector('#input-name');
const inputJob = document.querySelector('#input-job');
const inputPlaceName = document.querySelector('#input-place-name');
const inputImageLink = document.querySelector('#input-image-link');
const formEditElement = document.querySelector('.edit-form');
const formAddElement = document.querySelector('.add-form');
const templateCard = document.querySelector('.template-card');
const cardsContainer = document.querySelector('.cards__list');

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
  const newPlace = createCardDomNode({name: inputPlace, link: inputLink});
  cardsContainer.prepend(newPlace);
  formAddElement.reset();
  closePopup(event.target.closest('.popup'));
}

function openProfilePopup () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEdit);
}

function openPopup (popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
}

function toggleLike (event) {
  event.target.classList.toggle('cards__like-button-active');
}

function deleteCard(event) {
  const target = event.target;
  const currentCard = target.closest('.cards__item');
  currentCard.remove();
}

function exploreImage(event) {
  openPopup(popupImage);
  const image = document.querySelector('.popup-image__photo');
  const caption = document.querySelector('.popup-image__figcaption');
  image.src = event.target.src;
  image.alt = event.target.alt;
  caption.textContent = event.target.alt;
}

function addTaskListeners(task) {
  const deleteButton = task.querySelector('.cards__delete-button');
  deleteButton.addEventListener('click', deleteCard);
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
    return newCard;
  });
  cardsContainer.append(...result);
}
renderInitialCards();

editProfileButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', () => openPopup(popupAdd));

formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);

const closePopupButton = document.querySelectorAll('.popup__close');
closePopupButton.forEach(function(entry) {
  const popup = entry.closest('.popup');
  entry.addEventListener('click', () => closePopup(popup));
});
