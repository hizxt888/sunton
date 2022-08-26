<template>
  <view>
    <view class="sunton-group-top20 sunton-flex-between" style="background-color: #16102e;">
      <view class="sunton-flex-left">
        <view class="sunton-flex-left" style="margin-right: 50rpx;">
          <image style="width: 30rpx; height: 30rpx;" src="../../../static/images/community/16200@2x.png"></image>
          <view>{{ model.thumb_count }}</view>
        </view>
        <view class="sunton-flex-center">
          <image style="width: 30rpx; height: 30rpx;" src="../../../static/images/community/16167.png"></image>
          <view>{{ model.trample_count }}</view>
        </view>
      </view>

      <view class="people-wrap">
        <view class="people-list">
          <block v-for="(row, index) in model.comments" :key="index">
            <image :src="utils.domainImageUrl(utils.isset(row.user, 'cover_url', '../../../static/images/community/test-avatar.png'))" style="width: 42rpx;height: 42rpx;border-radius: 50%;"></image>
          </block>
        </view>
        {{ model.comment_count }} {{ $t('community.tip3') }}
      </view>
    </view>

    <view class="comment-user">
      <view class="comment-user-item" v-for="(row, index) in model.comments" :key="index">
        <image class="avatar" :src="utils.domainImageUrl(utils.isset(row.user, 'cover_url', '../../../static/images/community/test-avatar.png'))"></image>
        <view>{{ utils.isset(row.user, 'nickname') }}: </view>
        <view class="content light-back-color">{{ row.content }}</view>
      </view>
    </view>

    <view class="expand">
      <text>{{ $t('community.tip4') }}</text>
      <u-icon name="arrow-down"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {return {}}
    }
  }
}
</script>

<style scoped lang="scss">

.people-wrap{
  flex-wrap: nowrap;
  display: flex;
}
.people-list{
  padding-right: 20rpx;
  display: flex;
}
.people-list image{
  margin-left: -20rpx;
}
.comment-user{
  margin-top: 20rpx;
  .comment-user-item{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin-bottom: 20rpx;
    .avatar{
      width: 50rpx;
      height: 50rpx;
      margin-right: 10rpx;
    }
    .content{
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.light-back-color{
  color: #8ba6dc;
}

.expand{
  display: flex;
  padding: 20rpx 0;
  justify-content: center;
  border-top: 1px solid rgba(255,255,255,0.2);
  margin-left: -20rpx;
  margin-right: -20rpx;
}
</style>