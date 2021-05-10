import '../pages/index.css'

import {editProfileButton, addButton, popupEdit, popupAdd, popupAvatarUpdate, inputName, inputJob, cardsContainer, defaultFormConfig, editAvatarButton} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupWithConfirm from '../components/PopupWithConfirm'
let userId

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
  headers: {
    Authorization: 'fd203571-6c18-4944-b0cc-56f9f29c5b53',
    "content-type": "application/json"
  }
})

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cardsObj, userData]) => {
    userId = userData._id

    userInfo.setUserAvatar(userData)
    userInfo.setUserInfo(userData)

    cards.renderItems(cardsObj)
  })
  .catch((err) => console.log(err))

const popupWithImage = new PopupWithImage('.popup-image')
popupWithImage.setEventListeners()

const popupWithConfirm = new PopupWithConfirm('.popup-confirm-delete')
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
  renderer: (item) => {
    const card = createCard(item)
    cards.addItem(card)
  }
}, cardsContainer)



const addNewCard = new PopupWithForm ('.popup-add', {
  handleFormSubmit: (data) => {
    addNewCard.toggleLoadingMsg(true)
    const newItem = api.loadCard(data)
    newItem.then((item) => {
      cards.addItem(createCard(item))
      addNewCard.close()  
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((data) => {
      addNewCard.toggleLoadingMsg(false)
    })
  }
})
addNewCard.setEventListeners()

const userInfo = new UserInfo({
  name: '.profile__name', 
  job: '.profile__job', 
  avatar: '.profile__avatar'
})

const editAvatar = new PopupWithForm('.popup-avatar-update', {
  handleFormSubmit: () => {
    editAvatar.toggleLoadingMsg(true)
    const inputLink = editAvatar.getInputValues()
    api.setAvatar(inputLink.link)
    .then((res) => {
      userInfo.setUserAvatar(res)
      editAvatar.close()
    })
    .catch((err) => {
      console.log(`Ошибка установки нового аватара - ${err}`)
    })
    .finally(() => {
      editAvatar.toggleLoadingMsg(false)
    })
  }
})
editAvatar.setEventListeners()

const editProfile = new PopupWithForm('.popup-edit', {
  handleFormSubmit: (data) => {
    editProfile.toggleLoadingMsg(true)
    const inputValues = editProfile.getInputValues()
    api.setUserInfo(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data)
      editProfile.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      editProfile.toggleLoadingMsg(false)
    })
  }
})
editProfile.setEventListeners()

editAvatarButton.addEventListener('click', () => {
  editAvatar.open()
  validateAvatarForm.checkFormStateOnOpen()
})

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
const validateAvatarForm = new FormValidator(defaultFormConfig, popupAvatarUpdate)
validateEditForm.enableValidation()
validateAddForm.enableValidation()
validateAvatarForm.enableValidation()