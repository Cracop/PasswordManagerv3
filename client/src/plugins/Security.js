import CryptoJS from "crypto-js"
export default {
  install: (app, options) => {
    app.config.globalProperties.$saltear = () => {
      return CryptoJS.lib.WordArray.random(128 / 8).toString();
    },
    app.config.globalProperties.$hashWithSalt = (passwd) => {
      let salt = app.config.globalProperties.$saltear()
      // console.log(salt)
      let hash = CryptoJS.SHA256(passwd+salt).toString()
      return {hashedPasswd: hash, saltText: salt}
    },
    app.config.globalProperties.$hashear = (str) => {
      return CryptoJS.SHA256(str).toString();
    }
  }
}

// So..for example:
// user-password: "mypassword"
// random salt: "abcdefg12345"
// resulting-cleartext: "mypassword:abcdefg12345" (how you combine them is up to you. as long as you use the same combination format every time).
// hash the resulting cleartext: "somestandardlengthhashbasedonalgorithm" 