<template>
  <scroller :on-infinite="refresh" ref="my_scroller">
    <div style="height: 0.9rem;"></div>
    <div v-for="(it, index) in items"
         :key="index"
         >
      <div v-for="(item, i) in it.orderGoodsList"
           :key="i"
           @click="$router.push({ name: 'orderDetail', params: { orderId:item.orderId }})">
        <van-card
          :title="item.goodsName"
          :desc="item.specInfo"
          :thumb="comPath.imgPath+item.goodsImage"
        >
        <div slot="footer">
          <van-button @click="aaa" v-if="it.orderState===10" size="mini">待付款</van-button>
          <van-button v-if="it.orderState===40" size="mini">已出票</van-button>
          <van-button v-if="it.orderState===20" size="mini">待发货</van-button>
          <van-button v-if="it.orderState===30" size="mini">已发货</van-button>
          <van-button v-if="it.orderState===50" size="mini">已提交</van-button>
          <van-button v-if="it.orderState===60" size="mini">已确认</van-button>
          <van-button v-if="it.orderState===0" size="mini">已取消</van-button>
        </div>
      </van-card>
      </div>
    </div>
  </scroller>
</template>
<script>
  import {
    Card, Toast, Button, Row, Col, Icon
  } from 'vant';
  export default {
    name: "Test",
    components: {
      [Card.name]: Card,
      [Toast.name]: Toast,
      [Button.name]:Button,
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon
    },
    data () {
      return {
        comPath:PublicPath,
        items: [],
        flag:true,
        param:{
          memberId:88,
          status:'',
          pageNo:0,
          pageSize:10
        }
      }
    },
    created () {
      let vm = this
    },
    mounted() {

    },
    methods: {
      aaa(){
        alert(1)
      },
      refresh(done) {
        let that=this
        that.param.pageNo ++
        if(!that.flag){
          setTimeout(() => {
            done(true)
          }, 300)
          return;
        }
        if(that.flag){
          let url='/static/test.json'
          // Ajax.get(url)
          Ajax.post('target/orderapi/orderlist',that.param)
            .then(function (response) {
              let res=response.data;
              if(res.data.length!==[]){
                that.items=that.items.concat(res.data)
                if(res.data.length<that.param.pageSize){
                  that.flag=false
                }
                setTimeout(() => {
                  done()
                }, 300)
                Toast.clear()
              }else{
                Toast('数据为空')
                setTimeout(() => {
                  done(true)
                }, 0)
              }
            })
            .catch(function (error) {
              console.log(error)
              Toast('加载失败error')
            });
        }
      }
    }
  }
</script>
<style lang="less">

</style>
