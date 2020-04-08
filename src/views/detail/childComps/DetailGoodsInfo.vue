<template>
  <div class="image-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div :key="index" v-for="(item, index) in detailInfo.detailImage">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          :key="imageIndex"
          :src="image"
          @load="imgLoad"
          alt=""
          v-for="(image, imageIndex) in item.list"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      count: 0,
      imagesLength: 0
    };
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      /**
       * imgLoad为了滚动组件滚动效果
       * 图片是纵向排列，所以需要加载完所有的图片才确定最终高度
       * 这样写法只为丢出一次
       * ++this.count写法等于this.count=this.count+1,++在前先加在判断
       */
      // if (++this.count === this.imagesLength) {
      //   this.$emit("imgLoad");
      // }

      /**
       * 由于图片可能过多，全部加载完在丢事件可能会导致滚动卡顿
       * 这里我们时刻丢出，监听方采用防抖方式处理
       */
      this.$emit("imgLoad");
    }
  },
  /**
   * watch:监听属性变化
   * 这里监听detailInfo属性
   * imagesInfo属性默认为{}，当imagesInfo不为{} 获取图片数组长度
   * imgLoad函数里面this.imagesLength值就是这么来的
   */
  watch: {
    imagesInfo() {
      this.imagesLength = this.imagesInfo.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped>
.image-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  content: "";
  background-color: #333333;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  font-size: 14px;
  padding: 15px 0;
}

.info-key {
  font-size: 15px;
  margin: 10px 0 10px 15px;
  color: #333333;
}

.info-list img {
  width: 100%;
}
</style>
