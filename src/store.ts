// noinspection JSUnusedGlobalSymbols

import Vue from 'vue'
import Vuex from 'vuex'
import {
  useAccessor,
  getterTree,
  mutationTree,
  actionTree
} from 'typed-vuex'

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
  background: getDefaultBackground(),
  backgroundBlur: 0,
  foregroundInfo: getDefaultForeground(),
  foregroundSize: 70
})

const getters = getterTree(state, {
  foreground: (state): string => state.foregroundInfo[0],
  foregroundTitle: (state): string => state.foregroundInfo[1]
})

const mutations = mutationTree(state, {
  setBackground (state, image: string) {
    state.background = image
  },
  setForeground (state, imageInfo: [string, string]) {
    state.foregroundInfo = imageInfo
  }
})

const actions = actionTree({
  state,
  getters,
  mutations
}, {

})

const storePattern = {
  state,
  getters,
  mutations,
  actions
}

const store = new Vuex.Store(storePattern)

export const accessor = useAccessor(store, storePattern)
Vue.prototype.$accessor = accessor

export default store
