<template>
  <NavBar>
    <div slot="left" class="left" @click="bClick"><img src="~assets/img/common/back.svg" alt=""></div>
    <div slot="center" class="titles">
      <div v-for="(item,index) in titles" class="titles-item"
      :class="{active:currentIndex==index}"
      @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </NavBar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name:"DetailNavBar",
    //组件
    components:{
      NavBar
    },
    //属性
    props: {
    },
    //数据
    data() {
      return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0,
      }
    },
    //调用函数
    methods:{
      itemClick(index){
        this.currentIndex=index
      },
      bClick(){
        this.$router.back()
      }
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
  .titles{
    display: flex;
  }
  .titles-item{
    flex: 1px;
    font-size: 14px;
  }
  .left img{
    margin-top: 10px;
  }
  .active{
    color: var(--color-high-text);
  }
</style>