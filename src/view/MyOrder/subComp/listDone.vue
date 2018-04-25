<template>
  <scroller :on-infinite="refresh" ref="my_scroller" class="myOrderBox">
    <div style="height: 0.9rem;"></div>
    <div class="orderItem" v-for="(it, index) in items"
         :key="index">
      <div v-for="(item, i) in it.orderGoodsList"
           :key="i"
           @click="$router.push({ name: 'orderDetail', params: { orderId:item.orderId }})">
        <div class="imgbox">
          <img v-lazy="comPath.imgPath+item.goodsImage" alt="">
        </div>
        <p class="title">{{item.goodsName}}</p>
        <p class="subTitle">{{item.specInfo}}</p>

        <span :class="{'statusBtn':it.orderState===10,'doneBtn':it.orderState===40}">{{it.orderState | orderStateName}}</span>
      </div>
    </div>
  </scroller>
</template>
<script>
  import {
    Card, Toast, Button, Row, Col, Icon
  } from 'vant';
  export default {
    name: "TestThree",
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
        imageURL:'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        param:{
          memberId:sessionStorage.getItem('memberId'),
          status:40,
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
          let url='/static/done.json'
          // Ajax.get(url)
          Ajax.post('target/orderapi/orderlist',that.param)
            .then(function (response) {
              let res=response.data;
              if(res.data.length!==[]){
                that.items = [...that.items,...res.data]
                if(res.data.length<that.param.pageSize){
                  that.flag=false
                }
                setTimeout(() => {
                  done()
                }, 300)
                Toast.clear()
              }else{
                Toast(res.msg)
                setTimeout(() => {
                  done(true)
                }, 0)
              }
            })
            .catch(function (error) {
              console.log(error)
              // Toast('加载失败error')
            });
        }
      }
    }
  }
</script>

<style lang="less">

</style>
