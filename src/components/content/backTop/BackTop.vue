<template>
  <div class="back-top" >
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    //组件
    components:{
    
  },
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
  }
</script>
<style scoped>
/* @import url; 引入css类 */
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
  .back-top img{
    width: 43px;
    height: 43px;
  }
</style>