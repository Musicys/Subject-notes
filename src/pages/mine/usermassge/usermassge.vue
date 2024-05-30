
	<template>
		<view class="containar">
			<view class="avatarUrl">
				<button type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
					<image :src="usermassge.avatarUrl" class="refreshIcon"></image>
				</button>
			</view>
			<view class="nickname">
				<text>昵称：</text>
				<input type="nickname" class="weui-input" v-model="usermassge.nickName" @blur="bindblur"
					placeholder="请输入昵称" @change="bindinput"/>
			</view>
	
			<view class="btn">
				<view class="btn-sub" @click="onSubmit">保存</view>
			</view>
		</view>
	</template>



<script>
	import {getStorageSync,setStorageSync} from "../../../utils/index.js"
	export default {

			data() {
				return {
					usermassge:{
						avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
						nickName: '',
						setInterval:0
					}
				};
			},
			onLoad(option) {},
			mounted(){
				this.setuser()
			
			},
			beforeDestroy(){
				
			},
			methods: {
				bindblur(e) {
					this.usermassge.nickName = e.detail.value; // 获取微信昵称
				},
				bindinput(e){
					this.usermassge.nickName = e.detail.value; //这里要注意如果只用blur方法的话用户在输入玩昵称后直接点击保存按钮，会出现修改不成功的情况。
				},
				onChooseavatar(e) {
					 const { avatarUrl } = e.detail 
					    this.usermassge.avatarUrl=avatarUrl
					
				},
				onSubmit() {
					if(this.usermassge.nickName === ''){
						uni.showToast({
							icon: 'none',
							title: '请输入昵称'
						})
						return false;
					}
				
					
					// 用户信息
					setStorageSync("usermassge",JSON.stringify(this.usermassge))
				
					
					
					uni.showToast({
					icon: 'none',
					title: '保存成功',
					success:()=>{
						setTimeout(()=>{
							uni.navigateBack({
								url:"../index"
							})
						},500)
					}
									})
				},
				setuser(){
					if(!getStorageSync("usermassge")){return }
					this.usermassge=JSON.parse(getStorageSync("usermassge"))
					
				}
			}
		
	

	}
</script>

<style lang="less" scoped>
.containar {
	.avatarUrl {
		padding: 80rpx 0 40rpx;
		background: #fff;
		button {
			background: #fff;
			line-height: 80rpx;
			height: auto;
			width: auto;
			padding: 20rpx 30rpx;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.refreshIcon {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}
			.jt{
				width: 14rpx;
				height: 28rpx;
			}
		}
	}
	.nickname{
		    background: #fff;
		    padding: 20rpx 30rpx 80rpx;
		    display: flex;
		    align-items: center;
		    justify-content: center;
			.weui-input{
				padding-left: 60rpx;
			}
	}
	.btn{
		width: 100%;
		.btn-sub{
			width: 670rpx;
			margin: 80rpx auto 0;
			height: 90rpx;
			background: #FF2929;
			border-radius: 45rpx;
			line-height: 90rpx;
			text-align: center;
			font-size: 36rpx;
			color: #fff;
		}
	}
}



</style>
