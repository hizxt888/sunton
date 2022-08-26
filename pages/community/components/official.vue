<template>
	<navigator hover-class="none" :url="`/pages/community/details?id=${model.id}`">
		<image mode="widthFix" class="official-image" :src="utils.domainImageUrl(model.cover_url)"></image>
		<view style="margin-top: 20rpx;">
			<view class="sunton-flex-between" style="padding-bottom: 15rpx; flex: 1;">
				<view style="font-size: 38rpx">{{ model.title }}</view>
				<view class="official-fine-post">Fine</view>
			</view>
			<view style="color: rgba(255,255,255,0.6);">{{ model.create_time }}</view>
		</view>

		<view style="padding: 20rpx 0 20rpx 0;color:  #8ba6dc;">{{ model.content }}</view>


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
}
.official-fine-post {
	width: 300rpx;
	height: 44rpx;
	line-height: 44rpx;
	border-radius: 5rpx;
	padding: 0 20rpx;
	background: linear-gradient(180deg, #f0555a 0%, #ffa153 100%);
	text-align: center;
}
.official-fine-post:active {
	opacity: 0.8;
}
.sunton-group-top20{
	display: flex;
}
.sunton-group-top20 image{
	vertical-align: middle;
	margin-right: 10rpx;
}
</style>
