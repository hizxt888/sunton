<template>
  <sunton-main class="share-main">
    <u-swiper
        style="margin-top: 20rpx;"
        :list="imageList"
        previousMargin="50"
        nextMargin="50"
        circular
        :autoplay="false"
        radius="5"
        bgColor="transparent"
        height="60vh"
        @change="swiperChange"></u-swiper>

    <view class="sunton-container" style="margin-top: 20rpx;">
      <view class="action-body">
        <view class="save-button"  @click="saveImage">{{$t('Save')}}</view>
        <view class="share-href">{{configModel.register_url}}</view>
        <view class="save-button">{{$t('Copy link address')}}</view>
      </view>
    </view>

    <uqrcode ref="uQRCode"  class="canvas-style" v-if="configModel.register_url" :text="configModel.register_url"></uqrcode>
    <canvas canvas-id="canvas" class="canvas-style" :style="{width: canvas.width+'px', height: canvas.height+'px'}"></canvas>
  </sunton-main>
</template>


<script>
export default {
  data() {
    return {
      canvas: {},
      configModel: {},
      show: {index: 0},
      imageList: [
        require(`./assets/images/${this.$i18n.locale}1.png`),
        require(`./assets/images/${this.$i18n.locale}2.jpg`),
        require(`./assets/images/${this.$i18n.locale}3.jpg`),
      ],
      imagePosition: [
        [50, 50],
        [50, 50],
        ['center', 250],
      ],
    }
  },

  onLoad() {
    uni.showLoading();
    this.utils.httpRequest('/api/team/configs', res => {
      res.data.register_url += "?invite_code=" + res.data.invite_code;
      this.$set(this, 'configModel', res.data || {});
    });
  },

  methods: {
    swiperChange(event) {
      this.show.index = event.current;
    },

    /**
     * 保存海报图片
     * @returns {Promise<void>}
     */
    async saveImage() {
      uni.showLoading();

      var src = this.imageList[this.show.index]; // 背景图片
      var imageModel = await new Promise(resolve => uni.getImageInfo({src: src, success: res => resolve(res)}));
      this.$set(this, 'canvas', {width: imageModel.width, height: imageModel.height});
      await new Promise(resolve => setTimeout(() => resolve(), 500));

      var ctx = uni.createCanvasContext("canvas", this);
      await this.drawImage(ctx, imageModel.path, 0, 0, imageModel.width, imageModel.height);

      var position = this.imagePosition[this.show.index];
      var imageWidth = imageModel.width / 4;
      var imageHeight = imageModel.width / 4;
      var top = imageModel.height - imageWidth - position[1];

      var left = position[0];
      if(left === 'center') {
        left = (imageModel.width  - imageWidth) / 2;
      } else {
        left = imageModel.width - imageWidth - left;
      }

      var qrcode = await this.getQrcodeUrl(this.configModel.register_url);
      await this.drawImage(ctx, qrcode, left, top, imageWidth, imageHeight);

      uni.canvasToTempFilePath({
        width: imageModel.width,
        height: imageModel.height,
        canvasId: ctx.id,
        success(res) {
          // #ifdef APP-PLUS
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              uni.showToast('success');
            },
          });
          // #endif

          // #ifdef H5
          console.log(res.tempFilePath)
          // #endif
        },
      });
      uni.hideLoading();
    },

    /**
     * 获取二维码链接
     * @param url
     * @returns {Promise<unknown>}
     */
    async getQrcodeUrl(url) {
      var self = this;
      return new Promise(resolve => {
        self.$refs.uQRCode.toTempFilePath({
          success: res => {
            resolve(res.tempFilePath);
          }
        });
      });
    },

    /**
     * 那个啥
     * @param cxt
     * @param url
     * @param left
     * @param top
     * @param width
     * @param height
     * @returns {Promise<unknown>}
     */
    async drawImage(cxt, url, left, top, width, height) {
      return new Promise(resolve => {
        cxt.drawImage(url, left, top, width, height);
        cxt.draw(true, () => {
          resolve();
        });
      });
    },
  },
}
</script>

<style scoped lang="scss">
.canvas-style{
  position: fixed;
  z-index: -200;
}

.share-main{
  background-image: url("@/pages/shares/assets/images/bg.png");
  background-position: left top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.action-body{
  flex: 1;
  padding: 10rpx;
  border-radius: 20rpx;
  width: auto;
  height: 25vh;
  background: rgba(29, 43, 108, 0.4);
  border: 1rpx dashed #808080;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.save-button{
  width: 90%;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  background: rgba(44, 58, 131, 0.4);
  border: 1rpx solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 30rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

.share-href{
  width: 90%;
  height: 60rpx;
  line-height: 60rpx;
  background: rgba(22, 28, 90, 0.5);
  border-radius: 30rpx;
  text-align: center;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

</style>