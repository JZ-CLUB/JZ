<template>
  <div class="toPayBox">
    <van-cell-group class="payAddress" v-if="goodsType!=='1'">
      <router-link to="/address" v-if="flag === 0">
        <van-cell is-link>
          <div v-if="selectAddress!==''">
            <div class="van-address-list__name">收货人：{{ selectAddress.trueName }} <span class="telPhone">{{ selectAddress.telPhone }}</span></div>
            <div class="van-address-list__address">收货地址：{{ selectAddress.address }}{{ selectAddress.areaInfo }}</div>
          </div>

          <div v-if="selectAddress===''" class="van-address-list__address">请选择收货地址</div>
        </van-cell>
      </router-link>

      <van-cell v-if="flag === 1">
        <div v-if="selectAddress!==''">
          <div class="van-address-list__name">收货人：{{ selectAddress.trueName }} <span class="telPhone">{{ selectAddress.telPhone }}</span></div>
          <div class="van-address-list__address">收货地址：{{ selectAddress.address }}{{ selectAddress.areaInfo }}</div>
        </div>

        <div v-if="selectAddress===''" class="van-address-list__address">请选择收货地址</div>
      </van-cell>

    </van-cell-group>
    <div class="itemInfo">
      <h1 class="">{{goodsTitle}}</h1>
      <van-cell-group>
        <van-cell title="门票类型" :value="tickType" />
        <van-cell v-for="(val, key, index) in carType" :key="index" :title="key" :value="val" />
      </van-cell-group>
    </div>

    <div class="tips">
      <p @click="show=true">点击阅读【购票须知】</p>
    </div>
    <van-popup class="showDiv" v-model="show" position="top" :overlay="true">
      <h2 class="showDiv__tit">购票须知</h2>
      <p>【购票须知】</p>
      <p class="showDiv__con">一、售出门票当日有效，一张门票只可入园一次，副劵自行撕
        毁即视无效。</p>
      <p class="showDiv__con">二、售出门票概不退换，门票遗失，自行负责。</p>
      <p class="showDiv__con">三、门票对园区内需另行付费的项目无效，门票可作为商业发
        票及报销凭证使用。</p>
      <p class="showDiv__con">四、本门票最终解释权······</p>
    </van-popup>

    <van-submit-bar  v-if="flag === 0 "
      :price="totalPrice"
      label="总金额："
      button-text="立即购买"
      @submit="onSubmit"
    />

    <van-submit-bar v-if="flag === 1"
      :price="totalPrice"
      label="总金额："
      button-text="立即支付"
      @submit="toPay"
    />
  </div>
</template>

<script>
  import {AddressList,Toast,Cell,CellGroup,Icon,SubmitBar,Popup} from 'vant';

  export default {
    components: {
      [AddressList.name]: AddressList,
      [Toast.name]: Toast,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Icon.name]: Icon,
      [SubmitBar.name]: SubmitBar,
      [Popup.name]: Popup
    },
    data() {
      return {
        flag: 0,
        chosenAddressId: '1',
        list:'',
        goodsType:localStorage.getItem('goodstype'),//1---二维码  2-----实体票
        tickType:localStorage.getItem('goodstype')==='1' ? '二维码' : '实体票',
        tickTime:'aaa',
        tickPosition:'sss',
        tickNum:1,
        carType:JSON.parse(localStorage.getItem('datalist')),
        paySn:{},
        signInfo:'',
        selectAddress:'',
        totalPrice:0,
        goodsTitle:localStorage.getItem('goodsTitle'),
        show: false
      }
    },
    created() {
      Toast.loading({mask: true, duration: 0});
      let vm = this
      this.cardDetail();
    },
    methods: {
      cardDetail() {
        let that = this
        that.goodsType = localStorage.getItem('goodstype')
        if(localStorage.getItem('selectAddress')!==null&&localStorage.getItem('goodstype') === '2'){
          this.selectAddress = JSON.parse(localStorage.getItem('selectAddress'))
        }
        Ajax.post('target/cart/findCartInfoById',{cartId:localStorage.getItem('cartIds')})
          .then(function (response) {
            let res=response.data;
            if(res.result==='1'){
              that.totalPrice = Number(res.goodsPrice)*100*Number(res.goodsNum)

            }else{
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
        Toast.clear()
      },
      onSubmit() {
        Toast.loading({mask: true, duration: 0});
        let that = this
        if(localStorage.getItem('goodstype')!=='1'){
          if(localStorage.getItem('selectAddress')===undefined || localStorage.getItem('selectAddress')===null || localStorage.getItem('selectAddress')===''){
            Toast.clear()
            Toast('请选择地址')
            return
          }
        }
        let data={
          cartIds:localStorage.getItem('cartIds'),
          addressId:that.selectAddress.addressId,
          memberid:sessionStorage.getItem('memberId'),
          paytype:1
        }
        Ajax.post('target/orderapi/saveorder',data)
          .then(function (response) {
            Toast.clear()
            let res=response.data;
            if(res.result===1){
              that.flag = 1
              that.paySn = res.data[0].paySn
              if(that.totalPrice === 0){
                that.$router.push({ name: 'buySuccessful'})
              }else{
                that.toPay()
              }
            }else{
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            Toast('加载失败error')
          });
      },
      toPay:function () {
        Toast.loading({mask: true, duration: 0});
        let that=this
        let data={
          paySn:that.paySn,
          memberId:sessionStorage.getItem('memberId')
        }
        Ajax.post('target/wxpay/api/payorder',data)
          .then(function (response) {
            let res=response.data;
            if(res.result===1){
              that.signInfo = res.data.jsdata
              that.callpay()
              Toast.clear()
            }else{
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            Toast(error)
          });
      },
      onBridgeReady: function () {
        let that = this
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', that.signInfo,
          function(res){
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              localStorage.cartIds=''
              localStorage.datalist=''
              localStorage.goodstype=''
              that.$router.push({ name: 'buySuccessful'})
              // Toast('微信支付成功')
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              that.$router.push({name:'myOrder'})
              Toast('用户取消支付')
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
              this.$router.push({name:'myOrder'})
              Toast('网络异常，请重试')
            }
          }
        );

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

<style lang="less">
  .toPayBox{
    .payAddress{
      margin-top:0.2rem;
      &:after{
        border: none;
      }
      .van-cell{
        background: #1a1a1a;
        color: #f0c37a;
        padding: 0.15rem 0.4rem;
        .van-address-list__name{
          height: 0.45rem;
          line-height: 0.45rem;
          font-size: 0.28rem;
          .telPhone{
            float: right;
          }
        }
        .van-address-list__address{
          color: #f0c37a;
          font-size: 0.28rem;
          line-height: 0.4rem;
        }
        .van-cell__value--link{
          padding-right: 0.5rem;
        }
      }
    }
    .showDiv{
      width: 100%;
      background-color: #000000;
      font-size: 12px;
      padding: 10px;
      &__con{
        padding-left: 8px;
        padding-right: 8px;
      }
      &__tit{
        font-size: 18px;
        color: #fff;
        text-align: center;
      }
    }
    .itemInfo{
      margin: 0.2rem 0;
      background: #1a1a1a;
      padding: 0 0.4rem 0.15rem;
      h1{
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.32rem;
      }
      .van-cell-group{
        background: none;
      }
      .van-hairline--bottom::after,
      .van-hairline--top-bottom::after,
      .van-hairline::after{
        border: none;
      }
      .van-cell{
        padding:0;
        line-height: 0.6rem;
        background: none;
        color: #666666;
        &:not(:last-child)::after{
          border: 0;
        }

      }
      .van-cell__value{
        padding-right: 0;
      }
    }
    .tips{
      padding: 0 0.4rem;
      color: #736047;
      font-size: 0.24rem;
    }
    .van-submit-bar__bar{
      background: #1a1a1a;
      line-height: 50px;
      span{
        vertical-align: middle;
      }
      .van-button--danger{
        background: #d52d33;
      }
      .van-submit-bar__price-interger,.van-submit-bar__price-decimal{
        font-size: 0.4rem;
        color: #bf2b39;
      }
    }
  }
</style>
