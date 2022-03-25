<template>
    <div id="menu" class="container">
        <div class="center-align">
                <img alt="Vue logo" class="logo" src="../assets/secuLogo.svg" width="125" height="125" />
        </div>
        <div class="row ">
            <div class="input-field col s12">
            <input id="email" v-model="usuario" type="email" class="validate" placeholder="Email">

            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input id="password" v-model="password" type="password" class="validate" placeholder="Password">
            </div>
        </div>
        <div class="row">
            <div class="col m4 center-align">
                
            </div>
            <div class="col m4 center-align">
                <div class="row">
                    <p class="waves-effect waves-light" v-show="this.$store.state.failedLogin">Failed Login</p>
                </div>
                <a class="waves-effect waves-light btn-large center-align" @click="login()">Ingresar</a>
                <div class="row">
                    <br>
                    <a class="grey-text white btn-flat center-align" @click="register()">¿No tienes cuenta? Regístrate</a>
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
            password: "",
        }
    },
    methods: {
        login() {
            let payload = {"usuario": this.usuario, "password": this.password}
            this.$store.commit('login',payload)
        },
        register() {
            let payload = {"usuario": "this.usuario", "password": "this.password", "correo": "this.correo"}
            this.$store.commit('register',payload)
        }
  },
}
</script>

<style>
    #menu {
        margin-top: 5rem;
    }
</style>