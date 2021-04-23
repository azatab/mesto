import Popup from "./Popup.js";


const image = document.querySelector('.popup-image__photo');
const caption = document.querySelector('.popup-image__figcaption');

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)

  }

  open(item) {
    image.src = item.link;
    image.alt = item.name;
    caption.textContent = item.name;

    super.open()
  }
}