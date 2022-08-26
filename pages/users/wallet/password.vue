<template>
  <sunton-main :options="{title: $t('users.wallet.address.connect')}">
    <view class="sunton-container">
      <view class="sunton-group-top20 sunton-flex-left wallet-password">
        <image src="../../../static/images/wallet/10746.png"></image>
        <view>{{ $t('users.wallet.address.tip5') }}</view>
        <input
            type="password"
            maxlength="6"
            v-model="form.pay_password"
            :placeholder="$t('users.wallet.address.tip6')"
        />
      </view>

      <view class="sunton-group-top20 sunton-flex-left wallet-password">
        <image src="../../../static/images/wallet/10746.png"></image>
        <view>{{ $t('users.wallet.address.tip5') }}</view>
        <input
            type="password"
            maxlength="6"
            v-model="form.pay_password1"
            :placeholder="$t('users.wallet.address.tip7')"
        />
      </view>

      <view class="sunton-group-top20 sunton-flex-left wallet-password">
        <image src="../../../static/images/wallet/10749.png"></image>
        <view>{{ $t('users.wallet.address.tip9') }}</view>
        <view class="sunton-flex-between wallet-password-get-code">
          <input
              maxlength="6"
              v-model="form.sms_code"
              :placeholder="$t('users.wallet.address.tip6')"
          />
          <sms-code-button :email="form.email" type="email"></sms-code-button>
        </view>
      </view>
    </view>

    <view class="sunton-footer" style="height: 150rpx;">
      <view class="sunton-container sunton-flex-between">
        <view class="wallet-action-link" @click="submit">{{$t('users.wallet.address.tip11')}}</view>
        <view class="wallet-action-cancel" @click="close">{{$t('users.wallet.address.tip12')}}</view>
      </view>
    </view>


  </sunton-main>
</template>

<script>
import userModel from '../../../utils/userModel';
import SmsCodeButton from "../../login/components/sms-code-button";
export default {
  components: {SmsCodeButton},
  data() {
    return {
      form: {},
    };
  },

  methods: {
    submit() {
      if(typeof this.form.pay_password === "undefined" || ! this.form.pay_password) {
        return uni.showToast({title: this.$t('login.tip3'), icon: 'none'});
      }

      if(typeof this.form.pay_password1 === "undefined" || ! this.form.pay_password1) {
        return uni.showToast({title: this.$t('login.tip3'), icon: 'none'});
      }

      if(this.form.pay_password.length < 6) {
        return uni.showToast({title: this.$t('common.password.tip2'), icon: 'none'});
      }

      if(this.form.pay_password !== this.form.pay_password1) {
        return uni.showToast({title: this.$t('common.password.tip3'), icon: 'none'});
      }

      if(typeof this.form.sms_code === "undefined" || ! this.form.sms_code) {
        return uni.showToast({title: this.$t('login.register.tip10'), icon: 'none'});
      }

      var self = this;
      self.utils.httpRequest('/api/wallet/set-pay-password', {
        method: 'POST',
        data: self.form,
        success() {
          userModel.setUserModelField('is_pay_password', 1);
          setTimeout(() => self.close(), 1000);
        }
      });
    },

    close() {
      uni.navigateBack({delta: 1});
    },
  }
}
</script>

<style scoped lang="scss">
.wallet-password{
  image{
    width: 80rpx;
    height: 80rpx;
    margin-right: 10rpx;
  }
  view{
    margin-right: 10rpx;
  }
}

.wallet-password-get-code{
  width: 100%;
  margin-top: 20rpx;
  input {
    width: calc(100% - 310rpx);
    height: 70rpx;
    line-height: 70rpx;
    border-radius: 20rpx;
    background: #141d5b;
    padding: 20rpx;
  }
  view{
    width: 200rpx;
    height: auto;
    padding: 20rpx;
    border-radius: 20px;
    background: #273b88;
    text-align: center;
    border: 2rpx solid rgba(255, 255, 255, 0.2);
  }
  view:active{
    opacity: 0.8;
  }
}

.wallet-action-link, .wallet-action-cancel{
  width: calc(50% - 10rpx);
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  border-radius: 50rpx;
}

.wallet-action-link{
  background: linear-gradient(180.00deg, #44b5ff 0%, #f55686 100%);
  box-shadow: 0 20rpx 20rpx rgba(0, 0, 0, 0.06);
}

.wallet-action-cancel{
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20rpx 20rpx rgba(0, 0, 0, 0.06);
  border: 2rpx solid rgba(255, 255, 255, 0.3);
}

.wallet-action-link:active, .wallet-action-cancel:active{
  opacity: 0.8;
}
</style>