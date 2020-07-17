<template>	
		<div class="orderdetails" v-show="OrderDetailsVisible()">
		<div class="header">
			<div class="heading">Checkout</div>
			<div class="home-button" v-on:click="returnToCart">Return to the cart</div>
		</div>
		<div class="information">
			<div class="information-block">
				<div class="input-name">Enter your name</div>
				<input type="text" placeholder="Name" v-model="information.name" v-bind:class="{redline: redLineСlassObject.name}">
			</div>
			<div class="information-block">
				<div class="input-name">Enter your phone</div>
				<input type="tel" placeholder="Phone  +380XXXXXXXXX" maxlength="13" v-model="information.phone" v-bind:class="{redline: redLineСlassObject.phone}">
			</div>
			<div class="information-block">
				<div class="input-name">Enter your email</div>
				<input type="email" placeholder="email" v-model="information.email" v-bind:class="{redline: redLineСlassObject.email}">
			</div>
			<div class="information-block">
				<div class="input-name">Enter your address</div>
				<input type="text" placeholder="Address" v-model="information.address" v-bind:class="{redline: redLineСlassObject.address}">
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
				information: {},
				redLineСlassObject: {
					name: false,
					phone: false,
					email: false,
					address: false
				}
			}
		},
		computed: {
			...mapGetters(['getOrderedGoods']),
			...mapGetters(['getOrderDetailsVisible']),
			...mapGetters(['getUser'])
		},			
	  	methods: {
	  		...mapMutations(['setOrderDetailsVisible']),
	  		...mapMutations(['setOrderVisible']),

			returnToCart () {
			    this.setOrderDetailsVisible(false);
			    this.setOrderVisible(true); 
			},
			OrderDetailsVisible () {
				if (this.getOrderDetailsVisible == false) {
					for (let item in this.redLineСlassObject) {
						this.redLineСlassObject[item] = false
					}
				};
				return this.getOrderDetailsVisible;
			},

			// При активации кнопки заказа поля заполненные неверно выделяем и просим пользователя повторить.
			// Если все ок - действуем согласно требуемой логике (в данном случае высылается на бэк объект с товаром)
			order () {
				this.redLineСlassObject.name = !this.information.name;
				this.redLineСlassObject.phone = !this.isPhoneValid();
				this.redLineСlassObject.email = !this.isEmailValid();
				this.redLineСlassObject.address = !this.information.address;

				if (this.isEmailValid() && this.isPhoneValid() && this.information.name && this.information.address) {
					alert ('Ok!')
				} else {
					alert ('Fields are not filled correctly')
				}
			},

			//проверка валидности емейла в формате "somebody@example.com"
			isEmailValid () {
				let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(this.information.email)
			},
			//проверка валидности телефона. "+" и 12 цифр 
			isPhoneValid () {
				let re = /\+\d{12}/;
				return re.test(this.information.phone)
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
	.redline {
		border-bottom: 2px solid red;
	}
</style>		