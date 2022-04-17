import CryptoJS from "crypto-js"

export const saltear = () => {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
}
  
export const hashWithSalt = (passwd, salt="96771a284196c83cec8d9ff09100b3a0")=>{        
    salt = salt || saltear() //Uso la sal que me den, si no hay creo una
    // console.log(salt)
    let hash = CryptoJS.SHA256(passwd+salt).toString()
    return {hashedPasswd: hash, saltText: salt}
}
  
export const hashear =(str)=>{        
    return CryptoJS.SHA256(str).toString();
}

export const cifrar = (str, llave) => {
    return CryptoJS.AES.encrypt(str, llave).toString();
}

export const descifrar = (str, llave) => {
    return CryptoJS.AES.decrypt(str, llave).toString();
}