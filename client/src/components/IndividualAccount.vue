<template>
      <div class="card-panel z-depth-1" :class="{'teal lighten-2': isClicked && cuenta._id===this.$store.state.currCuenta._id, hover: isHovering}"
        @click="selectOrUnSelect(cuenta)"  @mouseover="isHovering = true;" 
        @mouseout="isHovering = false;" >
            <h5 :class="{'white-text': isHovering}"> {{cuenta.alias}}</h5>
            <p :class="{'white-text': isHovering}" > {{cuenta.username }}</p>
        </div>
</template>       

<script>
export default {

  data(){
        return {
            isHovering: false,
            isClicked: this.$store.state.currCuenta!==this.cuenta,
        }
    },
  name: 'IndividualAccount',
  props: {
    cuenta: Object,
  },
  methods: {

    selectOrUnSelect(cuenta){
      if(this.$store.state.currCuenta._id!==cuenta._id){
        this.$store.commit("selectAccount",cuenta)
        console.log(this.$store.state.currCuenta)
        this.isClicked = true;
        console.log(this.$store.state.currCuenta===cuenta)
        console.log("this.isClicked "+this.isClicked)
      }else{
        this.isClicked = false;
        this.$store.commit("unSelectAccount")
        console.log("this.isClicked "+this.isClicked)
        console.log(this.$store.state.currCuenta)
        console.log("Lo deselecciono")
      }
    },

    log(data){
      console.log(data)
    }
  },
  // mounted() {
  //   this.isClicked = this.$store.state.currCuenta!==this.cuenta
  // }
}
</script>
<style>

  h5 {
    margin-top: 2px;
    color: #424242 
  }

  p {
    color: #424242  
  }



  .hover:hover{
    background-color: #EE6E73;
    color: white !important
  }

  hovering{
    background-color: #EE6E73;
    color: white !important
  }
  
</style>