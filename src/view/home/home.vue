<template>
  <div class="goodsList">
    <van-search placeholder="请输入商品名称"/>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in imageList" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="goImg">
      <img src="../../images/go.png" alt="">
    </div>
    <van-row class="cardBox" gutter="10">
      <van-col span="12" v-for="(item,index) in activityList" :key="index">
        <div @click="goodDetail(item.goodsId)">
          <img class="cardImg" :src=item.goodsImage alt="">
          <p class="cardText">{{item.goodsName}}</p>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueLazyLoad from 'vue-lazyload'
  Vue.use(VueLazyLoad,{
    error:'',
    loading:''
  })
  import {
    Search,Toast,Swipe,SwipeItem,Row, Col
  } from 'vant';

  export default {
    components: {
      [Search.name]: Search,
      [Toast.name]: Toast,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Row.name]: Row,
      [Col.name]: Col
    },

    data() {
      return {
        imageList: [
          'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
        ],
        activityList: [],
        ssdd:'111'
      };
    },
  created () {
    let vm = this
    vm.send()
  },
    methods: {
      send () {
        let that=this
        Toast.loading({ mask: true,duration:0 });
        let data={
          searchType:'keywordSearch',
          keyword:'',
          pageNo:'',
          brandId:'',
          areaId:'',
          specFilter:'',
          sortField:'',
          sortOrder:'',
          pageField:'',
          sortSize:''
        }
        // Ajax.get('/static/activityList.json')
        Ajax.post('target/goods/api/goodslist',data)
        .then(function (response) {
          let res=response.data;
          if(res.data.length!==0){
            that.activityList = res.data
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
      goodDetail:function (id) {
        let that=this
        console.log(id)
      }
    },
    mounted: function () {
      console.group('mounted 挂载结束状态===============》');
    }
  };
</script>

<style lang="less">
  body{
    background: #f8f4ea;
  }
  .searchBox{
    height: 1rem;
    padding: 0.2rem 0.24rem;
  }
  .van-swipe-item{
    height: 4.18rem;
    img{
      max-width: 100%;
      height: 4.18rem;
      margin: 0 auto;
    }
  }
  .goImg{
    padding: 15px;
  }
  .cardBox{
    padding: 0 15px;
    .van-col-12{
      margin: 15px 0px 0 0;
      .cardText{
        padding-top: 10px;
        line-height: 0.35rem;
      }
    }
  }
</style>
