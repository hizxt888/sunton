<template>
	<sunton-main class="sunton-users-main" :options="{title: $t('switchLanguage.tip1'), isCheckLogin: false}">
		<view class="mc-con">
			<view class="mc-top">{{ $t('switchLanguage.tip2') }}</view>
			<view class="mc-mid">
				<block v-for="(item,index) in languageList" :key="index">
					<view class="mc-mid-l-item com-text-one" @click="switchLanguage(index)"
						:style="{color:(language== index)?'#fff':'#7490FF'}">{{item}}</view>
				</block>
			</view>
		</view>

    <view class="sunton-footer" style="height: 130rpx; background-color: #3B418F;">
      <view class="sunton-container" style="margin-top: 15rpx;">
        <view class="sunton-button" @click="submitLanguage">{{ $t('switchLanguage.tip3') }}</view>
      </view>
    </view>
	</sunton-main>
</template>

<script>
	export default {
		data() {
			return {
        languageList: {},
        language: this.$i18n.locale,
			}
		},

    onLoad() {
      var languageList = {};
      for(var index in this.$i18n.messages) {
        languageList[index] = this.$i18n.messages[index].language;
      }
      this.languageList = languageList;
    },

		methods: {
      switchLanguage(language) {
        this.language = language;
			},

      submitLanguage() {
        uni.setStorageSync('languageStorage', this.language);
        //#ifdef APP-PLUS
        plus.runtime.restart();
        //#endif
        // #ifdef H5
        window.location.reload();
        //#endif
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

	.mc-con {
		background-color: #141D5B;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
    padding-bottom: 200rpx;
	}

	.mc-top {
		padding: 20rpx 30rpx;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx solid rgba(255, 255, 255, 0.3);
		height: 71rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
	}


	.mc-mid {
		width: 100%;
		overflow: scroll;
		background-color: #192C73;
		padding: 20rpx;
		box-sizing: border-box;
		justify-content: space-between;
	}



	.mc-mid-l-item {
		width: 100%;
		font-size: 30rpx;
		line-height: 80rpx;
		height: 80rpx;
		text-align: center;
	}

	.submitBtn {
		text-align: center;
		line-height: 98rpx;
		height: 98rpx;
		border-radius: 49rpx;
		background: linear-gradient(180deg, #44b5ff 0%, #f55686 100%);
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06);
		color: #FFFFFF;
		margin: 30rpx;
		font-size: 30rpx;
	}

	.submitBtn-slt {
		color: gray;
	}
</style>
