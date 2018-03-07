<template>
  <div>
    <div class="">
      <img src="../../images/info_card.png" alt="">
    </div>
    <div class="btnBox">
      <router-link to="/myOrder">
        <van-button type="default">查看我的活动</van-button>
      </router-link>
      <router-link to="/">
        <van-button type="default">返回活动首页</van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {Button} from 'vant';
    export default {
        name: "buy-successful",
      components: {
        [Button.name]: Button,
      },
    }
</script>

<style type="less" scoped>
.btnBox{
  text-align: center;
}
</style>
