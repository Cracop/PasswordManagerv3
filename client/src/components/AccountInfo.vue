<script setup>
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
  <div class="container row" style="margin:5rem;margin-bottom:0rem">
      
      <div class="container col m12 center-align" v-for="[campo, valor] in Object.entries(this.bufferCuenta)" :key="campo">
          <div v-if="visibleInputs.includes(campo) && (this.bufferCuenta[campo]!=='' || this.editing)">
            <h6 class="left-align">{{fancyNames[campo]}}:</h6>
            <div class="input-field col m12">
              <input :id="campo" :type="(campo!=='passwd' || this.visiblePasswd || this.creating) ? 'text' : 'password'" class="validate" :placeholder="valor" v-model="this.bufferCuenta[campo]" :disabled="!this.editing"/>
              <i class="far fa-eye"  style="margin-left: -30px; cursor: pointer;" v-show="campo==='passwd'" @click="toggleVisibiliy()"></i>
            </div>
          </div>
      </div>
      <div class="row" v-show="!this.editing">
        <div class ="col m2 center-align">
        </div>
        <div class ="col m4 center-align">
           <a class="waves-effect waves-light btn center-align" style="width: 100%;" @click="startEdit()">Editar</a>
        </div>
        <div class ="col m4 center-align">
           <a class="waves-effect waves-light btn center-align" style="width: 100%;" @click="eliminar()">Eliminar</a>
        </div>
        <div class ="col m2 center-align">
           
        </div>
      </div>

      <div class="row" v-show="this.editing">
        <div class ="col m2 center-align">
           
        </div>
        <div class ="col m4 center-align">
           <a class="waves-effect waves-light btn center-align" style="width: 100%;" @click="guardar()">Guardar</a>
        </div>
        <div class ="col m4 center-align">
           <a class="waves-effect waves-light btn center-align" style="width: 100%;" @click="cancelar()">Cancelar</a>
        </div>
        <div class ="col m2 center-align">
           
        </div>
      </div>
  </div>
  <div class="row">

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'AccountInfo',
  components:{
  },
  computed: mapState(['currCuenta', 'creating']),
  data(){
      return {
          visiblePasswd: false,
          visibleInputs: ["alias","URL", "username", "correo", "passwd"],
          fancyNames: {
            "alias": "Nombre", "URL": "URL", "username": "Usuario", "correo": "Correo Electrónico", "passwd": "Contraseña"
          },
          bufferCuenta: JSON.parse(JSON.stringify(this.$store.state.currCuenta)),
          editing: false
      }
  },
  created() {
    this.$watch('currCuenta', (newCurrCuenta) => {
      this.bufferCuenta = JSON.parse(JSON.stringify(this.$store.state.currCuenta))
      this.editing = false;
      // console.log(JSON.parse(JSON.stringify(this.currCuenta)))
      
    })
  },
  methods: {
    startEdit(){
      this.editing = true 
    },
    toggleVisibiliy(){
      this.visiblePasswd = !this.visiblePasswd 
    },
    cancelar(){
      this.editing = false
      this.bufferCuenta = JSON.parse(JSON.stringify(this.$store.state.currCuenta))
    },
    guardar(){
      this.$store.commit('modifyAccount', this.bufferCuenta)
      this.editing = false
      this.visiblePasswd = false;
      // console.log(this.$store.state.cuentas)
      // console.log(this.$store.state.currCuenta)
    },
    eliminar(){
      this.editing = false;
      console.log("Toca eliminar: "+this.bufferCuenta)
      console.log(this.bufferCuenta)
    }
  }
}
// https://5balloons.info/dynamic-v-model-name-binding-in-v-for-loop-vuejs/
</script>

<style>



</style>
