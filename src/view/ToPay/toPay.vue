<template>
  <div class="van-address-list">
    <van-cell-group v-if="goodsType!==1">
      <router-link to="/address">
        <van-cell is-link>
          <div v-if="selectAddress!==''">
            <div class="van-address-list__name">收货人：{{ selectAddress.trueName }}，{{ selectAddress.telPhone }}</div>
            <div class="van-address-list__address">{{ selectAddress.address }}{{ selectAddress.areaInfo }}</div>
          </div>

          <div v-if="selectAddress===''" class="van-address-list__address">请选择收货地址</div>
        </van-cell>
      </router-link>
      <div class="aa"></div>

    </van-cell-group>
    <div class="itemInfo">
      <h1 class="">cell三重奏</h1>
      <van-cell-group>
        <van-cell title="门票类型" :value="tickType" />
        <van-cell v-for="(val, key, index) in carType" :key="index" :title="key" :value="val" />
        <!--<van-cell title="演出时间" :value="tickTime" />
        <van-cell title="区域位置" :value="tickPosition" />
        <van-cell title="数量" :value="tickNum" />-->
      </van-cell-group>
    </div>

    <van-submit-bar
      :price="3050"
      label="总金额："
      button-text="立即购买"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
  import {AddressList,Toast,Cell,CellGroup,Icon,SubmitBar} from 'vant';

  export default {
    components: {
      [AddressList.name]: AddressList,
      [Toast.name]: Toast,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Icon.name]: Icon,
      [SubmitBar.name]: SubmitBar
    },
    data() {
      return {
        chosenAddressId: '1',
        list:'',
        goodsType:1,//1---二维码  2-----实体票
        tickType:localStorage.getItem('goodstype'),
        tickTime:'aaa',
        tickPosition:'sss',
        tickNum:1,
        carType:JSON.parse(localStorage.getItem('datalist')),
        paySn:{},
        signInfo:'',
        selectAddress:''
      }
    },
    created() {
      Toast.loading({mask: true, duration: 0});
      let vm = this
      this.cardDetail();
    },
    methods: {
      cardDetail() {
        this.goodsType = localStorage.getItem('goodstype')
        if(localStorage.getItem('selectAddress')!==undefined){
          this.selectAddress = JSON.parse(localStorage.getItem('selectAddress'))
        }
        Toast.clear()
      },
      onSubmit() {
        let that = this
        if(localStorage.getItem('selectAddress')===undefined){
          Toast('请选择地址')
          return
        }
        let data={
          openId:'',
          cartIds:localStorage.getItem('cartIds'),
          addressId:that.selectAddress.addressId,
          memberid:88,
          paytype:1
        }
        Ajax.post('target/orderapi/saveorder',data)
          .then(function (response) {
            let res=response.data;
            if(res.result===1){
              that.paySn = res.data[0].paySn
              that.toPay()
            }else{
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
      },
      toPay:function () {
        let that=this
        let data={
          paySn:that.paySn,
          memberId:88
        }
        Ajax.post('target/wxpay/api/payorder',data)
          .then(function (response) {
            let res=response.data;
            if(res.result===1){
              that.signInfo = res.data
              that.callpay()
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
      onBridgeReady: function () {
        let that=this
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': that.signInfo.appid,
            'timeStamp': that.signInfo.timestamp,
            'nonceStr': that.signInfo.noncestr,
            'package': "prepay_id=that.signInfo.prepayid",
            'signType': "MD5",
            'paySign': that.signInfo.sign
          },
          function (res) {
            console.log(res)
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              localStorage.cartIds=''
              localStorage.datalist=''
              localStorage.goodstype=''

              Toast('微信支付成功')
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              Toast('用户取消支付')
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
              Toast('网络异常，请重试')
            }
          }
        )
      },
      callpay: function () {
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(), false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady())
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady())
          }
        } else {
          this.onBridgeReady()
        }
      }
    }
  }

</script>

<style lang="less" scoped>

  .van-address-list__add.van-cell{
    background-color: #f44;
    font-size: 16px;
    color: #fff;
    height: 50px;
    line-height: 50px;
    padding: 0;
    text-align: center;

    &__right-icon{
      display: none;
    }
    .van-icon{
      display: none;
    }
  }
  .aa{
    width: 100%;
    height: 2px;
    background-image:url("../../images/lineBg.png");
    background-size: cover;
  }
  .itemInfo .van-cell__value{
    padding-right: 0;
  }



</style>
