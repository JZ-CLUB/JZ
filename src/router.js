import Vue from 'vue';
import Router from 'vue-router';

import User from '@/view/user/index';//demo
import Cart from '@/view/cart/index';//demo
import Goods from '@/view/goods/index';//demo
import Register from '@/view/register/index';//demo
import MyInfo from '@/view/myInfo/index';//demo

import Home from '@/view/home/home';//活动列表
import ActivityGoods from '@/view/activityGoods/index';//活动详情
import MemberInfo  from '@/view/memberInfo/memberInfo';//个人信息
import MyDot  from '@/view/myDot/myDot';//我的爵士豆
import ToPay  from '@/view/ToPay/toPay';//去支付
import Address  from '@/view/address/index';//收货地址
import AddressEdit  from '@/view/address/addressEdit';//地址编辑
import BuySuccessful  from '@/view/buySuccessful/buySuccessful';//购票成功

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '爵士活动'
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
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/myInfo',
    name: 'myInfo',
    component: MyInfo,
    meta: {
      title: '我的信息'
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
    name: 'memberInfo',
    component: MemberInfo,
    meta: {
      title: '个人信息'
    }
  },
  {
    name: 'myDot',
    component: MyDot,
    meta: {
      title: '我的爵士豆'
    }
  },
  {
    name: 'toPay',
    component: ToPay,
    meta: {
      title: '去支付'
    }
  },
  {
    name: 'address',
    component: Address,
    meta: {
      title: '收货地址'
    }
  },
  {
    name: 'addressEdit',
    component: AddressEdit,
    meta: {
      title: '地址编辑'
    }
  },
  {
    name: 'buySuccessful',
    component: BuySuccessful,
    meta: {
      title: '购票成功'
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
