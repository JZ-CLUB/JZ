<template>
  <div class="goods">
    <van-search placeholder="请输入商品名称" v-model="value" />
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

    methods: {

    }
  };
</script>

<style lang="less">

</style>
