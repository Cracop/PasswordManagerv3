<script setup>
import ActionMenu from './components/ActionMenu.vue'
import Info from './components/Info.vue'
import IntroMenu from './components/IntroMenu.vue'
import Login from './components/Login.vue'
</script>
<template>
    <nav>
        <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Password Manager V3</a>
        </div>
    </nav>

    <div class="row">
        <div class="col m4">
            <IntroMenu v-show="this.$store.state.inside"/>
        </div>
        <div class="col m4">
            <Login/>
        </div>
        <div class="col m4">
        </div>
    </div>

</template>

<script>

export default {
  components: {
    Login,
  }
}
</script>

<style>
    *{
        border-left: 0px solid red
    }
</style>