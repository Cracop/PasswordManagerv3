<template>
  
  <div class="container">
      Esto se ve cuando selecciono una cuenta
      <div class="row">
        <div class="input-field col s12">
        <input id="password1" v-model="password" type="password" class="validate" placeholder="Password">
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12">
        <input id="password2" v-model="password" type="password" class="validate" placeholder="Password">
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12">
        <input id="password3" v-model="password" type="password" class="validate" placeholder="Password">
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'AccountInfo',
    data(){
        return {
            usuario: "",
            password: "",
            correo: "",
        }
    },
    computed: mapState(['currCuenta']),
}
</script>

<style>

</style>