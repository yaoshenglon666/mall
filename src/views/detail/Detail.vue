<template>
  <div id="detail">
    <detail-navBar class="detail-nb"/>
    <!-- 使用滚动组件一定要给组件设定固定的高度 -->
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-baseInfo :goods="goods"/>
      <detail-shopInfo :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="goodsParam"/>
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :goods="recommendList" />
    </scroll>
    
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
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
  import {debounce} from "common/utils"
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
        recommendList:[]
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
        const ref=debounce(this.$refs.scroll.refresh,50)
        ref()
      }
    },
    //计算属性
    computed:{
    
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      //获取传过来的商品iid,注意路由配置path: '/detail/:id',里面参数名是id所以获取的时候是params.id
      this.iid=  this.$route.params.id
      //发送网路请求
      this.getGoods()
      this.getRecommend()
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