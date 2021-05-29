// noinspection JSUnusedGlobalSymbols

import Vue from 'vue'
import Vuex from 'vuex'
import {
  useAccessor,
  getterTree,
  mutationTree
} from 'typed-vuex'
import VuexPersistence from 'vuex-persist'

import {
  getDefaultBackground,
  getDefaultForeground
} from './libs/images'

declare module 'vue/types/vue' {
  // eslint-disable-next-line no-unused-vars
  interface Vue {
    $accessor: typeof accessor
  }
}

Vue.use(Vuex)

const state = () => ({
  background: getDefaultBackground() + '?x-oss-process=style/zoom',
  foregroundInfo: getDefaultForeground(),
  foregroundSize: 70,
  foregroundColor: 'white'
})

const getters = getterTree(state, {
  foreground: (state): string => state.foregroundInfo[0] + '?x-oss-process=style/zoom_png',
  foregroundTitle: (state): string => state.foregroundInfo[1]
})

const mutations = mutationTree(state, {
  setBackground (state, image: string) {
    state.background = image
  },
  setForeground (state, imageInfo: [string, string]) {
    state.foregroundInfo = imageInfo
  },
  setForegroundSize (state, size: number) {
    state.foregroundSize = size
  }
  /* setForegroundColor (state, color: string) {
    state.foregroundColor = color
  } */
})

const vuexLocal = new VuexPersistence<ReturnType<typeof state>>({
  storage: window.localStorage,
  reducer: state => ({
    background: state.background,
    foregroundInfo: state.foregroundInfo
  })
})

const storePattern = {
  state,
  getters,
  mutations,
  plugins: [vuexLocal.plugin]
}

const store = new Vuex.Store(storePattern)

export const accessor = useAccessor(store, storePattern)
Vue.prototype.$accessor = accessor

export default store
