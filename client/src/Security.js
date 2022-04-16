import CryptoJS from "crypto-js"

export const saltear = () => {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
}
  
export const hashWithSalt =(passwd, salt="")=>{        
    salt = salt || saltear() //Uso la sal que me den, si no hay creo una
    // console.log(salt)
    let hash = CryptoJS.SHA256(passwd+salt).toString()
    return {hashedPasswd: hash, saltText: salt}
}
  
export const hashear =(str)=>{        
    return CryptoJS.SHA256(str).toString();
}