<template>
  <div class="goods">
    <van-search placeholder="请输入商品名称"/>
  </div>
</template>

<script>
  import {
    Search
  } from 'vant';

  export default {
    components: {
      [Search.name]: Search
    },

    data() {
      return {

      };
    },
  created () {
    let vm = this
    vm.send()
  },
    methods: {
      send: function () {
        // Ajax.get('/static/test.json')
        Ajax.get('api/app/inmail/getInmailNum?id=1')
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          // console.log(error);
        });
      }
    }
  };
</script>

<style lang="less">
  body{
    background: aquamarine;
  }
  /*@import '../style/reset.less';*/
</style>
