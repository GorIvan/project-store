<template>
  <div class="login_block">
  	
  	<modal :visible="this.modalVisible" @close='closeModal'>
  		<template v-slot:modal-content>
			<registration />
  		</template>
  	</modal>

  	<span class="hello" v-show="this.loginVisible">
  		We greet you! Please log in or register.
  	</span>
    <div class="login_form"> 
    	<div>
	    	<div class="input_block">
	    		<input type="text" id="login_username" class="text-input" maxlength="20" placeholder="Login or email">
	    	</div>
	    	<div class="input_block">
	    		<input type="text" id="login_pass" class="text-input" maxlength="20" placeholder="Password">
	    	</div>
	    	<button class="button" v-on:click="signIn()">
	    		Sign In
	    	</button>
    	</div>
    	<div class="registration" v-on:click="openSignUp()">
			Sign Up
		</div>
    </div>
  </div>
</template>

<script>
	import registration from '../components/reg';
	import modal from '../components/modal';

	export default {
		data () {
			return {
				modalVisible: false
			}
		},	
	    components: {
	      registration: registration,
	      modal: modal
	    },
	  	methods: {
		  	signIn: function () {
		  		this.$router.push ({path:'Main'})
		  	},
		  	openSignUp: function () {
		  		this.modalVisible = true;
		  	},
		  	closeModal: function () {
		  		this.modalVisible = false
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
</style>
