<template>
  <div>
    <div class="register_con">
     <van-cell-group>
        <van-field
        v-model="phoneNum"
        label="手机号"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="phoneNum = ''"
        />
        <van-field
        v-model="yzCode"
        type="text"
        label="验证码"
        placeholder="验证码"
        required
        />
        <div class="dj_yzCode">获取验证码</div>
      </van-cell-group>
      <div class="register_button">
          <van-button size="large">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Field } from 'vant';

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field
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
    background: #d52d33;
    color:white;
    margin-top:50px;
    text-align: center;
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
    border:1px solid red;
    .van-cell__text::before{
      width: 20px;
      height: 20px;
      background: red;
      display: inline-block;
      z-index: 99;
      border-radius: 5px;
      border:10px solid red;
    }
  }
  .dj_yzCode{
    width: auto;
    position: absolute;
    float: right;
    border:1px solid red;
    font-size: 16px;
    color:yellow;
    vertical-align: top;
  }
}
</style>
