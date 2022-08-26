<template>
	<sunton-main :options="{title: $t('goods.title')}">
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

		<view class="goods-list">
			<view class="item" v-for="(item, index) in dataList" :key="index">
        <image style="width: 100%; height: auto;" mode="widthFix" :src="utils.domainImageUrl(item.cover_url)"></image>
				<view class="info">
					<view class="left">
						<view class="title">{{ item.title }}</view>
						<view class="price">{{ item.price }}USDP</view>
					</view>
					<navigator  v-if="item.inventory_count > item.sold_count" class="right" :url="'/pages/goods/details?id='+item.id">
						<image src="/static/images/goods/buy.png"></image>
					</navigator>
				</view>
			</view>
		</view>
	</sunton-main>
</template>

<script>
import pageModel from '../../utils/pageModel';
import GoodsItem from "./components/goods-item";

export default {
	mixins: [new pageModel({url: '/api/goods'})],
	components: {GoodsItem},
	data() {
		return {
      overlay_url: '',
      show: {},
			categoryList: [],
			current: 0,
		};
	},

  onLoad(options) {
    this.$set(this, 'current', options.category_index || 0);
  },
	
	onReady() {
		this.utils.httpRequest('/api/goods-category-column', res => {
			this.categoryList = res.data;
			this.tabChange({index: this.current});
		});
	},
	
	methods: {
		tabChange(row) {
			this.onRefresh({category_id: this.categoryList[row.index].id});
		},

		yrtabChange(index) {
			this.tabChange({index: index});
			this.current = index
		},
	}
}
</script>

<style scoped lang="scss">
.warp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.rect {
  width: 90%;
  height: auto;
}
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

.goods-list{
	width:750rpx;
	box-sizing: border-box;
	padding:30rpx;
	padding-top: 0;
	display: flex;
	flex-direction:row;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin-top: 30rpx;
	.item{
		width: calc(50% - 10rpx);
    max-width: 500rpx;
		height: auto;
		padding:20rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		background: #192c73;
		box-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
    margin-bottom: 20rpx;
		.image /deep/*{
			width: 300rpx;
			height: 300rpx;
			border-radius: 10rpx;
		}
		.info{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;
			.left{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				padding-top: 10rpx;
				.title{
					font-size: 28rpx;
					text-align: left;
					color: #fff;
					margin-bottom: 10rpx;
				}
				.price{
					font-weight: bold;
					font-size: 30rpx;
					text-align: left;
					color: #ffc929;
				}
			}
			.right{
				image{
					width: 60rpx;
					height: 60rpx;
					background: transparent;
				}
			}
		}
	}
}

.category-body {
	background-color: #192c73;
}

.goods-body {
	padding-bottom: 50rpx;
}
</style>