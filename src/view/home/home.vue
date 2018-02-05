<template>
  <div class="goodsList">
    <van-search  v-model="search" placeholder="请输入商品名称"/>
    <van-swipe v-show="showFlag" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in imageList" :key="index">
        <img v-lazy="image.goodsImage" />
      </van-swipe-item>
    </van-swipe>
    <div class="goImg" v-show="showFlag">
      <img src="../../images/go.png" alt="">
    </div>

    <van-row class="cardBox"
         v-waterfall-lower="loadMore"
         waterfall-disabled="disabled"
         waterfall-offset="10">
      <van-col span="12" v-for="(item,index) in searchData" :key="index">
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
    Search,Toast,Swipe,SwipeItem,Row, Col, Waterfall
  } from 'vant';
  Vue.use(Waterfall);
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
        imageList: [],
        activityList: [],
        disabled: false,
        pageNo:0,
        sendData:{},
        showFlag: true,
        search:''
      };
    },
    created () {
      let vm = this
      Toast.loading({ mask: true,duration:0 });
      vm.recommend()
    },
    computed: {
      // 计算属性的 getter
      setData: function () {
        // `this` 指向 vm 实例
        this.sendData={
          searchType:'keywordSearch',
          keyword:this.message,
          pageNo:this.pageNo,
          brandId:'',
          areaId:'',
          specFilter:'',
          sortField:'',
          sortOrder:'',
          pageField:'',
          sortSize:''
        }
        return this.sendData
      },
      searchData: function() {
        let search = this.search;
        if (search) {
          this.showFlag=false
          return this.activityList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }else{
          this.showFlag=true
        }
        return this.activityList;
      }
    },
    methods: {
      recommend() {
        let that=this
        Ajax.get('/static/recoment.json')
        // Ajax.post('target/recommendGoodsApi/api/Recommedgoodslist',{goodsflagsname:'recommend'})
          .then(function (response) {
            let res=response.data;
            if(res.data.length!==0){
              that.imageList = res.data
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
      },
      loadMore() {
        let that = this
        that.pageNo ++
        that.disabled = true;
        Ajax.get('/static/activityList.json')
        // Ajax.post('target/goods/api/goodslist',that.setData)
          .then(function (response) {
            let res=response.data
            if(res.data.length!==0){
              res.data.map(function(x){
                that.activityList.push(x)
              })
              Toast.clear()
            }else{
              Toast(res.msg)
            }
            that.disabled = false;
          })
          .catch(function (error) {
            Toast('加载失败error')
          });
      }
    },
    directives: {
      WaterfallLower: Waterfall('lower')
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
      .cardImg{
        width: 3.4rem;
        height: 1.9rem;
        margin: 0 auto;
      }
      .cardText{
        padding-top: 10px;
        line-height: 0.35rem;
      }
    }
  }
</style>
