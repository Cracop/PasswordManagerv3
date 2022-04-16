<template>
    <div id="menu" class="container">
        <div class="center-align">
                <img alt="Vue logo" class="logo" src="../assets/secuLogo.svg" width="125" height="125" />
        </div>
        <div class="row ">
            <div class="input-field col s12">
            <input id="email" v-model="correo" type="email" class="validate" placeholder="Email">

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
                    <p class="waves-effect waves-light" v-show="this.$store.state.errorMessage">{{this.$store.state.errorMessage}}</p>
                </div>
                <a class="waves-effect waves-light btn-large center-align" @click="login()">Ingresar</a>
                <div class="row">
                    <br>
                    <a class="grey-text white btn-flat center-align" @click="ShowRegisterMenu()">¿No tienes cuenta? Regístrate</a>
                </div>
            </div>
            <div class="col m4 center-align">
                
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'LoginMenu',
    data(){
        return {
            usuario: "",
            password: "",
            correo: "",
        }
    },
    methods: {
        login() {
            let payload = {"correo": this.correo, "password": this.password}
            // console.log(payload)
            this.$store.dispatch('login',payload)
        },
        ShowRegisterMenu() {
            this.$store.commit('ShowRegisterMenu')
        },

  },
}
</script>

<style>
    #menu {
        margin-top: 5rem;
    }
</style>