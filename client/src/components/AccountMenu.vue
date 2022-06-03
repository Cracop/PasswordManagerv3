<script setup>
import IndividualAccount from "./IndividualAccount.vue"
</script>
<template>
<a v-if="!this.$store.state.cuentaSelected" class="btn-floating btn-large waves-effect waves-light" id="btnAgregar" @click="agregar()"><i >+</i></a>
<div class="container" >
    <ul class="collection scrollable" style="margin-top:3rem">
    <div class= "" v-for="cuenta in this.listCuentas" :key="cuenta.id">
            <div class="row">
                <IndividualAccount :cuenta="cuenta"/>    
            </div>       
    </div>
  </ul>
</div> 
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            isHovering: false,
            listCuentas:[]
        }
    },
    computed: mapState(['currCuenta', 'cuentas','creating']),
    components: {
        IndividualAccount
    }, 
    methods: {
        agregar(){
            if (!this.$store.state.creating){
                this.$store.dispatch("agregarCuenta");
                console.log("debería ponerse en verdadero", this.$store.state.creating)
            }else{
                this.$store.commit("unSelectAccount");
                console.log("debería ponerse en falso", this.$store.state.creating)
            } 
            
            // console.log("creating", this.$store.state.creating)
        }
    },
    created() {
    this.$watch('cuentas', (newCurrCuenta) => {
      // console.log(JSON.parse(JSON.stringify(this.currCuenta)))
      this.listCuentas = this.$store.state.cuentas
    })
  },
}
</script>

<style>

.collection{
    border-bottom: 0px solid red;
}

.scrollable{
    height:100%;
    overflow-y: auto !important;    /* Trigger vertical scroll    */
    overflow-x: hidden !important;  /* Hide the horizontal scroll */
}

#btnAgregar {
    position: fixed;
    bottom: 10vh;
    right: 68.6vw;
}

</style>