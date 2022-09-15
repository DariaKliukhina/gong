import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App'
import '@/assets/styles.scss'

const store = createStore({
  state() {
    return {
      isReady: false,
      isActive: false,
      mediaQuery: {
        value: 'mobile',
        mqKey: 'sm',
        list: [
          {
            key: 'sm',
            value: 'mobile',
            breakpoint: 0,
          },
          {
            key: 'md',
            value: 'tablet',
            breakpoint: 540,
          },
          {
            key: 'lg',
            value: 'desktop',
            breakpoint: 1150,
          },
        ],
      }
    }
  },
  getters: {
    currentMq(state) {
      return state.mediaQuery.value
    },
    isDesktopMq(state) {
      return state.mediaQuery.value === 'desktop'
    },
    isMobileMq(state) {
      return state.mediaQuery.value === 'mobile'
    },
  },
  mutations: {
    activate(state, payload) {
      state.isActive = payload
    },
    prepare(state, payload) {
      state.isReady = payload
    },
    updateMq(state, payload) {
      state.mediaQuery.value = payload.currentMediaValue
      state.mediaQuery.mqKey = payload.currentMediaKey
    },
  },
  actions: {
    update({ commit }, innerWidth) {
      const list = store.state.mediaQuery.list
      let currentMediaValue = list[0].value
      let currentMediaKey = list[0].key
      list.forEach((media) => {
        if (innerWidth > media.breakpoint) {
          currentMediaKey = media.key
          currentMediaValue = media.value
        }
      })

      commit('updateMq', { currentMediaKey, currentMediaValue })
    },
  }
})


const app = createApp(App)
app.use(store)
app.mount('#app')