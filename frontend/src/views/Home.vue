<template>
  	<div class="main_window">
		<modal :visible="this.modalVisible" @close='closeModal'>
		  	<template v-slot:modal-content>
		  		<orders />
		  	</template>
		</modal>		

	    <div class="header">
	    	<div class="logo">Logo</div>
	    	<div class="filters">
	    		<div class="header_search_block unselectable">
					<input type="text" maxlength="20" placeholder="Product" v-on:keyup="inputsFilter" v-model="inputProduct">
					<div class="search-icon"></div>
				</div>
				<div class="header_search_block unselectable">	
					<input type="text" maxlength="5" placeholder="Price" v-on:keyup="inputsFilter" v-model="inputPrice">
					<div class="search-icon"></div>
				</div>	
				<div  v-on:click="cleanInputs" class="home-button">Clean</div>
			</div>
			<div class="cart mdi mdi-cart-arrow-down" v-on:click="openOrders()"> 
				<div v-show="this.cartCounterVisible" class="cart_counter unselectable">{{checkCartCounter()}}</div>
			</div>
		</div>
		<div class="goods">
			<div v-on:click="SortText" class="home-button SortText">{{buttonSortText}}</div>
			<div v-on:click="triangleLeft" class="triangle triangle-left"></div>
			<div v-on:click="triangleRight" class="triangle triangle-right"></div>	
			<div class="gallery">
				<div class="gallery-hidden" v-bind:style="{transform: translate}"> 
					<div class="block" v-for="(item, index) in renderingGoods">
				 		<img v-bind:src="item.img">
				 		<div>
				 			<span>model: {{item.title}}</span>
				 			<span>cost: {{item.cost}}</span>
				 		</div>
				 		<div class="check-icon mdi mdi-check-bold"></div>
						<div class="plus unselectable" v-on:click="setOrderedGoods(item)">+</div>	
				 	</div>
			 	</div>
			</div>
		</div>

		<info />	
 	</div>
</template>


<script>
	import orders from '../components/orders';
	import orderdetails from '../components/orderdetails';
	import modal from '../components/modal';
	import info from '../components/info';
	import sendAjax from '../utils/ajax';
	import { mapMutations, mapGetters } from 'vuex';

	export default {
	    name: 'home',
	    data () {
			return {
				renderingGoods: [],  
				inputPrice: '',      
				inputProduct: '',
				buttonSortText: 'Sort ascending',
				translate: 'translateX(0)',
				px: 0,
				modalVisible: false, 
				cartCounterVisible: false
			}
		},
		components: {
	      modal: modal,
	      orders: orders,
	      orderdetails: orderdetails,
	      info: info
	    },
		//после создания этого компонента 
		//проверяем залогинился ли пользователь - если нет то возвращаемся на страницу авторизации
		//запрашиваем на сервере товары сохраняем их в store через мутацию и в массив renderingGoods для отображения
		created: function () {
			if (!this.getUser.username) {
				this.$router.push ({path:'/'}) 
			}
			sendAjax('http://localhost:3000/products', 'post')
				.then((response) => {
					this.setGoods(JSON.parse(response));
					this.renderingGoods = this.getGoods.slice();
				},
				(response) => {
					console.log('No goods')
				})
		},
		computed: {
			...mapGetters(['getUser']),
			...mapGetters(['getGoods']),
			...mapGetters(['getOrderedGoods'])
		},	
		methods: {
			...mapMutations(['setGoods']),
			...mapMutations(['setOrderedGoods']),
	  		...mapMutations(['setOrderDetailsVisible']),
	  		...mapMutations(['setOrderVisible']),

			//посимвольный фильтр поиска товара
			inputsFilter: function() {
				let inputProduct = this.inputProduct;
				let inputPrice = this.inputPrice;
				this.translate = 'translateX(0)';
				this.px = 0;	
				//goodsFiltered - получаем массив товаров, символы имени и цена которых совпадает с введеными пользователем
				let goodsFiltered = this.getGoods.filter(function(item, i, arr) {
					let checkInputPrice = inputPrice >= item.cost || inputPrice === '';
					let checkInputProduct = item.title.toUpperCase().indexOf(inputProduct.toUpperCase()) != -1 || inputProduct === '';
					return checkInputPrice && checkInputProduct;
				});
				//обновляем массив для вывода согласно фильтру
				this.renderingGoods = goodsFiltered;
			},

			//очистка инпутов и обновление товаров
			cleanInputs: function () {
				this.inputPrice = '';
				this.inputProduct = '';
				this.renderingGoods = this.getGoods.slice();
				this.translate = 'translateX(0)';
				this.px = 0;
			},

			//сортировка по возрастанию/убыванию цены
			SortText: function () {
				if (this.buttonSortText == 'Sort ascending') {
					this.renderingGoods.sort(function(a, b){return a.cost - b.cost});
					this.buttonSortText = 'Sort descending'
				} else {
					this.renderingGoods.sort(function(a, b){return b.cost - a.cost});
					this.buttonSortText = 'Sort ascending'
				}
			}, 

			//двигаем нашу галерею вправо/влево
			triangleRight: function () {
				let rightBlockPosition = this.px / 286 + 4;
				if (this.renderingGoods.length > 5 && rightBlockPosition < this.renderingGoods.length - 1) {
					this.px += 286;
					this.translate = 'translateX(-' + this.px + 'px)';
				}	
			},
			triangleLeft: function () {
				if (this.px > 0) {
					this.px -= 286;
					this.translate = 'translateX(-' + this.px + 'px)';
				}
			},

			checkCartCounter:function () {
				if (this.getOrderedGoods.length > 0) {
					let cartCounter = 0;
					this.cartCounterVisible = true;
					this.getOrderedGoods.forEach(function (value, index) {
		  				cartCounter = cartCounter + value.quantity
					});
					return cartCounter;
				} else {
					this.cartCounterVisible = false
				}
			},
			openOrders: function () {
				if (this.getOrderedGoods.length > 0) {
					this.modalVisible = true;
					this.setOrderVisible(true);
					this.setOrderDetailsVisible(false);
				}
			},
			closeModal: function () {
		  		this.modalVisible = false;	  		
		  	}
		}
	}				
</script>


<style scoped>
	.main_window {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	input {
		width: 180px;
		height: 30px;
		margin: 10px;
		color: #fff;
		font-size: 15px;
		padding-left: 20px;
		border-radius: 50px;
		background: #778899;
		border: 1px solid white;
	}
	input::placeholder {
		color: #A9A9A9;
	}
	input:focus::placeholder {
		text-indent: 500px;
		transition: text-indent 1s ease;
		z-index: 0;
	}
	input:hover {
	    background: #708090;
	}
	.header_search_block {
		position: relative;
	}
	.search-icon {
		position: absolute;
	    top: 15px;
	    right: 15px;
	    width: 24px;
	    height: 24px;
	    background: url(../../public/img/ic_search_white.svg) no-repeat;
	}
	.SortText {
		position: absolute;
		top: -50px;
	}
	.plus {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 10px;
		right: 10px;
		width: 5px;
		height: 5px;
		color: #2F4F4F;
		font-size: 30px !important; 
		border-radius: 50%;
		border: 2px solid #2F4F4F;
		cursor: pointer;	
	}
	.plus:active {
		transform: scale(.9);
	}
	.check-icon {
		position: absolute;
		color: #2F4F4F;
		font-size: 30px;
		bottom: -5px;
		left: 5px;
		padding: 0;
		margin: 0; 	
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		margin-bottom: 50px;
		width: 100vw;
		background-color: #778899;
	}
	.logo {
		margin-left: 50px;
	}
	.filters {
		display: inline-flex;
		align-items: center;
	}
	.cart {
		position: relative;
		margin-right: 50px;
		cursor: pointer;
		font-size: 30px;
		color: white;
		transition: all .3s ease-in-out;
	}
	.cart_counter {
		position: absolute;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		bottom: -3px;
		right: -12px;	
		background-color: red;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.cart:hover {
		transform: scale(1.2);
	}
	.goods {
		position: relative;
		max-width: 1430px;
	}
	.gallery-hidden {
		display: inline-flex;
		width: 100%;
		transition: 1s;
	}
	.gallery {
		overflow: hidden;
	}
	.triangle-left {
		left: -35px;
	}
	.triangle-right {
		right: -35px;
	}
	.block {
		display: inline-flex;
		flex-direction: column;
		height: 400px;
		padding: 5px;
		margin: 10px;
		border: 3px solid #2F4F4F;
		border-radius: 3%;
		color: #2F4F4F;
		position: relative;
	}
	.block img {
		width: 250px;
		height: 300px;
		object-fit: cover;
	}
	.block div {
		display: inline-flex;
		flex-direction: column;
		margin-top: 20px;
		padding: 10px;
		font-size: 20px;
	}	
</style>