/**
 * 所有使用GoodList组件的组件，都需要GoodListItme加载完所有图片后刷行Scroll组件的高度
 * 由于图片数量过多
 * 因此进行防抖处理
 * GoodList组件会被大部分组件调用所以将这块操作进行混入操作
 */
import { deBounce } from "common/utils.js";
export const itemListenerMinxin = {
  data() {
    return {
      bcFunc: null
    };
  },
  mounted() {
    let deBounceRefresh = deBounce(this.$refs.scroll.refresh, 50);
    this.bcFunc = () => {
      deBounceRefresh();
    };
  }
};

/**
 * 回到顶部minxin封装
 */
import BackTop from "components/content/backTop/BackTop.vue";
export const backTopMinxin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    backLick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
};
