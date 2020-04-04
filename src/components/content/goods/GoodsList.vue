<template>
  <div class="goods">
    <GoodListItem v-for="good in goods" :good="good"/>

  </div>
</template>

<script>
  import GoodListItem from './GoodListItme'
  export default {
    name: "GoodsList",
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      GoodListItem
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }

</style>
