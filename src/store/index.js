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
      failedLogin: false,
      registrando: true,
      errorMessage: ""
    }
  },
      
  mutations: {
    async login (state, payload){
      try{
        console.log(payload)
        const response = await fetch("http://localhost:5000/api/user/"+payload.correo+"/"+payload.password)
        const data = await response.json()
        console.log(data)
        state.userId = data._id;
        state.usuario = data.usuario;
        state.HashKey = data.passwd;
        state.failedLogin = false
        state.inside = true;
        state.registrando = false
    
      }catch(error){
        console.log(error)
        state.failedLogin = true
        state.inside = false;
        state.registrando = false
          // console.log(state.failedLogin)
      }          
    },
    
    setErrorMessage(state, payload){
      state.errorMessage = payload;
    },

    unLogin(state){
      state.inside = false;
      state.failedLogin = false;
      state.registrando = false
      state.userId = "";
      state.usuario = "";
      state.HashKey = "";
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
    async register({commit},payload){
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
        this.state.errorMessage="";
        console.log("Llamo al login")
        commit("login",payload)
      }catch{
        this.state.errorMessage="Ya existe una cuenta con el correo asociado";
        console.log("Mamó")
      }finally{
        console.log("Ya acabe el registro")
      }
        
    },

  }
})
