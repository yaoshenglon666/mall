<template>
  <div class="goods-item" @click="itemClick">
      <!-- 监听图片加载事件：@load
        首页，详情也 所展示的数据结构不同，
        通过v-lazy来判断最终使用
      -->
      <img v-lazy="showImg"  @load="imgLoad"/>
      <div class="goods-info">
        <p>{{good.title}}</p>
        <span class="price">{{good.price}}</span>
        <span class="collect">{{good.cfav}}</span>
      </div>

  </div>
</template>

<script>

  export default {
    name: "GoodListItme",
    props:{
      good:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImg(){
        // //|| this.good.image
        // console.log(this.good.show.img )
        // return this.good.show.img ;
        //  Object.keys(this.good.show).length>0 ?

        return this.good.image || this.good.show.img 
      }
      
    },
    methods:{
      imgLoad(){
        /**
         * 我们无法访问到组件:Scroll(better-scroll )，所以将事件丢出
         * 将图片加载事件丢到：事件总线（$bus），事件总线在main.js创建
         */
        this.$bus.$emit('itemImageLoad')
      },
      itemClick(){
        // 将商品的iid传过去
        this.$router.push("/detail/"+this.good.iid)
      }
    }

  }
</script>

<style >
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;

  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
