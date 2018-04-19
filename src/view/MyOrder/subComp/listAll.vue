<template>
  <scroller :on-infinite="refresh" ref="my_scroller" class="myOrderBox">
    <div style="height: 0.9rem;"></div>
    <div class="orderItem" v-for="(it, index) in items"
         :key="index">
      <div v-for="(item, i) in it.orderGoodsList"
           :key="i"
           @click="$router.push({ name: 'orderDetail', params: { orderId:item.orderId }})">
        <img :src="comPath.imgPath+item.goodsImage" alt="">
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
    name: "Test",
    components: {
      [Card.name]: Card,
      [Toast.name]: Toast,
      [Button.name]: Button,
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon
    },
    data() {
      return {
        imageURL:'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        comPath: PublicPath,
        items: [],
        flag: true,
        param: {
          memberId: sessionStorage.getItem('memberId'),
          status: '',
          pageNo: 0,
          pageSize: 10
        },
        orderState:''
      }
    },
    beforeCreate() {
      // sig()
    },
    created() {
      let vm = this
      Toast.clear()
    },
    mounted() {

    },
    methods: {
      refresh(done) {
        let that = this
        that.param.pageNo++
        if (!that.flag) {
          setTimeout(() => {
            done(true)
          }, 300)
          return;
        }
        if (that.flag) {
          let url = '/static/test.json'
          // Ajax.get(url)
          Ajax.post('target/orderapi/orderlist', that.param)
            .then(function (response) {
              let res = response.data;
              if (res.data.length !== []) {
                that.items = that.items.concat(res.data)
                if (res.data.length < that.param.pageSize) {
                  that.flag = false
                }
                setTimeout(() => {
                  done()
                }, 300)
                Toast.clear()
              } else {
                Toast('数据为空')
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
