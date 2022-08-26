<template>
  <sunton-main :options="{title: $t('users.tip5')}">
    <view v-html="content"></view>
  </sunton-main>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    };
  },

  onLoad() {
    this.utils.httpRequest('/api/agreement/white_paper', res => this.content = res.data);
  }
}
</script>

<style scoped>
.about-tip1{
  height: 100rpx;
  line-height: 100rpx;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 40rpx;
}
</style>