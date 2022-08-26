<template>
  <view class="sunton-main" v-if="show.password">
    <view class="sunton-header">
      <view class="sunton-container sunton-flex-between sunton-header-body">
        <view class="action">
          <u-icon @click="clickReturn" name="arrow-left" size="30"></u-icon>
        </view>
        <view class="header-title">{{$t('common.password.title')}}</view>
      </view>
    </view>

    <view class="sunton-container password-body">
      <view class="sunton-common-item">
        <view class="font-title">{{$t('common.password.tip1')}}</view>
        <view class="font-title" style="color: #FFC929;">{{model.price}}</view>
        <view style="border-bottom: 1px solid rgba(255, 255, 255, 0.5)"></view>
        <view class="input-password-body">
          <view class="password-item" v-for="index in length" :key="index" @click="showKeyword=true">
            <view class="sunton-point" v-if="typeof inputList[index - 1] !== 'undefined'"></view>
          </view>
        </view>
      </view>
    </view>

    <view class="sunton-footer" style="height: auto;">
      <view class="password-footer" v-if="showKeyword">
        <view v-for="(number, index) in numberList" :key="index" :class="{
          'number-item': true,
          'number-item-action': actionKeyword.indexOf(index) === -1
        }" @click="handleNumber(number, index)">{{number}}</view>
      </view>
    </view>
  </view>
</template>

<script>
const crypto = require('crypto');
import userModel from '../utils/userModel';
export default {
  props: {
    url: {
      type: String,
      default: '',
    },

    length: {
      type: Number,
      default: 6,
    }
  },

  data() {
    return {
      show: {},
      options: {},
      model: {},
      actionKeyword: [9, 11],
      publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvyzqFt7kv2tLDzblqlp9ZF8w8r2Bwr7x33h34ahi2R07pfajCw92x3yav0LrCboq5LEPvweYcuqAtipMafXryUKGxCpiYSHRJJm/rVl2XwCQRxZoSBoMHQsrB/KM4yTt4qVVNhD/T0qzdFJnuRTEEejO2Cl1KyrZ6QKPX1zq0hLLvxA1uMvSk/eUQGfn9POXMfgGSFQu1OsQTKpHlDjwGsM5q8JI7FW96igOaL5DgfHZcKkT87DK9hv92o+5HAVJso0bkm9uljc0SVlRdOwHb9QdOzA1piUnF6A8Pg8zHGYL9wPr5ZlxZmzTj6qvkOC8x3DOG7HsemSydC/2zh5eRwIDAQAB',
      showKeyword: true,
      inputList: [],
      numberList: [],
      header: {
        height: 0,
        fixed: true,
      },
    };
  },

  methods: {
    cipher(str){
      try {
        if(typeof str === "object") {
          str = JSON.stringify(str);
        }
        return str;
        // 如下方法使用指定的算法与密码来创建cipher对象
        const cipher = crypto.createCipher('aes192', str);
        // 使用该对象的update方法来指定需要被加密的数据
        let crypted = cipher.update(data, 'utf-8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
      } catch(error) {
        return false;
      }
    },

    decipher(str){
      try {
        const crypt = new JSEncrypt();
        crypt.setPublicKey(this.publicKey);
        return crypt.decrypt(str);
      } catch(error) {
        console.log(error)
        return false;
      }
    },

    start(price=null, options={}) {
      this.options = options;
      if(price === null) {
        price = this.price;
      }

      // 初始化
      this.$set(this.model, 'price', parseFloat(price).toFixed(2));
      this.$set(this, 'inputList', []);
      this.$set(this, 'numberList', []);

      this.numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => {return Math.random() - 0.5});
      this.numberList.splice(-1, 0, "");
      this.numberList.push("x");

      // 检测是否已经设置过支付密码
      var model = userModel.getUserModel();
      if(typeof model.is_pay_password === "undefined" || ! model.is_pay_password) {
        uni.navigateTo({url: '/pages/users/wallet/password'});// 跳转设置支付密码页面
        return;
      }

      // 显示输入框
      this.show.password = true;

      var self = this;
      self.$nextTick(() => {
        uni.createSelectorQuery().select(".sunton-header").boundingClientRect(data => {
          if( ! data || typeof data !== "object") {
            return;
          }

          self.$set(self.header, 'height', data.height);
          self.$forceUpdate();
        }).exec();
      });
    },

    handleNumber(number, index) {
      if(this.inputList.length >= this.length) {
        return;
      }

      if(index === 9) {
        return;
      }

      if(index === 11) {
        this.inputList.pop();
        this.$forceUpdate();
        return;
      }

      this.inputList.push(number);
      this.showKeyword = true;
      if(this.inputList.length >= this.length) {
        this.showKeyword = false;
        this.sendPasswordValidation();
      }
    },

    /**
     * 发送密码验证请求
     */
    sendPasswordValidation() {
      var self = this;
      uni.showLoading({mask: true, title: self.$t('common.loading.title')});
      self.utils.httpRequest(self.options.url ? self.options.url : self.url, {
        method: 'POST',
        data: {
          ...self.options.data || {},
          code: self.cipher(self.inputList.join('')),
        },

        callback(res) {
          self.clickReturn();
          if(typeof self.options.success === "function") {
            return self.options.success(res);
          }
          self.$emit('success', res);
        },

        error(error) {
          self.$set(self, 'inputList', []);
          uni.showToast({title: error.message, icon: 'none'});
          self.showKeyword = true;
          if(typeof self.options.error === "function") {
            return self.options.error(error);
          }
        },

        complete(rest) {
          uni.hideLoading();
          self.showKeyword = true;
          if(typeof self.options.complete === "function") {
            return self.options.complete(rest);
          }
        }
      });
    },

    getOptionField(field, def='') {
      if(typeof this.options[field] === "undefined") {
        return def;
      }
      return this.options[field];
    },

    clickReturn() {
      this.$set(this.show, 'password', false);
      this.$forceUpdate();
    },
  },
}
</script>

<style scoped lang="scss">
@keyframes animation {
  from {
    top: 100vh;
  }
  to {
    top: 0;
  }
}

.sunton-main{
  width: 100vw;
  height: 100vh;
  background-color: #180E36;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 601;
  animation: animation 0.5s 1;
}

.sunton-header{
  width: 100%;
  height: calc(88rpx + var(--status-bar-height));
  font-size: 36rpx;
  color: #FFFFFF;
  background: #3B418F;
  position: fixed;
  left: 0;
  top: 0;
}

.sunton-header-body{
  padding-top: var(--status-bar-height);
  height: 88rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  flex-wrap: wrap;
  position: relative;
  overflow: auto;
  .action {
    z-index: 602;
    position: relative;
  }
  .header-title{
    width: 100%;
    text-align: center;
    position: absolute;
    z-index: 601;
  }
}

.sunton-body{
  width: 100%;
  height: auto;
  word-break: break-all;
  word-wrap: break-word;
  flex: 1;
}

.password-body{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.password-footer{
  width: 100%;
  height: auto;
  position: relative;
  bottom: 0;
  left: 0;
  z-index: 601;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.number-item{
  width: 33.33333333333%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background: #141D5B;
}

.number-item-action{
  background: #192C73;
}

.number-item:active{
  opacity: 0.8;
}

.font-title{
  font-size: 36rpx;
  width: 100%;
  text-align: center;
  height: 100rpx;
  line-height: 100rpx;
}

.input-password-body{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30rpx;
  .password-item{
    width: 80rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 20rpx;
    background: #141d5b;
    border: 3rpx solid #384b97;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10rpx 0 10rpx;
    .sunton-point{
      width: 20rpx;
      height: 20rpx;
      border-radius: 10rpx;
      background-color: #FFFFFF;
    }
  }
}
</style>