<template>
    <swiper class="detail-swier">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt=""/>
      </swiper-item>
    </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from "components/common/swiper/index";
  export default {
    name:"DetailSwiper",
    //组件
    components:{
      Swiper, 
      SwiperItem,
    },
    //属性
    props: {
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    //数据
    data() {
      return {
        
      }
    },
    //调用函数
    methods:{
    
    },
    //计算属性
    computed:{
    
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      
    },
    //挂载结束
    mounted() {
    },
    //销毁
    destroyed() {
    },
    //销毁
    activated() {
    },
    //离开
    deactivated() {
    },
  }
</script>
<style scoped>
/* @import url; 引入css类 */
  .detail-swier{
    height: 300px;
    overflow: hidden;
  }
</style>