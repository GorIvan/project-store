<template>	
	<div class="orderdetails" v-show="this.getOrderDetailsVisible">	
		<div class="header">
			<div class="heading">Checkout</div>
			<div class="home-button" v-on:click="returnToCart">Return to the cart</div>
		</div>
		<div class="information">
			<div class="information-block">
				<div class="input-name">Enter your name</div>
				<input type="text" placeholder="Name" :value="this.getUser.username">
			</div>
			<div class="information-block">
				<div class="input-name">Enter your phone</div>
				<input type="tel" placeholder="Phone">
			</div>
			<div class="information-block">
				<div class="input-name">Enter your emeil</div>
				<input type="email" placeholder="email">
			</div>
			<div class="information-block">
				<div class="input-name">Enter your address</div>
				<input type="text" placeholder="Address">
			</div>
		</div>
		<div class="footer">
			<div class="home-button" v-on:click="order">Order goods</div>
		</div>
	</div>

</template>


<script>
	import sendAjax from '../utils/ajax';
	import { mapMutations, mapGetters } from 'vuex';

	export default {
		name: 'orderdetails',
		data () {
			return {
			}
		},
		computed: {
			...mapGetters(['getOrderedGoods']),
			...mapGetters(['getOrderDetailsVisible']),
			...mapGetters(['getUser'])
		},			
	  	methods: {
	  		...mapMutations(['setRemoveGoods']),
	  		...mapMutations(['setOrderDetailsVisible']),
	  		...mapMutations(['setOrderVisible']),

			returnToCart () {
			    this.setOrderDetailsVisible(false);
			    this.setOrderVisible(true); 
			},
			order () {
				alert('ahtung')
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
	* {
		display: flex;
	}
	.orderdetails {
		margin: 10px;
		width: 500px;
		flex-direction: column;
	}
	.header {
		margin-top: 10px;
		justify-content: space-between;
		align-items: center;
		height: 70px;
	}
	.heading {
		margin-left: 10px;
		font-size: 22px;
	}
	.information {
		margin: 40px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.information-block {
		height: 70px;
		justify-content: center;
		align-items: center;
	}
	.input-name {
		margin-right: 50px;
		width: 140px;
	}
	input {
		width: 200px;
		margin: 10px;
		font-size: 15px;
		padding-bottom: 5px;
		padding-left: 5px;
		border: 2px solid white;
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
	   border-bottom: 2px solid #708090;
	}
</style>		