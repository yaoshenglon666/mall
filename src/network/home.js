import  {request,request32} from "./request";

export function getHomeMulitdata() {
  return request32({
    url:'/home/multidata',
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
