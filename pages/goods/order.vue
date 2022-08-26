<template>
<sunton-main :options="{title: $t('goods.order.title')}">
  <sunton-password ref="password"></sunton-password>
  <view class="sunton-container" style="margin-top: 20rpx;">
    <view class="sunton-group sunton-flex-center-column" style="height: 200rpx;">
      <view class="sunton-font-large">{{$t('goods.order.tip1')}}</view>
      <view class="sunton-flex-center">
        <view class="time-item">{{ times.code1 }}</view>
        <view class="time-item">{{ times.code2 }}</view>
        <view class="time-item" style="background: none; box-shadow: none; width: 20rpx;">:</view>
        <view class="time-item">{{ times.code3 }}</view>
        <view class="time-item">{{ times.code4 }}</view>
      </view>
    </view>

    <view class="sunton-group sunton-flex-between" style="height: 100rpx;">
      <view class="sunton-flex-left">
        <image class="order-icon" src="../../static/images/goods/10778.png"></image>
        <view>{{$t('goods.order.tip2')}}</view>
      </view>

      <view style="margin-right: 20rpx; font-size: 40rpx;">{{model.price || 0.00}}</view>
    </view>

    <view class="sunton-footer" style="height: 150rpx;">
      <view class="sunton-container">
        <view class="sunton-button" @click="submitButton">{{$t('goods.order.tip3')}}</view>
      </view>
    </view>
  </view>
</sunton-main>
</template>

<script>
import SuntonPassword from "../../components/sunton-password";
export default {
  components: {SuntonPassword},
  data() {
    return {
      show: {},
      model: {},
      interval: null,
      times: {
        timeout: 10 * 60,
        code1: 0,
        code2: 0,
        code3: 0,
        code4: 0,
      },
    };
  },

  onLoad(options) {
    this.utils.httpRequest(`/api/goods/details/${options.id || ''}`, res => this.model = res.data);
  },

  onShow() {
    this.interval = setInterval(() => this.startInterval(), 1000);
    this.startInterval();
  },

  onHide() {
    this.interval && clearInterval(this.interval);
  },

  methods: {
    submitButton() { // 密码
      this.$refs.password.start(this.model.price, {
        url: '/api/goods/buy',
        data: {id: this.model.id},
        success() {
          uni.navigateBack({delta: 1});
        }
      });
    },

    startInterval() {
      var minutes = Math.floor(this.times.timeout / 60); // 分钟
      this.times.code1 = Math.floor(minutes / 10);
      this.times.code2 = minutes % 10;

      var seconds = this.times.timeout % 60; // 秒
      this.times.code3 = Math.floor(seconds / 10);
      this.times.code4 = seconds % 10;
      this.times.timeout -= 1;
      if(this.times.timeout <= 0) {
        clearInterval(this.interval);
      }
    },
  }

}
</script>

<style scoped>
.time-item{
  width: 60rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 10rpx;
  background: linear-gradient(180deg, #44b5ff 0%, #f55686 100%);
  font-weight: bold;
  font-size: 32rpx;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  margin-right: 10rpx;
  margin-top: 20rpx;
}

.order-icon{
  width: 60rpx;
  height: 60rpx;
  margin-left: 20rpx;
  margin-right: 10rpx;
}
</style>