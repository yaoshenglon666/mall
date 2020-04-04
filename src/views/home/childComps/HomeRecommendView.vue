<template>
  <div class="recommend">
    <div v-for="recommend in recommends" class="recommend-itmes">
      <a :href="recommend.link">
        <img :src="recommend.image"/>
        <div>{{recommend.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend-itmes{
    flex: 1;
  }
  .recommend-itmes img{
      width: 70px;
    height: 70px;
   margin-bottom: 10px;
  }
</style>
