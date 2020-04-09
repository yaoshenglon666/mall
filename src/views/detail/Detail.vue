<template>
  <div id="detail">
    <detail-navBar class="detail-nb" @titleClick="titleClick"/>
    <!-- 使用滚动组件一定要给组件设定固定的高度
      监听@scroll事件必须设置属性:probe-type="3"
    -->
    <scroll class="content" :probe-type="3" @scroll="contentScroll" ref="scroll" >
      <detail-swiper :top-images="topImages"/>
      <detail-baseInfo :goods="goods"/>
      <detail-shopInfo :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="param" :param-info="goodsParam"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="goodsList" :goods="recommendList" />
      <!--  @click.native使组件拥有click事件 -->
    </scroll>
    <BackTop @click.native="backLick" v-show="isShow" />
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo  from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
  import {deBounce} from "common/utils"
  import { itemListenerMinxin, backTopMinxin } from "common/mixin.js";
  export default {
    name:"Detail",
    //组件
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
    },
    //属性
    props: {
    },
    //数据
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        goodsParam:{},
        commentInfo:{},
        recommendList:[],
        tops:[],
        getTops:null,
        grefresh:null
      }
    },
    //调用函数
    methods:{
      getGoods(){
        getDetail(this.iid).then(res=>{
          const result=res.result
          //DetailSwiper需要的图片
          this.topImages=result.itemInfo.topImages
          //DetailBaseInfo需要用到的数据
          this.goods=new Goods(result.itemInfo,result.columns,result.shopInfo.services) 
          //DetailShopInfo需要用到的数据
          this.shop=new Shop(result.shopInfo)
          //DetailGoodsInfo需要用到的数据
          this.detailInfo=result.detailInfo
          //DetailParamInfo需要用到的数据
          this.goodsParam=new GoodsParam(result.itemParams.info,result.itemParams.rule)
          //DetailCommentInfo需要用到的数据
          if (result.rate.cRate !== 0) {
          this.commentInfo = result.rate.list[0] || {};
          }
        })
      },
      getRecommend(){
        getRecommend().then(res=>{
          this.recommendList=res.data.list;
        })
      },
      imgLoad(){
        /**
         * DetailGoodsInfo组件里面存在大量图片
         * 我们需要监听图片加载完成后去调用Scroll组件刷新高度函数
         * 由于图片过多事件会被多次调用
         * 因此采用防抖 将Scroll组件刷新高度函数在create里面进行封装
         */
        this.grefresh()
        /**
         * 获取组件最终的高度，需要所有的图片加载完成后才能获取到最终的位置
         * 为了避免重复操作，我们使用防抖操作
         * 在mounted函数里进行封装
         */
        this.getTops()

      },
      contentScroll(position){
        /**
         * 监听Scrool组件滚动事件，当滚动大于1000显示返回向上
         * position.y返回的是负数所以 -position.y获取正数比较
         */
        this.isShow= (-position.y) > 1000
      },
      /**
       * 切换标题，滚动到响应的位置
       * 监听DetailNavBar丢出的titleClick事件并获取选中的标题下标
       * 通过下标跳转到响应的位置，注意向上滚动Y轴为负数 所以:-this.tops[index]
       * -this.tops[index]+40这里+40是-this.tops[index]这个值滚的多了一点，进行微调
       * this.tops值在imgLoad事件里面获取
       */
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.tops[index]+40,100)
      }
    },
    //计算属性
    computed:{
    
    },
    //混合属性
    mixins: [itemListenerMinxin,backTopMinxin],
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      //获取传过来的商品iid,注意路由配置path: '/detail/:id',里面参数名是id所以获取的时候是params.id
      this.iid=  this.$route.params.id
      //发送网路请求
      this.getGoods()
      this.getRecommend()
      
      /**
       * 
       */
      

      /**
       * 将获取组件高度操作进行防抖处理
       * this.getTop就是我们最后使用的获取组件高度函数
       * 因为获取组件高度函数在图片加载事件里面使用 会被调用多次
       * 所以进行防抖处理
       */
      this.getTops=deBounce(()=>{
        this.tops=[]
        this.tops.push(0)
        this.tops.push(this.$refs.param.$el.offsetTop)
        this.tops.push(this.$refs.comment.$el.offsetTop)
        this.tops.push(this.$refs.goodsList.$el.offsetTop)
      },200)
    },
    //挂载结束
    mounted() {
      /**
       * this.bcFunc在混入文件mixin.js定义
       * 无法直接访问GoodListItme丢出事件
       * 所以通过事件总线方式监听
       * Detail没有被<keep-alive>缓存
       * 所以这里我们放在mounted
       */
      this.$bus.$on("itemImageLoad", this.bcFunc);
      //created 里面获取不到this.$refs.scroll因为组件未被挂载，所以需要在挂载里面操作
      this.grefresh=deBounce(this.$refs.scroll.refresh,50)
    },
    //销毁
    destroyed() {
    },
    //活跃
    activated() {
      
    },
    //离开
    deactivated() {
      this.$bus.$off("goodsImgLoadEvent", this.bcFunc);
      console.log("销毁Detail的bus");
    },
  }
</script>
<style scoped>
/* @import url; 引入css类 */
  #detail{
    position: relative;
    z-index: 9;
    background-color:  #fff;
    height:100vh;
  }
  /* .detail-nb{
    position: relative;
    z-index: 9;
    background-color: #fff;
  } */
  .content{
    /*
      calc(100% - 44px) - 两边一定要空格 不然 - 不会作为运算符
     */
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>