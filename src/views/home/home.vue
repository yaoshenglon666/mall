<template>
  <div id="home">
    <!-- 头部导航 -->
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <!--  tabControl做吸顶效果 默认隐藏-->
    <TabControl  :titles="['流行','新款','精选']" @tabClick="tabClick"
      ref="tabControl1" class="tabControl" v-show="isTabFixed"/>
    <!-- 
      使用滚动组件一定要设定高度
      将要滚动的区域放在scroll组件里面
      组件Scroll属性probeType为驼峰定义方式，在绑定属性的时候要使用 - 因此:probe-type
    -->
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScrool"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
    <!-- 
        监听图片加载事件，为了tabControl吸顶效果，
      -->
      <HomeSwier :banners="banners" @swierImgLoad="swierImgLoad"/>
      <Recommend :recommends="recommends" />
      <Feature />
      <!--tabcontrol正常位置
        监听组件TabControl丢出的点击事件来切换数据
      -->
      <TabControl  :titles="['流行','新款','精选']" @tabClick="tabClick"
      ref="tabControl2" />
      <GoodsList :goods="showGoods" />
    
    </Scroll>
    <!--  @click.native使组件拥有click事件 -->
    <BackTop @click.native="backLick" v-show="isShow" />
  </div>
</template>

<script>
import HomeSwier from "./childComps/HomeSwier";
import Recommend from "./childComps/HomeRecommendView";
import Feature from "./childComps/HomeFeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import {debounce} from "common/utils.js"

import methods from "./methods";

export default {
  name: "home",
  components: {
    HomeSwier,
    Recommend,
    Feature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShow: false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    };
  },
  //计算属性
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  //组件初始化后需要调用的方法
  created() {
    this.getHomeMulitdata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    
  },
  //挂载结束
  mounted(){
    /**
     * GoodListItem组件创建better-scroll对象是在mounted里创建的
     * 所以在监听他丢出来的事件的时候我们也放在mounted里
     * 放在created里面监听怕有时候无法访问到better-scroll
     * 监听GoodListItme丢出的图片加载完成事件，以便刷新better-scroll 
     * 由于图片加载事件过于平凡，采用防抖函数来处理，防抖函数用于处理调用平凡的地方
     * 将要执行的操作this.$refs.scroll.refresh传入debounce，此处.refresh不能带()，因为传入的是函数 ，500为延迟时间
     * debounce函数最终返回的是一个函数其实就是你传入的操作this.$refs.scroll.refresh
     * 监听到图片事件此处不在执行this.$refs.scroll.refresh而执行refresh(ebounce函数返回的函数)
     */
    const refresh=debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    }) 
  },
  //销毁
  destroyed(){
  },
  //活跃
  activated(){
    //再次获取活跃也就是返回的时候获取离开前滚动的高度
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  //离开
  deactivated(){
    //离开的时候记录一下当前滚动的位置
    this.saveY=this.$refs.scroll.getScrollY()  
  },
  methods
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  color: #fff;
  /* 在使用原生滚动的时候为了不让导航跟着滚动而设置，现在采用了better-scroll就不需要了 */
  /* position: fixed;
  left: 0;
  right: 0px;
  top: 0px;
  z-index: 9; */
}

.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabControl{
  position: relative;
  z-index: 9;
}
</style>
