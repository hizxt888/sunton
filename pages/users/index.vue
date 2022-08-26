<template>
	<sunton-main class="sunton-users-main" :options="{background: 'transparent', is_left: false}">
		<view class="navRight" @click="tapSet" slot="right" style="margin-right: 20rpx;width: 50rpx;height:50rpx;">
			<view class="iconfont icon-shezhi"></view>
		</view>

		<view class="sunton-container">
			<view class="sunton-user-info">
				<image model="aspectFit" :src="utils.domainImageUrl(userModel.cover_url, '../../static/images/users/avatar.png')"></image>
				<view class="user-info">
					<view class="user-name" v-if="userModel.user_id">{{userModel.nickname}}</view>
					<navigator v-else url="/pages/login/index" hover-class="none">
						{{$t('users.nologin')}}
					</navigator>
					<view class="user-id">ID: {{ userModel.invite_code || ''}}</view>
				</view>
			</view>

			<view class="sunton-user-item">
				<navigator hover-class="none" url="/pages/users/wallet/index" class="item-row">
					<image src="../../static/images/users/item1.png"></image>
					<view>{{ $t('users.tip1') }}</view>
				</navigator>

				<navigator hover-class="none" url="/pages/users/product/index" class="item-row">
					<image src="../../static/images/users/item2.png"></image>
					<view>{{ $t('users.tip2') }}</view>
				</navigator>

				<navigator hover-class="none" url="/pages/users/wallet/logs" class="item-row">
					<image src="../../static/images/users/item4.png"></image>
					<view>{{ $t('users.tip3') }}</view>
				</navigator>
			</view>

			<view class="sunton-group" style="margin-top: 30rpx;">
				<u-cell isLink size="large" :border="false" :title="$t('users.tip4')" url="/pages/users/team/index" icon="../../static/images/users/item3.png" />
				<u-cell isLink size="large" :border="false" :title="$t('users.tip5')" url="/pages/users/whitepaper/index" icon="../../static/images/users/item5.png" />
				<u-cell isLink size="large" :border="false" :title="$t('users.tip6')" url="/pages/users/questions/index" icon="../../static/images/users/item6.png" />
				<u-cell isLink size="large" :border="false" :title="$t('users.tip7')" url="/pages/users/switchLanguage/switchLanguage" icon="../../static/images/users/10932.png" />
			</view>
		</view>
	</sunton-main>
</template>

<script>
	import userModel from "../../utils/userModel";
	export default {
		data() {
			return {
				userModel: {},

			};
		},

		onLoad() {
			this.$set(this, 'userModel', userModel.getUserModel());


		},
		methods: {
			//1.设置
			tapSet() {
				uni.navigateTo({
					url: '/pages/users/personal/index'
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	@import "../../static/css/mj_common.css";

	.sunton-users-main {
		background-image: url("../../static/images/users/bg.png");
		background-position: left top;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.sunton-user-info {
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
		flex-wrap: wrap;

		image {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
		}

		.user-info {
			width: calc(100% - 220rpx);
			height: auto;
			text-align: left;

			.user-name {
				font-size: 46rpx;
				font-weight: 400;
			}

			navigator {
				font-size: 46rpx;
				font-weight: 400;
			}
		}

	}

	.user-id {
		margin-top: 20rpx;
		font-size: 24rpx;
		font-weight: 300;
		color: rgba(255, 255, 255, 0.6);
	}

	.sunton-user-item {
		height: auto;
		border-radius: 20rpx;
		background: #192c73;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;

		.item-row {
			width: auto;
			height: auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;

			image {
				width: 100rpx;
				height: 100rpx;
			}

			view {
				text-align: center;
			}
		}


	}

	.icon-shezhi {
		font-size: 40rpx;
		margin: 5rpx;
	}
</style>
