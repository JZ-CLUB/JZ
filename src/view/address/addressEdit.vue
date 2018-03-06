<template>
  <div>
    <!-- <van-cell-group> -->
      <van-field
        v-model="username"
        label="收货人"
        icon="clear"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="telpbone"
        label="联系方式"
        placeholder="请输入联系方式"
      />
    <!-- </van-cell-group> -->
    <van-row class="return_area">
      <van-col span="5">
        <van-cell-group>
          <van-cell value="收件地区" />
        </van-cell-group>
      </van-col>
      <div v-on:click="toggleShow">
      <van-col span="19">
        <van-row>
          <van-col span="8">
            <van-cell-group>
              <van-cell :value="proSheng"/>
            </van-cell-group>
          </van-col>
          <van-col span="8">
            <van-cell-group>
              <van-cell :value="proCity" />
            </van-cell-group>
          </van-col>
          <van-col span="8">
            <van-cell-group>
              <van-cell :value="proArea" />
            </van-cell-group>
          </van-col>
        </van-row>
      </van-col>
      </div>
    </van-row>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <div class="van-picker__toolbar van-hairline--top-bottom">
        <div class="van-picker__cancel" v-on:click="onCancel">取消</div> 
        <div class="van-picker__confirm" v-on:click="onConfirm">完成</div>
      </div>
      <van-row>
          <van-col span="8">
            <van-picker
              :columns="columns"
              @cancel="onCancel"
              @confirm="onConfirm"
              @change="onChange"
            />
          </van-col>
          <van-col span="8">
            <van-picker :columns="columns1" @change="onChange1" />
          </van-col>
          <van-col span="8">
            <van-picker :columns="columns2" @change="onChange2" />
          </van-col>
        </van-row>
    </van-popup>
    <van-field
      v-model="address_detail"
      label="详细地址"
    />
    <van-button type="primary" bottom-action @click="saveUse">保存并使用</van-button>
  </div>
</template>


<script>
  // let addressId = sessionStorage.getItem("addressId");
  import { Field , Cell, CellGroup, Picker, Row, Col, Area, Popup, Button } from 'vant';
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  export default {
    components: {
      [Field.name]: Field,
      [CellGroup.name]: CellGroup,
      [Cell.name]: Cell,
      [Picker.name]: Picker,
      [Row.name]: Row,
      [Col.name]: Col,
      [Area.name]: Area,
      [Popup.name]: Popup,
      [Button.name]: Button,
    },
    data(){
      return {
        show: false,
        columns: [],         //省数据值
        columns1: [],        //市数据值
        columns2: [],        //区数据值
        username:'',         //收货人
        telpbone:'',         //联系电话
        address_detail:'',   //详细地址
        shengActive:'',      //选中的省值
        cityActive:'',       //选中的市区值
        areaActive:'',       //选中的区值
        proSheng:'选择省份',
        proCity:'选择城市',
        proArea:'选择市区',
        provinceId:'',        //选中的省的ID
        cityId:'',        //选中的市的ID
        areaId:'',         //选中的区的ID
        memberId:"",
        addressInfo:'',
        zipCode:'',
        mobPhone:'',
        addressId:''
      }
    },
    created() {
      let vm = this;
      vm.sheng();
      vm.addressInfo = this.$store.state.address.addressInfo;
      let mm = this.$route.query.tart;
      if( mm == '124'){
        vm.addEdit();
      }
    },
    methods: {
      addEdit (){
        let addressInfoStr = [];
        addressInfoStr = this.addressInfo.address.split(" ");
        this.username = this.addressInfo.trueName;
        this.telpbone = this.addressInfo.telPhone;
        this.proSheng = addressInfoStr[0];
        this.proCity = addressInfoStr[1];
        this.proArea = addressInfoStr[2];
        this.zipCode = this.addressInfo.zipCode;
        this.mobPhone = this.addressInfo.mobPhone;
        this.memberId = this.addressInfo.memberId;
      },
      onChange(picker, value, index) {
        let areaId = `${value.areaId}`;
        this.shengActive = `${value.text}`;
        this.provinceId = `${value.areaId}`;
        if (areaId != "" || areaId != undefined) {
          let text = [];
          let areaId = [];
          let that = this;
          let nini=[{"text":"请选择"}];
          let data = {
            parentAreaId: value.areaId
          }
          if(this.shengActive == "请选择"){
            that.columns1 = [{"text":"请选择"}]
            that.columns2 = [{"text":"请选择"}]
          }else{
            Ajax.post('target/area/api/childlist',data)
          .then(function (res) {
          // Ajax.get("/static/shiqu.json").then(function(res) {
            for(let i = 0; i < res.data.data.length; i++){
              let bb = {
                "text": res.data.data[i].areaName,
                "areaId": res.data.data[i].areaId
              }
              nini[i+1] = bb;
            }
              that.columns1 = nini;            
          }).catch(function (error) {
            
          });
          }
          
        }
      },
      onChange1(picker, value, index) {
        let that = this;
        let text = [];
        let areaId = [];
        let nini=[
          {
            "text":'请选择'
          }
        ];
        that.cityActive = `${value.text}`;
        that.cityId = `${value.areaId}`;
        let data = {
            parentAreaId: value.areaId
          }
        if(that.cityActive == "请选择"){
          that.columns2 = [{"text":"请选择"}];
        }else{
          Ajax.post('target/area/api/childlist',data)
          .then(function (res) {
            for(let i = 0; i < res.data.data.length; i++){
              let bb = {
                "text": res.data.data[i].areaName,
                "areaId": res.data.data[i].areaId
              }
              nini[i+1] = bb;
            } 
              that.columns2 = nini;
            
          }).catch(function (error) {
            
          });
        }  
      },
      onChange2(picker, value, index) {
        this.areaActive = `${value.text}`;
        this.areaId = `${value.areaId}`;
        // console.log(this.areaActive);
      },
      toggleShow() {
        return this.show = true;
      },
      onCancel() {
        return this.show = false;
      },
      sheng() {
        // console.log("addressId"+addressId);
        let text = [];
        let areaId = [];
        let that = this;
        let nini=[{"text":"请选择"}];
        Ajax.post('target/area/api/arealist')
        .then(function (res) {
        // Ajax.get("/static/sheng.json").then(function(res) {
          console.log(nini)
          for(let i = 0; i < res.data.data.length; i++){
            let bb = {
              "text": res.data.data[i].areaName,
              "areaId": res.data.data[i].areaId
            }
            nini[i+1] = bb;
          }  
          that.columns = nini;
        }).catch(function (error) {
          
        });
      },
      onConfirm() {
        if( this.shengActive =="请选择" || this.cityActive =="请选择" || this.areaActive=="请选择" || this.shengActive =="" || this.cityActive =="" || this.areaActive==""){
            Toast('请选择完整地区');
        }else{
          this.proSheng = this.shengActive;
          this.proCity = this.cityActive;
          this.proArea = this.areaActive;
          return this.show = false;
        }
      },
      saveUse() {
        let _this = this;
        if(_this.username =="" || _this.telpbone == "" || _this.proSheng =="" || _this.proCity =="" || _this.proArea == "" ) {
          Toast('请填写完整');
        }else{
          var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if(!reg.test(_this.telpbone)){
            Toast("手机格式不正确");
          }else{
            let data = {
              memberId:88,
              trueName:_this.username,
              mobPhone:_this.mobPhone,
              telPhone:_this.telpbone,
              areaId:_this.addressInfo.areaId,
              cityId:_this.addressInfo.cityId,
              areaInfo:_this.address_detail,
              address:_this.proSheng +" "+ _this.proCity +" "+ _this.proArea,
              provinceId:_this.addressInfo.provinceId,
              zipCode:_this.zipCode,
              addressId:_this.addressInfo.addressId
            }
            Ajax.post('target/address/api/saveAddress', data)
            .then(function (res) {
              if(res.data.result === 1){
                _this.$router.push({path: '/address'});    
              }else{
                Toast(res.msg)
              }
              
            }).catch(function (error) {
                
            });
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.van-button--bottom-action{
  position: absolute !important;
  bottom:0 !important;
}
.van-address-list{
  .van-cell{
    padding: 10px 0px 10px 15px !important;
    .van-address-list__add.van-cell{
      background-color: #f44;
      font-size: 16px;
      color: #fff;
      height: 50px;
      line-height:50px;
      padding: 0;
      text-align: center;
      &__right-icon{
        display: none;
      }
      .van-icon{
        display: none;
      }
    }
  }
  .van-cell__value--alone{
      padding-right: 0 !important;
      .van-cell-swipe__wrapper{
        .van-cell-swipe__right{
          background-color: #84c483;
          right: 0;
          -webkit-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);

        }
        .van-cell-swipe__left, .van-cell-swipe__right{
          top: 0;
          height: 100%;
          position: absolute;
          width: 65px;
          color: #fff;
          font-size: 16px;
          height: 40px;
          display: inline-block;
          text-align: center;
          line-height: 40px;
        }
      }
  }
}
.van-col-6{
  width: 76px !important;
}
.return_area{
  margin-top: -0.85px !important;
  background: white !important;
  padding-left: 15px !important;
}
.van-cell{
  padding: 10px 15px 10px 0px !important;
}
</style>
