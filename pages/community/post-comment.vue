<template>
  <sunton-main :options="{title: $t('community.release.title')}">
    <view class="sunton-container">
      <view class="sunton-group-top20 sunton-flex-between">
        <image class="sunton-release-image" src="../../static/images/community/10866.png"></image>
        <view class="sunton-release-title">{{$t('community.release.tip1')}}</view>
        <input
            class="sunton-release-input"
            @input="event => input(event, 'title')"
            :placeholder="$t('community.release.tip2')"
        />
      </view>

      <view class="sunton-group-top20">
        <view class="sunton-flex-left">
          <image class="sunton-release-image" src="../../static/images/community/10790.png"></image>
          <view class="sunton-release-title">{{$t('community.release.tip3')}}</view>
        </view>
        <view class="sunton-release-content-input" style="background: #141d5b;">
          <textarea
              maxlength="200"
              @input="event => input(event, 'content')"
              :placeholder="$t('community.release.tip4')"
          ></textarea>
        </view>
      </view>

      <view class="sunton-group-top20">
        <view class="sunton-flex-left">
          <image class="sunton-release-image" src="../../static/images/community/10790.png"></image>
          <view class="sunton-release-title">{{$t('community.release.tip5')}}</view>
        </view>
        <view class="sunton-release-content-input">
          <sunton-upload-image :list.sync="form.images"></sunton-upload-image>
        </view>
      </view>
    </view>

    <view class="sunton-footer" style="height: 150rpx;">
      <view class="sunton-container">
        <view class="sunton-button" @click="submit">{{ $t('community.release.tip6') }}</view>
      </view>
    </view>
  </sunton-main>
</template>

<script>
import userModel from "../../utils/userModel";
import SuntonUploadImage from "../../components/sunton-upload-image";
export default {
  components: {SuntonUploadImage},
  data() {
    return {
      form: {images: []},
    }
  },

  onLoad() {
    userModel.checkUserLogin();
  },

  methods: {
    submit() {
      if( ! this.form.title ) { // 没有输入标题
        uni.showToast(this.$t('community.release.error1'));
        return;
      }

      this.utils.httpRequest('/api/community/release', {
        data: this.form,
        method: 'POST',
        success(res) {
          console.log(res)
        }
      });
    },

    input(event, field) {
      this.$set(this.form, field, event.target.value);
    }
  }
}
</script>

<style scoped lang="scss">
.sunton-release-image{
  width: 80rpx;
  height: 80rpx;
  margin-right: 10rpx;
}

.sunton-release-title{
  width: auto;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  margin-right: 10rpx;
}

.sunton-release-input{
  width: auto;
  height: 80rpx;
  flex: 1;
}

.sunton-release-content-input{
  width: calc(100% - 40rpx);
  height: auto;
  border-radius: 20rpx;
  margin-top: 10rpx;
  padding: 20rpx;
  textarea{
    width: 100%;
    height: 200rpx;
  }
}
</style>