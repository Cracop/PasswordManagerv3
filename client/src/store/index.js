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
      inside: false,
      currUser: {_id: "", usuario: "", hashKey: "", correo:""},
      failedLogin: false,
      registrando: false,
      creating:false,
      errorMessage: "",
      cuentas: [],
      cuentaSelected: false,
      currCuenta: {
        _id: "", alias: "", idUsuario: "", URL: "", 
        correo: "", passwd: "", username: ""
      },
      
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
      state.creating = false;
      state.currCuenta = payload;
    },
    unSelectAccount(state){
      state.cuentaSelected = false;
      state.creating = false;
      state.currCuenta= {
        _id: "", alias: "", idUsuario: "", sitio: "", 
        correo: "", passwd: "", username: ""
      } 
    },
    modifyAccount(state, payload){
      state.currCuenta = payload;
      // encuentro índice
      const index = state.cuentas.map(cuenta => cuenta._id).indexOf(payload._id);
      // console.log("indice "+index)
      // sobreescribo
      state.cuentas[index] = state.currCuenta
      //Tengo que hacer la parte de mandarlo a través de la API
    },
    creating(state,payload){
      state.creating = payload;
    },
    getCuentas(state, payload){
      // console.log(payload)
      state.cuentas=payload;
      console.log(state.cuentas)
    }
  },


  actions:{

    async register({commit},payload){
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
        commit("unLogin")
      }catch{
        commit("setErrorMessage","Ya existe una cuenta con el correo asociado");
      } 
    },

    async login({commit,dispatch}, payload){
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
        commit("unSelectAccount")
        await dispatch("getCuentas",user._id)

      }catch(error){
        console.log(error)
        commit("setErrorMessage","Credenciales Incorrectas");
        commit("failedLogin")
      }
    },
    async agregarCuenta(state, payload){//Esto deja todo listo para empezar a modificar la nueva cuenta
            const emptyCuenta= {
                _id: "", alias: "", idUsuario: "", URL: "", 
                correo: "", passwd: "", username: ""
                }
      state.commit("unSelectAccount")
      state.commit("selectAccount",emptyCuenta)
      state.commit("creating",true)
      // console.log("creating", state.creating)
    },
    async modifyAccount(state, payload){//Modifico una cuenta existente
      //Llamo a la API para modificar la cuenta
      console.log("CuentaNueva")
      // console.log(payload)
      try{
        const newCuenta =  {
          "_id": payload._id,
          "alias": Sec.cifrar(payload.alias, this.state.currUser.hashKey.slice(0,32)),
          "idUsuario": Sec.hashear(this.state.currUser._id),
          "URL": Sec.cifrar(payload.URL, this.state.currUser.hashKey.slice(0,32)),
          "correo": Sec.cifrar(payload.correo, this.state.currUser.hashKey.slice(0,32)),
          "passwd": Sec.cifrar(payload.passwd, this.state.currUser.hashKey.slice(0,32)),
          "username": Sec.cifrar(payload.username, this.state.currUser.hashKey.slice(0,32)),
        }

        // const newCuenta =  {
        //   "_id": payload._id,
        //   "alias": payload.alias,
        //   "idUsuario": Sec.hashear(this.state.currUser._id),
        //   "URL": payload.URL,
        //   "correo": payload.correo,
        //   "passwd": payload.passwd,
        //   "username": payload.username,
        // }
        // console.log(newCuenta)
        let response = await fetch("http://localhost:5000/api/account/update", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(newCuenta), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json; charset=UTF-8',
          }
        })
      }catch (err){
        console.log(err)
      }

      state.dispatch("getCuentas",this.state.currUser._id)
    },
    async guardarNuevaCuenta(state, payload){//Después de crear la cuenta, guardo en la base de datos
      
      // console.log(this.state.currUser.hashKey)
      try{
        const newCuenta =  {
          "alias": Sec.cifrar(payload.alias, this.state.currUser.hashKey.slice(0,32)),
          "idUsuario": Sec.hashear(this.state.currUser._id),
          "URL": Sec.cifrar(payload.URL, this.state.currUser.hashKey.slice(0,32)),
          "correo": Sec.cifrar(payload.correo, this.state.currUser.hashKey.slice(0,32)),
          "passwd": Sec.cifrar(payload.passwd, this.state.currUser.hashKey.slice(0,32)),
          "username": Sec.cifrar(payload.username, this.state.currUser.hashKey.slice(0,32)),
        }

        // const newCuenta =  {
        //   "alias": payload.alias,
        //   "idUsuario": Sec.hashear(this.state.currUser._id),
        //   "URL": payload.URL,
        //   "correo": payload.correo,
        //   "passwd": payload.passwd,
        //   "username": payload.username,
        // }
        // console.log(newCuenta)
        let response = await fetch("http://localhost:5000/api/account/add", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(newCuenta), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json; charset=UTF-8',
          }
        })
        // let data = await response.json()
        // console.log(data)
  
        state.commit("creating",false)
        state.dispatch("getCuentas",this.state.currUser._id)
      }catch (err){
        console.log(err)
      }
     
    },

    async getCuentas(state,payload){
      // console.log("usuario a buscar", payload)
      payload = Sec.hashear(payload)
      try{
        let response = await fetch("http://localhost:5000/api/accounts/get", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify({"idUsuario":payload}), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json; charset=UTF-8',
          }
        })
        let data = await response.json()
        for(let i=0;i<data.length;i++){ 
          data[i].alias = Sec.descifrar(data[i].alias, this.state.currUser.hashKey.slice(0,32))
          data[i].URL = Sec.descifrar(data[i].URL, this.state.currUser.hashKey.slice(0,32))
          data[i].correo = Sec.descifrar(data[i].correo, this.state.currUser.hashKey.slice(0,32))
          data[i].passwd = Sec.descifrar(data[i].passwd, this.state.currUser.hashKey.slice(0,32))
          data[i].username = Sec.descifrar(data[i].username, this.state.currUser.hashKey.slice(0,32))
          // console.log(data[i])
        }

        // for(let i=0;i<data.length;i++){ 
        //   data[i].alias = data[i].alias
        //   data[i].URL = data[i].URL
        //   data[i].correo = data[i].correo
        //   data[i].passwd = data[i].passwd
        //   data[i].username = data[i].username
        //   // console.log(data[i])
        // }
        // console.log(data)
        state.commit("unSelectAccount")
        state.commit("getCuentas",data)
      }catch (err){
        console.log(err)
      }
    },
    async eliminarCuenta(state,payload){
      try{
        let response = await fetch("http://localhost:5000/api/account/delete", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify({"_id":payload}), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json; charset=UTF-8',
          }
        })
        state.dispatch("getCuentas",this.state.currUser._id)
      }catch(err){
        console.log(err)
      }
    }

  }
})
