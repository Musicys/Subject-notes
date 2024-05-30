<template>
	<view v-show="issx">
		<scroll-view class="vipcz" scroll-y :show-scrollbar="false">
			<view class="top">
				<!-- 背景图 -->
				<image :src="BaseUrl+'beijtop.png'"></image>
				
				<view class="Cat">
					<view class="Cat_use">
						<view class="Cart_user">
							<view class="cart_is">
								<view>
									<image src="../../static/vipcz/one.png" mode="widthFix"></image>
								</view>
								<text class="sone">所有题材</text>

								<text class="stwo">无限制查看</text>
							</view>
							<view class="cart_is">
								<view>
									<image src="../../static/vipcz/tow.png" mode="widthFix"></image>
								</view>
								<text class="sone">公司合作</text>

								<text class="stwo">无限制查看</text>
							</view>
							<view class="cart_is">
								<view>
									<image src="../../static/vipcz/tow.png" mode="widthFix"></image>
								</view>
								<text class="sone">邀请返佣</text>

								<text class="stwo">资格</text>
							</view>
							<view class="cart_is">
								<view>
									<image src="../../static/vipcz/feor.png" mode="widthFix"></image>
								</view>
								<text class="sone">超级会员</text>

								<text class="stwo">标识</text>
							</view>

						</view>
					</view>
				</view>
			</view>
			<view class="but">


				<view class="Cat">
					<view class="Cat_use">

						<view class="Cat_bt">
							<view class="hex">

							</view>
							优惠活动
							<view class="hextwo">

							</view>
						</view>
						<view class="Cart_user">

							<view class="cart_is left " :class="tabHot == 1 ? 'ysone' : 'ystwo'" @click="setsTable(1)">
								<view class="bt" @click="setsTable(1)">
									{{VipList[0].name}}
								</view>
								<view class="sone">{{VipList[0].discount/100}}</view>

								<view class="stwo .xhx">￥{{VipList[0].discount/100*2.5}}</view>
							</view>
							<view class="cart_is .center" :class="tabHot == 2 ? 'ysone' : 'ystwo'" @click="setsTable(2)">
								<view class="bt">
								{{VipList[1].name}}
								</view>
								<view class="sone">{{VipList[1].discount/100}}</view>

								<view class="stwo ">每日仅需{{(VipList[1].discount/100/VipList[1].duration).toFixed(2)}}元</view>
							</view>

							<view class="cart_is .right" :class="tabHot == 3 ? 'ysone' : 'ystwo'" @click="setsTable(3)">
								<view class="bt">
								{{VipList[2].name}}
								</view>
								<view class="sone">{{VipList[2].discount/100}}</view>

								<view class="stwo">每日仅需{{(VipList[2].discount/100/VipList[2].duration).toFixed(2)}}元</view>
							</view>


						</view>
						<view class="cat_but" @click="vipcz">
							￥{{ mountVip }}立即开通
							<view class="img">

							</view>
						</view>
					</view>
				</view>
				<view class="use_xts">
					注:虚拟产品，一经付费概不退款
				</view>

				<view class="Cpys">
					<view class="Cat_bt">
						<view class="hex">

						</view>
						产品优势
						<view class="hextwo">

						</view>
					</view>


					<view class="Cpner">
						<view class="left">

							<view>题材轮动图谱</view>
							<view>题材情绪排名</view>
							<view>题材财务排名</view>
							<view>主线题材梳理 </view>
							<view>全部题材梳理 </view>
							<view>热点题材梳理 </view>
							<view>个股研报亮点 </view>
							<view>个股主营亮点 </view>
							<view>个股题材亮点</view>

						</view>
						<view class="right">

							<view>核心公司排名</view>
							<view>核心公司标黄</view>
							<view>每日盘前必读</view>
							<view>每日题材快讯</view>
							<view>每日市场复盘 </view>
							<view>每月投资日历 </view>
							<view>个股题材图谱 </view>
							<view>个股产品图谱 </view>
							<view>个股行业图谱</view>

						</view>
					</view>
				</view>
				<!-- 背景图二 -->
				<image :src="BaseUrl+'beijbut.png'" mode="widthFix"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script >
import {getRechargeList,wxRecharge,wxRechargeCallback} from "../../api/index.js"
import {getStorageSync,setStorageSync} from "../../utils/index.js"
import { wxAuthorize } from '../../api/index'
export default{
	data(){
		return {
			issx:true,
			 tabHot:1,
			 mountVip:689,
			 BaseUrl:"https://web-uns.oss-cn-beijing.aliyuncs.com/ticaibij/",
			 VipList:[
				 {
					discount: 69800,
					duration: 183,
					id: 1,
					name: "半年会员",
					price: 237600,
					remark: null,
					sort: 1},
					{
					discount: 69800,
					duration: 183,
					id: 1,
					name: "半年会员",
					price: 237600,
					remark: null,
					sort: 1},
					{discount: 69800,					
					duration: 183,
					id: 1,
					name: "半年会员",
					price: 237600,
					remark: null,
					sort: 1}									
			 ]
		}
	},
	mounted(){
		this.setisx();
	
		// 列表初始化
		this.setvipList()
		this.setsTable(1)
	},
	methods:{
		async  setvipList(){
			let a=null
			if((a=await getRechargeList()))
			{
				this.VipList=a
			}
			else
			{
				console.log("请求错误");
			}
			
		},
	     vipcz(){
			let a= getStorageSync("userInfo")
			
			if(!a)
			{
				return wx.showToast({
					icon:"none",
					title:"还未登录"
				})
			}
		
			this.vipczUtil({
				openId:a.openid,
				productId:this.VipList[this.tabHot-1].id
				
			})
			
		},
	 async	vipczUtil(objet){
		 console.log(objet);
		let a= await wxRecharge(objet)
		console.log(a);
		wx.showLoading({
						  icon:"none",
						  title:"支付中"
		})
	
		wx.requestPayment({
		  timeStamp:a.timeStamp ,
		  nonceStr: a.nonceStr,
		  package: a.package,
		  signType: a.signType,
		  paySign: a.paySign,
		  success: (res) =>{ 
			  console.log('支付数据',res);
			  this.wxLogin() //重写登录
			  	wx.hideLoading()
				wx.showToast({
					icon:"none",
					title:"支付成功",
					duration:1000
				})
			
		  },
		  fail (res) { 
			  console.log('取消支付');
			  	wx.hideLoading()
				wx.showToast({
					icon:"none",
					title:"取消支付",
					duration:1000,
					
				})
				
		  }
		})
		},
	   	setsTable(i){
			this.tabHot = i
			this.mountVip=this.VipList[this.tabHot-1].discount/100
		},
		 setisx(){
		
			if (!this.issx) {
				uni.showToast({
					title: '加载中...',
					icon: 'loading',
					duration: 100
				});
		
				setTimeout(() => {
					this.issx= true
				}, 100)
			}
		},
		//登录方法
		wxLogin() {
		  uni.login({
		    provider: 'weixin',
		    onlyAuthorize: true,
		    success: (result) => {
		      if (result.code) {
		        this.userLogin(result.code)
		      }
		    }
		  })
		},
		async userLogin(code) {
		  // 用户登录并缓存用户信息
		  const res = await wxAuthorize({ code, inviteCode: getStorageSync(uni.$u.globalVal.INVITE_CODE) })
		  if (res) {
		    console.log(res)
		    setStorageSync(uni.$u.globalVal.USER_INFO, res)
		  }
		}
	}
}






</script>

<style lang="less">
view span {
	white-space: nowrap;

}

@back: #FFFFFF;

@tbsize: 14vw;

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

.vipcz {
	height: 110vh;
	width: 100vw;

	display: flex;


	flex-direction: column;
	justify-content: flex-start;


	.top {
		z-index: 999;
		height: 40vh;

		width: 100vw;
		position: relative;

		image {
			width: 100vw;
			height: 40vh;
		}

		.Cat {
			width: 85vw;
			height: 20vh;
			background: @back ;
			border-radius: 1em;
			position: absolute;
			bottom: -12vh;
			border: .15em solid #FFCCAB;
			left: 50%;
			transform: translateX(-50%);

			// background: red;
			.center();

			.Cart_user {
				width: 75vw;


				.flex-sbtre();

				.cart_is {

					view {
						width: @tbsize;
						height: @tbsize;
						border-radius: 50%;
						background: #F4503A;
						.center();

						image {
							width: 50%;


						}
					}

					.flex-top-start();

					.sone {
						font-size: .65rem;

					}

					.stwo {
						font-size: .7rem;
						color: #7B7B7B;

					}
				}

				margin: auto;


			}
		}

	}

	.but {

		width: 100vw;

		margin: 0;
		padding: 0;
		position: relative;
		z-index: 11;
		background: #e02630;
		padding-bottom: 1em;
		.flex-top-start();

		.Cat {
			margin-top: 15vh;
			width: 85vw;
			padding: .8em 0em;
			background: @back ;
			border-radius: 1em;

			border: .15em solid #FFCCAB;

			// background: red;
			// overflow: hidden;
			.center();
			// display: flex;

			// align-items: center;

			.cat_but {
				padding: .5rem 0;
				margin-top: 1em;
				width: 100%;
				height: 2em;

				background: linear-gradient(180deg, #FF3538, #FA5C1D);
				border-radius: 2em;
				color: #FFFFFF;
				.center();

				.img {
					margin-left: 1em;
					width: 2em;
					height: 2em;

					background-image: url("../../static/vipcz/but.png");
					background-size: 100% 100%;

				}
			}

			.Cart_user {

				max-width: 80vw;

				overflow: hidden;


				display: flex;
				justify-content: space-between;

				.left {
					margin-right: .1rem;

				}

				.center {
					margin-right: .1rem;
					margin-left: .1rem;
				}

				.right {

					margin-left: .1rem;
				}

				.cart_is {
					overflow: hidden;


					padding: 0em 1em 1em 1em;
					max-width: 20%;

					border-radius: 1em;
					// background: #F2C29E;	


					.flex-top-start();

					.bt {

						padding: .2rem .5rem;

						border-radius: 0em 0em 1em 1em;


						margin-bottom: 1em;

						font-size: .9rem;
						white-space: nowrap;

					}

					.flex-top-start();

					.sone {
						.center();
						margin-bottom: .5em;
						font-size: .65rem;
						letter-spacing: -1rpx;
						font-weight: bold;
						text-align: center;
						font-size: 1.5em;
						position: relative;

						&::after {
							content: '￥';
							position: absolute;
							bottom: 0em;
							left: -.8em;
							// bottom: -.6em;
							color: inherit;
							font-size: .6em;

						}

					}

					.stwo {
						font-size: .6rem;

						// color:#FFFFFF;
						white-space: nowrap;

					}

				}

				margin: auto;


			}
		}

		.use_xts {
			color: #FFFFFF;
			margin-top: 1em;
			font-size: .9rem;
		}

		.Cpys {

			margin-top: 1em;
			width: 85vw;
			padding: .8em 0em;
			background: @back ;
			border-radius: 1em;
			border: .15em solid #FFCCAB;
			max-height: 60vh;
			padding-bottom: 1.2em;

			.flex-top-start();

			.Cpner {
				width: 100%;

				// background: red;
				// display: flex;
				.flex-sbtre();

				.left {
					margin-left: 10%;
				}

				.right {
					margin-right: 10%;
				}

				view {
					.flex-top-start();

					view {
						margin-top: .8rem;
						color: #AB2824;
						font-weight: bold;
						border-left: .2rem solid #FF7561;
						font-size: 1rem;

						padding-left: .5rem;

						// font-style: italic;
					}
				}
			}
		}

		image {
			top: 0;
			position: absolute;
			width: 100vw;
			z-index: -1;
		}


	}
}

.ysone {
	background: linear-gradient(90deg, #FF3538, #F4503A);

	.bt {
		color: #A30206;
		background: #FFE1BB;
	}

	.sone {
		color: #FFF1E6;
	}

	.stwo {
		color: #FFE7D5;
	}
}

.ystwo {
	background: #F2C29E;

	.bt {
		color: #F6D0B4;
		background: #951C00;
	}

	.sone {
		color: #521608;
	}

	.stwo {
		color: #80483B;
	}
}

.Cat_bt {
	width: 100%;
	font-size: 1.2em;

	font-weight: bold;
	margin-bottom: 1em;
	color: #FD4128;
	.center();

	.hex {
		width: 2.5em;
		height: 10rpx;
		background: linear-gradient(#FFFFFF, #F4503A);
		margin-right: .5em;
	}

	.hextwo {
		width: 2.5em;
		height: 10rpx;
		background: linear-gradient(#F4503A, #FFFFFF);
		margin-left: .5em;
	}
}

.xhx {
	text-decoration: line-through;

}

// </style>
