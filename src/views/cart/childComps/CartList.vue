<template>
  <div id="cart_list">
    <scroll ref="scroll" class="cart_scroll">
      <template>
        <cart-list-item
          v-for="(item, index) in cartLists"
          :key="index"
          :item="item"
        ></cart-list-item>
      </template>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem.vue";

export default {
  name:"CartList",
  data() {
    return {};
  },
  props:{
    cartLists:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {
    Scroll,
    CartListItem
  },
  methods: {},
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
#cart_list {
  font-size: 0.68rem;
  height: calc(100vh - 1.1rem - 2.09rem - 1.9rem);
}

/**
* scroll
*/
.cart_scroll {
  height: 100%;
  overflow: hidden;
}
</style>
