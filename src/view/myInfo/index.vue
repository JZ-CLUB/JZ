<style lang="less">
  @import "../../common/common";

  #myInfo_body {
    .myInfo_con_first {
      background: #181919;
      padding-bottom: 0.6rem;
      .top {
        width: 7.5rem;
        height: 2.6rem;
        margin: 0 auto;
        background: url("../../images/myInfo_bg.jpg");
        background-size: cover;
        text-align: right;
        span {
          width: 0.42rem;
          height: 0.42rem;
          display: inline-block;
          background: url("../../images/myInfo_03.png");
          background-size: cover;
        }
      }
      .myInfo {
        position: relative;
        padding-top: 1.35rem;
        .headPic {
          width: 2.7rem;
          height: 2.7rem;
          background: #231815;
          border-radius: 50%;
          position: absolute;
          top: 0%;
          left: 50%;
          transform: translate(-50%, -50%);
          img {
            height: 1.3rem;
            margin: 0 auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .baseInfo {
          text-align: center;
          font-size: 0.20rem;
          h2 {
            font-weight: normal;
            color: @white;
            font-size: 0.34rem;
            line-height: 0.9rem;
          }
          p {
            line-height: 0.4rem;
            color: @gray;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              margin-right: 0.1rem;
              width: 0.39rem;
              height: 0.3rem;
              background: url("../../images/myInfo_07.png") no-repeat center center;
              background-size: cover;
            }
          }
          .cardNum {
            width: 5.2rem;
            height: 0.6rem;
            font-size: 0.28rem;
            line-height: calc(0.6rem - 0.02rem);
            border-top: 0.01rem solid @gray;
            border-bottom: 0.01rem solid @gray;
            margin: 0.15rem auto;
            color: @white;
          }
        }
      }

      .Info_top {
        padding-top: 0.7rem;
      }
      .myInfo_num {
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin: 0.6rem 0 0;
        ul {
          width: 50%;
          font-size: 0.28rem;
          color: #666666;
          &:nth-child(1) {
            border-right: 0.01rem solid @gray;
          }
          li:nth-child(1) {
            color: @gray;
            font-size: 0.28rem;
            font-size: 0.3rem;
          }
          li:nth-child(2) {
            color: @white;
            font-size: 0.58rem;
            margin-top: 0.1rem;
          }
        }
      }
      .card_con {
        margin-top: 0.65rem !important;
      }
    }
    .myInfo_con_second {
      margin-top: 0.1rem;
      background: #181919;
      .groupBox {
        background: #1a1a1a;
        > div {
          display: flex;
          justify-content: space-between;
        }
        .van-cell {
          height: 1rem;
          line-height: 0.6rem;
          background: #1a1a1a;
          font-size: 0.28rem;
          color: #f0c37a;
          font-weight: 600;
        }
        .icon_bean {
          width: 1.4rem;
          height: 1rem;
          line-height: 0.8rem;
          box-sizing: border-box;
          text-align: center;
          img {
            width: 0.5rem;
            display: inline-block;
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
    .operate {
      margin-top: 0.1rem;
      background: #181919;
      .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 0.9rem;
        line-height: 0.9rem;
        color: #989898;
        font-size: 0.28rem;
        &:last-child {
          > p {
            border-bottom: 0;
          }

        }
        > span {
          margin: 0 0.3rem;
          width: 0.54rem;
          height: 0.54rem;
          background: url("../../images/myInfo_11.png") no-repeat center center;
          background-size: cover;
          &.quan {
            background-image: url("../../images/myInfo_14.png");
          }
          &.shezhi {
            background-image: url("../../images/myInfo_03.png");
          }

        }
        > p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 0.3rem;
          width: 6.36rem;
          border-bottom: 1px solid #666767;
          span:first-child {
            width: 2rem;
          }
          span:last-child {
            width: 0.18rem;
            height: 0.32rem;
            background: url("../../images/ar.png") no-repeat center center;
            background-size: cover;
          }
        }
      }
    }
  }
</style>
<template>
  <div id="myInfo_body" v-if="load">
    <div class="myInfo_con_first">
      <div class="top">
      </div>
      <div class="myInfo">
        <div class="headPic">
          <img src="../../images/myInfo_logo.png" alt="">
        </div>
        <div class="baseInfo">
          <h2>{{myInfo.memberTruename !== ''? myInfo.memberTruename :myInfo.memberName}}</h2>
          <p><i></i>普通乐迷卡</p>
          <!--<div class="cardNum">会员卡号 65371998</div>-->
        </div>
      </div>

      <div class="myInfo_num">
        <ul class="">
          <li>优惠券</li>
          <li>0</li>
        </ul>
        <ul class="">
          <li>爵士豆</li>
          <li>0</li>
        </ul>
      </div>
    </div>
    <div class="operate">
      <div class="item">
        <span class="dou"></span>
        <p>
          <span>我的爵士豆</span>
          <span></span>
        </p>

      </div>

      <div class="item">
        <span class="quan"></span>
        <p>
          <span>我的优惠券</span>
          <span></span>
        </p>

      </div>
      <router-link to="/memberInfo">
        <div class="item">
          <span class="shezhi"></span>
          <p>
            <span>设置</span>
            <span></span>
          </p>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
  import {sig} from '../../common/weixin'
  import {Row, Col, Icon, Cell, CellGroup, Toast} from 'vant';

  export default {
    data() {
      return {
        load: false,
        myInfo: {
          memberName: '爵士之语'
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
      Toast.loading({mask: true, duration: 0});
    },
    created() {

    },
    beforeMount: function () {
      let vm = this
      sig(true).then(function () {
        vm.load = true
        vm.getMyInfo()
      })
    },
    methods: {
      getMyInfo: function () {
        let that = this
        let data = {
          memberId: sessionStorage.getItem('memberId')
        }
        Ajax.post('target/memberapi/memberDetail', data)
          .then(function (response) {
            if (response.status === 200) {
              let res = response.data
              if (res.result === 1) {
                that.myInfo = response.data.data[0]
                Toast.clear()
              } else {
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

