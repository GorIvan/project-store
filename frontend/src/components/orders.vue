<template>	
	<div class="orders">
		<div class="orders-head orders-block">
			Cart
		</div>
		<div class="orders-body">
			<div class="orders-body__item orders-block">1</div>
			<div class="orders-body__item orders-block">2</div>
			<div class="orders-body__item orders-block">3</div>
		</div>
		<div class="orders-footer orders-block">
			<div class="orders-footer__checkout">
				<div class="total">10000$</div>
				<div class="checkout">Checkout</div>
			</div>
		</div>	
	</div>

</template>


<script>
	import sendAjax from '../utils/ajax';

	export default {
		name: 'orders',
		data () {
			return {
			}
		},			
	  	methods: {
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
	.orders-footer {
		justify-content: flex-end;
	}
	.orders-footer__checkout {
		display: inline-flex;
	}
</style>	