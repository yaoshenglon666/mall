<template>
  <swiper>
    <swiper-item v-for="banner in banners">
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
        //只需要丢出一次事件即可，所以不需要使用防抖,通过isLoad判断即可
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
