<template>
  <sunton-main class="sunton-login-register" :options="{background: 'transparent', isCheckLogin: false}">
    <view slot="right">
      <navigator hover-class="none" url="/pages/users/switchLanguage/switchLanguage">
        {{ $t('language') }}
      </navigator>
    </view>

    <view class="sunton-container sunton-flex-center-column" style="padding-top: 100rpx;">

      <view class="sunton-flex-center-column">
        <image  src="../../static/images/logo.png" class="sunton-login-register-avatar"></image>
        <view style="font-size: 40rpx; height: 100rpx; line-height: 100rpx;">{{$t('login.register.tip1')}}</view>
      </view>

      <view class="sunton-login-register-body" style="margin-top: 30rpx;">
        <view class="item" style="margin-top: 50rpx;">
          <image src="../../static/images/login/email.png"></image>
          <input
              type="text"
              v-model="form.email"
              placeholder-class="sunton-placeholder"
              :placeholder="$t('login.register.tip2')"
          />
        </view>

        <view class="sunton-login-register-flex-between">
          <view class="item-left">
            <image src="../../static/images/login/email-code.png"></image>
            <input
                type="text"
                v-model="form.sms_code"
                placeholder-class="sunton-placeholder"
                :placeholder="$t('login.register.tip6')"
            />
          </view>
          <sms-code-button class="right-body" :email="form.email"></sms-code-button>
        </view>

        <view class="item">
          <image src="../../static/images/login/password.png"></image>
          <input
              type="password"
              v-model="form.password"
              placeholder-class="sunton-placeholder"
              :placeholder="$t('login.register.tip3')"
          />
        </view>

        <view class="item">
          <image src="../../static/images/login/password.png"></image>
          <input
              type="password"
              v-model="form.password1"
              placeholder-class="sunton-placeholder"
              :placeholder="$t('login.register.tip3')"
          />
        </view>

        <view class="item">
          <image src="../../static/images/login/invitation.png"></image>
          <input
              type="text"
              v-model="form.invite_code"
              placeholder-class="sunton-placeholder"
              :placeholder="$t('login.register.tip4')"
          />
        </view>

        <view class="sunton-button" @click="registerSubmit" style="width: 96%; margin: 50rpx auto 50rpx auto;">{{$t('login.register.tip8')}}</view>
      </view>
    </view>
  </sunton-main>
</template>

<script>
import userModel from "../../utils/userModel";
import SmsCodeButton from "./components/sms-code-button";

export default {
  components: {SmsCodeButton},
  data() {
    return {
      form: {},
      codeImageUrl: '',
      getCodeModel: {
        ms: 60,
        timeout: 60,
        outText: this.$t('login.register.tip7'),
        text: this.$t('login.register.tip7'),
      },
    };
  },

  methods: {
    registerSubmit() {
      this.utils.httpRequest('/api/login/register', {method: 'POST', data: this.form, success (res) {
          userModel.setUserModel(res.data);
          uni.reLaunch({url: '/pages/index/index'});
      }});
    },

    async handleGetCode() { // 发送验证码
      if( ! this.form.email ) {
        return uni.showToast({title: this.$t("login.register.tip9"), icon: 'none'});
      }

      if(this.getCodeModel.ms !== this.getCodeModel.timeout) {
        return;
      }

      // 发送网络请求
      var response = await this.utils.httpRequest('/api/sms/send', {method: 'POST', data: this.form});
      if(response.code) {
        return;
      }

      var self = this;
      self.getCodeModel.outText = self.getCodeModel.ms + "S";
      var getCodeInter = setInterval(function() {
        self.getCodeModel.ms -= 1;
        if(self.getCodeModel.ms <= 0) {
          clearInterval(getCodeInter);
          self.getCodeModel.ms = self.getCodeModel.timeout;
          self.getCodeModel.outText = self.getCodeModel.text;
          return;
        }
        self.getCodeModel.outText = self.getCodeModel.ms + "S";
      }, 1000);
    },
  }
}
</script>

<style scoped lang="scss">
.sunton-login-register{
  background-image: url("../../static/images/login/reigster-bg.png");
  background-attachment: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top left;
}

.sunton-login-register-avatar{
  width: 150rpx;
  height: 150rpx;
}

.sunton-login-register-body{
  width: calc(100% - 8rpx);
  height: auto;
  border-radius: 20rpx;
  border: 4rpx solid rgba(152, 190, 255, 0.41);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  --webkit-backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.08);

  .item{
    width: 90%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30rpx;
    padding: 20rpx;
    border-radius: 20rpx;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    image{
      width: 60rpx;
      height: 60rpx;
      padding-right: 20rpx;
      border-right: 1px solid #FFFFFF;
    }

    input{
      width: calc(100% - 100rpx);
    }
  }

  .sunton-login-register-flex-between{
    width: calc(100% - 40rpx);
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: auto auto 30rpx auto;

    .item-left{
      width: calc(100% - 260rpx);
      height: auto;
      margin-left: auto;
      border-radius: 20rpx;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      margin-right: 20rpx;

      image{
        width: 60rpx;
        height: 60rpx;
        padding-right: 20rpx;
        border-right: 1px solid #FFFFFF;
      }

      input{
        width: calc(100% - 100rpx);
      }
    }

    .right-body{
      width: 220rpx;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 20rpx;
    }
  }

}

.sunton-login-register-button{
  height: calc(60rpx - 8rpx);
  display: inline-block;
  text-align: center;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.3);
  border: 4rpx solid rgba(255, 255, 255, 0.6);
  vertical-align: middle;
}

.sunton-login-register-button:active{
  opacity: 0.8;
}

.sunton-login-register-button-code{
  height: 90rpx;
}
</style>