import {ADD_COUNTER,ADD_TO_CART} from "store/mutations-types"
export default{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
        //调用数组find函数查找之前数组中是否存在该商品
        let oldProduct=context.state.cartList.find(item => item.iid === payload.iid)
        /**
         * 如果存在+1，否则给数组赋值并记录count:1 
         * actions里面通过调用mutations里面的函数对state里面的数据进行操作
         */
        if(oldProduct){
          context.commit(ADD_COUNTER,oldProduct)
          resolve('当前的商品数量+1')
        }else{
          payload.count=1
          context.commit(ADD_TO_CART,payload)
          resolve('添加了新的商品')
        }
    })
    
  }
}