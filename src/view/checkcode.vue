<template>
  <div class="checkcode" v-if="load">

  </div>
</template>

<script>
  import { sig ,UrlSearch } from '../common/weixin'
  import { Toast } from 'vant';
  export default {
    name: "checkcode",
    data() {
      return {
        load: false
      }
    },
    created() {
      let vm = this
      sig(true).then(function () {
        vm.load = true
        vm.checkcode()
      })
      vm.checkcode()
    },
    computed: {},
    mounted() {

    },
    methods: {
      checkcode() {
        Ajax.post('target/orderapi/checkticket', {
          openid: sessionStorage.getItem('openId'),
          ticket: UrlSearch('ticket'),
          sign: 'aaaaa'
        })
          .then(function (response) {
            let res = response.data;
            Toast(res.msg)
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    }
  }
</script>

<style scoped>

</style>
