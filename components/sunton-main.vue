<template>
  <view class="sunton-main" v-if="checkLogin">
    <view
        v-if="getOptionField('is_header', true)"
        :class="{'sunton-header': true, 'sunton-header-fixed': getOptionField('fixed', true)}"
        :style="{color: options.color || '#FFFFFF', background: options.background || '#3B418F'}">
      <slot name="header">
        <view class="sunton-container sunton-header-body">
          <view class="action">
            <slot name="left">
              <u-icon v-if="getOptionField('is_left', true)" @click="clickLeft" name="arrow-left" size="30"></u-icon>
            </slot>
          </view>

          <view class="sunton-header-title">
            <slot name="center">{{options.title || ''}}</slot>
          </view>

          <view class="action">
            <slot name="right"></slot>
          </view>
        </view>
      </slot>
      <slot name="header-extend"></slot>
    </view>

    <view class="sunton-body" :style="{
      minHeight: `calc(100% - ${header.height}px)`,
      paddingTop: getOptionField('fixed', true) ? `${header.height}px`: 0,
    }">
      <slot name="default"></slot>
    </view>
  </view>
</template>

<script>
import userModel from "../utils/userModel";
export default {
  props: {
    options: {
      type: Object,
      default: () => {return {}}
    }
  },

  data() {
    return {
      userModel: {},
      header: {
        height: 0,
        fixed: true,
      },
    };
  },

  watch:  {
    options: {
      immediate: true,
      handler() {
        var self = this;
        self.checkLogin();
        self.$nextTick(() => {
          if( ! self.getOptionField('is_header', true) ) {
            return;
          }

          uni.createSelectorQuery().select(".sunton-header").boundingClientRect(data => {
            if( ! data || typeof data !== "object") {
              return;
            }

            self.$set(self.header, 'height', data.height);
            self.$forceUpdate();
          }).exec();

        });
      },
    },
  },

  methods: {
    checkLogin() {
      if( ! this.getOptionField('isCheckLogin', true) ) { // 是否需要检测登录
        return true;
      }
      return userModel.checkUserLogin();
    },

    getOptionField(field, def='') {
      if(typeof this.options[field] === "undefined") {
        return def;
      }
      return this.options[field];
    },

    clickLeft() {
      uni.navigateBack({delta: 1});
    },
  },
}
</script>

<style scoped lang="scss">
.sunton-main{
  width: 100vw;
  height: auto;
  min-height: 100vh;
  background-color: #180E36;
}

.sunton-header{
  width: 100%;
  height: auto;
  min-height: calc(88rpx + var(--status-bar-height));
  font-size: 36rpx;
  flex-wrap: wrap;
}
.sunton-header-fixed{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 600;
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
    z-index: 2;
    position: relative;
  }
  .sunton-header-title{
    width: 100%;
    text-align: center;
    position: absolute;
    z-index: 1;
  }
}

.sunton-body{
  width: 100%;
  height: 100%;
  word-break: break-all;
  word-wrap: break-word;
}
</style>