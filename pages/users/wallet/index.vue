<template>
  <sunton-main :options="{title: $t('users.wallet.title')}">
    <bind-address :show.sync="show.bindAddress"></bind-address>
    <view class="sunton-container" style="padding-bottom: 10rpx;">
      <view class="sunton-common-item sunton-flex-center-column">
        <view style="font-size: 34rpx;">{{$t('users.wallet.tip1')}}</view>
        <view class="sunton-font-large" style="color: #FFC929;">
          {{utils.isset(utils.isset(walletModel, 'usdt', []), 'money', 0)}}
        </view>

        <view class="sunton-flex-center" style="margin-top: 20rpx;">
          <view class="currency-item">
            <view>{{utils.isset(utils.isset(walletModel, 'usdp', []), 'money', 0)}}</view>
            <view>{{$t('users.wallet.tip2')}}</view>
          </view>

          <view class="currency-item">
            <view>{{utils.isset(utils.isset(walletModel, 'sdp', []), 'money', 0)}}</view>
            <view>{{$t('users.wallet.tip3')}}</view>
          </view>

          <view class="currency-item">
            <view>{{utils.isset(utils.isset(walletModel, 'usdp', []), 'freeze_money', 0)}}</view>
            <view>{{$t('users.wallet.tip4')}}</view>
          </view>
        </view>
      </view>

      <view class="sunton-common-item">
        <view class="content-item sunton-flex-between">
          <input
              type="number"
              v-model="form.money"
              class="exchange-item"
              @input="res => $set(form, 'exchange_money', res.detail.value * 1)"
              :placeholder="form.type ? 'USDP' : 'USDT'"
              maxlength="10"
              placeholder-class="sunton-placeholder"
          />
          <image mode="widthFix" @click="exchangeType" src="../../../static/images/wallet/10819.png"></image>
          <input
              disabled
              class="exchange-item"
              v-model="form.exchange_money"
              :placeholder="form.type ? 'USDT' : 'USDP'"
          />
        </view>

        <view class="sunton-flex-between" style="margin-top: 20rpx;">
          <view  class="wallet-button" @click="goWalletAddressBind">{{ $t('users.wallet.tip5') }}</view>
          <view  v-if="show.actionButton" class="wallet-button" @click="handleExchange">{{ $t('users.wallet.tip6') }}</view>
        </view>
      </view>

      <view class="sunton-common-item" style="margin-bottom: 120rpx;">
        <view class="sunton-flex-between" style="margin-bottom: 20rpx;">
          <view class="sunton-flex-left" style="height: 50rpx; margin-bottom: 20rpx;">
            <image style="width: 50rpx; height: 50rpx; margin-right: 10rpx;" src="../../../static/images/wallet/10777.png"></image>
            <view>{{$t('users.wallet.tip12')}}</view>
          </view>
          <navigator  v-if="show.actionButton" hover-class="none" class="wallet-tip7-style" url="/pages/users/wallet/logs">{{$t('users.wallet.tip7')}}</navigator>
        </view>
        <bill-item v-for="(model, index) in billList" :key="index" :model="model"></bill-item>
      </view>
    </view>

    <view class="sunton-footer" style="height: 120rpx;" v-if="show.actionButton">
      <view class="sunton-container sunton-flex-between">
        <navigator
            hover-class="none"
            url="/pages/users/wallet/deposit"
            class="sunton-button"
            style="width: calc(50% - 20rpx)">{{$t('users.wallet.tip10')}}</navigator>

        <navigator
            hover-class="none"
            class="wallet-tip10-button"
            url="/pages/users/wallet/cash-out"
            style="width: calc(50% - 20rpx)">{{$t('users.wallet.tip11')}}</navigator>
      </view>
    </view>

    <sunton-password ref="password" @success="passwordChange"></sunton-password>
  </sunton-main>
</template>

<script>
import BindAddress from "./components/bind-address";
import BillItem from "./components/bill-item";
import SuntonPassword from "../../../components/sunton-password";
export default {
  components: {SuntonPassword, BillItem, BindAddress},
  data() {
    return {
      billList: [],
      walletModel: {},
      form: {
        type: 0,
        money: '',
        exchange_money: '',
      },
      show: {bindAddress: false, actionButton: false},
    };
  },

  onShow() {
    this.getWallet();
  },

  onHide() {
    this.$set(this.show, 'bindAddress', false);
  },

  methods: {
    handleExchange() {
      var self = this;
      if( ! self.form.money ) {
        return uni.showToast({title: self.$t('users.wallet.address.tip17'), icon: 'none'});
      }
      self.$refs.password.start(self.form.money, {data: self.form, url: '/api/wallet/exchange'});
    },

    passwordChange() {
      this.form.type = ! this.form.type;
      this.exchangeType();
      this.getWallet();
    },

    getWallet() {
      this.utils.httpRequest('/api/users/wallet', res => {
        if( ! res.data.wallet_bind ) { // 是否已经绑定过钱包了
          return this.$set(this.show, 'bindAddress', true);
        }
        this.$set(this.show, 'actionButton', true);
        this.$set(this, 'walletModel', res.data.wallet || {});

        // 获取十条数据
        this.utils.httpRequest('/api/wallet/bill?is_action=1', res => this.billList = res.data.data || []);
      });
    },

    exchangeType() {
      this.$set(this, 'form', {type: ! this.form.type, money: '', exchange_money: ''});
    },

    goWalletAddressBind() {
      uni.navigateTo({url: '/pages/users/wallet/bind-address'}); // 跳转绑定钱包地址
      return true;
    },
  },
}
</script>

<style scoped lang="scss">
.wallet-item{
  height: auto;
  border-radius: 20px;
  background: #192c73;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.currency-item{
  height: 80rpx;
  text-align: center;
  margin: 0 0 0 20rpx;
  padding-right: 20rpx;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  view{
    height: 40rpx;
    line-height: 40rpx;
  }
  view:last-child{
    color: rgba(255, 255, 255, 0.3);
  }
}

.currency-item:last-child{
  border-right: none;
}

.content-item{
  padding: 20rpx;
  border-radius: 20rpx;
  background: #141d5b;
  margin-bottom: 20rpx;
  image{
    width: 100rpx;
  }

  .exchange-item{
    width: 50%;
    height: auto;
    text-align: center;
  }
}

.wallet-button{
  width: calc(50% - 20rpx);
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 20rpx;
  background: #273b88;
  border: 2rpx solid #7490ff;
}

.wallet-button:active{
  opacity: 0.8;
}

.wallet-tip7-style{
  width: auto;
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 20rpx 0 20rpx;
  border-radius: 30rpx;
  background: transparent;
  border: 2rpx solid #7490ff;
}

.wallet-tip10-button{
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 50rpx;
  background: #1b2336;
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20rpx 20rpx rgba(0, 0, 0, 0.06);
  text-align: center;
}
.wallet-tip10-button:active{
  opacity: 0.8;
}
</style>