<template>
  <div id="nav-bar">
    <DetailNavBar/>
    <DetailSwiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import {getDetail} from "network/detail"
  export default {
    name:"Detail",
    //组件
    components:{
      DetailNavBar,
      DetailSwiper
    },
    //属性
    props: {
    },
    //数据
    data() {
      return {
        iid:null,
        topImages:[]
      }
    },
    //调用函数
    methods:{
      getTitleImages(){
        getDetail(this.iid).then(res=>{
          this.topImages=res.result.itemInfo.topImages 
        })
      }
    },
    //计算属性
    computed:{
    
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      //获取传过来的商品iid,注意路由配置path: '/detail/:id',里面参数名是id所以获取的时候是params.id
      this.iid=  this.$route.params.id
      this.getTitleImages()
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

</style>