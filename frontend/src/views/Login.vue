<template>
  <div class="login">
  	<modal :visible="this.signUpVisible" @close='closeSignUp' />
  	<span class="hello" v-show="this.loginVisible">
  		We greet you! Please log in or register.
  	</span>
    <div class="log_form" v-show="this.loginVisible"> 
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
    	<div class="reg" v-on:click="openSignUp()">
			Sign Up
		</div>
    </div>
    {{$store.getters.getPass}}
  </div>
</template>

<script>
	import modal from '../components/modal';
	import { mapMutations, mapActions, mapGetters } from 'vuex';

console.log(mapActions , 'mapMutations');

	export default {
		data () {
			return {
				signUpVisible: false,
				loginVisible: true
			}
		},	
	    components: {
	      modal: modal
	    },
	  	methods: {
		  	signIn: function () {
		  		this.$router.push ({path:'Main'})
		  	},
		  	openSignUp: function () {
		  		this.signUpVisible = true;
		  		this.loginVisible = false;
		  	},
		  	closeSignUp: function () {
		  		this.signUpVisible = false;
		  		this.loginVisible = true;
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
	.reg {
		cursor: pointer;
		margin-top: 80px;
		opacity: 0.2;
	}
</style>
