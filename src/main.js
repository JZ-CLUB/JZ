import FastClick from 'fastclick'
import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import Vuex from 'vuex'
import Ajax from './Ajax'
window.Ajax = Ajax
Vue.config.productionTip = false
FastClick.attach(document.body)


import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

Vue.use(Vuex)
import storeObject from './store/index'
var store = new Vuex.Store(storeObject)

import './common/reset.css';
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
