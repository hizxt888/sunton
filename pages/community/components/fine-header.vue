<template>
  <view class="sunton-group-top20">
    <view class="sunton-flex-between" style="width: 100%;">
      <view style="font-size: 38rpx;">{{model.title}}</view>
      <view>{{ model.create_time }}</view>
    </view>

    <view style="width: 100%;">
      <view class="sunton-common-action-button" style="width: auto; margin-top: 10rpx;">
        {{ $t('community.tip2') }}
      </view>
    </view>


    <view style="margin: 30rpx 0 30rpx 0;color:#8ba6dc">
      {{ model.content }}
    </view>
    <view class="fine-image-group">
      <u-album :urls="model.images"></u-album>
    </view>
  </view>
</template>

<script>
export default {
	props: {
		model: {
			type: Object,
			default: () => {
				return {};
			}
		}
	}
};
</script>

<style scoped lang="scss">
.official-image {
	width: 100%;
	height: auto;
	border-radius: 20rpx;
	margin-top: 40rpx;
}
.official-fine-post,
.sunton-common-action-button{
	width: auto;
  max-width: 180rpx;
	height: 44rpx;
	line-height: 44rpx;
	border-radius: 5rpx;
	padding: 0 10rpx;
	background: linear-gradient(180deg, #f0555a 0%, #ffa153 100%);
}
.official-fine-post:active {
	opacity: 0.8;
}

.fine-image-group{
  width: 100%;
  height: auto;
  image{
    width: calc(33.33% - 10rpx);
    margin-left: 5rpx;
    margin-right: 5rpx;
    margin-bottom: 10rpx;
  }
}
</style>
