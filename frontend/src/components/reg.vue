<template>
    <div class="registration_form">
		<div>
			<div class="input_block">
				<input type="text" id="signin_username" class="text-input" maxlength="20" placeholder="Login or email" v-model="user.username">
			</div>
			<div class="input_block">
				<input type="text" id="signin_pass" class="text-input" maxlength="20" placeholder="Password" v-model="user.pass">
			</div>
			<div class="input_block">
				<input type="text" id="confirm_pass" class="text-input" maxlength="20" placeholder="Confirm password" v-model="confirmpass">
			</div>
		</div>	
		<button class="button" v-on:click="checkUsername()">
	    		Sign Up
	    </button>
	</div>
</template>

<script>
	import sendAjax from '../utils/ajax';

	export default {
		name: 'registration',
		data () {
			return {
				user: {
					username: '', 
					pass: ''
				},
				confirmpass: ''
			}
		},			
	  	methods: {
		  	checkUsername: function () {
		  		if (this.user.username && this.user.pass && this.confirmpass) {
		  			if (this.user.pass != this.confirmpass) {
		  				return alert('password not verified')
		  			} else {
		  				this.sendUser()
		  			}
		  		} else {
		  			return alert('fields are not filled correctly')
		  		}   
		  	},
		  	sendUser: function () {
		  		let usernameJson = JSON.stringify(this.user);
		  		sendAjax('http://localhost:3000/usercheckname', 'post', usernameJson)
					.then((response) => {
						this.$router.push ({path:'/main'})   
				    },
				    (response) => {
				    	alert ('this username is already taken')    
				    })
		  	}
		}  			
	}
</script>

<style scoped>
	* {
		display: flex;
  		justify-content: center;
  		align-items: center;
  		flex-direction: column;
	}
   	.registration_form {
		background: gray;
		color: #ddd;
		width: 350px;
		height: 450px;
	}
</style>