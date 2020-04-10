import Vue from "vue"
import Vuex from "vuex"
import cart from "./modules/cart/cart"
//import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types"
//1.安装插件
Vue.use(Vuex)

// //2.创建store对象
// const store = new Vuex.Store({
//   state:{
//     cartList:[]
//   },
//   getters:{},
//   mutations:{
//     /**
//      * mutationsw唯一的目的就是修改state里面的值
//      * 对于如何修改的逻辑都丢到actions里面
//      */

//     //修改购物车商品购买数量
//     [ADD_COUNTER](state,payload){
//       payload.count++;
//     },
//     //添加新的商品到购物车
//     [ADD_TO_CART](state,payload){
//       state.cartList.push(payload)
//     }
//   },
//   actions:{
//     addCart(context,payload){
//       //调用数组find函数查找之前数组中是否存在该商品
//       let oldProduct=state.cartList.cartList.find(item=>tiem.id === payload.id)
//       /**
//        * 如果存在+1，否则给数组赋值并记录count:1 
//        * actions里面通过调用mutations里面的函数对state里面的数据进行操作
//        */
//       if(oldProduct){
//         context.commit([ADD_COUNTER],oldProduct)
//       }else{
//         payload.count=1
//         context.commit([ADD_TO_CART],payload)
//       }
//     }
//   },
//   modules:{}
// })

const store=new Vuex.Store({
  state:{},
  getters:{},
  mutations:{},
  actions:{},
  modules:{
    cart:cart
  }
})

//3.挂载到vue实例,mian.js
export default store
