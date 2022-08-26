<template>
  <u-upload @afterRead="afterRead">
    <image v-if="showImageUrl" mode="widthFix" :src="showImageUrl" :style="{width: width, height: height}"></image>
    <image v-else mode="widthFix" src="../static/images/common/10867.png" :style="{width: width, height: height}"></image>
  </u-upload>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },

    width: {
      type: String,
      default: '200rpx'
    },

    height: {
      type: String,
      default: '200rpx'
    }
  },

  data() {
    return {
      showImageUrl: ''
    };
  },

  methods:{
    async afterRead(event) {
      uni.showLoading({mask: true, title: this.$t('common.loading.title')});
      const result = await this.utils.httpUpload(event.file.url);
      uni.hideLoading();
      if( ! result || typeof result !== "object") {
        return;
      }

      this.$set(this, 'showImageUrl', event.file.url);
      this.$emit('update:url', result.filename);
    },
  }
}
</script>