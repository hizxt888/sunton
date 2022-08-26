<template>
  <view class="sunton-login-register-button" @click="handleGetCode">
    <u-loading-icon v-if="getCodeModel.isGetCode" :text="$t('common.loading.title')" textSize="18"></u-loading-icon>
    <view v-else>{{getCodeModel.outText}}</view>
  </view>
</template>

<script>
export default {
  name: "sms-code-button",
  props: {
    email: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      getCodeModel: {
        ms: 60,
        timeout: 60,
        isGetCode: false,
        outText: this.$t('login.register.tip7'),
        text: this.$t('login.register.tip7'),
      },
    };
  },

  methods: {
    async handleGetCode() {
      if( this.getCodeModel.isGetCode ) {// 发送验证码
        return;
      }

      if(this.getCodeModel.ms !== this.getCodeModel.timeout) {
        return;
      }

      var response = null;
      switch (this.type)
      {
        case 'email':
          this.$set(this.getCodeModel, 'isGetCode', true); // 发送网络请求
          response = await this.utils.httpRequest('/api/sms/user-send');
          break;

          default:
            if( ! this.email ) {
              return uni.showToast({title: this.$t("login.register.tip9"), icon: 'none'});
            }

            this.$set(this.getCodeModel, 'isGetCode', true); // 发送网络请求
            response = await this.utils.httpRequest('/api/sms/send', {
              method: 'POST',
              data: {email: this.email}
            });
            break;
      }

      this.$set(this.getCodeModel, 'isGetCode', false);
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

<style scoped>
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
</style>