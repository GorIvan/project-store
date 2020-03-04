<template>
    <div class="registration_form">
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
		name: 'registration'
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
		background: rgba(114,68,68,1);
		color: #ddd;
		width: 500px;
		height: 500px;
	}
</style>