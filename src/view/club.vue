<style lang="less">
  @import "../common/common";
  @font-face {
    font-family: xinyalan;
    src: url('../font/xinyalan.otf')
  }
.club{
  .van-swipe__indicators>i{
    background: none;
    border: 1px solid @white;
    width: 0.16rem;
    height: 0.16rem;
  }
  .van-swipe__indicators{
    left: 88%;

    .van-swipe__indicator--active{
      border: none;
      background: @white;
    }
  }

  .ban{
    height: 4.4rem;
    /*width: 7.5rem;*/
    position: relative;
    margin: 0 auto;
    margin-bottom: 0.1rem;

    img{
      width: 100%;
      height: 100%;
    }
    >div{
      width: 100%;
      height: 0.6rem;
      overflow: hidden;
      padding: 0 0.3rem 0 1.5rem;
      font-size:0.28rem;
      background: -webkit-linear-gradient(left, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* 标准的语法（必须放在最后） */
      .calender{
        position: absolute;
        left: 0;
        top: 0;
        color: #252627;
        padding: 0.2rem 0;
        font-size: 0.18rem;
        font-weight: 600;
        p{
          line-height: 0.3rem;
          padding-left: 0.25rem;
          &:nth-child(2){
            padding-left: 0.65rem;
          }
        }
        .line{
          position: absolute;
          top: 0.1rem;
          right: 0.5rem;
          width: 0.02rem;
          height: 0.8rem;
          background: #2e2d2b;
          transform:rotate(45deg);
          -o-transform:rotate(45deg);
          -moz-transform:rotate(45deg);
          -webkit-transform:rotate(45deg);
        }
      }
    }
  }
  .instrduce{
    padding: 0.6rem 0.4rem;
    .img{
      width: 1.52rem;
      height: 1.03rem;
      background: url("../images/logo.png") no-repeat center center;
      background-size: cover;
      margin: 0 auto;
    }
    .success_zhuce_tit {
      margin-top: 0.3rem;
      width: 100%;
      padding: 0rem;
      display: flex;
      justify-content: space-between;
      span {
        width: 0.17rem;
        background: url("../images/arrow.png") no-repeat left top;
        background-size: 0.17rem;
        &.right {
          background-image: url("../images/arrowB.png");
          background-position: right bottom;
        }
      }
      .first_tit {
        font-family: xinyalan;
        font-size: 0.1rem;
        letter-spacing: 0.2rem;
        color: @white;
        text-align: center;
        &.first_titEn{
          letter-spacing: 0.03rem;
          font-size: 0.09rem;
        }
      }
    }
    .cal{
      height: 0.86rem;
      text-align: center;
      padding-top: 0.3rem;
      font-family: xinyalan;
      .bg{
        display: inline-block;
        width: 0.54rem;
        height: 0.86rem;
        background: #323232;
        color: @white;
        text-align: center;
        line-height: 0.86rem;
      }
      .i{
        color: @wgray;
      }

    }
  }
  .title{
    display: flex;
    justify-content: space-between;
    height: 0.76rem;
    line-height: 0.76rem;
    padding: 0 0.2rem;
    border-bottom: 0.01rem solid #F0C37A;
    p{
      font-size: 0.28rem;
      span{
        font-size: 0.18rem;
      }
    }
  }
  .list{
    /*padding: 0 0.1rem;*/
    .noData{
      text-align: center;
      line-height: 0.9rem;
      color: #999999;
    }
    .card{
      height: 1.6rem;
      margin-top: 0.1rem;
      display: flex;
      justify-content: left;
      border-radius: 0.05rem;
      background:#252627 url("../images/clubBg.png") no-repeat right top;
      background-size: 2.67rem 1.88rem;
      >div{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .left{
        width: 1.2rem;
        border-top-left-radius: 0.05rem;
        border-bottom-left-bottom-radius: 0.05rem;
        background-image: url("../images/leftBg.png");
        background-size: cover;
        border-right: 0;
        p{
          text-align: center;
          color: #252627;
          font-size: 0.36rem;
          &:first-child{
            /*font-family: 'MicrosoftYaHei-Bold';*/
            font-size: 0.3rem;
            font-weight: bold;
          }
          span{
            font-size: 0.2rem;
          }
        }
      }
      .con{
        width: 6.0rem;
        padding: 0.2rem;
        p{
          font-size: 0.24rem;
          color: #F0C37A;
          height: 0.4rem;
          line-height: 0.4rem;
          text-overflow:ellipsis;
          white-space:nowrap;
          overflow:hidden;
          &:before{
            content: '';
            display: inline-block;
            vertical-align: middle;
            color: #DA0202;
            width: 0.08rem;
            height: 0.08rem;
            background: #DA0202;
            border-radius: 0.08rem;
            margin-right: 0.2rem;
          }
        }
      }
    }
    .ban{
      background: #333333;
      padding: 0.15rem;
      height: 4.6rem;
      img{
        height: 3.3rem;
        border: 1px solid @wgray;
      }
      >div{
        position: relative;
        background: none;
        color: @white;
        display: flex;
        align-items: center;
        height: 0.8rem;
        vertical-align:middle;
        top: 0.15rem;
        letter-spacing: 0.1rem;
        color: @wgray;
        overflow: hidden;
        .calender{
          color: @white;
          .line{
            overflow: hidden;
            background: @white;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="club">
    <van-swipe :show-indicators="true" :autoplay="3000">
      <van-swipe-item  v-for="(item,index) in goodsMainList" :key="index">
      <div class="ban"
           @click="$router.push({ name: 'activityGoods', params: { id:item.goodsId }})">
        <img v-lazy="comPath.imgPath+item.goodsImage" alt="">
        <!--<div>
          <div class="calender">
            <p>{{item.activityStartTime | timeTrans(2)}}日</p>
            <p>{{item.activityStartTime | timeTrans(1)}}月</p>
            <div class="line"></div>
          </div>
          {{item.goodsName}}
        </div>-->
      </div>
      </van-swipe-item>
    </van-swipe>

    <div class="instrduce">
      <div class="img"></div>
      <div class="success_zhuce_tit">
        <span class="left"></span>
        <div>
          <p class="first_tit">每晚为您呈现高品质的爵士乐</p>
          <p class="first_tit first_titEn">— EXCELLENT LIVE JAZZ EVERY NIGHT —</p>
        </div>
        <span class="right"></span>
      </div>

      <div class="cal">
        <p>
          <span class="bg">{{curDate.getMonth()+1}}</span>
          <span class="i">/</span>
          <span class="bg">{{curDate.getDate()}}</span>
          <span class="i"> — </span>
          <span class="bg">{{lastDate.month}}</span>
          <span class="i">/</span>
          <span class="bg">{{lastDate.date}}</span>
        </p>
      </div>
    </div>

    <!--<div class="ban" v-for="(item,index) in goodsMainList"
         @click="$router.push({ name: 'activityGoods', params: { id:item.goodsId }})">
      <img v-lazy="comPath.imgPath+item.goodsImage" alt="">
      <div>
        <div class="calender">
          <p>{{item.activityStartTime | timeTrans(2)}}日</p>
          <p>{{item.activityStartTime | timeTrans(1)}}月</p>
          <div class="line"></div>
        </div>
        {{item.goodsName}}
      </div>
    </div>-->

    <!--<div class="title">
      <p>推荐演出</p>
      <p>{{curDate.getMonth()+1}}<span>月</span>{{curDate.getDate()}}<span>日</span> — {{lastDate.month}}<span>月</span>{{lastDate.date}}<span>日</span></p>
    </div>-->

    <div class="list">
      <!--<div class="card" v-for="(item,index) in goodsList"
           @click="$router.push({ name: 'activityGoods', params: { id:item.goodsId }})">
        <div class="left">
          <p>{{item.activityStartTime | timeTrans(1) | EnMonthTrans}}.</p>
          <p>{{item.activityStartTime | timeTrans(2)}}<span>日</span></p>
        </div>
        <div class="con">
          <p v-for="(it,ind) in item.programList">{{it}}</p>
        </div>
      </div>-->


      <div class="ban" v-for="(item,index) in goodsList" :key="index"
           @click="$router.push({ name: 'activityGoods', params: { id:item.goodsId }})">
        <img v-lazy="comPath.imgPath+item.goodsImage" alt="">
        <div>
          <div class="calender">
            <p>{{item.activityStartTime | timeTrans(2)}}</p>
            <p>{{item.activityStartTime | timeTrans(1)}}</p>
            <div class="line"></div>
          </div>
          {{item.programList | listSplit}}

        </div>
      </div>

      <div class="noData" v-if="noData">没有更多数据</div>

    </div>
  </div>
</template>

<script>
  import '../common/dataFormate'
  import {Toast, Icon, Cell, CellGroup,Swipe, SwipeItem} from 'vant';

  export default {
    name: "club",
    components: {
      [Toast.name]: Toast,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem
    },
    data() {
      return {
        comPath: PublicPath,
        goodsMainList:[],
        goodsList:[],
        curDate:new Date(),
        lastDate:'',
        noData:false
      }
    },
    created() {
      Toast.loading({ mask: true,duration:0 });
      let that = this
      that.clubList()
      that.time()
    },
    computed: {},
    beforeMount:function () {

    },
    methods: {
      clubList() {
        let that = this
        Ajax.post('target/product/goodsActivityTime', {})
          .then(function (response) {
            let res = response.data;
            if (res.result === '1') {
              if(that.goodsList.length===0&&that.goodsMainList.length===0){
                that.noData = true
              }
              that.goodsMainList = res.goodsMainList
              res.goodsList.map(item=>{
                item.programList = item.programList.split('。')
              })
              that.goodsList=res.goodsList
              Toast.clear()
            } else {
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      time() {
        var date = new Date();
        date.setDate(date.getDate() + 14);
        this.lastDate = {
          month:date.getMonth() + 1,
          date:date.getDate()
        }
      }
    },
    mounted() {

    },
    filters: {
      listSplit(val,i){
        if(!val) return
        return val.toString().length>35?val.toString().substring(0,35)+'...' : val.toString()
      },
      timeTrans(val,i) {
        if(val){
          let time = (new Date(val).Format("yyyy-MM-dd")).split('-')
          return time[i]
        }
      },
      EnMonthTrans(val){
        if(val){
          let str='Jan'
          if(val === '01'){
            str='Jan'
          }else if(val === '02'){
            str='Feb'
          }else if(val === '03'){
            str='Mar'
          }else if(val === '04'){
            str='Apr'
          }else if(val === '05'){
            str='May'
          }else if(val === '06'){
            str='Jun'
          }else if(val === '07'){
            str='Jul'
          }else if(val === '08'){
            str='Aug'
          }else if(val === '09'){
            str='Sep'
          }else if(val === '10'){
            str='Oct'
          }else if(val === '11'){
            str='Nov'
          }else if(val === '12'){
            str='Dec'
          }
          return str;
        }
      }
    }
  }
</script>

