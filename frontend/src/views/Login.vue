<template>
	<div class="background">
	    <div class="login_block"> 	
		  	<modal :visible="this.modalVisible" @close='closeModal'>
		  		<template v-slot:modal-content>
					<registration />
		  		</template>
		  	</modal>

		  	<span class="hello">
		  		{{headerText}}
		  	</span>
		    <div class="login_form"> 
		    	<div>
			    	<div class="input_block" v-bind:class="{accent_input: userAccent}">
			    		<input type="text" id="login_username" class="text-input" maxlength="20" placeholder="Login or email" v-model="user.username">
			    	</div>
			    	<div class="input_block" v-bind:class="{accent_input: passAccent}">
			    		<input type="text" id="login_pass" class="text-input" maxlength="20" placeholder="Password" v-model="user.pass">
			    	</div>
			    	<button class="login-button" v-on:click="signIn()">
			    		Sign In
			    	</button>
		    	</div>
		    	<div class="registration" v-bind:class="{backlightSignUp: isActive}" v-on:click="openSignUp()">
					Sign Up
				</div>
		    </div>
		    <div class="info">
		    	This is a demo site. You can log in as an existing user (user: admin, pass: 111) or register. The products on the site are not real! Photos used for demonstration!
		    </div>
	    </div>
    </div>
</template>

<script>
	import registration from '../components/reg';
	import modal from '../components/modal';
	import sendAjax from '../utils/ajax';
	import { mapMutations } from 'vuex';

	export default {
		data () {
			return {
				modalVisible: false,
				headerText: 'We greet you! Please log in or register.',
				isActive: false,
				userAccent: false,
				passAccent: false,
				user: {
					username: '', 
					pass: ''
				}
			}
		},
	    components: {
	      registration: registration,
	      modal: modal
	    },
	  	methods: {
	  		...mapMutations(['setUser']),

		  	signIn: function () {
		  		let userJson = JSON.stringify(this.user);
		  		if (this.user.username && this.user.pass) { 
		  			sendAjax('http://localhost:3000/userlogin', 'post', userJson)
					    .then((response) => {
					    	// this.setUser(this.user);
					    	this.setUser(response);
					        this.$router.push ({path:'/home'})   
					    },
					    (response) => {
					    	this.headerText = 'User not found! Please sign up.'
					    	this.isActive = true
					    })
    			} else {
    				this.headerText = 'Fill all fields!!'
    			}
		  	},
		  	openSignUp: function () {
		  		this.modalVisible = true;
		  		this.isActive = false;
		  	},
		  	closeModal: function () {
		  		this.headerText = 'We greet you! Please log in or register.';
		  		this.modalVisible = false;	  		
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
	input {
		color: #fff;
		font-size: 15px;
		padding: 8px;
		background: rgba(3,3,3,.1);
		border: none;
		width: 100%;
		height: 100%;
		border-radius: 50px;
	}
	input:focus{
	    box-shadow: 3px 3px 10px #333;
	    background: rgba(3,3,3,.18);
	}
	.input_block {
		width: 300px;
		height: 50px;
		border-radius: 50px;
		margin-top: 45px;
	}
	.background {
		background: url(http://cdn.magdeleine.co/wp-content/uploads/2014/05/3jPYgeVCTWCMqjtb7Dqi_IMG_8251-1400x933.jpg) no-repeat center center fixed; 
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
		overflow: hidden;
		height: 100vh;
	}
	.backlightSignUp {
		color: white;
		opacity: 1 !important;
		animation: blur 3s ease-out infinite;
		text-shadow: 0px 0px 5px #fff, 0px 0px 7px #fff;
	}
	.hello {
		font-size: 25px;
  		font-weight: 900;
  		margin-bottom: 30px;
	}
	.registration {
		cursor: pointer;
		margin-top: 80px;
		opacity: 0.2;
	}
	.login_form {
		background: rgba(3,3,3,0.25);
		box-shadow: 1px 1px 50px #000;
		color: #ddd;
		width: 350px;
		height: 450px;
	}
	.info {
		color: black;
		font-size: 18px;
		margin-top: 100px;
	}
	@keyframes blur {
	  	from {
		    text-shadow:0px 0px 10px #fff,
		      0px 0px 10px #fff, 
		      0px 0px 25px #fff,
		      0px 0px 25px #fff,
		      0px 0px 25px #fff,
		      0px 0px 25px #fff,
		      0px 0px 25px #fff,
		      0px 0px 25px #fff,
		      0px 0px 50px #fff,
		      0px 0px 50px #fff,
		      0px 0px 50px #7B96B8,
		      0px 0px 150px #7B96B8,
		      0px 10px 100px #7B96B8,
		      0px 10px 100px #7B96B8,
		      0px 10px 100px #7B96B8,
		      0px 10px 100px #7B96B8,
		      0px -10px 100px #7B96B8,
		      0px -10px 100px #7B96B8;
	    }
	}
</style>
