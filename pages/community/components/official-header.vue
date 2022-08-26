<template>
  <view class="sunton-group-top20">
    <view style="font-size: 38rpx;">{{ model.title }}</view>
    <view style="line-height: 80rpx; height: 80rpx;color:#8ba6dc">{{ model.create_time }}</view>

    <image mode="widthFix" style="width: 100%;" :src="utils.domainImageUrl(model.cover_url)"></image>

    <view style="padding: 20rpx 0 20rpx 0;color:#8ba6dc">{{ model.content }}</view>
  </view>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
}
</script>

<style scoped lang="scss">
.official-header {
	width: 100%;
	position: relative;
	image {
		width: 100%;
	}
	.official-footer {
		min-height: 150rpx;
		bottom: 0;
		line-height: 50rpx;
		padding: 10rpx 20rpx;
		box-shadow: border-box;
		position: relative;
		.title{
			font-size: 50rpx;
		}
		& > view{
			position: relative;
			z-index: 555;
		}
	}
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
.group-header {
	width: 300rpx;
	height: 80rpx;
	border-radius: 20rpx 0 36rpx 0;
	text-align: center;
	line-height: 80rpx;
	background: linear-gradient(180deg, #44b5ff 0%, #f55686 100%);
}

.sunton-footer-stype {
	height: 120rpx;
	background-color: #0f257c;
}
.sunton-footer-left {
	width: calc(100% - 170rpx);
	height: 80rpx;
	input {
		background-color: #141d5b;
		height: 80rpx;
		padding: 0 30rpx 0 30rpx;
		border-radius: 40rpx;
	}
}

.sunton-footer-right {
	width: 150rpx;
	height: 80rpx;
	.sunton-button {
		height: 80rpx;
		line-height: 80rpx;
		min-height: 80rpx;
		max-height: 80rpx;
	}
}
.good,
.not-good {
	width: calc(50% - 70rpx);
	height: 80rpx;
	border-radius: 40rpx;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
	padding: 0 30rpx 0 30rpx;
	:active {
		opacity: 0.8;
	}
}
.good {
	background: #44b5ff;
}
.not-good {
	background: #f55686;
}

.main-wrap{
}
/**********评论相关样式*********/
$t-color: #8ba6dc;
.comment-wrap {
	min-height: 200rpx;
	background-color: #192c73;
	border-radius: 10rpx;
	padding: 30rpx;
	box-sizing: border-box;
	margin-bottom: 140rpx;
	.soft-text{
		color: $t-color;
	}
	.light-text{
		color: white;
	}
	.comment-item {
		margin-bottom: 30rpx;
		&:last-child{
			margin-bottom: 0;
		}
		.com-top{
			display: flex;
			.com-mid{
				flex: 2;
				.light-text{
					font-size: 28rpx;
					padding-bottom: 10rpx;
				}
				.soft-text{
					font-size: 24rpx;
				}
			}
			.com-left{
				width: max-content;
				margin-right: 10rpx;
			}
		}
		.commonet-avatar {
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
		}
		.comment-text{
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}
		.comment-pic{
			display: flex;
			flex-wrap: wrap;
			.pic-item{
				display: inline-block;
				width: 180rpx;
				height: 180rpx;
				margin-right: 10rpx;
				margin-bottom: 10rpx;
				border: 1px dashed #FFFFFF;
			}
		}
	}
}
.official-fine-post {
	width: max-content;
	height: 44rpx;
	line-height: 44rpx;
	border-radius: 5rpx;
	padding: 0 20rpx;
	background: linear-gradient(180deg, #f0555a 0%, #ffa153 100%);
}

</style>
