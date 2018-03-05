<template>
  <scroller :on-infinite="refresh" ref="my_scroller">
    <div style="height: 58px;"></div>
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
  .plugin-name {
    margin: 0;
    padding-top: 60px;
    text-align: center;
    color: #666;
    font-style: normal;
    font-variant-ligatures: normal;
    font-variant-caps: normal;
    font-variant-numeric: normal;
    font-weight: normal;
    font-stretch: normal;
    font-size: 48px;
    line-height: 48px;
    margin-bottom: 10px;
  }

  .for-vue-js {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
  }

  .plugin-name, .for-vue-js {
    font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
  }

  .row {
    display: block;
    width: 100%;
    height: 50px;
    padding: 10px 0 10px 15px;
    font-size: 16px;
    line-height: 30px;
    color: #444;
    background-color: #fff;
  }

  .grey-bg {
    background-color: #eee;
  }

  .arrow-right {
    width: 8px;
    height: 16px;
    float: right;
    margin-top: 7px;
    margin-right: 15px;
  }
  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}

  .user {
    &-links {
      position: relative;
      z-index: 22222;
      padding: 5px 0;
      font-size: 12px;
      text-align: center;
      background-color: #fff;

      .van-icon {
        display: block;
        font-size: 24px;
      }
    }
  }
</style>
