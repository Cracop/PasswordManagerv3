
const CryptoJS = require('crypto-js')

const saltear = () => {
  return CryptoJS.lib.WordArray.random(128 / 8).toString();
}

const hashear =(passwd, salt="")=>{        
  salt = salt || saltear() //Uso la sal que me den, si no hay creo una
  // console.log(salt)
  let hash = CryptoJS.SHA256(passwd+salt).toString()
  return {hashedPasswd: hash, saltedText: salt}
}
  
module.exports = {saltear, hashear}