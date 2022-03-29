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
    registerM(state, payload){
      let newUser = {
        "usuario": payload.usuario,
        "correo": payload.correo,
        "passwd": payload.password
      }
      fetch("http://localhost:5000/api/users/"+newUser.correo, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(newUser), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
        }).then(response => {
          console.log("Esto va primero")
          if (response.status === 400){
            state.errorMessage="Ya existe una cuenta con el correo asociado";
          throw (response.status)
          }
          console.log("Llamo al login")
          console.log("Ya acabe el registro")
        }).catch(err => {
          // state.commit("setErrorMessage", "Ya existe una cuenta con el correo asociado")
          console.log("Ya acabe el registro")
        })
    },  

  },
  actions:{
    async register(context,payload){
      return await commit('registerM',payload)
      // context.commit("login",payload)
    },
    async login(context, payload){
      return await commit("login", payload)
    }
  }
})
