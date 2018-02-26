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
        // nam:'hhhhh'
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
        Ajax.get('/static/addressEditEDIT.json')
        .then(function (res) {
          let RefInfo = that.$refs.addCon._props.addressInfo;
          RefInfo.name = res.data.data[0].name;
          RefInfo.tel = res.data.data[0].tel;
          RefInfo.city = res.data.data[0].city;
          RefInfo.province = res.data.data[0].province;
          RefInfo.county = res.data.data[0].county;
          RefInfo.address_detail = res.data.data[0].address_detail;
          RefInfo.area_code = res.data.data[0].area_code;
        })
        .catch(function (error) {
          
        });
      },
      onSave() {
        let saveInfo = this.$refs.addCon._props.addressInfo;
        let trueName,telphone,addressInfo,area_info;
        trueName = saveInfo.name;
        telphone = saveInfo.tel;
        addressInfo = saveInfo.city + "," + saveInfo.province + "," + saveInfo.county;
        area_info = saveInfo.area_code;
        console.log("trueName"+trueName+"telphone"+telphone+"addressInfo"+addressInfo+"area_info"+area_info+"addressId"+addressId);
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
