<template>
  <van-cell-group>
    <van-cell :value="orderInfo.orderState">
      <div slot="title">订单号：{{orderInfo.orderSn}}</div>
    </van-cell>

    <van-cell v-if="orderInfo.orderType===0">
      <div class="van-address-list__name">收货人：{{ addressInfo.trueName }}，电话：{{ addressInfo.mobPhone }}</div>
      <div class="van-address-list__address">收货地址：{{ addressInfo.areaInfo }}{{addressInfo.address}}</div>
    </van-cell>

    <div @click="$router.push({ name: 'activityGoods', params: { id:orderGoodsList.goodsId }})">
      <van-card
        :title="orderGoodsList.goodsName"
        :desc="orderGoodsList.specInfo"
        :thumb="comPath.imgPath+orderGoodsList.goodsImage"
      />
    </div>

    <div class="tips">
      【注】如有任何票务疑问，请联系JZ票务负责人 XXX ，电话：13011111111
    </div>

    <van-cell :value="'¥'+orderInfo.orderTotalPrice">
      <div slot="title">订单总价：</div>
    </van-cell>

    <div v-if="orderInfo.orderStateNum===10" class="textR van-panel__footer van-hairline--top">
      <van-button size="small" @click="checkOpr($route.params.orderId)">取消订单</van-button>
      <van-button size="small" type="danger">付款</van-button>
    </div>

    <div v-if="orderInfo.orderType===0&&orderInfo.orderStateNum===40" class="ewm">
      <p>二维码号：222332444554</p>
      <div>
        <img src="http://15.146.38.175:8000/upload/img/store/9/1519726538964.jpg" alt="">
      </div>
    </div>

  </van-cell-group>

</template>
<script>
  import {
    Cell, CellGroup, Toast, Card, Panel, Button,Dialog
  } from 'vant';

  export default {
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Toast.name]: Toast,
      [Card.name]: Card,
      [Panel.name]: Panel,
      [Button.name]: Button,
      [Dialog.name]:Dialog
    },
    data() {
      return {
        comPath:PublicPath,
        orderInfo:[],
        addressInfo:'',
        orderGoodsList:[],
      }
    },
    created() {
      Toast.loading({mask: true, duration: 0});
      let vm = this
      this.orderDetail();
    },
    computed: {

    },
    mounted() {
      Toast.clear()
    },
    methods: {
      orderDetail:function () {
        let that=this
        Ajax.post('target/orderapi/orderdetail',{orderid:that.$route.params.orderId})
          .then(function (response) {
            let res=response.data;
            if(res.data!==[]){
              that.orderInfo = {
                orderType:res.data[0].orderType,
                orderSn:res.data[0].orderSn,
                orderTotalPrice:res.data[0].orderTotalPrice,
                orderStateNum:res.data[0].orderState,
                orderState:res.data[0].orderState === 10 ? '待付款' : (res.data[0].orderState === 20 ? '待发货' : (res.data[0].orderState === 30 ? '已发货' : (res.data[0].orderState === 40 ? '已完成' : (res.data[0].orderState === 50 ? '已提交' : (res.data[0].orderState === 60 ? '已确认' : '已出票')))))
              }
              that.addressInfo = res.data[0].address
              that.orderGoodsList = res.data[0].orderGoodsList[0],
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
      checkOpr:function (id) {
        Dialog.confirm({
          message: '确定取消订单？'
        }).then(() => {
          this.orderCancel(id)
        }).catch(() => {
          Toast('取消')
        });
      },
      orderCancel:function (id) {
        Ajax.post('target/orderapi/cancleorder',{ordersn:id})
          .then(function (response) {
            let res=response.data;
            Toast(res.msg)
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
      }
    }
  }
</script>
<style lang="less" scoped>
  .textR {
    text-align: right;
  }
  .van-dialog__content{
    text-align: center;
  }
  .ewm{
    p,div{
      text-align: center;
      img{
        margin: 0 auto;
      }
    }
  }
</style>
