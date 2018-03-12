<template>
  <div class="asdasd">
asdfsadfasdf
  </div>
</template>

<script>
  import {sig} from '../../common/weixin'

export default {
  components: {

  },

  data() {
    return {

    };
  },
  created() {
    this.sig()
  },

  methods: {
    sig () {
      let that=this
      return new Promise(function (resolve, reject) {
        global.openid = that.UrlSearch('openid');
        console.log(!openid)
        if (!openid) {
          // let callback = encodeURIComponent(window.location.href)
          //let callback='http://www.jzmember.com/h5/#/h5backurl'
          let callback='http://www.jzmember.com/#/h5backurl'
          console.log(window.location.href)
          window.location.href = 'http://www.jzmember.com/h5/target/loginapi/wxlogin_userinfo?back_url='+callback;
          /*Ajax.post('target/loginapi/wxlogin_userinfo',{})
            .then(function (response) {
              let res=response.data;
              if(res.result === 1){//认证成功
                localStorage.openId = res.data[0].openid
                // localStorage.memberId = res.data[0].memberid
                console.log(res.msg)
              }else if(res.result === 2){//不是会员
                localStorage.openId = res.data[0].openid
                window.open("http://www.jzmember.com/h5/#/register")
                console.log(res.msg)
              }else{
                console.log(res)
                //window.open("http://localhost:3000/#/register")
                window.location.href = 'http://www.jzmember.com/jazz-music/wechat/auth?callback=' + callback;
              }
              localStorage.memberId = 88
              resolve();
            })
            .catch(function (error) {
              reject()
              console.log(error)
            });*/
          // resolve();
        }
        else {
          console.log(that.UrlSearch('openid'))
          // result=2&openid=ookwssz_3DXN0zO9u2T0z5RwsN9c&memberid=
          if(that.UrlSearch('result') === 1){
            localStorage.memberId=that.UrlSearch('memberid');
            localStorage.openId=that.UrlSearch('openid');
            window.location.href = localStorage.curUrl;
          }else{
            localStorage.openId=that.UrlSearch('openid');
            window.location.href = 'http://www.jzmember.com/h5/#/register';
          }
          resolve();
        }
      })
    },
    UrlSearch(e) {
      var name,value;
      var str=location.href; //取得整个地址栏
      var num=str.indexOf("?");
      var dat={};
      str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

      var arr=str.split("&"); //各个参数放到数组里
      //console.log(arr)
      for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        //console.log(arr[i].indexOf("="));
        if(num>0){
          name=arr[i].substring(0,num);
          value=arr[i].substr(num+1);
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
