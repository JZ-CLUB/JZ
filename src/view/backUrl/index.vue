<template>
  <div class="asdasd">

  </div>
</template>

<script>
  import {
     Toast
  } from 'vant';

  export default {
    components: {
      [Toast.name]: Toast
    },

    data() {
      return {};
    },
    created() {
      this.login()
    },

    methods: {
      login() {
        let that = this
        global.openid = that.UrlSearch('openid');
        if (!openid) {
          Toast('系统繁忙')
        }
        else {
          if (that.UrlSearch('result') === '1') {
            sessionStorage.memberId = that.UrlSearch('memberid');
            sessionStorage.openId = that.UrlSearch('openid');
            window.location.href = localStorage.curUrl;
          } else if(that.UrlSearch('result') === '2') {
            sessionStorage.openId = that.UrlSearch('openid');
            window.location.href = 'http://www.jzmember.com/h5/#/register';
          }else{
            Toast('result不为1或2')
          }
        }
      },
      UrlSearch(e) {
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?");
        var dat = {};
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        //console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf("=");
          //console.log(arr[i].indexOf("="));
          if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            dat[name] = value;
          }
        }
        return dat[e];
      }
    }
  };
</script>

<style lang="less">

</style>
