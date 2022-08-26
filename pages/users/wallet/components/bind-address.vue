<template>
  <view class="sunton-main" v-if="show">
    <view class="sunton-header">
      <view class="sunton-container sunton-header-body">
        <view class="action">
          <u-icon @click="clickBack" name="arrow-left" size="30"></u-icon>
        </view>
        <view class="sunton-header-title">
          <slot name="center">{{$t('users.wallet.address.not-bind')}}</slot>
        </view>
        <view class="action"></view>
      </view>
    </view>

    <view class="sunton-container">
      <view class="sunton-group-top20 address-bind">
        <image mode="widthFix" src="../../../../static/images/wallet/10829.png"></image>
        <view>{{$t('users.wallet.address.tip1')}}</view>
        <input disabled :placeholder="$t('users.wallet.address.tip2')" />
      </view>
    </view>

    <view class="sunton-bind-address-footer">
      <view class="sunton-container">
        <view class="sunton-button" @click="goBindAddressPage">{{$t('users.wallet.address.tip3')}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    goBindAddressPage() {
      this.$emit('update:show', false);
      uni.navigateTo({url: '/pages/users/wallet/bind-address'});
    },

    clickBack() {
      uni.navigateBack({delta: 1});
      this.$emit('update:show', false);
    },
  },
}
</script>

<style scoped lang="scss">
@keyframes animation {
  from {
    top: 100vh;
  }
  to {
    top: 0;
  }
}

.sunton-main{
  width: 100vw;
  height: 100vh;
  background-color: #180E36;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 601;
  animation: animation 0.5s 1;
}

.sunton-header{
  width: 100%;
  height: auto;
  min-height: calc(88rpx + var(--status-bar-height));
  font-size: 36rpx;
  flex-wrap: wrap;
  z-index: 600;
  color: #FFFFFF;
  background: #3B418F;
  margin-bottom: 30px;
}

.sunton-header-body{
  padding-top: var(--status-bar-height);
  height: 88rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  flex-wrap: wrap;
  position: relative;
  overflow: auto;
  .action {
    z-index: 2;
    position: relative;
  }

  .sunton-header-title{
    width: 100%;
    text-align: center;
    position: absolute;
    z-index: 1;
  }
}

.sunton-body{
  width: 100%;
  height: auto;
  word-break: break-all;
  word-wrap: break-word;
  flex: 1;
}

.sunton-bind-address-footer{
  height: 150rpx;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.address-bind{
  display: flex;
  justify-content: center;
  align-items: center;
  image{
    width: 60%;
    height: auto;
    margin-top: 60rpx;
  }
  view{
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    font-size: 40rpx;
    margin-top: 30rpx;
  }
  input {
    width: calc(100% - 40rpx);
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 20rpx;
    background: #141d5b;
    padding: 0 20rpx 0 20rpx;
    margin-top: 50rpx;
    text-align: center;
  }
}
</style>