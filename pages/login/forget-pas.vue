<template>
  <sunton-main :options="{title: $t('login.forget.tip1'), isCheckLogin: false}">
    <view class="sunton-container">
      <view class="sunton-group-top20" style="margin-top: 30rpx;padding: 20rpx;">
        <view class="sunton-flex-left">
          <image class="sunton-icon-80" src="../../static/images/login/item1.png"></image>
          <view>{{$t('login.forget.tip2')}}</view>
        </view>
        <view class="group-input">
          <input
              v-model="form.email"
              :placeholder="$t('login.forget.tip3')"
              placeholder-style="color:#6571BA;"
          />
          <sms-code-button class="button" :email="form.email"></sms-code-button>
        </view>
      </view>

      <view class="sunton-group-top20" style="margin-top: 30rpx;padding: 0 20rpx;">
        <view class="line-item">
          <view class="line-item-padding">
            <image src="../../static/images/login/item2.png"></image>
            <input maxlength="6" class="line-item-span" v-model="form.sms_code" :placeholder="$t('login.forget.tip5')" />
          </view>
        </view>

        <view class="line-item">
          <view class="line-item-padding">
            <image src="../../static/images/login/item3.png"></image>
            <input type="password" class="line-item-span" v-model="form.password" :placeholder="$t('login.forget.tip6')" />
          </view>
        </view>

        <view class="line-item" style="border: 0;">
          <view class="line-item-padding">
            <image src="../../static/images/login/item4.png"></image>
            <input type="password" class="line-item-span" v-model="form.password1" :placeholder="$t('login.forget.tip7')" />
          </view>
        </view>
      </view>

      <view class="sunton-button" style="margin-top: 50rpx;" @click="submit">
        {{$t('login.forget.tip8')}}
      </view>
    </view>
  </sunton-main>
</template>

<script>
import SmsCodeButton from "./components/sms-code-button";
export default {
  components: {SmsCodeButton},
  data() {
    return {
      form: {},
    };
  },

  methods: {
    submit() {
      // 检测两次密码输入是否一直
      if( ! this.form.sms_code || ! this.form.password || ! this.form.password1) {
        return uni.showToast({title: this.$t('login.forget.tip9'), icon: 'none'});
      }

      // 检测两次密码输入是否一直
      if(this.form.password !== this.form.password1) {
        return uni.showToast({title: this.$t('login.forget.tip10'), icon: 'none'});
      }

      this.utils.httpRequest('/api/login/forget', {
        method: 'POST',
        data: this.form,
        success() {
          uni.navigateTo({url: '/pages/login/index'});
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
// 新页面
.group-input{
  width: 100%;
  clear: both;
  overflow: hidden;
  margin-top: 20rpx;
  input{
    width: 60%;
    height: 110rpx;
    border-radius: 20rpx;
    background: #141d5b;
    padding: 0 11px 0 11px;
    float: left;
  }
  .button{
    width: 30%;
    height: 80rpx;
    line-height: 30rpx;
    padding-top: 20rpx;
    background: #273b88;
    float: right;
  }
}
.line-item{
  width: 100%;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  .line-item-padding{
    padding: 20rpx;
    image{
      width: 80rpx;
      height: 80rpx;
      vertical-align: middle;
    }
    .line-item-span{
      width: calc(100% - 110rpx);
      display: inline-block;
      margin-left: 20rpx;
      font-weight: 400;
      font-size: 30rpx;
      vertical-align: middle;
      color: #6571ba;
    }
  }
}

</style>