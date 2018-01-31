<template>
  <div>
    <div class="register_con">
     <van-cell-group>
        <van-field
        label="手机号"
        v-model="phoneNum"
        icon="clear"
        placeholder="请输入手机号"
        required
        @click-icon="phoneNum = ''"
        />
        <van-field
        
        type="text"
        label="验证码"
        v-model="yzCode"
        placeholder="6位验证码"
        required
        />
        <div class="dj_yzCode">
          <button @click="getCode(formData)" class="code-btn" :disabled="!show">
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{count}}s</span>
          </button>
        </div>
      </van-cell-group>
      <div class="register_button">
          <van-button size="large" @click="registerClick()">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Field, Button, Toast } from 'vant';
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
    [Toast.name]: Toast
  },
  data(){
      return {
        formData: {
          phoneNum: this.phoneNum,
          yzCode:this.yzCode,
        },
        show: true,
        count: '',
        timer: null,
        phoneNum:'',
        yzCode:''
      }
    },
    methods:{
      getCode(formData){
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(this.phoneNum=='' || this.phoneNum== undefined){
          Toast("请输入手机号码");
        }else if(!reg.test(this.phoneNum)){
          Toast("手机格式不正确");
        }else{
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
        }
      },
      registerClick(){
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(this.phoneNum == "" || this.phoneNum == undefined){
          Toast("请填写手机号！")
        }else if(!reg.test(this.phoneNum)){
          Toast("手机格式不正确");
        }else{
          if(this.yzCode.length != 6){
              Toast("请输入验证码！");
          }
        }
      }
    }
};
</script>

<style lang="less">
.register_con{
    width: 80%;
    max-width: 750px;
    margin: 0 auto;
  .register_button{
    height: 40px;
    line-height: 40px;
    margin-top:50px;
    text-align: center;
    .van-button{
      color:white;
      background: #d52d33 !important;
    }
  }
  .van-cell--required::before{
    color:white !important;
  }
  .van-cell__value{
    padding-left: 60px !important;
    position: relative;
  }
  .van-cell__text{
    display: inline-block;
    .van-cell__text::before{
      width: 20px;
      height: 20px;
      background: red;
      display: inline-block;
      z-index: 99;
      border-radius: 5px;
    }
  }
  .dj_yzCode{
    width: auto;
    position: absolute;
    float: right;
    vertical-align: top;
    margin-top: -34px;
    right: 5px;
    .code-btn{
      background: none;
      border:0;
      font-size: 16px;
    color: yellow;
    }
  }
}
</style>
