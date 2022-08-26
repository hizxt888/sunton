<template>
  <sunton-main :options="{title: $t('community.fine')}">
    <view class="sunton-container">
      <view v-for="(row, index) in dataList" :key="index" class="sunton-group-top20">
        <fine :model="row"></fine>
      </view>
    </view>
  </sunton-main>
</template>

<script>
import fine from "./components/fine";
import pageModel from "../../utils/pageModel";
export default {
  mixins: [new pageModel({url: '/api/community/fine'})],
  components: {fine},

  onReady() {
    this.onRefresh();
  }
}
</script>