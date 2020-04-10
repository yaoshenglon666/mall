import {ADD_COUNTER,ADD_TO_CART} from "store/mutations-types"
export default{
  /**
     * mutationsw唯一的目的就是修改state里面的值
     * 对于如何修改的逻辑都丢到actions里面
     */

    //修改购物车商品购买数量
    [ADD_COUNTER](state,payload){
      payload.count++;
    },
    //添加新的商品到购物车
    [ADD_TO_CART](state,payload){
      state.cartList.push(payload)
    }
}