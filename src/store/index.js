import { createStore } from 'vuex'
// Create a new store instance.
export default createStore({//Para mantener las sesiones
    state () {
      return {
        count: 0,
        inside: false,
        usuario: "",
        HashKey: "",
        UserId: "",
        failedLogin: false,
        registrando: false

      }
    },
    mutations: {
      login (state, payload){
          fetch("http://localhost:5000/api/user/"+payload.usuario+"/"+payload.password)
          .then(res => res.json())
          .then(data => {
                state.inside = true;
                state.userId = data._id;
                state.usuario = data.usuario;
                state.HashKey = data.passwd;
                state.failedLogin = false
                console.log(data)
          }).catch(err => {
            state.failedLogin = true
            console.log(state.failedLogin)
          });
          
      },

      unLogin(state, payload){
        state.inside = false;
        state.userId = "";
        state.usuario = "";
        state.HashKey = "";



      },

    //   {
    //     "usuario": "Fernanda",
    //     "correo": "correo3@gmail.com",
    //     "passwd": "contra3"
    // }

    //https://developer.mozilla.org/en-US/docs/Web/API/fetch
      register(state, payload){
       let newUser = {
              "usuario": "Fernanda",
              "correo": "correo3@gmail.com",
              "passwd": "contra3"
        }
      console.log(JSON.stringify(newUser));
      fetch("http://localhost:5000/api/users", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(newUser), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
      }
    }
  })