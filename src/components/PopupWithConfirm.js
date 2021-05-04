import Popup from "./Popup.js";

export default class PopupWothConfirm extends Popup {
  constructor(popupSelector, id) {
    super(popupSelector)
    this._id = id
  }

  setEventListeners() {
    super(this.setEventListeners);
    
  }
}