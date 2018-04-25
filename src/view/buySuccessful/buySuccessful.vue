<style lang="less" scoped>
  #succ {
    height: 100%;
    width: 100%;
    background: url("../../images/successBg.jpg") no-repeat center top;
    background-size: cover;
    height: 12.13rem;
    .success_zhuce_tit {
      width: 100%;
      height: 3.17rem;
      background-size: cover;
      text-align: center;
      .first_tit {
        font-size: 0.4rem;
        color: #f0c37a;
        line-height: 3.17rem;
      }
    }
    .successImg{
      padding: 0.95rem 0;
      img{
        width: 2.08rem;
        height: 1.34rem;
        margin: 0 auto;
      }
      p{
        text-align: center;
        line-height: 1.16rem;
      }
    }
    .btnBox{
      margin: 0.3rem 0.1rem;
      text-align: center;
      span{
        display: inline-block;
        padding: 0 0.5rem;
        line-height: 0.6rem;
        color: #eec27f;
        border: 2px solid #eec27f;
        margin: 0 0.1rem;
      }
    }

  }
</style>
<template>
  <div id="succ">
    <div class="success_zhuce_tit">
      <p class="first_tit">非常感谢您对JZ Festival的支持！</p>
    </div>

    <div class="successImg">
      <!--<img src="../../images/logo.png" alt="">-->
      <p>报名成功！</p>
    </div>

    <div class="btnBox">
      <router-link to="/myOrder">
        <span>查看我的活动</span>
      </router-link>
      <router-link to="/">
        <span>返回活动首页</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {Button, Toast} from 'vant';

  export default {
    components: {

    },
    data() {
      return {}
    },
    created() {

    },
    methods: {

    },
    mounted(){
      Toast.clear()
    }
  };
</script>

