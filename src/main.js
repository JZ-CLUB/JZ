import './common/rem';
import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import { router } from './router';
window.Ajax = axios;
import './common/reset.css';
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
