<template>
  <div class="wrapper">
    <nav-bar class="nb">
      <div slot="center" class="">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list :cartLists="cartLists"/>
    <cart-total :cartList="cartLists" class="ct"/>
    
  </div>
</template>

<script>
  import CartList from './childComps/CartList';
  import CartTotal from './childComps/CartTotal';

  import NavBar from "components/common/navbar/NavBar"

  import {mapGetters} from 'vuex';""
  export default {
    name: "cart",
    components:{
      NavBar,
      CartList,
      CartTotal

    },
    data(){
      return {
        scroll:null
      }
    },
    computed:{
      //两种语法
     // ...mapGetters(['getCartList'],'getCartListLength')
      ...mapGetters({
        cartLength:'getCartListLength',
        cartLists:'getCartList'
      })
    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  .nb{
    background-color: var(--color-tint);
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
    color: #fff;
  }
  .ct{
    position: relative;
    bottom: 40px;
  }
</style>
