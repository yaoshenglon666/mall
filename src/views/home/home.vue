<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <!-- 组件Scroll属性probeType为驼峰定义方式，在绑定属性的时候要使用 - 因此:probe-type -->
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScrool"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <HomeSwier :banners="banners" />
      <Recommend :recommends="recommends" />
      <Feature />
      <!--接收tabcontrol丢出的事件-->
      <TabControl class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" />
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
      isShow: false
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
     * 监听GoodListItme丢出的图片加载完成事件，以便刷行better-scroll 
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
  methods
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0px;
  top: 0px;
  z-index: 9;
}
.tab-control {
  /*position: sticky; 某些浏览器不支持，但是移动端基本支持*/
  position: sticky;
  top: 44px;
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
</style>
