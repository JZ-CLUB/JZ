<template>
  <div class="user">
    <van-row class="user-links">
      <van-col span="8" v-for="(item,index) in tabList" :key="index">
        <div @click="tabFun(index,item.comp)" :class="{cur:activity===index}">
          <van-icon :name="item.icon" />
          {{item.name}}
        </div>
      </van-col>
    </van-row>
    <keep-alive>
      <div :is="currentTab"></div>
    </keep-alive>
  </div>
</template>
<script>
  import TabAll from '@/view/MyOrder/subComp/listAll'
  import TabUnpay from '@/view/MyOrder/subComp/listUnpay'
  import TabDone from '@/view/MyOrder/subComp/listDone'
  import {
    Tab, Tabs, Toast, Row, Col, Icon
  } from 'vant';
  export default {
    components: {
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [Toast.name]: Toast,
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      TabAll,TabUnpay,TabDone
    },
    data () {
      return {
        currentTab:'tabAll',
        bottom: [],
        imageURL:'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        tabList:[
          {icon:'pending-payment',name:'全部',comp:'tabAll'},
          {icon:'pending-orders',name:'待付款',comp:'tabUnpay'},
          {icon:'pending-deliver',name:'已出票',comp:'tabDone'}
        ],
        activity:0
      }
    },
    created () {
      Toast.loading({ mask: true,duration:0 });
      let vm = this
    },
    computed: {

    },
    mounted() {

    },
    methods: {
      tabFun(i,e) {
        this.activity = i
        this.currentTab = e;  // tab 为当前触发标签页的组件名
      }
    }
  }
</script>
<style lang="less" scoped>
  .plugin-name {
    margin: 0;
    padding-top: 60px;
    text-align: center;
    color: #666;
    font-style: normal;
    font-variant-ligatures: normal;
    font-variant-caps: normal;
    font-variant-numeric: normal;
    font-weight: normal;
    font-stretch: normal;
    font-size: 48px;
    line-height: 48px;
    margin-bottom: 10px;
  }

  .for-vue-js {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
  }

  .plugin-name, .for-vue-js {
    font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
  }

  .row {
    display: block;
    width: 100%;
    height: 50px;
    padding: 10px 0 10px 15px;
    font-size: 16px;
    line-height: 30px;
    color: #444;
    background-color: #fff;
  }

  .grey-bg {
    background-color: #eee;
  }

  .arrow-right {
    width: 8px;
    height: 16px;
    float: right;
    margin-top: 7px;
    margin-right: 15px;
  }
  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}

  .user {
    &-links {
      position: relative;
      z-index: 22222;
      padding: 5px 0;
      font-size: 12px;
      text-align: center;
      background-color: #fff;

      .van-icon {
        display: block;
        font-size: 24px;
      }
      .cur{
        color: #f40;
      }
    }
  }
</style>
