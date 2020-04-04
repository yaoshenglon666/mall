<template>
  <Swiper>
    <SwiperItem v-for="banner in banners">
      <a :href="banner.link">
        <img :src="banner.image"/>
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "HomeSwier",
    components: {
      Swiper,
      SwiperItem,
    },

    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
  }
</script>

<style scoped>

</style>
