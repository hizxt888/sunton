<template>
  <view>
    <bind-address :show.sync="show.bindAddress"></bind-address>

    <view class="sunton-group-top20" v-if="type === 0">
      <view class="sunton-flex-left">
        <image style="height: 80rpx; width: 80rpx; margin-right: 10rpx;" src="../../../../static/images/wallet/10766.png"></image>
        <text>{{ $t('users.wallet.address.tip4') }}</text>
      </view>

      <view class="currency-group">
        <view v-for="(item, i) in walletAddressList" :class="{
          'currency': true,
           'currency-active': item.id == index
        }" @click="clickCurrency(item, i)" :key="i">{{item.title}}</view>
      </view>
    </view>

    <template v-if="type === 1">
      <view class="sunton-flex-left">
        <image style="height: 80rpx; width: 80rpx; margin-right: 10rpx;" src="../../../../static/images/wallet/10766.png"></image>
        <text>{{ $t('users.wallet.address.tip4') }}</text>
      </view>

      <view class="currency-group">
        <view v-for="(row, i) in walletAddressList" :class="{
          'currency': true,
           'currency-active': row.id == index
        }" @click="clickCurrency(row, i)" :key="i">{{row.title}}</view>
      </view>
    </template>
  </view>
</template>

<script>
import BindAddress from "./bind-address";
export default {
  components: {BindAddress},
  props: {
    walletBind: {
      type: [Number, String, Boolean],
      default: false
    },

    actionType: {
      type: Boolean,
      default: true
    },

    addressList: {
      type: Object,
      default: () => {return {}}
    },

    type: {
      type: Number,
      default: 0
    },

    index: {
      type: [Number, String],
      default: ''
    }
  },

  data() {
    return {
      show: {bindAddress: false},
      walletAddressList: [],
      model: {index: ''},
    };
  },

  watch: {
    addressList: {
      immediate: false,
      handler(addressList) {
        this.$emit('update:index', Object.keys(addressList).shift());
        this.start(this.walletAddressList);
      },
    },

    walletBind: {
      immediate: false,
      handler(walletBind) {
        this.$set(this.show, 'bindAddress', !walletBind);
      },
    },
  },

  created() {
    this.utils.httpRequest('/api/wallet/address', res => {
      this.walletAddressList = res.data;
      this.$nextTick(() => this.start(this.walletAddressList));
    });
  },

  methods: {
    start(walletAddressList=[]) {
      if ( ! Object.keys(walletAddressList).length ) {
        return;
      }

      // 选择一个默认的
      var model = false;
      for (var item of walletAddressList)
      {
        if (typeof this.addressList[item.id] !== "undefined" && this.addressList[item.id].address) {
          model = item;
          break;
        }
      }

      if (model === false || ! Object.keys(this.addressList).length)
      {
        if(this.actionType) {
          this.$set(this.show, 'bindAddress', true);
          return;
        }
        model = walletAddressList[0] || {};
      }
      this.clickCurrency(model);
    },

    /**
     * @param model
     */
    clickCurrency(model) {
      this.$set(this.show, 'bindAddress', false);
      this.$set(this, 'model', model);
      this.$emit('update:index', model.id);
    },

    /**
     * @returns {{index: string}|{}}
     */
    getModel() {
      return this.model || {};
    },
  }
}
</script>

<style scoped lang="scss">
.currency-group{
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20rpx;
  .currency{
    width: calc(33.333333% - 20rpx);
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 20rpx;
    background: #273b88;
    border: 2rpx solid #7490ff;
    text-align: center;
    margin-bottom: 20rpx;
  }
  .currency-active{
    background: #4560c9;
  }
}
</style>