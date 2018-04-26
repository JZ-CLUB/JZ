<style lang="less" scoped>
  @import "../../common/success";
  .card{
    color: @wgray;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.2rem;
    i{
      margin-right: 0.1rem;
      width: 0.39rem;
      height: 0.3rem;
      background: url("../../images/myInfo_07.png") no-repeat center center;
      background-size: cover;
    }
  }
</style>
<template>
  <div id="succ">
    <div class="success_zhuce_tit">
      <span class="left"></span>
      <p class="first_tit">恭喜您成为JZ会员</p>
      <span class="right"></span>
    </div>

    <p class="card"><i></i>普通乐迷卡</p>

    <div class="btnBox">
      <!--<router-link to="/myOrder">
        <span>查看我的活动</span>
      </router-link>-->
      <router-link to="/">
        <span>返回活动首页</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {Button, Toast} from 'vant';

  export default {
    components: {},
    data() {
      return {}
    },
    created() {

    },
    methods: {},
    mounted() {
      Toast.clear()
    }
  };
</script>

