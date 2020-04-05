<template>
  <div class="wrapper">
    <ul>
      <li>aaa1</li>
      <li>aaa2</li>
      <li>aaa3</li>
      <li>aaa4</li>
      <li>aaa5</li>
      <li>aaa6</li>
      <li>aaa7</li>
      <li>aaa8</li>
      <li>aaa9</li>
 
      <li>aaa48</li>
      <li>aaa49</li>
      <li>aaa50</li>
      <li>aaa51</li>
      <li>aaa52</li>
      
    
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "cart",
    data(){
      return {
        scroll:null
      }
    },
    mounted(){
      this.scroll=new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
       pullUpLoad:true,
      })
      
      this.scroll.on('scroll',(position)=>{
       // console.log(position)

      })
      this.scroll.on('pullingUp',()=>{
        console.log('上啦加载更多')
        this.scroll.finishPullUp()
      })
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 100px;
    background-color: red;
    overflow: hidden;
  }
</style>
