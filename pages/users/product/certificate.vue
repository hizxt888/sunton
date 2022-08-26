<template>
<sunton-main :options="{title: $t('users.certificate.title')}">
<view class="sunton-container">
  <view class="certificate-body">
    <view class="certificate-content">
        <!-- <view class="certificate-content-title">{{$t('users.certificate.tip1')}}</view> -->
        <!-- <view class="certificate-content-desc">{{$t('users.certificate.tip2')}}</view> -->

        <view class="certificate-content-item">
          <view>{{$t('users.certificate.tip3')}}</view>
          <view>{{goodsModel.title}}</view>
          <view class="certificate-content-sm">{{$t('users.certificate.tip3-1')}}</view>
        </view>

        <view class="certificate-content-item">
          <view>{{$t('users.certificate.tip4')}}</view>
          <view>{{goodsModel.goods_code}}</view>
          <view class="certificate-content-sm">{{$t('users.certificate.tip4-1')}}</view>
        </view>

        <view class="certificate-content-item">
          <view>{{$t('users.certificate.tip5')}}</view>
          <view>{{goodsModel.create_time}}</view>
          <view class="certificate-content-sm">{{$t('users.certificate.tip5-1')}}</view>
        </view>

        <view class="certificate-content-item">
          <view>{{$t('users.certificate.tip6')}}</view>
          <view>{{utils.isset(goodsModel.goodsorder, 'create_time', '')}}</view>
          <view class="certificate-content-sm">{{$t('users.certificate.tip6-1')}}</view>
        </view>

        <view class="certificate-content-item">
          <view>{{$t('users.certificate.tip7')}}</view>
          <view>{{utils.isset(goodsModel.category, 'title', '')}}</view>
          <view class="certificate-content-sm">{{$t('users.certificate.tip7-1')}}</view>
        </view>

        <view class="certificate-content-item">
          <view style="width: 100%;">{{$t('users.certificate.tip8')}}</view>
          <view class="description">{{goodsModel.descs}}</view>
        </view>

        <!-- <view class="certificate-footer"> -->
          <!-- <view style="font-weight: bold;">{{$t('users.certificate.tip9')}}</view> -->
          <!-- <view>{{utils.isset(goodsModel.goodsorder, 'create_time', '')}}</view> -->
        <!-- </view> -->
    </view>
  </view>

  <view class="album-footer">
    <u-album :urls="[utils.domainImageUrl(goodsModel.cover_url)]" rowCount="1" singleSize="350"></u-album>
  </view>
</view>
</sunton-main>
</template>

<script>
export default {
  data() {
    return {
      goodsModel: {},
    };
  },

  onLoad(options) {
    this.utils.httpRequest(`/api/goods/details/${options.goods_id}`, res => this.goodsModel = res.data);
    console.log(options)
  }
}
</script>

<style scoped lang="scss">
.album-footer{
  margin: 50rpx 0 50rpx 0;
  padding-bottom: 50rpx;
  display: flex;
  justify-content: center;
  width: 100%;
}


.certificate-body{
  width: calc(100% - 40rpx);
  height: auto;
  background-color: #FFFFFF;
  border-radius: 20rpx;
  margin-top: 30rpx;
  padding: 20rpx;
}

.certificate-body /deep/*{
  color: #3B418F;
}

.certificate-content{
  width: calc(100% - 48rpx);
  height: auto;
  min-height: 300rpx;
  margin: auto;
  border: 4rpx solid #141658;
  padding: 20rpx;
  // background-image:
  //     url("./images/tip1.png"),
  //     url("./images/tip2.png"),
  //     url("./images/tip3.png"),
  //     url("./images/tip4.png");
  // background-position:
  //     left top,
  //     43rpx 28rpx,
  //     80rpx calc(100% - 50rpx),
  //     calc(100% - 30rpx) calc(100% - 30rpx);
  // background-size:
  //     200rpx auto,
  //     100rpx auto,
  //     120rpx auto,
  //     100rpx auto;
  // background-repeat: no-repeat;
}

.certificate-content-title{
  width: 100%;
  text-align: center;
  font-size: 40rpx;
  padding-top: 60rpx;
  font-weight: bold;
}

.certificate-content-desc{
  width: 90%;
  height: auto;
  text-align: center;
  margin: 30rpx auto;
}
.certificate-content-item{
  margin-top: 30rpx;
  margin-bottom: 30rpx;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  flex-wrap: wrap;
  font-weight: bold;
  view:first-child{
    font-weight: bold;
    margin-right: 10rpx;
  }
}

.description{
  margin-top: 10rpx;
  color: #3B418F;
}

.description /deep/* {
  font-weight: normal;
}
.certificate-content-sm{
  width: 100%;
  font-weight: normal;
}
.certificate-footer{
  margin-top: 100rpx;
  padding-bottom: 50rpx;
}
</style>