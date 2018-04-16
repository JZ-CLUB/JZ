<template>
  <div class="myOrder" v-if="load">
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
  import {sig} from '../../common/weixin'
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
        load: false,
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

    },
    created () {
      Toast.loading({ mask: true,duration:0 });
    },
    beforeMount:function () {
      let vm = this
      sig(true).then(function () {
        vm.load = true
      })
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
  .myOrderBox{
    background: #1a1a1a;
    margin-top:0.04rem;
    .orderItem{
      padding: 0.4rem 0 0 0.4rem;
      line-height: 0.5rem;
      >div{
        border-bottom: 0.01rem solid #000;
        padding-right:1.9rem;
        padding-bottom: 0.4rem;
        padding-left: 1.4rem;
        position: relative;
        img{
          position: absolute;
          width: 1rem;
          height: 1rem;
          vertical-align: middle;
          top: 0;
          left: 0;
        }
        p{
          height: 0.5rem;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 1; /** 显示的行数 **/
          overflow: hidden; /** 隐藏超出的内容 **/
        }
        p.title{
          font-size: 0.28rem;
        }
        p.subTitle{
          color: #666666;
          font-size: 0.24rem;
        }
        span{
          position: absolute;
          top: 50%;
          right: 0.4rem;
          font-size: 0.28rem;
          color: #666666;
          display: block;
          width: 1.2rem;
          height: 0.56rem;
          line-height: 0.56rem;
          text-align: center;
          transform: translate(0, -90%);
          &.statusBtn{
            color: #000;
            background: #f0c37a;
            border-radius: 0.03rem;
          }
          &.doneBtn{
            color: #f0c37a;
          }
        }
      }

    }
  }
</style>
