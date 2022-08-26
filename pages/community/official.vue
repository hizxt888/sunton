<template>
  <sunton-main :options="{title: $t('community.official')}">
    <view class="sunton-container">
      <view v-for="(row, index) in dataList" :key="index" class="sunton-group-top20">
        <official :model="row"></official>
      </view>
    </view>
  </sunton-main>
</template>

<script>
import official from "./components/official";
import pageModel from "../../utils/pageModel";
export default {
  mixins: [new pageModel({url: '/api/community/official'})],
  components: {official},

  onReady() {
    this.onRefresh();
  }
}
</script>

<style scoped>

</style>