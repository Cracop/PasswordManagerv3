<script setup>
import IntroMenu from './components/IntroMenu.vue'
import LoginMenu from './components/LoginMenu.vue'
import RegisterMenu from "./components/RegisterMenu.vue"
import AccountMenu from "./components/AccountMenu.vue"
import AccountInfo from "./components/AccountInfo.vue"
import ActionMenu from "./components/ActionMenu.vue"
</script>

<template>
    <nav>
        <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Password Manager V3</a>

        <ul class="right hide-on-med-and-down" v-show="this.$store.state.inside">
           <li><a @click="unLogin()">Salir</a></li>
        </ul>
            
        </div>
    </nav>

    <div class="row " v-if="this.$store.state.inside">
        <div class="col m2 grey lighten-2 full-width" id="ActionMenu">
            <ActionMenu v-if="this.$store.state.inside"/>
        </div>
        <div class="col m4 grey lighten-3 full-width" id="AccountMenu">
            <AccountMenu v-if="this.$store.state.inside"/>
        </div>
        <div class="col m6 grey lighten-4 full-width" id="AccountInfo">
            <AccountInfo v-if="this.$store.state.inside && this.$store.state.cuentaSelected"/>
        </div>
    </div>

    <div class="row" v-if="!this.$store.state.inside">
        <div class="col m4">
        </div>
        <div class="col m4 full-width">
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
    .full-width {
        height: 100%;
        min-height: 1000px !important;
    }
</style>