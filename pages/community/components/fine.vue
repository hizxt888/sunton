<template>
	<navigator hover-class="none" :url="`/pages/community/details?id=${model.id}`">
		<view class="sunton-flex-between">
			<view>{{ model.title || 'New Arrivals' }}</view>
			<view style="color: rgba(255,255,255,0.6);">{{ model.create_time }}</view>
		</view>

		<view class="sunton-common-action-button" style="width: max-content; margin-top: 10rpx;">Recommend</view>

		<view style="margin: 30rpx 0 30rpx 0;color: #8ba6dc">{{ model.content }}</view>

		<view class="fine-image-group">
			<image mode="widthFix" v-for="(url, index) in JSON.parse(model.images)" :key="index" :src="utils.domainImageUrl(url)"></image>
		</view>

    <comment-user-list :model="model"></comment-user-list>
	</navigator>
</template>

<script>
import CommentUserList from "./comment-user-list";
export default {
  components: {CommentUserList},
  props: {
		model: {
			type: Object,
			default: () => {
				return {};
			}
		}
	}
};
</script>

<style scoped lang="scss">
.official-image {
	width: 100%;
	height: auto;
	border-radius: 20rpx;
	margin-top: 40rpx;
}
.official-fine-post,
.sunton-common-action-button{
	width: auto;
	height: 44rpx;
	line-height: 44rpx;
	border-radius: 5rpx;
	padding: 0 10rpx;
	background: linear-gradient(180deg, #f0555a 0%, #ffa153 100%);
}
.official-fine-post:active {
	opacity: 0.8;
}

.fine-image-group {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
	image {
		width: calc(33.33% - 15rpx);
		height: auto;
		min-height: 200rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	image:nth-child(3n + 0) {
		margin-right: 0;
	}
}

.sunton-image-list {
	width: calc(33.33% - 10rpx);
	height: auto;
	margin-right: 10rpx;
	margin-left: 10rpx;
}
.sunton-group-top20 {
	display: flex;
}
.sunton-group-top20 image {
	vertical-align: middle;
	margin-right: 10rpx;
}
.people-wrap {
	flex-wrap: nowrap;
	display: flex;
}
.people-list {
	padding-right: 20rpx;
	display: flex;
}
.people-list image {
	margin-left: -20rpx;
}
</style>
