<template>
  <div class="goodsList">
    <scroller :on-infinite="refresh" ref="my_scroller">
      <van-search v-model='info' placeholder="请输入商品名称"/>

      <van-swipe v-show="showFlag">
        <div v-for="(image, index) in imageList" :key="index" @click="$router.push({ name: 'activityGoods', params: { id:image.goodsId }})">
          <van-swipe-item>
            <img v-lazy="comPath.imgPath+image.goodsImage" />
          </van-swipe-item>
        </div>
      </van-swipe>

      <div class="goImg" v-show="showFlag">
        <img src="../../images/go.png" alt="">
      </div>

      <van-row class="cardBox">
        <van-col span="12" v-for="(item,index) in searchData" :key="index">
          <div @click="$router.push({ name: 'activityGoods', params: { id:item.goodsId }})">
            <img class="cardImg" :src=comPath.imgPath+item.goodsImage alt="">
            <p class="cardText">{{item.goodsName}}</p>
          </div>
        </van-col>
      </van-row>
    </scroller>
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
        comPath:PublicPath,
        imageList: [],
        activityList: [],
        disabled: false,
        sendData:{
          searchType:'gcIdSearch',
          keyword:'',
          pageNo:0,
          brandId:'',
          areaId:'',
          specFilter:'',
          sortField:'',
          sortOrder:'',
          pageField:'',
          sortSize:''
        },
        info:'',
        flag:true
      };
    },
    created () {
      let vm = this
      Toast.loading({ mask: true,duration:0 });
      vm.recommend()
    },
    computed: {
      showFlag:function () {
        return this.info===''?true:false
      },
      searchData: function() {
        let search = this.info;
        if (search) {
          return this.activityList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.activityList;
      }
    },
    methods: {
      recommend() {
        let that=this
        // Ajax.get('/static/recoment.json')
        Ajax.post('target/recommendGoodsApi/api/Recommedgoodslist',{goodsflagsname:'recommend'})
          .then(function (response) {
            let res=response.data;
            if(res.data.length!==0){
              res.data.map(function (item,index) {
                item.goodsImage=that.comPath.imgPath+item.goodsImage
              })
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
      refresh(done) {
        let that=this
        that.sendData.pageNo ++
        if(!that.flag){
          setTimeout(() => {
            done(true)
          }, 1500)
          return;
        }
        if(that.flag){
          // Ajax.get('/static/activityList.json')
          Ajax.post('target/goods/api/goodslist',that.sendData)
            .then(function (response) {
              let res=response.data;
              if(res.data.length!==0){
                res.data.map(function(x){
                  that.activityList.push(x)
                })
                if(res.data.length<10){
                  that.flag=false
                }
                setTimeout(() => {
                  done()
                }, 1500)
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
  };
</script>

<style lang="less" scoped>
  .searchBox{
    height: 1rem;
    padding: 0.2rem 0.24rem;
  }
  .van-search__input{
    height: 18px;
    line-height: 18px;
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
