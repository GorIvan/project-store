<template>
  <div class="main_window">
    <div class="main_filters">
		<input type="text" maxlength="20" placeholder="Product" v-on:keyup="inputsFilter" v-model="inputProduct">
		<input type="text" maxlength="5" placeholder="Price" v-on:keyup="inputsFilter" v-model="inputPrice">
		<button  v-on:click="cleanInputs">Clean</button>
		<div class="partition"></div>
		<button  v-on:click="SortText">{{buttonSortText}}</button>
	</div>	
	<div class="goods_gallery">
		<div class="block" v-for="item in renderingGoods">
	 		<img v-bind:src="item.img">
	 		<div>
	 			<span>model: {{item.title}}</span>
	 			<span>cost: {{item.cost}}</span>
	 		</div>
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
		//в начале жизненного цикла этого компонента запрашиваем на сервере товары
		//сохраняем их в store через мутацию и в массив renderingGoods для отображения
		created: function () {
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
			...mapGetters(['getUsername']),
			...mapGetters(['getGoods'])
		},	
		methods: {
			...mapMutations(['setGoods']),

			//посимвольный фильтр поиска товара
			inputsFilter: function() {
				//обьявляем дополнительные переменные т.к. метод .filter используемый ниже не имеет собственного this и вызывает ошибку
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
			SortText: function () {
				
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
		padding: 20px;
	}
	input {
		width: 200px;
		height: 30px;
		margin: 10px;
	}
	button {
		width: 150px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		margin: 10px;
		background-color: #C0C0C0;
		border-radius: 5px;
	}
	.main_filters {
		display: inline-flex;
		justify-content: space-around;
		margin: 20px;
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
		border: 3px solid #696969;
		border-radius: 3%;
		background: rgba(3,3,3,0.25);
		box-shadow: 1px 1px 50px #000;
		color: #D3D3D3;
		cursor: pointer;
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
		width: 3px;
		height: 66px;
		background-color: #696969;
		margin-left: 30px;
		margin-right: 30px; 
	}	
</style>