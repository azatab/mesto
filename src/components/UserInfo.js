export default class UserInfo {
  constructor({name, job}) {
    this._name = document.querySelector(name)
    this._job = document.querySelector(job)
  
  }

  getUserInfo() {
    return {name: this._name.textContent, job: this._job.textContent}
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name
    this._job.textContent = userInfo.job
  }
}