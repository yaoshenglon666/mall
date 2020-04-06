export function  debounce(func,delay){
   /**
     * 函数的原理
     * 假设一个函数每过30毫秒调用一次，共调用30次
     * func=()=>console.log('aaa')//func是要执行的函数
     * delay=300//延迟时间
     * 当第一次调用的时候timer为null返回timer
     * 第二次调用timer不为null移除，也就是将第一次给移除，因为延迟时间为300，而调用时间为30
     * 以此类推最终被调用的func变成3次或更少
     */
  let timer=null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer=setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}