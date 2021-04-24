import {initialCards, editProfileButton, addButton, popupEdit, popupAdd, inputName, inputJob, cardsContainer, defaultFormConfig, popupWithZoomedImage} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import '../pages/index.css'

const popupWithImage = new PopupWithImage(popupWithZoomedImage)
popupWithImage.setEventListeners()

const createCard = (item) => {
  const card = new Card({
    item, 
    handleCardClick: () => {popupWithImage.open(item)}
    }, '.template-card')
  return card.generateCard()
}

const cards = new Section({
  items: initialCards, 
  renderer: (item) => {
    cards.addItem(createCard(item))}
  }, cardsContainer)

cards.renderItems()

const addNewCard = new PopupWithForm (popupAdd, {
  handleFormSubmit: (data) => {
    const item = {
      name: data.place,
      link: data.link
    }
    cards.addItem(createCard(item))
    addNewCard.close()
  }
})
addNewCard.setEventListeners()

const userInfo = new UserInfo({name: '.profile__name', job: '.profile__job'})

const editProfile = new PopupWithForm(popupEdit, {
  handleFormSubmit: (data) => {
    const item = {
      name: data.name,
      job: data.job
    } 
    userInfo.setUserInfo(item)
    editProfile.close()   
  }
})
editProfile.setEventListeners()

editProfileButton.addEventListener('click', () => {
  const profileFields = userInfo.getUserInfo()
  inputName.value = profileFields.name
  inputJob.value = profileFields.job
  editProfile.open()
  validateEditForm.checkFormStateOnOpen()
});

addButton.addEventListener('click', () => {
  addNewCard.open()
  validateAddForm.checkFormStateOnOpen()
});

const validateEditForm = new FormValidator(defaultFormConfig, popupEdit)
const validateAddForm = new FormValidator(defaultFormConfig, popupAdd)
validateEditForm.enableValidation()
validateAddForm.enableValidation()