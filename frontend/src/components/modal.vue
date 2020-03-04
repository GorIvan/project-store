<template>
    <div class="modal_window log_form" v-show="this.visible">
		<div class="cross" v-on:click="close()">
			<div></div>
			<div></div>
		</div>
		<div>
			<div class="input_block">
				<input type="text" id="signin_username" class="text-input" maxlength="20" placeholder="Login or email">
			</div>
			<div class="input_block">
				<input type="text" id="signin_pass" class="text-input" maxlength="20" placeholder="Password">
			</div>
			<div class="input_block">
				<input type="text" id="confirm_pass" class="text-input" maxlength="20" placeholder="Confirm password">
			</div>
		</div>	
		<button class="button" v-on:click="">
	    		Sign Up
	    </button>
	</div>
</template>

<script>
	export default {
		name: 'modal',
		props: {
			visible: Boolean
		},
		methods: {
			close () {
			    this.$emit('close')
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
	.modal_window {
		position: fixed;
		top: 105px;
	}
	.cont {
		font-size: 40px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.cross {
		position: absolute;
	    width: 20px;
	    height: 20px;
	    border: 2px solid black;
	    border-radius: 50%;
	    right: -25px;
	    top: -25px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}    
	.cross div {
   		width: 16px;
   		height: 2px;
   		background-color: black;
   		position: absolute;
   		cursor: pointer;
   	}	
   	.cross	div:first-child {
   		transform: rotate(45deg);
   	}
   	.cross	div:last-child {
   		transform: rotate(-45deg);
   	}
</style>