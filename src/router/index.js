import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const  home=()=>import('views/home/home')
const  category=()=>import('views/category/category')
const  cart=()=>import('views/cart/cart')
const  profile=()=>import('views/profile/profile')
const  routes= [
  {
    path: '',
    redirect:'/home'
  },
  {
    path: '/home',
    component: home,
    meta:{
      title:'首页'
    },
  },
  {
    path: '/category',
    component: category,
    meta:{
      title:'分类'
    },
  },
  {
    path: '/cart',
    component: cart,
    meta:{
      title:'购物车'
    },
  },
  {
    path: '/profile',
    component: profile,
    meta:{
      title:'我的'
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
