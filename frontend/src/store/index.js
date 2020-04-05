import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    	user: {},
      goods: [],
      orderedGoods: []
    },
  	getters: {
      getGoods(state) {
        return state.goods
      },
  		getUser(state) {
    		return state.user
   		},
      getOrderedGoods (state) {
        return state.orderedGoods
      }
  	},
    mutations: {
  	  setGoods(state, value) {
    		state.goods = value.slice()
    	},
      setUser(state, value) {
        Object.assign(state.user, value)
      },

      //добавление заказанного товара в корзину
      setOrderedGoods(state, value) {
        let goods = value;
        let goodsOrderedIndex = state.orderedGoods.indexOf(goods);
        if (goodsOrderedIndex == -1) {
          goods.quantity = 1;
          state.orderedGoods.push(goods);
        } else {
          goods.quantity = ++state.orderedGoods[goodsOrderedIndex].quantity;
          state.orderedGoods.splice(goodsOrderedIndex, 1, goods);
        }
      },
      //управление кол-вом в корзине
      setChangeQuantity (state, obj) {
        let goods = state.orderedGoods[obj.index];
        if (obj.ChangeQuantity == false && goods.quantity > 1) {
          --goods.quantity;
          state.orderedGoods.splice(obj.index, 1, goods);
        } else if (obj.ChangeQuantity == true) {
          ++goods.quantity;
          state.orderedGoods.splice(obj.index, 1, goods);
        }
      },
      setRemoveGoods (state, index) {
        state.orderedGoods.splice(index, 1)
      }



    },
    actions: {
    },
    modules: {
    }
})
