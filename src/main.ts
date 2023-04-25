import { createApp } from 'vue'
import "./assets/style.css"
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './plugin/firebase.js'
const app = createApp(App)

app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})
app.use(createPinia())
app.use(router)
app.mount('#app')