module.exports={
  plugins:{
    autoprefixer:{},

    "postcss-px-to-viewport":{
      viewportWidth:375,//视窗的宽度，对应的是我们设计稿的宽度(此处为iphone6)
      viewportHeight:667,//视窗的高度，对应的是我们设计稿的高度（也可以不配置）(此处为iphone6)
      unitPrecision:5,//制定px转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit:'vw',//指定需要转换成的视窗单位，建议使用vw
      selectorBlackList:['ignore','tab-bal','tab-bal-item'],//指定需要转换的类样式,为了减少配置可以在不想改变的样式后面加ignore,比如 home ignore
      minPixelValue:1,//小于或等于1px不转换位视窗单位
      mediaQuery:false,//允许在媒体查询中转换px
      exclude:[/^tabbar/],//哪些需要排除的文件按照正则表达式写,这里排除所有tabbar开头的文件
    }
  },
}