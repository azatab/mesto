export default class UserInfo {
  constructor({name, job, avatar}) {
    this._name = document.querySelector(name)
    this._job = document.querySelector(job)
    this._avatar = document.querySelector(avatar)
  
  }

  getUserInfo() {
    return {
      name: this._name.textContent, 
      job: this._job.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name
    this._job.textContent = userInfo.about
    this._avatar.src = userInfo.avatar
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar
  }
}