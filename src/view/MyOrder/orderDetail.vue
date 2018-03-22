<template>
  <van-cell-group class="orderDetail">
    <van-cell :value="orderInfo.orderState">
      <div slot="title">订单号：{{orderInfo.orderSn}}</div>
    </van-cell>

    <van-cell class="orderAddress" v-if="orderInfo.orderType==='2'">
      <div class="van-address-list__name">收货人：{{ addressInfo.trueName }}<span class="telPhone">{{ addressInfo.telPhone }}</span></div>
      <div class="van-address-list__address">收货地址：{{ addressInfo.areaInfo }}{{addressInfo.address}}</div>
    </van-cell>

    <!--<div @click="$router.push({ name: 'activityGoods', params: { id:orderGoodsList.goodsId }})">
      <van-card
        :title="orderGoodsList.goodsName"
        :desc="orderGoodsList.specInfo"
        :thumb="comPath.imgPath+orderGoodsList.goodsImage"
      />
    </div>-->
    <div class="orderTitle">
      <h3>活动信息</h3>
    </div>
    <div class="orderInfoBox" @click="$router.push({ name: 'activityGoods', params: { id:orderGoodsList.goodsId }})">
      <p class="title">{{orderGoodsList.goodsName}}</p>
      <p class="subTitle">{{orderGoodsList.specInfo}}数量:{{orderGoodsList.goodsNum}}</p>
    </div>


    <div class="tips">
      【注】如有任何票务疑问，请联系JZ票务负责人 XXX ，电话：13011111111
    </div>

    <van-cell class="totalPrice" :value="'¥'+ orderInfo.orderTotalPrice ">
      <div slot="title">订单总价：</div>
    </van-cell>

    <div v-if="orderInfo.orderStateNum===10" class="textR van-panel__footer van-hairline--top">
      <van-button @click="checkOpr(orderInfo.orderSn)">取消订单</van-button><van-button @click="toPay">付款</van-button>
    </div>

    <div v-if="orderInfo.orderType==='1'&& (orderInfo.orderStateNum===40 ||orderInfo.orderStateNum===70 ||orderInfo.orderStateNum===80 ) && codeImg!=='' " class="ewm">
      <!--<p>二维码号：222332444554</p>-->
      <img :class="{done:orderInfo.orderStateNum===70 || orderInfo.orderStateNum===80 || orderInfo.orderStateNum===0}" :src="comPath.imgPath+codeImg" alt="">

      <!--<img :class="{done:orderInfo.orderStateNum===70 || orderInfo.orderStateNum===80 || orderInfo.orderStateNum===0}" src="http://www.jzmember.com/h5/target/orderapi/ticketcode/20180319085158951" alt="">-->
      <div class="ewmModal" v-if="orderInfo.orderStateNum===70 || orderInfo.orderStateNum===80 || orderInfo.orderStateNum===0"></div>
    </div>

  </van-cell-group>

</template>
<script>
  import {
    Cell, CellGroup, Toast, Card, Panel, Button, Dialog
  } from 'vant';

  export default {
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Toast.name]: Toast,
      [Card.name]: Card,
      [Panel.name]: Panel,
      [Button.name]: Button,
      [Dialog.name]: Dialog
    },
    data() {
      return {
        comPath: PublicPath,
        orderInfo: {
          orderTotalPrice:0
        },
        addressInfo: '',
        orderGoodsList: [],
        signInfo: '',
        codeImg: ''
      }
    },
    created() {
      Toast.loading({mask: true, duration: 0});
      let vm = this
      vm.orderDetail();
    },
    computed: {},
    mounted() {

    },
    methods: {
      orderDetail: function () {
        let that = this
        Ajax.post('target/orderapi/orderdetail', {orderid: that.$route.params.orderId})
          .then(function (response) {
            let res = response.data;
            if (res.data !== []) {
              that.orderInfo = {
                orderType: res.data[0].goodsType,
                orderSn: res.data[0].orderSn,
                paySn: res.data[0].paySn,
                orderTotalPrice: res.data[0].orderTotalPrice,
                orderStateNum: res.data[0].orderState,
                orderState: res.data[0].orderState === 10 ? '待付款' : (res.data[0].orderState === 20 ? '待发货' : (res.data[0].orderState === 30 ? '已发货' : (res.data[0].orderState === 40 ? '已出票' : (res.data[0].orderState === 50 ? '已提交' : (res.data[0].orderState === 60 ? '已确认' : (res.data[0].orderState === 70 ? '已验票' : (res.data[0].orderState === 80 ? '已失效' : '已取消')))))))
              }
              that.addressInfo = res.data[0].address
              that.orderGoodsList = res.data[0].orderGoodsList[0]

              if (res.data[0].goodsType === '1' && (res.data[0].orderState === 40||res.data[0].orderState === 70||res.data[0].orderState === 80)) {
                that.getCode(res.data[0].orderSn)
              }else{
                Toast.clear()
              }

            } else {
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            // Toast('加载失败error')
          });
      },
      getCode: function (orderSn) {
        let that = this
        Ajax.post('target/qrCode/findQRCode', {orderSn: orderSn})
          .then(function (response) {
            let res = response.data;
            that.codeImg = res.codePath
            Toast.clear()
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
      },
      checkOpr: function (id) {
        Dialog.confirm({
          message: '确定取消订单？',
          title:'提示'
        }).then(() => {
          Toast.loading({mask: true, duration: 0});
          this.orderCancel(id)
        }).catch(() => {
          // Toast('取消')
        });
      },
      orderCancel: function (id) {
        let that = this
        Ajax.post('target/orderapi/cancleorder', {ordersn: id})
          .then(function (response) {
            let res = response.data;
            if (res.result === 1) {
              that.$router.push({name: 'myOrder'})
            }else{
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            // Toast('加载失败error')
          });
      },
      toPay: function () {
        Toast.loading({mask: true, duration: 0});
        let that = this
        let data = {
          paySn: this.orderInfo.paySn,
          memberId: sessionStorage.getItem('memberId')
        }
        Ajax.post('target/wxpay/api/payorder', data)
          .then(function (response) {
            let res = response.data;
            if (res.result === 1) {
              that.signInfo = res.data.jsdata
              that.callpay()
              Toast.clear()
            } else {
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            Toast(error)
          });
      },
      onBridgeReady: function () {
        let that = this
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', this.signInfo,
            function(res){
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                localStorage.cartIds=''
                localStorage.datalist=''
                localStorage.goodstype=''
                that.$router.push({name:'buySuccessful'})
                // Toast('微信支付成功')
              } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                that.$router.push({name:'myOrder'})
                Toast('用户取消支付')
              } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                that.$router.push({name:'myOrder'})
                Toast('网络异常，请重试')
              }
            }
          );

      },
      callpay: function () {
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        }else{
          this.onBridgeReady();
        }
      }
    }
  }
</script>
<style lang="less">
  .orderDetail {
    &::after {
      border: 0 solid #000000;
    }
    background: none;
    .van-cell {
      background: #1a1a1a;
      color: #f0c37a;
      margin-top: 0.2rem;
      &:not(:last-child)::after {
        border-bottom-width: 0;
      }
      &__value {
        color: #be2c36;
      }
    }
    .orderAddress {
      background: #1a1a1a;
      padding: 0.15rem 0.4rem;
      .van-address-list__name {
        color: #f0c37a;
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.28rem;
        .telPhone {
          float: right;
        }
      }
      .van-address-list__address {
        color: #f0c37a;
        font-size: 0.28rem;
        line-height: 0.4rem;
      }
      .van-cell__value--link {
        padding-right: 0.5rem;
      }
    }
    .orderTitle{
      padding: 0 0.4rem;
      h3{
        line-height: 0.7rem;
        color: #666666;
      }
    }
    .orderInfoBox {
      background: #1a1a1a;
      padding: 0.15rem 0.4rem;
      line-height: 0.6rem;
      border-bottom: 0.01rem solid #000;
      position: relative;
      p {
        height: 0.6rem;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 1; /** 显示的行数 **/
        overflow: hidden; /** 隐藏超出的内容 **/
      }
      p.title {
        font-size: 0.28rem;
      }
      p.subTitle {
        color: #666666;
        font-size: 0.24rem;
      }

    }
    .tips{
      color: #736047;
      padding: 0.15rem 0.4rem;
      font-size: 0.24rem;
    }
    .totalPrice{
      background: none;
      font-size: 0.28rem;
      .van-cell__value{
        font-size: 0.4rem;
      }
    }
    .textR {
      text-align: right;
      &::after{
        border: 0 solid #000000;
      }
      .van-button{
        margin-left: 0.2rem;
        padding: 0 0.3rem;
        border: 0.02rem solid #eec27f;
        color: #eec27f;
        background: none;
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 0;
      }
    }
    .van-dialog__content {
      text-align: center;
    }
    .ewm {
      text-align: center;
      position: relative;
      p{
        text-align: center;
      }
      .ewmModal{
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        width: 100%;
        height: 100%;
      }
      img {
        margin: 0 auto;
      }
      img.done{
        opacity: 0.5;
      }
    }
  }
</style>
