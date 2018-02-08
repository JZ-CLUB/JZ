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
  let addressId;
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
        name:"nihai"
      };
    },
    created() {
      let vm = this;
      vm.areaJson();
      // vm.addressCon();
    },
    mounted(){
      this.$refs.addCon._props.addressInfo={
        tel:'1345566788',
        name:'ghfvghv'
      }
      console.log(this.$refs.addCon._props.addressInfo.address_detail);
    },
    methods: {
      onSave() {
        console.log(this.$refs.addCon.currentInfo.city);
        alert(this.$refs.addCon.currentInfo.name);
      },
      onDelete() {
        Toast("delete");
      },
      areaJson: function() {
        let _this = this;
        addressId = sessionStorage.getItem("addressId");
        console.log(_this.areaList);
        Ajax.get("/static/addressEdit.json").then(function(res) {
          _this.areaList = res.data;
        });
      },
      // addressCon: function() {
      //   Ajax.get("/static/address.json")
      //     .then(function(res) {

      //     })
      //     .catch(function(error) {

      //     });
      // },
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
