<template>	
	<div class="info">	
		<div class="copyright">&copy; copyright</div>
		<div>Some links</div>
	</div>

</template>


<script>
	export default {
		name: 'info',
		data () {
			return {
			}
		},		
	  	methods: {
		}  			
	}
</script>


<style scoped>
	.info {
		position: fixed;
		bottom: 20px;
		width: 80%;
		display: flex;
		justify-content: space-between;
	}
	.copyright {
		color: #A9A9A9;
	}
</style>		