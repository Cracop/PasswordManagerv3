<script setup>
import IndividualAccount from "./IndividualAccount.vue"
</script>
<template>
<div class="container" >
    <ul class="collection scrollable" style="margin-top:3rem">
    <div class= "" v-for="cuenta in this.cuentas" :key="cuenta.id">
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
            isHovering: false
        }
    },
    computed: mapState(['currCuenta', 'cuentas']),
    components: {
        IndividualAccount
    }, 
    methods: {

    }
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

</style>