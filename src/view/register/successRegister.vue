<template>
  <div id="reg">
    <div class="success_zhuce_tit">
      <p class="first_tit">恭喜您成为JZ会员</p>
      <!-- <p class="second_tit">卡级别：<span class="second_tit_con">普通乐迷卡</span></p> -->
    </div>
    <div class="success_zhuce_con">
      <div class="card_con">
        <img src="../../images/successCard_03.jpg">
        <!-- <p class="card_con_num">6537&nbsp;&nbsp;1998</p> -->
      </div>
      <!-- <p class="tip_text">恭喜您获得了1张<span class="get_ticket_color">"JZ购票优惠券"</span>!您可以在"查询-优惠券"中查看详情</p> -->
      <router-link to="/">
        <van-button type="primary" bottom-action>查看最新活动</van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {Button, Toast} from 'vant';

  export default {
    components: {
      [Button.name]: Button,
    },
    data() {
      return {}
    },
    created() {

    },
    methods: {}
  };
</script>


<style lang="less">
  #reg {
    .success_zhuce_tit {
      width: 100%;
      height: 3.17rem;
      background: url("../../images/zhuce_tit_02.jpg") no-repeat center;
      background-size: cover;
      text-align: center;
      .first_tit {
        font-size: 0.4rem;
        color: #f0c37a;
        padding-top: 0.75rem;
      }
      .second_tit {
        width: 40%;
        height: 0.62rem;
        background: #f0c37a;
        color: #000000;
        font-size: 0.24rem;
        margin: 0 auto;
        margin-top: 0.45rem;
      }
    }
    .success_zhuce_con {
      width: 88.26%;
      margin: 0 auto;
      font-weight: 800;
      position: relative;
      .card_con {
        margin-top: 0.45rem;
        position: relative;
        .card_con_num {
          position: absolute;
          margin-top: -0.82rem;
          margin-left: 28.8%;
          color: white;
        }
      }
      .tip_text {
        font-size: 0.28rem;
        font-weight: 100;
        margin-top: 1.1rem;
        .get_ticket_color {
          color: #e62f3b;
        }
      }
      .van-button--bottom-action {
        // background: #be2c36;
        // font-size: 0.28rem;
        // margin-top: 1.4rem;
        background: #be2c36;
        font-size: 0.28rem;
        margin-top: 1.4rem;
        position: fixed;
        bottom: 1rem;
        left: 5.87%;
        width: 88.26%;
      }
    }
  }
</style>
