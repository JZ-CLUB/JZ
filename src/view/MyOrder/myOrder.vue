<template>
  <div class="orderList">
    <van-tabs :active="active" sticky  @click="handleTabClick">
      <van-tab v-for="(item,index) in allOrder"
               :title="(index===0?'全部':(index===1?'待付款':'已出票'))"
               :key="index">
        <div class="tttt"
             v-waterfall-lower="aaa"
             waterfall-disabled="disabled"
             waterfall-offset="10">
            <van-card v-for="(it,int) in item"
              :title="it.goodsName"
              :desc="it.specInfo"
              :thumb="imageURL"
            >
              <div slot="footer">
                <van-button size="mini" @click="$router.push({ name: 'activityGoods', params: { id:it.goodsId }})">按钮</van-button>
                <van-button size="mini">按钮</van-button>
              </div>
            </van-card>
        </div>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import 'vant/lib/vant-css/icon-local.css';
  import Vue from 'vue';
  import VueLazyLoad from 'vue-lazyload'
  Vue.use(VueLazyLoad,{
    error:'',
    loading:''
  })

  import {
    Tab, Tabs, Card, Toast, Button, Row, Col, Icon, Waterfall
  } from 'vant';
  Vue.use(Waterfall);
  export default {
    components: {
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [Card.name]: Card,
      [Toast.name]: Toast,
      [Button.name]:Button,
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon
    },
    data() {
      return {
        curIndex:0,
        allOrder:[],
        orderList:[],
        unPayOrder:[],
        payedOrder:[],
        active: 1,
        imageURL:'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        title:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
        desc:'描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
      };
    },
    created () {
      let vm = this
      Toast.loading({ mask: true,duration:0 });
      vm.orderListFun()
      vm.unPayOrderFun()
      vm.payedOrderFun()
    },
    computed: {

    },
    methods: {
      aaa() {
        console.log('aaa')
      },
      orderListFun() {
        let that=this
        let data={
          memberId:'',
          status:'0',
          pageNo:'',
          pageSize:''
        }
        Ajax.get('/static/test.json')
        // Ajax.post('target/orderapi/orderlist',data)
          .then(function (response) {
            let res=response.data;
            if(res.data.length!==0){
              res.data.map(function (item,index) {
                that.orderList = that.orderList.concat(item.orderGoodsList[0])//全部
              })
              that.allOrder.push(that.orderList)
              Toast.clear()
            }else{
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
      },
      unPayOrderFun() {
        let that=this
        let data={
          memberId:'',
          status:'1',
          pageNo:'',
          pageSize:''
        }
        Ajax.get('/static/unPay.json')
        // Ajax.post('target/orderapi/orderlist',data)
          .then(function (response) {
            let res=response.data;
            if(res.data.length!==0){
              res.data.map(function (item,index) {
                that.unPayOrder = that.unPayOrder.concat(item.orderGoodsList[0])//待付款
              })
              that.allOrder.push(that.unPayOrder)
              Toast.clear()
            }else{
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
      },
      payedOrderFun() {
        let that=this
        let data={
          memberId:'',
          status:'1',
          pageNo:'',
          pageSize:''
        }
        Ajax.get('/static/done.json')
        // Ajax.post('target/orderapi/orderlist',data)
          .then(function (response) {
            let res=response.data;
            if(res.data.length!==0){
              res.data.map(function (item,index) {
                that.payedOrder = that.payedOrder.concat(item.orderGoodsList[0])//已出票
              })
              that.allOrder.push(that.payedOrder)
              Toast.clear()
            }else{
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
      },
      handleTabClick(index) {
        this.active=index
        this.disabled=true
      }
    },
  directives: {
    WaterfallLower: Waterfall('lower')
  },
    mounted:function () {

    }
  };
</script>

<style lang="less">
  .orderList{
    &-links {
      padding: 15px 0;
      font-size: 12px;
      text-align: center;
      background-color: #fff;
      .van-icon {
        display: block;
        font-size: 24px;
      }
    }
    .van-card__title {
      max-height: 45px;
      height: 45px;
      line-height: 45px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .van-card__desc {
      color: #666;
      font-size: 12px;
      max-height: 30px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .van-tab span:before{
      font: normal normal normal 14px/1 vant-icon;
      content: "\F03E";
    }
    .tabCon{
      .tabItem{
        display: none;
      }
      .cur{
        display: block;
      }

    }
  }
</style>
