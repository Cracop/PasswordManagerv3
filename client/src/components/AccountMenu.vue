<script setup>
import IndividualAccount from "./IndividualAccount.vue"
</script>
<template>
<div class="container">
    <ul class="collection">
    <div v-for="cuenta in this.$store.state.cuentas" :key="cuenta.id">
            <IndividualAccount :cuenta="cuenta"/>       
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

.card-panel {
    height:7rem;
}
.hover:hover{
  color: red
}

</style>