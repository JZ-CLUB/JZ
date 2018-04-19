import FastClick from 'fastclick'
import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import Vuex from 'vuex'
import Ajax from './Ajax'
import PublicPath from './common/comVariable'

window.PublicPath=PublicPath
window.Ajax = Ajax
Vue.config.productionTip = false
FastClick.attach(document.body)

import VueScroller from 'vue-scroller'
import { List } from 'vant';
Vue.use(VueScroller)
Vue.use(List)

Vue.use(Vuex)
import storeObject from './store/index'
var store = new Vuex.Store(storeObject)

//订单状态
Vue.filter('orderStateName', function (val) {
  // if (!val) return ''
  let str=''
  if(val===10){
    str='待付款'
  }else if(val===20){
    str='待发货'
  }else if(val===30){
    str='已发货'
  }else if(val===40){
    str='已出票'
  }else if(val===50){
    str='已提交'
  }else if(val===60){
    str='已确认'
  }else if(val===70){
    str='已验票'
  }else if(val===80){
    str='已失效'
  }else if(val===0){
    str='已取消'
  }

  return str;
})

import './common/reset.less';
import 'vant/lib/vant-css/icon-local.css'
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
