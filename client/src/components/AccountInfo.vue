<script setup>
import DynamicInput from "./DynamicInput.vue"
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
  <div class="container row" style="margin:5rem;margin-bottom:0rem">
      {{this.activeCuenta}}
      <div class="container col m10 center-align" v-for="[campo, valor] in Object.entries(this.activeCuenta)" :key="campo">
          <div v-if="visibleInputs.includes(campo) && this.activeCuenta[campo]!==''">
            <h6 class="left-align">{{campo}}:</h6>
            <div class="input-field col m12">
              <input :id="campo" type="text" class="validate" :placeholder="valor" v-model="this.activeCuenta[campo]" :disabled="this.disabled"/>
              <i class="far fa-eye" @click="showPassword()" style="margin-left: -30px; cursor: pointer;" v-show="campo==='passwd'"></i>
            </div>
          </div>
      </div>

      <div class="container col m2 center-align">

      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'AccountInfo',
  components:{
    DynamicInput
  },
  computed: mapState(['currCuenta']),
  data(){
      return {
          disabled: true,
          visibleInputs: ["alias","sitio", "username", "correo", "passwd"],
          activeCuenta: JSON.parse(JSON.stringify(this.$store.state.currCuenta))
      }
  },
  created() {
    this.$watch('currCuenta', (newCurrCuenta) => {
      this.activeCuenta = JSON.parse(JSON.stringify(this.$store.state.currCuenta))
      // console.log(JSON.parse(JSON.stringify(this.currCuenta)))
      
    })
  },
  methods: {
    showPassword(){
      this.disabled = !this.disabled
      console.log(this.disabled)
    }
  }
}
// https://5balloons.info/dynamic-v-model-name-binding-in-v-for-loop-vuejs/
</script>

<style>

</style>
