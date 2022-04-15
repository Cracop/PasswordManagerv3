import CryptoJS from "crypto-js"
export default {
  install: (app, options) => {
    app.config.globalProperties.$saltear = (passwd) => {
      return CryptoJS.lib.WordArray.random(128 / 8).toString();
    },
    app.config.globalProperties.$hashear = (passwd) => {
      let salt = app.config.globalProperties.$saltear(passwd)
      // console.log(salt)
      let hash = CryptoJS.SHA256(passwd+salt).toString()
      return {hashedPasswd: hash, saltText: salt}
    }
  }
}

// So..for example:
// user-password: "mypassword"
// random salt: "abcdefg12345"
// resulting-cleartext: "mypassword:abcdefg12345" (how you combine them is up to you. as long as you use the same combination format every time).
// hash the resulting cleartext: "somestandardlengthhashbasedonalgorithm" 