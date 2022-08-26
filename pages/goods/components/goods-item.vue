<template>
  <view class="item-main">
    <image mode="widthFix" class="head_image" :src="utils.domainImageUrl(model.cover_url)"></image>
    <view class="item-main-content">
      <view>
        <view class="content-item">{{model.title}}</view>
        <view class="content-item" style="color: #FFC929; font-weight: bold; margin-top: 10rpx;">Price: {{model.price}}USDP</view>
      </view>

      <navigator v-if="!model.go_id" hover-class="none" :url="`/pages/goods/details?id=${model.id}`">
        <image class="buy" src="../../../static/images/goods/buy.png"></image>
      </navigator>
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
  },
}
</script>

<style scoped lang="scss">
.item-main{
  width: auto;
  height: auto;
  background-color: #2A469D;
  padding: 20rpx;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rpx;
  .head_image{
    width: 100%;
    height: auto;
    border-radius: 0;
  }
}

.item-main-content{
  width: 100%;
  height: auto;
  margin-top: 20rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.content-item{
  line-height: 40rpx;
  height: 40rpx;
  font-size: 34rpx;
}

.buy{
  width: 60rpx;
  height: 60rpx;
}
</style>