import {getHomeMulitdata,getHomeGoods} from "network/home";
export  default {
  /**
   * 事件监听
   */
  tabClick(index){
    switch (index+1){
     case 1:
       this.currentType='pop'
       break
     case 2:
       this.currentType='new'
       break
     case 3:
       this.currentType='sell'
       break

   }
  },
  /**
   * 网路事件
   */
  getHomeMulitdata(){
    getHomeMulitdata().then(res=>{
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
      this.dKeywords=res.data.dKeyword.list
      this.keywordss=res.data.keywords.list
    }).catch(err=>{
      console.log("出错")
    })
  },
  getHomeGoods(type){
     const page=this.goods[type].page+1
    getHomeGoods(type,page).then(res=>{
      //数组赋值使用.push(...[])
      // this.goods[type].list=  res.data.list
      this.goods[type].list.push(...res.data.list)

      this.goods[type].page= page
    })
  }
}
