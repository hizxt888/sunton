<template>
  <sunton-main :options="{title: $t('users.tip2'), fixedPage: false}">
    <view slot="header-extend" class="tab-list">
      <view :class="{
        'item': true,
        'on': current == index,
      }" v-for="(vo,index) in categoryList" @click="yrtabChange(index)">
        <view></view>
        <view class="title">{{ vo.title }}</view>
        <view :class="current == index?'on':'not-on'"></view>
      </view>
    </view>

    <view class="sunton-container">
      <view v-for="(item, index) in dataList" :key="index" class="goods-item">
        <goods-item1 :model="item.goods" :url="`/pages/users/product/certificate?goods_id=${item.goods_id}`"></goods-item1>
      </view>
    </view>
  </sunton-main>
</template>

<script>
import GoodsItem1 from "../../goods/components/goods-item1";
import pageModel from "../../../utils/pageModel";
export default {
  mixins: [new pageModel({url: '/api/goods/order-list'})],
  components: {GoodsItem1},
  data() {
    return {
      current: 0,
      categoryList: [],
    };
  },

  onShow() {
    this.utils.httpRequest('/api/goods-category-column', res => {
      this.categoryList = res.data;
      this.tabChange({index: 0});
    });
  },

  methods: {
    tabChange(row) {
      this.onRefresh({category_id: this.categoryList[row.index].id, page: 1});
    },

    yrtabChange(index) {
      this.tabChange({index: index});
      this.current = index
    },
  }
}
</script>

<style scoped lang="scss">
.tab-list {
  width: 750rpx;
  height: 90rpx;
  background: #192c73;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .item {
    font-size: 28rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    height: 100%;

    .title {
      color: #6571ba
    }


    &.on {
      .title {
        color: #ffffff;

      }
    }

    .on {
      width: 40rpx;
      height: 8rpx;
      background: linear-gradient(90.00deg, #44b5ff 0%, #f55686 100%);
      border-radius: 4rpx;
    }

    .not-on {
      width: 40rpx;
      height: 8rpx;
    }
  }

}

.goods-item{
  margin-top: 20rpx;
}
</style>