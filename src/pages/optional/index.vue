<template>
	<view class="optional-page">
		<view class="top ">
			<image src="../../static/image/bg.png"></image>
			<view class="top_left .left">
				<image class="top_left_img" src="../../static/optian/ldang.png"></image>
				<view class="top_leftspan" v-if="data.length != 0">
					{{ data.length }}
				</view>
			</view>
		
			<view class="top_cent">
				<view class="top_centbt " :class="Istab == 2 ? 'ys2' : 'ys1'" @click="setIstab(2)">题材</view>
				<view class="top_centbt " :class="Istab == 1 ? 'ys2' : 'ys1'" @click="setIstab(1)">个股</view>

			</view>
			<view class="top_right .right" @click="goseach()">
				<image src="../../static/optian/fdj.png"></image>

			</view>
			<view class="but" v-if="Istab==1">
				<view class="th">
					<view class='td2'>
						<view>产品名称 <image src="../../static/optian/mc.png"></image>
						</view>
					</view>
					<view class='td1' @click="datasort()">
						<view class="stat">
							最新价
							<image src="../../static/optian/jt.png" mode=""></image>
						</view>
					</view>
					<view class='td1 ' @click="datasortwo()">
						<view class=".end">
							涨跌幅
							<image src="../../static/optian/jt.png" mode=""></image>
						</view>
					</view>
				</view>

				<view class="row-auto">
					<view class="row" v-for="(i, k) in data" :key="k"  @click="handleItemClick(i)">
					
							<view class="row_bil2 ">{{ i.title }}</view>
											<view class="row_bil1 .rowys3">{{ i.price }}</view>		
							<view class="row_bil1 " :class="i.rise[0] !== '-' ? 'rowys2' : 'rowys1'">{{ i.rise }}%</view>
					
							
					
					</view>
								<DataIsnull v-if="data.length==0" />
				</view>
	
			</view>
			<view class="but" v-if="Istab==2" >
				<view class="th">
					<view class='td2'>
						<view>题材 <image src="../../static/optian/mc.png"></image>
						</view>
					</view>
				
					<view class='td1 ' @click="datasortwo()">
						<view class=".end">
							涨跌幅
							<image src="../../static/optian/jt.png" mode=""></image>
						</view>
					</view>
				</view>
			
				<view class="row-auto">
					<view class="row" v-for="(i, k) in data" :key="k" @click="handleItemClick(i)">
					
							<view class="row_bil2 ">{{ i.businessName }}</view>
											
							<view class="row_bil1 " :class="i.rise[0] !== '-' ? 'rowys2' : 'rowys1'">{{ i.rise }}%</view>
					
							
					
					</view>
					<DataIsnull v-if="data.length==0" />
				</view>
			
					
			</view>
		</view>

	</view>
</template>

<script>
import DataIsnull from "../../components/DataIsnull/DataIsnull.vue"
import {getStorageSync,setStorageSync} from "../../utils/index.js"
import { getOptionalList} from "../../api/mairui.js"
export default{
	data(){
		return {
			Istab :1,
			data:[
			
				
			
			
			],
			sorthometwo:true,
			sorthome :true,
			openid:getStorageSync("userInfo").openid,
			
			
		}
	},
	components:{
		DataIsnull
	},
	mounted(){
	
		this.datasortwo()
		
		this.getOptionalList()
	},
	onShow(){
		this.getOptionalList()
	},
	methods:{
		handleItemClick(item){
		  uni.navigateTo({
		    url: `/pages/hot-topic/detail/index?id=${item.businessId}`
		  })
		},
	 	setIstab(i){
			this.Istab = i
			this.getOptionalList()
		},
		datasortwo() {
			if (this.sorthometwo) {
				this.data.sort((a, b) => {
				
				
					return a.rise> b.rise ? 1 : -1
		
				})
			}
			else {
				this.data.sort((a, b) => {
		
					return a.rise > b.rise ? -1 : 1
		
				})
			}
			this.sorthometwo= !this.sorthometwo
		},
		datasort  () {
			if (this.sorthome) {
		
				this.data.sort((a, b) => {
		
					return Number(a.price) > Number(b.price) ? 1 : -1
		
				})
			}
			else {
		
				this.data.sort((a, b) => {
		
					return Number(a.price) > Number(b.price) ? -1 : 1
		
				})
			}
			this.sorthome = !this.sorthome
		
		},
		 getOptionalList(){
			
			this.data=[]
			getOptionalList(this.Istab,this.openid).then(res=>{
				this.data=res
				console.log(res);
			})
			
		}
		,
		goseach(){
			wx.navigateTo({
				url:"../search/index"
			})
		}
		
	}
}	
	













</script>

<style lang="less" scoped>
@top: 2.2em;

.stat{

}
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
	transform: translate(-50%, -50%);
	top: 50%;

}

.top {
	.flex-sbtre();

	width: 100vw;
	height: 18vh;
	position: relative;

	image {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.top_left {
		position: relative;

		.top_left_img {

			.poctenr();
			width: 60%;
			height: 60%;
		}

		.top_leftspan {


			position: absolute;
			font-size: .6rem;
			right: -1vh;
			top: -1vh;
			color: #FFFFFF;
			width: 2.5vh;
			height: 2.5vh;
			.center();
			background: #EE7F30;
			border-radius: 50%;

		}
	}

	.top_cent {
		width: 35vw;
		height: 5vh;
		margin-top: @top;
		border: 1rpx solid #FFFFFF;
		border-radius: 10rpx;
		.flex-sbtre();

		.top_centbt {
			font-size: 1rem;
			height: 100%;
			.center();
		}
	}

	.but {
		width: 100vw;
		height: 75vh;
		
		background: #FFFFFF;
		border-radius: .5em .5em 0 0;
		position: absolute;
		top: 16.5vh;
		padding-top: 2em;
		
		.row-auto{
			width: 100%;
			height: 100%;
			overflow: auto;
			.row {
				width: 90%;
				height: 2em;
				font-size: 1em;
				margin: .5em auto;
				
				.flex-sbtre();
			
				.row_bil2 {
					flex: 2;
					color: #232323;
				}
			
				.row_bil1 {
					flex: 1;
				}
			}
		}

	
		.th {
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
			height: 2em;
			position: absolute;
			top: 0;
			margin: .5em auto;
			font-size: .9em;
			color: #555555;
			border-bottom: 1rpx solid #Cccccc;
			background: #FFFFFF;
			.flex-sbtre();
			
			.td2 {
				.flex-start();
				flex: 2;
				height: 100%;

				view {

					position: relative;

					image {
						width: 1em;
						position: absolute;
						z-index: 999;
						height: 1em;
						right: -1.5em;
						top: 50%;
						transform: translateY(-50%);
					}
				}

			}

			.td1 {
				.flex-start();
				justify-content: start;
				position: relative;
				flex: 1;
				
				// text-align: center;
				view {
					

					position: relative;
					

					image {

						width: .8em;
						position: absolute;
						z-index: 999;

						height: .8em;
						right: -1em;
						top: 50%;
						transform: translateY(-50%);
					}
				}

			}
		}
	}

}

.left {
	width: 5vh;
	height: 5vh;

	border-radius: 50%;
	margin-left: 0.5em;
	background: rgba(255, 255, 255, .3);
	margin-top: @top;



}

.ys1 {
	flex: 1;
	background: none;
	color: #FFFFFF;
}

.ys2 {
	flex: 1;
	background: #FFFFFF;
	color: #FF2929;
}

.rowys1 {
	background: #4CA743;
	color: #FFFFFF;
	text-align: right;

}

.rowys2 {
	text-align: right;
	background: #FF2929;
	color: #FFFFFF;
}

.rowys3 {
	color: #4CA743;
}

.right {

	margin-right: 0.5em;
	width: 6vh;
	height: 6vh;

	border-radius: 50%;
	margin-left: 0.5em;

	margin-top: @top;
	position: relative;

	image {
		.poctenr();
		width: 70%;
		height: 65%;

	}
}

.end {
	width: 90%;
	text-align: right;

}
</style>
