<script setup>
import IndividualAccount from "./IndividualAccount.vue"
</script>
<template>
<a class="btn-floating btn-large waves-effect waves-light" id="btnAgregar" @click="agregar()"><i >+</i></a>
<div class="container" >
    <ul class="collection scrollable" style="margin-top:3rem">
    <div class= "" v-for="cuenta in this.$store.state.cuentas" :key="cuenta.id">
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
        }
    },
    computed: mapState(['currCuenta', 'cuentas','creating']),
    components: {
        IndividualAccount
    }, 
    methods: {
        agregar(){
            this.creating = true;
            this.$store.commit("unSelectAccount")
            this.$store.commit("selectAccount",this.currCuenta)
        }
    },
    created() {
    this.$watch('cuentas', (newCurrCuenta) => {
      // console.log(JSON.parse(JSON.stringify(this.currCuenta)))
      listCuentas = this.$store.state.cuentas
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