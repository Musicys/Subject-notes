<template>
	<scroll-view scroll-y="true" class="use" >
	
		<view class="index" >
			<view class="top">
				<!-- 背景 -->
				<image :src="BaseUrl+'bjtop.png'"></image>
					
			</view>
			<view class="center">
				<!-- 背景 -->
				<image :src=" BaseUrl+'bjcenter.png'"></image>

				<view class="xxts">
					<view class="img">

					</view>
					<view class="xx">
						<view class="xx-antion">
							恭喜：{{Phone}}获得<text>50</text>元红包
						</view>
					</view>
				</view>
				<view class="RedBog"  >
				<view class="redtop"  >
						<!-- 背景 -->
					<image :src=" BaseUrl+'redbogtop.png'"></image>
					<view class="redtop_top" >每邀请一位新用户成为VIP可得</view>
					<view class="redtop_cent"><text>50</text>元</view>
					<view class="redtop_but">查看我的奖励></view>
				</view>
					<view class="redbut" >
						<!-- 背景 -->
						<image :src="BaseUrl+ 'redbogbut.png'"  ></image>
						<view class="bredbut_top"   >
							<u-button class="custom-style" open-type="share" color="linear-gradient(180deg, #FFEFBE, #F8C136)"  :hairline="false"
							   text="立即邀请好友" :customStyle="{ color: '#FF2929' }">
							</u-button>
						</view>
						
						<view class="redbut_but"  @click="setIsQRcode()"  >
							<view class="redbut_but_cent" @cilck="setIsQRcode">
								<view class="redbut_but_cent_img">
									<image src="../../../static/mypost/erwiema.png" mode=""></image>
								</view>
								<view class="redbut_but_cent_span" >
									专属二维码
								</view>
							</view>
							<view class="redbut_but_cent" @cilck="setIsQRcode">
								<view class="redbut_but_cent_img">
									<image src="../../../static/mypost/fxbyq.png" mode=""></image>
								</view>
								<view class="redbut_but_cent_span" >
									专属二维码
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="but">
				<!-- 背景 -->
				<image :src="BaseUrl+'bjboton.png'" mode="heightFix"></image>
				<view class="xbt">
					<view class="bt">
						<view class="text">
							邀请收益
						</view>



						<image src="../../../static/mypost/btbj.png" mode="widthFix"></image>
					</view>

					<view class="xbt_cnent">
						<view class="xbt_cnent_top"><text>{{ Promotion.roadIncome}}</text>元</view>
						<view class="xbt_cnent_but">路上收益</view>
					</view>
					<view class="xbt_cnent border">
						<view class="xbt_cnent_top"><text>{{ Promotion.successInvited}}</text>位</view>
						<view class="xbt_cnent_but">成功邀请</view>
					</view>
					<view class="xbt_cnent">
						<view class="xbt_cnent_top"><text>{{ Promotion.totalSummary}}</text>元</view>
						<view class="xbt_cnent_but">总收益</view>
					</view>

				</view>
				<view class="xbttwo">

					<view class="bt">
						<view class="text">
							邀请记录
						</view>
						<image src="../../../static/mypost/btbj.png" mode="widthFix"></image>
					</view>	
					
		
					<view class="xbttwo_bt">
						<text>用户ID</text>
						<text>收益</text>
					</view>
					<scroll-view scroll-y="true" class="xbttwo_swper">
						<view class="row" v-if="data.length!=0" v-for="(i, k) in data" :key="k" >

							<view class="row_left">
								<view class="img">
									<image src="../../../static/mypost/tx.png" mode="widthFix"></image>
								</view>

								<text>{{i.nickname}}</text>
							</view>
							<view class="rowr_ight">
								<text>{{i.totalSummary}}</text>元
							</view>
						</view>
						<view class="xbttwo-tx" v-if="data.length==0" >
							暂无邀请人数
						</view>
					</scroll-view>
				</view>
			</view>
			
		
		
		</view>
		<!-- 二维码 -->
		<PopUp v-if="IsQRcode" @setIsQrcode="setIsQRcode" ></PopUp>
	</scroll-view>
	
</template>

<script>
	import { setStorageSync, getStorageSync } from '../../../utils/index'
	
	import {wxInviteRecord,wxIncomeSummary} from "../../../api/mairui.js"
	
	import PopUp from "../../../components/Pop-up/Pop-up.vue"
	

export default {
	data() {
		return {
			//网络资源
		 BaseUrl:"https://web-uns.oss-cn-beijing.aliyuncs.com/ticaibij/",
		 data:[
			
			  
		 ],//邀请人数
		 openid:getStorageSync("userInfo").openid,
		 Promotion:{//推广收益
			 roadIncome: 0,//实际收益
			 successInvited: 0,//人数
			 totalSummary: 0//资料汇总
		 },
		 //二维码显示
		IsQRcode:false,
		// 随机电话
		Phone:`1${Math.floor(Math.random()*90+10)}*****${Math.floor(Math.random()*900+100 )}`,
		setInterval:0
		}
	},
	components:{
		PopUp
		
	}
	,
	mounted(){
		this.use()
		this.setinter()
	},
	beforeDestroy(){
		clearInterval(this.setInterval)
	},
	methods: {
	
		//开启定时器
		setinter(){
			this.setInterval=setInterval(()=>{
							
						this.Phone=`1${Math.floor(Math.random()*90+10)}*****${Math.floor(Math.random()*900+100 )}`
							
								
							},3000)
		},
	use(){
	
		wxInviteRecord(this.openid).then(res=>{
			
			this.data=res
		})
		wxIncomeSummary(this.openid).then(res=>{
			
		
			this.Promotion=res
		})
			
		},
		setIsQRcode(){
			this.IsQRcode=!this.IsQRcode
		
		}
		
	},
	computed:{
		
	}

	
}
</script>

<style lang="less" scoped>
.custom-style{
	display: none;
	max-width: 0;
	max-height: 0;
}
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

.use {

	width: 100vw;
	height: 100vh;
}

.index {

	width: 100vw;

	&>view {

		margin: 0;
		padding: 0;
		width: 100%;
		position: relative;

		image {
			position: absolute;
			width: 100%;
			top: 0;
			height: 100%;
			z-index: -1;

		}
	}

	.top {

		height: 25vh;

	}

	.center {

		height: 30vh;

		position: relative;
z-index: 1;
		.xxts {
			// margin-top: 2em;
			width: 75%;
			height: 2.2em;
			margin: auto;
			border-radius: .5rem;
			// border: 2rpx solid black;
			background: #E9062E;

			position: absolute;
			top: .8em;
			font-size: .8rem;
			color: #FFFFFF;
			.center();

			image {
				background: blue;
				width: 1em;
				height: 1em;


			}

			.img {
				width: 1em;
				height: 1.2em;

				background-image: url("../../../static/mypost/tzhi.png");
				background-size: 100% 100%;
			}

			.xx {
				margin-left: 1em;
				position: relative;
				overflow: hidden;
				width: 80%;
				height: 100%;
				
				
				.xx-antion{
					width: 100%;
					height: 100%;
					display: flex;
					top: 100%;
					justify-content: center;
					align-items: center;
				
				position: absolute;
				animation:top 3s  infinite	;
					text {
						color: #FFC740;
					}
				}
				
			
				
				@keyframes top {
					5%,95%{
						top: 0;
					}
					100%{
						top: -100%;
					}
					
				}
				


			}
		}

		.RedBog {
			width: 85%;
			height: 60VH;
			top: 3.5em;

			position: absolute;
			left: 50%;
			transform: translateX(-50%);


			.redtop {
				width: 100%;
				height: 30vh;
				position: relative;
				z-index: 1;
				.center();
				flex-direction: column;
				justify-content: flex-start;

				image {
					top: 0;
					width: 100%;
					height: 100%;
					z-index: -1;
					position: absolute;


				}

				view {
					font-weight: 300;
					width: 100%;
					.center();
					margin-top: .5em;
					white-space: nowrap;
					color: #F71E2A;
				}

				.redtop_top {
					margin-top: 1em;
					font-size: 1rem;

				}

				.redtop_cent {

					font-size: .9rem;

					text {
						margin-right: .1rem;
						font-weight: bold;
						font-size: 3.5em;

					}



				}

				.redtop_but {
					font-size: .8rem;

				}
			}

			.redbut {
				width: 100%;
				height: 30vh;
				position: relative;
				z-index: 99;
				.flex-top-start();

				image {
					top: 0;
					width: 100%;
					height: 100%;
					z-index: -1;
					position: absolute;
				}

				.bredbut_top {
					width: 85%;
					overflow: hidden;
					height: 2em;
					background: linear-gradient(180deg, #FFEFBE, #F8C136);
					border-radius: 1em;
					color: #EF1C22;
					.center();
					font-size: 1.3em;
				}

				.redbut_but {
					margin-top: 1em;
					width: 85%;
					height: 6em;

					.center();
					justify-content: space-around;

					.redbut_but_cent {
						.flex-top-start();

						.redbut_but_cent_img {
							border-radius: 50%;
							background: #FFFFFF;
							width: 4em;
							height: 4em;
							.center();
							position: relative;

							image {
								position: relative;
								z-index: 3;

								width: 60%;
								height: 60%;
							}
						}

						.redbut_but_cent_span {
							margin-top: .2rem;
							color: #FFEFBE;
							font-size: .9rem;
						}
					}

				}
			}
		}
	}

	.but {
		padding-top: 42vh;
		height: 100vh;
		padding-bottom: 2em;
		position: relative;
		z-index: 0;
		.xbt {
			width: 85%;

			height: 20vh;

			margin: 1em auto;
			background: #FFFFFF;
			border-radius: 1em;
			position: relative;
			padding-top: 5vh;
			border: 1rpx solid red;
			display: flex;

			.xbt_cnent {

				flex: 1;
				height: 80%;
				.flex-top-start();
				justify-content: space-around;

				.xbt_cnent_top {

					color: #EF1C22;

					text {
						font-size: 2em;


					}
				}

				.xbt_cnent_but {
					margin-top: .2em;
					color: #A0A4AD;
					font-size: .8rem;
				}
			}

			.bt {
				width: 100%;
				position: absolute;
				top: 0;

				.text {
					z-index: 2;
					text-align: center;
					width: 100%;
					height: 2em;
					background: none;
					top: -0.5em;
					position: absolute;
					font-size: 1.4em;
					font-weight: bold;
					color: #FFFFFF;

				}

				image {
					z-index: 1;
					position: absolute;
					top: -1em;
					width: 80%;
					left: 50%;
					transform: translateX(-50%);


				}
			}
		}

		.xbttwo {
			width: 85%;
			height: 55vh;
			border: 1rpx solid red;
			margin: 6vh auto;
			background: #FFFFFF;
			border-radius: 1em;
			position: relative;

			padding-top: 2em;
			.flex-top-start();

			.xbttwo_bt {

				margin-top: 1.2em;
				width: 80%;
				height: 1.5em;
				padding-bottom: 1.5em;
				.flex-sbtre();

				text {
					text-align: center;
					flex: 1;
					color: #A0A4AD;
					font-size: .8rem;
					

				}
			}

			.xbttwo_swper {

				width: 80%;
				height: 70%;
				.xbttwo-tx{
					text-align: center;
					color: #A0A4AD;
					font-size: 1rem;
				}
					
					
				.row {
					width: 100%;
					height: 3em;
					// background: black;
					.flex-sbtre();

					view {
						flex: 1;
					}

					.row_left {
						.flex-start();
						height: 100%;
						position: relative;

						.img {

							max-width: 2em;
							height: 2em;


							image {
								position: absolute;
								z-index: 999;
								top: 50%;
								transform: translateY(-50%);
								width: 2em;
							}
						}

						text {

							margin-left: .5rem;
							flex: 1;
							color: #A0A4AD;
							font-size: 1rem;
							.flex-start();
						}
					}

					.rowr_ight {

						text-align: center;
						font-size: 1em;

						text {
							color: #FF0413;
							margin-left: 2rpx;
						}
					}
				}

			}

			.bt {
				position: absolute;
				top: 0;
				width: 100%;

				.text {
					z-index: 2;
					text-align: center;
					width: 100%;
					height: 2em;
					background: none;
					top: -0.5em;
					position: absolute;
					font-size: 1.4em;
					font-weight: bold;
					color: #FFFFFF;

				}

				image {
					z-index: 1;
					position: absolute;
					top: -1em;
					width: 80%;
					left: 50%;
					transform: translateX(-50%);


				}
			}
		}
	}
}

.border {
	border-right: 1rpx solid #A0A4AD;
	border-left: 1rpx solid #A0A4AD;
}
</style>
