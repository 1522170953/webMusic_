import Vue from 'vue'
import App from './App.vue'
import router from '@/route';//导入路由对像



import   'normalize.css/normalize.css'

// 导入饿了么组件
import {
  Button, Select, Row, Col,
  Container, Header, Main, Footer,
  Aside , Input , Menu , MenuItem , MenuItemGroup ,
  Submenu , Avatar , Carousel , CarouselItem , Image ,
  Pagination, Tag , InputNumber , TabPane , Table , Tabs ,
  Progress , 
} from 'element-ui';

Vue.use(Button);
Vue.use(InputNumber);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Aside);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Avatar);
Vue.use(MenuItemGroup);
Vue.use(Carousel);
Vue.use(Image);
Vue.use(Progress);
Vue.use(CarouselItem);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(Tabs);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  // 安装全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
