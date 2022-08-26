<template>
	<navigator hover-class="none" :url="`/pages/community/details?id=${model.id}`">
		<image mode="widthFix" v-if="model.cover_url" class="official-image" :src="utils.domainImageUrl(model.cover_url)"></image>
		<view style="padding: 20rpx 0 20rpx 0;color:  #8ba6dc">{{ model.content }}</view>
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

<style scoped>
.official-image {
	width: 100%;
	height: auto;
	border-radius: 20rpx;
	margin-top: 40rpx;
}
.official-fine-post {
	width: auto;
	height: 44rpx;
	line-height: 44rpx;
	border-radius: 5rpx;
	padding: 0 30rpx 0 30rpx;
	background: linear-gradient(180deg, #f0555a 0%, #ffa153 100%);
}
.official-fine-post:active {
	opacity: 0.8;
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
