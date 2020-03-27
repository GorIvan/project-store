<template>
  <div class="main_window">
    <div class="header">
    	<div class="logo">Logo</div>
    	<div class="filters">
			<input type="text" maxlength="20" placeholder="Product" v-on:keyup="inputsFilter" v-model="inputProduct">
			<input type="text" maxlength="5" placeholder="Price" v-on:keyup="inputsFilter" v-model="inputPrice">
			<div  v-on:click="cleanInputs" class="button_home">Clean</div>
			<div class="partition"></div>
			<div  v-on:click="SortText" class="button_home">{{buttonSortText}}</div>
		</div>
		<div class="cart">
			<div class="cart_counter">2</div>
		</div>
	</div>	
	<div class="goods_gallery">
		<div class="block" v-for="item in renderingGoods">
	 		<img v-bind:src="item.img">
	 		<div>
	 			<span>model: {{item.title}}</span>
	 			<span>cost: {{item.cost}}</span>
	 		</div>
	 		<div class="plus">+</div>
	 	</div>
	</div>
  </div>
</template>


<script>
	import sendAjax from '../utils/ajax';
	import { mapMutations, mapGetters } from 'vuex';

	export default {
	    name: 'home',
	    data () {
			return {
				renderingGoods: [],  //в этом массиве храняться отображаемые товары 
				inputPrice: '',      
				inputProduct: '',
				buttonSortText: 'Sort ascending'
			}
		},
		//после создания этого компонента 
		//проверяем залогинился ли пользователь - если нет то возвращаемся на страницу авторизации
		//запрашиваем на сервере товары сохраняем их в store через мутацию и в массив renderingGoods для отображения
		created: function () {
			if (!this.getUser.username) {
				alert('ahtung');
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
			...mapGetters(['getGoods'])
		},	
		methods: {
			...mapMutations(['setGoods']),

			//посимвольный фильтр поиска товара
			inputsFilter: function() {
				let inputProduct = this.inputProduct;
				let inputPrice = this.inputPrice;	
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
			},

			//сортировка по возрастанию/убыванию цена
			SortText: function () {
				if (this.buttonSortText == 'Sort ascending') {
					this.renderingGoods.sort(function(a, b){return a.cost - b.cost});
					this.buttonSortText = 'Sort descending'
				} else {
					this.renderingGoods.sort(function(a, b){return b.cost - a.cost});
					this.buttonSortText = 'Sort ascending'
				}
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
		transition: text-indent 0.5s ease;
	}
	input:hover{
	    background: #708090;
	}
	.button_home {
		width: 150px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px;
		border-radius: 5px;
		border: 1px solid white;
		cursor: pointer;
		transition: all .2s ease-in-out;
		color: white;
	}
	.button_home:hover {
		background-color: #708090;

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
	.cart_counter {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		bottom: -5px;
		right: -15px;	
		background-color: red;
		font-size: 17px;
		display: flex;
		justify-content: center;
		align-items: center;
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
		width: 50px;
		height: 50px;
		background-image: url(cart.png); 
		background-size: cover;
	}
	.goods_gallery {
		display: inline-flex;
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
	.partition {
		width: 2px;
		height: 50px;
		background-color: white;
		margin-left: 30px;
		margin-right: 30px; 
	}	
</style>