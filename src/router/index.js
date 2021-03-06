import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const  home=()=>import('views/home/home')
const  category=()=>import('views/category/category')
const  cart=()=>import('views/cart/cart')
const  profile=()=>import('views/profile/profile')
const  Detail=()=>import('views/detail/Detail')

const  routes= [
  {
    path: '',
    redirect:'/home'
  },
  {
    path: '/home',
    component: home,
    meta:{
      title:'首页',
      keepAlive:true
    },
  },
  {
    path: '/category',
    component: category,
    meta:{
      title:'分类',
      keepAlive:true
    },
  },
  {
    path: '/cart',
    component: cart,
    meta:{
      title:'购物车',
      keepAlive:true
    },
  },
  {
    path: '/profile',
    component: profile,
    meta:{
      title:'我的',
      keepAlive:true
    },
  },
  {
    path: '/detail/:id', //动态路由将商品ID传过去
    component: Detail,
    meta:{
      title:'详情',
      keepAlive:false
    },
  },
]
const router=new Router({
  routes,
  mode:'history',
})
//前置守卫(跳转钱回调)
router.beforeEach((to,from,next)=>{
  document.title=to.matched[0].meta.title
  next()
})

//后置钩子(跳转后回调)
router.afterEach((to,from)=>{

})
export default router
