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

        <span class="statusBtn" v-if="it.orderState===10">待付款</span>
        <span class="doneBtn" v-if="it.orderState===40">已出票</span>
        <span class="" v-if="it.orderState===20">待发货</span>
        <span class="" v-if="it.orderState===30">已发货</span>
        <span class="" v-if="it.orderState===50">已提交</span>
        <span class="" v-if="it.orderState===60">已确认</span>
        <span class="" v-if="it.orderState===70">已验票</span>
        <span class="" v-if="it.orderState===80">已失效</span>
        <span class="" v-if="it.orderState===0">已取消</span>
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
        }
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
      padding-left: 1.1rem;
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
