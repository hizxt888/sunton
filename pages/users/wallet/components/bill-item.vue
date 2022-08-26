<template>
  <view class="content-item sunton-flex-between">
    <view class="sunton-flex-left bill-item-group">

      <image
          v-if="model.action_type === 0"
          mode="widthFix"
          src="../../../../static/images/wallet/10724.png"
      />

      <image
          v-else
          mode="widthFix"
          src="../../../../static/images/wallet/20748.png"
      />
      <view style="margin-left: 10rpx;">{{$t(`users.wallet.tip${model.code}`)}}</view>
    </view>

    <view :style="{color: model.action_type ? '#6571BA' : '#FFC929'}">
      {{ model.action_type ? '+' : '-' }}{{ model.money }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {return {}}
    },
  }
}
</script>

<style scoped lang="scss">
.bill-item-group{
  image{
    width: 80rpx;
    height: 80rpx;
    margin-right: 10rpx;
  }
}
</style>