<template>
<sunton-main>
  <view class="sunton-container" style="padding-bottom: 150rpx;">

    <fine-header v-if="model.type == 'fine'" :model="model"></fine-header>
    <promotion-header v-if="model.type == 'promotions'" :model="model"></promotion-header>
    <official-header v-if="model.type == 'official'" :model="model"></official-header>

    <view class="sunton-group" style="margin-top: 20rpx; padding: 0 !important; border-top-left-radius: 40rpx;">
      <view class="group-header">{{ $t('community.details.tip1') }}</view>
      <view style="padding:0 20rpx 20rpx;">
        <view style="height: 100rpx; line-height: 100rpx; font-size: 36rpx;">{{$t('community.details.tip2')}}</view>

        <view class="sunton-flex-between">
          <view class="sunton-flex-left">
            <image style="width: 35rpx; height: 35rpx;margin-right: 10rpx;" src="../../static/images/community/16144.png"></image>
            <view>{{model.thumb_count + model.trample_count}} {{ $t('community.details.tip3') }}</view>
          </view>
        </view>

        <view class="sunton-flex-between">
          <view @click="handleSupport(1)" class="good sunton-flex-between">
            <view>
              <view>{{ $t('community.details.tip4') }}</view>
              <view>{{ model.thumb_count }}</view>
            </view>
            <image style="width: 40rpx; height: 40rpx;" src="../../static/images/community/16145.png"></image>
          </view>

          <view @click="handleSupport(0)" class="not-good sunton-flex-between">
            <image style="width: 40rpx; height: 40rpx;" src="../../static/images/community/16146.png"></image>
            <view>
              <view>{{ $t('community.details.tip5') }}</view>
              <view>{{ model.trample_count }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view style="font-size: 40rpx;line-height: 80rpx; margin-top: 30rpx;">{{ $t('community.details.tip6') }}</view>

    <!-- 评论 -->
    <view class="comment-wrap">
      <comment-item v-for="(item, index) in dataList" :key="index" :model="item"></comment-item>
    </view>
  </view>

  <view class="sunton-footer sunton-footer-stype">
    <view class="sunton-container sunton-flex-between" style="height: 100%;">
      <view class="sunton-footer-left">
        <input v-model="form.content" :placeholder="$t('community.details.tip7')" />
      </view>
      <view class="sunton-footer-right">
        <view class="sunton-button" @click="postComment">{{ $t('community.details.tip8') }}</view>
      </view>
    </view>
  </view>
</sunton-main>
</template>

<script>
import CommentItem from "./components/comment-item";
import FineHeader from "./components/fine-header";
import PromotionHeader from "../../components/promotion-header";
import OfficialHeader from "./components/official-header";
import pageModel from "../../utils/pageModel";
export default {
  mixins: [new pageModel({url: '/api/community/comment-list'})],
  components: {OfficialHeader, PromotionHeader, FineHeader, CommentItem},
  data() {
    return {
      form: {},
      model: {},
      options: {}
    };
  },

  onLoad(options) {
    this.options = options || {};
  },

  onReady() {
    this.getCommunityDetail();
  },

  methods: {
    postComment() {
      var self = this;
      if( ! self.form.content) {
        uni.showToast({title: self.$t('community.details.tip9'), icon: 'none'});
        return;
      }

      self.form.community_id = self.model.id;
      self.utils.httpRequest('/api/community/comments', {
        method: 'POST',
        data: self.form,
        success() {
          self.$set(self, 'form', {});
          self.getCommunityDetail();
        }
      });
    },

    handleSupport(is_support) {
      var self = this;
      if(self.model.support) {
        return;
      }

      self.utils.httpRequest('/api/community/support', {
        method: 'POST',
        data: {community_id: self.model.id, is_support: is_support},
        success() {
          self.getCommunityDetail();
        }
      })
    },

    getCommunityDetail() {
      this.utils.httpRequest('/api/community/details?id=' + this.options.id || 0, res => {
        res.data.images = res.data.images ? JSON.parse(res.data.images) : [];

        var images = [];
        for(var index in res.data.images) {
          images.push(this.utils.domainImageUrl(res.data.images[index]));
        }
        res.data.images = images;

        this.model = res.data;
        this.onRefresh({community_id: this.model.id});
      });
    }
  }
}
</script>

<style scoped lang="scss">
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
  border-radius: 40rpx 0 36rpx 0;
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
/**********评论相关样式*********/
$t-color: #8ba6dc;
.comment-wrap {
  min-height: 200rpx;
  background-color: #192c73;
  border-radius: 10rpx;
  padding: 30rpx;
  box-sizing: border-box;
  .soft-text {
    color: $t-color;
  }
  .light-text {
    color: white;
  }
}
</style>