import axios from 'axios'

export  function request(config) {
  //创建对象
  const intance=axios.create({
    baseURL:'http://152.136.185.210:8000/api/h8',
    timeout:5000
  })

  //拦截器
  //请求拦截器intance.interceptors.request.use(config=>{},err=>{})
  intance.interceptors.request.use(config=>{
    //请求成功
    console.log("请求成功")
    //拦截器执行完必须向下返回
    return config
  },err=>{
    console.log("请求失败")
  })



  //响应拦截器intance.interceptors.response.use(res=>{},err=>{})
  intance.interceptors.response.use(res=>{
    //成功
    console.log("响应成功")
    //处理完毕，向下返回,只需要返回data
    return res.data

  },err=>{
    console.log("响应失败")
  })

  return intance(config)


}


export  function request32(config) {
  //创建对象
  const intance=axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })

  //拦截器
  //请求拦截器intance.interceptors.request.use(config=>{},err=>{})
  intance.interceptors.request.use(config=>{
    //请求成功
    console.log("请求成功")
    //拦截器执行完必须向下返回
    return config
  },err=>{
    console.log("请求失败")
  })



  //响应拦截器intance.interceptors.response.use(res=>{},err=>{})
  intance.interceptors.response.use(res=>{
    //成功
    console.log("响应成功")
    //处理完毕，向下返回,只需要返回data
    return res.data

  },err=>{
    console.log("响应失败")
  })

  return intance(config)


}
