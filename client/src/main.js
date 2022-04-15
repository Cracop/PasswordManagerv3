import { createApp } from 'vue'
import App from './App.vue'
import 'materialize-css/dist/css/materialize.css'
import store from "./store";
import Security from "@/plugins/Security.js";


const app = createApp(App)
//const app = createApp(App).mount('#app')

// Install the store instance as a plugin
app.use(store)
app.use(Security)
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
