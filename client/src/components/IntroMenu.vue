<template>
    <div class="row">
        <div class="col m4">
            El usuario {{this.$store.state.currUser.usuario}} 
        </div>  
        <div class="col m4">
            {{this.$store.state.currUser.HashKey}}
        </div>
        <div class="col m4">
            {{this.$store.state.currUser.id}}
        </div>
      
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>