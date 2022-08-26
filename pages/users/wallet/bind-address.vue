<template>
<sunton-main :options="{title: $t('users.wallet.address.title')}">
<view class="sunton-container">

  <group-currency ref="currency" :address-list="addressList" :index.sync="model.currency" :action-type="false"></group-currency>

  <view class="sunton-group-top20">
    <view class="sunton-flex-left">
      <image style="height: 80rpx; width: 80rpx; margin-right: 10rpx;" src="../../../static/images/wallet/20724.png"></image>
      <text>{{ $t('users.wallet.address.tip14') }}</text>
    </view>
    <input class="address" v-model="model.address" />
  </view>

  <view class="sunton-footer" style="height: 150rpx;">
    <view class="sunton-container">
      <view class="sunton-button" @click="submit">{{$t('common.confirm')}}</view>
    </view>
  </view>

</view>
</sunton-main>
</template>

<script>
import GroupCurrency from "./components/group-currency";
export default {
  components: {GroupCurrency},
  data() {
    return {
      addressList: {},
      model: {},
    };
  },

  onShow() {
    this.getWallet();
  },

  watch: {
    'model.currency': {
      handler(currency) {
        var addressModel = this.addressList[currency] || {};
        this.model.address = addressModel.address;
      },
    },
  },

  methods: {
    getWallet() {
      this.utils.httpRequest('/api/users/wallet', res => {
        this.$set(this, 'addressList', res.data.addressList || {});
        if( ! this.model.currency ) {
          this.$set(this.model, 'currency', Object.keys(this.addressList).shift());
        }

        if(typeof this.addressList[this.model.currency] === "object") {
          this.$set(this.model, 'address', this.addressList[this.model.currency].address || '');
        }
      });
    },

    submit() {
      if( ! this.model.currency ) {
        return uni.showToast({title: this.$t('users.wallet.address.tip15'), icon: 'none'});
      }

      if( ! this.model.address ) {
        return uni.showToast({title: this.$t('users.wallet.address.tip16'), icon: 'none'});
      }

      this.utils.httpRequest('/api/wallet/address-bind', {
        method: 'POST',
        data: this.model,
        success() {
          uni.navigateBack({delta: 1});
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.address{
  width: calc(100% - 40rpx);
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 20rpx 0 20rpx;
  border-radius: 20rpx;
  background: #141d5b;
  margin-top: 20rpx;
}
</style>