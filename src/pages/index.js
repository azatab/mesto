import '../pages/index.css'

import {/*initialCards, */editProfileButton, addButton, popupEdit, popupAdd, inputName, inputJob, cardsContainer, defaultFormConfig} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupWothConfirm from '../components/PopupWithConfirm'
let userId

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
  headers: {
    Authorization: 'fd203571-6c18-4944-b0cc-56f9f29c5b53',
    "content-type": "application/json"
  }
})

//api.getUserInfo()
Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cardsObj, userData]) => {
    userId = userData._id

    userInfo.setUserAvatar(userData)
    //userInfo.getUserInfo(userData)
    userInfo.setUserInfo(userData)

    cards.renderItems(cardsObj)
  })
  .catch((err) => console.log(err))

const popupWithImage = new PopupWithImage('.popup-image')
popupWithImage.setEventListeners()

const popupWithConfirm = new PopupWothConfirm('.popup-confirm-delete')
popupWithConfirm.setEventListeners()

const createCard = (item) => {
  const card = new Card({
    item, 
    handleCardClick: () => {
      popupWithImage.open(item)},
    handleDeleteClick: () => {
      popupWithConfirm.open()
      popupWithConfirm.setSubmitAction(() => {
        api.deleteCard(item._id)
          .then((item) => {
            card.deleteCard(item._id)
            popupWithConfirm.close()
          })
          .catch((err) => {console.log(`Ошибка удаления - ${err}`)})
      })
    },
    handleLikeClick: (item) => {
      api.putLike(item._id)
        .then((item) => {
          card.setLikeCount(item)
        })
        .catch((err) => {
          console.log(`Ошибка установки "лайка" - ${err}`)
        })
    },
    handleDeleteLike: (item) => {
      api.deleteLike(item._id)
        .then((item) => {
          card.setLikeCount(item)
        })
        .catch((err) => {
          console.log(`Ошибка удаления "лайка" - ${err}`)
        })
    },
    userId
    }, '.template-card')
  return card.generateCard()
}

const cards = new Section({
  //items: initialCards, 
  renderer: (item) => {
    const card = createCard(item)
    cards.addItem(card)
    //console.log(item)
    //card.setLikeCount(item)
    
  }
}, cardsContainer)

//cards.renderItems()

const addNewCard = new PopupWithForm ('.popup-add', {
  handleFormSubmit: (data) => {
    const inputValues = addNewCard.getInputValues()
    const newItem = api.loadCard(inputValues)
    newItem.then((item) => {
      cards.addItem(createCard(item))
      
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      addNewCard.close()
    })
    /* const item = {
      name: data.place,
      link: data.link
    }
    cards.addItem(createCard(item))
    addNewCard.close() */
  }
})
addNewCard.setEventListeners()

const userInfo = new UserInfo({
  name: '.profile__name', 
  job: '.profile__job', 
  avatar: '.profile__avatar'
})

const editProfile = new PopupWithForm('.popup-edit', {
  handleFormSubmit: (data) => {
    const inputValues = editProfile.getInputValues()
    const newUser = api.setUserInfo(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      editProfile.close()
    })
    /* const item = {
      name: data.name,
      job: data.job
    } 
    userInfo.setUserInfo(item)
    editProfile.close()    */
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