import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    	users: [
    		{  		
    			login: 'vano',
  				pass: 'coronovirus',
  				content: 'ohrenet, ono rabotaet'
  			},
  			{
  				login: 'admin',
  				pass: 'admin',
  				content: 'admin entered'
  			}
    	]
    },
  	getters: {
  		getLogin(state) {
    		return state.login
   		},
    	getPass(state) {
    		return state.users		
    	}, 
    	getContent(state) {
    		return (state.content + "!")	
    	}
  	},
    mutations: {
  	    setName(state, value) {
    		state.content = value
    	}
    },
    actions: {
    },
    modules: {
    }
})
