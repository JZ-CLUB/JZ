<style lang="less">
  @import "../../common/common";
  .memberInfo {
    min-height: 3rem;
    .van-cell-group {
      background: #000;
    }
    .van-popup {
      box-sizing: border-box;
      background: #000;
      &--right {
        width: 100%;
        position: absolute;
        top: 1.5rem;
      }
      .van-field .van-cell__title{
        min-width: 1.4rem;
        width: 1.4rem;
      }


      .van-button--primary {
        background: #c20007 !important;
        width: 6.66rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 1rem;
        height: 0.85rem;
        line-height: 0.86rem;
        font-size: 0.28rem;
      }
    }
    .van-actionsheet {
      background: #1A1A1A;
      .van-actionsheet__item {
        background: #1A1A1A;
        span {
          font-size: 0.28rem;
          color: @white;
        }
      }
      .van-picker {
        background: #1a1a1a !important;
      }
      .van-picker__cancel {
        font-size: 0.28rem;
        color: #e7bd7b;
      }
      .van-picker__confirm {
        font-size: 0.28rem;
        color: #e7bd7b;
      }
      .van-picker-column--selected {
        color: @white !important;
        border-top: 1px solid @yellow;
        border-bottom: 1px solid @yellow;
        margin: 0.1rem 0.2rem;
      }
      .van-hairline--top::after {
        border-top: 1px solid @black !important;
      }
      .van-actionsheet__cancel {
        margin-top: 0 !important;
        background: #c20007 !important;
        color: white;
      }
      .van-cell--required::before {
        color: @wgray !important;
      }
      .van-button--bottom-action {
        .van-button--primary {
          background: #c20007 !important;

        }
      }

    }
    .van-hairline--top-bottom::after,.van-hairline--bottom::after {
      border: 0
    }
    .van-cell {
      height: 0.96rem;
      line-height: 0.56rem;
      background: #1a1a1a !important;
      .van-cell__value {
        position: relative;
        display: inline-block !important;
        // display: inline-block;
        .van-field__control {
          background: #1a1a1a;
          color:#999999 !important;
        }
      }
      .van-cell__title {
        color: @white;
        font-size: 0.28rem;
        .van-cell__text {
          color: @white;
          .van-cell__text::before {
            background: red;
            display: inline-block;
            z-index: 99;
            border-radius: 5px;
          }
        }
      }
      .van-cell__value--link {
        span {
          color: @wgray;
          font-size: 0.28rem;
        }
      }
      .van-field__icon{
        color: @wgray;}
      &:not(:last-child)::after {
        border-bottom: 1px solid #000 !important;
      }
    }
    .dj_yzCode {
      width: auto;
      position: absolute;
      float: right;
      vertical-align: top;
      margin-top: -1.5rem;
      right: 0.3rem;
      top:50%;
      .code-btn {
        background: none;
        border: 0;
        font-size: 0.28rem;
        color: @yellow;
      }
    }
  }
</style>
<template>
  <div class="memberInfo">
    <van-cell-group class="memberInfo_dis">
      <van-cell icon="" title="真实姓名" :value="defaultName" is-link @click="nameShow=true"/>
      <van-cell icon="" title="性别" :value="itemVal" is-link @click="show=true"/>
       <van-cell icon="" title="生日" :value="birthData" is-link @click="dataShow=true"/>
      <van-cell icon="" title="手机号" :value="telNum" is-link @click="phoneShow=true"/>
    </van-cell-group>

    <van-popup v-model="nameShow" position="right" :overlay="true">
      <van-cell-group>
        <van-field
          v-model.trim="username"
          label="真实姓名"
          icon="clear"
          placeholder="请输入真实姓名"
          @click-icon="username = ''"
        />
        <van-button type="primary" bottom-action @click="saveName">保存并使用</van-button>
      </van-cell-group>
    </van-popup>

    <van-actionsheet v-model="show" :actions="actions" cancel-text="取消"/>

    <van-actionsheet v-model="dataShow">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-hour="minHour"
        :max-hour="maxHour"
        :min-date="minDate"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="oncalcel"
      />
    </van-actionsheet>

    <van-popup v-model="phoneShow" position="right" :overlay="true" style="top:2rem;">
      <van-cell-group>
        <van-field
          label="手机号码"
          v-model="phoneNum"
          icon="clear"
          placeholder="请填写您的手机号码"
          @click-icon="phoneNum = ''"
        />
        <van-field
          type="text"
          label="验证码"
          v-model="yzCode"
          placeholder="请填写您的验证码"
        />
        <div class="dj_yzCode">
          <button @click="getCode(formData)" class="code-btn" :disabled="!codeShow">
            <span v-show="codeShow">获取验证码</span>
            <span v-show="!codeShow" class="count">{{count}}s</span>
          </button>
        </div>

        <van-button type="primary" bottom-action @click="savePhone">保存并使用</van-button>
      </van-cell-group>
    </van-popup>

  </div>

</template>

<script>
  const TIME_COUNT = 60;
  import '../../common/dataFormate'
  import {Icon, Cell, CellGroup, Actionsheet, Toast, DatetimePicker, Field, Popup, Button} from 'vant';

  export default {
    name: "member-info",
    components: {
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Actionsheet.name]: Actionsheet,
      [Toast.name]: Toast,
      [DatetimePicker.name]: DatetimePicker,
      [Field.name]: Field,
      [Popup.name]: Popup,
      [Button.name]: Button
    },
    data() {
      return {
        defaultName: '',
        errMsg: '',
        nameShow: false,
        username: '',
        itemVal: '',
        birthData: '',
        show: false,
        phoneShow: false,
        actions: [
          {
            name: '男',
            id: "0",
            callback: this.onClick
          },
          {
            name: '女',
            id: "1",
            callback: this.onClick
          }
        ],
        minHour: 10,
        maxHour: 20,
        minDate: new Date(1900, 0, 1),
        maxDate: new Date(2019, 10, 1),
        currentDate: new Date(),
        dataShow: false,
        telNum: '',
        codeShow: true,
        formData: {
          phoneNum: this.phoneNum,
          yzCode: this.yzCode,
        },
        count: '',
        timer: null,
        phoneNum: '',
        yzCode: '',
        returnSex:0
      };
    },
    created() {
      let vm = this
      this.memberInfo();
    },
    computed: {},
    methods: {
      memberInfo() {
        let that = this;
        let data = {
          memberId: sessionStorage.getItem("memberId")
        }
        Ajax.post('target/memberapi/memberDetail', data)
          .then(function (res) {
            let response = res.data;
            if(response.data[0].memberTruename!=null || response.data[0].memberTruename!=undefined){
              that.defaultName = res.data.data[0].memberTruename;
            }else{
              that.defaultName = res.data.data[0].memberName;
            }
            if(response.data[0].memberBirthday){
              that.birthData = new Date(response.data[0].memberBirthday).Format("yyyy-MM-dd")
              that.currentDate = new Date(response.data[0].memberBirthday)
            }else{

            }
            that.username = response.data[0].memberTruename ? response.data[0].memberTruename : response.data[0].memberName
            that.telNum = res.data.data[0].memberMobile;
            if (res.data.data[0].memberSex == "1") {
              that.itemVal = "男";
            } else {
              that.itemVal = "女";
            }
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
      },
      onClick(item) {
        this.show = false;
        this.itemVal = item.name;
        if(this.itemVal == "男"){
          this.returnSex = 1;
        }else{
          this.returnSex = 2;
        }
        let data = {
            memberId: sessionStorage.getItem("memberId"),
            birthday: this.birthData,
            nichen: this.username,
            sex: this.returnSex,
            areaInfo:'',
            mobile:this.telNum
          }
          Ajax.post('target/memberapi/updateMember', data)
          .then(function (res) {
            if(res.data.result !== 1){
              Toast(res.data.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
        // Toast(item.name);
      },
      onChange(picker) {
        const values = picker.getValues();
      },
      onConfirm(val) {
        this.birthData = new Date(val).Format("yyyy-MM-dd");
        this.dataShow = false;
        let data = {
            memberId:sessionStorage.getItem("memberId"),
            birthday: this.birthData,
            nichen: this.username,
            sex: this.returnSex,
            areaInfo:'',
            mobile:this.telNum
        }
        Ajax.post('target/memberapi/updateMember', data)
        .then(function (res) {
          if(res.data.result === 1){

          }else{
            Toast(res.data.msg)
          }

        })
        .catch(function (error) {
          console.log(error)
        });
      },
      oncalcel() {
        this.dataShow = false
      },
      saveName() {
        let _this = this;
        if (_this.username === '') {
          Toast('请输入真实姓名');
        } else {
          _this.nameShow = false;
          let data = {
            memberId: sessionStorage.getItem("memberId"),
            birthday:_this.birthData,
            nichen: _this.username,
            sex: _this.returnSex,
            areaInfo:'',
            mobile:_this.telNum
          }
          Ajax.post('target/memberapi/updateMember', data)
          .then(function (res) {
            if(res.data.result == "1"){
              _this.defaultName =_this.username;
            }else{
              Toast(res.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error)
          });
        }
      },
      savePhone() {
        let that = this;
        if (that.phoneCheck(that.phoneNum)) {
          if (that.yzCode === '') {
            Toast('请输入验证码！')
            return false
          } else {
            Toast('保存信息')
            that.telNum = that.phoneNum
            that.phoneShow = false
            clearInterval(that.timer)
            let data = {
            memberId:sessionStorage.getItem("memberId"),
            birthday:that.birthData,
            nichen: that.username,
            sex: that.returnSex,
            areaInfo:'',
            mobile:that.telNum
          }
          Ajax.post('target/memberapi/updateMember', data)
          .then(function (res) {
            if(res.data.result == "1"){
              that.telNum = that.phoneNum;
            }else{
              Toast(res.data.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
        }
        }
      },
      phoneCheck(phoneNum) {
        if (phoneNum !== '') {
          let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if (reg.test(phoneNum)) {
            return true
          } else {
            Toast('手机格式不正确！');
            return false
          }

        } else {
          Toast('请输入手机号码！');
          return false
        }
      },
      getCode(formdata) {
        this.phoneCheck(this.phoneNum) ? this.timeKeeper() : ''
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
      },
      timeKeeper() {
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.codeShow = false;
          this.timer = setInterval(() => {
            console.log(this.count)
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              if(this.count<=0){
                this.codeShow = true;
              }
            } else {
              // this.codeShow = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      }
    }
  }
</script>
