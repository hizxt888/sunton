<template>
  <sunton-main :options="{title: $t('community.promotions')}">
    <view class="sunton-container">
      <view v-for="(row, index) in dataList" :key="index" class="sunton-group-top20">
        <promotions :model="row"></promotions>
      </view>
    </view>
  </sunton-main>
</template>

<script>
import promotions from "./components/promotions";
import pageModel from "../../utils/pageModel";
export default {
  mixins: [new pageModel({url: '/api/community/promotions'})],
  components: {promotions},

  onReady() {
    this.onRefresh();
  }
}
</script>