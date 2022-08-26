<template>
<sunton-main :options="{title: $t('mybill.title')}">
  <view class="sunton-container">
    <view class="sunton-group-top20" v-for="(item, index) in dataList" :key="index">

    </view>
  </view>
</sunton-main>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
    };
  }
}
</script>

<style scoped>

</style>