const storage = window.localStorage;
//登录
const sig = () => {
  return new Promise(function (resolve, reject) {
    global.openid = getUrlParam('openId');
    localStorage.openId=getUrlParam('openId');
    if (!openid) {
      let callback = encodeURIComponent(window.location.href)
      //window.location.href = 'http://www.jzmember.com/jazz-music/wechat/auth?callback=' + callback;
      Ajax.post('target/loginapi/wxlogin',{})
        .then(function (response) {
          let res=response.data;
          if(res.result === 1){
            localStorage.openId = res.data[0].openid
            console.log(res.msg)

            //window.open("http://localhost:3000/#/register")

          }else if(res.result === 2){
            localStorage.openId = res.data[0].openid
            localStorage.memberId = res.data[0].memberid
            console.log(res.msg)
          }else{
            console.log(res.msg)
            //window.open("http://localhost:3000/#/register")
          }
          resolve();
        })
        .catch(function (error) {
          reject()
          console.log(error)
        });
    } else {
      var req = request.get(`/jazz-music/user/query/wechatInfo?openId=${openid}`);
      req.timeout(10000);
      req.end((err, res) => {
        if (err || !res || res.body.error) {
          alert('获取用户信息失败')
        } else {
          // console.log(res.body, '-------user info');
          localStorage.userinfo = JSON.stringify(res.body);
          // localStorage.openid=getUrlParam('openId');
        }
        resolve(res.body);
      });
    }
  })
}

const info = () => {
  return new Promise(function(resolve, reject) {
    var req = request.get(`/jazz-music/user/query/wechatInfo?openId=${storage['openid']}`);
    req.timeout(10000);
    req.end((err, res) => {
      if (err || !res || res.body.error) {
        resolve();
      } else {
        // console.log(res.body, '-------user info');
        localStorage.userinfo = JSON.stringify(res.body);
        // localStorage.openid=getUrlParam('openId');
      }
      resolve();
    });
  })

}

function jump() {
  let callback = encodeURIComponent(window.location.href)
  window.location.href = 'http://cod.baleina.cn?callback=' + callback + '&client=klz'
}

function getUrlParam(key) {
  var m = window.location.search.match(new RegExp('(\\?|#|&)' + key + '=([^&]*)(#|&|$)'));

  if (!m) {
    m = window.location.hash.match(new RegExp('(#|&)' + key + '=([^&#]*)(#|&|$)'));
  }

  return !m ? "" : decodeURIComponent(m[2]);
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
  sig, sigin,info
}
