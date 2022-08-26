import utils from "./index";
import userModel from "./userModel";

export default {

    isClose: false, // socket 链接对象
    socketObjectConnect: null, // socket 链接对象

    handleMessageList: {}, // 事件处理回调函数列表

    messageCallback(type, callback) {
        this.handleMessageList[type] = callback;
    },

    clearHandleMessage() {
        this.handleMessageList = {};
    },

    setHandleMessage(messageList=false) {
        if(! messageList || typeof messageList !== "object") {
            return this.clearHandleMessage();
        }
        this.handleMessageList = messageList;
    },

    async connect() { // socket 连接
        var self = this;
        var model = userModel.getUserModel();
        if( ! model.token ) { // 检测当前是否为登录状态
            return;
        }

        // 获取socket链接参数
        var configModel = (await utils.httpRequest('/api/configs')).data || {};
        if( ! configModel.socket_url ) { // 获取socket连接地址
            return;
        }

        if( this.socketObjectConnect ) {
            return;
        }

        // socket 链接
        this.socketObjectConnect = await uni.connectSocket({
            url: configModel.socket_url,
            header: {
                token: model.token
            }
        });

        uni.onSocketOpen(function (res) {
            console.log('socket success')
        });

        uni.onSocketClose(function() { // 是否为主动关闭
            if(self.isClose) {
                return;
            }
            self.socketObjectConnect = null;
            setTimeout(() => self.connect(), 5000); // 断开连接后，5000后重新尝试一次连接
        });

        uni.onSocketMessage(function(res) { // socket 收到的消息
            var message = JSON.parse(res.data);
            if(typeof message.type === "undefined" || message.type === 'ping') {
                return;
            }
            if(typeof self.handleMessageList[message.type] !== "function") {
                return;
            }
            self.handleMessageList[message.type](message.data, message.type);
        });
    },

    /**
     * 发送数据
     * @param type
     * @param data
     */
    send(type, data={}) {
        if( ! this.socketObjectConnect ) {
            return;
        }
        uni.sendSocketMessage({
            data: JSON.stringify({type: type, data: data}),
            lang: uni.getStorageSync('languageStorage') || 'en',
            success(res) {
                console.log('success', res)
            }
        });
    },

    /**
     * 主动关闭socket链接
     */
    close() {
        if( ! this.socketObjectConnect ) {
            return;
        }
        this.isClose = true; // 设置链接为主动关闭
        this.socketObjectConnect = null; // 重置链接对象
        uni.closeSocket();
    },
}