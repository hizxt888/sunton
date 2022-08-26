<template>
<sunton-main :options="{title: $t('users.tip3')}">
  <view class="sunton-container" style="padding-bottom: 30rpx;">
    <view v-for="(model, index) in dataList" :key="index" class="sunton-group-top20 sunton-flex-between">
      <view>
        <view style="color: #8BA6DC; font-size: 32rpx; line-height: 60rpx;">{{ model.code_text }}</view>
        <view>{{model.create_time}}</view>
      </view>
      <view>{{model.action_type?'+':'-'}}{{ model.money }}{{(model.money_type).toUpperCase()}}</view>
    </view>
  </view>
</sunton-main>
</template>

<script>
import pageModel from '../../../utils/pageModel';
export default {
  mixins: [new pageModel({url: '/api/wallet/bill'})],
  onReady() {
    this.onRefresh();
  },
}
</script>