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
  		getUsername(state) {
    		return state.user.username
   		}
  	},
    mutations: {
  	    setGoods(state, value) {
    		  state.goods = value.slice()
    	}
    },
    actions: {
    },
    modules: {
    }
})
