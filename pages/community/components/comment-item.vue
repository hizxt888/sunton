<template>
  <view class="comment-item">
    <view class="com-top">
      <view class="com-left">
        <image
            class="commonet-avatar"
            :src="utils.domainImageUrl(utils.isset(model.user, 'cover_url', '../../../static/images/community/test-avatar.png'))"
        />
      </view>

      <view class="com-mid">
        <view class="light-text">{{ utils.isset(model.user, 'nickname') }}</view>
        <view class="soft-text">ID：{{ utils.isset(model.user, 'invite_code') }}</view>
      </view>
      <view class="com-right">
        <view class="time soft-text">{{model.create_time}}</view>
      </view>
    </view>

    <view class="comment-text">{{model.content}}</view>

    <view class="comment-pic">
      <block v-for="(cover_url, index) in JSON.parse(model.images || '{}')" :key="index">
        <image class="pic-item" :src="utils.domainImageUrl(cover_url)"></image>
      </block>
    </view>
  </view>
</template>

<script>
export default {
 props: {
   model: {
    type: Object,
     default: () => {return {}}
   },
 }
}
</script>

<style scoped lang="scss">

.comment-item {
  margin-bottom: 30rpx;
  &:last-child {
    margin-bottom: 0;
  }
  .com-top {
    display: flex;
    .com-mid {
      flex: 2;
      .light-text {
        font-size: 28rpx;
        padding-bottom: 10rpx;
      }
      .soft-text {
        font-size: 24rpx;
      }
    }
    .com-left {
      width: max-content;
      margin-right: 10rpx;
    }
  }
  .commonet-avatar {
    width: 84rpx;
    height: 84rpx;
    border-radius: 50%;
  }
  .comment-text {
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }
  .comment-pic {
    display: flex;
    flex-wrap: wrap;
    .pic-item {
      display: inline-block;
      width: 180rpx;
      height: 180rpx;
      margin-right: 10rpx;
      border: 1px dashed #ffffff;
      margin-bottom: 10rpx;
    }
  }
}
</style>