import Vue from 'vue';
import Router from 'vue-router';

const Register = () => import('./view/register/index')
const MyInfo = () => import('./view/myInfo/index')
const SuccessRegister = () => import('./view/register/successRegister')

const Calendar = () => import('./view/ShowCalendar/calendar')
const Home = () => import('./view/home/home')
const ActivityGoods = () => import('./view/activityGoods/index')
const MemberInfo = () => import('./view/memberInfo/memberInfo')
const MyDot = () => import('./view/myDot/myDot')
const ToPay = () => import('./view/ToPay/toPay')
const Address = () => import('./view/address/index')
const AddressEdit = () => import('./view/address/addressEdit')
const BuySuccessful = () => import('./view/buySuccessful/buySuccessful')
const MyOrder = () => import('./view/MyOrder/myOrder')
const OrderDetail = () => import('./view/MyOrder/orderDetail')
const h5backurl = () => import('./view/backUrl/index')
const checkcode = () => import('./view/checkcode')
const Music = () => import('./view/find/music')
const JzMan = () => import('./view/find/jzMan')
const findDifer = () => import('./view/find/findDifer')
const club = () => import('./view/club')

Vue.use(Router);

const routes = [
  {
    path: '/h5backurl',
    name: 'h5backurl',
    component: h5backurl,
    meta: {
      title: '爵士活动'
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '爵士活动'
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
    path: '',
    name: 'successRegister',
    component: SuccessRegister,
    meta: {
      title: '注册成功'
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
    path: '/activityGoods/:id',
    name: 'activityGoods',
    component: ActivityGoods,
    meta: {
      title: '活动详情'
    }
  },
  {
    path: '/memberInfo',
    name: 'memberInfo',
    component: MemberInfo,
    meta: {
      title: '个人信息'
    }
  },
  {
    path: '/MyDot',
    name: 'myDot',
    component: MyDot,
    meta: {
      title: '我的爵士豆'
    }
  },
  {
    path: '/ToPay',
    name: 'toPay',
    component: ToPay,
    meta: {
      title: '确认订单'
    }
  },
  {
    path: '/address',
    name: 'address',
    component: Address,
    meta: {
      title: '收货地址'
    }
  },
  {
    path: '',
    name: 'addressEdit',
    component: AddressEdit,
    meta: {
      title: '地址编辑'
    }
  },
  {
    path: '/buySuccessful',
    name: 'buySuccessful',
    component: BuySuccessful,
    meta: {
      title: '订单支付成功'
    }
  },
  {
    path: '/MyOrder',
    name: 'myOrder',
    component: MyOrder,
    meta: {
      title: '我的活动'
    }
  },
  {
    path: '/orderDetail/:orderId',
    name:'orderDetail',
    component: OrderDetail,
    meta: {
      title: '活动票详情'
    }
  },
  {
    path: '/ShowCalendar',
    name: 'calendar',
    component: Calendar,
    meta: {
      title: '演出日历'
    }
  },
  {
    path: '',
    name: 'checkcode',
    component: checkcode,
    meta: {
      title: '验票'
    }
  },
  {
    path: '/music',
    name: 'music',
    component: Music,
    meta: {
      title: '艺人歌单'
    }
  },
  {
    path: '',
    name: 'JzMan',
    component: JzMan,
    meta: {
      title: '爵士大叔'
    }
  },
  {
    path: '',
    name: 'FindDifer',
    component: findDifer,
    meta: {
      title: '看见不同'
    }
  },
  {
    path: '',
    name: 'Club',
    component: club,
    meta: {
      title: 'club演出'
    }
  },
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
