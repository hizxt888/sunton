<script>
export default {
  onLaunch: function() {

  },

  onShow: function() {
    uni.setTabBarItem({index: 0, text: this.$i18n.messages[this.$i18n.locale].tabbar.home});
    uni.setTabBarItem({index: 1, text: this.$i18n.messages[this.$i18n.locale].tabbar.users});
  },
}
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import "static/css/common.scss";
@import "static/icon/iconfont.css";
</style>
