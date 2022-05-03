import { createStore } from 'vuex'
import * as Sec from '../Security.js';

// Create a new store instance.
export default createStore({//Para mantener las sesiones
      // !failedLogin && !inside && !registrando = login por primera vez
      // failedLogin && !inside && !registrando = mensaje failed login
      // !failedLogin && !inside && registrando = registerMenu
      // !failedLogin && inside && !registrando = ya estoy dentro
  state () {
    return {
      inside: true,
      currUser: {_id: "", usuario: "", hashKey: "", correo:""},
      failedLogin: false,
      registrando: false,
      errorMessage: "",
      cuentas: [
        {
          _id: "au3721233",
          alias: "lalita",
          idUsuario: "akskas123847547854",
          sitio: "lala.com",
          correo: "lala@gmail.com",
          passwd: "lala",
          username: "lala",
          salt: "soyUnaTeteraPequeñita",
        },
        {
          _id: "73647143578",//Si viene del back end
          alias: "alpurita",//Si viene del back end
          idUsuario: "akskas123847547854",//Si viene del back end
          sitio: "alpura.com",//Si viene del back end
          correo: "lala@gmail.com",//Si viene del back end
          passwd: "lala",//Si viene del back end
          username: "lalaumi",//Si viene del back end
          salt: "TengoMiAsaYMiEspita",//No viene del back end
        },
        {
          _id: "3456789",//Si viene del back end
          alias: "liconsita",//Si viene del back end
          idUsuario: "akskas123847547854",//Si viene del back end
          sitio: "",//Si viene del back end
          correo: "lala@gmail.com",//Si viene del back end
          passwd: "lala",//Si viene del back end
          username: "lalaumi",//Si viene del back end
          salt: "CuandoVaporizoMiVozTeGrita",//No viene del back end
        },
      ],
      cuentaSelected: false,
      currCuenta: {
        _id: "", alias: "", idUsuario: "", sitio: "", 
        correo: "", passwd: "", username: ""
      }
    }
  },
      
  mutations: {
    login (state, payload){
      // Guardo mi usuario actual
      state.currUser._id = payload._id;
      state.currUser.usuario = payload.usuario;
      state.currUser.correo = payload.correo;
      state.currUser.hashKey = payload.password;
      // Guardo en que estado estoy
      state.failedLogin = false
      state.inside = true;
      state.registrando = false
    },

    failedLogin(state){
      state.failedLogin = true
      state.inside = false;
      state.registrando = false
      state.cuentaSelected = false;
    },
    
    setErrorMessage(state, payload){
      state.errorMessage = payload;
    },

    unLogin(state){
      state.inside = false;
      state.failedLogin = false;
      state.registrando = false
      state.currUser= {_id: "", usuario: "", hashKey: "", correo:""},
      state.errorMessage = "";
    },
    ShowRegisterMenu(state){
      state.inside = false;
      state.failedLogin = false;
      state.registrando = true;
    },
    //   //https://developer.mozilla.org/en-US/docs/Web/API/fetch
    // https://www.codepanion.com/posts/2020-02-02-how-to-use-async-await-promises-with-fetch-in-vue-js-vuex/ 

    selectAccount(state, payload){
      state.cuentaSelected = true;
      state.currCuenta = payload;
    },
    unSelectAccount(state){
      state.cuentaSelected = false;
      state.currCuenta= {
        _id: "", alias: "", idUsuario: "", sitio: "", 
        correo: "", passwd: "", username: ""
      } 
    }
  },
  actions:{

    async register({commit, dispatch},payload){
      try{
        const passwd = Sec.hashear(payload.passwd)
        // console.log(Sec.cifrar(payload.usuario,passwd.slice(0, 32)))
        // console.log(passwd.slice(0, 32))
        let newUser = {
          "usuario": Sec.cifrar(payload.usuario,passwd.slice(0, 32)),
          "correo": Sec.hashear(payload.correo),
          "passwd": passwd
        }
        
        // console.log(newUser)
        let response = await fetch("http://localhost:5000/api/user/signup", {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(newUser), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
        })

        if (response.status === 400){
          this.state.errorMessage="Ya existe una cuenta con el correo asociado";
        throw (response.status)
        }

        commit("setErrorMessage","");
        // console.log("Llamo al login")
        // console.log({"correo": payload.correo,
        // "passwd": payload.password})
        // console.log(payload)

        // dispatch("login",payload)
        commit("unLogin")
      }catch{
        commit("setErrorMessage","Ya existe una cuenta con el correo asociado");
      } 
    },

    async login({commit}, payload){
      try {
        
        // console.log(payload)
        let credentials = {
          "correo": Sec.hashear(payload.correo),
          "passwd": Sec.hashear(payload.password)
        }
        // console.log(credentials)
        let response = await fetch("http://localhost:5000/api/user/login", {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(credentials), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json; charset=UTF-8',
              }
        })
        
        let data = await response.json()
        // console.log(credentials.passwd.slice(0, 32))
        // console.log(Sec.descifrar("U2FsdGVkX19u8t/gEVM1TwdPuwJyAwIcKJ6x+DijkiQ=",credentials.passwd.slice(0, 32)))
        console.log(data)
        let user = {
          "_id": data._id, 
          "usuario": Sec.descifrar(data.usuario, credentials.passwd.slice(0, 32)), 
          "password": credentials.passwd, 
          "correo": credentials.correo}
        console.log(user)
        
        commit("login", user)

      }catch(error){
        console.log(error)
        commit("setErrorMessage","Credenciales Incorrectas");
        commit("failedLogin")
      }
    },

  }
})
