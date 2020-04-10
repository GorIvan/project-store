<template>	
	<div class="orders">
		<orderdetails />

		<div v-show="this.getOrderVisible">
			<div class="orders-head orders-block">
				Cart
			</div>
			<div class="orders-body">
				<div class="orders-body__item orders-block" v-for="(item, index) in this.getOrderedGoods">
					<div class="cross" v-on:click="setRemoveGoods(index)">
						<div></div>
						<div></div>
					</div>
					<img v-bind:src="item.img">
					<div class="content">
						<div class="title">{{item.title}}</div>
						<div class="counter">
							<div class="minus unselectable" v-on:click="setChangeQuantity({index: index, ChangeQuantity:false})">-</div>
							<div class="number">{{item.quantity}}</div>
							<div class="plus unselectable" v-on:click="setChangeQuantity({index: index, ChangeQuantity:true})">+</div>
						</div>
						<div class="price">{{toPrice(item.cost)}} UAH</div>
					</div>
				</div>

			</div>
			<div class="orders-footer orders-block">
				<div class="orders-footer__checkout">
					<div class="total">Total: {{toPrice(sumTotal())}} UAH</div>
					<div class="home-button" v-on:click="openOrderdetails">Checkout</div>
				</div>
			</div>
		</div>	
	</div>

</template>


<script>
	import orderdetails from './orderdetails';
	import { mapMutations, mapGetters } from 'vuex';

	export default {
		name: 'orders',
		data () {
			return {
			}
		},
		components: {
	      orderdetails: orderdetails
	    },
		computed: {
			...mapGetters(['getOrderedGoods']),
			...mapGetters(['getOrderVisible']),
			...mapGetters(['getOrderDetailsVisible'])
		},			
	  	methods: {
	  		...mapMutations(['setOrderedGoods']),
	  		...mapMutations(['setChangeQuantity']),
	  		...mapMutations(['setRemoveGoods']),
	  		...mapMutations(['setOrderDetailsVisible']),
	  		...mapMutations(['setOrderVisible']),


	  		toPrice: function (number) {
	  			return number.toLocaleString()
	  		},
	  		sumTotal: function () {
	  			let sum = 0;
	  			this.getOrderedGoods.forEach(function (value, index) {
	  				sum = sum + value.cost * value.quantity
				});
	  			return sum;
	  		},

			openOrderdetails: function () {
				if (this.getOrderedGoods.length > 0) {
					this.setOrderDetailsVisible(true);
					this.setOrderVisible(false);
				}		
			}
		}  			
	}
</script>

<style scoped>	
	.orders {
		display: flex;
		background-color: white;
		border-radius: 6px;
	}
	.orders-block {
		font-size: 22px;
		display: flex;
		align-items: center;
		width: 690px;
		height: 70px;
		padding-right: 31px;
		padding-left: 31px;
	}
	.orders-body {
		margin-top: 20px;
		margin-bottom: 20px;
		max-height: 450px;
		overflow: auto;
	}
	.orders-body__item {
		position: relative;
		margin-bottom: 20px;
	}
	.orders-footer {
		justify-content: flex-end;
	}
	.orders-footer__checkout {
		display: inline-flex;
		align-items: center;
	}
	.cross {
	    width: 16px;
	    height: 16px;
	    left: 10px;
	    top: 27px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    cursor: pointer;
	}    
	.cross div {
   		width: 12px;
   		height: 1px;
   		background-color: black;
   		position: absolute;
   	}	
   	.cross	div:first-child {
   		transform: rotate(45deg);
   	}
   	.cross	div:last-child {
   		transform: rotate(-45deg);
   	}
   	.cross:hover div {
   		width: 14px;
   		height: 2px;
   	}
   	.content {
   		display: inline-flex;
   		align-items: center;
   		width: 564px;
   	}
   	.content *{
		display: inline-flex;
	    align-items: center;
	}
   	img {
		width: 70px;
		height: 70px;
		object-fit: cover;
		margin: 0 20px;
	}
	.title {
		width: 250px;
		margin-right: 20px;
	}
	.counter div{
		padding: 5px;
	}
	.minus, .plus {
		cursor: pointer;
	}
	.plus:hover {
		transform: scale(1.2);
	}
	.minus:hover {
		transform: scale(1.2);
	}
	.price {
		color: red;
		margin-left: auto;
	}
</style>	