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
      count: 0,
      inside: false,
      correo: "",
      usuario: "",
      HashKey: "",
      UserId: "",
      currUser: {_id: "", usuario: "", hashKey: "", correo:""},
      failedLogin: false,
      registrando: false,
      errorMessage: ""
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

  },
  actions:{
     async register2({commit, dispatch},payload){
      try{
        
        let newUser = {
          "usuario": payload.usuario,
          "correo": payload.correo,
          "passwd": payload.password
        }
        
        let response = await fetch("http://localhost:5000/api/users/"+newUser.correo, {
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
        dispatch("login",payload)
      }catch{
        commit("setErrorMessage","Ya existe una cuenta con el correo asociado");
      } 
    },

    async register({commit, dispatch},payload){
      try{
        let newUser = {
          "usuario": payload.usuario,
          "correo": Sec.hashear(payload.correo),
          "passwd": Sec.hashear(payload.passwd)
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
        // console.log(data)
        let user = {"_id": data._id, "usuario": data.usuario, "password": credentials.passwd, "correo": credentials.correo}
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
