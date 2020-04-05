<template>	
	<div class="orders">
		<div class="orders-head orders-block">
			Cart
		</div>
		<div class="orders-body">
			<div class="orders-body__item orders-block" v-for="item in this.getOrderedGoods">
				<div class="cross">
					<div></div>
					<div></div>
				</div>
				<img v-bind:src="item.img">
				<div class="content">
					<div class="title">{{item.title}}<!-- Xiaomi Mi Note 10 --></div>
					<div class="counter">
						<div class="minus">-</div>
						<div class="number">{{item.quantity}}</div>
						<div class="plus">+</div>
					</div>
					<div class="price">{{toPrice(item.cost)}} UAH</div>
				</div>
			</div>

		</div>
		<div class="orders-footer orders-block">
			<div class="orders-footer__checkout">
				<div class="total">Total: {{toPrice(sumTotal())}} UAH</div>
				<div class="home-button">Checkout</div>
			</div>
		</div>	
	</div>

</template>


<script>
	import sendAjax from '../utils/ajax';
	import { mapMutations, mapGetters } from 'vuex';

	export default {
		name: 'orders',
		data () {
			return {
			}
		},
		computed: {
			...mapGetters(['getOrderedGoods'])
		},			
	  	methods: {
	  		...mapMutations(['setOrderedGoods']),

	  		toPrice: function (number) {
	  			return number.toLocaleString()
	  		},
	  		sumTotal: function () {
	  			let sum = 0;
	  			this.getOrderedGoods.forEach(function (value, index) {
	  				sum = sum + value.cost * value.quantity
				});
	  			return sum;
	  		}
		  	// sendUser: function () {
		  	// 	let usernameJson = JSON.stringify(this.user);
		  	// 	sendAjax('http://localhost:3000/usercheckname', 'post', usernameJson)
					// .then((response) => {
					// 	this.$router.push ({path:'/main'})   
				 //    },
				 //    (response) => {
				 //    	alert ('this username is already taken')    
				 //    })
		  	// }
		}  			
	}
</script>

<style scoped>	
	.orders {
		display: flex;
		background-color: white;
		border-radius: 6px;
	}
	.orders-head {
		font-size: 23px;
	}
	.orders-block {
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
	    font-size: 20px;
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