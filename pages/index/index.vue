<template>
	<sunton-main v-if="userModel.token" class="sunton-index-main"
		:options="{is_left: false, background: 'transparent'}">
		<view class="sunton-container" style="margin-bottom: 50rpx;">
			<view class="sunton-index-header">
				<view class="number-list">
					<view class="item" v-for="vo in yrcurrentArr">{{vo}}</view>
				</view>
				<view style="line-height: 60rpx;">{{$t('index.tip1')}}</view>
			</view>

			<view class="sunton-flex-between" style="margin-top: 50rpx; flex-shrink: 0;">
				<view class="sunton-index-card-item">
					<image mode="widthFix" src="../../static/images/index/tip2.png"></image>
					<view>
						<view>{{utils.isset(utils.isset(walletModel, 'cv', []), 'money', 0)}}</view>
						<view class="tip-line">{{$t('index.tip2')}}</view>
					</view>
				</view>

				<view class="sunton-index-card-item">
					<image mode="widthFix" src="../../static/images/index/tip1.png"></image>
					<view>
						<view>{{utils.isset(sdpModel, 'now', 0)}}</view>
						<view class="tip-line">{{$t('index.tip3')}}</view>
					</view>
				</view>
			</view>

			<view class="sunton-round">
				<view class="sunton-round-image" v-for="(row, index) in avatarList" :key="index">
					<image :src="row.url" mode="widthFix" @click="handleAvatarClick(row.category_id)"></image>
				</view>
				<view style="width: 503rpx; height:503rpx;">
					<image mode="widthFix"
						style="width: 513rpx;height: 513rpx; opacity: 0.8; position: absolute; top: 0; left: 0; z-index: 1;"
						src="../../static/1.png"></image>
					<view id="echart" class="gl">
						<!-- style="width: 478rpx; height:478rpx; position: absolute; top: 8px; left: 8px;" -->
					</view>
				</view>
				<view class="center">
					<!-- <view style="font-size: 32rpx;">USDP</view> -->
					<!-- <view style="line-height: 80rpx; font-size: 32rpx;"> -->
						<!-- {{utils.isset(utils.isset(walletModel, 'usdp', []), 'money', 0)}}</view> -->
					<!-- <view class="round-bu">+{{randModel}}%</view> -->
				</view>
			</view>

			<scroll-view scroll-x>
				<view class="sunton-index-scroll">
					<navigator hover-class="none" class="scroll-item" url="/pages/shares/index">
						<view class="scroll-item-title">{{ $t('index.tip8') }}</view>
						<image class="scroll-item-image" src="../../static/images/index/scroll-item-3.png"></image>
						<view class="scroll-item-content">{{ $t('index.tip9') }}</view>
						<!--            <view class="scroll-item-desc">{{ $t('index.tip10') }}</view>-->
					</navigator>
					
					<navigator hover-class="none" class="scroll-item" url="/pages/goods/index">
						<view class="scroll-item-title">{{ $t('index.tip6') }}</view>
						<image class="scroll-item-image" src="../../static/images/index/scroll-item-2.png"></image>
						<view class="scroll-item-content">{{ $t('index.tip4') }}</view>
						<!--            <view class="scroll-item-desc">{{ $t('index.tip7') }}</view>-->
					</navigator>
					
						<navigator hover-class="none" class="scroll-item" url="/pages/community/index">
							<view class="scroll-item-title">{{ $t('community.sub.tip1') }}</view>
							<image class="scroll-item-image" src="../../static/images/index/scroll-item-1.png"></image>
							<view class="scroll-item-content">{{ $t('community.title') }}</view>
							<!--            <view class="scroll-item-desc">{{ $t('community.sub.tip2') }}</view>-->
						</navigator>
					
					
				</view>
			</scroll-view>
			<!--      <view class="sunton-flex-between" style="padding-bottom: 30rpx; margin-top: 60rpx;">-->
			<!--        <view style="font-size: 40rpx;">{{$t('index.tip4')}}</view>-->
			<!--        <navigator hover-class="none" class="goods-more" url="/pages/goods/index">{{$t('index.tip5')}}</navigator>-->
			<!--      </view>-->
			<!--      <goods-recommended></goods-recommended>-->
		</view>
	</sunton-main>
</template>

<script>
	import userModel from "../../utils/userModel";
	import GoodsRecommended from '../goods/components/goods-recommended';
	export default {
		components: {
			GoodsRecommended,
		},

		data() {
			return {
				inter: null,
				roundNumberInterval: null,
				userModel: {},
				sdpModel: {},
				walletModel: {},
				randModel: ((Math.random() * 800 + 100) / 100).toFixed(2),
				statTotalCount: 0,
				endTotalCount: 500,
				avatarList: [],
				yrStartNumber: 0,
				yrstatTotalCount: 0,
				yrendTotalCount: 0,
				yrendTotalCountArr: [],
				yrcurrentArr: [],
			}
		},

		onLoad() {
			this.userModel = userModel.getUserModel();
			if (typeof this.userModel.token === "undefined" || !this.userModel.token) {
				uni.reLaunch({
					url: '/pages/login/index'
				});
				return;
			}
			uni.preloadPage({
				url: "/pages/users/index"
			});

			console.log(this.yrStartNumber)

			var self = this;
			self.sdpStart();
			self.roundNumberStart();
			(async function() {
				
				var categoryMap = {
					1: 0,
					2: 2,
					3: 1,
				};
				
				for (var index = 1; index <= 3; index += 1) {
					self.avatarList.push({
						category_id: categoryMap[index],
						url: `../../static/Earth${index}.png`,
					});
					await self.utils.sleep(12000 / 3);
				}
			})();
		},

		onShow() {
			this.getWallet();
		},

		onUnload() {
			clearInterval(this.roundNumberInterval);
		},

		methods: {
			handleAvatarClick(index) {
				uni.navigateTo({
					url: `/pages/goods/index?category_index=${index}`
				});
			},

			getWallet() {
				this.utils.httpRequest('/api/users/wallet', res => {
					this.$set(this, 'walletModel', res.data.wallet || {});
				});
			},

			sdpStart() {
				var self = this;
				self.utils.httpRequest('/api/users/wallet/sdp', res => {
					self.$set(self, 'sdpModel', res.data || {});
					setInterval(() => {
						self.$set(self.sdpModel, 'now', (parseFloat(self.sdpModel.now) + parseFloat(self
							.sdpModel.second)).toFixed(10));
					}, 1000);
				});
			},

			roundNumberStart() {
				this.getCVData();
				setInterval(() => this.getCVData(), 5 * 60 * 1000);
			},


			getCVData() {
				var self = this;
				self.utils.httpRequest('/api/get-round-number', res => {
					self.yrstatTotalCount = parseInt(res.data.number);
					self.handleCurrentArray(this.yrstatTotalCount);
					self.roundNumberInterval = setInterval(() => {
						self.yrstatTotalCount += parseInt(res.data.setup) / 1000;
						self.handleCurrentArray(self.yrstatTotalCount);
					}, 1);
				});
			},

			handleCurrentArray(number) {
				this.yrStartNumber = parseInt(number);
				this.yrcurrentArr = this.yrStartNumber.toString().split('');
				let num = 12 - this.yrcurrentArr.length;
				for (let j = 0; j < num; j++) {
					this.yrcurrentArr.unshift(0);
				}
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	// import * as echarts from 'echarts';
	// import 'echarts-gl';
	// export default {
	// 	mounted() {
	// 		var chartDom = document.getElementById('echart');
	// 		var myChart = echarts.init(chartDom);
	// 		var option;
	// 		option = {
	// 			globe: {
	// 				baseTexture: './static/Earth.png',
	// 				shading: 'color',
	// 				atmosphere: {
	// 					show: true
	// 				},
	// 				light: {
	// 					ambient: {
	// 						intensity: 0.1
	// 					},
	// 					main: {
	// 						intensity: 1.5
	// 					}
	// 				},
	// 				layers: [{
	// 					type: 'overlay',
	// 					texture: './static/Clouds.png',
	// 					shading: 'lambert',
	// 					distance: 2
	// 				}]
	// 			},
	// 			series: []
	// 		};
	// 		option && myChart.setOption(option);
	// 	}
	// }
</script>
<style scoped lang="scss">
	// 
	.gl{
		width:434rpx;
		height:434rpx;
		position: absolute;
		top:20px;
		left:20px;
		background-image:url(../../static/Earth.png);
		background-size: cover;
		animation: rotate 120s infinite linear;
		border-radius: 50%;
		overflow: hidden;
	}
	@keyframes rotate {
	  0% {
	    background-position: 2500px 0px;
	  }
	  100% {
	    background-position: 0px 0px;
	  }
	}
	// 
	@keyframes backgroundRound {
		0% {
			transform: rotate(360deg) translateY(260rpx);
		}

		100% {
			transform: rotate(0deg) translateY(260rpx);
		}
	}

	.number-list {
		width: 95%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.item {
			width: 42rpx;
			height: 60rpx;
			border-radius: 8rpx;
			background: linear-gradient(135deg, #44b5ff 0%, #f55686 100%);
			border: 2rpx solid rgba(255, 255, 255, 0.3);
			box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.16);
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	}
	
	.sunton-index-main {
		width: 100%;
		height: 100%;
		background-image: url("../../static/images/index/bg.png");
		background-position: left top;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-attachment: fixed;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.sunton-index-header {
		height: auto;
		border-radius: 40rpx;
		background: linear-gradient(90.00deg, rgba(99, 176, 254, 0.3) 0%, rgba(255, 104, 123, 0.3) 100%);
		border: 4rpx solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30rpx 0 30rpx 0;
	}

	.sunton-index-card-item {
		width: calc(50% - 50rpx);
		height: auto;
		border-radius: 20rpx;
		padding: 20rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-shrink: 0;
		overflow: hidden;

		image {
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}

		.tip-line {
			height: 40rpx;
			line-height: 40rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
			opacity: 0.5;
		}
	}

	.sunton-index-card-item:first-child {
		background: linear-gradient(180.00deg, rgba(99, 176, 254, 0.3) 0%, rgba(24, 10, 67, 0.2) 100%);
	}

	.sunton-index-card-item:last-child {
		background: linear-gradient(180.00deg, rgba(255, 104, 123, 0.3) 0%, rgba(24, 10, 67, 0.2) 100%);
	}

	.sunton-round {
		width: 500rpx;
		height: 500rpx;
		margin: 150rpx auto 150rpx auto;
		border-radius: 50%;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		flex-shrink: 0;
		flex-wrap: wrap;
		position: relative;

		.sunton-round-image {
			width: 150rpx;
			height: 150rpx;
			text-align: center;
			line-height: 150rpx;
			border-radius: 50%;
			background: transparent;
			position: absolute;
			z-index: 2;
			transform: rotate(0deg) translateY(260rpx);
			animation-iteration-count: infinite;
			animation-name: backgroundRound;
			animation-duration: 12s;
			animation-timing-function: linear;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.center {
			width: 100%;
			height: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			flex-shrink: 0;
			flex-wrap: wrap;
			position: absolute;
			z-index: 2;

			.round-bu {
				width: auto;
				min-width: 100rpx;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 20rpx;
				padding: 0 20rpx 0 20rpx;
				text-align: center;
				background: linear-gradient(179.80deg, #44b5ff 0%, #f55686 100%);
				box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.16);
			}
		}
	}

	.sunton-index-scroll {
		display: inline-flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-shrink: 0;
		flex-wrap: nowrap;

		.scroll-item {
			width: 240rpx;
			height: auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
			background: rgba(27, 51, 121, 0.6);
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
			margin-right: 20rpx;
			padding: 20rpx;

			.scroll-item-title {
				opacity: 0.5;
				font-size: 30rpx;

			}

			.scroll-item-image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				margin: 20rpx auto 20rpx auto;
			}

			.scroll-item-content {
				font-size: 32rpx;
			}

			.scroll-item-desc {
				opacity: 0.5;
				font-size: 30rpx;
			}
		}
	}

	.goods-more {
		width: auto;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		border: 2px solid #ffc929;
		color: #ffc929;
		text-align: center;
		padding: 0 10px 0 15rpx;
	}
</style>
