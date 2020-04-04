<template>
  <Tabbal>
    <!--
    给tabbaritem组件属性 path,activeColor赋值
    -->
    <TabbalItem path="/home" >
      <img slot="item-icon" src="~assets/img/tabbar/home.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg"/>
      <div slot="item-text">首页</div>
    </TabbalItem>
    <TabbalItem path="/category" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg"/>
      <div slot="item-text">分类</div>
    </TabbalItem>
    <TabbalItem path="/cart" >
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg"/>
      <div slot="item-text">购物车</div>
    </TabbalItem >
    <TabbalItem path="/profile" >
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg"/>
      <div slot="item-text">我的</div>
    </TabbalItem>
  </Tabbal>
</template>


<script>
  import  Tabbal from 'components/common/tabbal/tabbar'
  import  TabbalItem from 'components/common/tabbal/tabbaritem'
  export default {
    name: "MainTabBar",
    components:{
      Tabbal,
      TabbalItem
    }
  }
</script>

<style>

</style>
