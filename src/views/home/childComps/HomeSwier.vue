<template>
  <swiper>
    <swiper-item v-for="(banner,index) in banners" :key="index">
      <a :href="banner.link">
        <img :src="banner.image" @load="imgLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "HomeSwier",
    components: {
      Swiper,
      SwiperItem,
    },
    data(){
      return {
        isLoad:false
      }
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      imgLoad(){
        /**
         * swierImgLoad为了tabControl2组件吸顶效果
         * 轮播图是并排排列 所以只需要加载一次就可以确定高度
         * 只需要丢出一次事件即可，所以不需要使用防抖,通过isLoad判断即可
         * 这样写法只为丢出一次
         */
        if(!this.isLoad){
          this.$emit("swierImgLoad")
          this.isLoad=true
        }
      }
    }
  }
</script>

<style scoped>

</style>
