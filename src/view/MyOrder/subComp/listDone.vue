<template>
  <scroller :on-infinite="refresh" ref="my_scroller">
    <div style="height: 58px;"></div>
    <div v-for="(it, index) in items"
         :key="index"
         @click="$router.push({ name: 'activityGoods', params: { id:it.goodsId }})">
      <van-card
        :title="it.goodsName"
        :desc="it.specInfo"
        :thumb="comPath.imgPath+it.goodsImage"
      >
        <div slot="footer">
          <van-button size="mini">已出票</van-button>
        </div>
      </van-card>
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
          memberId:'',
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
              if(res.data.length!==0){
                res.data.map(function (item,index) {
                  that.items=that.items.concat(item.orderGoodsList[0])
                })
                if(res.data.length<that.param.pageSize){
                  that.flag=false
                }
                setTimeout(() => {
                  done()
                }, 300)
                Toast.clear()
              }else{
                Toast(res.msg)
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
