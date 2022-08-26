<template>
  <view class="sunton-flex-between" style="padding: 20rpx 20rpx 40rpx 20rpx; border-bottom: 1px solid #2853b4;">
    <view class="sunton-flex-left">
      <image class="sunton-icon-80" src="../../../../static/images/wallet/10822.png"></image>
      <view>{{$t('users.wallet.caseout.tip1')}}</view>
    </view>

    <view class="sunton-flex-between" style="align-items: flex-end;">
      <view style="font-size: 60rpx;color: #FFC929;">
        {{utils.isset(utils.isset(walletModel.wallet, 'usdt', []), 'money', 0)}}
      </view>
      <view style="font-size: 34rpx;color: #FFC929;">USDT</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    walletModel: {
      type: Object,
      default: () => {return {}}
    },
  }
}
</script>