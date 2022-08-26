<template>
	<sunton-main class="share-main">
			  <u-swiper
					style="margin-top: 20rpx;"
					:list="imageList"
					previousMargin="30"
					nextMargin="30"
					circular
					:autoplay="false"
					radius="5"
					bgColor="transparent"
					height="70vh"
					@change="swiperChange"></u-swiper>
				
			<view class="sunton-container" style="margin-top: 20rpx;">
				<view class="action-body">
					<view class="save-button"  @click="saveImage">{{$t('Save')}}</view>
					<view class="share-href">{{configModel.register_url}}</view>
					<view class="save-button">{{$t('Copy link address')}}</view>
				</view>
			</view>
			<canvas canvas-id="canvas" class="canvas-style" ref="canvas"></canvas>
	</sunton-main>
</template>


<script>
	import Qrcode from 'qrcode';
    export default {
        data() {
            return {
				configModel: {},
				show: {index: 0},
				imageList: [
					require(`./assets/images/${this.$i18n.locale}1.png`),
					require(`./assets/images/${this.$i18n.locale}2.jpg`),
					require(`./assets/images/${this.$i18n.locale}3.jpg`),
                ],
				imagePosition: [
					[120, 120],
					[120, 120],
					['center', 200],
				],
            }
        },
		
		onLoad() {
			uni.showLoading();
			this.utils.httpRequest('/api/team/configs', res => {
				res.data.register_url += "?invite_code=" + res.data.invite_code;
				this.$set(this, 'configModel', res.data || {});
			});
		},
		
		methods: {			
			swiperChange(event) {
				this.show.index = event.current;
			},
			
			async saveImage() {
				uni.showLoading();
				var ctx = uni.createCanvasContext("canvas");
				const {windowWidth, windowHeight} = uni.getSystemInfoSync();
				await this.drawImage(ctx, this.imageList[this.show.index], 0, 0, windowWidth, windowHeight)
				await Qrcode.toDataURL(this.configModel.register_url, {}, async (error, url) => {
					
					var position = this.imagePosition[this.show.index];
					var left = position[0];
					if(left === 'center') {
						left = (windowWidth  - 100) / 2;
					} else {
						left = windowWidth - left;
					}
					
					await this.drawImage(ctx, url, left, windowHeight - position[1], 100, 100);
					uni.canvasToTempFilePath({
						width: windowWidth,
						height: windowHeight,
						canvasId: ctx.id,
						success(res) {
							// #ifdef APP-PLUS
							uni.saveFile({
								url: res.tempFilePath,
								success() {
									uni.showToast('success');
								},
							});
							// #endif
							
							// #ifdef H5
							console.log(res.tempFilePath)
							// #endif
						},
					});
				});
				uni.hideLoading();	
			},
			
			
			async drawImage(cxt, url, left, top, width, height) {
				return new Promise((resolve, reject) => {
					cxt.drawImage(url, left, top, width, height);
					cxt.draw(true, () => {
						resolve();
					});
				});
			},
			
		}
		
		
		
		
		
		
    }
</script>

<style scoped>
	.canvas-style{
		position: fixed;
		z-index: -200;
		width: 100vw;
		height: 100vh;
	}
	
	.share-main{
		background-image: url("@/pages/shares/assets/images/bg.png");
		background-position: left top;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
	
	
	.action-body{
		flex: 1;
		padding: 10rpx;
		border-radius: 20rpx;
		width: auto;
		height: 25vh;
		background: rgba(29, 43, 108, 0.4);
		border: 1rpx dashed #808080;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.save-button{
		width: 90%;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background: rgba(44, 58, 131, 0.4);
		border: 1rpx solid rgba(255, 255, 255, 0.4);            
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
		border-radius: 30rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
	
	.share-href{
		width: 90%;
		height: 60rpx;
		line-height: 60rpx;
		background: rgba(22, 28, 90, 0.5);
		border-radius: 30rpx;
		text-align: center;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
	
</style>