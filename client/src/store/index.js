import { createStore } from 'vuex'

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
      currUser: {id: "", usuario: "", hashKey: "", correo:""},
      failedLogin: false,
      registrando: false,
      errorMessage: ""
    }
  },
      
  mutations: {
    login (state, payload){
      // Guardo mi usuario actual
      state.currUser.id = payload.id;
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
      state.currUser= {id: "", usuario: "", hashKey: "", correo:""},
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
     async register({commit, dispatch},payload){
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
      }finally{
        console.log("Ya acabe el registro")
      }
        
    },

    async login({commit}, payload){
      try {
        let response = await fetch("http://localhost:5000/api/user/"+payload.correo+"/"+payload.password)
        let data = await response.json()
        let user = {id: data._id, usuario: data.usuario, password: data.passwd, correo: data.correo}
        // console.log("Usuario que soy")
        // console.log(user)
        commit("login", user)
      }catch(error){
        commit("setErrorMessage","Credenciales Incorrectas");
        commit("failedLogin")
      }
    }
  }
})
