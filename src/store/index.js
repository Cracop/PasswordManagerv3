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
        registrando: false
        
      }
    },
    mutations: {
      login (state, payload){
          fetch("http://localhost:5000/api/user/"+payload.correo+"/"+payload.password)
          .then(res => res.json())
          .then(data => {
                state.userId = data._id;
                state.usuario = data.usuario;
                state.HashKey = data.passwd;
                state.failedLogin = false
                state.inside = true;
                state.registrando = false
                console.log(data)
          }).catch(err => {
            state.failedLogin = true
            state.inside = false;
            state.registrando = false
            console.log(state.failedLogin)
          });
          
      },

      unLogin(state){
        state.inside = false;
        state.failedLogin = false;
        state.registrando = false

        state.userId = "";
        state.usuario = "";
        state.HashKey = "";



      },
      ShowRegisterMenu(state){
        state.inside = false;
        state.failedLogin = false;
        state.registrando = true;
      },

    //   {
    //     "usuario": "Fernanda",
    //     "correo": "correo3@gmail.com",
    //     "passwd": "contra3"
    // }

    //https://developer.mozilla.org/en-US/docs/Web/API/fetch
      register(state, payload){
       let newUser = {
              "usuario": payload.usuario,
              "correo": payload.correo,
              "passwd": payload.password
        }
      console.log(JSON.stringify(newUser));
      fetch("http://localhost:5000/api/users/"+newUser.correo, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(newUser), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log('Success:', response.status)
        if (response.status === 400) throw ("Hello")
      })
      .catch(error => console.log('Error:', error));
      }
    }
  })