<template>
  <sunton-main class="sunton-users-main" :options="{title: $t('users.team.tip10')}">
    <view class="sunton-container list">
      <block v-for="(row, index) in dataList" :key="index">
        <view class="item all-row">
          <image class="item-l" v-if="index < 3" :src="'/static/images/users/user_mj_rank0'+(index+1) +'.png'" mode="aspectFit"></image>
          <view class="item-l-title" v-else>{{index+1}}</view>
          <view class="item-m all-row">
            <image :src="utils.domainImageUrl(row.cover_url)" mode="aspectFill"></image>
            <view class="item-name com-text-one">{{row.nickname}}</view>
          </view>
          <view class="item-r com-text-one">ID:{{row.invite_code}}</view>
        </view>
      </block>
    </view>
  </sunton-main>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
    }
  },

  onShow() {
    this.utils.httpRequest('/api/team/ranking', res => {
      this.dataList = res.data
      console.log(this.dataList)
    })
  },
}
</script>

<style lang="scss">
@import "../../../static/css/mj_common.css";

.sunton-users-main {
  background-image: url("../../../static/images/users/user_mj_bg.png");
  background-position: left top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.list{
  margin-top: 20rpx;
  background-color: #192C73;
  border-radius: 15rpx;
  padding-bottom: 20rpx;
}

.item{
  align-items: center;
  justify-content: space-between;
  border-bottom:1rpx solid #304380;
  padding:30rpx;
}

.item:last-child{
  border: none;
}

.item-l{
  width: 50rpx;
  height: 50rpx;
}
.item-l-title{
  width: 40rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  font-size: 28rpx;
  color: #fff;
  box-sizing: border-box;
  border: 1rpx solid #304380;
  border-radius: 50%;
}
.item-m{
  width: 390rpx;
  align-items: center;
}
.item-m image{
  width: 82rpx;
  height: 82rpx;
  border-radius: 50%;
  // background-color: #fff;
}
.item-name{
  width: 270rpx;
  margin-left: 20rpx;
  font-size: 30rpx;
}
.item-r{
  width: 150rpx;
  text-align: right;
  color: #6571BA;
  font-size: 30rpx;
}
</style>
