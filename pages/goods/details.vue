<template>
  <sunton-main :options="{title: $t('goods.details.title'), top: false}" class="details-main">
    <view class="header">
      <image mode="widthFix" style="width: 100%;" :src="utils.domainImageUrl(model.cover_url)"></image>
      <view class="goods-content">
        <view style="line-height: 60rpx;font-size: 40rpx; font-weight: bold;">{{ model.title }}</view>
        <view style="line-height: 60rpx; font-size: 40rpx;">ID: {{ model.goods_code }}</view>
      </view>
    </view>

    <view class="sunton-container" style="margin-top: 30rpx; padding-bottom: 200rpx;">
      <view class="details-shadow">
        <view class="sunton-flex-left" style="height: 60rpx;">
          <image class="sunton-icon" src="../../static/images/goods/10786.png"></image>
          <view style="font-size: 40rpx; font-weight: bold">{{ $t('goods.details.tip1') }}</view>
        </view>
        <view class="help-content" v-html="model.attributes.instruction_buy"></view>
      </view>

      <view class="sunton-box-title">{{ $t('goods.details.tip2') }}</view>
      <goods-recommended :type="1"></goods-recommended>
    </view>

    <view class="sunton-footer footer-style" v-if="! model.goodsorder && model.inventory_count > model.sold_count">
        <view class="footer-left">
          <view>{{$t('goods.details.price')}}: </view>
          <view style="color: #FFC929">{{model.price}}USDP</view>
        </view>
        <navigator
            hover-class="none"
            class="buy-button"
            :url="`/pages/goods/order?id=${model.id}`">{{ $t('goods.details.buy') }}</navigator>
    </view>
  </sunton-main>
</template>

<script>
import GoodsRecommended from "./components/goods-recommended";
export default {
  components: {GoodsRecommended},
  data() {
    return {
      options: {},
      model: {attributes: {}, goodsorder: {}},
    };
  },

  onLoad(options) {
    this.options = options;
  },

  onShow() {
    this.utils.httpRequest(`/api/goods/details/${this.options.id || ''}`, res => this.model = res.data);
  },
}
</script>

<style scoped lang="scss">
.details-main{
  background-color: rgba(20, 21, 90, 1);
}

.header{
  width: 100%;
  position: relative;
  left: 0;
  image{
    width: 100%;
    position: relative;
  }
  .goods-content{
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 120rpx;
    background-image: linear-gradient(to bottom, rgba(20, 21, 90, 0), rgba(20, 21, 90, 1));
    padding: 20rpx;
    letter-spacing: 0;
  }
}

.details-shadow{
  height: auto;
  border-radius: 20rpx;
  padding: 20rpx;
  background: #192c73;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  .help-content{
    border-radius: 20rpx;
    background: #141d5b;
    padding: 20rpx;
    margin-top: 20rpx;
  }
}

.footer-style{
  height: 120rpx;
  line-height: 120px;
  background-color: #0f257c;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.footer-left{
  height: 100%;
  padding-left: 2%;
  font-size: 40rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  view{
    margin-right: 10rpx;
    font-size: 40rpx;
  }
}
.buy-button{
  width: 50%;
  line-height: 120rpx;
  background: linear-gradient(90.00deg, #44b5ff 0%, #f55686 100%);
  text-align: center;
  font-size: 40rpx;
}
.buy-button:active{
  opacity: 0.9;
}
</style>