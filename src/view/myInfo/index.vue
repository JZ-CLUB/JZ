<style lang="less">
  #myInfo_body {
    width: 100%;
    .myInfo_con_first {
      width: 100%;
      background-image: url("../../images/myInfo_bg.jpg");
      background-size: 100%;
      background-repeat: no-repeat;
      background-color: #1a1a1a;
      .myInfo_con_first_con {
        width: 88.26%;
        margin: 0 auto;
        // background-color: #1a1a1a;
      }
      .Info_top{
        padding-top: 0.7rem;
      }
      .van-row {
        width: 100%;
        // margin-top: 0.7rem;
        position: relative;
        .title_left {
          width: 100%;;
          float: left;
          .title_left_left {
            width: 26.06%;
            height: 1.7rem;
            float: left;
            margin-right: 7.4%
          }
          .title_left_right {
            color: white;
            margin-left: 7.4%;
            .myInfo_title {
              font-family: 微软雅黑;
              color: #f0c37a;
              font-size: 0.36rem;
              padding-top: 0.09rem;
              padding-bottom: 0.25rem;
            }
            .card_type {
              i {
                width: 0.39rem;
                height: 0.3rem;
                background: url("../../images/myInfo_07.png") no-repeat center;
                background-size: 100%;
                display: inline-block;
              }
              span {
                font-size: 0.24rem;
                margin-left: 1%;
                color: #666666;
              }
            }
          }
        }
        .title_right {
          width: 100%;
          right: 0;
        }
        .cardNum {
          color: #666666;
          position: absolute;
          margin-top: 2.91rem;
          margin-left: 28.6%;
        }
      }
      .myInfo_num {
        text-align: center;
        margin-top: 0 !important;
        ul {
          width: 50%;
          font-size: 0.28rem;
          color: #666666;
          font-family: 微软雅黑;
        }
        .myInfo_num_border {
          border-right: 1px solid #333333;
          margin-bottom: 0.7rem;
          display: inline-block;
          box-sizing: border-box;
          width: 49%;
          li:nth-child(1) {
            color: #666;
            font-size: 0.28rem;
          }
          li:nth-child(2) {
            color: #f0c37a;
            font-size: 0.58rem;
            margin-top: 0.1rem;
          }
        }
        .myInfo_num_ul {
          width: 49%;
          font-size: 0.28rem;
          color: #666666;
          font-family: 微软雅黑;
          display: inline-block;
          box-sizing: border-box;
          li:nth-child(1) {
            color: #666;
            font-size: 0.28rem;
          }
          li:nth-child(2) {
            margin-top: 0.1rem;
            color: #f0c37a;
            font-size: 0.58rem;
          }
        }
      }
      .card_con {
        margin-top: 0.65rem !important;
      }
    }
    .myInfo_con_second {
      width: 100%;
      margin: 0 auto;
      margin-top: 0.1rem;
      float: left;
      background: #191919;
      .van-cell-group {
        // width: 88.26%;
        // margin: 0 auto;
        background: #1a1a1a;
        .van-cell {
          width: 81.25% !important;
          height: 1rem;
          line-height: 0.6rem;
          background: #1a1a1a;
          font-size: 0.28rem;
          color: #f0c37a;
          font-weight: 600;
          font-family: 微软雅黑;
          float: left;
        }
        .icon_bean {
          width: 18.15%;
          height: 1rem;
          line-height: 1rem;
          display: inline-block;
          box-sizing: border-box;
          text-align: center;
          float: left;
          img {
            width: 36.03%;
            height: 0.44rem;
            display: inline-block;
            vertical-align: middle;
          }
        }
        .icon_bean_second {
          width: 18.15%;
          height: 1rem;
          line-height: 1rem;
          display: inline-block;
          box-sizing: border-box;
          text-align: center;
          float: left;
          img {
            width: 39.7%;
            height: 0.4rem;
            display: inline-block;
            vertical-align: middle;
          }
        }
        .icon_first_border {
          border-bottom: 1px solid #000000;
        }
        .icon_coupon {
          width: 8.156%;
          height: 0.4rem;
          padding-left: 5px;
          display: inline-block;
          vertical-align: super;
          background: url("../../images/myInfo_14.png") no-repeat center;
          background-size: contain;
        }
      }
      .van-hairline--top-bottom::after {
        border: 0 !important;
      }
    }
  }
</style>
<template>
  <div id="myInfo_body" v-if="load">
    <div class="myInfo_con_first">
      <div class="myInfo_con_first_con">
        <van-row class="Info_top">
          <van-col span="22">
            <div class="tit_con">
              <div class="title_left">
                <div class="title_left_left">
                  <img src="../../images/myInfo_logo.png">
                </div>
                <div class="title_left_right">
                  <p class="myInfo_title">{{myInfo.memberTruename !== ''? myInfo.memberTruename :myInfo.memberName}}</p>
                  <div class="card_type">
                    <i></i>
                    <span><s>普通乐迷卡</s></span>
                  </div>
                </div>
              </div>
            </div>
          </van-col>
          <van-col span="2">
            <router-link to="/memberInfo">
              <div class="title_right">
                <img src="../../images/myInfo_03.png">
              </div>
            </router-link>
          </van-col>
        </van-row>
        <van-row class="card_con">
          <van-col span="24">
            <img src="../../images/myInfoCard.png">
          </van-col>
          <div class="cardNum">
            <p><s>0000&nbsp;&nbsp;0000</s></p>
          </div>
        </van-row>
        <div class="myInfo_num">
          <ul class="myInfo_num_border">
            <li>爵士豆</li>
            <li>0</li>
          </ul>
          <ul class="myInfo_num_ul">
            <li>优惠券</li>
            <li>0</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="myInfo_con_second">
      <van-cell-group>
        <span class="icon_bean">
          <img src="../../images/myInfo_11.png">
        </span>
        <van-cell :border='false' title="我的爵士豆" class="icon_first_border" is-link/>
        <span class="icon_bean_second">
          <img src="../../images/myInfo_14.png">
        </span>
        <van-cell :border='false' title="我的优惠券" is-link/>
      </van-cell-group>
    </div> -->
  </div>
</template>

<script>
  import {sig} from '../../common/weixin'
  import {Row, Col, Icon, Cell, CellGroup, Toast} from 'vant';

  export default {
    data () {
      return {
        load: false,
        myInfo:{
          memberName:'爵士之语'
        }
      }
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Toast.name]: Toast
    },
    beforeCreate() {
      Toast.loading({ mask: true,duration:0 });
    },
    created() {

    },
    beforeMount:function () {
      let vm = this
      sig(true).then(function () {
        vm.load = true
        vm.getMyInfo()
      })
    },
    methods: {
      getMyInfo: function () {
        let that=this
        let data = {
          memberId: sessionStorage.getItem('memberId')
        }
        Ajax.post('target/memberapi/memberDetail', data)
          .then(function (response) {
            if(response.status === 200){
              let res = response.data
              if(res.result===1){
                that.myInfo = response.data.data[0]
                Toast.clear()
              }else{
                Toast(response.msg)
              }
            }
          })
          .catch(function (error) {
            // console.log(error);
          });
      }
    }
  };
</script>

