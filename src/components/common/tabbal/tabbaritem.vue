<template>
  <!--
    定义一个点击事件
    图片字体颜色根据是否被选中决定
  -->
  <div class="tab-bal-item" @click="itemClick()">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>

</template>

<script>
  export default {
    name: "tabbaritem",
    props:{
      //当前路径
      path:{type:String},
      //选中后的字体颜色
      activeColor:{type:String,default:'red'}
    },
    // data(){
    //   return {isActive:true}
    // },
    computed:{
      //判断自己是否被选中
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1
      },
      //选中后的字体颜色
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      //跳转路由
      itemClick(){
        // this.$router.replace(this.path)
        this.$router.push(this.path)
        //console.log(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bal-item{flex: 1px; text-align: center;height: 49px;
  font-size: 14px;}
  .tab-bal-item img{width: 24px;height: 24px;margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;}

</style>
