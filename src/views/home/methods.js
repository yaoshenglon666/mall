import {
  getHomeMulitdata,
  getHomeGoods
} from "network/home";
export default {
  /**
   * 事件监听
   */
  tabClick(index) {
    switch (index + 1) {
      case 1:
        this.currentType = 'pop'
        break
      case 2:
        this.currentType = 'new'
        break
      case 3:
        this.currentType = 'sell'
        break
      
    }
    this.$refs.tabControl1.currentIndex=index
    this.$refs.tabControl2.currentIndex=index
  },
  backLick() {
    //<Scroll class="content" ref="scroll">
    //this.$refs.scroll 获取到的就是Scroll组件对象
    //Scroll组件里面有一个函数scrollTo（x,y,time）
    this.$refs.scroll.scrollTo(0, 0, 500)
  },
  contentScrool(position) {
    // 当滚动超过默认值的时候显示
    this.isShow = (-position.y) > 1000
    //决定tabControl是否吸顶
    this.isTabFixed=(-position.y) >this.tabOffsetTop
  },
  /**
   * 触底查询当前类别下一页数据，并调用finishPullUp函数保持还有下一次触底触发
   */
  pullingUp() {
    this.getHomeGoods(this.currentType)
    this.$refs.scroll.finishPullUp()
  },
  /**
   * tabControl的吸顶效果
   * 必须知道滚动到多少才开始吸顶所以需要获取tabControl的offsetTop
   * 监听HomeSwier里面图片加载事件，加载完成再去获取tabControl的offsetTop这样就比较正确
   * 因为只有当所有的图片加载完成后 才能知道最终的高度，如果放在组件mounted挂载这里面的话，获取的高度可能不真实
   */
  swierImgLoad(){
    //获取tabControl的offsetTop
    //所有组件都有一个属性叫$el获取组件中的元素
    //注意这里获取的是tabControl2的offsetTop，通过对比来判断是否显示tabControl1
    this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
  },
  /**
   * 网路事件
   */
  getHomeMulitdata() {
    getHomeMulitdata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      this.dKeywords = res.data.dKeyword.list
      this.keywordss = res.data.keywords.list
    }).catch(err => {
      console.log("出错")
    })
  },
  getHomeGoods(type) {
    const page = this.goods[type].page + 1
    getHomeGoods(type, page).then(res => {
      //数组赋值使用.push(...[])
      // this.goods[type].list=  res.data.list
      this.goods[type].list.push(...res.data.list)

      this.goods[type].page = page
    })
  }
}
