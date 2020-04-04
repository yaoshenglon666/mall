<template>
  <div class="tab-control">
    <div v-for="(title,index) in titles"
         class="tab-control-item" :class="{active:index==currentIndex}"
         @click="itemClick(index)">
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex=index;
        //丢出点击事件
       this.$emit('tabClick',index)
      }
    }
  }
</script>

<style>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;

  }
  .active span{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
    padding: 5px;
  }

</style>
