<template>
	<sunton-main class="sunton-users-main" :options="{title: $t('users.team.tip6')}">
    <rich-text :nodes="content"></rich-text>
	</sunton-main>
</template>

<script>
	export default {
		data() {
			return {
        content: ""
			}
		},

    onLoad(options) {
      this.utils.httpRequest(`/api/agreement/team_instruction${options.code}_content`, res => this.content = res.data);
    },
	}
</script>

<style lang="scss">
	@import "../../../static/css/mj_common.css";

	.sunton-users-main {
		background-image: url("../../../static/images/users/user_mj_bg.png");
		background-position: left top;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
	.title{
		font-size: 30rpx;
		font-weight: bold;
		line-height: 1.3;
		margin: 20rpx 30rpx;
		text-align: center;
	}
	.con{
		margin: 0 30rpx;
	}
</style>
