<template>
  <view class="item-main" @click="goDetailPage">
    <image mode="widthFix" class="left-content" :src="utils.domainImageUrl(model.cover_url)"></image>
    <view class="right-content">
      <view style="height: 80rpx; line-height: 80rpx; font-size: 36rpx;">{{model.title}}</view>
      <view class="sunton-flex-left">
        <image style="width: 40rpx; height: 40rpx; margin-right: 10rpx;" src="../../../static/images/goods/16184.png"></image>
        <view style="font-size: 30rpx;">Limited edition：</view>
        <view style="font-size: 30rpx;">{{model.inventory_count}}</view>
      </view>

      <view class="sunton-flex-between" style="margin-top: 20rpx; width: 100%;">
        <view style="font-size: 60rpx; color: #FFC929;">{{model.price}}USDP</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => { return {} }
    },
    url: {
      type: String,
      default: ''
    }
  },

  methods: {
    goDetailPage() {
      uni.navigateTo({
        url: this.url ? this.url : `/pages/goods/details?id=${this.model.id}`
      });
    }
  }

}
</script>

<style scoped lang="scss">
.goods-item3{
  width: auto;
  background-color: #141D5B;
  padding: 0 20rpx 0 20rpx;
  border-radius: 10rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}


.item-main{
  width: auto;
  height: auto;
  background-color: #2A469D;
  padding: 20rpx;
  border-radius: 20rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  .left-content{
    width: 200rpx;
    height: 200rpx;
    border-radius: 20rpx;
  }
  .right-content{
    width: calc(100% - 210rpx);
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>