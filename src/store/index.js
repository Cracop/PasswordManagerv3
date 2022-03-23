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
        failedLogin: false

      }
    },
    mutations: {
      login (state, payload){
          fetch("http://localhost:5000/api/users/"+payload.usuario+"/"+payload.password)
          .then(res => res.json())
          .then(data => {
              if (data) {
                state.inside = true;
                state.userId = data._id;
                state.usuario = data.usuario;
                state.HashKey = data.passwd;
                state.failedLogin = false
                console.log(data)
              }else{
                state.failedLogin = true
              }
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

        const p = Promise.resolve(13);

        p.then(value => {
          console.log(value); // 👉️ 13

          return value + value;
        }).then(value => {
          console.log(value); // 👉️ 26

          return value + value;
        });

      }
  
    }
  })