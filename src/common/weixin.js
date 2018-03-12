//登录
const sig = () => {
  localStorage.curUrl = window.location.href
  if(!localStorage.getItem('openId')){
    let callback = 'http://www.jzmember.com/h5/#/h5backurl'
    window.location.href = 'http://www.jzmember.com/h5/target/loginapi/wxlogin_userinfo?back_url=' + callback;
  }else{
    if(!localStorage.getItem('memberId')){
      window.location.href = "http://www.jzmember.com/h5/#/register"
    }
  }
}


function jump() {
  let callback = encodeURIComponent(window.location.href)
  window.location.href = 'http://cod.baleina.cn?callback=' + callback + '&client=klz'
}

function UrlSearch(e) {
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
function getRandom() { //生成签名的随机串
  var random = "";
  for (var i = 1; i <= 32; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16);
    random += n;
    if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) random += "";
  }
  return random;
}
//签名
const sigin = () => {
  if (!global.signature) {
    signature()
  }
  function signature(onSuccess) {
    var timestamp = new Date().getTime();
    var noncestrS = getRandom();
    var urlparam = window.location.href.split('#')[0];
    var url = 'http://www.jzmember.com/jazz-music/wechat/sharedSign?url=' + urlparam + '&noncestr=' + noncestrS + '&timestamp=' + timestamp + ''
    var req = request.get(url);
    req.timeout(10000);
    req.send({
      // url: window.location.href.split('#')[0],
    }).end(function (err, res) {
      var json = res.body
      config(json, onSuccess, timestamp, noncestrS)
    })
  }
  // signature(null)

  function config(json, onSuccess, timestamp, noncestrS) {
    wx.config({
      debug: false,
      appId: 'wxc1018ead3239e035',
      timestamp: timestamp,
      nonceStr: noncestrS,
      signature: json['message'],
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'translateVoice',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
    })

    wx.ready(function () {
      global.signature = true
      // if (onSuccess) {
      //     onSuccess()
      // }
      // console.log('signature success---------');
      global.changeWx()
    })

    wx.error(function () {
      global.signature = false
    })

  }
}

global._wxData = {
  wxtitle: '',
  wxlink: '',
  wxdesc: '',
  wximgUrl: ''
}
global.changeWx = function () {
  wx.onMenuShareAppMessage({
    title: global._wxData.wxtitle,
    desc: global._wxData.wxdesc,
    link: global._wxData.wxlink,
    imgUrl: global._wxData.wximgUrl,
    trigger: function () { },
    success: function () {
      if (window.shareSuccess) {
        window.shareSuccess()
      }
    },
    cancel: function () { },
    fail: function () { }
  })

  wx.onMenuShareTimeline({
    title: global._wxData.wxtitle,
    link: global._wxData.wxlink,
    imgUrl: global._wxData.wximgUrl,
    trigger: function () { },
    success: function () {
      if (window.shareSuccess) {
        window.shareSuccess()
      }
    },
    cancel: function () { },
    fail: function () {  }
  })
}

export {
  sig, sigin
}
