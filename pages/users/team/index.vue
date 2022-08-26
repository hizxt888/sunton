<template>
	<sunton-main :options="{title: $t('users.team.title')}">
		<view slot="right" @click="tapShowMC" class="header-right">{{$t('Invitation')}}</view>

		<view class="sunton-container-mj">
			<view class="sunton-common-item-mj">
				<view class="item-body">
					<view class="sunton-flex-between" style="width: 100%; margin-bottom: 30rpx;">
						<view
                @click="weekClick(0)"
                :class="{
                  'sunton-button-mj': !show.weekIndex,
                  'sunton-button1-mj': show.weekIndex,
                }"
                style="width: calc(50% - 20rpx)">
              {{$t('users.team.tip2')}}
            </view>

						<view
                @click="weekClick(1)"
                :class="{
                  'sunton-button-mj': show.weekIndex,
                  'sunton-button1-mj': !show.weekIndex,
                }"
                style="width: calc(50% - 20rpx)">{{$t('users.team.tip3')}}</view>
					</view>

					<view class="mj-cc all-row">
						<view class="item-body-center" :style="{
              background: `conic-gradient(from ${showWallet.wallet_cv_rate * 3.6}deg at 50.00% 50.00%, rgba(61, 216, 245, 0.2) 0%, #2297f8 100%)`
						}">
							<view></view>
						</view>
						<!-- <image @click="tapShowMC" src=c"/static/images/users/user_mj_share.png" mode="aspectFit"></image> -->
					</view>

					<view class="pro-bg-mj all-row">
						<image class="pro-bg-mj-l" src="/static/images/users/user_mj_icon09.png" mode="aspectFit"></image>
						<view class="pro-bg-mj-r all-row">
							<view class="mj-r-reputation">
                {{$t('users.team.tip4')}}: {{showWallet.wallet_cv}}
              </view>

							<view class="mj-r-process">
								<view class="mj-r-content" :style="{width: `${showWallet.wallet_cv_rate}%`}"></view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="sunton-common-item-mj">
				<view class="item">
					<view class="item-t all-row">
						<image src="/static/images/users/user_mj_icon08.png" mode="aspectFit"></image>
						<view class="item-t-title">{{$t('users.team.title1')}}</view>
					</view>

					<view class="item-con-bg">
						<view class="item-con com-text-two">{{configModel.instruction1}}</view>
					</view>
				</view>

				<view class="item-bot all-row">
					<navigator hover-class="none" class="item-bot-btn" url="/pages/users/teamDetail/teamDetail?code=1">
            {{ $t('users.team.tip5') }}
          </navigator>
				</view>
			</view>

			<view class="sunton-common-item-mj">
				<view class="item">
					<view class="item-t all-row">
						<image src="/static/images/users/user_mj_icon08.png" mode="aspectFit"></image>
						<view class="item-t-title">{{$t('users.team.title2')}}</view>
					</view>
					<view class="item-con-bg">
						<view class="item-con com-text-two">{{configModel.instruction2}}</view>
					</view>
				</view>

				<view class="item-bot all-row">
          <navigator hover-class="none" class="item-bot-btn" url="/pages/users/teamDetail/teamDetail?code=2">
            {{ $t('users.team.tip5') }}
          </navigator>
				</view>
			</view>
		</view>

		<!-- 分享蒙层 -->
		<view class="mc all-col" v-if="showMC">
			<view class="mc-con all-col">
				<image
            class="mc-con-close"
            @click="tapColseMC"
            src="/static/images/users/user-mj-close.png"
            mode="aspectFit"></image>
				<view class="mc-con-a">{{ $t('users.team.tip7') }}</view>
				<view class="mc-con-code">
					<view class="mc-con-codeImg">
            <uqrcode ref="uQRCode" :text="configModel.register_url"></uqrcode>
					</view>
				</view>

				<view class="mc-save" @click="tapSave">{{ $t('users.team.tip8') }}</view>
				<image class="mc-bar" src="/static/images/users/user-mj-bar.png" mode="aspectFill"></image>
				<view class="mc-url com-text-one">{{configModel.register_url}}
				</view>
				<view class="mc-copy" @click="tapCopy">{{ $t('users.team.tip9') }}</view>
			</view>
		</view>
	</sunton-main>
</template>

<script>
	import userModel from "../../../utils/userModel";

  export default {
		data() {
			return {
        userModel: {},
        showWallet: {},
        configModel: {},
        walletModel: {},
        show: {weekIndex: false},
				showMC: false,
			}
		},

    onLoad() {
      this.userModel = userModel.getUserModel();
      this.utils.httpRequest('/api/team/configs', res => {
        res.data.register_url += "?invite_code=" + this.userModel.invite_code;
        this.$set(this, 'configModel', res.data || {});
      });
    },

    onShow() {
      this.utils.httpRequest('/api/users/wallet', res => {
        this.$set(this, 'walletModel', res.data || {});
        this.weekClick(false);
      });
    },

		methods: {
      weekClick(index) {
        if(index !== false)
        {
          if(this.show.weekIndex === index) {
            return;
          }
          this.$set(this.show, 'weekIndex', ! this.show.weekIndex);
        }

        var showWallet = {};
        showWallet.wallet_cv_time = 300000;
        showWallet.wallet_cv = this.utils.isset(this.walletModel, 'wallet_cv_week', 0);
        if(this.show.weekIndex) {
          showWallet.wallet_cv_time = 1000000;
          showWallet.wallet_cv = this.utils.isset(this.walletModel, 'wallet_cv_month', 0);
        }

        if(showWallet.wallet_cv >= showWallet.wallet_cv_time) {
          showWallet.wallet_cv_rate = (showWallet.wallet_cv_time / showWallet.wallet_cv_time) * 100;
        } else {
          showWallet.wallet_cv_rate = (showWallet.wallet_cv / showWallet.wallet_cv_time) * 100;
        }
        this.$set(this, 'showWallet', showWallet);
      },

      tapSave() {
        var self = this;
        self.$refs.uQRCode.toTempFilePath({
          success: res => {
            self.tapColseMC();
            // #ifdef APP-PLUS
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                uni.showToast({title: self.$t("users.team.tip11"), icon: 'none'});
              }
            });
            // #endif
          }
        })
      },

			tapNavRight(){
				uni.navigateTo({
					url:"/pages/users/rankingList/rankingList"
				})
			},

			tapItem(e) {
				uni.navigateTo({
					url: "/pages/users/teamDetail/teamDetail"
				})
			},

			tapShowMC() {
				this.showMC = true;
			},

			tapColseMC() {
				this.showMC = false;
			},

			tapCopy() {
        var self = this;
				uni.setClipboardData({
					data: self.configModel.register_url,
					success: function(res) {
						uni.showToast({title: self.$t('users.wallet.deposit.tip8'), icon: "none"})
					}
				})
				this.tapColseMC();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../../static/css/mj_common.css";

	.header-right {
		height: 50rpx;
		line-height: 46rpx;
		text-align: center;
		border-radius: 25rpx;
		background: transparent;
		padding: 0 22rpx;
		font-size: 24rpx;
		border: 2rpx solid rgba(255, 255, 255, 0.3);
		box-sizing: border-box;
	}

	.item-body {
		width: auto;
		height: auto;
		background: #141D5B;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;
		padding: 20rpx;

		.item-body-center {
			margin-left: 120rpx;
			width: 400rpx;
			height: 400rpx;
			border-radius: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			view {
				width: 250rpx;
				height: 250rpx;
				border-radius: 50%;
				background: #141d5b;
			}
		}
	}

	.content-body {
		height: auto;
		background-color: #141D5B;
		padding: 20rpx;
		border-radius: 20rpx;
	}

	.sunton-container-mj {
		width: 690rpx;
		margin: 30rpx;
	}

	.sunton-common-item-mj {
		border-radius: 20rpx;
		background: #192c73;
		border: 10rpx solid #192C7333;
		margin-bottom: 30rpx;

	}

	.sunton-button-mj {
		width: 100%;
		height: auto;
		min-height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		border-radius: 36rpx;
		background: linear-gradient(180deg, #44b5ff 0%, #f55686 100%);
		box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.06);
		color: #FFFFFF;
		font-size: 28rpx;
		margin: auto;
	}

	.sunton-button1-mj {
		width: 100%;
		height: auto;
		min-height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		border-radius: 36rpx;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06);
		margin: auto;
		box-sizing: border-box;
	}


	.pro-bg-mj {
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 0;
	}

	.pro-bg-mj-l {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}

	.pro-bg-mj-r {
		width: 530rpx;
		align-items: center;
		justify-content: space-between;
		height: 60rpx;
		line-height: 56rpx;
		border-radius: 30rpx;
		background: rgba(255, 255, 255, 0.1);
		border: 2rpx solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 20rpx 20rpx rgba(0, 0, 0, 0.06);
		padding: 0 20rpx 0 20rpx;
		box-sizing: border-box;
	}

	.mj-r-reputation {
		color: #fff;
		font-size: 22rpx;
	}

	.mj-r-process {
    flex: 1;
		width: auto;
		max-width: 300rpx;
		height: 16rpx;
		border-radius: 8rpx;
		background-color: #141D5B;
    margin-left: 10rpx;
	}

	.mj-r-content {
		width: 0;
		height: 100%;
		border-radius: 8rpx;
		background: linear-gradient(180.00deg, #3dd8f5 0%, #2297f8 100%);
	}

	.mj-bar {
		width: 100%;
		height: 30rpx;
	}

	.item {
		background-color: #192C73;
		margin: 20rpx;
	}

	.item-t {
		align-items: center;
		margin-bottom: 20rpx;
	}

	.item-t image {
		width: 8rpx;
		height: 20rpx;
		margin-right: 20rpx;
	}

	.item-t-title {
		width: 590rpx;
		color: #fff;
		font-size: 28rpx;
		font-weight: 500;
		line-height: 50rpx;
	}

	.item-con-bg {
		border-radius: 20rpx;
		background-color: #141D5B;
		padding: 30rpx;
	}

	.item-con {
		color: #6571BA;
		font-size: 26rpx;
		line-height: 35rpx;
		height: 70rpx;
	}

	.item-bot {
		justify-content: flex-end;
	}

	.item-bot-btn {
		display: inline-block;
		padding: 15rpx 20rpx;
		border-radius: 31rpx;
		border: 1rpx solid #7490FF;
		margin: 0 20rpx 20rpx 0;
		font-size: 24rpx;
		color: #7490FF;
		font-weight: 500;
	}

	.mj-cc {
		width: 100%;
		position: relative;
	}

	.mj-cc image {
		width: 110rpx;
		height: 110rpx;
		position: absolute;
		right: 0;
	}

	//蒙层
	.mc {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.7);
		justify-content: center;
		align-items: center;
	}

	.mc-con {
		width: 600rpx;
		background-color: #192C73;
		border-radius: 20rpx;
		align-items: center;
		position: relative;
	}
.mc-con-close{
	position: absolute;
	width: 50rpx;
	height: 50rpx;
	right: 20rpx;
	top: 15rpx;
}
	.mc-con-a {
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		margin: 30rpx;
	}

	.mc-con-code {
		background-color: #141D5B;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.mc-con-codeImg {
		background-color: #fff;
		border-radius: 15rpx;
		padding: 20rpx;
	}

	.mc-con-codeImg image {
		width: 230rpx;
		height: 230rpx;
	}

	.mc-save {
		width: 310rpx;
		line-height: 72rpx;
		text-align: center;
		background: #273b88;
		border: 2rpx solid rgba(255, 255, 255, 0.2);
		border-radius: 20rpx;
		color: #6571BA;
		margin: 10rpx 0 30rpx 0;
		font-size: 30rpx;

	}

	.mc-url {
		width: 560rpx;
		padding: 0 15rpx;
		box-sizing: border-box;
		text-align: center;
		line-height: 80rpx;
		background: #141d5b;
		border: 1rpx solid #505f9c;
		border-radius: 20rpx;
		font: 30rpx;
		color: #6571BA;
	}

	.mc-copy {
		width: 560rpx;
		line-height: 72rpx;
		text-align: center;
		background: #273b88;
		border: 2rpx solid rgba(255, 255, 255, 0.2);
		border-radius: 20rpx;
		color: #fff;
		margin: 20rpx 0;
		font-size: 30rpx;

	}

	.mc-bar {
		margin-bottom: 20rpx;
		width: 100%;
		height: 2rpx;
	}
</style>
