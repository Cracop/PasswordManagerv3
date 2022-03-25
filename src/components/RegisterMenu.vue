<template>
    <div id="menu" class="container">
        <div class="center-align">
                <img alt="Vue logo" class="logo" src="../assets/secuLogo.svg" width="125" height="125" />
        </div>
        <div class="row ">
            <div class="input-field col s12">
            <input id="emailInput" v-model="correo" type="email" class="validate" placeholder="Correo">

            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input id="usuarioInput" v-model="usuario" class="validate" placeholder="Usuario">
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input id="passwordInput" v-model="password" type="password" class="validate" placeholder="Password">
            </div>
        </div>
        <div class="row">
            <div class="col m4 center-align">
                
            </div>
            <div class="col m4 center-align">
                <div class="row">
                    <p class="waves-effect waves-light" v-show="this.$store.state.failedLogin">Failed Login</p>
                </div>
                <a class="waves-effect waves-light btn-large center-align" @click="register()">Registrar</a>
                <div class="row">
                    <br>
                    <a class="grey-text white btn-flat center-align" @click="unLogin()">¿Ya tienes cuenta? Entra</a>
                </div>
            </div>
            <div class="col m4 center-align">
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            usuario: "",
            correo: "",
            password: "",
        }
    },
    methods: {
        login() {
            let payload = {"usuario": this.usuario, "password": this.password}
            this.$store.commit('login',payload)
        },
        register() {
            try {
                let payload = {"usuario": this.usuario, "password": this.password, "correo": this.correo}
                this.$store.commit('register',payload)
                this.$store.commit('login',payload)
                // this.unLogin()
            }catch(err){
                console.log(err)
            }
        },
        unLogin() {
            this.$store.commit('unLogin')
        }
  },
}
</script>

<style>
    #menu {
        margin-top: 5rem;
    }
</style>