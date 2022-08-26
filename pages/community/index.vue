<template>
	<sunton-main :options="{ title: $t('community.title') }">
		<view class="sunton-container" style="padding-bottom: 200rpx;">
			<view v-for="(row, index) in recommendList" :key="index" style="margin-top: 40rpx;">
				<view class="sunton-flex-between">
					<view style="font-size: 40rpx;">{{ row.title }}</view>
					<navigator hover-class="none" :url="`/pages/community/${row.type}`" class="sunton-common-more">
            {{ $t('index.tip5') }}
          </navigator>
				</view>

				<view class="sunton-group-top20">
					<promotions v-if="row.type == 'promotions'" :model="row.data"></promotions>
					<fine v-if="row.type == 'fine'" :model="row.data"></fine>
					<official v-if="row.type == 'official'" :model="row.data"></official>
				</view>
			</view>
		</view>

		<view class="sunton-footer" style="height: 150rpx;">
			<view class="sunton-container">
				<navigator hover-class="none" url="/pages/community/release" class="sunton-button">
          {{ $t('community.tip1') }}
        </navigator>
			</view>
		</view>
	</sunton-main>
</template>

<script>
import Promotions from './components/promotions';
import Fine from './components/fine';
import Official from './components/official';
export default {
	components: { Official, Fine, Promotions },
	data() {
		return {
			recommendList: []
		};
	},

	onReady() {
		this.utils.httpRequest('/api/community/recommend', res => (this.recommendList = res.data));
	}
};
</script>

<style scoped></style>
