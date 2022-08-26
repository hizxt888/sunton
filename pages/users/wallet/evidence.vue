<template>
  <sunton-main :options="{title: $t('users.wallet.tip13')}">
    <view class="sunton-container">
      <view class="sunton-group" style="margin-top: 20rpx;">
        <group-currency :address-list="addressList" :index.sync="form.currency"></group-currency>
      </view>

      <view class="sunton-group-top20">
        <view class="sunton-flex-between">
          <view class="evidence-label">{{ $t('users.recharge.tip1') }}</view>
          <input
              :disabled="true"
              v-model="form.address"
              maxlength="10"
              class="evidence-input"
              :placeholder="$t('users.recharge.tip2')"
          />
        </view>
      </view>

      <view class="sunton-group-top20">
        <view class="sunton-flex-between">
          <view class="evidence-label">{{ $t('users.wallet.tip14') }}</view>
          <input
              v-model="form.money"
              maxlength="10"
              type="number"
              class="evidence-input"
              :placeholder="$t('users.wallet.ptip1')"
          />
        </view>
      </view>

      <view class="sunton-group-top20">
        <view>{{ $t('users.wallet.tip15') }}</view>
        <view class="sunton-flex-center-column" style="margin-top: 20rpx; padding-bottom: 20rpx;">
          <sunton-upload :url.sync="form.cover_url" width="400rpx" height="400rpx"></sunton-upload>
        </view>
      </view>

      <view style="margin-top: 50rpx;">
        <view class="sunton-button" @click="submit">{{ $t('users.wallet.tip16') }}</view>
      </view>
    </view>
  </sunton-main>
</template>

<script>
import SuntonUpload from "../../../components/sunton-upload";
import GroupCurrency from "./components/group-currency";
export default {
  components: {GroupCurrency, SuntonUpload},
  data() {
    return {
      form: {},
      walletModel: {},
      addressList: {},
      currencyList: [],
    }
  },

  onShow() {
    this.getWallet();
  },

  watch: {
    'form.currency': {
      handler(currency) {
        var addressModel = this.addressList[currency] || {};
        this.form.address = addressModel.address || '';
      }
    }
  },

  methods: {
    getWallet() {
      this.utils.httpRequest('/api/users/wallet', res => {
        this.addressList = res.data.addressList || {};
        this.$set(this, 'walletModel', res.data || {});
      });
    },

    submit() {
      if(typeof this.form.money === "undefined" || ! this.form.money) {
        return uni.showToast({title: this.$t('users.wallet.tip17'), icon: 'none'});
      }

      if(typeof this.form.cover_url === "undefined" || ! this.form.cover_url) {
        return uni.showToast({title: this.$t('users.wallet.tip17'), icon: 'none'});
      }

      this.utils.httpRequest('/api/wallet/recharge', {
        method: 'POST',
        data: this.form,
        success() {
          setTimeout(() => uni.navigateBack({delta: 1}), 1500);
        }
      })
    },
  }

}
</script>

<style scoped>
.evidence-label{
  width: 150rpx;
  text-align: right;
}

.evidence-input{
  width: calc(100% - 200rpx);
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 20rpx 0 20rpx;
  border-radius: 20rpx;
  background-color: #0B1546;
}
</style>