import Vue from 'vue'
import App from './App.vue'
import router from 'router/index'

Vue.config.productionTip = false

/**
 * 创建一个事件总线，用来组件之间事件的丢出跟监听
 * 丢出监听方：this.$bus.$emit(‘事件名’)
 * 监听方:this.$bus.on('事件名')
 * 事件案例：GoodListItem.vue丢出图片加载事件
 *          home.vue监听组件
 *  */ 
Vue.prototype.$bus=new Vue()
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
