<script setup>
import ActionMenu from './components/ActionMenu.vue'
import Info from './components/Info.vue'
import introMenu from './components/IntroMenu.vue'
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
            <introMenu />
        </div>
        <div class="col m4">
            <introMenu />
        </div>
        <div class="col m4">
            <introMenu />
        </div>
    </div>

</template>

<script>

export default {
  components: {
    introMenu
  }
}
</script>

<style>
    *{
        border-left: 2px solid red
    }
</style>