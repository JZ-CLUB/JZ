import Vue from 'vue';
import Router from 'vue-router';

import User from '@/view/user/index';
import Cart from '@/view/cart/index';
import Goods from '@/view/goods/index';
import Home from '@/view/home/home';
import ActivityGoods from '@/view/activityGoods/index';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      title: '会员中心'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods,
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/activityGoods',
    name: 'activityGoods',
    component: ActivityGoods,
    meta: {
      title: '活动详情'
    }
  },
  {
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
