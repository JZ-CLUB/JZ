<style lang="less">
  @import "../../common/common";
  .toPayBox{
    .payAddress{
      margin-top:0.2rem;
      &:after{
        border: none;
      }
      .van-cell{
        background: #1a1a1a;
        color: @white;
        padding: 0.15rem 0.4rem;
        .van-address-list__name{
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.28rem;
          .telPhone{
            float: right;
          }
        }
        .van-address-list__address{
          color: @white;
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
      &+p{
        color: @yellow;
      }
      &__con{
        color: @white;
        padding-left: 8px;
        padding-right: 8px;
      }
      &__tit{
        font-size: 18px;
        color: @white;
        text-align: center;
        font-weight: 100;
      }
    }
    .itemInfo{
      margin: 0.2rem 0;
      background: #1a1a1a;
      padding: 0 0.4rem 0.15rem;
      .goodDetail{
        display: flex;
        justify-content: flex-start ;
        padding: 0.3rem 0;
        border-bottom: 0.01rem solid #000000;
        .img{
          width: 1rem;
          height: 1rem;
          margin-right: 0.4rem;
          overflow: hidden;
          img{
            float: right;
            height: 100%;
            /*max-width: 100%;*/
          }
        }
        .con{
          width: 5.3rem;
          display: flex;
          justify-content: center;
          flex-direction: column;
          font-size: 0.32rem;

          height: 1rem;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 2; /** 显示的行数 **/
          overflow: hidden; /** 隐藏超出的内容 **/
        }
      }
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
        color: @gray;
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
      <div class="goodDetail">
        <div class="img">
          <img :src="comPath.imgPath+imgBan" alt="">
        </div>
        <div class="con">
          <p>{{goodsTitle}}</p>
        </div>
      </div>
      <!--<h1 class="">{{goodsTitle}}</h1>-->
      <van-cell-group>
        <van-cell title="门票类型" :value="tickType" />
        <van-cell v-for="(val, key, index) in carType" :key="index" :title="key" :value="val" />
        <van-cell title="购买数量" :value="tickNum" />
      </van-cell-group>
    </div>

    <van-cell-group class="draftBox">
      <van-field v-model="draft" placeholder="请输入备注（选填）" />
    </van-cell-group>

    <div class="tips">
      <p @click="show=true">点击阅读【购票须知】</p>
    </div>
    <van-popup class="showDiv" v-model="show" position="top" :overlay="true">
      <h2 class="showDiv__tit">购票须知</h2>
      <p>【购票须知】</p>

      <div v-if="gcId==='213'">
        <p class="showDiv__con">一、所有网上购票观众携带购票二维码到前台进行验证，验证通过后入场。门票一经出售，概不退换（因不可抗力导致的演出推移、延时或取消除外，主办方也将提前通知）
          毁即视无效。</p>
        <p class="showDiv__con">二、现场具体座位由前台工作人员进行安排，观众由服务人员引领至相应座位入座。</p>
        <p class="showDiv__con">三、因场地座位有限，在座位空余情况下，会有拼桌现象，敬请谅解。</p>
        <p class="showDiv__con">四、JZ Club提供餐饮服务，入场后即可点餐。谢绝自带食品与酒水进入场地。</p>
        <p class="showDiv__con">五、门票发票须演出当日凭桌卡开具。</p>
      </div>


      <div v-else>
        <p class="showDiv__con">一、请在指定购票渠道购票，否则出现不良后果如假票等，由购票者自行承担。门票一经出售，概不退换（因不可抗力导致的演出推移、延时或取消除外，主办方也将提前通知）。</p>
        <p class="showDiv__con">二、每人一票，儿童130cm以下可免票入场。进门一次有效，无副券作废，请观众着装整洁，服从现场工作人员管理，依次入场。</p>
        <p class="showDiv__con">三、请勿在条码及其周围1厘米内涂写、折叠、损坏，否则造成条码无法识别而不能入场，由购票者自行承担责任。</p>
        <p class="showDiv__con">四、请自觉接受安全检查。严禁携带枪支、弹药、管制刀具等违禁物品；严禁携带打火机等易燃易爆物品；严禁携带液态物品入场；严禁携带任何酒水饮料入场。</p>
        <p class="showDiv__con">五、以上规定如与具体活动发生冲突时，以活动要求为准。</p>
        <p class="showDiv__con">六、任何购买、持有或使用门票的人均被认为已经阅读、理解并接受了以上条款。</p>
      </div>

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
  import {AddressList,Toast,Cell,CellGroup,Icon,SubmitBar,Popup,Field} from 'vant';

  export default {
    components: {
      [AddressList.name]: AddressList,
      [Toast.name]: Toast,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Icon.name]: Icon,
      [SubmitBar.name]: SubmitBar,
      [Popup.name]: Popup,
      [Field.name]:Field
    },
    data() {
      return {
        comPath: PublicPath,
        imgBan:localStorage.getItem('imgBan'),
        draft:'',
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
        show: false,
        gcId:'215'
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
              that.gcId=res.gcId
              that.totalPrice = Number(res.goodsPrice)*100*Number(res.goodsNum)
              that.tickNum = res.goodsNum

            }else{
              Toast(res.msg)
            }
            Toast.clear()
          })
          .catch(function (error) {
            console.log(error)
            // Toast('加载失败error')
          });
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
          paytype:1,
          deliverExplain:that.draft
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
            Toast('error')
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

