<template>
<sunton-main :options="{title: $t('users.wallet.tip11')}">
  <view class="sunton-container" style="padding-bottom: 100rpx;">

    <view class="sunton-group" style="margin-top: 20rpx;">
      <view class="sunton-flex-between" style="padding: 20rpx;">
        <view class="sunton-flex-left">
          <image class="sunton-icon-80" src="../../../static/images/wallet/10822.png"></image>
          <view>{{$t('users.wallet.caseout.tip1')}}</view>
        </view>

        <view class="sunton-flex-between" style="align-items: flex-end;">
          <view style="font-size: 60rpx;color: #FFC929;">
            {{utils.isset(utils.isset(walletModel.wallet, 'usdt', []), 'money', 0)}}
          </view>
          <view style="font-size: 34rpx;color: #FFC929;">USDT</view>
        </view>
      </view>

      <view class="line"></view>
      <view style="padding: 20rpx;">
        <group-currency
            :address-list="addressList"
            :index.sync="form.currency"
            :wallet-bind="walletModel.wallet_bind || 0"
            :type="1"
        ></group-currency>
      </view>
    </view>

    <view class="sunton-group">
      <view style="padding: 20rpx">
        <view class="sunton-flex-left">
          <image class="sunton-icon-80" src="../../../static/images/wallet/10828.png"></image>
          <view>{{$t('users.wallet.caseout.tip7')}}</view>
        </view>
        <view class="sunton-flex-between group-input">
          <input
              v-model="form.address"
              :placeholder="$t('users.wallet.caseout.tip3')"
              style="width: 100%;"
          />
        </view>
      </view>

      <view class="line"></view>
      <view style="padding: 20rpx">
        <view class="sunton-flex-left">
          <image class="sunton-icon-80" src="../../../static/images/wallet/10812.png"></image>
          <view>{{$t('users.wallet.caseout.tip2')}}</view>
        </view>
        <view class="sunton-flex-between group-input">
          <input v-model="form.money" type="number" :placeholder="$t('users.wallet.caseout.tip3')" />
          <view class="button" @click="submitWithdrawal">
            <view>{{$t('users.wallet.caseout.tip4')}}</view>
          </view>
        </view>
      </view>

      <view class="line"></view>
      <view class="cash-out-body">
        <view class="body-item">
          <view>{{$t('users.wallet.caseout.tip8')}}</view>
          <view style="color: #6571BA;">{{ parseFloat(walletModel.wallet_withdrawal_rate).toFixed(3) }}</view>
        </view>

        <view class="body-item">
          <view>{{$t('users.wallet.caseout.tip9')}}</view>
          <view style="color: #6571BA;">{{ parseFloat(form.actual || 0).toFixed(2) }}</view>
        </view>

        <view class="body-item" style="justify-content: start;">
          <image style="width: 20rpx; height: 20rpx; margin-right: 10rpx;" src="../../../static/images/common/2124.png"></image>
          <view>{{$t('users.wallet.caseout.tip10')}}</view>
        </view>
      </view>
    </view>

    <view class="sunton-group-top20">
      <view style="line-height: 80rpx; font-size: 34rpx;">{{ $t('users.wallet.caseout.tip11') }}</view>
      <view class="group-item">
        <view class="sunton-item-line">{{ $t('users.wallet.caseout.tip12') }}</view>
        <view class="sunton-item-line">{{ $t('users.wallet.caseout.tip13') }}</view>
        <view class="sunton-item-line">{{ $t('users.wallet.caseout.tip14') }}</view>
        <view class="sunton-item-line">{{ $t('users.wallet.caseout.tip15') }}</view>
        <view class="sunton-item-line">{{ $t('users.wallet.caseout.tip16') }}</view>
      </view>
    </view>
  </view>
  <sunton-password ref="password"></sunton-password>
</sunton-main>
</template>

<script>
import GroupCurrency from "./components/group-currency";
import SuntonPassword from "../../../components/sunton-password";
export default {
  components: {SuntonPassword, GroupCurrency},
  data() {
    return {
      form: {money: ''},
      walletModel: {},
      addressList: {},
      currencyList: [],
    };
  },

  watch: {
    'form.currency': {
      handler(currency) {
        var addressModel = this.addressList[currency] || {};
        this.$set(this.form, 'address', addressModel.address || '');
      }
    },

    'form.money': {
      handler(money) {
        var rate = parseFloat(this.walletModel.wallet_withdrawal_rate).toFixed(3) / 100;
        this.$set(this.form, 'actual', money - rate * money);

        if(money > this.utils.isset(this.utils.isset(this.walletModel.wallet, 'usdt', []), 'money', 0)) {
          uni.showToast({title: this.$t('users.wallet.caseout.error1'), icon: 'none'});
        }
      }
    }
  },

  onShow() {
    this.getWalletModel();
  },

  methods: {
    getWalletModel() {
      this.utils.httpRequest('/api/users/wallet', res => {
        this.addressList = res.data.addressList || {};
        this.$set(this, 'walletModel', res.data || {});
      });
    },

    submitWithdrawal() {
      if( ! this.form.money ) {
        return uni.showToast({title: this.$t('users.wallet.caseout.error12'), icon: 'none'});
      }

      var self = this;
      self.$refs.password.start(self.form.money, {
        url: '/api/wallet/withdrawal',
        data: self.form,
        success() {
          self.form = {currency: self.form.currency};
          self.getWalletModel();
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
.sunton-item-line{
  width: calc(100% - 20rpx);
  height: auto;
  line-height: 40rpx;
  background-image: url("../../../static/images/common/2124.png");
  background-position: left 20rpx;
  background-size: 15rpx 15rpx;
  background-repeat: no-repeat;
  padding-left: 25rpx;
  margin-bottom: 30rpx;
  color: #6571BA;
}

.group-item{
  width: calc(100% - 40rpx);
  height: auto;
  border-radius: 20rpx;
  padding: 20rpx;
  background-color: #141D5B;
}

.line{
  width: 100%;
  height: 0.01rpx;
  background-color: #47568f;
  margin: 30rpx 0 30rpx 0;
}

.group-input{
  margin-top: 20rpx;
  flex-shrink: 0;
  flex-wrap: wrap;
  input{
    width: calc(100% - 250rpx);
    height: 100rpx;
    border-radius: 20rpx;
    background: #141d5b;
    padding: 0 20rpx 0 20rpx;
  }
  .button{
    width: 160rpx;
    height: 100rpx;
    border-radius: 20rpx;
    background: #273b88;
    border: 2rpx solid #7490ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20rpx 0 20rpx;
    text-align: center;
  }

  .button:active{
    opacity: 0.8;
  }
}

.cash-out-body{
  width: calc(100% - 40rpx);
  height: auto;
  margin: auto;
  background-color: #141d5b;;
  border-radius: 20rpx;
  padding: 20rpx 0 20rpx 0;
  .body-item{
    height: 80rpx;
    padding: 20rpx;
    border-bottom: 1rpx solid #47568f;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .body-item:last-child{
    border-bottom: none;
  }
}
</style>