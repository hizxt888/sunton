<template>
  <sunton-main :options="{title: $t('users.personal.title')}">
    <view class="sunton-container">
      <view class="sunton-flex-between item">
        <view class="item-l all-row">
          <image src="/static/images/users/mj_user_icon07.png" mode="aspectFit"></image>
          <view class="item-l-title">{{ $t('users.personal.tip1') }}</view>
        </view>

        <view class="item-r all-row">
          <image class="item-avatar" @click="selectFile" :src="utils.domainImageUrl(form.cover_url)" mode="aspectFill"></image>
          <image class="item-arrow" src="/static/images/users/mj_user_arrow.png" mode="aspectFit"></image>
        </view>
      </view>

      <view class="item item1 all-row" url="../changeName/changeName">
        <view class="item-l all-row">
          <image src="/static/images/users/mj_user_icon05.png" mode="aspectFit"></image>
          <view class="item-l-title">{{ $t('users.personal.tip2') }}</view>
        </view>

        <view class="item-r all-row">
          <input
              type="text"
              v-model="form.nickname"
              :placeholder="form.nickname ? form.nickname : $t('users.personal.tip6')"
              placeholder-style="color: #FFFFFF"
          />
          <image class="item-arrow" src="/static/images/users/mj_user_arrow.png" mode="aspectFit"></image>
        </view>
      </view>

      <navigator class="item item1 all-row" url="/pages/users/wallet/password">
        <view class="item-l all-row">
          <image src="/static/images/users/mj_user_icon02.png" mode="aspectFit"></image>
          <view class="item-l-title">{{ $t('users.personal.tip3') }}</view>
        </view>
        <view class="item-r all-row">
          <image class="item-arrow" src="/static/images/users/mj_user_arrow.png" mode="aspectFit"></image>
        </view>
      </navigator>
    </view>

    <view class="sunton-footer" style="height: 130rpx;">
      <view class="sunton-container sunton-flex-between">
        <view class="sunton-button button1" @click="handleSave">{{ $t('users.personal.tip4') }}</view>
        <view class="sunton-button button2" @click="handleLogout">{{ $t('users.personal.tip5') }}</view>
      </view>
    </view>
  </sunton-main>
</template>

<script>
import userModel from "../../../utils/userModel";

export default {
  data() {
    return {
      form: {},
    }
  },

  onShow() {
    this.form = userModel.getUserModel();
  },

  methods: {
    handleSave() {
      var self = this;
      self.utils.httpRequest('/api/user/update', {
        method: 'POST',
        data: {nickname: this.form.nickname, cover_url: this.form.cover_url},
        success(res) {
          userModel.setUserModel(self.form);
        }
      });
    },

    selectFile() {
      var self = this;
      uni.chooseImage({
        count: 1,
        success: async chooseImage => {
          var response = await self.utils.httpUpload(chooseImage.tempFilePaths[0]);
          if( ! response.filename ) {
            return;
          }
          self.$set(self.form, 'cover_url', response.filename);
        }
      });
    },

    handleLogout() {
      uni.reLaunch({url: '/pages/login/index'});
      userModel.removeUserModel();
    },
  }
}
</script>

<style lang="scss">
@import "../../../static/css/mj_common.css";
.item {
  height: 122rpx;
  border-radius: 15rpx;
  padding: 20rpx;
  box-sizing: border-box;
  margin: 20rpx 0 0 0;
  background-color: #192C73;
}

.item1 {
  align-items: center;
  justify-content: space-between;
}

.item2 {
  line-height: 122rpx;
}

.item-l {
  align-items: center;
}

.item-l image {
  width: 82rpx;
  height: 82rpx;
}

.item-l-title {
  font-size: 30rpx;
  font-weight: 400;
  color: #fff;
  margin-left: 20rpx;
}

.item-r {
  align-items: center;

}

.item-r input {
  text-align: right;
  width: 265rpx;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 30rpx;
  margin-right: 30rpx;

  /deep/.uni-input-wrapper {
    .uni-input-input {
      color: #6571BA !important;
    }
  }
}

.item-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 30rpx;
  background-color: #6571BA;
}

.item-arrow {
  width: 14rpx;
  height: 18rpx;
}

.button1, .button2{
  width: calc(50% - 10rpx);
}
.button2{
  background: rgba(255, 255, 255, 0.1);
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}
</style>
