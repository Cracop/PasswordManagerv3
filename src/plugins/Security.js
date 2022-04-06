import CryptoJS from "crypto-js"
export default {
  install: (app, options) => {
    app.config.globalProperties.$hashear = (passwd) => {
      return CryptoJS.SHA256(passwd).toString()
    }
  }
}
