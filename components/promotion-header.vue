<template>
  <view class="sunton-group-top20">
    <view style="font-size: 38rpx;">{{ model.title }}</view>
    <view style="line-height: 80rpx; height: 80rpx;color:#8ba6dc">{{ model.create_time }}</view>
    <image mode="widthFix" style="width: 100%; height: auto;" :src="utils.domainImageUrl(model.cover_url)"></image>
    <view style="padding: 20rpx 0 20rpx 0;color:#8ba6dc">{{ model.content }}</view>
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