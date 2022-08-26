<template>
	<sunton-main class="sunton-users-main" :options="{title: 'Wallet key connect'}">
		<view class="top top1 all-row">
			<view class="top-l all-row">
				<image src="/static/images/users/mj_user_icon02.png" mode="aspectFit"></image>
				<view class="top-l-title">Payment password:</view>
			</view>

			<input class="top-r" type="text" v-model="pwStr" placeholder="Please enter"
				placeholder-style="color:#6571BA" />

		</view>

		<view class="top top1 all-row">
			<view class="top-l all-row">
				<image src="/static/images/users/mj_user_icon02.png" mode="aspectFit"></image>
				<view class="top-l-title">Payment password:</view>
			</view>

			<input class="top-r" type="text" v-model="againPWStr" placeholder="Please enter again"
				placeholder-style="color:#6571BA" />

		</view>

		<view class="top top1 all-row">
			<view class="top-l all-row">
				<image src="/static/images/users/mj_user_icon03.png" mode="aspectFit"></image>
				<view class="top-l-title">Email number:</view>
			</view>

			<input class="top-r" style="width: 320rpx;" type="text" v-model="emailStr" placeholder="Please enter"
				placeholder-style="color:#6571BA" />

		</view>


		<view class="top top2">
			<view class="top-l all-row">
				<image src="/static/images/users/mj_user_icon04.png" mode="aspectFit"></image>
				<view class="top-l-title">Verification Code:</view>
			</view>

			<view class="top2-r all-row">
				<input type="number" v-model="codeStr" placeholder="Please enter" placeholder-style="color:#6571BA" />
				<view class="top2-r-r" @click="tapCode">Get verification code</view>
			</view>

		</view>


		<view class="bot all-row">
			<view class="bot-item bot-l" hover-class="bot-item-slt" @click="tapLinking">Linking</view>
			<view class="bot-item bot-r" hover-class="bot-item-slt" @click="tapCancel">cancel</view>
		</view>


	</sunton-main>
</template>

<script>
	export default {
		data() {
			return {
				// 1.密码
				pwStr: "",
				againPWStr: "",
				//2.邮件
				emailStr: "",
				//3.验证码
				codeStr: ""

			}
		},
		methods: {
			//1.用户昵称输入
			tapCode(e) {
				console.log("点击验证码");
			},
			//2.清除
			tapCancel() {
				console.log("取消了");
			},
			//3.提交
			tapLinking() {
				console.log("绑定了");
			},
			
		}
	}
</script>

<style lang="scss">
	@import "../../../static/css/mj_common.css";

	.sunton-users-main {
		background-image: url("../../../static/images/users/user_mj_bg.png");
		background-position: left top;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.top {
		width: 690rpx;
		border-radius: 15rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin: 30rpx 30rpx 0 30rpx;
		background-color: #192C73;
	}

	.top1 {
		height: 122rpx;
		align-items: center;
		justify-content: space-between;
	}

	.top2 {
		line-height: 122rpx;
	}

	.top-l {
		align-items: center;
	}

	.top-l image {
		width: 82rpx;
		height: 82rpx;
	}

	.top-l-title {
		font-size: 30rpx;
		color: #fff;
		margin-left: 20rpx;
	}

	.top-r {
		align-items: center;
		width: 255rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		margin-right: 30rpx;

		/deep/.uni-input-wrapper {
			.uni-input-input {
				color: #fff !important;
			}
		}

	}

	.top2-r {
		align-items: center;
		justify-content: space-between;

		/deep/.uni-input-wrapper {
			.uni-input-input {
				color: #fff !important;
			}
		}

		padding-bottom: 20rpx;
	}

	.top2-r input {
		background-color: #141D5B;
		border-radius: 15rpx;
		line-height: 110rpx;
		height: 110rpx;
		line-height: 110rpx;
		width: 384rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}

	.top2-r-r {
		width: 246rpx;
		line-height: 38rpx;
		color: #6571BA;
		font-size: 28rpx;
		box-sizing: border-box;
		padding: 15rpx 30rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.2);
		background-color: #273B88;
		text-align: center;
		border-radius: 15rpx;

	}
	
	.bot{
		position: fixed;
		z-index: 10;
		margin: 0 30rpx;
		width: 690rpx;
		align-items: center;
		justify-content: space-between;
		// bottom: constant(safe-area-inset-bottom);
		bottom: calc(constant(safe-area-inset-bottom) + 30rpx);;
		bottom: calc(env(safe-area-inset-bottom) + 30rpx);
	}

	.bot-item {
		text-align: center;
		width: 340rpx;
		line-height: 98rpx;
		height: 98rpx;
		border-radius: 49rpx;
		
		color: #FFFFFF;
		font-size: 30rpx;
	}
	.bot-l{
		background: linear-gradient(180deg, #44b5ff 0%, #f55686 100%);
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06);
	}
	.bot-r{
		background: rgba(255, 255, 255, 0.1);
		border: 2rpx solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06);
		box-sizing: border-box;
	}
	.bot-item-slt{
		// zoom: 0.95;
		color: gray;
	}
</style>
