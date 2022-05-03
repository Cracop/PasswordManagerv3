<template>
      <div class="card-panel z-depth-1" :class="{'teal lighten-2': isClicked && cuenta._id===this.$store.state.currCuenta._id, hover: isHovering}"
        @click="selectOrUnSelect(cuenta)"  @mouseover="isHovering = true;" 
        @mouseout="isHovering = false;" >
            <h5 :class="{'white-text': isHovering || isClicked}"> 
              {{cuenta.alias}}
            </h5>
            <p :class="{'white-text': isHovering || isClicked}" > 
              {{cuenta.username }}
            </p>
        </div>
</template>       

<script>
import { mapState } from 'vuex';

export default {
  name: 'IndividualAccount',
  data(){
        return {
            isHovering: false,
            isClicked: false,
        }
    },
  props: {
    cuenta: Object,
  },
  computed: mapState(['currCuenta']),
  methods: {

    selectOrUnSelect(cuenta){
      if(!this.isClicked){
        this.$store.commit("selectAccount",cuenta)
      }else{
        this.$store.commit("unSelectAccount")
      }
    },

    log(data){
      console.log(data)
    }
  },
  created() {
    this.$watch('currCuenta', (newCurrCuenta) => {
      this.isClicked = this.currCuenta._id===this.cuenta._id
      // console.log(this.currCuenta)
    })
  },
  beforeDestroy() {
    this.unwatch();
  },
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