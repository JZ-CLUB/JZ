<template>
  <div id="register_body" v-if="load">
    <div class="register_con">
      <van-cell-group class="con_container">
        <van-field
          label="手机号"
          v-model="phoneNum"
          icon="clear"
          placeholder="请输入手机号"
          @click-icon="phoneNum = ''"
        />
        <div class="yzCode_div">
          <van-field
            type="text"
            label="验证码"
            v-model="yzCode"
            placeholder="6位验证码"
          />
          <div class="dj_yzCode">
            <button @click="getCode(formData)" class="code-btn" :disabled="!show">
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{count}}s</span>
            </button>
          </div>
        </div>
      </van-cell-group>
      <div class="register_button">
        <van-button size="large" @click="registerClick()">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Row, Col, Icon, Cell, CellGroup, Field, Button, Toast, Dialog} from 'vant';

  const TIME_COUNT = 60;
  export default {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [Dialog.name]: Dialog
    },
    data() {
      return {
        formData: {
          phoneNum: this.phoneNum,
          yzCode: this.yzCode,
        },
        show: true,
        count: '',
        timer: null,
        phoneNum: '',
        yzCode: '',
        load:sessionStorage.getItem('openId')
      }
    },
    beforeCreate() {
      localStorage.curUrl = window.location.href
      if(!sessionStorage.getItem('openId')){
        let callback = 'http://www.jzmember.com/h5/#/h5backurl'
        window.location.href = 'http://www.jzmember.com/h5/target/loginapi/wxlogin_userinfo?back_url=' + callback;
      }
    },
    created(){
      Toast.loading({ mask: true,duration:0 });
    },
    methods: {
      getCode(formData) {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.phoneNum == '' || this.phoneNum == undefined) {
          Toast("请输入手机号码");
        } else if (!reg.test(this.phoneNum)) {
          Toast("手机格式不正确");
        } else {
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }
          let data = {
            mobile: this.phoneNum
          }
          Ajax.post('target/loginapi/sendMsgCode', data)
            .then(function (response) {
              let res = response.data
              Toast(res.msg)
            })
            .catch(function (error) {
              Toast('加载失败error')
            });
        }
      },
      registerClick() {
        let that = this
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.phoneNum == "" || this.phoneNum == undefined) {
          Toast("请填写手机号！")
        } else if (!reg.test(this.phoneNum)) {
          Toast("手机格式不正确");
        } else {
          if (this.yzCode.length != 6) {
            Toast("请输入验证码！");
          } else {
            let data = {
              openid: sessionStorage.getItem('openId'),
              mobile: this.phoneNum,
              smscode: this.yzCode
            }
            Ajax.post('target/memberapi/wxregister', data)
              .then(function (res) {
                Toast.clear()
                if (res.data.result == "1") {
                  sessionStorage.memberId = res.data.memberId
                  that.$router.push({path: '/successRegister'});
                } else if (res.data.result == "2") {
                  // that.$router.push({name: 'home'})
                  Dialog.alert({
                    message: '您已经是JZ会员',
                    title:'提示'
                  }).then(() => {
                    that.$router.push({name: 'home'})
                  });
                }else{
                  Toast(res.data.msg);
                }
              })
              .catch(function (error) {
                console.log(error)
                Toast('加载失败error')
              });
          }
        }
      }
    },
    mounted() {
      Toast.clear()
    }
  };
</script>

<style lang="less">
  #register_body {
    width: 100%;
    height: 100%;
    background: url("../../images/register_bg.jpg");
    background-size: cover;
    .con_container {
      font-size: 0.28rem;
      font-family: 微软雅黑;
      border-radius: 0.05rem;
      .van-field {
        height: 1rem;
        line-height: 0.6rem;
        border-radius: 0.1rem;
      }
    }
    .register_con {
      width: 88.26%;
      max-width: 750px;
      margin: 0 auto;
      padding-top: 5.38rem;
      .register_button {
        height: 0.8rem;
        line-height: 0.8rem;
        margin-top: 0.5rem;
        text-align: center;
        .van-button {
          color: white;
          background: #be2c36 !important;
          border: 0;
          font-family: 微软雅黑;
          font-size: 0.28rem;
          height: 0.8rem;
          line-height: 0.8rem;
        }
      }
      .van-cell--required::before {
        color: white !important;
      }
      .van-cell__value {
        padding-left: 60px !important;
        position: relative;
        display: inline-block !important;
      }
      .van-cell__text {
        display: inline-block;
        .van-cell__text::before {
          width: 20px;
          height: 20px;
          background: red;
          display: inline-block;
          z-index: 99;
          border-radius: 5px;
        }
      }
      .yzCode_div{
          // border:1px solid red;
          position: relative;
         .dj_yzCode {
            width: auto;
            position: absolute;
            float: right;
            vertical-align: middle;
            margin-top: -0.23rem;
            right: 0.5rem;
            top: 50%;
            height: 1rem;
          .code-btn {
            background: none;
            border: 0;
            font-size: 0.28rem;
            color: #f0c37a;
          }
        }
      }
    }
    .van-hairline--top-bottom::after{
      border:0 !important;
    }
  }
</style>
