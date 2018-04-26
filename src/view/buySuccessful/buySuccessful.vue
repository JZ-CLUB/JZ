<style lang="less" scoped>
  @import "../../common/success";
</style>
<template>
  <div id="succ">
    <div class="success_zhuce_tit">
      <span class="left"></span>
      <p class="first_tit">非常感谢您<br/>
        对JZ MUSIC 的支持！</p>
      <span class="right"></span>
    </div>

    <p class="successTip">报名成功！</p>

    <div class="btnBox">
      <router-link to="/myOrder">
        <span>查看我的活动</span>
      </router-link>
      <!--<router-link to="/">
        <span>返回活动首页</span>
      </router-link>-->
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

