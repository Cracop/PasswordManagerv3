<template>
      <div class="container">
        <h5>{{cuenta.alias}}</h5>
        <p>{{cuenta.username }}</p>
      </div>
</template>

<script>
export default {
  name: 'IndividualAccount',
  props: {
    cuenta: Object,
  },
}
</script>
<style>
  li {
    border: 0px solid red;
  }
  h5 {
    margin-top: 2px;
  }
</style>