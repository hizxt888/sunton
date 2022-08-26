<template>
  <u-upload
      :fileList="imagesList"
      @afterRead="afterRead"
      @delete="deletePic"
      :multiple="maxCount<=1 ? true : false"
      width="100"
      height="100"
      :maxCount="maxCount"
  >
    <image src="../static/images/common/10867.png" mode="widthFix" style="width: 200rpx; height: 200rpx;"></image>
  </u-upload>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {return {}}
    },
    maxCount: {
      type: Number,
      default: 9
    }
  },

  data() {
    return {
      imagesList: [],
    }
  },

  watch: {
    imagesList: {
      immediate: true,
      handler(imagesList) {
        var imageList = [];
        for(var index in imagesList)
        {
          if(typeof imagesList[index].filename === "undefined") {
            continue;
          }
          imageList.push(imagesList[index].filename);
        }
        this.$emit('update:list', imageList);
      }
    }
  },

  methods:{
    // 删除图片
    deletePic(event) {
      this.imagesList.splice(event.index, 1)
    },

    // 新增图片
    async afterRead(event) {
      let lists = [].concat(event.file);
      let length = this.imagesList.length;
      lists.map((item) => {
        this.imagesList.push({...item, status: 'uploading', message: '上传中'})
      })

      for (let i = 0; i < lists.length; i++)
      {
        const result = await this.utils.httpUpload(lists[i].url);
        this.imagesList.splice(length, 1, Object.assign(this.imagesList[length], {
          message: '',
          status: 'success',
          url: result.host,
          filename: result.filename,
        }))
        length++;
      }
    },
  }
}
</script>