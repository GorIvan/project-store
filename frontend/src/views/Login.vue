<template>
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
	    	<div class="input_block">
	    		<input type="text" id="login_username" class="text-input" maxlength="20" placeholder="Login or email" v-model="user.username">
	    	</div>
	    	<div class="input_block">
	    		<input type="text" id="login_pass" class="text-input" maxlength="20" placeholder="Password" v-model="user.pass">
	    	</div>
	    	<button class="button" v-on:click="signIn()">
	    		Sign In
	    	</button>
    	</div>
    	<div class="registration" v-bind:class="{backlightSignUp: isActive}" v-on:click="openSignUp()">
			Sign Up
		</div>
    </div>
  </div>
</template>

<script>
	import registration from '../components/reg';
	import modal from '../components/modal';
	import sendAjax from '../utils/ajax';

	export default {
		data () {
			return {
				modalVisible: false,
				headerText: 'We greet you! Please log in or register.',
				isActive: false,
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
		  	signIn: function () {
		  		let userJson = JSON.stringify(this.user);
		  		if (this.user.username && this.user.pass) { 
		  			sendAjax('http://localhost:3000/userlogin', 'post', userJson)
					    .then((response) => {
					        this.$router.push ({path:'/'})       
					    },
					    (response) => {
					    	this.headerText = 'User not found! Please sign up.'
					    	this.isActive = true;
					    })
    			} else {
    				alert('введите данные')
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
	.backlightSignUp {
		color: white;
		opacity: 1 !important;
		animation: blur 3s ease-out infinite;
		text-shadow: 0px 0px 5px #fff, 0px 0px 7px #fff;
	}
	.hello {
		font-size: 25px;
  		font-weight: 900;
  		margin-top: 30px;
  		margin-bottom: 30px;
	}
	.login_block {
		margin-top: 100px;
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
	/*конечно же берем в интернетах уже готовый стиль чтобы выделить нашу информацию =)*/
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
