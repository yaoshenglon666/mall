<template>
  <!-- 滚动的区域 -->
  <div class="warpper" ref="warpper">
    <!-- 滚动内容 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  // 导入插件
  import BScroll from 'better-scroll'
  export default {
    //组件
    components:{
    
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        scroll:null,
      }
    },
    //调用函数
    methods:{
      //封装better-scroll插件对象回到顶部函数scrollTo（x,y,time）
      //方便外部调用
      scrollTo(x,y,time){
        //获取better-scroll插件对象
        //调用回到顶部函数scrollTo（x,y,time）
        this.scroll.scrollTo(x,y,time)
      },
      //继续滚动下一次
      finishPullUp(){
        this.scroll.finishPullUp()
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
      /**
       * new BScroll（par1:滚动区域,par2事件设置参数）
       * 创建插件对象需要传入滚动区域，所以必须在mounted函数里面创建，created函数里面无法获取template元素
       */
      this.scroll=new BScroll(this.$refs.warpper,{
        /**事件scroll参数
         * 参数默认值为:0
         * 0，1无意义
         * 2可以获取滚动时候的坐标
         * 3可以获取滚动时候的坐标以及自动滚动的坐标
         * 
         * 是否实时监听滚动由调用者决定
         */
        probeType:this.probeType,
        //事件pullingUp参数
        pullUpLoad:this.pullUpLoad,
        //滚动区域内可以监听事件
        click:true
      })
       //滚动事件，回调函数默认参数position为坐标
      this.scroll.on('scroll',(position)=>{
         //丢出滚动事件及其坐标，调用者可通过获取此函数操作
        this.$emit('scroll',position)
      })
      // 滚动到底部的时候触发事件，用来做获取更多数据
      //  this.scroll.finishPullUp()
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
        
      })
    },
  }
</script>
<style scoped>
/* @import url; 引入css类 */

</style>