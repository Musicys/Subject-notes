<template>
	<view class="page" v-show="issx">
		<view class="Cart_top">
			<image src="../../static/image/bg.png" class="cart-top-image" ></image>
			<view class="Cart">
				<view class="left">

					<image :src="usermassge.avatarUrl" mode="widthFix" @click="goUserMesge()"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="top_left" @click="goUserMesge()">
							{{usermassge.nickName}}
						</view>
						<view class="top_right" v-if=" IsVIP">
							<image src="../../static/mine/vip.png" mode="widthFix"></image>
						</view>
					</view>

					<view class="but">
						<view class="user">
							<span>绑定手机号</span>
							<image src="../../static/mine/youjt.png" mode="heightFix"></image>
						</view>

					</view>
				</view>
			</view>
		</view>

		<view class="mine_but">
			<view class="top" v-if="IsVIP">
				<image src="../../static/mine/vipdaoqi.png" mode="widthFix"></image>
				<span class="use">你的VIP还有{{userStatistics.vipRemain}}天过期</span>
				<button @click="govipcz">立即续费</button>
			</view>
			<view class="top" v-else>
				<image src="../../static/mine/vipdaoqi.png" mode="widthFix"></image>
				<span class="use">点击充值会员</span>
				<button @click="govipcz">立即充值</button>
			</view>
			<view class="centers">
				<view class="cart">
					<text>{{userStatistics.stockCount}}</text>
					<text>个股自选</text>
				</view>
				<view class="cart">
					<text>{{userStatistics.subjectCount}}</text>
					<text>题材自选</text>
				</view>
				<view class="cart">
					<text>{{userStatistics.footmarksCount}}</text>
					<text>足迹</text>
				</view>
				<view class="cart">
					<text>{{userStatistics.activeCount}}</text>
					<text>活跃天数</text>
				</view>
			</view>
			<view class="butone">
				<view class="butone_cart">
					<image src="../../static/mine/liw.png" mode="heightFix"></image>
					<view class="butone_cart_text">
						<text>邀请好友获现金奖励</text>
						<text>成功邀请好友得惊喜好礼</text>
					</view>
					<view class="img" @click="gomypost">
						<image src="../../static/mine/GO.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="butlieb">
				<view class="liebCatr" @click="goUserMesge()">
					<image src="../../static/mine/user.png" mode="widthFix"></image>
					<text>个人信息</text>
					<image class="lieb_img" src="../../static/mine/back.png" mode="widthFix"></image>
				</view>
				<view class="liebCatr" @click="gomypost () ">
					<image src="../../static/mine/tuig.png" mode="widthFix"></image>
					<text>我的推广</text>
					<image class="lieb_img" src="../../static/mine/back.png" mode="widthFix"></image>
				</view>
				<view class="liebCatr" @click="goinstructions()">
					<image src="../../static/mine/user_sm.png" mode="widthFix"></image>
					<text>使用说明</text>
					<image class="lieb_img" src="../../static/mine/back.png" mode="widthFix"></image>
				</view>
				<view class="liebCatr">
					<image src="../../static/mine/redset.png" mode="widthFix"></image>
					<text>设置</text>
					<image class="lieb_img" src="../../static/mine/back.png" mode="widthFix"></image>
				</view>
				<button class="liebCatr"  open-type="contact" bindcontact="handleContact" type="primary">
					
					<image src="../../static/mine/wxmine.png" mode="widthFix"></image>
					<text>联系我们</text>
					<image class="lieb_img" src="../../static/mine/back.png" mode="widthFix"></image>
				</button>

			</view>
			<view class="sm">
				xxxxxxxxxxxxxxxxxx
			</view>
		
		</view>

	</view>
</template>

<script>
	import {getStorageSync,setStorageSync} from "../../utils/index.js"
	

	

export default {
	data(){
		return {
			usermassge:{
				avatarUrl: '../../static/mine/mine.png',
				nickName: '用户名'
			},
			 issx:false,
			 //用户信息
			 userStatistics:{
				stockCount:0,
				subjectCount:0,
				footmarksCount:0,
				activeCount:0,
				vipRemain:0
				
				
			 },
			 userInfo:{
				 vip:88
			 },
			 IsVIP:false
			 
		}
	},
	mounted(){
		this.setisx();//进度条
			
	},
	onShow(){
		// 读取用户信息
				this.setuser()
					this.setUserMassge()
			
	},
	methods:{
		
		// ********************用户信息渲染
		// 用户信息渲染
			setUserMassge(){
			let a=getStorageSync("userInfo")
			if(!a)
			{
				return
				
			}
			
			this.userStatistics=a.userStatistics
			this.userInfo=a.userInfo
			
			if(this.userInfo.vip==88)
			{
				return this.IsVIP=true
			}
			else
			{
				return this.IsVIP=false
			}
		
			
			
		},
		// ********************用户头像名称
		// 获取用户头像
		setuser(){
			let a=getStorageSync("usermassge")||null
			console.log('用户数据',a);
			if(!a)
			{
				return false
				
			}
				
			
			this.usermassge=JSON.parse(a)
			
		},
		// 页面加载进度条
		setisx(){
			if (!this.issx) {
				uni.showToast({
					title: '加载中...',
					icon: 'loading',
					duration: 100
				});
			
				setTimeout(() => {
					this.issx = true
				}, 100)
			}
		},
		goUserMesge(){
			wx.navigateTo({
				url:"./usermassge/usermassge"
			})
		},
		 govipcz (){
			 wx.navigateTo({
			 	url: "../vipcz/vipcz"
			 })
		 },
		 gomypost () {
		 	wx.navigateTo({
		 		url: "./mypost/mypost"
		 	})
		 },
		 goinstructions(){
			 wx.navigateTo({
				 url:"./instructions/instructions"
			 })
		 }

	}
}

















</script>

<style  lang="less" scoped>
// 居中布局
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}

// 上下两边对齐
.flex-top {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}

// 从上倒下
.flex-top-start {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}

// 左右对齐
// 左右对其 可以换行
.flex-left {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.flex-start {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.flex-sbtre {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.poctenr {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);

}

// 标题颜色
@Bticolr: #FFFFFF;
//导航颜色
@ztcolor: #FF2929;
//选框颜色
@xkcolor: #FFFFFF;
// 头像大小
@txwidth: 10vh;
//背景颜色
@beijcolor: #F3F3F3;

.page {

	padding-top: 0 !important;
	background: @beijcolor;

	height: 100vh;

	.Cart_top {
		
		height: 32vh;
		position: relative;
		.cart-top-image{
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
		}
		.center();
		
		.Cart {
		
			z-index: 2;
			width: 80%;
			margin: auto;
			height: 50%;


			margin-top: 15%;
			.flex-start();

			.left {
				position: relative;
				width: @txwidth;
				height: @txwidth;
				border-radius: 50%;

				overflow: hidden;
				background: @Bticolr;
				.center();

				image {
					width: 100%;
					width: 100%;


				}


			}

			.right {

				flex: 1;
				height: 100%;
				.flex-top-start();
				align-items: flex-start;
				justify-content: center;
				padding-left: .5em;

				.top {
					.flex-start();

					.top_left {
						color: @Bticolr;
						font-size: 1.1em;
						font-weight: bold;
					}

					.top_right {
						background-image: url("../../static/mine/vipbj.png");
						background-size: 100% 100%;

						width: 3.6em;
						height: 1.1em;
						margin-left: .4em;
						.center();

						image {
							width: 75%;
						}

					}
				}

				.but {
					margin-top: .4em;
					height: 1.2em;

					.flex-start();

					.user {
						font-size: .9em;
						color: @Bticolr;
					}

					image {
						margin-left: .5em;
						height: .8em;
						width: .6em;
					}
				}
			}
		}
	}

	.mine_but {
		z-index: 3;
		// background: green;
		background: @xkcolor;
		// height: 60vh;

		width: 95%;
		.poctenr();

		top: 30vh;
		border-radius: .3em .3em 0 0;


		.top {
			width: 95%;
			background: linear-gradient(#61656E, #282828);
			.poctenr();
			z-index: 3;
			top: -2em;
			height: 2em;
			border-radius: .3em .3em 0 0;
			.flex-sbtre();
			// display: flex;


			image {
				width: 2.1em;
				margin-left: .6em;

			}

			.use {
				color: #FFE4B9;
				margin-left: .8em;
				font-size: .8em;
			}

			button {

				min-width: 5em;
				.center();
				font-size: .8em;
				height: 75%;
				color: #826239;
				background: linear-gradient(#FFE4B9, #E9B87C);

			}
		}

		.centers {
			width: 90%;
			height: 8vh;
			// background: red;
			margin: 1em auto;
			.flex-sbtre();


			.cart {
				width: 4em;
				.flex-top-start();

				text:nth-child(1) {
					color: #232323;
					font-size: .8em;
					font-weight: 400;
				}

				text:nth-child(2) {
					color: #A0A4AD;
					font-size: .8em;
				}
			}

		}

		.butone {
			width: 100%;
			background: @beijcolor;

			height: 15vh;
			.center();

			.butone_cart {
				width: 100%;
				height: 80%;
				background: linear-gradient(#FF2929, #FF6436);
				border-radius: 1.3em;
				.flex-sbtre();

				image:nth-child(1) {
					height: 110%;
				}

				.butone_cart_text {
					.flex-top-start();
					width: 60%;

					text {
						white-space: nowrap;
						color: @Bticolr;
					}

					text:nth-child(1) {
						font-size: 1em;
						font-weight: bold;
					}

					text:nth-child(2) {
						font-size: 0.6rem;
					}

				}

				.img {

					min-width: 9vh;
					min-height: 9vh;
					border-radius: 50%;
					overflow: hidden;

					background: #EBA729;
					margin-right: .5em;
					border: .2em solid #FDDF60;
					.center();

					image {
						width: 80%;
					}
				}


			}

		}



		.butlieb {
			overflow: hidden;
			width: 100%;

			// height: 37vh;
			// background: red;
			&>button{
				background: none;
				cursor: none;
				display: block;
				padding: 0;
				font-size: 1em;
				color: #333333;
					.flex-start();
					
			}
			
			.liebCatr {
				width: 100%;
				height: calc(34vh/5);
			
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				display: flex;
				position: relative;
				.flex-start();

				image:nth-child(1) {
					width: 1.5em;
					margin-right: 1em;
					margin-left: 1em;
				}

				text {
					color: #333333;
					font-size: .9em;
					// font-weight: bold;
				}

				.lieb_img {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 1em;
					width: .6em;
				}
			}
		}

		.sm {
			height: 4vh;
			position: absolute;
			width: 100%;

			bottom: -6vh;
			text-align: center;
			color: #B5B5B5;
			margin: 1em auto;
		}

	}


}
</style>
