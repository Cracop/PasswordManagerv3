import { createApp } from 'vue'
import App from './App.vue'
import 'materialize-css/dist/css/materialize.css'

import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({//Para mantener las sesiones
  state () {
    return {
      count: 0,
      inside: false,
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    login (state){
        state.inside = !state.inside;
    },

  }
})

const app = createApp(App)
//const app = createApp(App).mount('#app')

// Install the store instance as a plugin
app.use(store)

app.mount('#app')

/* Now, you can access the state object as store.state, and trigger a state change with the store.commit method:
store.commit('increment')
console.log(store.state.count) // -> 1 
In a Vue component, you can access the store as this.$store. Now we can commit a mutation using a component method:

methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
*/
