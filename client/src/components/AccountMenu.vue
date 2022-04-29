<script setup>
import IndividualAccount from "./IndividualAccount.vue"
</script>
<template>
<div class="container">
    <ul class="collection">
    <div v-for="cuenta in this.$store.state.cuentas" :key="cuenta.id">
        <div class="card-panel grey lighten-5 z-depth-1" @click="select(cuenta)">
            <IndividualAccount :cuenta="cuenta"/>
        </div>
    </div>
  </ul>
</div> 
</template>

<script>

export default {
    data(){
        return {
            
        }
    },
    components: {
        IndividualAccount
    }, 
    methods: {
        select(cuenta){
            console.log(cuenta)
            this.$store.state.cuentaSelected =  true
        }
    }
}
</script>

<style>

.card-panel {
    height:7rem;
}

</style>