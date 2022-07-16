import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App'
import '@/assets/styles.scss'

const store = createStore({
  state() {
    return {
      isReady: false,
      isActive: false
    }
  },
  mutations: {
    activate(state, payload) {
      state.isActive = payload
    },
    prepare(state, payload) {
      state.isReady = payload
    }
  }
})


const app = createApp(App)
app.use(store)
app.mount('#app')