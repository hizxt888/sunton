export default function(config)
{
    if(typeof config !== "object") {
        config = {};
    }

    if(typeof config.search === "undefined") {
        config.search = {};
    }

    config.search.page = 1;
    return {
        data() {
            return {
                show: {},
                dataList: [],
                apiUrl: config.url || '',
                search: config.search || {},
            };
        },

        onPullDownRefresh() {
            this.onRefresh();
        },

        onReachBottom() {
            this.showElement('status', 'loading');
            this.getDataList();
        },

        methods: {
            showElement(field, state) {
                this.$set(this.show, field, state);
            },

            async onRefresh(search={}) {
                if(Object.keys(search).length) {
                    this.search = search;
                }

                this.search.page = 1;
                this.showElement('status', 'loadmore');
                this.$set(this, 'dataList', []);
                await this.getDataList();
                uni.stopPullDownRefresh();
            },

            async getDataList() {
                this.showElement('status', 'loading');
                var response = await this.utils.httpRequest(this.apiUrl, {data: this.search});

                this.showElement('status', 'loadmore');
                if( ! response.data.data.length ) {
                    this.showElement('status', 'nomore');
                    return;
                }

                if(typeof this.handleBeforeTableList === "function") {
                    response.data.data = this.handleBeforeTableList(response.data.data);
                }

                this.dataList = this.dataList.concat(response.data.data);
                if(typeof this.handleAfterTableList === "function") {
                    this.handleAfterTableList(this.dataList);
                }
                this.search.page += 1;
            },
        }
    };
}