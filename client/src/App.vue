<script setup>
import IntroMenu from './components/IntroMenu.vue'
import LoginMenu from './components/LoginMenu.vue'
import RegisterMenu from "./components/RegisterMenu.vue"
</script>

<template>
    <nav>
        <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Password Manager V3</a>

        <ul class="right hide-on-med-and-down" v-show="this.$store.state.inside">
           <li><a>{{this.$store.state.userId}}</a></li>
           <li><a>Cambiar Contraseña Maestra</a></li>
           <li><a @click="unLogin()">Salir</a></li>
        </ul>
            
        </div>
    </nav>

    <div class="row">
        <div class="col m4">
            <IntroMenu v-show="this.$store.state.inside"/>
        </div>
        <div class="col m4">
            <LoginMenu v-if="!this.$store.state.inside && !this.$store.state.registrando"/>
            <RegisterMenu v-if="!this.$store.state.failedLogin && !this.$store.state.inside && this.$store.state.registrando"/>
        </div>
        <div class="col m4">
        </div>
    </div>

</template>

<script>

export default {
  components: {
    LoginMenu, 
    RegisterMenu
  }, 
  methods:{
      unLogin() {
            this.$store.commit('unLogin')
        }
  }
}
</script>

<style>
    *{
        border-left: 0px solid red
    }
</style>