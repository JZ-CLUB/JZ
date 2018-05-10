<style lang="less" scoped>
  .musicList {
    .cardBox {
      .pd15{
        padding: 0 0.15rem;
      }
      .plays {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1.09rem;
        height: 1.09rem;
        background: url("../../../images/playIcon.png") no-repeat center center;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-size: cover;
        .time{
          position: relative;
          top: 1.1rem;
          font-size: 0.24rem;
          text-align: center!important;
          color: #ffffff;
        }
      }
      .van-col-12 {
        margin: 0.2rem 0px 0 0;
        padding: 0 0.15rem;
        a{
          color: #ffffff;
          position: relative;
        }
        .cardImg {
          max-width: 100%;
          margin: 0 auto;
          width: 3.3rem;
          height: 3.3rem;
          overflow: hidden;
          text-align: right;
          position: relative;
          img{
            height: 3.3rem;
            float: right;
          }
        }
        .cardText {
          text-align: center;
          margin-top: 0.1rem;
          font-size: 0.2rem;
          height: 0.7rem;
          line-height: 0.35rem;
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
  <div class="musicList">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <div class="itemFive" v-for="(it,ind) in musicList" :key="ind">
        <van-row class="cardBox" >
          <van-col v-for="(item,index) in it" :key="index" class="musicItem pd0" span="24" v-if="index===0">
            <a :href="item.videoUrl">
              <img v-lazy="comPath.imgPath+item.pathImage" alt="">
              <!--<div class="plays">
                <div class="time">03:09</div>
              </div>-->
              <p>{{item.videoName}}</p>
            </a>
          </van-col>
          <div class="pd15">
            <van-col v-for="(item,index) in it" :key="index" span="12" v-if="index!==0">
              <a :href="item.videoUrl">
                <div class="cardImg">
                  <img  :src='comPath.imgPath+item.pathImage' alt="">
                  <!--<div class="plays">
                    <div class="time">03:09</div>
                  </div>-->
                </div>

                <p class="cardText">{{item.videoName}}</p>
              </a>
            </van-col>
          </div>

        </van-row>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {Toast, Cell, Row, Col,} from 'vant';

  export default {
    name: "tab-other",
    components: {
      [Toast.name]: Toast,
      [Cell.name]: Cell,
      [Row.name]: Row,
      [Col.name]: Col
    },
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        musicList: [],
        comPath: PublicPath,
        param: {
          pageNo: 1,
          pageSize: 20,
          videoShow:1,
          videoType:1
        }
      }
    },
    methods: {
      onLoad() {
        let that = this
        Ajax.post('target/video/videoList', that.param)
          .then(function (response) {
            let res = response.data;
            if (res.datas.length !== []) {
              that.musicList = that.musicList.concat(that.sliceArray(res.datas, 5))
              that.loading = false;
              that.param.pageNo++

              if (res.datas.length < that.param.pageSize) {
                that.finished = true;
              }
            } else {
              Toast('数据为空')
            }
          })
          .catch(function (error) {
            console.log(error)
            // Toast('加载失败error')
          });
      },
      sliceArray(array, size) {
        let result = [];
        for (let x = 0; x < Math.ceil(array.length / size); x++) {
          let start = x * size;
          let end = start + size;
          result.push(array.slice(start, end));
        }
        return result;
      }
    }
  }
</script>
