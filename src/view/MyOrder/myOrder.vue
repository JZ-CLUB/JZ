<template>
  <div class="myOrder">
    <van-row class="myOrder-links">
      <van-col class="tabItem" span="8" v-for="(item,index) in tabList" :key="index">
        <div @click="tabFun(index,item.comp)" :class="{cur:activity===index}">
          <!--<van-icon :name="item.icon" />-->
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
    beforeCreate() {
      localStorage.curUrl = window.location.href
      if(!localStorage.getItem('openId')){
        window.location.href = "http://www.jzmember.com/h5/#/h5backurl"
      }else{
        if(!localStorage.getItem('memberId')){
          window.location.href = "http://www.jzmember.com/h5/#/register"
        }
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
<style lang="less">
  .myOrder {
    &-links {
      position: relative;
      z-index: 22222;
      font-size: 12px;
      text-align: center;
      background: url("../../images/titleBg.jpg");
      background-size: cover;
      height: 0.9rem;
      padding: 0 0.4rem;

      .van-icon {
        display: block;
        font-size: 24px;
      }
      .tabItem{
        line-height: 0.9rem;
        color: #666666;
        font-size: 0.32rem;
        .cur{
          color: #f0c37a;
          border-bottom: 0.04rem solid #be2c36;

        }
      }
    }
  }
</style>
