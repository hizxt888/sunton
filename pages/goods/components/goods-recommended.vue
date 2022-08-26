<template>
<view>
  <template v-if="type == 0">
    <goods-item v-for="(model, index) in goodsList" :key="index" :model="model"></goods-item>
  </template>

  <template v-else-if="type == 1">
    <goods-item1 v-for="(model, index) in goodsList" :key="index" :model="model"></goods-item1>
  </template>
</view>
</template>

<script>
import GoodsItem from './goods-item';
import GoodsItem1 from './goods-item1';
export default {
  components: {
    GoodsItem,
    GoodsItem1,
  },

  props: {
    type: {
      type: [Number, String],
      default: 0,
    },
    search: {
      type: Object,
      default: () => {return {is_recommend: 1}},
    },
  },

  data() {
    return {
      goodsList: [],
    };
  },

  created() {
    var self = this;
    self.utils.httpRequest('/api/goods', {data: this.search, callback(res) {
      self.$set(self, 'goodsList', res.data.data || [])
    }});
  },
}
</script>

<style scoped>

</style>