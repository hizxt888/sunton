// 用户的登录信息
export default {
    cacheKey: "storage-users",

    /**
     * @returns {boolean}
     */
    checkUserLogin() {
        var userModel = this.getUserModel();
        if(typeof userModel.token === "undefined" || ! userModel.token) { // 跳转登录页
            uni.navigateTo({url: '/pages/login/index'});
            return false;
        }
        return true;
    },

    /**
     * @param data
     */
    setUserModel(data) {
        uni.setStorageSync(this.cacheKey, JSON.stringify(data));
    },

    /**
     * 改变一个值
     * @param field
     * @param value
     */
    setUserModelField(field, value='') {
        var userModel = this.getUserModel();
        userModel[field] = value;
        this.setUserModel(userModel);
    },

    /**
     * @returns {any}
     */
    getUserModel() {
        return JSON.parse(uni.getStorageSync(this.cacheKey) || '{}');
    },

    /**
     * @returns {any}
     */
    removeUserModel() {
        uni.removeStorageSync(this.cacheKey);
    },
}