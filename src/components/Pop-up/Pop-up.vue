<template>
	<view class="pop-index">
		<image :src="src" mode="widthFix" @click="setiscode()"></image>
	
	</view>
</template>

<script>
	export default {
		name:"Pop-up",
		props:{
			src:{
				default(){
					return "../../static/mine/GO.png"
				}
			}
		},
		methods:{
			setiscode(){
				this.$emit("setIsQrcode")
				
			}
		},
		mounted(){
			
		}
		
	}
</script>

<style lang="less">
	.pop-index
	{
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 99;
		background: rgba(0, 0, 0, .5);
		// background: red;
		display: flex;
		justify-content: center;
		align-items: center;
			image{
				width: 50%;
				
				
			}
	}
</style>