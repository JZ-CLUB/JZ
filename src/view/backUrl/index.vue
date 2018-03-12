<template>
  <div class="asdasd">
    asdfsadfasdf
  </div>
</template>

<script>
  import {sig} from '../../common/weixin'

  export default {
    components: {},

    data() {
      return {};
    },
    created() {
      this.sig()
    },

    methods: {
      sig() {
        let that = this
        global.openid = that.UrlSearch('openid');
        if (!openid) {
          // let callback = encodeURIComponent(window.location.href)
          let callback = 'http://www.jzmember.com/h5/#/h5backurl'
          window.location.href = 'http://www.jzmember.com/h5/target/loginapi/wxlogin_userinfo?back_url=' + callback;
        }
        else {
          if (that.UrlSearch('result') === 1) {
            localStorage.memberId = that.UrlSearch('memberid');
            localStorage.openId = that.UrlSearch('openid');
            window.location.href = localStorage.curUrl;
          } else {
            localStorage.openId = that.UrlSearch('openid');
            window.location.href = 'http://www.jzmember.com/h5/#/register';
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
