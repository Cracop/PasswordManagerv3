<script setup>
import IndividualAccount from "./IndividualAccount.vue"
</script>
<template>
<div class="">
    <ul class="collection">
    <div v-for="cuenta in this.$store.state.cuentas" :key="cuenta.id">
            <div class="row">
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
            isHovering: false
        }
    },
    components: {
        IndividualAccount
    }, 
    methods: {

    }
}
</script>

<style>

.collection{
    border-bottom: 3px solid red;
}

</style>