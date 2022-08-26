<template>
  <sunton-main :options="{title: $t('users.about.title')}">
    <view class="sunton-container">
      <view class="sunton-common-item">
        <view class="about-tip1">{{$t('users.about.tip1')}}</view>
        <view style="margin-top: 20rpx;">
          <view v-html="content"></view>
        </view>
      </view>
    </view>
  </sunton-main>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    };
  },

  onLoad() {
    this.utils.httpRequest('/api/agreement/aboutus', res => this.content = res.data);
  }
}
</script>

<style scoped>
.about-tip1{
  height: 100rpx;
  line-height: 100rpx;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 40rpx;
}
</style>