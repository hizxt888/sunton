<template>
<sunton-main :options="{title: $t('users.questions.title')}">
  <view class="sunton-container scroll-message-body" style="padding-bottom: 150rpx;">
    <view v-for="(row, index) in dataList" :key="index" :class="{
      'sunton-chat-item': true,
      'sunton-chat-item-left': row.admin_id,
      'sunton-chat-item-right': row.admin_id === 0,
    }">
      <view class="avatar" v-if="row.admin_id">
        <image :src="utils.domainImageUrl(utils.isset(row.user, 'cover_url'))"></image>
      </view>

      <view class="chat-item">
        <view class="nickname">
          {{utils.isset(row.user, 'nickname', '')}}
        </view>
        <view class="content" v-if="row.content_type == 'txt'">
          {{row.content}}
        </view>
        <view class="content" v-if="row.content_type == 'image'">
          <image mode="heightFix" style="width: 100%;" :src="utils.domainImageUrl(row.content)"></image>
        </view>
      </view>

      <view class="avatar" v-if="row.admin_id == 0">
        <image :src="utils.domainImageUrl(utils.isset(row.user, 'cover_url'))"></image>
      </view>
      <view style="width: 100%; height: 60rpx; line-height: 60rpx; text-align: center">{{ row.create_time }}</view>
    </view>
  </view>

  <view class="sunton-footer footer">
    <view class="sunton-container">
      <view class="input-content sunton-flex-between">
        <input
            v-model="form.content"
            class="input-content-input"
            @focus="handleFocus(true)"
            @blur="handleFocus(false)"
            :placeholder="$t('users.questions.tip1')"
        />
        <view v-if="show.keyword" @click="submit" class="sunton-footer-button">{{$t('users.questions.tip2')}}</view>
        <image v-else @click="$set(show, 'extMenu', !show.extMenu)" class="input-content-add" src="../../../static/images/users/34.png"></image>
      </view>
      <u-grid v-if="show.extMenu" :border="false" col="5" style="margin: 30rpx 0 30rpx 0;">
        <u-grid-item>
          <image class="grid-image" @click="selectPhoto" src="../../../static/images/common/photo.png"></image>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</sunton-main>
</template>

<script>
export default {

  data() {
    return {
      show: {},
      form: {},
      search: {},
      dataList: [{}],
    };
  },

  onLoad() {
    this.onRefresh();
  },

  onPullDownRefresh() {
    this.onRefresh();
  },


  onReachBottom() {
    this.search.page = 1;
    this.getQuestionList();
  },

  methods: {
    selectPhoto() {
      var self = this;
      uni.chooseImage({
        count: 1,
        success: async chooseImage => {
          var response = await self.utils.httpUpload(chooseImage.tempFilePaths[0]);
          if( ! response.filename ) {
            return;
          }

          self.form.content_type = 'image';
          self.form.content = response.filename;
          self.submit();
        }
      });
    },

    submit() {
      var self = this;
      if( ! self.form.content ) {
        return;
      }

      self.utils.httpRequest('/api/question/send', {
        method: 'POST',
        data: self.form,
        callback(res) {
          self.dataList.push(res.data);
          self.getScrollTop();
          self.$set(self, 'show', {});
          self.$set(self, 'form', {});
        }
      })
    },

    handleFocus(status) {
      if(this.form.content) {
        status = true;
      }
      this.$set(this.show, 'keyword', status);
    },

    onRefresh() {
      this.search.page = 1;
      this.getQuestionList();
    },

    getQuestionList() {
      var self = this;
      self.utils.httpRequest('/api/questions', {
        method: 'POST',
        data: self.search,
        callback(res) {
          self.dataList = self.dataList.concat((res.data.data).reverse());
          self.getScrollTop();
        },
        complete() {
          uni.stopPullDownRefresh()
        }
      })
    },

    getScrollTop() {
      setTimeout(() => {
        uni.pageScrollTo({duration: 0, scrollTop: 99999999});
      }, 100);
    },
  }
}
</script>

<style scoped lang="scss">
.grid-image{
  width: 60rpx;
  height: 60rpx;
}

.sunton-chat-item{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 50rpx;
  flex-wrap: wrap;
  .avatar{
    width: 60rpx;
    height: 60rpx;
    border-radius: 30rpx;
    background-color: #192c73;
    margin-right: 10rpx;
    image{
      width: 60rpx;
      height: 60rpx;
      border-radius: 30rpx;
    }
  }
  .chat-item{
    width: auto;
    height: auto;
    max-width: calc(100% - 100rpx);
    margin-right: 10rpx;
    .content{
      width: auto;
      height: auto;
      background-color: #192c73;
      padding: 10rpx;
      border-radius: 10rpx;
    }
  }
}

.sunton-chat-item-left{
  justify-content: flex-start;
  .nickname{
    text-align: left;
    height: 60rpx;
    line-height: 60rpx;
  }
}

.sunton-chat-item-right{
  justify-content: flex-end;
  .nickname{
    text-align: right;
    height: 60rpx;
    line-height: 60rpx;
  }
}








.footer{
  width: 100%;
  height: auto;
  min-height: 100rpx;
  background-color: #192C73;
  .input-content{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;

    .input-content-input{
      width: calc(100% - 220rpx);
      height: 80rpx;
      border-radius: 40rpx;
      background: #141d5b;
      margin-top: 10rpx;
      padding: 0 40rpx 0 40rpx;
    }

    .sunton-footer-button{
      width: 130rpx;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      border-radius: 40rpx;
      background: linear-gradient(180.00deg, #44b5ff 0%, #f55686 100%);
      box-shadow: 0 20rpx 20rpx rgba(0, 0, 0, 0.06);
      color: #FFFFFF;
    }

    .input-content-add{
      width: 60rpx;
      height: 60rpx;
      margin: auto;
    }
  }
}
</style>