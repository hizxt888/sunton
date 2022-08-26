<template>
  <sunton-main class="sunton-login-register" :options="{is_left: false, background: 'transparent', isCheckLogin: false}">
    <view slot="right">
      <navigator hover-class="none" url="/pages/users/switchLanguage/switchLanguage">
        {{ $t('language') }}
      </navigator>
    </view>

    <view class="sunton-container sunton-flex-center-column" style="padding-top: 200rpx;">

      <view class="sunton-flex-center-column">
        <image src="../../static/images/logo.png" class="sunton-login-register-avatar"></image>
        <view style="font-size: 40rpx; height: 100rpx; line-height: 100rpx;">{{$t('login.tip1')}}</view>
      </view>

      <view class="sunton-login-register-body" style="margin-top: 30rpx;">
        <view class="body-header">
          <image mode="heightFix" src="../../static/images/login/planet.png"></image>
          <view>{{$t('login.tip2')}}</view>
        </view>

        <view class="item">
          <image src="../../static/images/login/email.png"></image>
          <input
              type="text"
              :value="form.email"
              @input="el => listenInput(el, 'email')"
              placeholder-class="sunton-placeholder"
              :placeholder="$t('login.register.tip2')"
          />
        </view>

        <view class="item">
          <image src="../../static/images/login/password.png"></image>
          <input
              type="password"
              :value="form.password"
              @input="el => listenInput(el, 'password')"
              placeholder-class="sunton-placeholder"
              :placeholder="$t('login.tip3')"
          />
        </view>

        <view class="sunton-flex-between" style="width: 94%; margin: 20rpx auto 50rpx auto;">
          <navigator hover-class="none" url="/pages/login/register">{{ $t('login.tip5') }}</navigator>
          <navigator hover-class="none" url="/pages/login/forget-pas">{{ $t('login.tip6') }}</navigator>
        </view>

        <view class="sunton-button" @click="submit" style="width: 96%; margin: 50rpx auto 50rpx auto;">
          {{$t('login.tip4')}}
        </view>
      </view>
    </view>
  </sunton-main>
</template>

<script>
import userModel from "../../utils/userModel";
export default {
  data() {
    return {
      form: {},
    };
  },

  methods: {
    submit() {
      var form = JSON.parse(JSON.stringify(this.form));
      this.utils.httpRequest('/api/login', {method: 'POST', data: form, success (res) {
          userModel.setUserModel(res.data);
          uni.reLaunch({url: '/pages/index/index'});
      }});
    },

    listenInput(input, field) {
      this.form[field] = input.detail.value;
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

  .body-header{
    width: 96%;
    height: auto;
    margin: 50rpx auto 50rpx auto;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    image{
      height: 80rpx;
      margin-right: 20rpx;
    }
    view{
      font-family: "Bahnschrift Bold";
      font-weight: bold;
      font-size: 50rpx;
      text-transform: uppercase;
    }
  }

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