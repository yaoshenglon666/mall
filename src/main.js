import Vue from 'vue'
import App from './App.vue'
import router from 'router/index'
import store from 'store/index'
import VueLazyLoad from "vue-lazyload";
import toast from 'components/common/toast/index'
import FastClick from 'fastclick'

Vue.config.productionTip = false

/**
 * 创建一个事件总线，用来组件之间事件的丢出跟监听
 * 丢出监听方：this.$bus.$emit(‘事件名’)
 * 监听方:this.$bus.on('事件名')
 * 事件案例：GoodListItem.vue丢出图片加载事件
 *          home.vue监听组件
 *  */ 
Vue.prototype.$bus=new Vue()
//安装v-lazyc插件
Vue.use(VueLazyLoad, {
  loading: require("assets/img/common/placeholder.png")
});
//安装toast自定义插件
Vue.use(toast)
//解决移动端300毫秒延迟
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
