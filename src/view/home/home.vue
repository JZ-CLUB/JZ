<style lang="less">
  .goodsList {
    color: #f0c37a;
    .search {
      .van-search__input-wrap{
        height: 0.6rem;
        .van-icon-search:before{
          /*content: '';*/
          background: url("../../images/search.png") no-repeat center center;
          background-size: cover;
          color: rgba(255,255,255,0);
        }
      }
      input {
        height: 0.28rem;
        text-align: center;
        font-size: 0.28rem;
      }
    }

    .van-swipe-item {
      height: 4.18rem;
      /*position: relative;*/
      img {
        max-width: 100%;
        height: 4.18rem;
        margin: 0 auto;
      }
      >div{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.9rem;
        background: rgba(0,0,0,0.4);
        color: #FFFFFF;
        font-size: 0.32rem;
        padding: 0 0.4rem;
        line-height: 0.9rem;
      }
    }

    .goImg {
      padding: 0.15rem;
      img{
        width: 5.9rem;
        margin: 0 auto;
      }
    }

    .line {
      width: 100%;
      height: 0.04rem;
      background: #4c0013;
    }

    .cardBox {
      padding: 0.15rem 0.15rem 0 0.15rem;
      .van-col-12 {
        margin: 0.15rem 0 0 0;
        padding: 0 0.15rem;
        .cardImg {
          max-width: 100%;
          margin: 0 auto;
          width: 3.3rem;
          height: 3.3rem;
        }
        .cardText {
          text-align: center;
          padding-top: 0.1rem;
          font-size: 0.12rem;
          height: 0.8rem;
          line-height: 0.3rem;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 2; /** 显示的行数 **/
          overflow: hidden; /** 隐藏超出的内容 **/
        }
      }
    }
  }
</style>
<template>
  <div class="goodsList">
    <scroller :on-infinite="refresh" ref="my_scroller" v-if="load">
      <van-search class="search" background="#000000" v-model='info' placeholder="搜索爵士热点活动"/>

      <van-swipe v-show="showFlag" :show-indicators="false" :autoplay="3000">
        <div v-for="(image, index) in imageList" :key="index"
             @click="$router.push({ name: 'activityGoods', params: { id:image.goodsId }})">
          <van-swipe-item>
            <img v-lazy="comPath.imgPath+image.goodsImage"/>
            <div>{{image.goodsName}}</div>
          </van-swipe-item>
        </div>
      </van-swipe>

      <van-row class="cardBox">
        <van-col span="12" v-for="(item,index) in searchData" :key="index">
          <div @click="$router.push({ name: 'activityGoods', params: { id:item.goodsId }})">
            <img class="cardImg" v-lazy=comPath.imgPath+item.goodsImage alt="">
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
  import {sig} from '../../common/weixin'

  Vue.use(VueLazyLoad, {
    error: '',
    loading: ''
  })
  import {
    Search, Toast, Swipe, SwipeItem, Row, Col, Waterfall
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
        comPath: PublicPath,
        imageList: [],
        activityList: [],
        disabled: false,
        sendData: {
          searchType: 'allSearch',
          keyword: '',
          pageNo: 0,
          brandId: '',
          areaId: '',
          specFilter: '',
          sortField: 'goodsId',
          sortOrder: 'desc',
          pageField: '',
          sortSize: ''
        },
        info: '',
        flag: true,
        load: false,
      };
    },
    beforeMount:function () {
      let vm = this
      sig(true).then(function () {
        vm.load = true
        vm.recommend()
      })
    },
    computed: {
      showFlag: function () {
        return this.info === '' ? true : false
      },
      searchData: function () {
        let search = this.info;
        if (search) {
          return this.activityList.filter(function (product) {
            return Object.keys(product).some(function (key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.activityList;
      }
    },
    methods: {
      recommend() {
        Toast.loading({mask: true, duration: 0});
        let that = this
        Ajax.post('target/recommendGoodsApi/api/Recommedgoodslist', {goodsflagsname: 'recommend'})
          .then(function (response) {
            let res = response.data;
            if (res.data.length !== 0) {
              that.imageList = res.data
            } else {
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            // Toast('加载失败error')
          });
      },
      refresh(done) {
        let that = this
        that.sendData.pageNo++
        if (!that.flag) {
          setTimeout(() => {
            done(true)
          }, 0)
          return;
        }
        if (that.flag) {
          // Ajax.get('/static/activityList.json')
          Ajax.post('target/goods/api/goodslist', that.sendData)
            .then(function (response) {
              let res = response.data;
              if (res.data.length !== 0) {
                res.data.map(function (x) {
                  that.activityList.push(x)
                })
                if (res.data.length < 10) {
                  that.flag = false
                }
                setTimeout(() => {
                  done()
                }, 300)
                Toast.clear()
              } else {
                Toast(res.msg)
                setTimeout(() => {
                  done(true)
                }, 0)
              }
            })
            .catch(function (error) {
              console.log(error)
              setTimeout(() => {
                done(true)
              }, 0)
              // Toast('加载失败error')
            });
        }
      }
    }
  };
</script>
