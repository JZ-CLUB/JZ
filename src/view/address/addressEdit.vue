<template>
  <div>
    <van-address-edit
      ref = "addCon"
      id = "id_id"
      :area-list="areaList"
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
  let addressId = sessionStorage.getItem("addressId");;
  let mm;
  import { AddressList, CellGroup, Cell, AddressEdit, Area } from "vant";
  import { Toast } from "vant";
  import { Dialog } from "vant";
  export default {
    components: {
      [AddressList.name]: AddressList,
      [CellGroup.name]: CellGroup,
      [Cell.name]: Cell,
      [AddressEdit.name]: AddressEdit,
      [Area.name]: Area
    },
    data() {
      return {
        areaList: {},
        searchResult: [],
        addressId: "",
        areaInfo:[],
        saveEditInfo:[],
        areaId:[]
      };
    },
    created() {
      let vm = this;
      vm.areaJson();
      let mm = this.$route.query.tart;
      if( mm == '124'){
        vm.addEdit();
      }
    },
    // mounted(){
      
    // },
    methods: {
      // 地址编辑方法
      addEdit() {
        let that = this;
        // Ajax.get('/static/addressEditEDIT.json')
        let data = {
          addressId: addressId
        }
        Ajax.post('target/address/api/addressDetail',data)
        .then(function (res) {
          that.saveEditInfo = res.data.data;
          let RefInfo = that.$refs.addCon._props.addressInfo;
          that.areaInfo = res.data.data.areaInfo.split(",");
          RefInfo.name = res.data.data.trueName;
          RefInfo.tel = res.data.data.mobPhone;
          RefInfo.city = that.areaInfo[1];
          RefInfo.province = that.areaInfo[0];
          RefInfo.county = that.areaInfo[2];
          RefInfo.address_detail = res.data.data.address;
          RefInfo.area_code = ''+res.data.data.areaId+'';
          console.log("res.data.data.areaId"+res.data.data.areaId);
        })
        .catch(function (error) {
          
        });
      },
      onSave() {
         let saveInfo = this.$refs.addCon._props.addressInfo;
        //  this.areaId = saveInfo.area_code;
         console.log(this.areaId);
         let data = {
          memberId: this.saveEditInfo.memberId,
          trueName: saveInfo.name,
          mobPhone: saveInfo.tel,
          telPhone: this.saveEditInfo.telPhone,
          areaId: "11",
          cityId: "22",
          areaInfo: this.saveEditInfo.areaInfo,
          address: saveInfo.address_detail,
          provinceId: "00",
          zipCode: this.saveEditInfo.zipCode,
          addressId: addressId
        }
        Ajax.post('target/address/api/saveAddress',data)
        .then(function (res) {
          
        })
         .catch(function (error) {
          
        });
      },
      onDelete() {
        Toast("delete");
      },
      areaJson: function() {
        let _this = this;
        console.log(_this.areaList);
        Ajax.get("/static/addressEdit.json").then(function(res) {
          _this.areaList = res.data;
        });
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [
            {
              name: "黄龙万科中心",
              address: "杭州市西湖区"
            }
          ];
        } else {
          this.searchResult = [];
        }
      }
    }
  };
</script>
