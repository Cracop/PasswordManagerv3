<template>
      <li class="collection-item" :class="{'teal lighten-2': isClicked, hover: isHovering}"
       @click="selectOrUnSelect(cuenta)"  @mouseover="isHovering = true;" 
        @mouseout="isHovering = false;">
      <span class="title" :class="{'white-text': isHovering || isClicked}">{{cuenta.alias}}</span>
      <p :class="{'white-text': isHovering || isClicked}">
        {{cuenta.username }}
      </p>
    </li>
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
      console.log(this.currCuenta.alias)
    },

    log(data){
      console.log(data)
    }
  },
  created() {
    this.$watch('currCuenta', (newCurrCuenta) => {
      this.isClicked = this.currCuenta._id===this.cuenta._id
      // console.log(JSON.parse(JSON.stringify(this.currCuenta)))
      
    })
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

.card-panel {
    height:7rem;
}

.collection-item {
    height:100%;
    border: 0px solid red;
    border-bottom: 0px solid red;
    border-radius: 3px;
}

  .hover:hover{
    background-color: #EE6E73 !important;

  }

  hovering{
    background-color: #EE6E73 !important;
  }
  
</style>