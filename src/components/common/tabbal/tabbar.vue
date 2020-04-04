<template>
  <div id="tab-bal">
    <slot></slot>
  </div>

</template>

<script>
  export default {
    name: "tabbar"
  }
</script>

<style >
  #tab-bal{display: flex; background-color: #f6f6f6;position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    box-shadow: 0 -3px 1px rgba(100,100,100,0.1);
  }

</style>
