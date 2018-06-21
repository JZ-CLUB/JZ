<style lang="less">
  @import "../../common/common";
  .orderDetail {
    &::after {
      border: 0 solid #000000;
    }
    background: none;
    .timeBox{
      height: 1.06rem;
      padding: 0 0.4rem;
      background: url("../../images/timeBg.jpg") no-repeat center center;
      background-size: cover;
      display: flex;
      justify-content: left;
      align-items:center;
      span{
        font-size: 0.28rem;
        margin-right: 0.2rem;
      }
      .icon{
        width: 0.3rem;
        height: 0.3rem;
        background: url("../../images/timeIcon.png") no-repeat center center;
        background-size: 0.3rem 0.3rem;
      }
    }
    .van-cell {
      font-size: 0.28rem;
      background: #1a1a1a;
      color: @yellow;
      padding: 0.4rem;
      &:not(:last-child)::after {
        border-bottom-width: 0;
      }
      &__value {
        color: @red;
      }
    }
    .orderAddress {
      background: #1a1a1a;
      padding: 0.15rem 0.4rem;
      color: @white;
      .van-address-list__name {
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.28rem;
        .telPhone {
          float: right;
        }
      }
      .van-address-list__address {
        font-size: 0.28rem;
        line-height: 0.4rem;
      }
      .van-cell__value--link {
        padding-right: 0.5rem;
      }
    }
    .orderTitle {
      padding: 0 0.4rem;
      h3 {
        line-height: 0.7rem;
        font-size: 0.28rem;
        color: @gray;
      }
    }
    .orderInfoBox {
      background: #1a1a1a;
      padding: 0.15rem 0.4rem 0.15rem 1.5rem;
      line-height: 0.5rem;
      border-bottom: 0.01rem solid #000;
      position: relative;
      img {
        position: absolute;
        width: 1rem;
        height: 1rem;
        vertical-align: middle;
        top: 0.15rem;
        left: 0.4rem;
      }
      p {
        height: 0.5rem;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 1; /** 显示的行数 **/
        overflow: hidden; /** 隐藏超出的内容 **/
      }
      p.title {
        font-size: 0.28rem;
        color: @white;
      }
      p.subTitle {
        color: @gray;
        font-size: 0.24rem;
      }

    }
    .tips {
      color: @wgray;
      padding: 0.15rem 0.4rem;
      font-size: 0.24rem;
    }
    .totalPrice {
      background: none;
      font-size: 0.28rem;
      .van-cell__value {
        color: @yellow;
        font-size: 0.4rem;
      }
    }
    .textR {
      text-align: right;
      &::after {
        border: 0 solid #000000;
      }
      .van-button {
        /*margin-left: 0.2rem;*/
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
      p {
        text-align: center;
        font-size: 0.28rem;
        color: @white;
        margin-bottom: 0.3rem;
      }
      .ewmModal {
        opacity: 1;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
        p{
          color: @red;
        }
      }
      .imgbox{
        margin: 0 auto;
        width: 4.05rem;
        height: 4.05rem;
        height: auto;
        img {
          width: 100%;
          height: 100%;
        }
        img.done {
          opacity: 0.5;
        }
      }
      &.done{
        p{
          color: @red;
          text-decoration :line-through;
        }
        .imgbox{
          position: relative;
          img {
            opacity: 0.5;
          }
          div{
            width: 4.05rem;
            height: 4.05rem;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(212,212,212,0.6);
            font-size: 0.28rem;
            color: @red;
            padding: 1.5rem;
          }
        }
      }
    }
  }
</style>
<template>
  <van-cell-group class="orderDetail">

    <div class="timeBox" v-if="orderInfo.orderStateNum===10">
      <span class="icon"></span>
      <span>剩余付款时间: {{minute}}分{{second}}秒</span>
    </div>

    <van-cell :value="orderInfo.orderStateNum | orderStateName">
      <div slot="title">订单号：{{orderInfo.orderSn}}</div>
    </van-cell>

    <van-cell class="orderAddress" v-if="orderInfo.orderType==='2'">
      <div class="van-address-list__name">收货人：{{ addressInfo.trueName }}<span class="telPhone">{{ addressInfo.telPhone }}</span>
      </div>
      <div class="van-address-list__address">收货地址：{{ addressInfo.areaInfo }}{{addressInfo.address}}</div>
    </van-cell>

    <div class="orderTitle">
      <h3>活动信息</h3>
    </div>
    <div class="orderInfoBox" @click="$router.push({ name: 'activityGoods', params: { id:orderGoodsList.goodsId }})">
      <img :src="comPath.imgPath+orderGoodsList.goodsImage" alt="">
      <p class="title">{{orderGoodsList.goodsName}}</p>
      <p class="subTitle">{{orderGoodsList.specInfo}}数量:{{orderGoodsList.goodsNum}}</p>
    </div>

    <van-cell-group class="draftBox">
      <van-field v-if="orderInfo.draft" :value="orderInfo.draft" disabled />
    </van-cell-group>




    <div class="tips">
      【注】如有任何票务疑问，请联系JZ票务负责人 XXX ，电话：13011111111
    </div>

    <van-cell class="totalPrice" :value="'¥'+ orderInfo.orderTotalPrice ">
      <div slot="title">订单总价：</div>
    </van-cell>

    <div v-if="orderInfo.orderStateNum===10" class="textR van-panel__footer van-hairline--top">
      <van-button @click="checkOpr(orderInfo.orderSn)">取消订单</van-button>
      <van-button @click="toPay">付款</van-button>
    </div>

    <div
      v-if="orderInfo.orderType==='1'&& (orderInfo.orderStateNum===40 ||orderInfo.orderStateNum===70 ||orderInfo.orderStateNum===80 ) && codeImg!=='' "
      class="ewm" :class="{done:orderInfo.orderStateNum===70 || orderInfo.orderStateNum===80 || orderInfo.orderStateNum===0}">
      <p>二维码号：{{orderInfo.orderSn}}</p>
      <div class="imgbox">
        <img
             :src="comPath.imgPath+codeImg" alt="">
        <div v-if="orderInfo.orderStateNum===70 || orderInfo.orderStateNum===80 || orderInfo.orderStateNum===0">
          {{orderInfo.orderStateNum | ewmInfo}}
        </div>
      </div>
    </div>

  </van-cell-group>

</template>
<script>
  import '../../common/dataFormate'
  import {
    Cell, CellGroup, Toast, Card, Panel, Button, Dialog,Field
  } from 'vant';

  export default {
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Toast.name]: Toast,
      [Card.name]: Card,
      [Panel.name]: Panel,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      [Field.name]: Field
    },
    data() {
      return {
        comPath: PublicPath,
        orderInfo: {
          orderTotalPrice: 0
        },
        addressInfo: '',
        orderGoodsList: [],
        signInfo: '',
        codeImg: '',
        minute:'29',
        second:'59'
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
              let sdate1 = new Date(new Date(res.data[0].createTime))
              sdate1.setMinutes(sdate1.getMinutes() + 30);
              if(res.data[0].orderState === 10 && new Date().getTime() > sdate1.getTime()){
                res.data[0].orderState = 0
              }else{
                let allSecond = (sdate1.getTime()-new Date().getTime())/1000
                that.minute = Math.floor(allSecond/60)
                that.second = Math.floor(allSecond%60)
                if(parseInt(that.minute) < 10) {
                  that.minute = "0" + that.minute;
                }
                if(that.second<10){
                  that.second = "0" + that.second
                }
                let setInt = setInterval(function () {
                  that.second = parseInt(that.second)-1
                  if(that.second<10){
                    that.second = "0" + that.second
                  }
                  if(that.second === '0-1'){
                    that.second = 59
                    that.minute = parseInt(that.minute)-1
                    if(that.minute < 10) {
                      that.minute = "0" + that.minute;
                    }
                  }
                  if(that.minute === '00'&& that.second === '00'){
                    that.orderInfo.orderStateNum = 0
                    clearInterval(setInt)
                  }
                },1000)
              }
              that.orderInfo = {
                orderType: res.data[0].goodsType,
                orderSn: res.data[0].orderSn,
                paySn: res.data[0].paySn,
                orderTotalPrice: res.data[0].orderTotalPrice,
                orderStateNum: res.data[0].orderState,
                draft:(res.data[0].deliverExplain? ('备注：'+ res.data[0].deliverExplain): false)
              }
              that.addressInfo = res.data[0].address
              that.orderGoodsList = res.data[0].orderGoodsList[0]

              if (res.data[0].goodsType === '1' && (res.data[0].orderState === 40 || res.data[0].orderState === 70 || res.data[0].orderState === 80)) {
                that.getCode(res.data[0].orderSn)
              } else {
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
          message: '确定取消订单吗？',
          title: '提示'
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
            } else {
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
            // Toast('error')
          });
      },
      onBridgeReady: function () {
        let that = this
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', this.signInfo,
          function (res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              localStorage.cartIds = ''
              localStorage.datalist = ''
              localStorage.goodstype = ''
              that.$router.push({name: 'buySuccessful'})
              // Toast('微信支付成功')
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              that.$router.push({name: 'myOrder'})
              Toast('用户取消支付')
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
              that.$router.push({name: 'myOrder'})
              Toast('网络异常，请重试')
            }
          }
        );

      },
      callpay: function () {
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        } else {
          this.onBridgeReady();
        }
      }
    },
    filters:{
      ewmInfo(val,index){
        let info=''
        console.log(val)
        if(val === 70){
          info = '二维码已验证'
        }else if(val === 80 || val === 80){
          info = '二维码已失效'
        }
      }
    }
  }
</script>
