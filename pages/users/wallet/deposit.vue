<template>
  <sunton-main :options="{title: $t('users.wallet.tip10')}">
    <!-- <navigator slot="right" hover-class="none" url="/pages/users/wallet/evidence" class="header-right-button">
      {{$t('users.wallet.tip13')}}
    </navigator> -->

    <view class="sunton-container" style="padding-bottom: 50rpx;">
      <view class="sunton-group" style="margin-top: 20rpx;">
        <usdt-item :wallet-model="walletModel"></usdt-item>
        <group-currency ref="currency" :action-type="false" :index.sync="form.currency" />
      </view>

      <view class="sunton-group-top20">
        <view class="deposit-qrcode">
          <view class="title">{{$t('users.wallet.deposit.tip1')}}</view>
          <image
              mode="widthFix"
              v-if="form.qrcode_url"
              :src="utils.domainImageUrl(form.qrcode_url)"
              @load="imageLoading"
          ></image>
          <view class="save-button" @click="saveImage">{{$t('users.wallet.deposit.tip2')}}</view>
		  <view class="sunton-flex-between" style="align-items: center;height: 80rpx; margin-bottom: 20rpx;">
			  <view class="address">{{form.address}}</view>
			  <view @click="copyAddress()" class="copy-link-button">
				{{$t('users.wallet.deposit.tip3')}}
			  </view>
		  </view>
          <view class="link-button" @click="evidence">{{$t('users.wallet.tip13')}}</view>
        </view>
      </view>

      <view class="sunton-group-top20">
        <view style="font-size: 34rpx; line-height: 100rpx;">{{$t('users.wallet.deposit.tip4')}}</view>
        <view class="reminder">
          <view v-html="content"></view>
        </view>
      </view>
    </view>
  </sunton-main>
</template>

<script>
import GroupCurrency from "./components/group-currency";
import UsdtItem from "./components/usdt-item";
export default {
  components: {UsdtItem, GroupCurrency},
  data() {
    return {
      content: '',
      form: {},
      walletModel: {},
      currencyModel: {},
    };
  },

  watch: {
    'form.currency': {
      handler() {
        var getModel = this.$refs.currency.getModel();
        this.form.address = getModel.address || '';
        this.form.qrcode_url = getModel.qrcode_url || '';
        if(this.form.qrcode_url) {
          uni.showLoading({mask: true});
        }
      },
    },
  },

  onShow() {
    this.getWallet();
    this.utils.httpRequest('/api/agreement/withdrawal_instructions', res => this.content = res.data);
  },

  methods: {
	  
	  evidence() {
		  uni.navigateTo({
		  	url: '/pages/users/wallet/evidence'
		  })
	  },
	  
    imageLoading(event) {
      uni.hideLoading();
    },

    saveImage() {
      var self = this;
      uni.downloadFile({
        url: this.utils.domainImageUrl(this.form.qrcode_url),
        success: (res) => {
          uni.showToast({title: self.$t('users.wallet.deposit.tip8'), icon: 'none'});
        },
      });
    },

    copyAddress() {
      var self = this;
      uni.setClipboardData({
        data: this.form.address,
        success() {
          uni.showToast({title: self.$t('users.wallet.deposit.tip8'), icon: 'none'});
        },
      });
    },

    getWallet() {
      this.utils.httpRequest('/api/users/wallet', res => {
        this.$set(this, 'walletModel', res.data || {});
      });
    },
  },
}
</script>

<style scoped lang="scss">
.header-right-button{
  width: auto;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  border-radius: 30rpx;
  padding: 0 17rpx 0 17rpx;
  border: 1px solid #abb2b2;
  font-size: 14rpx;
}
.header-right-button:active{
  opacity: 0.8;
}

.copy-link-button{
	width: 140rpx; 
	height: 80rpx; 
	line-height: 80rpx;
	margin-left: 10rpx;
	text-align: center;
    margin-top: 50rpx;
    border: 2rpx solid rgba(255, 255, 255, 0.2);
	border-radius: 40rpx;
}

.deposit-qrcode{
  background-color: #141D5B;
  padding: 20rpx;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title{
    line-height: 100rpx;
    height: 100rpx;
    font-size: 34rpx;
  }
  image{
    width: 500rpx;
    height: auto;
  }
  .save-button{
    width: 500rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 20rpx;
    background: #273b88;
    border: 2rpx solid rgba(255, 255, 255, 0.2);
    text-align: center;
    margin-top: 30rpx;
	font-size: 14px;
  }
  .save-button:active{
    opacity: 0.8;
  }
  .address{
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
    text-align: center;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06);
    margin-top: 50rpx;
	font-size: 12rpx;
  }
  .link-button{
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 40rpx;
    background: rgba(255, 255, 255, 0.1);
    border: 2rpx solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.06);
    margin-top: 30rpx;
	font-size: 14px;
  }
  .link-button:active{
    opacity: 0.8;
  }
}

.reminder{
  padding: 20rpx;
  border-radius: 20rpx;
  background: #141D5B;
  view{
    margin-bottom: 30rpx;
  }
}
</style>