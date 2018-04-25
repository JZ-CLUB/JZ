<style lang="less">
  #reg {
    width: 100%;
    height: 12.13rem;
    background: url("../../images/successBg.jpg") no-repeat ;
    -webkit-background-size: cover;
    background-size: cover;
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
<template>
  <div id="reg">
    <!--<div class="success_zhuce_tit">
      <p class="first_tit">恭喜您成为JZ会员</p>
      &lt;!&ndash; <p class="second_tit">卡级别：<span class="second_tit_con">普通乐迷卡</span></p> &ndash;&gt;
    </div>-->
    <div class="success_zhuce_con">
      <div class="card_con">
      </div>
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


