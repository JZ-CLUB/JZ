<template>
  <div>
    <van-cell-group>
      <van-cell icon="" title="真实姓名" :value="defaultName" is-link @click="nameShow=true"/>
      <van-cell icon="" title="性别" :value="itemVal" is-link @click="show=true"/>
      <van-cell icon="" title="生日" :value="birthData" is-link @click="dataShow=true"/>
      <van-cell icon="" title="手机号" :value="telNum" is-link @click="phoneShow=true"/>
    </van-cell-group>

    <van-popup v-model="nameShow" position="right" :overlay="false">
      <van-cell-group>
        <van-field
          v-model.trim="username"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
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

    <van-popup v-model="phoneShow" position="right" :overlay="false">
      <van-cell-group>
        <van-field
          label="手机号"
          v-model="phoneNum"
          icon="clear"
          placeholder="请输入手机号"
          @click-icon="phoneNum = ''"
        />
        <van-field
          type="text"
          label="验证码"
          v-model="yzCode"
          placeholder="6位验证码"
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
  import { Icon, Cell, CellGroup,Actionsheet,Toast,DatetimePicker,Field,Popup,Button } from 'vant';
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
          defaultName:'张三',
          errMsg:'',
          nameShow:false,
          username:'',
          itemVal:'男',
          birthData:'2018-01-01',
          show:false,
          phoneShow:false,
          actions:[
            {
              name: '男',
              id:"0",
              callback: this.onClick
            },
            {
              name: '女',
              id:"1",
              callback: this.onClick
            }
          ],
          minHour: 10,
          maxHour: 20,
          minDate: new Date(),
          maxDate: new Date(2019, 10, 1),
          currentDate: new Date(2018, 0, 1),
          dataShow:false,
          telNum:'',
          codeShow:true,
          formData: {
            phoneNum: this.phoneNum,
            yzCode:this.yzCode,
          },
          count: '',
          timer: null,
          phoneNum:'',
          yzCode:''
        };
      },
      created () {

      },
      computed: {

      },
      methods: {
        onClick(item) {
          this.show=false;
          this.itemVal=item.name
          // Toast(item.name);
        },
        onChange(picker){
          const values = picker.getValues();
        },
        onConfirm(val){
          this.birthData=new Date(val).Format("yyyy-MM-dd");
          this.dataShow = false
        },
        oncalcel(){
          this.dataShow = false
        },
        saveName() {
          if(this.username===''){
            Toast('请输入真实姓名');
          }else{
            this.nameShow=false
          }
        },
        savePhone(){
          if(this.phoneCheck(this.phoneNum)){
            if(this.yzCode===''){
              Toast('请输入验证码！')
              return false
            }else{
              Toast('保存信息')
              this.telNum=this.phoneNum
              this.phoneShow=false
              clearInterval(this.timer)
            }
          }
        },
        phoneCheck(phoneNum){
          if(phoneNum!==''){
            let reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if(reg.test(phoneNum)){
              return true
            }else{
              Toast('手机格式不正确！');
              return false
            }

          }else{
            Toast('请输入手机号码！');
            return false
          }
        },
        getCode(formdata){
          this.phoneCheck(this.phoneNum)?this.timeKeeper():''
        },
        timeKeeper() {
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.codeShow = false;
            this.timer = setInterval(() => {
              console.log(this.count)
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
      }
    }
</script>

<style lang="less" scoped>
  .van-popup {
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    &--right {
      width: 100%;
      height: 100%;
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
      color: red;
    }
  }
</style>
