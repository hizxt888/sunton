import Config from "../configs";
import userModel from "./userModel";
export default {
    /**
     * 暂停时间
     * @param time
     * @returns {Promise<void>}
     */
    async sleep(time) {
        await new Promise(resolve => {
            setTimeout(() => resolve(), time);
        })
    },

    /**
     * 检测参数是否在
     * @param params
     * @param field
     * @param defaultValue
     * @returns {string|*}
     */
    isset(params, field, defaultValue='') {
        try{
            if(typeof params[field] === "undefined") {
                return defaultValue;
            }
            return params[field];
        }catch (e) {
            return defaultValue;
        }
    },


    /**
     * 获取图片的完整地址
     * @param path
     * @param def
     * @param domain
     * @returns {string|*}
     */
    domainImageUrl(path, def='', domain='') {
        if( ! path ) {
            return def;
        }
        return this.domainUrl(path, domain?domain:Config.image_url);
    },

    /**
     * 获取一个完整的网络地址
     * @param path
     * @param domain
     * @returns {string}
     */
    domainUrl(path, domain='')
    {
        if( ! path ) {
            path = '/'
        }

        if(path.indexOf('..') === 0  || path.indexOf('./') === 0 || path.indexOf('/..') === 0) {
            return path;
        }

        if(path.indexOf('https://') === 0  || path.indexOf('http://') === 0) {
            return path;
        }

        domain = domain ? domain : Config.api_url;
        if(domain.lastIndexOf("/") !== domain.length-1) {
            domain += "/";
        }

        if(path.indexOf("/") === 0) {
            path = path.substr(1, path.length);
        }
        return domain + path;
    },

    async httpUpload(url, options={}) {
        var self = this;
        var headers = options.header || {};
        var model = userModel.getUserModel();
        if(typeof model.token !== "undefined") {
            headers.token = model.token;
        }

        return await new Promise(resolve => {
            uni.uploadFile({
                url: self.domainUrl('/api/upload/image'),
                filePath: url,
                name: 'file',
                header: headers,
                success: (ret) => {
                    self.handleApiState(ret.data, {
                        callback(ret) {
                            resolve(ret.data)
                        },
                        error() {
                            resolve(false)
                        }
                    })
                }
            });
        })
    },

    /**
     * 网络请求
     * @param url
     * @param options
     * @returns {Promise<unknown>}
     */
    async httpRequest(url, options={})
    {
        if(typeof options === "function") {
            let callback = options;
            options = {};
            options.callback = callback;
        }

        if( ! Object.keys(options).length ) {
            options = {};
            options.callback = res => {return res;};
        }

        var self = this;
        var headers = options.header || {};
        var model = userModel.getUserModel();
        if(typeof model.token !== "undefined") {
            headers.token = model.token;
        }

        options.data = options.data || {};
        options.data.version = Config.version;
        options.data.lang = uni.getStorageSync('languageStorage') || 'en';
        return await new Promise(resolve => {
            uni.request({
                url: self.domainUrl(url),
                method: options.method || 'GET',
                data: options.data,
                header: headers,
                dataType: 'JSON',
                success(ret) {
                    resolve(ret.data);
                    self.handleApiState(ret.data, options);
                },
                fail(error) {
                    resolve(false);
                    if(typeof options.error === "function") {
                        return options.error(error);
                    }
                    uni.showToast({title: error.errMsg, icon: 'none', duration: 1500});
                },
                complete(ret) {
                    if(typeof options.complete === "function") {
                        return options.complete(ret);
                    }
                    uni.hideLoading(); // 隐藏Loading
                },
            })
        });
    },

    /**
     * 处理接口状态
     * @param ret
     * @param options
     * @returns {*}
     */
    handleApiState(ret, options={}) {
        if(typeof ret === "string") {
            try{
                ret = JSON.parse(ret);
            } catch (e) {
                ret = {};
            }
        }

        switch (parseInt(ret.code))
        {
            case 1000:
            case 1001:
            case 1002:
            case 1003:
            case 1201:
                userModel.removeUserModel();
                uni.reLaunch({url: '/pages/login/index'});
                break;

            case 1:
                if(typeof options.error === "function") {
                    return options.error(ret);
                }
                uni.showToast({title: ret.message, icon: 'none', duration: 1500});
                break;

            case 0:
                if(typeof options.callback === "function") {
                    return options.callback(ret);
                }

                if(typeof options.success === "function") {
                    options.success(ret);
                }

                if(typeof options.callback === "undefined" && typeof options.success === "undefined") {
                    return;
                }

                uni.showToast({title: ret.message, icon: 'none', duration: 1500});
                break;

            default:
                uni.showToast({title: ret.message, icon: 'none', duration: 1500});
                if(typeof options.callback === "function") {
                    return options.callback(false);
                }
                break;
        }
    },
}