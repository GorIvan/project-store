import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    	user: {},
      goods: [],
      usersGoods:[]
    },
  	getters: {
      getGoods(state) {
        return state.goods
      },
  		getUser(state) {
    		return state.user
   		}
  	},
    mutations: {
  	  setGoods(state, value) {
    		state.goods = value.slice()
    	},
      setUser(state, value) {
        Object.assign(state.user, value);
      }
    },
    actions: {
    },
    modules: {
    }
})
